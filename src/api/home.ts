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

/**
 * 获取分类数据
 */
const getMovieStatusAPI = ( status:number, rate:string):any => {
  return request({
    url: `/api/movie?status=${ status }&rate=${ rate }`,
    method: 'get',
  })
}


export {
  getHotAPI,
  getRankAPI,
  getMovieStatusAPI
}

