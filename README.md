# vue-webpack-multipage

> A Vue.js project

## Build Setup

``` bash
# 安装依赖
npm install

# 本地启动并打开第一个模块
npm run local

# 本地启动并打开第一个模块，可指定模块进行开发
npm run local index about

# 测试环境编译
npm run qa

# 测试环境编译，可指定模块进行开发
npm run qa index about

# 预发布环境编译
npm run preview

# 预发布环境编译，可指定模块进行开发
npm run preview index about

# 线上环境编译
npm run online

# 线上环境编译，可指定模块进行开发
npm run online index about
```

## 说明

module 文件夹下的文件夹路径作为模块的id，因此在指定发布模块时需要使用除module外完整的路径名称。

每个模块下面有一个setting.js文件，里面指定当前模块的id（只能手动填写），便于路由进行配置；同时还有README.md文件，查看对象项目的说明。

项目主体的参数配置主要在config/index.js内，暂不支持produceName指定为空，因此该项目暂不支持在项目根目录的存放，需要修改。

## 该项目的对应的nginx配置

``` bash
set $app_root /data/webapps;

location ~ \.(html|css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac)$ {
  root $app_root/cmsfrontend/webroot;
  expires 30d;
}

#金融h5多页应用
location ~ ^/h5_lightning/module/ {
  root $app_root/cmsfrontend/webroot;
  expires -1;
  add_header Cache-control no-cache;
  try_files $uri $uri/ @h5_lightning_rewrites;
}

location @h5_lightning_rewrites {
  rewrite ^/h5_lightning/module/wxParkingNon /h5_lightning_static/module/wxParkingNon.html;
  rewrite ^/h5_lightning/module/douli /h5_lightning_static/module/douli.html;
  rewrite ^/h5_lightning/module/icbc /h5_lightning_static/module/icbc.html;
}
```

## 该项目对应的域名地址
因为需要使用https域名，所以在此使用单独的一个域名

测试：https://dev-smallapp.rongyi.com
v4：https://preview-smallapp.rongyi.com
v8：https://rp.rongyiguang.com

测试环境域名指向测试216环境

## px2rem
具体文档查看[px2rem](https://github.com/ZiQiangWang/px2rem)
```
{
  baseDpr: 2,             // base device pixel ratio (default: 2)
  remUnit: 75,            // rem unit value (default: 75)
  remPrecision: 6,        // rem value precision (default: 6)
  keepFontSize: true,     // no transform value of font-size
  forcePxComment: 'px',   // force px comment (default: `px`)
  keepComment: 'no'       // no transform value comment (default: `no`)
}
```

## 项目开发与部署

### 本地开发

``` bash
npm run local
```

可指定`/config/index.js`下的`currentModule`值为模块名称（可指定多个中间用空格间隔），方便开发本次内容不用记录繁琐的名字，同时该参数仅在本地开发环境有用，其他环境不可用

执行上面的命令后会打开字母表顺序排位第一的模块首页，如果有多余的参数需要手动指定

### 测试环境
jenkins工程名：qa_vue_webpack

git_name => h5_lightning

branch_name => feature/20190403-douli

module_name => douli

### V4环境

jenkins工程名：preview_vue_webpack

git_name => h5_lightning

branch_name => feature/20190403-douli

module_name => douli

### V8环境

jenkins工程名：newonline_vue_webpack

git_name => h5_lightning

branch_name => feature/20190403-douli

module_name => douli

