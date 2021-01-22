export interface Rank {
  id:string
  title:string // 电影名称
  duration:string // 电影时长
  isPlay:boolean // 是否正在上映
  rate:string // 评分--如果没有上映就显示上映时间，否则显示电影评分
  casts:string // 主角们
  poster:string // 图片地址
  pubdate?:string // 上映时间
}

export interface Category {
  id:number
  name:string
}

/**
 * 是否上映
 */
type PlayName = "全部" | "已上映" | "未上映";
type PlayType = "" | "1" | "0";
export interface Play {
  name:PlayName
  type:PlayType
}

/**
 * 更新分类
 */
export interface UpdataCategoryData {
  type?: number[]
  status: string
  rate: number[]
}

export interface MovieTypes {
  avatar?:string // 照片url
  name:string // 演员名称

}

/**
 * 详细简介
 */
export interface Explain {
  name:string // 电影名称
  rate:string // 评分
  author:string // 导演
  // casts:string // 演员
  movieTypes:string // 电影类型
  authorArr: MovieTypes[], // 演员 + 照片
  summary: string // 电影简介
}