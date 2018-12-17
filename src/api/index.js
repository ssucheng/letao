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
// 退出接口
export const exitRoot = () => {
  return axios.get('/employee/employeeLogout').then(result => {
    return result.data
  })
}
// 用户模块
export const getUser = (pa) => {
  return axios.get('/user/queryUser', {params: pa}).then(result => {
    return result
  })
}
// 用户状态更新操作
export const updateUser = (pa) => {
  return axios.post('/user/updateUser', pa).then(result => {
    return result
  })
}
// 1级分类数据查询
export const getCategory = (pa) => {
  return axios.get('/category/queryTopCategoryPaging', {params: pa}).then(result => {
    return result
  })
}
// 二级分类查询
export const getTwoCategory = (pa) => {
  return axios.get('/category/querySecondCategoryPaging', {params: pa}).then(result => {
    return result
  })
}
// 产品数据查询
export const getProduct = (pa) => {
  return axios.get('/product/queryProductDetailList', {params: pa}).then(result => {
    return result
  })
}
