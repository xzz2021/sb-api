import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './interceptor/avator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

      //  上传文件 接口
      @Post('avator')
      @UseInterceptors(FileInterceptor('file', { storage }))
      uploadAvator(@UploadedFile( 
    //     new ParseFilePipe({
    //     validators: [
    //       new MaxFileSizeValidator({ maxSize: 1000 }),
    //       new FileTypeValidator({ fileType: 'image/jpeg' }),
    //     ],
    //   }),
    ) 
    file: Express.Multer.File) {
        // console.log('----------',file);
        return this.uploadService.uploadAvator(file)
      }

}
