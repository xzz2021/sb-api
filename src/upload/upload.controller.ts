import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

      //  上传文件 接口
      @Post('avator')
      @UseInterceptors(FileInterceptor('file'))
      uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log('----------',file);
        return true
      }

}
