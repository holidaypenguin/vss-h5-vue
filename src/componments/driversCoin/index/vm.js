
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

import {getPosition, getCenter} from './position'
import Q from '../../../module/driversCoin/sdk/q'

const skyDefer = Q.defer()
const floorDefer = Q.defer()

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
      isIn: false,
      end: false,
      centerPosition: {},
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
      coinNum: state => state.coinNum,
    }),
  },

  async created () {
    // console.log('---index--create-----')
    this.isIn = true
    this.end = false
  },

  async mounted () {
    await this.alls()
    this.$nextTick(() => {
      // this.oilList = this.setPosition([
      //   {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5},
      //   // {}, {}, {}, {}, {},
      //   // {}, {}, {}, {}, {},
      //   // {}, {}, {}, {}, {}, {},
      // ])
      // this.isIn = true
      // this.end = true
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
      await this.searchUn()
      await this.searchNum()
    },
    skyLoadHandler () {
      skyDefer.resolve()
    },
    skyErrorHandler () {
      skyDefer.reject()
    },
    floorLoadHandler () {
      floorDefer.resolve()
    },
    floorErrorHandler () {
      floorDefer.reject()
    },
    async alls () {
      this[SET_LOADING](true)
      await Promise.all([
        this.searchUn(),
        skyDefer.promise,
        floorDefer.promise,
      ])

      await this.searchNum()

      this.centerPosition = getCenter()
      this[SET_LOADING](false)

      this.end = true
    },
    async searchUn () {
      // if (this.coinNum) return

      // this[SET_LOADING](true)
      const {data: {oilMoneyWorks}} = await this.$axiosForm.get(
        GETUN,
        {
          headers: {
            token: this.tokenId,
          },
        },
      )
      // .catch((e) => {
      //   this[SET_LOADING](false)

      //   return Promise.reject(e)
      // })

      this.oilList = this.setPosition(oilMoneyWorks || [])

      // this[SET_LOADING](false)
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
      if (this.all || this.isLoading || !id) return

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

      this.setOilRemove(index, id)
    },

    setOilRemove (index, id) {
      this.oilList[index].x = this.centerPosition.x
      this.oilList[index].y = this.centerPosition.y
      this.oilList[index].out = true
      this.oilList = this.oilList
      this.removeId = id
    },

    async transitionendHandler (event, index, id) {
      if (!this.removeId || event.propertyName !== 'top' || this.removeId !== id) return

      this.oilList.splice(index, 1)
      this.removeId = undefined
      // await this.searchUn()
    },

    setPosition (oilList = []) {
      return oilList.map(oil => {
        const p = getPosition(oil.id)
        // eslint-disable-next-line no-console
        // console.log(p)
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
