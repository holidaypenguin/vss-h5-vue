<template>
  <div :class="[
      'p-nav',
      type === 'detail' ? 'p-nav--detail' : '',
    ]">

    <div class="p-nav-left">
      <div class="p-nav-order scale25" v-if="type==='index'"
        @click="orderHandler"></div>
      <div :class="[
          'p-nav-back scale25',
          type === 'detail' ? 'p-nav-back--white' : '',
        ]"
        v-else
        @click="backHandler"></div>
    </div>

    <div class="p-nav-title">{{title}}</div>

    <div class="p-nav-right">
      <div class="p-nav-help scale25" v-if="type==='index'"
        @click="helpHandler"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Nav',

  mixins: [],

  props: {
    title: {
      default: '',
    },
    type: {
      default: '',
    },
  },

  mounted () {
    this.$nextTick(() => {
      // console.log(this.$el.clientHeight)
      this.$emit('height', this.$el.clientHeight)
    })
  },

  methods: {
    orderHandler () {
      this.$emit('order')
    },
    backHandler () {
      this.$emit('back')
    },
    helpHandler () {
      this.$emit('help')
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    border-bottom: 1px solid #D9D9D9; /* no */
    color: #1A1A1A;

    @m detail{
      background: none;
      border-bottom: 0;
      color: #FFFFFF;
    }

    @e left{
      width: 100px;
    }
    @e order{
      width: 35px;
      height: 36px;
      margin: 26px 0 0 32px;
      background: url(../images/order@2x.png) no-repeat;
      background-size: 100% 100%;
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
    @e help{
      width: 36px;
      height: 36px;
      margin: 26px 32px 0 auto;
      background: url(../images/help@2x.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
