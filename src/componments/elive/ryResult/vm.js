import RyResult from '../../common/jiduoduo/ryResult/vm.js'
import Utils from '../common/utils'

const msg = {
  1: '支付成功',
  2: '取消支付',
  3: '支付失败',
  4: '支付处理中',
}

export default {

  mixins: [RyResult, Utils],

  data () {
    return {
      resultCode: 1,
    }
  },

  mounted () {
    this.resultCode = this.getResultCode()

    this.setMsg()
  },

  methods: {
    getResultCode () {
      return parseInt(this.getResultQuery().result, 10) || 2
    },
    setMsg () {
      if (this.resultCode === 1) {
        this.isSuccess = true

        return
      }

      this.errorMsg = msg[this.resultCode]
      this.isSuccess = false
    },
  },
}
