export interface Rank {
  id:string
  title:string // 电影名称
  duration:string // 电影时长
  isPlay:boolean // 是否正在上映
  rate:string // 评分--如果没有上映就显示上映时间，否则显示电影评分
  casts:string // 主角们
  poster:string // 图片地址
  pubdate:string // 上映时间
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