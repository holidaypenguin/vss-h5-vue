<template>
  <div class="p-order">

    <Nav :title="title" type="index"
      @back="backHandler"></Nav>

    <div class="p-order-split"></div>

    <div class="p-order-list">
      <div class="p-order-item"
        v-for="(item) in list"
        :key="item.gasId">
        <div class="p-order-line1">
          <div class="p-order-line1-left">北京广开源加油站</div>
          <div class="p-order-line1-right">
            支付
            <span class="p-order-line1-right-num">280.80</span>
            元 优惠19.20元
          </div>
        </div>
        <div class="p-order-line2">
          <div class="p-order-line2-left">92#</div>
          <div class="p-order-line2-right">7号枪 8.9升</div>
        </div>
        <div class="p-order-line3">
          <div class="p-order-line3-left">2019.11.10 11.37</div>
          <div class="p-order-line3-right p-order-line3-right--2">已完成</div>
        </div>
        <div class="p-order-go">去加油</div>
      </div>
    </div>

    <div class="p-order-loading" v-show="loadingNext">
      <loading
        :active.sync="loadingNext"
        :can-cancel="false"
        :is-full-page="false"
        color="#F6504D"
        loader="bars"
        :opacity="0.3"
        :z-index="1"
      ></loading>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'

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
  GETORDER,
} from '../../../module/driversOil/interface'

import Utils from '@/module/driversOil/utils'
import Nav from '../nav/nav.vue'
export default {
  name: 'Order',

  mixins: [Utils],

  components: {
    Nav,
    Loading,
  },

  data () {
    return {
      params: {
        sort: 1,
      },
      page: {
        page: 1,
        count: this.$store.state.pageSize,
        gonext: false,
        totalPage: 1,
      },
      getting: false,
      listWrapEl: undefined,
      listEl: undefined,
      scrollTop: 0,
      list: [
        {gasId: 1, gasName: '1', gasAddress: '2', oilNo: '1', oilName: '2', oil_92: '1', dis: '1'},
        {gasId: 1, gasName: '1', gasAddress: '2', oilNo: '1', oilName: '2', oil_92: '1', dis: '1'},
      ],
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
      loadingNext: state => state.loadingNext,
    }),
  },

  async created () {
  },

  async mounted () {
    await this.search()
    this.$nextTick(() => {
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
          this.search(this.page.page + 1)
        })
      }
    },
    async search (pageNo = 1) {
      if (this.getting) return

      this.getting = true

      if (pageNo !== 1 && pageNo > this.page.totalPage) {
        this.page.gonext = false
        this.getting = false

        return
      }
      this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](true)

      const {page, count, data} = await this.$axios.post(GETORDER, Object.assign(this.params, {
        count: this.page.count,
        page: pageNo,
      })).catch((e) => {
        this.getting = false
        this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](false)

        return Promise.reject(e)
      })

      if (pageNo === 1) {
        this.list = []
      }
      this.list = this.list.concat(data)

      this.page.page = pageNo
      this.page.totalPage = parseInt((count + this.page.count - 1) / page.count, 10) || 0
      this.page.gonext = data.length >= this.page.count

      this.getting = false
      this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](false)
    },
    backHandler () {
      this.$router.go(-1)
    },
    itemClickHandler (gasId) {
      this.$router.push({
        name: 'detail',
        params: {
          gasId,
        },
      })
    },
  },
}
</script>

<style lang="postcss">
@n p{
  @b order{
    overflow: auto;
    @e split{
      margin-top: 89px;
      height: 16px;
      background: #F2F2F7;
    }
    @e list{
      padding-bottom: 40px;
    }
    @e item{
      padding: 32px;
      position: relative;

      + .p-order-item{
        border-top: 1px solid #D9D9D9; /* no */
      }
    }

    @e line1{
      display: flex;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #1A1A1A;
      line-height: 32px;
      margin-bottom: 16px;
      @e left{
        flex: 1;
        word-break: break-all;
      }
      @e right{
        flex: 1;
        word-break: break-all;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #1A1A1A;
        text-align: right;
        line-height: 28px;
        /* display: flex; */

        @e num{
          color: #FF5C01;
        }
      }
    }
    @e line2{
      display: flex;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #999999;
      line-height: 28px;
      margin-bottom: 16px;
      @e left{
        margin-right: 16px;
      }
      @e right{}
    }
    @e line3{
      display: flex;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #999999;
      line-height: 28px;
      @e left{
        margin-right: 16px;
      }
      @e right{
        @m 2{
          color: #5191FE;
        }
      }
    }

    @e go{
      background: #FFFFFF;
      border: 2px solid #999999;
      border-radius: 24px;
      line-height: 48px;
      display: flex;
      position: absolute;
      bottom: 32px;
      right: 32px;
      font-size: 24px;
      color: #666666;
      padding: 0 24px;

      /* &::before{
        width: 28px;
        height: 28px;
        content: ' ';
        display: block;
        margin: 10px 16px 10px 24px;
        background: url(../images/go@2x.png);
        background-size: 100% 100%;
      } */
    }
    @e loading{
      position: relative;
      height: 100px;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
