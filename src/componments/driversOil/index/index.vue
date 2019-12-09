<template>
  <div class="p-index">

    <Nav :title="title" type="index"
      @order="orderHandler"
      @help="helpHandler"></Nav>

    <div class="p-index-top">
      <van-dropdown-menu class="p-index-distance"
        active-color="#00BE06">
        <van-dropdown-item v-model="params.sort" :options="sortOpts"
          get-container=".p-index-top"
          @change="sortChangeHandler"/>
      </van-dropdown-menu>
      <van-dropdown-menu class="p-index-distance"
        active-color="#00BE06">
        <van-dropdown-item v-model="params.oilNo" :options="oilNoOpts"
          @change="oilNoChangeHandler"/>
      </van-dropdown-menu>
      <div class="p-index-top-msg">在线支付</div>
    </div>

    <div class="p-index-split"></div>

    <div class="p-index-list">
      <div class="p-index-item"
        v-for="(item) in list"
        :key="item.id">
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
          <div class="p-index-go"
            @click="itemClickHandler(item.gasId)">{{getDis(item.dis)}}KM</div>
        </div>
      </div>
    </div>

    <div class="p-index-empty"
      v-if="!list || list.length < 1">
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
