<template>
  <div
    :class="[
      'p-nav',
      type === 'index' ? 'p-nav--index' : '',
    ]"
    :style="{
      paddingTop: `${topHeight}px`,
    }"
  >

    <div class="p-nav-left">
      <div :class="[
          'p-nav-back scale25',
          type === 'detail' ? 'p-nav-back--white' : '',
        ]"
        @click="backHandler"></div>
    </div>

    <div class="p-nav-title">{{title}}</div>

    <div class="p-nav-right">
      <div class="p-nav-help scale25"
        @click="shareHandler">分享</div>
    </div>

  </div>
</template>

<script>
import Cookie from '../../../public/utils/cookie'
export default {
  name: 'Nav',

  mixins: [],

  data () {
    return {
      topHeight: 0,
    }
  },

  props: {
    title: {
      default: '',
    },
    type: {
      default: '',
    },
  },

  async created () {
    this.topHeight = Cookie.getItem('statusBarHeight') || 0
  },

  mounted () {
    this.$nextTick(() => {
      // console.log(this.$el.clientHeight)
      this.$emit('height', this.$el.clientHeight)
    })
  },

  methods: {
    shareHandler () {
      this.$emit('share')
    },
    backHandler () {
      this.$emit('back')
    },
  },
}
</script>
<style lang="postcss">
@n p{
  @b nav{
    height: 88px;
    line-height: 88px;
    display: flex;
    overflow: hidden;
    background: #FFFFFF;
    box-sizing: content-box;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0; */
    z-index: 100;
    border-bottom: 1px solid #D9D9D9; /* no */
    color: #1A1A1A;

    @m index{
      background: none;
      border-bottom: 0;
      color: #000000;
    }

    @e left{
      width: 100px;
    }
    @e back{
      width: 22px;
      height: 36px;
      margin: 26px 0 0 32px;
      background: url(../images/back@2x.png) no-repeat;
      background-size: 100% 100%;

      @m white{
        background: url(../images/back-white@2x.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    @e title{
      flex: 1;
      font-family: PingFangSC-Regular;
      font-size: 36px;
      text-align: center;
    }
    @e right{
      width: 100px;
    }
  }
}
</style>
