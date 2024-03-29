# 司机圈儿分享页面

https://www.driversite.cn/share/vss_h5/module/driversShare?shareSign=66bb07ae4dcf6625f0c3b7404ede2013&feedUid=25&feedId=28575782469107712

# 线上 nginx 配置

``` bash
location ~ \.(html|css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt)$ {
    root   /www/data;
    expires 30d;
}
    
location ~ ^/share/vss_h5/module/ {
    root /www/data;
    expires -1;
    add_header Cache-control no-cache;
    rewrite ^/share/vss_h5/module/driversShare /vss_h5_static/module/driversShare.html break;
    error_page 405 =200 $uri;
}
```

# 本地联调方法

1. 配置本地host 
    ```
    127.0.0.1 www.driversite.cn
    ```
2. 配置本地nginx转发到本地服务
    ```
    server {
        listen 80;
        server_name  www.driversite.cn;

        #charset koi8-r;

        access_log  logs/www.driversite.cn.access.log  main;
        
        location ~ \.(html|css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt|map)$ {
            expires -1;
            add_header Cache-control no-cache;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_http_version 1.1;
            proxy_pass http://127.0.0.1:8092;
            proxy_redirect off;
        }
        
        location ~ ^\/share\/(.*) {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_http_version 1.1;
            proxy_pass http://127.0.0.1:8092/$1;
            proxy_redirect off;
        }
        
    }
    ```
3. webpack-dev-server 启动本地服务  npm run local driversShare

# 线上部署
```
npm run test:build driversShare
```