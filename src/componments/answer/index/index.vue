<template>
  <div class="p-index">
    <div class="p-index-inner p-index-home" v-if="!next">

      <div class="p-index-home-head"></div>

      <van-button type="info" class="p-index-home-button"
        @click="nextHanler">活动规则</van-button>

      <div class="p-index-home-bottom"></div>

      <!-- <img
        class="p-index-code"
        src="https://img0.t.rongyi.com/123/20200611/1d44dd7a75afa25cf86dea886fe85c56.jpg"
        alt=""> -->

      <!-- <van-button type="info" class="p-index-button">分享朋友圈</van-button> -->

    </div>
    <div class="p-index-inner p-index-rule" v-else>

      <div class="p-index-rule-head"></div>

      <panel>

        <div class="p-index-rule-name">
          活动规则：
        </div>

        <div class="p-index-rule-line">
          1、每个用户需要真实有效的进行问卷调查
        </div>
        <div class="p-index-rule-line">
          2、一个用户账户只可以答一次
        </div>
        <div class="p-index-rule-line">
          3、答题用户可以获得金币奖励
        </div>
        <div class="p-index-rule-line">
          4、用户可以邀请好友一起来答题
        </div>
      </panel>

      <van-button type="info" class="p-index-rule-button"
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
