<template>

  <div class="p-detail-button-wrap">
    <div
      :class="[
        'p-detail-button',
        gunNo ? 'p-detail-button--on' : '',
      ]"
      @click="goPayHandler">
      在线优惠支付
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
