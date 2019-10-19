import {mapState} from 'vuex'
import Utils from '../common/utils'
import Dom from '../../../../public/utils/dom'
import {DateFormate} from '../../../../public/filters/dateformate'

import {
  GET_MY,
} from '../common/interface'
import {
  SET_LOADING,
  SET_LOADING_NEXT,
  QRCODE_MSG,
} from '../common/mutations-type'

export default {

  name: 'RyMy',

  mixins: [Utils],

  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: this.$store.state.pageSize,
        gonext: false,
        totalPage: 1,
      },
      couponStatusType: 'yes',
      listOrigin: [],
      getting: false,
    }
  },

  computed: {
    ...mapState({
      tokenId: state => state.tokenId,
      platform: state => state.platform,
      pageSize: state => state.pageSize,
    }),
  },

  mounted () {
    this.nextPage()
    this.queryList()
  },
  methods: {
    nextPage () {
      Dom.on(document.querySelector('.ry-my-list-wrap'), 'scroll', this.addData)
    },
    addData () {
      if (!this.page.gonext) return

      const clientHeight = parseFloat(document.querySelector('.ry-my-list-wrap').clientHeight)
      const scrollTop = parseFloat(document.querySelector('.ry-my-list-wrap').scrollTop)
      const mainHeight = parseFloat(document.querySelector('.ry-my-list').clientHeight)
      const totalheight = clientHeight + scrollTop // 浏览器的高度加上滚上去的高度
      // console.log(clientHeight, scrollTop, mainHeight)

      if (totalheight >= mainHeight - 200) {
        // 当文档的高度小于或者等于总的高度加100的时候，开始动态加载数据
        this.$nextTick(() => {
          this.queryList(this.page.currentPage + 1)
        })
      }
    },
    queryList (currentPage = 1) {
      if (this.getting) return
      this.getting = true

      if (currentPage !== 1 && currentPage > this.page.totalPage) {
        this.page.gonext = false
        this.getting = false

        return
      }

      this.$store.commit(currentPage === 1 ? SET_LOADING : SET_LOADING_NEXT, true)

      this.$axios.post(GET_MY, this.getParams(currentPage))
        .then((data) => {
          if (!data.data.result) throw new Error('返回格式错误')
          const result = data.data.result

          if (currentPage === 1) {
            this.listOrigin = []
          }

          this.page.currentPage = currentPage
          this.page.totalPage = result.page.totalPage
          // eslint-disable-next-line max-len
          this.page.totalPage = (result.page && parseInt((result.page.totalCount + result.page.pageSize - 1) / result.page.pageSize, 10)) || 0

          const l = result.data.couponCodeVos || []
          this.page.gonext = l.length >= this.page.pageSize
          this.setDate(l)
          this.listOrigin = this.listOrigin.concat(l)

          this.getting = false
          this.$store.commit(currentPage === 1 ? SET_LOADING : SET_LOADING_NEXT, false)
        })
        .catch(() => {
          this.getting = false
          this.$store.commit(currentPage === 1 ? SET_LOADING : SET_LOADING_NEXT, false)
        })
    },
    getParams (currentPage) {
      return {
        currentPage,
        pageSize: this.page.pageSize,
        platform: this.platform,
        couponStatusType: this.couponStatusType,
        tokenId: this.tokenId,
      }
    },
    setDate (list) {
      list.forEach(item => {
        item.validStartAtStr = DateFormate(item.validStartAt, 'yyyy.M.d')
        item.validEndAtStr = DateFormate(item.validEndAt, 'yyyy.M.d')
        item.isLast = this.getIsLast(item.validEndAt)
        item.isUn = '_34567'.indexOf(item.codeStatus) > 0
      })
    },
    getIsLast (endAt) {
      const nowAt = Date.now()
      const threeAt = 3 * 24 * 3600000

      if (!endAt) return false

      const lastAt = endAt - nowAt - threeAt

      return lastAt <= 0 && Math.abs(lastAt) < threeAt
    },
    tabHandler ({target: {classList: [firstClass], dataset: {tab}}}) {
      if (firstClass !== 'ry-my-tab') return

      this.couponStatusType = tab

      this.queryList(1)
    },
    itemHandler (id, couponCode, index) {
      localStorage.setItem(QRCODE_MSG, JSON.stringify(this.listOrigin[index]))
      this.$router.push({
        name: 'qrcode',
        params: {
          id,
          couponCode,
        },
        query: (this.getQuery && this.getQuery()) || {},
      })
    },
  },
  destroyed () {
    Dom.off(document.querySelector('.ry-app'), 'scroll', this.addData)
  },
}
