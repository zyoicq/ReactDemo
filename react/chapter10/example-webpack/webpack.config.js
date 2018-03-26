module.exports = {
    //页面入口文件配置
    entry: {
        index : './js/entry.js'
    },
    //入口文件输出配置
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            //{ test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
            { test: /\.js$/, loader: 'babel-loader',exclude:/node_modules/,query:{presets:['es2015','react']} },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //模块查找时的文件后缀名
    resolve: {
        extensions: ['', '.js', '.json']
    }
};