<template>
  <div class="p-panel">
    <div class="p-panel-head"></div>
    <div class="p-panel-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'p-panel',
}
</script>
<style lang="postcss">
@n p{
  @b panel{
    width: 648px;
    margin: 0 auto;
    @e head{
      background: url(../images/panel_head.png) no-repeat;
      background-size: 100% 100%;
      height: 204px;
    }
    @e body{
      padding: 0 55px;
      background: #FFFFFF;
      border-bottom-left-radius: 7px;
      border-bottom-right-radius: 7px;
    }
  }
}
</style>
