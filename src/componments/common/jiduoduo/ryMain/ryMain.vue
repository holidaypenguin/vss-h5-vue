<template>
  <div class="ry-main">
    <transition name="fade">
      <!-- <keep-alive :include="['RyList']"> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
    <div class="ry-main-loading" v-show="loadingNext">
      <loading
        :active.sync="loadingNext"
        :can-cancel="false"
        :is-full-page="false"
        color="#F6504D"
        loader="bars"
        :opacity="0.3"
        :z-index="1"
      ></loading>
    </div>
    <div class="ry-main-tabs">
      <router-link
        class="ry-main-tab ry-main-tab--list"
        tag="div"
        :to="{ name: 'list', query: query}"
        active-class="ry-main-tab--active"
        replace>
        <div class="ry-main-tab-icon ry-main-tab-icon--list"></div>
        卡券首页
      </router-link>
      <router-link
        class="ry-main-tab ry-main-tab--my"
        tag="div"
        :to="{ name: 'my', query: query}"
        active-class="ry-main-tab--active"
        replace>
        <div class="ry-main-tab-icon ry-main-tab-icon--my"></div>
        我的卡包
      </router-link>
    </div>
  </div>
</template>

<script src="./vm.js"></script>

<style lang="postcss">
  @import 'ryMain.postcss'
</style>
