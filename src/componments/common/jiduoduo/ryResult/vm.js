import Utils from '../common/utils'
import {
  BUY_MSG,
} from '../common/mutations-type'

export default {
  name: 'RyResult',

  mixins: [Utils],

  data () {
    return {
      detail: {
      },
      isSuccess: false,
      successMsg: '支付成功',
      errorMsg: '支付失败',
    }
  },

  mounted () {
    this.getDetail()
    window.onbeforeunload = (e) => {
      this.toReturn()
    }
  },

  methods: {
    getDetail () {
      try {
        this.detail = localStorage.getItem(BUY_MSG) && JSON.parse(localStorage.getItem(BUY_MSG))
        this.detail = this.detail || {}
        this.isSuccess = !!this.detail.name
      } catch (e) {
        this.detail = {}
        this.isSuccess = false
      }
    },

    toUsePage () {
      this.$router.replace({
        name: 'my',
        query: (this.getQuery && this.getQuery()) || {},
      })
    },
    toReturn () {
      if (this.detail.id) {
        this.$router.replace({
          name: 'buy',
          params: {
            id: this.detail.id,
          },
          query: (this.getQuery && this.getQuery()) || {},
        })
      } else {
        this.$router.push({
          name: 'list',
          query: (this.getQuery && this.getQuery()) || {},
        })
      }
    },
  },
}
