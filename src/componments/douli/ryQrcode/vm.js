import RyQrcode from '../../common/jiduoduo/ryQrcode/ryQrcode'
import Utils from '../common/utils'
export default {
  name: 'Ry_Qrcode',
  mixins: [Utils],
  props: {
    id: undefined,
    couponCode: undefined,
  },
  data () {
    return {
      query: undefined,
    }
  },
  mounted () {
    this.query = (this.getQuery && this.getQuery()) || {}
  },

  components: {
    RyQrcode,
  },
}
