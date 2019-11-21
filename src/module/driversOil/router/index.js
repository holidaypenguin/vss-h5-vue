import Vue from 'vue'
import Router from 'vue-router'
import Index from 'componments/driversOil/index/index.vue'
import Order from 'componments/driversOil/order/order.vue'
import config from '../../../../config'
import setting from '../setting'

Vue.use(Router)

// console.log(process.env.RUN_ENV)

export default new Router({
  mode: 'history',
  base: `${config.produceName}/${config.moduleRootName}/${setting.moduleName}`,
  routes: [
    {
      name: 'index',
      path: '/index',
      component: Index,
      meta: {title: '加油优惠'},
    },
    {
      name: 'order',
      path: '/order',
      component: Order,
      meta: {title: '加油记录'},
    },
    {
      path: '*',
      redirect: {name: 'index'},
      component: Vue.extend({
        template: '<router-view transition="fade" transition-mode="out-in"></router-view>',
      }),
    },
  ],
})
