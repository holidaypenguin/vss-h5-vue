import RyHead from '../../../componments/common/jiduoduo/ryHead/ryHead'
import Utils from '../common/utils'

export default {
  name: 'Ry_Head',

  mixins: [RyHead, Utils],

  data () {
    return {
    }
  },

  computed: {
  },

  mounted () {
  },

  methods: {
    backHandler () {
      const routeName = this.$route.name

      switch (routeName) {
        case 'my':
        case 'list':
          // eslint-disable-next-line
          hybrid_app.back()
          break
        case 'buy':
          if (this.$route.params && this.$route.params.couponCode) {
            this.toBackPage()
          } else {
            this.toListPage()
          }
          break
        case 'result':
          this.toListPage()
          break
        case 'qrcode':
        default:
          this.toBackPage()
      }
    },
    toListPage () {
      this.$router.replace({
        name: 'list',
        query: (this.getQuery && this.getQuery()) || {},
      })
    },
    toBackPage () {
      this.$router.go(-1)
    },
    shareHandler () {
      const shareInfo = {
        PNGUrl: 'http://rongyi.b0.rongyi.com/commodity/text/201612141815521906.jpg',
        ShareUrl: `${location.origin}${location.pathname}`,
        Title: '积多多福利社',
        Content: '积多多福利社',
      }
      // eslint-disable-next-line
      hybrid_app.share(JSON.stringify(shareInfo))
    },
  },
}
