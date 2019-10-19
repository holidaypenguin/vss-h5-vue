<template>
  <!-- 加这一层是因为在ios使用瀑布流之后两边留白不一致 -->
  <div class="ry-list-wrap">
    <div class="ry-list" ref="list">
      <div class="ry-item-wrap"
        v-for="(item, index) in listOrigin"
        :key="index">
        <div class="ry-item-inner" @click="itemHandler(item.id)">
          <div class="ry-item-empty">
            <img class="ry-item-image" :src="item.iconUrl"/>
          </div>
          <div class="ry-item-title nowrap2"
            style="-webkit-box-orient: vertical;">{{item.name}}</div>
          <div class="ry-tag-only"
            v-if="(setting && setting.moduleName === 'douli')
            && (item.currentPrice < item.originPrice)">兜礼专享</div>
          <div class="ry-item-money">
            <span class="ry-item-money-buy">￥{{item.currentPrice}}</span
            ><span class="ry-item-money-old"
              v-if="item.currentPrice < item.originPrice">￥{{item.originPrice}}</span>
          </div>
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
  @import './ryList2.postcss';
</style>
