# vue-webpack-multipage

> A Vue.js project

## Build Setup

``` bash
# 安装依赖
npm install

# 本地启动并打开第一个模块
npm run local

# 线上环境编译
npm run online answer
```

本地启动成功以后使用下面链接访问，如果服务启动接口有变化自行更改
http://127.0.0.1:8092/wxpaper/index?pid=9ea5530d58214467ac05a410021b18ba&oid=oLuM76WgdeE44KCnLqYSuKSdNDs8

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

#h5多页应用
location ~ ^/h5_vss/module/ {
  root $app_root/cmsfrontend/webroot;
  expires -1;
  add_header Cache-control no-cache;
  try_files $uri $uri/ @h5_vss_rewrites;
}

location @h5_vss_rewrites {
  rewrite ^/h5_vss/module/wxParkingNon /h5_vss_static/module/wxParkingNon.html;
  rewrite ^/h5_vss/module/douli /h5_vss_static/module/douli.html;
  rewrite ^/h5_vss/module/icbc /h5_vss_static/module/icbc.html;
}
```


## 项目开发与部署

### 本地开发

``` bash
npm run local
```

可指定`/config/index.js`下的`currentModule`值为模块名称（可指定多个中间用空格间隔），方便开发本次内容不用记录繁琐的名字，同时该参数仅在本地开发环境有用，其他环境不可用

执行上面的命令后会打开字母表顺序排位第一的模块首页，如果有多余的参数需要手动指定
