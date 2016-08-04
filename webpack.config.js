/**
 * Created by Jeremy Pu on 16/06/27.
 */
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //将组件中的样式乖乖提取出来
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板插入代码

//webpck插件
var plugins = [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new HtmlWebpackPlugin({
        title: "bestop建站1.0",
        template: "main.html",
        filename: "index.html",
        hash: true
    }),
    //将样式统一发布到style.css中
    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    }),
    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        _: 'lodash'
    })
];
var entry = ['./src/main'],
    buildPath = "/dist/";
//编译输出路径
module.exports = {
    debug: false,
    entry: entry,
    output: {
        path: __dirname + buildPath,
        filename: 'build.js',
        publicPath: '',
        chunkFilename: "[name].chunk.[chunkhash:8].js" //给require.ensure用
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!cssnext-loader")
        }, {
            test: /\.(jpg|png|gif)$/,
            loader: "file-loader?name=images/[name].[hash].[ext]"
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.json$/,
            loader: 'json'
        }],
        preLoaders: [{
            test: /\.js$/,
            loader: "require-css-preloader"
        }]
    },

    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js', '.css'],
        //别名
        alias: {
            config: path.join(__dirname, 'src/configs'),
            avalon: path.join(__dirname, 'src/assets/vendor/avalon/avalon2'),//avalon
            jquery: path.join(__dirname, 'src/assets/vendor/jquery/jquery'),//jquery
            watchs:path.join(__dirname, 'src/watchs'),//各种vm监听
            tools: path.join(__dirname, 'src/methods/commonTools'),
            flexslider: path.join(__dirname, 'src/assets/vendor/jquery/jquery.flexslider'),
            jqueryui: path.join(__dirname, 'src/assets/vendor/jquery-ui-1.11.4/jquery-ui'),//jqueryui
            colorpicker: path.join(__dirname, 'src/assets/vendor/colorpicker/jquery.minicolors'),//颜色拾取插件
            ueditor: path.join(__dirname, 'src/assets/vendor/UEditor/ueditor.all'),//富文本插件
            moduleInit: path.join(__dirname, 'src/methods/moduleInit'),//模块初始化
            colorpickerInit: path.join(__dirname, 'src/methods/ColorPickerInit'),//模块初始化


            drag: path.join(__dirname, 'src/modules/drag/drag'),  //拖拽模块
            word: path.join(__dirname, 'src/modules/word/word'),  //文字模块
            tabs: path.join(__dirname, 'src/modules/tabs/tabs'),  //选项卡模块
            menuspe: path.join(__dirname, 'src/modules/menu/menuspe/menuspe'),  //特殊导航模块
            menubase: path.join(__dirname, 'src/modules/menu/menubase/menubase'),  //基础导航模块
            picture: path.join(__dirname, 'src/modules/picture/picture'),  //图片模块
            album: path.join(__dirname, 'src/modules/album/album'),  //图册模块
            graphic: path.join(__dirname, 'src/modules/graphic/graphic'),  //图片模块
            settings: path.join(__dirname, 'src/modules/settings/settings'),  //图片模块
            navtabs: path.join(__dirname, 'src/modules/navtabs/navtabs')  //nav选项卡模块

        }
    },
    plugins: plugins,
    devtool: '#source-map'
};
