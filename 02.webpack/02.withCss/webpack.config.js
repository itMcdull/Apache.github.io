module.exports = {
    // 入口
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        // 使用什么loader 来解析 .css
        // loaders 语法 是 3.0的
        // 4.0废弃了 rules
        // loaders: [
        rules: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};