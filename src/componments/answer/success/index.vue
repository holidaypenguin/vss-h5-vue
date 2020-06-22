<template>
  <div class="p-success">
    <div class="p-success-inner">
      <div class="p-success-top">
        <div class="p-success-top-icon"></div>
        <div class="p-success-top-text">
          {{isGet ? '答题成功，已领取红包' : '答题成功，请领取红包'}}
        </div>
      </div>
      <div class="p-success-red" @click="getRed" v-if="!isGet"></div>
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
