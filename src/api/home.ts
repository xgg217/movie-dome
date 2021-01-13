import request from "./../utils/request";

/**
 * 获取首页电影列表
 */
const getHotAPI = ():any => {
  return request({
    url: `/api/movie/hot`,
    method: 'get',
  })
}

/**
 * 获取榜单数据
 */
const getRankAPI = ():any => {
  return request({
    url: `/api/movie/rank`,
    method: 'get',
  })
}


export {
  getHotAPI,
  getRankAPI
}

