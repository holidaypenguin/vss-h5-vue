<template>
  <div class="p-index">
    <div class="p-index-inner" v-if="!next">

      <!-- <img
        class="p-index-code"
        src="https://img0.t.rongyi.com/123/20200611/1d44dd7a75afa25cf86dea886fe85c56.jpg"
        alt=""> -->

      <van-button type="info" class="p-index-button"
        @click="nextHanler">活动规则</van-button>

      <!-- <van-button type="info" class="p-index-button">分享朋友圈</van-button> -->

    </div>
    <div class="p-index-inner" v-else>

      <van-button type="info" class="p-index-button"
        @click="startHanler">开始答题</van-button>

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
