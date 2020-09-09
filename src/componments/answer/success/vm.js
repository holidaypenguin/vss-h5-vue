
import {
  mapState,
  mapMutations,
} from 'vuex'

import {
  SET_LOADING,
} from 'module/answer/store/mutations-type'

import {
// GETLIST,
} from 'module/answer/interface'

export default {
  name: 'Index',

  mixins: [],

  components: {

  },

  data () {
    return {
      isGet: false,
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
    }),
  },

  async created () {
    // await this.search()
  },

  async mounted () {
    this.$nextTick(async () => {
      await this.$parent.loadConfig()
    })
  },

  activated () {
    this.$nextTick(() => {
    })
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
    ]),
    getRed () {
      this.isGet = true
    },
    closeHanler () {
      // eslint-disable-next-line no-undef
      WeixinJSBridge.call('closeWindow')
    },
    // async search () {
    //   if (this.getting) return

    //   this.getting = true

    //   this[SET_LOADING](true)
    //   const {data: {gasList}} = await this.$axios.get(
    //     GETLIST,
    //     // params,
    //     {
    //       params: this.params,
    //       headers: {
    //         token: this.tokenId,
    //       },
    //     },
    //   ).finally((e) => {
    //     this.getting = false
    //     this[SET_LOADING](false)
    //   })

    //   this.list = this.list.concat(gasList)
    // },

    startHanler () {

    },
  },
}
