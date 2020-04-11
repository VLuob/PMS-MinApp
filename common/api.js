const DOMAIN = 'https://wygl.98ck.com'
//const DOMAIN = 'http://192.168.1.59:3002/mock/29/wygl.98ck.com'
const Staff = {
  staffadd: DOMAIN + '/staff/add', //【新增物业工作人员】
  staffdel: DOMAIN + '/staff/delete/', //【删除物业工作人员】
  findById: DOMAIN + '/staff/findById/', //【id查询物业工作人员】
  uploadFiles: DOMAIN + '/common/uploadFiles', //【文件上传】
  getOpenId: DOMAIN + '/common/getOpenId', //【获取openid】
  staffgetList: DOMAIN + '/staff/getList', //【物业工作人员分页数据】
  gethpone: DOMAIN + '/common/getPhone', //【获取手机号】
  getQrCode: DOMAIN +'/common/getQrCode',//【获取二维码】
  getMiniCode:DOMAIN +'/common/getMiniCode',//【生成小程序码】
  verify: DOMAIN +'/common/verify',//【工作人员验证】
}
const Guard = {
  guardadd: DOMAIN + '/guard/add', //【新增保安】
  guarddel: DOMAIN + '/guard/delete/', //【删除保安】
  guardgetList: DOMAIN + '/guard/getList', //【保安分页数据】
}

const Build = {
  buildadd: DOMAIN + "/building/add", //【新增楼宇楼层】
  buildgetlist: DOMAIN + '/building/getList', //【楼宇分页数据】
  buildupdate: DOMAIN + '/building/update', //【楼宇更新】
  update: DOMAIN + '/real-estate/update' //【添加楼栋数量】
}

const Entry = {
  entryadd: DOMAIN + "/entry/add", //【新增进出记录】
  findById: DOMAIN + '/entry/findById/'//【查询进出记录】
}

module.exports = {
  ...Staff,
  ...Guard,
  ...Build,
  ...Entry,
}