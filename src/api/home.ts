import request from "./../utils/request";

interface Data {
  code:number
  errMsg:string
  data:object
}

/**
 * 获取首页电影列表
 */
const getHotAPI = ():any => {
  return request({
    url: `/api/movie/hot`,
    method: 'get',
  })
}

export {
  getHotAPI
}

