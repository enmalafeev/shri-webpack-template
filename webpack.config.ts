import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StatoscopePlugin from '@statoscope/webpack-plugin';

// import ModuleLogger from './plugins/moduleLogger';
import UnusedFilesPlugin from './plugins/UnusedFilesPlugin';

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
        new UnusedFilesPlugin({ options: true }),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],
    resolve: {
        alias: {
            [path.resolve(__dirname, 'node_modules/asn1.js/node_modules/bn.js')]: false,
            [path.resolve(__dirname, 'node_modules/elliptic/node_modules/bn.js')]: false,
            [path.resolve(__dirname, 'node_modules/create-ecdh/node_modules/bn.js')]: false,
            [path.resolve(__dirname, 'node_modules/miller-rabin/node_modules/bn.js')]: false,
            [path.resolve(__dirname, 'node_modules/diffie-hellman/node_modules/bn.js')]: false,
            [path.resolve(__dirname, 'node_modules/public-encrypt/node_modules/bn.js')]: false,

            [path.resolve(__dirname, 'node_modules/bn.js')]: false,
            [path.resolve(__dirname, 'node_modules/hash-base/node_modules/readable-stream')]: false,
            [path.resolve(__dirname, 'node_modules/browserify-sign/node_modules/readable-stream')]: false,
            [path.resolve(__dirname, 'node_modules/string_decoder/node_modules/safe-buffer')]: false,
            [path.resolve(__dirname, 'node_modules/readable-stream/node_modules/safe-buffer')]: false,
        },
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
