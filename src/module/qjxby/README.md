# 钱家巷包月

https://m.driversite.cn/vss_h5/module/qjxby


# 本地联调方法

npm run local qjxby

http://127.0.0.1:8092/vss_h5/module/qjxby

# 测试环境联调

npm run qa qjxby

http://wx.fe8216.rongyi.com/vss_h5/module/qjxby

nginx
```
location ~ \.(html|css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt)$ {
    root   /www/data;
    expires 30d;
}
    
location ~ ^/vss_h5/module/ {
    root /www/data;
    expires -1;
    add_header Cache-control no-cache;
    rewrite ^/vss_h5/module/qjxby /vss_h5_static/module/qjxby.html break;
    error_page 405 =200 $uri;
}
location ~ ^\/oil\/ {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_http_version 1.1;
    proxy_pass http://test-api.driversite.cn;
    proxy_redirect off;
}
```

# 线上部署
```
npm run online qjxby
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
    rewrite ^/vss_h5/module/qjxby /vss_h5_static/module/qjxby.html break;
    error_page 405 =200 $uri;
}

location ~ ^\/oil\/ {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_http_version 1.1;
    proxy_pass https://api.driversite.cn;
    proxy_redirect off;
}
```
