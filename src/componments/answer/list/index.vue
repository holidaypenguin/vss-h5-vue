<template>
  <div class="p-list">
    <div class="p-list-body">
      <div class="p-list-wrap">
        <div class="p-list-head">
          【单选题】<br>
          下列判断有误的是
        </div>
        <div class="p-list-choice">
          <van-checkbox-group v-model="result">
            <van-checkbox name="a">复选框 a复选框 a复选框 a复选框 a复选框 a复选框 a复选框 a复选框 a复选框 a</van-checkbox>
            <van-checkbox name="b">复选框 b复选框 b复选框 b复选框 b复选框 b复选框 b复选框 b复选框 b复选框 b复选框 b</van-checkbox>
          </van-checkbox-group>
          <!-- <div class="p-list-item">
            <div class="p-list-item-left"></div>
            <div class="p-list-item-right"></div>
          </div>

          <div class="p-list-item">
            <div class="p-list-item-left"></div>
            <div class="p-list-item-right"></div>
          </div> -->

        </div>
      </div>
    </div>
    <div class="p-list-bottom">
      <div class="p-list-bottom-button">
        <van-button type="info" plain>上一题</van-button>
      </div>
      <div class="p-list-bottom-button">
        <van-button type="info" plain>下一题</van-button>
      </div>
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
