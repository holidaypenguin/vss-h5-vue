<template>
  <div class="p-nav">
    <div class="p-nav-left">
      <div class="p-nav-order" v-if="type==='index'"></div>
      <div class="p-nav-back" v-else></div>
    </div>
    <div class="p-nav-title">{{title}}</div>
    <div class="p-nav-right">
      <div class="p-nav-help" v-if="type==='index'"></div>
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
    @e left{
      width: 100px;
    }
    @e order{
      width: 35px;
      height: 36px;
      margin: 26px 0 0 32px;
    }
    @e back{
      width: 22px;
      height: 36px;
      margin: 26px 0 0 32px;
      background: url(../images/back@2x.png) no-repeat;
      background-size: 100% 100%;
    }
    @e title{
      flex: 1;
      font-family: PingFangSC-Regular;
      font-size: 36px;
      color: #1A1A1A;
      text-align: center;
    }
    @e right{
      width: 100px;
    }
    @e help{
      width: 22px;
      height: 36px;
      margin: 26px 32px 0 auto;
    }
  }
}
</style>
