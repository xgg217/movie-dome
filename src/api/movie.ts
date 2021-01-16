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

export {
  getMovieAPI
}

