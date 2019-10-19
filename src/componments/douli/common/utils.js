
import setting from '../../../module/douli/setting'

export default {
  data () {
    return {
      setting,
    }
  },

  methods: {
    getQuery () {
      if (this.$route.query.mobile) {
        return {
          mobile: this.$route.query.mobile,
          cardNumber: this.$route.query.cardNumber,
        }
      }

      return undefined
    },
  },
}
