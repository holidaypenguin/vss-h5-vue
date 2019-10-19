import RyBuy from '../../common/jiduoduo/ryBuy/ryBuy2'
import {COMMIT_ORDER} from '../../../module/douli/interface'
import {SET_LOADING} from '../../../module/douli/store/mutations-type'
import Utils from '../common/utils'
import setting from '../../../module/douli/setting'
const config = require('../../../../config')

export default {

  mixins: [RyBuy, Utils],

  data () {
    return {
    }
  },

  methods: {
    async toBuy (e) {
      e.preventDefault()
      e.stopPropagation()

      if (!this.canBuy) return

      this.toBuyPre()

      this.$store.commit(SET_LOADING, true)

      const params = {
        goodsId: this.params.id,
        sums: this.params.num,
        tokenId: this.tokenId,
        platform: this.platform,
        tradeType: this.getTradeType(),
        redirectUrl: this.getRedirectUrl(),
      }
      const response = await this.$axios.post(COMMIT_ORDER, params)

      this.$store.commit(SET_LOADING, false)

      window.location.href = response.data.result.data
    },
    getTradeType () {
      return window.navigator.userAgent.indexOf('MicroMessenger') > 0 ? 'DOOOLY_JS' : 'DOOOLY_APP'
    },
    getRedirectUrl () {
      const msg = this.getQuery()

      // eslint-disable-next-line max-len
      return `${location.origin}/${config.produceName}/${config.moduleRootName}/${setting.moduleName
      }/result?mobile=${msg.mobile}&cardNumber=${msg.cardNumber}`
    },
  },
}
