import {mapState} from 'vuex'
import Utils from '../common/utils'
import {DateFormate} from '../../../../public/filters/dateformate'

import {
  GET_DETAIL,
  GET_RELATE_SHOP,
} from '../common/interface'

import {
  SET_LOADING,
  BUY_MSG,
} from '../common/mutations-type'

export default {
  name: 'RyBuy',
  mixins: [Utils],

  props: {
    id: undefined,
    couponCode: undefined,
  },
  data () {
    return {
      showShop: false,
      shopList: [],
      detail: {},
      params: {
        unitPrice: 0,
        num: 1,
        id: '',
      },
      couponStatusOpts: {
        3: '使用',
        4: '作废',
        5: '退款',
        6: '过期',
        7: '赠送',
      },
    }
  },
  computed: {
    ...mapState({
      tokenId: state => state.tokenId,
      platform: state => state.platform,
    }),
    stockCount () {
      return parseInt(this.detail.stockCount, 10) || 0
    },
    numIn () { // 库存是否大于0
      return this.stockCount > 0
    },
    isMin () {
      return this.params.num <= 1
    },
    isMax () {
      return this.params.num >= this.stockCount
    },
    canBuy () { // 是否能买
      return this.numIn && this.params.num > 0
    },
    buyStr () { // 购买按钮文案
      return this.canBuy
        ? '支付'
        : this.detail.status !== 0
          ? '已下架'
          : !this.numIn ? '已抢光'
            : ''
    },
    count () { // 总价
      let count = this.params.unitPrice * this.params.num
      const pointSite = count.toString().indexOf('.')
      const length = count.toString().length
      // 保留小数点
      if (pointSite < 0) {
        // eslint-disable-next-line no-self-assign
        count = count
      } else if (length - pointSite >= 3) {
        count = count.toFixed(2)
      } else if (length - pointSite >= 2) {
        count = count.toFixed(1)
      } else {
        count = parseInt(count, 10)
      }

      return count
    },
    isAll () { // 是否是全部店铺
      return Number(this.detail.allShop) === 0
    },
  },
  async mounted () {
    await this.queryDetail()
  },

  methods: {
    transShop () {
      this.showShop = !this.showShop
      // document.body.style.overflow = this.showShop ? 'hidden' : 'inherit'
      // document.querySelector('.ry-app').style.overflow = this.showShop ? 'hidden' : 'inherit'
      if (this.showShop) {
        this.ModalHelper.afterOpen()
      } else {
        this.ModalHelper.beforeClose()
      }
    },

    async queryDetail () {
      this.$store.commit(SET_LOADING, true)

      const params = {
        id: this.id,
        tokenId: this.tokenId,
        couponCode: this.couponCode,
      }
      const originDetail = await this.$axios.post(GET_DETAIL, params)

      this.detail = (originDetail.data.result && originDetail.data.result.data.scoreGoodsVo) || {}
      this.detail.goodsDesc = `<ul>
        <li>${this.detail.goodsDesc.replace(/[\n\r]/g, '</li><li>')}</li>
      </ul>`
      this.detail.goodsDesc = this.detail.goodsDesc
        .replace(/(https*:\/\/[\w.?=&/%:-]*)/, '<a href="$1">$1</a>')
      this.setParams()
      this.setDateTime()

      const originShop = await this.queryShops()
      this.shopList = originShop.data.result.data

      this.$store.commit(SET_LOADING, false)
    },
    setParams () {
      this.params.id = this.id
      this.params.unitPrice = this.detail.currentPrice
    },
    setDateTime () {
      if (this.detail.validType === 2 && !this.couponCode) {
        const dateNow = Date.now()
        this.detail.validStartDay = this.detail.validStartDay || 0
        this.detail.validEndDay = this.detail.validEndDay || 0

        this.detail.validStartDay = dateNow + this.detail.validStartDay * 24 * 3600000
        this.detail.validEndDay = dateNow + (this.detail.validEndDay - 1) * 24 * 3600000

        this.detail.validStartAtStr = DateFormate(this.detail.validStartDay, 'yyyy.M.d')
        this.detail.validEndAtStr = DateFormate(this.detail.validEndDay, 'yyyy.M.d')
      } else {
        this.detail.validStartAtStr = DateFormate(this.detail.validStartAt, 'yyyy.M.d')
        this.detail.validEndAtStr = DateFormate(this.detail.validEndAt, 'yyyy.M.d')
      }
      this.detail.payTimeSrc = DateFormate(this.detail.payTime, 'yyyy.MM.dd hh:mm:ss')
      this.detail.tradeTimeSrc = DateFormate(this.detail.tradeTime, 'yyyy.MM.dd hh:mm:ss')
    },
    async queryShops () {
      const originShop = await this.$axios.post(GET_RELATE_SHOP, {
        id: this.detail.couponId,
        isBsoms: false,
      })

      return originShop
    },
    miniHandler () {
      if (this.isMin) return

      this.params.num--
    },
    addHandler () {
      if (this.isMax) return

      this.params.num++
    },
    toBuyPre () {
      localStorage.setItem(BUY_MSG, JSON.stringify({
        id: this.params.id,
        iconUrl: this.detail.iconUrl,
        name: this.detail.name,
        num: this.params.num,
        validStartAtStr: this.detail.validStartAtStr,
        validEndAtStr: this.detail.validEndAtStr,
      }))
    },
    handleWheel (e) {
      e.stopPropagation()
      e.preventDefault()
    },
  },

  destoryde () {
    this.ModalHelper.beforeClose()
  },
}
