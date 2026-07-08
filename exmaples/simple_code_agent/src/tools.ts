/**
 * tools.ts — 工具层
 *
 * 负责：
 *   1. 声明工具的 JSON Schema（告诉 LLM 有哪些工具可用）
 *   2. 实现工具的具体逻辑（真正执行文件读写 / Shell 命令）
 *
 * Agent 架构中的位置：
 *   用户输入 → Agent 循环 → [本文件] 执行工具 → 结果返回给 LLM
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import Anthropic from '@anthropic-ai/sdk';

// ─────────────────────────────────────────────
// 工具定义（JSON Schema，传给 Anthropic API）
// ─────────────────────────────────────────────

/**
 * toolDefinitions: Anthropic.Tool[]
 *
 * 每个元素对应一个工具，字段含义：
 *   name        — 工具唯一标识，LLM 用它来选择调用哪个工具
 *   description — 自然语言描述，LLM 据此决定何时调用该工具
 *   input_schema — 参数的 JSON Schema，LLM 生成的参数必须符合此结构
 */
export const toolDefinitions: Anthropic.Tool[] = [
  {
    name: 'read_file',
    description: '读取本地文件内容并以字符串形式返回。适合查看源码、配置文件等。',
    input_schema: {
      type: 'object' as const,
      properties: {
        file_path: {
          type: 'string',
          description: '要读取的文件路径（相对或绝对路径皆可）',
        },
      },
      required: ['file_path'],
    },
  },
  {
    name: 'write_file',
    description: '将字符串内容写入本地文件。若文件不存在则创建，若目录不存在则自动递归创建。',
    input_schema: {
      type: 'object' as const,
      properties: {
        file_path: {
          type: 'string',
          description: '要写入的文件路径',
        },
        content: {
          type: 'string',
          description: '要写入的文件内容（字符串）',
        },
      },
      required: ['file_path', 'content'],
    },
  },
  {
    name: 'run_bash',
    description:
      '在 shell 中执行一条命令，返回合并后的 stdout + stderr。超时 30 秒。适合运行测试、编译、安装依赖等。',
    input_schema: {
      type: 'object' as const,
      properties: {
        command: {
          type: 'string',
          description: '要执行的 shell 命令，例如 "ls -la" 或 "npm test"',
        },
      },
      required: ['command'],
    },
  },
];

// ─────────────────────────────────────────────
// 工具执行器
// ─────────────────────────────────────────────

/**
 * executeTool(name, input) → string
 *
 * 根据 LLM 选择的工具名称和它生成的参数，分派到对应的工具实现。
 * 始终返回字符串——这个字符串会作为 tool_result 发回给 LLM。
 *
 * @param name  — 工具名称（必须是 toolDefinitions 中的 name 之一）
 * @param input — LLM 生成的参数对象
 * @returns      工具执行结果（成功输出或错误消息）
 */
export function executeTool(
  name: string,
  input: Record<string, string>
): string {
  switch (name) {
    // ── read_file ──────────────────────────────
    case 'read_file': {
      const filePath = input.file_path;
      if (!fs.existsSync(filePath)) {
        return `错误：文件 "${filePath}" 不存在`;
      }
      try {
        return fs.readFileSync(filePath, 'utf-8');
      } catch (err: unknown) {
        return `读取失败：${(err as Error).message}`;
      }
    }

    // ── write_file ─────────────────────────────
    case 'write_file': {
      const filePath = input.file_path;
      // 父目录不存在时递归创建，避免 ENOENT 错误
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      try {
        fs.writeFileSync(filePath, input.content, 'utf-8');
        return `已成功写入文件：${filePath}`;
      } catch (err: unknown) {
        return `写入失败：${(err as Error).message}`;
      }
    }

    // ── run_bash ───────────────────────────────
    case 'run_bash': {
      try {
        // stdio: 'pipe' 捕获 stdout/stderr；encoding: 'utf-8' 直接返回字符串
        const output = execSync(input.command, {
          encoding: 'utf-8',
          timeout: 30_000,
          stdio: ['pipe', 'pipe', 'pipe'],
        });
        return output.trim() || '命令执行完毕（无输出）';
      } catch (err: unknown) {
        // execSync 在进程非零退出时抛出，err.stderr 包含错误输出
        const e = err as { status?: number; stderr?: string; message: string };
        const stderr = e.stderr?.trim() ?? e.message;
        return `命令失败（退出码 ${e.status ?? 1}）:\n${stderr}`;
      }
    }

    default:
      return `未知工具：${name}`;
  }
}
