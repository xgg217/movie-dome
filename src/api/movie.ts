import request from "/@/utils/request";

/**
 * 获取指定电影的信息和推荐相关
 */
const getMovieAPI = (ids:string):any => {
  return request({
    url: `/api/movie/${ ids }`,
    method: 'get',
  })
}

/**
 * 获取 电影 分类 列表
 */
const getStatusListAPI = (page:number, pageSize:number, status:number):any => {
  return request({
    url: `/api/movie/status?page=${ page }&pageSize=${ pageSize }&status=${ status }`,
    method: 'get',
  })
}

export {
  getMovieAPI,
  getStatusListAPI
}

