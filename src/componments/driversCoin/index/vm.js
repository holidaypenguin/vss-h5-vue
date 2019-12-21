
import {
  mapState,
  mapMutations,
} from 'vuex'

import {
  SET_LOADING,
  SET_COINNUM,
} from '../../../module/driversCoin/store/mutations-type'

import {
  GETUN,
  GETCOIN,
  GETADCOUNT,
} from '../../../module/driversCoin/interface'

import Utils from '../../../module/driversCoin/utils'
import Sdk from '../../../module/driversCoin/sdk'
import Nav from '../nav/nav.vue'

import {getPosition} from './position'
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
      oilList: [],
      dayCount: 0,
      dayLimitCount: 0,
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
      coinNum: state => state.coinNum,
    }),
  },

  async created () {
  },

  async mounted () {
    await this.searchUn()
    await this.searchNum()
    this.$nextTick(() => {
      // this.oilList = this.setPosition([
      //   {}, {}, {}, {}, {},
      //   // {}, {}, {}, {}, {},
      //   // {}, {}, {}, {}, {},
      //   // {}, {}, {}, {}, {}, {},
      // ])
    })
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
      SET_COINNUM,
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
        name: 'my',
      })
    },
    async buttonHandler () {
      if (this.all) return

      if (this.dayCount >= this.dayLimitCount) return

      await Sdk.lookAd()
    },
    async searchUn () {
      if (this.coinNum) return

      this[SET_LOADING](true)
      const {data: {oilMoneyWorks}} = await this.$axiosForm.get(
        GETUN,
        {
          headers: {
            token: this.tokenId,
          },
        },
      ).catch((e) => {
        this[SET_LOADING](false)

        return Promise.reject(e)
      })

      this.oilList = this.setPosition(oilMoneyWorks || [])

      this[SET_LOADING](false)
    },
    async searchNum () {
      const {data: {dayCount, dayLimitCount}} = await this.$axiosForm.get(
        GETADCOUNT,
        {
          headers: {
            token: this.tokenId,
          },
        },
      )

      this.dayCount = dayCount
      this.dayLimitCount = dayLimitCount
    },
    async getCoin (id, index) {
      if (this.isLoading || !id) return

      this[SET_LOADING](true)
      const {data: {userOil}} = await this.$axiosForm.post(
        GETCOIN,
        {
          oilWorkId: id,
        },
        {
          headers: {
            token: this.tokenId,
          },
        },
      ).catch((e) => {
        this[SET_LOADING](false)

        return Promise.reject(e)
      })

      this[SET_COINNUM](userOil)
      this[SET_LOADING](false)
      this.oilList.splice(index, 1)
    },

    setPosition (oilList = []) {
      return oilList.map(oil => {
        const p = getPosition()
        // eslint-disable-next-line no-console
        console.log(p)
        oil.x = p.x
        oil.y = p.y

        return oil
      })
    },

    backHandler () {
      // this.$router.go(-1)
      this.nativeBack()
    },
  },
}
