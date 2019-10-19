import {mapState} from 'vuex'
import Utils from '../common/utils'
import Dom from '../../../../public/utils/dom'

import {
  GET_GOODS_LIST,
} from '../common/interface'
import {
  SET_LOADING,
  SET_LOADING_NEXT,
} from '../common/mutations-type'

export default {

  name: 'RyList',

  mixins: [Utils],

  components: {
  },

  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: this.$store.state.pageSize,
        gonext: false,
        totalPage: 1,
      },
      listOrigin: [],
      getting: false,
      listWrapEl: undefined,
      listEl: undefined,
      scrollTop: 0,
    }
  },

  computed: {
    ...mapState({
      tokenId: state => state.tokenId,
      platform: state => state.platform,
      pageSize: state => state.pageSize,
    }),
  },

  created () {
    this.ModalHelper.beforeClose()
  },

  mounted () {
    this.listWrapEl = document.querySelector('.ry-list-wrap')
    this.listEl = document.querySelector('.ry-list')
    this.queryList(1)
    this.nextPage()
  },
  activated () {
    // eslint-disable-next-line
    console.log('-----------------activated------------------')
    this.$nextTick(() => {
      this.listWrapEl.scrollTo(0, this.scrollTop || 0)
    })
  },
  methods: {
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

      if (totalheight >= mainHeight - 200) {
        // 当文档的高度小于或者等于总的高度加100的时候，开始动态加载数据
        this.$nextTick(() => {
          this.queryList(this.page.currentPage + 1)
        })
      }
    },
    queryList (currentPage) {
      if (this.getting) return

      this.getting = true

      if (currentPage !== 1 && currentPage > this.page.totalPage) {
        this.page.gonext = false
        this.getting = false

        return
      }

      this.$store.commit(currentPage === 1 ? SET_LOADING : SET_LOADING_NEXT, true)

      const params = {
        currentPage,
        pageSize: this.page.pageSize,
        platform: this.platform,
        queryType: 1,
      }
      this.$axios.post(GET_GOODS_LIST, params)
        .then((data) => {
          const result = data.data.result
          if (!result) throw new Error('返回格式错误')

          if (currentPage === 1) {
            this.listOrigin = []
          }

          const l = result.data || []

          this.page.currentPage = currentPage
          // eslint-disable-next-line max-len
          this.page.totalPage = (result.page && parseInt((result.page.totalCount + result.page.pageSize - 1) / result.page.pageSize, 10)) || 0
          this.page.gonext = l.length >= this.page.pageSize
          this.listOrigin = this.listOrigin.concat(l)
          this.getting = false
          this.$store.commit(currentPage === 1 ? SET_LOADING : SET_LOADING_NEXT, false)
          this.afterMethods()
        })
        .catch((e) => {
          this.getting = false
          this.$store.commit(currentPage === 1 ? SET_LOADING : SET_LOADING_NEXT, false)
        })
    },
    itemHandler (id) {
      this.$router.push({
        name: 'buy',
        params: {
          id,
        },
        query: (this.getQuery && this.getQuery()) || {},
      })
    },
  },
  destroyed () {
    Dom.off(document.querySelector('.ry-app'), 'scroll', this.addData)
  },
}
