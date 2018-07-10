// 开启服务器
let http = require('http');
//生成路径
let path = require('path');
//引入文件模版
let fs =require('fs');
//配置网站根目录
let rootPath = path.join(__dirname,"www");
    // console.log(rootPath);
    
//开启服务
http.createServer((request,Response)=>{
    // console.log("请求来了");
    //根据请求的url 生成静态资源服务器中的绝对路径
    let filePath = path.join(rootPath,request.url);
    // console.log(filePath);
    //判断访问的这个目录是否存在
    let isExist = fs.existsSync(filePath);
    // console.log(isExist);
    // 存在就是true 不存在就是false
    // 如果存在就去页面
    if (isExist) {
        // 如果存在才能继续走下去
        // 生成文件类表
        fs.readdir(filePath,(err,files)=>{
            // console.log(files);
            //如果是文件
            if (err) {
                // console.log(err);
                //能够进到这里就说明 是文件
                // 然后读取文件,返回文件
                fs.readFile(filePath,(err,data)=>{
                    // 响应内容
                    Response.end(data);  
                })              
            } 
            //如果是文件夹
            else {
                console.log(files);
                //直接判断是否存在首页
                if (files.indexOf("index.html")!= -1) {
                    console.log("有首页");
                    // 读取首页即可
                    fs.readFile(path.join(filePath,'index.html'),(err,data)=>{
                        if (err) {
                            console.log(err);
                            
                        } else {
                            Response.end(data);
                        }
                    })
                    
                }
                // 如果没有首页
                else{
                    // 没有首页
                    let backData ="";
                    for (let i = 0; i < files.length; i++) {
                        // /根目录request.url=>/
                        // 默认拼接的都是./只能访问根目录
                        //根据请求的url 进行判断 拼接上一级目录的地址,进行访问
                        backData +=`<h2><a style="text-decoration: none;" href="${request.url=='/'?'':request.url}/${files[i]}">${files[i]}</a></h2>`
                    } 
                    Response.writeHead(200,{
                        "content-type":"text/html;charset=utf-8"
                    })
                    Response.end(backData);
                }
            }
        })
    }
     //如果不存在就返回404
    else {
    //    不存在返回404
    Response.writeHead(404,{
        "content-type":"text/html;charset=utf-8"
    });
    Response.end(`
        <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
        <html><head>
        <title>404 Not Found</title>
        </head><body>
        <h1>Not Found</h1>
        <p>The requested URL /index.hththt was not found on this server.</p>
        </body></html>
    `);
    }
    
    
    // 响应内容

}).listen(80,"127.0.0.1",()=>{
    console.log("开始监听");
})