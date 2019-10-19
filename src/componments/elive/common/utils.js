
import setting from '../../../module/elive/setting'

export default {
  data () {
    return {
      setting,
    }
  },

  methods: {
    getQuery () {
      if (!this.$route.query.loginParams && !this.$route.query.loginParams) {
        return undefined
      }
      const query = {}
      if (this.$route.query.loginParams) {
        query.loginParams = this.$route.query.loginParams
      }

      if (this.$route.query.params) {
        query.params = this.$route.query.params
      }

      return query
    },
    getResultQuery () {
      return this.$route.query
    },
  },
}
