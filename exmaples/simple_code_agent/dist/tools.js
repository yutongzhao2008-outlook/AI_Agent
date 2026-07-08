"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolDefinitions = void 0;
exports.executeTool = executeTool;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
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
exports.toolDefinitions = [
    {
        name: 'read_file',
        description: '读取本地文件内容并以字符串形式返回。适合查看源码、配置文件等。',
        input_schema: {
            type: 'object',
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
            type: 'object',
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
        description: '在 shell 中执行一条命令，返回合并后的 stdout + stderr。超时 30 秒。适合运行测试、编译、安装依赖等。',
        input_schema: {
            type: 'object',
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
function executeTool(name, input) {
    switch (name) {
        // ── read_file ──────────────────────────────
        case 'read_file': {
            const filePath = input.file_path;
            if (!fs.existsSync(filePath)) {
                return `错误：文件 "${filePath}" 不存在`;
            }
            try {
                return fs.readFileSync(filePath, 'utf-8');
            }
            catch (err) {
                return `读取失败：${err.message}`;
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
            }
            catch (err) {
                return `写入失败：${err.message}`;
            }
        }
        // ── run_bash ───────────────────────────────
        case 'run_bash': {
            try {
                // stdio: 'pipe' 捕获 stdout/stderr；encoding: 'utf-8' 直接返回字符串
                const output = (0, child_process_1.execSync)(input.command, {
                    encoding: 'utf-8',
                    timeout: 30000,
                    stdio: ['pipe', 'pipe', 'pipe'],
                });
                return output.trim() || '命令执行完毕（无输出）';
            }
            catch (err) {
                // execSync 在进程非零退出时抛出，err.stderr 包含错误输出
                const e = err;
                const stderr = e.stderr?.trim() ?? e.message;
                return `命令失败（退出码 ${e.status ?? 1}）:\n${stderr}`;
            }
        }
        default:
            return `未知工具：${name}`;
    }
}
//# sourceMappingURL=tools.js.map