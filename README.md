#### shengbai 后端接口项目学习
##### 基于nestjs框架

框架结构说明:
1. 总入口: main.ts
2. orm配置文件: ormconfig.ts
3. 所有类中间件处理器(守卫,过滤器,拦截器,管道): src/allProcessor


打包部署说明:
1. 因为引用了环境变量,所以需手动复制config文件夹到打包后的src目录,否则会报错无法读取
2. 
