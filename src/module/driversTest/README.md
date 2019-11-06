# 司机圈页面

https://m.driversite.cn/share/vss_h5/module/driversShare%20?feedUid=2&feedId=23027903402868736&shareSign=2889904b7867dd6c3a8250fb443f8550

# nginx 

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