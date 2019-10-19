<template>
  <div class="ry-head"
    @touchmove.prevent @touchstart.prevent @touchend.prevent @click.prevent>
    <div
      :class="['ry-head-back scale25', isHomePage ? 'ry-head-back--close' : '']"
      @touchstart="_backHandler"></div>
    <div class="ry-head-title">{{title}}</div>
    <!-- <div class="ry-head-share"
      v-if="isShare"
      @touchstart="_shareHandler"></div> -->
  </div>
</template>

<script src="./vm.js"></script>

<style lang="postcss">
  @import './ryHead.postcss';
</style>
