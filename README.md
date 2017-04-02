1. 启动mongo
```
docker run -v /root/data:/data/db -p 27017:27017 -d mongo
```

2. 启动redis
```
docker run -d -p 6379:6379 -e REDIS_PASS="**None**" redis
```

3. 安装依赖
```
docker build -t install-liulab .
docker run -v /root/code/liulab:/code install-liulab
```

4. 启动后台服务

```

```