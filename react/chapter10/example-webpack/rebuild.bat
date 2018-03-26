:: 初始调用以本地缓存相应模块,前提是相关模块已全局安装（-g参数）
:: npm link react
:: npm link react-dom
:: npm link babel
:: npm link babel-cli
:: npm link babel-loader
:: npm link babel-preset-react
:: npm link babel-preset-es2015

dir

webpack

dir

:: 正常运行此命令时需要当前目录下有.babelrc文件
babel ./js/entry.js --out-dir=babel_out

:: 正常运行此命令时需要当前目录下有webpack.config.js文件
webpack