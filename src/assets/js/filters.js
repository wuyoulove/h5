// 时间过滤器
let formatDate=(date)=>{ 
    if(date.indexOf("T")>0){
        return date.substring(0,date.indexOf("T"))+' '+date.substring(date.indexOf("T")+1)
    }
  }
let format=(date)=>{
  // // debugger
  // console.log(typeof(date))
  //  if(date != ''){
  //   date = date.toString()
  //   return date.substring(0,10)
  //  }
}
export { formatDate,format}
