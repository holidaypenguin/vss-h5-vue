# 司机圈页面

# nginx
```
location ~ \.(html|css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt|map)$ {
    root   /www/data;
    expires 30d;
}
    
location ~ / {
    root /www/data;
    expires -1;
    add_header Cache-control no-cache;
    rewrite / /vss_h5_static/module/driversRing.html break;
    error_page 405 =200 $uri;
}
```

# 本地开发
```
npm run local driversRing
```

# 线上部署
```
npm run test:build driversRing
```