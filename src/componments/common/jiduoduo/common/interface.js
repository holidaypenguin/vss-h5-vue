/**
 * 获取用户信息
 *
 * http://rap.rongyi.so/workspace/myWorkspace.do?projectId=529#6155
 */
export const GET_USRE_INFO = '/lightning-integral-service/user/getUserInfo'

/**
 * 获取售卖的商品列表
 *
 * http://rap.rongyi.so/workspace/myWorkspace.do?projectId=529#6154
 */
export const GET_GOODS_LIST = '/lightning-integral-service/score/goods/list'

/**
 * 我的卡包
 *
 * http://rap.rongyi.so/workspace/myWorkspace.do?projectId=529#6160
 */
export const GET_MY = '/lightning-integral-service/score/goods/myWelfares'

/**
 * 卡券详情页面
 *
 * http://rap.rongyi.so/workspace/myWorkspace.do?projectId=529#6157
 */
export const GET_DETAIL = '/lightning-integral-service/score/goods/buyDetailPage'

/**
 * 查询全部店铺
 */
export const GET_ALL_SHOP = '/lightning-settle/area/queryAllShopByMall'

/**
 * 查询部分店铺
 */
export const GET_RELATE_SHOP = '/lightning-coupon-service/coupon/relate/shop'

/**
 * 已使用卡券
 *
 * http://rap.rongyi.so/workspace/myWorkspace.do?projectId=535#6204
 */
export const COUPON_USED = '/lightning-integral-service/score/goods/validCode'

/**
 * 卡券赠送
 *
 * http://rap.rongyi.so/workspace/myWorkspace.do?projectId=529#6266
 */
export const COUPON_GIFT = '/lightning-coupon-service/coupon/code/giftCoupon'
