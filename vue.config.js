const webpack = require("webpack");
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const os = require('os');
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// 分析打包时间
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

function resolve(dir) { return path.join(__dirname, dir) }

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const isDev = process.env.NODE_ENV;  //当前的环境
const isProduction = process.env.NODE_ENV !== 'development';

/**
 *  打包时切换成 false
 */
const devNeedCdn = isDev === 'production' ? false : true;
const cdn = {
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'video-js': 'VideoJs',
        'vue-i18n': 'VueI18n',
        'echarts': 'echarts',
        'vant': 'Vant'
    },
    css: [
        'https://lib.baomitu.com/video.js/7.7.5/video-js.min.css',
        'https://cdn.jsdelivr.net/npm/vant@2.8.1/lib/index.css'
    ],
    js: [
        'https://lib.baomitu.com/vue/2.5.7/vue.min.js',
        'https://lib.baomitu.com/vue-router/3.0.1/vue-router.min.js',
        'https://lib.baomitu.com/vuex/3.0.1/vuex.min.js',
        'https://lib.baomitu.com/axios/0.18.0/axios.min.js',
        'https://lib.baomitu.com/video.js/7.7.5/video.min.js',
        'https://lib.baomitu.com/vue-i18n/8.3.2/vue-i18n.min.js',
        'https://lib.baomitu.com/echarts/4.7.0/echarts.min.js',
        'https://cdn.jsdelivr.net/npm/vant@2.8.1/lib/vant.min.js'
    ]
}

const isDevBD = {
    '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        wx: true,
        pathRewrite: {
            "^/api": "/"
        }
    },
    '/china': {
        target: 'https://view.inews.qq.com',
        changeOrigin: true,
        wx: true,
        pathRewrite: {
            "^/china": "/"
        }
    },
    '/cv': {
        target: 'https://wuliang.art',
        changeOrigin: true,
        wx: true,
        pathRewrite: {
            "^/cv": "/"
        }
    }
}
const isDevCS = {
    '/api': {
        target: 'http://114.55.165.42:6100',
        changeOrigin: true,
        wx: true,
        pathRewrite: {
            "^/api": "/"
        }
    }
}

/**
 *  production：生产环境，development：开发环境
    config.mode = process.env.NODE_ENV
 */
module.exports = {
    runtimeCompiler: true,
    productionSourceMap: devNeedCdn, // 是否开启生产模式下的sourceMap压缩
    lintOnSave: false,
    devServer: {
        open: false,
        https: false,
        proxy: isDevBD
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('Mock', resolve('mock'))
            .set('assets', resolve('src/assets/img'))
            .set('components', resolve('src/components'))

        config
            .plugin('speed-measure-webpack-plugin')
            .use(SpeedMeasurePlugin)
            .end()

        config.plugin('html').tap(args => {
            // 生产环境 或 本地 需要cdn时，才注入cdn
            if (isProduction || devNeedCdn) args[0].cdn = cdn;
            return args
        })

        // 上产环境时
        if (isDev === 'production') {
            config.plugins.delete('prefetch');
            config.plugins.delete('preload');

            const jsRule = config.module.rule('js');
            // 清除已有的所有 loader。
            jsRule.uses.clear();
            //把对.js 的文件处理交给id为 babel 的 HappyPack 的实例执行
            jsRule.use('happypack/loader?id=babel', 'thread-loader')
                .loader('happypack/loader?id=babel')
                .end();
        }

    },
    transpileDependencies: [
        'biyi-admin',
    ],
    configureWebpack: config => {
        // 生产环境打包分析体积
        if (isProduction || devNeedCdn) config.externals = cdn.externals;
        if (isDev === 'production') {
            config.plugins.push(
                // 压缩代码
                new CompressionPlugin({
                    algorithm: 'gzip',
                    filename: '[path].gz[query]',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8,
                    deleteOriginalAssets: false
                }),
                new ParallelUglifyPlugin({
                    uglifyJS: {
                        output: {
                            beautify: false,
                            comments: false
                        },
                        warnings: false,
                        compress: {
                            reduce_vars: true,
                            drop_debugger: true,
                            drop_console: true
                        }
                    },
                    test: /.js$/g,
                    sourceMap: false
                }),
                new HappyPack({
                    id: 'babel',
                    loaders: [{
                        loader: 'babel-loader?cacheDirectory=true',
                    }],
                    threadPool: happyThreadPool,
                    verbose: true
                }),
                // 体积压缩提示
                new BundleAnalyzerPlugin(),
                // 打包进度显示
                new ProgressBarPlugin()
            )
        }
    },
    css: {
        extract: false,
        loaderOptions: {
            sass: {
                data: `
                @import "@/style/mixin.scss";
                @import "@/style/_var.scss";
                `
            },
            postcss: {
                plugins: [
                    require('postcss-px-to-viewport')({
                        viewportWidth: 750,     // 视窗的宽度
                        viewportHeight: 1080,   // 视窗的高度
                        unitPrecision: 3,
                        viewportUnit: 'vw',
                        minPixelValue: 1,
                        mediaQuery: false,
                        exclude: /(\/|\\)(node_modules)(\/|\\)/,
                        selectorBlackList: ['.ignore', '.hairlines']    // 指定不转换为视窗单位的类
                    }),
                    require('postcss-viewport-units')({
                        // content 属性
                        filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1
                    }),
                    require('cssnano')({
                        preset: 'advanced',
                        autoprefixer: false,
                        'postcss-zindex': false
                    })
                ]
            }
        }
    },
    // 第三方插件的选项
    pluginOptions: {},
    /**
     *  将第三方库中的ES6语法进行编译
     *  https://juejin.im/post/6856815533749338125#heading-7
     */
    transpileDependencies: [
        // 'module-name-new/library-name-new' // 出现问题的那个库
    ],
};
