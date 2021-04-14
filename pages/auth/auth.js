// pages/auth/auth.js
import regeneratorruntime from '../../lib/runtime/runtime';
import {request} from "../../request/index.js"
import {login} from "../../utils/asyncWx.js"
Page({

  //获取用户信息
 async handleGetUserInfo(e)
  {
  //  const {encryptedData,iv,rawData,signature}=e.detail;
  //  //获取小程序登录后的code
  //  const {code}=await login();
  //  console.log(code);
  //  const loginParams={encryptedData,rawData,iv,signature,code};
  //  //发送请求 获取token
  //  const res= await request({url:"/users/wxlogin",data:loginParams,method:"post"});
  //  console.log(res);
  }
})