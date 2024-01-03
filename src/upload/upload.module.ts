import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
// import { MulterModule } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { join, extname } from 'path';

@Module({
  imports: [
    //  MulterModule.register({
    //   // 用于配置上传，这部分也可以写在路由上
    //   storage: diskStorage({
    //    // destination: join(__dirname, '../images'),
    //    destination: join('./public/uploaded'),
    //    filename: (_, file, callback) => {
    //     //  解决中文乱码
    //     file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
    //     // 提取用户昵称
    //     let chineseName  = file.originalname.split('_')[0]
    //     const fileName = `${chineseName}-${
    //      new Date().getTime() + extname(file.originalname)
    //     }`;
    //     return callback(null, fileName);
    //     },
       
    //    }),
    //   }),
     ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
