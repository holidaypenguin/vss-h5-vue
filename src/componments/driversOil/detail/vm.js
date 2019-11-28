import Utils from '@/module/driversOil/utils'
import Sdk from '@/module/driversOil/sdk'
import Nav from '../nav/nav.vue'

import {
  mapState,
  mapMutations,
} from 'vuex'

import {
  SET_LOADING,
} from '../../../module/driversOil/store/mutations-type'

import {
  GETDETAIL,
} from '../../../module/driversOil/interface'

export default {
  name: 'Detail',

  mixins: [Utils],

  components: {
    Nav,
  },

  props: {
    id: {
      default: '',
    },
  },

  data () {
    return {
      title: '加油优惠',
      gasInfo: {},
      oilMap: undefined,
      gunNo: undefined,
      platformCode: '', // 用户唯一标识 是用户手机号
    }
  },

  computed: {
    ...mapState({
      tokenId: state => state.tokenId,
      platformType: state => state.platformType,
      userInfo: state => state.userInfo,
    }),
    diffPrice () {
      if (!this.oilMap) return 0

      return this.oilMap.priceYfq - this.oilMap.priceOfficial
    },
    diffPriceAbs () {
      if (!this.diffPrice) return 0

      return Math.abs(parseFloat(this.diffPrice.toFixed(2)))
    },
    diffPriceType () {
      if (!this.diffPrice) return 0

      return this.diffPrice > 0 ? 2 : this.diffPrice < 0 ? 1 : 0
    },
  },

  async created () {
    await this.search()
  },

  async mounted () {

  },

  methods: {
    ...mapMutations([
      SET_LOADING,
    ]),
    backHandler () {
      this.$router.go(-1)
    },
    async search () {
      if (this.getting) return

      this.getting = true

      this[SET_LOADING](true)
      const {data: {gasInfo}} = await this.$axiosForm.post(
        GETDETAIL,
        {
          gasId: this.id,
        },
        {
          headers: {
            token: this.tokenId,
            // token: this.userInfo.tokenId,
          },
        },
      ).catch((e) => {
        this.getting = false
        this[SET_LOADING](false)

        // 返回code 1029的时候，提示登录页面
        if (e.code === 1029) {
          return this.toLogin()
        }

        return Promise.reject(e)
      })

      this.gasInfo = gasInfo
      gasInfo.oilPriceList = gasInfo.oilPriceList.filter(item => item.oilNo >= 0)
      this.oilMap = gasInfo.oilPriceList[0]

      this.getting = false
      this[SET_LOADING](false)
    },
    async toLogin () {
      await Sdk.toLogin()
      await Sdk.getUserInfo()
    },
    tabHandler (index) {
      this.oilMap = this.gasInfo.oilPriceList[index]
      this.gunNo = undefined
    },
    gunNoHandler (gunNo) {
      this.gunNo = gunNo
    },
    goPay () {
      if (!this.gunNo) return

      const url = `https://test-open.czb365.com/redirection/todo/?platformType=${
        this.platformType}&platformCode=${this.platformCode}&gasId=${
        this.gasInfo.gasId}&gunNo=${this.gunNo}`
      window.location.href = url
    },
  },
}
