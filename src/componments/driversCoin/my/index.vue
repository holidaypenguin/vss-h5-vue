<template>
  <div class="p-my">

    <Nav :title="title" type="my"
      class="p-my-nav"
      @back="backHandler"></Nav>

    <div class="p-my-top">
      <div class="p-my-top-num">93.5</div>
      <div class="p-my-top-msg">油币总数</div>
    </div>

    <div class="p-my-tip">
      <div class="p-my-tip-header p-my-tip-header--up">什么是油币？</div>
      <div class="p-my-tip-content p-my-tip-content--show">
        油币是司机圈儿社交网络内的数字资产，
        是用户为司机圈儿贡献价值获取到的奖励，
        后续可用户兑换商品、加油、提现等福利，获取油币后要记得领取，
        只有领取后才会进入个人资产，记得哦～<br>
        每天获取油币的总量有限，获取油币的任务做完后，只能等第二天再来获取
      </div>
    </div>

    <div class="p-my-title">油币明细</div>

    <div class="p-my-list">
      <div class="p-my-list-inner">
        <div class="p-my-item">
          <div class="p-my-item-left">
            <div class="p-my-item-name">获取油币领取</div>
            <div class="p-my-item-time">2019.12.23 09:07:09</div>
          </div>
          <div class="p-my-item-right">+3.5</div>
        </div>
        <div class="p-my-item">
          <div class="p-my-item-left">
            <div class="p-my-item-name">加油消耗油币</div>
            <div class="p-my-item-time">2019.12.23 09:07:09</div>
          </div>
          <div class="p-my-item-right p-my-item-right--mm">-3.5</div>
        </div>
        <div class="p-my-item">
          <div class="p-my-item-left">
            <div class="p-my-item-name">加油消耗油币</div>
            <div class="p-my-item-time">2019.12.23 09:07:09</div>
          </div>
          <div class="p-my-item-right">-3.5</div>
        </div>
        <div class="p-my-item">
          <div class="p-my-item-left">
            <div class="p-my-item-name">加油消耗油币</div>
            <div class="p-my-item-time">2019.12.23 09:07:09</div>
          </div>
          <div class="p-my-item-right">-3.5</div>
        </div>
        <div class="p-my-item">
          <div class="p-my-item-left">
            <div class="p-my-item-name">加油消耗油币</div>
            <div class="p-my-item-time">2019.12.23 09:07:09</div>
          </div>
          <div class="p-my-item-right">-3.5</div>
        </div>
        <div class="p-my-item">
          <div class="p-my-item-left">
            <div class="p-my-item-name">加油消耗油币</div>
            <div class="p-my-item-time">2019.12.23 09:07:09</div>
          </div>
          <div class="p-my-item-right">-3.5</div>
        </div>
        <div class="p-my-item">
          <div class="p-my-item-left">
            <div class="p-my-item-name">加油消耗油币</div>
            <div class="p-my-item-time">2019.12.23 09:07:09</div>
          </div>
          <div class="p-my-item-right">-3.5</div>
        </div>
        <div class="p-my-item">
          <div class="p-my-item-left">
            <div class="p-my-item-name">加油消耗油币</div>
            <div class="p-my-item-time">2019.12.23 09:07:09</div>
          </div>
          <div class="p-my-item-right">-3.5</div>
        </div>
        <div class="p-my-item">
          <div class="p-my-item-left">
            <div class="p-my-item-name">加油消耗油币</div>
            <div class="p-my-item-time">2019.12.23 09:07:09</div>
          </div>
          <div class="p-my-item-right">-3.5</div>
        </div>
        <div class="p-my-item">
          <div class="p-my-item-left">
            <div class="p-my-item-name">加油消耗油币</div>
            <div class="p-my-item-time">2019.12.23 09:07:09</div>
          </div>
          <div class="p-my-item-right">-3.5</div>
        </div>
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
