import Utils from '@/module/driversOil/utils'
import Sdk from '@/module/driversOil/sdk'
import Nav from '../nav/nav.vue'
import Button from '../detailButton'
// import Top from '../detailTop'
import Vue from 'vue'

import {
  mapState,
  mapMutations,
} from 'vuex'

import {
  SET_LOADING,
} from '../../../module/driversOil/store/mutations-type'

// import {
//   GETDETAIL,
// } from '../../../module/driversOil/interface'
let buttonInstance
// let topInstance
export default {
  name: 'Detail',

  mixins: [Utils],

  components: {
    // Nav,
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
      platformType: state => state.platformType,
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
    await this.getUserToken()
    await this.search()
  },

  async mounted () {
    this.setNav()
    this.setButton()
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
    ]),
    setNav () {
      const NavConstructor = Vue.extend(Nav)
      const instance = new NavConstructor({
        propsData: {
          title: this.title,
          type: 'detail',
        },
      })
      instance.vm = instance.$mount()
      document.body.appendChild(instance.vm.$el)
      instance.$on('back', this.backHandler)
    },
    setButton () {
      const ButtonConstructor = Vue.extend(Button)
      buttonInstance = new ButtonConstructor({
        // propsData: {
        //   gunNo: this.gunNo,
        // },
      })
      document.body.appendChild(buttonInstance.$mount().$el)
      buttonInstance.$on('goPay', this.goPay)
    },
    // setTop () {
    //   const TopConstructor = Vue.extend(Top)
    //   topInstance = new TopConstructor({
    //     propsData: {
    //       gasInfo: this.gasInfo,
    //     },
    //   })
    //   document.body.appendChild(topInstance.$mount().$el)
    //   topInstance.$on('goClick', this.goClick)
    // },
    backHandler () {
      // this.$router.go(-1)
      this.nativeBack()
    },
    async search () {
      // if (this.getting) return

      // this.getting = true

      // this[SET_LOADING](true)
      // const params = {
      //   gasId: this.id,
      // }
      // const {data: {gasInfo}} = await this.$axiosForm.get(
      //   GETDETAIL,
      //   // params,
      //   {
      //     params,
      //     headers: {
      //       token: this.tokenId,
      //       // token: this.userInfo,
      //     },
      //   },
      // ).catch((e) => {
      //   this.getting = false
      //   this[SET_LOADING](false)

      //   // 返回code 1029的时候，提示登录页面
      //   if (e.code === 1029) {
      //     return this.toLogin()
      //   }

      //   return Promise.reject(e)
      // })
      const gasInfo = JSON.parse(localStorage.getItem('gasInfo') || '{}')

      this.gasInfo = gasInfo
      gasInfo.oilPriceList = gasInfo.oilPriceList.filter(item => item.oilNo >= 0)
      this.oilMap = gasInfo.oilPriceList[0]

      this.getting = false
      this[SET_LOADING](false)
      // this.setTop()
    },
    tabHandler (index) {
      this.oilMap = this.gasInfo.oilPriceList[index]
      this.gunNo = undefined
      buttonInstance.$emit('gunNo', this.gunNo)
    },
    gunNoHandler (gunNo) {
      this.gunNo = gunNo
      buttonInstance.$emit('gunNo', this.gunNo)
    },
    goPay () {
      if (!this.gunNo) return

      const url = `${process.env.oilPay}/redirection/todo/?platformType=${
        this.platformType}&platformCode=${this.userInfo.platformCode}&gasId=${
        this.gasInfo.gasId}&gunNo=${this.gunNo}`
      // window.location.href = url
      Sdk.openOtherWindows(url)
    },
    goClick () {
      Sdk.navigation(
        this.gasInfo.gasAddressLatitude,
        this.gasInfo.gasAddressLongitude,
      )
    },
  },
}
