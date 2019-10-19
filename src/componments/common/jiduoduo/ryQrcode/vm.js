import {mapState} from 'vuex'
import qrcode from '../../../../public/utils/qrcode'
import barcode from '../../../../public/utils/barcode'
import Utils from '../common/utils'
import RyConfirm from '../ryConfirm/index'
import RyGive from '../ryGive/index'
// import {DateFormate} from '../../../../public/filters/dateformate'

import {
  COUPON_USED,
} from '../common/interface'
import {
  QRCODE_MSG,
  SET_LOADING,
} from '../common/mutations-type'

export default {
  name: 'RyQrcode',

  mixins: [Utils],

  components: {
    RyConfirm,
    RyGive,
  },

  props: {
    id: undefined,
    couponCode: undefined,
    query: undefined,
  },

  data () {
    return {
      qrCodeUrl: '',
      barCodeUrl: '',
      code: '',
      codeFormate: '',
      title: '',
      startAt: '',
      endAt: '',
      codeSource: undefined,
      codeStatus: undefined,
      codeStatusOpts: {
        3: '已使用',
        4: '已作废',
        5: '已退款',
        6: '已过期',
        7: '已赠送',
      },
      showMsg: true,
      confirmVisiable: false,
      giveVisiable: false,
      using: false,
      smType: 0,
    }
  },

  computed: {
    ...mapState({
      tokenId: state => state.tokenId,
    }),
    isUn () {
      return '4567'.indexOf(this.codeStatus) >= 0
    },
  },

  created () {
    this.ModalHelper.beforeClose()
  },

  mounted () {
    this.queryDetail()
  },

  methods: {
    queryDetail () {
      this.setData()
      this.formateCode()
      this.getQrcode()
      this.getBarcode()
      this.setHeight()
    },
    setData () {
      const data = this.getMsg()

      if (!data) {
        return
      }

      this.code = data.code
      this.title = data.couponName
      this.startAt = data.validStartAtStr
      this.endAt = data.validEndAtStr
      this.codeSource = data.codeSource
      this.codeStatus = data.codeStatus
    },
    getMsg () {
      try {
        return JSON.parse(localStorage.getItem(QRCODE_MSG)) || undefined
      } catch (e) {
        return undefined
      }
    },
    setMsg (data) {
      try {
        return JSON.parse(localStorage.setItem(QRCODE_MSG, JSON.stringify(data))) || undefined
      } catch (e) {
        return undefined
      }
    },
    formateCode () {
      this.codeFormate = this.code.replace(/(\d{4})/g, '$1 ').replace(/\s$/g, '')
    },
    getQrcode () {
      const fg = '#000000'
      const bg = '#F5F5F5'
      let qrcodeCanvas = document.createElement('canvas')
      qrcodeCanvas.width = 325
      qrcodeCanvas.height = 325

      qrcode.draw(this.code, {
        ctx: qrcodeCanvas,
        width: 345,
        height: 345,
        fg,
        bg,
      })

      this.qrCodeUrl = qrcodeCanvas.toDataURL()
      qrcodeCanvas = undefined
    },
    getBarcode () {
      const fg = '#000000'
      const bg = '#F5F5F5'
      let barcodeCanvas = document.createElement('canvas')
      barcodeCanvas.width = 471
      barcodeCanvas.height = 124

      barcode(this.code, {
        ctx: barcodeCanvas,
        width: 471,
        height: 124,
        fg,
        bg,
      })

      this.barCodeUrl = barcodeCanvas.toDataURL()
      barcodeCanvas = undefined
    },
    setHeight () {
      setTimeout(() => {
        if (this.smType > 1) return

        if (this.$el.clientHeight >= this.$el.scrollHeight) return

        this.smType++
        this.$nextTick(() => {
          this.setHeight()
        })
      }, 0)
    },
    goDetail () {
      this.$router.push({
        name: 'buy',
        params: {
          id: this.id,
          couponCode: this.couponCode,
        },
        query: this.query || {},
      })
    },
    toUseHandler () {
      this.confirmVisiable = true
    },
    cancelHandler () {
      this.confirmVisiable = false
    },
    confirmHandler () {
      this.confirmVisiable = false
      if (this.using) return

      this.using = true

      this.$store.commit(SET_LOADING, true)

      const params = {
        code: this.code,
        tokenId: this.tokenId,
      }
      this.$axios.post(COUPON_USED, params)
        .then((data) => {
          this.$toast('券码已使用成功')
          this.codeStatus = 3
          this.$store.commit(SET_LOADING, false)
          this.using = false
        })
        .catch((e) => {
          this.$toast('券码已使用失败')
          this.using = false
          this.$store.commit(SET_LOADING, false)
        })
    },
    giveHandler () {
      this.giveVisiable = true
    },
    giveCancelHandler () {
      this.giveVisiable = false
    },
    giveConfirmHandler () {
      this.giveVisiable = false
      this.$toast('券码赠送成功')
      this.codeStatus = 7
      const data = this.getMsg() || []
      data.codeStatus = this.codeStatus
      this.setMsg(data)
    },
    giveBlurHandler () {
      this.$el.scroll(0, 10000)
      document.body.scroll(0, 0)
    },
  },
  destoryde () {
    // this.ModalHelper.beforeClose()
  },
}
