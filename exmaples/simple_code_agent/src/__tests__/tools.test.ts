/**
 * tools.test.ts — 工具层单元测试
 *
 * 这些测试不需要 API Key，直接测试工具执行逻辑。
 * 运行方式：npm test
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { executeTool, toolDefinitions } from '../tools';

// ─────────────────────────────────────────────
// 辅助：在系统临时目录创建测试文件
// ─────────────────────────────────────────────

let tmpDir: string;

beforeAll(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-test-'));
});

afterAll(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

// ─────────────────────────────────────────────
// 工具定义结构测试
// ─────────────────────────────────────────────

describe('toolDefinitions', () => {
  test('应包含 3 个工具', () => {
    expect(toolDefinitions).toHaveLength(3);
  });

  test('每个工具都有 name / description / input_schema', () => {
    for (const tool of toolDefinitions) {
      expect(tool.name).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect(tool.input_schema).toBeDefined();
    }
  });

  test('工具名称应为 read_file / write_file / run_bash', () => {
    const names = toolDefinitions.map((t) => t.name);
    expect(names).toContain('read_file');
    expect(names).toContain('write_file');
    expect(names).toContain('run_bash');
  });
});

// ─────────────────────────────────────────────
// write_file 测试
// ─────────────────────────────────────────────

describe('executeTool: write_file', () => {
  test('应成功写入文件并返回成功消息', () => {
    const filePath = path.join(tmpDir, 'hello.txt');
    const result = executeTool('write_file', {
      file_path: filePath,
      content: 'Hello, Agent!',
    });
    expect(result).toContain('成功');
    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath, 'utf-8')).toBe('Hello, Agent!');
  });

  test('目录不存在时应自动创建', () => {
    const filePath = path.join(tmpDir, 'nested', 'dir', 'file.txt');
    executeTool('write_file', { file_path: filePath, content: 'test' });
    expect(fs.existsSync(filePath)).toBe(true);
  });
});

// ─────────────────────────────────────────────
// read_file 测试
// ─────────────────────────────────────────────

describe('executeTool: read_file', () => {
  test('应成功读取已存在文件', () => {
    const filePath = path.join(tmpDir, 'read-test.txt');
    fs.writeFileSync(filePath, '读取测试内容');
    const result = executeTool('read_file', { file_path: filePath });
    expect(result).toBe('读取测试内容');
  });

  test('文件不存在时返回错误消息（不抛异常）', () => {
    const result = executeTool('read_file', {
      file_path: '/no/such/file.txt',
    });
    expect(result).toContain('不存在');
  });
});

// ─────────────────────────────────────────────
// run_bash 测试
// ─────────────────────────────────────────────

describe('executeTool: run_bash', () => {
  test('应执行命令并返回 stdout', () => {
    // echo 在 Windows / Unix 都可用
    const result = executeTool('run_bash', { command: 'echo hello' });
    expect(result).toContain('hello');
  });

  test('命令失败时返回错误消息（不抛异常）', () => {
    const result = executeTool('run_bash', {
      command: 'this_command_does_not_exist_xyz',
    });
    // 返回的字符串应包含失败信息而非抛出
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────
// 未知工具测试
// ─────────────────────────────────────────────

describe('executeTool: 未知工具', () => {
  test('应返回"未知工具"提示', () => {
    const result = executeTool('non_existent_tool', {});
    expect(result).toContain('未知工具');
  });
});
