
import {
  mapState,
  mapMutations,
} from 'vuex'

import Dom from 'utils/dom'

import {
  SET_LOADING,
  SET_LOADING_NEXT,
} from '../../../module/driversCoin/store/mutations-type'

import {
  GETLIST,
} from '../../../module/driversCoin/interface'

import Utils from '../../../module/driversCoin/utils'
import Nav from '../nav/nav.vue'

export default {
  name: 'My',

  mixins: [Utils],

  components: {
    Nav,
  },

  data () {
    return {
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
      userOil: 0,
      categaryOpts: [
        {value: 1, label: '广告收入油币'},
        {value: 2, label: '加油消耗油币'},
      ],
      tipShow: false,
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
      loadingNext: state => state.loadingNext,
    }),
    loading () {
      return this.isLoading || this.loadingNext
    },
  },

  async created () {
    await this.search()
  },

  async mounted () {
    this.$nextTick(() => {
      this.listWrapEl = this.$refs.listWrap
      this.listEl = this.$refs.list
      this.nextPage()
    })
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
      SET_LOADING_NEXT,
    ]),
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
    async search (pageNo = 1) {
      if (this.getting) return

      this.getting = true

      // if (pageNo !== 1 && pageNo > this.page.totalPage) {
      //   this.page.gonext = false
      //   this.getting = false

      //   return
      // }

      this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](true)
      const {data: {userOil, oilMoneyDetails}} = await this.$axiosForm.get(
        GETLIST,
        {
          params: Object.assign({}, this.params, {
            count: this.page.count,
            page: pageNo,
          }),
          headers: {
            token: this.tokenId,
          },
        },
      ).catch((e) => {
        this.getting = false
        this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](false)

        return Promise.reject(e)
      })

      this.userOil = userOil

      if (pageNo === 1) {
        this.list = []
      }
      this.list = this.list.concat(oilMoneyDetails)

      this.page.page = pageNo
      // this.page.totalPage = parseInt((count + this.page.count - 1) / page.count, 10) || 0
      this.page.gonext = oilMoneyDetails.length >= this.page.count

      this.getting = false
      this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](false)
    },
    tipHandler () {
      this.tipShow = !this.tipShow
    },
    backHandler () {
      // this.$router.go(-1)
      this.nativeBack()
    },
  },
}
