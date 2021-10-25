import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StatoscopePlugin from '@statoscope/webpack-plugin';

import UnusedFilesPlugin from './plugins/UnusedFilesPlugin';

const config: webpack.Configuration = {
    mode: 'production',
    entry: {
        root: './src/pages/root.tsx',
        root2: './src/pages/root2.tsx',
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
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new UnusedFilesPlugin(),
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
        alias: {
            'bn.js': false,
            'browserify-crypto': false,
            'crypto-browserify': path.resolve(__dirname, 'src/crypto-browserify'),
        },
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
