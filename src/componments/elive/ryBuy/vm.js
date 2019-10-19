import RyBuy from '../../common/jiduoduo/ryBuy/ryBuy'
import {COMMIT_ORDER} from '../../../module/elive/interface'
import {SET_LOADING} from '../../../module/elive/store/mutations-type'
import Utils from '../common/utils'
import setting from '../../../module/elive/setting'
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
      }
      const response = await this.$axios.post(COMMIT_ORDER, params)

      this.$store.commit(SET_LOADING, false)

      document.body.innerHTML = response.data.result.data

      document.forms[0].submit()
    },
    getRedirectUrl () {
      const msg = this.getQuery()

      // eslint-disable-next-line max-len
      return `${location.origin}/${config.produceName}/${config.moduleRootName}/${setting.moduleName
      }/result?loginParams=${msg.loginParams}`
    },
  },
}
