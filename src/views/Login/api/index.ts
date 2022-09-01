import request from '@/utils/request'

const loginApi = {
  userLogin: '/api/auth/login',
  userRegister: '/api/auth/register',
  sendCaptcha: '',
  forgetPassword: '',
  resetPassword: '',
  permissionRoutes: '',
  userInfo: '/api/auth/query'
}

class Service {
  /**
   * @description POST 用户登录接口
   */
  static postLogin(data: any) {
    return request({
      url: loginApi.userLogin,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.code === 0) {
        return Promise.resolve(res.data.token)  // 获取token
        // return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * @descript POST  用户注册
   */
  static postRegister(data: any) {
    return request({
      url: loginApi.userRegister,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.code === 0) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * @description   POST 发送验证码 /auth/email/sendCaptcha
   */
  static postCaptcha(data: any) {
    return request({
      url: loginApi.sendCaptcha,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.code === 0) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * @description POST 忘记密码接口
   */
  static postForgetPwd(data: any) {
    return request({
      url: loginApi.forgetPassword,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.code === 0) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * @description /auth/user/reset-password/{token}
   */
  static postResetPwd(data: any) {
    return request({
      url: loginApi.resetPassword,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.code === 0) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * @description POST 保存授权菜单权限
   */
  static postAuthPermission(data: any) {
    return request({
      url: loginApi.permissionRoutes,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.code === 0) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * @description GET 查询用户信息
   */

  static postAuthUserInfo() {
    return request({
      url: loginApi.userInfo,
      method: 'GET',
      json: false,
      params: { token: localStorage.getItem('token') }
    }).then((res) => {
      if (res.code === 0) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }
}
export default Service
