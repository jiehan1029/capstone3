export const dateToStr=function(date){
  // input date object, output "yyyy-mm-dd" string
  let month=date.getMonth()+1;
  let monthStr=month<10?'0'+month:month;
  let currD=date.getDate();
  let dStr=currD<10?'0'+currD:currD;
  const res=date.getFullYear()+'-'+monthStr+'-'+dStr;
  return res;
}
