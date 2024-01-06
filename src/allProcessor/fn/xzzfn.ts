
//  转换时间格式
export const changeDateFormate = function (thisrr: any) {

    if(thisrr){
        const rTime = (date) =>{  // 转换日期 时间 格式
            // var json_date = new Date(date).toJSON();
            return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
        }
        thisrr.createTime = rTime(thisrr.createTime)
        thisrr.updateTime = rTime(thisrr.updateTime)
    }
}