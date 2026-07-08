"use strict";
/**
 * index.ts — 交互层（程序入口）
 *
 * 提供一个简单的 REPL（Read-Eval-Print Loop）命令行界面：
 *   - 读取用户输入
 *   - 调用 CodeAgent.run()
 *   - 输出结果
 *   - 循环直到用户输入 "exit"
 *
 * 特殊命令：
 *   exit  — 退出程序
 *   reset — 清空对话历史，开始新任务
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
// dotenv 在程序启动时从 .env 文件加载环境变量（ANTHROPIC_API_KEY 等）
require("dotenv/config");
const readline = __importStar(require("readline"));
const agent_1 = require("./agent");
async function main() {
    // 验证 API Key 是否配置（早失败，避免用户输入后才报错）
    if (!process.env.ANTHROPIC_API_KEY) {
        console.error('错误：未找到 ANTHROPIC_API_KEY 环境变量。\n' +
            '请复制 .env.example 为 .env 并填入你的 API Key。');
        process.exit(1);
    }
    // 创建 Agent 实例（API Key 从环境变量自动读取）
    const agent = new agent_1.CodeAgent();
    // 创建标准输入/输出的 readline 接口
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '\n你 > ',
    });
    // 打印欢迎信息
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║    TypeScript Code Agent  (Claude Sonnet)    ║');
    console.log('╚══════════════════════════════════════════════╝');
    console.log('可用命令: exit（退出）| reset（重置对话）');
    console.log('输入任务描述，Agent 将自动规划并使用工具完成。\n');
    rl.prompt();
    // 监听每行输入
    rl.on('line', async (line) => {
        const input = line.trim();
        // 空输入直接重新提示
        if (!input) {
            rl.prompt();
            return;
        }
        // 内置命令处理
        if (input.toLowerCase() === 'exit') {
            console.log('\n再见！');
            rl.close();
            process.exit(0);
        }
        if (input.toLowerCase() === 'reset') {
            agent.reset();
            console.log('[系统] 对话历史已清空，开始新任务。');
            rl.prompt();
            return;
        }
        // 将输入交给 Agent 处理
        try {
            const result = await agent.run(input);
            // agent.run() 内部已实时打印 [Assistant] 文字，这里只补充一个完成标记
            console.log('\n[完成] ─────────────────────────────────────');
        }
        catch (err) {
            console.error(`\n[错误] ${err.message}`);
        }
        rl.prompt();
    });
    // 处理 Ctrl+C / 管道关闭
    rl.on('close', () => {
        console.log('\n已退出。');
        process.exit(0);
    });
}
main().catch((err) => {
    console.error('启动失败:', err.message);
    process.exit(1);
});
//# sourceMappingURL=index.js.map