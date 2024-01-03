import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
    constructor(
      ){}

    async uploadAvator(file){
        // console.log('🚀 ~ file: upload.service.ts:9 ~ UploadService ~ uploadAvator ~ file:', file)
        console.log('🚀 ~ file: upload.service.ts:11 ~ UploadService ~ uploadAvator ~ file.path:', file)
        let path = file.path.replace(/\\/g, '/') || ''
        // console.log('🚀 ~ file: upload.service.ts:11 ~ UploadService ~ uploadAvator ~ path:', path)
        return {path}
        
    }
}
