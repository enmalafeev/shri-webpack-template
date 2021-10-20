import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StatoscopePlugin from '@statoscope/webpack-plugin';

import ModuleLogger from './plugins/moduleLogger';

const config: webpack.Configuration = {
    mode: 'production',
    entry: {
        root: {
            import: './src/pages/root.tsx',
            dependOn: 'shared',
        },
        root2: {
            import: './src/pages/root2.tsx',
            dependOn: 'shared',
        },
        shared: ['readable-stream', 'safe-buffer', 'bn.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 1,
            minChunks: 2,
        },
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new ModuleLogger(),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],
    resolve: {
        fallback: {
            'buffer': require.resolve('buffer'),
            'stream': false,
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
};

export default config;
