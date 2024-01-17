
import { diskStorage } from 'multer';
import { extname, join } from 'path';

//  自定义头像存储目录  及文件名
   export const storage = diskStorage({
        // destination: join('./public/uploaded/avators'),
        destination: function (req, file, cb) {
            cb(null, join('./public/uploaded/avators'))
          },
        filename: (_, file, callback) => {
            //  解决中文乱码
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
            // 提取用户昵称
            let chineseName  = file.originalname.split('_')[0]
            const fileName = `${chineseName}-${new Date().getTime() + extname(file.originalname)}`
            callback(null, fileName);
            }
      })