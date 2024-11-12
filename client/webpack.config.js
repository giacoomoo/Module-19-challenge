const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const {InjectManifest} = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
    return {
        mode: 'development',
        entry: {
            main: './src/js/index.js',
            install: './src/js/install.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './index.html'),
                filename: 'index.html',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'src/assets', to: 'assets' },
                ],
            }),
            new WebpackPwaManifest({
                name: 'JATE',
                short_name: 'JATE',
                description: 'A Progressive Web App',
                background_color: '#ffffff',
                theme_color: '#000000',
                display: 'standalone',
                start_url: '/index.html',
                publicPath: '/',
                icons: [
                    {
                        src: path.resolve(__dirname, './src/assets/images/icon-512x512.png'),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join('assets', 'icons'),
                    }]
            }),
            new InjectManifest({
                swSrc: '/src-sw.js',
                swDest: 'src-sw.js'
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/i, // 处理静态文件（图片、字体）
                    type: 'asset/resource', // 将静态资源转为单独文件
                },
            ]
        },
    };
};
