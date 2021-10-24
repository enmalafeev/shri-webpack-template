import { Compiler } from 'webpack';
import fg from 'fast-glob';

class UnusedFilesPlugin {
    static defaultOptions = {
        outputFile: 'unused',
        patterns: ['src/**/*.{js,jsx,ts,tsx}'],
    };
    options: { outputFile: string; patterns: string[] };

    constructor(options = {}) {
        this.options = { ...UnusedFilesPlugin.defaultOptions, ...options };
    }

    async detectDeadCode() {
        const compiledFiles = [];
        const includedFiles = await fg(this.options.patterns, { dot: true });
        return await includedFiles;
    }

    // handleAfterEmit(options, compilation, callback) {
    //     detectDeadCode(compilation, options);
    //     callback();
    //

    apply(compiler: Compiler) {
        const pluginName = UnusedFilesPlugin.name;
        compiler.hooks.afterEmit.tapAsync('WebpackDeadcodePlugin', async () => {
            console.log(await this.detectDeadCode());
        });
    }
}

export default UnusedFilesPlugin;
