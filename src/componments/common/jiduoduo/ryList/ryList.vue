<template>
  <div class="ry-list-wrap">
    <div class="ry-list" ref="list">
      <div class="ry-item-wrap"
        v-for="(item, index) in listOrigin"
        :key="index"
        @click="itemHandler(item.id)">
        <div class="ry-item-empty">
          <img class="ry-item-image" :src="item.iconUrl"/>
        </div>
        <div class="ry-item-inner">
          <div class="ry-item-title nowrap2"
            style="-webkit-box-orient: vertical;">{{item.name}}</div>

          <div class="ry-item-money">
            <div class="ry-item-money-buy">￥{{item.currentPrice}}</div>
            <div class="ry-item-money-old"
              v-if="item.currentPrice < item.originPrice">原价￥{{item.originPrice}}</div>
          </div>

          <div class="ry-item-button ry-button-main ry-button-small">立即购买</div>
        </div>
      </div>

      <div class="ry-list-empty"
        v-if="!listOrigin || listOrigin.length < 1"
        @click="queryList(1)">
        暂无数据，请点击刷新
      </div>
  </div>
  </div>
</template>

<script src="./index.js"></script>

<style scoped="scoped" lang="postcss">
  @import './ryList.postcss';
</style>
