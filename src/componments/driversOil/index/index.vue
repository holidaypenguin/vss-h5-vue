<template>
  <div class="p-index">

    <div class="p-index-list">
      <div class="p-index-item"
        v-for="(item) in list"
        :key="item.id"
        @click="itemClickHandler(item.gasId)">
        <div class="p-index-left">
          <img class="p-index-icon" :src="item.gasLogoSmall"/>
        </div>
        <div class="p-index-right">
          <div class="p-index-name">{{item.gasName}}</div>
          <div class="p-index-addr">{{item.gasAddress}}</div>
          <div class="p-index-money">{{item.oilPriceMap.priceYfq}}/升</div>
          <div class="p-index-other">
            <div class="p-index-num">{{item.oilPriceMap.oilName}}</div>
            <div :class="[
              'p-index-status',
              `p-index-status--${item.oilPriceMap.diffPriceType}`,
            ]"></div>
            <div class="p-index-diff">{{item.oilPriceMap.difPrice}}元</div>
          </div>
          <div class="p-index-go">{{getDis(item.dis)}}KM</div>
        </div>
      </div>
    </div>

    <div class="p-index-empty"
      v-if="firstLoaded && (!list || list.length < 1)">
      <div class="p-index-empty-icon"></div>
      <div class="p-index-empty-msg">加油站列表加载失败了～</div>
      <div class="p-index-empty-button"
        @click="reloadHandler()">点击刷新</div>
    </div>

    <div class="p-index-loading" v-show="loadingNext">
      <loading
        :active.sync="loadingNext"
        :can-cancel="false"
        :is-full-page="false"
        color="#00BE06"
        loader="bars"
        :opacity="0.3"
        :z-index="1"
      ></loading>
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
