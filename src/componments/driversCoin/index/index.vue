<template>
  <div class="p-index"
    @click="indexHandler"
    @touchstart="indexTouchStart"
    @touchmove="indexTouchMouve"
    >

    <div class="p-index-loading-bg" v-if="!end"></div>

    <Nav :title="title" type="index"
      @back="backHandler"></Nav>

    <div
      :class="[
        'p-index-my',
        userInfo && userInfo.photoUrl ? '' : 'p-index-my--noicon',
      ]"
      :style="{
        marginTop: `${topHeight}px`,
      }"
      @click="myHandler">
      <img class="p-index-my-icon" :src="userInfo.photoUrl"
        v-if="userInfo && userInfo.photoUrl"/>
      油币{{coinNum}}个
    </div>

    <!-- <div class="p-index-sky"></div> -->
    <img src="../images/sky.png" alt="" class="p-index-sky"
      v-if="isIn"
      @load="skyLoadHandler"
      @error="skyErrorHandler">

    <!-- <div class="p-index-floor"></div> -->
    <img src="../images/floor.png" alt="" class="p-index-floor"
      v-if="isIn"
      @load="floorLoadHandler"
      @error="floorErrorHandler">

    <div
      :class="['p-index-el', all ? 'p-index-el--move' : '']"
      >
      <div class="p-index-machine">
        <div class="p-index-button"
          v-if="dayLimitCount"
          @click="buttonHandler">获取油币({{dayCount}}/{{dayLimitCount}})</div>
      </div>

      <div :class="['p-index-bottom']"
        @click.stop.prevent="bottomHandler">
        <div class="p-index-bottom-header">油币兑换规则</div>
        <div class="p-index-bottom-body">
          100油币兑换1人民币<br>
          会陆续开启油币兑换加油、兑换直播币，
          以及会陆续开启油币商场，在商城中可以使用油币支付购买商品；
          陆续还会上线油币提现功能。
          关注微信公众号：司机圈儿 driversite，快速接收油币相关最新消息。
        </div>
      </div>

      <div
        :class="[
          'p-index-oil',
          item.out ? 'p-index-oil--remove' : 'p-index-oil--animation',
        ]"
        v-for="(item, index) in oilList"
        :key="item.id"
        :style="{
          left: `${item.x}px`,
          top: `${item.y}px`,
          animationDelay: `-${(index + 1) * 2 / 10}s`,
        }"
        @click="getCoin(item.id, index)"
        @transitionend="transitionendHandler($event, index, item.id)"
      >
        <div class="p-index-oil-num">{{item.count || 0}}</div>
        <div class="p-index-oil-name">油币</div>
      </div>
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
