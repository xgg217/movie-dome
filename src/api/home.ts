import request from "/@/utils/request";

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
const getMovieStatusAPI = ( status:string, rate:number[], ):any => {
  return request({
    url: `/api/movie`,
    params: {
      status,
      rate: JSON.stringify(rate),
      // categories: JSON.stringify(type) // 该参数不能用
    },
    method: 'get',
  })
}


/**
 * 获取分类数据
 */
const getCategoryAPI = ():any => {
  return request({
    url: `/api/category`,
    method: 'get',
  })
};

/**
 * 电影模糊搜索
 */
const getSearchAPI = (val:string):any => {
  return request({
    url: `/api/movie/search?keyword=${ val }`,
    method: 'get',
  })
};

/**
 * 热门搜索
 */
const getKeywordAPI = ():any => {
  return request({
    url: `/api/keyword`,
    method: 'get',
  })
};

export {
  getHotAPI,
  getRankAPI,
  getMovieStatusAPI,
  getCategoryAPI,
  getSearchAPI,
  getKeywordAPI,
}

