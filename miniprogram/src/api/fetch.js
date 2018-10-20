import axios from 'axios'
import wepyAxiosAdapter from 'wepy-plugin-axios/dist/adapter' 
const adapter = wepyAxiosAdapter(axios)
// 创建axios实例
const service = axios.create({
  adapter: adapter,
  baseURL : 'https://apibillms.resnn.com'
})

// request拦截器
service.interceptors.request.use(config => {
  
  return config
}, error => {
  // console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 204) {
      return response.data
    } else if (response.status === 404) {
      return Promise.reject(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    //   console.error('err', [error]) // for debug
    
    return Promise.reject(error)
  }
)

export default service
