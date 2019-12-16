
import {
  mapState,
  mapMutations,
} from 'vuex'

import {
  SET_LOADING,
  SET_LOADING_NEXT,
} from '../../../module/driversCoin/store/mutations-type'

import {
  GETLIST,
} from '../../../module/driversCoin/interface'

import Utils from '../../../module/driversCoin/utils'
// import Sdk from '../../../module/driversCoin/sdk'
import Nav from '../nav/nav.vue'
export default {
  name: 'Index',

  mixins: [Utils],

  components: {
    Nav,
  },

  data () {
    return {
      params: {
      },
      all: false,
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
    this.$nextTick(() => {

    })
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
    ]),
    indexHandler () {
      this.all = false
    },
    bottomHandler () {
      this.all = !this.all
    },
    myHandler () {
      if (this.all) return

      this.$router.push({
        name: '',
      })
    },
    buttonHandler () {
      if (this.all) return

      this.$router.push({
        name: '',
      })
    },
    async search (pageNo = 1) {
      if (this.isLoading) return

      this[SET_LOADING](true)
      const {data: {gasList}} = await this.$axiosForm.post(
        GETLIST,
        Object.assign({}, this.params, {
          count: this.page.count,
          page: pageNo,
        }),
        {
          headers: {
            token: this.tokenId,
          },
        },
      ).catch((e) => {
        this.getting = false
        this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](false)

        return Promise.reject(e)
      })

      if (pageNo === 1) {
        this.list = []
      }
      this.adjustList(gasList)
      this.list = this.list.concat(gasList)

      this.page.page = pageNo
      // this.page.totalPage = parseInt((count + this.page.count - 1) / page.count, 10) || 0
      this.page.gonext = gasList.length >= this.page.count

      this.getting = false
      this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](false)
    },
    adjustList (gasList) {
      if (!gasList || gasList.length < 1) return

      gasList.map(gas => {
        const oilPriceList = JSON.parse(gas.oilPrice)
        gas.oilPriceMap = oilPriceList.filter(oil => oil.oilNo === this.params.oilNo)[0]

        if (!gas.oilPriceMap) return

        const difPrice = gas.oilPriceMap.priceYfq - gas.oilPriceMap.priceOfficial
        gas.oilPriceMap.diffPriceType = difPrice > 0 ? 2 : difPrice < 0 ? 1 : 0
        gas.oilPriceMap.difPrice = Math.abs(parseFloat(difPrice.toFixed(2)))
      })
    },

    backHandler () {
      // this.$router.go(-1)
      this.nativeBack()
    },
  },
}
