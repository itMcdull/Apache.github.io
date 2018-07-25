require('./modelA')
require('./modelB')
document.write("It works. high起来");

// 引入样式 在webpack中 所有的文件 都是模块
// webpack默认没有压 css的功能 需要使用 一些 loader进行压缩
// require('!style-loader!css-loader!../css/base.css')
// require('!style-loader!css-loader!../css/index.css')
require('../css/base.css')
require('../css/index.css')
require('../css/animate.css')