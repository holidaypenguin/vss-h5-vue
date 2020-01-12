# 司机圈活动

# nginx
```
location ~ \.(html|css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt|map)$ {
    root   /www/data;
    expires 30d;
}

location ~ ^/vss_h5/module/ {
    root /www/data;
    expires -1;
    add_header Cache-control no-cache;
    rewrite ^/vss_h5/module/driversStory /vss_h5_static/module/driversStory.html break;
    error_page 405 =200 $uri;
}
```

# 本地开发
```
npm run local driversStory
```

ngxin
```
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
    
    location ~ ^\/(.*) {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_pass http://127.0.0.1:8092/$1;
        proxy_redirect off;
    }
```
手机联调需要用filder

# 测试环境联调

npm run qa driversStory
npm run drivers:upload

http://test-m.driversite.cn/vss_h5/module/driversStory/index

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
    rewrite ^/vss_h5/module/driversStory /vss_h5_static/module/driversStory.html break;
    error_page 405 =200 $uri;
}
location ~ ^\/share\/ {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_http_version 1.1;
    proxy_pass http://test-api.driversite.cn;
    proxy_redirect off;
}
location ~ ^\/user\/ {
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
npm run online driversStory
```


``` bash
location ~ \.(html|css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt)$ {
    root   /www/data;
    expires 30d;
}
    
location ~ ^/vss_h5/module/ {
    root /www/data;
    expires -1;
    add_header Cache-control no-cache;
    rewrite ^/vss_h5/module/driversStory /vss_h5_static/module/driversStory.html break;
    error_page 405 =200 $uri;
}
location ~ ^\/share\/ {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_http_version 1.1;
    proxy_pass https://api.driversite.cn;
    proxy_redirect off;
}
location ~ ^\/user\/ {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_http_version 1.1;
    proxy_pass https://api.driversite.cn;
    proxy_redirect off;
}
```