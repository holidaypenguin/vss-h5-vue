<template>

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

    <div class="p-index-split"></div>
  </div>

</template>

<script>
import vm from './vm'
export default vm
</script>

<style lang="postcss">
@import './index.postcss'
</style>
