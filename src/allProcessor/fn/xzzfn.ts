
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


export  const formatToTree = (ary: any[], pid: number | undefined) => {
    return ary
      .filter((item) =>
        // 如果没有父id（第一次递归的时候）将所有父级查询出来
        // 这里认为 item.parentId === 1 就是最顶层 需要根据业务调整
        pid === undefined ? item.parentId === null : item.parentId === pid
      )
      .map((item) => {
        // 通过父节点ID查询所有子节点
        item.children = formatToTree(ary, item.id)
        return item
      })
  }