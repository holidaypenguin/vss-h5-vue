<template>
  <div class="p-detail">

    <!-- <Nav :title="title" type="detail"
      @back="backHandler"></Nav> -->

    <div class="p-detail-top">
      <div class="p-detail-top-bg"></div>
      <div class="p-detail-top-inner">
        <div class="p-detail-top-name">{{gasInfo.gasName}}</div>
        <div class="p-detail-top-pay">在线支付</div>
        <div class="p-detail-top-addr">{{gasInfo.gasAddress}}</div>
        <div class="p-detail-top-go" @click="goClick">导航</div>
      </div>
    </div>

    <div class="p-detail-name">
      <div class="p-detail-name-left">在线支付</div>
      <div class="p-detail-name-right">选择加油所用油枪号</div>
    </div>

    <div class="p-detail-tab" v-if="oilMap">
      <div :class="[
          'p-detail-tab-item',
          item.oilNo == oilMap.oilNo ? 'p-detail-tab-item--on' :'',
        ]"
        v-for="(item, index) in gasInfo.oilPriceList"
        :key="index">
        <div
          :class="[
            'p-detail-tab-title',
            item.oilNo == oilMap.oilNo ? 'p-detail-tab-title--on' :'',
          ]"
          @click="tabHandler(index)">{{item.oilName}}</div>
      </div>
    </div>

    <div class="p-detail-msg" v-if="oilMap">
      <div class="p-detail-msg-left">¥{{oilMap.priceYfq}}
        <div class="p-detail-msg-icon">新</div>
      </div>
      <div class="p-detail-msg-right">
        <div class="p-detail-msg-line p-detail-msg-line--line1">
          比国际价{{diffPriceType === 2 ? '贵' : diffPriceType === 1 ? '省' : '相同'}}
          <span class="p-detail-msg-more">{{diffPriceAbs}}元</span>
        </div>
        <div class="p-detail-msg-line">
          仅限在线支付，以更新价格为准
        </div>
      </div>
    </div>

    <div class="p-detail-num" v-if="oilMap && oilMap.gunNos">
      <div class="p-detail-num-inner">
        <div
          :class="[
            'p-detail-num-item',
            item.gunNo === gunNo ? 'p-detail-num-item--on' : '',
          ]"
          v-for="(item) in oilMap.gunNos"
          :key="oilMap.oilNo + '--' + item.gunNo"
          @click="gunNoHandler(item.gunNo)">{{item.gunNo}}号枪</div>
      </div>
    </div>

  </div>
</template>

<script>
import vm from './vm'
export default vm
</script>

<style lang="postcss">
@import './detail.postcss'
</style>
