# VSS-H5-VUE

> 一个vue的多页项目，需要使用node 和npm

node下载地址 http://nodejs.cn/download/

## 开始开发

``` bash
# 安装依赖
npm install

# 本地启动并打开第一个模块
npm run local

```

可指定`/config/index.js`下的`currentModule`值为模块名称（可指定多个中间用空格间隔），方便开发本次内容不用记录繁琐的名字，同时该参数仅在本地开发环境有用，其他环境不可用

执行上面的命令后会打开字母表顺序排位第一的模块首页，如果有多余的参数需要手动指定

本地启动成功以后使用下面链接访问，如果服务启动接口有变化自行更改
http://127.0.0.1:8092/wxpaper/index?pid=9ea5530d58214467ac05a410021b18ba&oid=oLuM76WgdeE44KCnLqYSuKSdNDs8


## 说明

module 文件夹下的文件夹路径作为模块的id，因此在指定发布模块时需要使用除module外完整的路径名称。

每个模块下面有一个setting.js文件，里面指定当前模块的id（只能手动填写），便于路由进行配置；同时还有README.md文件，查看对象项目的说明。

项目主体的参数配置主要在config/index.js内，暂不支持produceName指定为空，因此该项目暂不支持在项目根目录的存放，需要修改。


## 部署

### 打包编译

``` bash
# 线上环境编译
npm run online answer
```

### 文件上传服务器
将`output`文件夹下的内容上传的服务器上



### 该项目的对应的nginx配置

``` bash
set $app_root /data/webapps;

location ~ \.(html|css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac)$ {
  root $app_root/cmsfrontend/webroot;
  expires 30d;
}

#h5多页应用
location ~ ^/h5_vss/module/ {
  root $app_root/cmsfrontend/webroot;
  expires -1;
  add_header Cache-control no-cache;
  rewrite ^/h5_vss/module/answer /h5_vss_static/module/answer.html;
}
```

### 线上访问地址

http://diaocha.frontlink.net/wxpaper?pid=9ea5530d58214467ac05a410021b18ba&oid=oLuM76WgdeE44KCnLqYSuKSdNDs8


## 文件目录

```
|-.vscode                              vscode 编译器配置
|- build                               编译文件
  |- build.js                            编译生产环境
  |- build-dev.js                        编译开发环境
  |- check-versions.js                   检查node版本
  |- guilp.js                            编译文件上传（暂时用不掉）
  |- multipage-help.js                   多页编译配置
  |- utils.js                            编译的公共方法
  |- vue-loader.conf.js                  webpack 的 vue-loader公共配置
  |- webpack.base.conf.js                webpack编辑公共内容
  |- webpack.dev.conf.js                 开发环境webpack编译配置
  |- webpack.prod.conf.js                生产环境webpack编译配置
|- config                              配置文件
  |- dev.env.js                          开发环境配置
  |- index.js                            公共配置
  |- prod.env.js                         生产环境配置
  |- prod.online.env.js                  生产环境配置
|- output                              生产环境编译后输出目录
|- src
  |- common                            公共内容
    |- modalHelper.js                    弹窗助手
    |- utils.js                          所有页面的公共内容
  |- componments                       组件
    |- answer                            答题模块的组件
      |- images                            图片
      |- index                             答题首页
      |- list                              答题题目页
      |- panel                             公共面板
      |- style                             公共样式
        |- app.postcss                       全局样式
      |- success                           答题成功页
  |- module                            模块入口
    |- answer                            答题模块入口
      |- router                            路由
      |- store                             数据存储
      |- styles                            公共样式
      |- answer.html                       公共页面
      |- answer.js                         模块入口文件
      |- app.vue                           跟组件
      |- interface.js                      接口地址
      |- interponents.js                   ajax访问控制
      |- log.js                            调试日志
      |- README.md                         模块说明
      |- setting.js                        模块设置
  |- public                            公共内容
    |- filters                           过滤器
    |- services                          公共的ajax（没用）
    |- styles                            公共的样式
    |- utils                             工具包
      |- barcode                           条形码显示
      |- cookie                            操作cookie
      |- dom                               dom相关操作，如事件监听与卸载
      |- getQueryString                    获得浏览器查询参数
      |- qrcode                            二维码显示
      |- setTitle                          设置浏览器标题
      |- url
|- .babelrc                          babel配置
|- .editorconfig                     编译器配置
|- .eslintignore                     不使用eslint的配置
|- .eslintrc.js                      eslint配置
|- .gitignore                        不使用git的配置
|- browserslist                      浏览器支持配置
|- package.json                      项目以来等配置
|- postcss.config.js                 postcss配置
|- README.md                         项目说明

```