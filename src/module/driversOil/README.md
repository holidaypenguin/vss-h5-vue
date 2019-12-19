# 加油站

https://www.driversite.cn/vss_h5/module/driversOil

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
    rewrite ^/vss_h5/module/driversOil /vss_h5_static/module/driversOil.html break;
    error_page 405 =200 $uri;
}
location ~ ^\/czb\/ {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_http_version 1.1;
    proxy_pass https://api.driversite.cn;
    proxy_redirect off;
}
```

# 本地联调方法

npm run local driversOil

http://127.0.0.1:8092/vss_h5/module/driversOil

# 测试环境联调

npm run qa
npm run driversOil:upload

http://test-m.driversite.cn/vss_h5/module/driversOil/index

# 线上部署
```
npm run test:build driversOil
```



需要交互的应该是获取登录状态、中途登录、中途登录后返回状态、导航、定位信息、打开新页面、显示当前页面、隐藏当前页面

# sftp
ftp 服务器 123.57.63.198 
用户：htmlftp
密码：a0125758fc9AA