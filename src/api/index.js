import axios from 'axios'
// 设置基础路径
const baseUrl = 'http://127.0.0.1:3000/'
axios.defaults.baseURL = baseUrl
// 让axios可以携带cookie
axios.defaults.withCredentials = true
// 登录接口
export const loginList = (pa) => {
  return axios.post('/employee/employeeLogin', pa).then((result) => {
    return result.data
  })
}
// 验证管理元是否登录接口
export const loginRoot = () => {
  return axios.get('/employee/checkRootLogin').then((result) => {
    return result.data
  })
}
