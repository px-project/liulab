1. 启动mongo
```
docker run -v /root/data:/data/db -d mongo
```

2. 启动redis
```
docer run -d redis
```

3. 安装依赖
```
docker build -t install-liulab .
docker run -v /root/code/liulab:/code install-liulab
```

4. 启动后台服务
```

```