<template>
  <div class="p-index"
    @click="indexHandler">

    <Nav :title="title" type="index"></Nav>

    <div class="p-index-my"
      @click="myHandler">
      <div class="p-index-my-icon"></div>
      油币64.3个
    </div>

    <div class="p-index-sky"></div>

    <div class="p-index-floor"></div>

    <div class="p-index-machine">
      <div class="p-index-button"
      @click="buttonHandler">获取油币</div>
    </div>

    <div :class="['p-index-bottom', all ? 'p-index-bottom--all' : '']"
      @click.stop.prevent="bottomHandler">
      <div class="p-index-bottom-header">油币兑换规则</div>
      <div class="p-index-bottom-body">
        1油币兑换1人民币<br>
        会陆续开启油币兑换加油、兑换直播币，
        以及会陆续开启油币商场，在商城中可以使用油币支付购买商品；
        陆续还会上线油币提现功能。
        关注微信公众号：司机圈儿 driversite，快速接收油币相关最新消息。
      </div>
    </div>

    <div class="p-index-oil">
      <div class="p-index-oil-num">0.2</div>
      <div class="p-index-oil-name">油币</div>
    </div>
  </div>
</template>

<script>
import vm from './vm'
export default vm
</script>

<style lang="postcss">
@import './index.postcss'
</style>
