# 油币

https://www.driversite.cn/vss_h5/module/driversCoin


# 本地联调方法

npm run local driversCoin

http://127.0.0.1:8092/vss_h5/module/driversCoin

# 测试环境联调

npm run qa driversCoin
npm run driversCoin:upload

http://test-m.driversite.cn/vss_h5/module/driversCoin/index

# 线上部署
```
npm run test:build driversCoin
```

# 线上 nginx 配置

``` bash
location ~ \.(html|css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt)$ {
    root   /www/data;
    expires 30d;
}
    
location ~ ^/vss_h5/module/ {
    root /www/data;
    expires -1;
    add_header Cache-control no-cache;
    rewrite ^/vss_h5/module/driversCoin /vss_h5_static/module/driversCoin.html break;
    error_page 405 =200 $uri;
}
```



需要交互的应该是获取登录状态、中途登录、中途登录后返回状态、导航、定位信息、打开新页面、显示当前页面、隐藏当前页面

# sftp
ftp 服务器 123.57.63.198 
用户：htmlftp
密码：a0125758fc9AA