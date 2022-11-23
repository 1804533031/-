import http from '@/utils/request'
// 登陆接口
export const postUser = (user) => {
  return http.post('/user/login', user)
}
// 获取帖子接口
export const getArticle = () => {
  return http.post('/getArticleAll')
}
// 发布帖子接口
export const publishPost = (post) => {
  return http.post('/publishPost', post, {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      application: 'application/json'
    }
  })
}
// 发布评论接口
export const commentPost = (comment) => {
  return http.post('/commentPost', comment)
}
// 点赞接口
export const requestLiker = (liker) => {
  return http.post('/requestLiker', liker)
}
// 提交领养表单
export const submitPet = (message) => {
  return http.post('/commitWishForm', message)
}
// 获取领养的宠物列表
export const adopt = () => {
  return http.get('/petsInFos')
}
// 商城购买请求
export const shopping = (goods) => {
  return http.post('/addGoodsOrder', goods)
}
// 修改信息接口
export const updateUserInfo = (info) => {
  return http.post('/updateUserInfo', info, {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      application: 'application/json'
    }
  })
}
// 查询帖子接口
export const selectArticle = (userName) => {
  return http.post('/selectArticle', userName)
}
// 我的点赞接口
export const myLikerArticle = (myLike) => {
  return http.post('/myLikerArticle', myLike)
}
// 我的领养接口
export const myAdoption = (userName) => {
  return http.post('/myAdoption', userName)
}
// 秒杀商品接口
export const intoSecKill = () => {
  return http.post('/intoSecKill')
}
// 秒杀商品提交订单接口
export const commitSecKill = (data) => {
  return http.post('/commitSecKill', data)
}
// 退出接口
export const LogOut = (id) => {
  return http.get('/user/outLogin', { params: id })
}
// 所有订单接口
export const goodsOrderAll = (userName) => {
  return http.post('/goodsOrderAll', userName)
}
// 商城商品接口
export const store = () => {
  return http.post('/findAllGoods')
}
//所用用户信息接口
export const allUser = (msg,token) => {
  return http.post('/userInformation',msg,{
    headers: {
      // 'Content-Type': 'multipart/form-data',
      token:token
    }
  })
}
