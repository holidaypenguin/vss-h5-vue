<template>

  <div class="p-detail-top">
    <div class="p-detail-top-bg"></div>
    <div class="p-detail-top-inner">
      <div class="p-detail-top-name">{{gasInfo.gasName}}</div>
      <div class="p-detail-top-pay">在线支付</div>
      <div class="p-detail-top-addr">{{gasInfo.gasAddress}}</div>
      <div class="p-detail-top-go" @click="goClick">导航</div>
    </div>
  </div>

</template>

<script>
import vm from './vm'
export default vm
</script>

<style lang="postcss">
/* @import './index.postcss' */
</style>
