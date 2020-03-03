//封装http请求
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly

async function  request (requestHandler) {

  let {url,method='get',data} = requestHandler

  wx.showLoading({
    title: '加载中...',
  })
  return new Promise( async (resolve,reject)=>{
    fly[method](url)
    .then((res)=>{
      wx.hideLoading()
      if(res.status === 200){
        resolve(res)
      }else{
        reject(new Error('请求失败'))
      }
    })
    .catch((err)=>{
      wx.hideLoading()
      reject(err)
    })
  })
  
} 

function start(){

}

export default request