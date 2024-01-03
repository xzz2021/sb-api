import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
    constructor(
      ){}

    async uploadAvator(file){
        let path = file.path.replace(/\\/g, '/') || ''
        return {path}
        
    }
}
