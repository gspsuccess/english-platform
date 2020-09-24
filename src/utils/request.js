import axios from 'axios'
import { Loading, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

let loadingInstance
let reqNum = 0

function startLoading() {
  if (reqNum === 0) {
    loadingInstance = Loading.service({})
  }
  reqNum++
}

function endLoading() {
  setTimeout(closeLoading, 300)
}

function closeLoading() {
  if (reqNum <= 0) return
  reqNum--
  if (reqNum === 0) {
    loadingInstance.close()
  }
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000
})

// let loadingInstance = Loading.service({})
service.interceptors.request.use(
  config => {
    startLoading()
    // 如果存在 token 则附带在 http header 中
    if (store.getters.token) {
      config.headers['token'] = `${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    const res_msg = res.msg || '请求失败'
    if (res.code !== 1) {
      Message({
        message: res_msg,
        type: 'error',
        duration: 5 * 1000
      })

      // 判断 token 失效的场景
      if (res.code === 'token_not_valid') {
        // 如果 token 失效，则弹出确认对话框，用户点击后，清空 token 并返回登录页面
        MessageBox.confirm('Token 失效，请重新登录', '确认退出登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      endLoading()
      return Promise.reject(new Error(res_msg))
    } else {
      endLoading()
      return res
    }
  },
  error => {
    console.log(500)
    let message = error.message || '请求失败'
    if (error.response && error.response.data) {
      const { data } = error.response
      message = data.msg
    }
    // let message = error_response.data.detail || '请求失败'
    // if (error.response && error.response.data) {
    //   const { data } = error.response
    //   message = data.detail
    //   if (error_response.status === 401) {
    //     message = '登录名或密码有误'
    //   }
    // }
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    endLoading()
    return Promise.reject(error)
  }
)

export default service
