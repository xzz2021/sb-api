import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { storage } from './interceptor/avator';
import { UploadService } from './upload.service';

@ApiTags('文件上传接口')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

      //  上传文件 接口
      @Post('avator')
      @UseInterceptors(FileInterceptor('file', { storage }))
  @ApiOperation({summary: '头像上传', description: '只处理头像上传图片'})
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
