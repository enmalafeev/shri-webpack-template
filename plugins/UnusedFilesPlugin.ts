import { Compiler } from 'webpack';
import fg from 'fast-glob';
import { writeFile } from 'fs/promises';

class UnusedFilesPlugin {
    static defaultOptions = {
        outputFile: 'unused',
        patterns: ['src/**'],
    };
    options: { outputFile: string; patterns: string[] };

    constructor(options = {}) {
        this.options = { ...UnusedFilesPlugin.defaultOptions, ...options };
    }

    async getIncludedFiles() {
        const includedFiles = await fg(this.options.patterns, { absolute: true });
        return await includedFiles;
    }

    apply(compiler: Compiler) {
        const pluginName = UnusedFilesPlugin.name;

        compiler.hooks.afterEmit.tapAsync(pluginName, async (compilation, callback) => {
            const usedFiles = Array.from(compilation.fileDependencies).filter(file => !file.includes('node_modules'));
            const includedFiles = await this.getIncludedFiles();
            const unUsedFiles = JSON.stringify(
                includedFiles.filter(file => !usedFiles.includes(file)),
                null,
                2,
            );
            await writeFile(this.options.outputFile, unUsedFiles);
            callback();
        });
    }
}

export default UnusedFilesPlugin;
