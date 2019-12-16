/* eslint-disable no-console */
// import VanDropdownMenu from 'vant/lib/dropdown-menu'
// import 'vant/lib/dropdown-menu/style'
// import VanDropdownItem from 'vant/lib/dropdown-item'
// import 'vant/lib/dropdown-item/style'
import Loading from 'vue-loading-overlay'
import {Dialog} from 'vant'
import 'vant/lib/dialog/style'
import Vue from 'vue'
import IndexTop from '../indexTop'

import {
  mapState,
  mapMutations,
} from 'vuex'

import Dom from 'utils/dom'

import {
  SET_LOADING,
  SET_LOADING_NEXT,
} from '../../../module/driversOil/store/mutations-type'

import {
  GETLIST,
} from '../../../module/driversOil/interface'

import Utils from '@/module/driversOil/utils'
import Sdk from '@/module/driversOil/sdk'
import Nav from '../nav/nav.vue'

export default {
  name: 'Index',

  mixins: [Utils],

  components: {
    // Nav,
    // VanDropdownMenu,
    // VanDropdownItem,
    Loading,
    // IndexTop,
  },

  data () {
    return {
      // sortOpts: [
      //   {text: '距离优先', value: 1},
      //   {text: '价格优先', value: 2},
      // ],
      // oilNoOpts: [
      //   {text: '92号汽油', value: 92},
      //   {text: '95号汽油', value: 95},
      //   {text: '98号汽油', value: 98},
      //   {text: '0号柴油', value: 0},
      // ],
      params: {
        sort: 1,
        oilNo: 92,
        lng: 0,
        lat: 0,
        // lng: 126.55,
        // lat: 43.85,
      },
      page: {
        page: 1,
        count: this.$store.state.pageSize,
        gonext: false,
        // totalPage: 1,
      },
      getting: false,
      listWrapEl: undefined,
      listEl: undefined,
      scrollTop: 0,
      list: [],
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
      loadingNext: state => state.loadingNext,
    }),
  },

  async created () {
    await this.setPosotion()
    await this.search()
  },

  async mounted () {
    this.$nextTick(() => {
      this.setNav()
      this.setTop()
      this.listWrapEl = this.$parent.$el
      this.listEl = this.$el
      this.nextPage()
    })
  },

  activated () {
    this.$nextTick(() => {
      this.listWrapEl && this.listWrapEl.scrollTo(0, this.scrollTop || 0)
    })
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
      SET_LOADING_NEXT,
    ]),
    setNav () {
      const NavConstructor = Vue.extend(Nav)
      const instance = new NavConstructor({
        propsData: {
          title: this.title,
          type: 'index',
        },
      })
      instance.vm = instance.$mount()
      document.body.appendChild(instance.vm.$el)
      instance.$on('order', this.orderHandler)
      instance.$on('help', this.helpHandler)
    },
    setTop () {
      const IndexTopConstructor = Vue.extend(IndexTop)
      const instance = new IndexTopConstructor({})
      instance.vm = instance.$mount()
      document.body.appendChild(instance.vm.$el)
      instance.$on('sort-change', this.sortChangeHandler)
      instance.$on('oilNo-change', this.oilNoChangeHandler)
      // <index-top
      // @sort-change="sortChangeHandler"
      // @oilNo-change="oilNoChangeHandler"></index-top>
    },
    async setPosotion () {
      const positionMsg = await Sdk.position()

      if (!this.judgePosition(positionMsg)) {
        this.$toast('定位失败')

        return
      }

      this.params.lng = positionMsg.lng || 0
      this.params.lat = positionMsg.lat || 0

      // alert(`定位信息：${JSON.stringify(positionMsg)}`)
    },
    judgePosition ({lng, lat} = {}) {
      return lng && lat && lng !== '0' && lat !== '0'
    },
    nextPage () {
      Dom.on(this.listWrapEl, 'scroll', this.addData)
    },
    addData () {
      const scrollTop = parseFloat(this.listWrapEl.scrollTop)
      this.scrollTop = scrollTop

      if (!this.page.gonext) return

      const clientHeight = parseFloat(this.listWrapEl.clientHeight)
      const mainHeight = parseFloat(this.listEl.clientHeight)
      const totalheight = clientHeight + scrollTop // 浏览器的高度加上滚上去的高度

      if (totalheight >= mainHeight - 100) {
        // 当文档的高度小于或者等于总的高度加100的时候，开始动态加载数据
        this.$nextTick(() => {
          this.search(this.page.page + 1)
        })
      }
    },
    async reloadHandler () {
      if (!this.judgePosition(this.params)) {
        await this.setPosotion()
      }

      await this.search()
    },
    async search (pageNo = 1) {
      if (this.getting || !this.judgePosition(this.params)) return

      this.getting = true

      // if (pageNo !== 1 && pageNo > this.page.totalPage) {
      //   this.page.gonext = false
      //   this.getting = false

      //   return
      // }

      this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](true)
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
    getDis (dis) {
      return parseFloat(((dis || 0) / 1000).toFixed(1))
    },
    async judgeUserInfo () {
      await this.getUserToken().catch(() => Promise.resolve())
      console.log('判断登录状态~~token', this.tokenId)
      if (!this.tokenId) {
        console.log('判断登录状态~~token', '无token')
        await this.confirm()
        await this.toLogin()
      }

      await this.getUserInfo().catch(() => Promise.resolve())
      console.log('判断登录状态~~userinfo', this.userInfo)
      if (!this.userInfo) {
        console.log('判断登录状态~~userinfo', '无有效userinfo')
        await this.confirm()
        await this.toBind()
      }
      console.log('判断登录状态~~成功~~')

      return Promise.resolve()
    },
    async confirm () {
      await Dialog.confirm({
        title: '绑定手机号',
        message: '请您绑定手机号才能继续操作',
      })
    },
    async itemClickHandler (gasId) {
      await this.judgeUserInfo()
      // this.$router.push({
      //   name: 'detail',
      //   params: {
      //     id: gasId,
      //   },
      // })
      Sdk.openWindows(`detail/${gasId}`)
    },
    async sortChangeHandler (sort) {
      this.params.sort = sort
      await this.search()
    },
    async oilNoChangeHandler (oilNo) {
      this.params.oilNo = oilNo
      await this.search()
    },
    async orderHandler () {
      await this.judgeUserInfo()

      // this.$router.push({
      //   name: 'order',
      // })

      Sdk.openWindows('order')
    },
    helpHandler () {
      // this.$router.push({
      //   name: 'help',
      // })

      Sdk.openWindows('help')
    },
    backHandler () {
      // this.$router.go(-1)
      this.nativeBack()
    },
  },
}
