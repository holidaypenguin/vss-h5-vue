import Vue from 'vue'
import Router from 'vue-router'
import Index from 'componments/answer/index/index.vue'
import List from 'componments/answer/list/index.vue'
import Success from 'componments/answer/success/index.vue'
// import config from '../../../../config'
// import setting from '../setting'

Vue.use(Router)

// console.log(process.env.RUN_ENV)

export default new Router({
  mode: 'history',
  // base: `${config.produceName}/${config.moduleRootName}/${setting.moduleName}`,
  base: 'wxpaper',
  routes: [
    {
      name: 'index',
      path: '/index',
      component: Index,
      meta: {title: '答题'},
    },
    {
      name: 'list',
      path: '/list',
      component: List,
      meta: {title: '答题'},
      props: true,
    },
    {
      name: 'success',
      path: '/success',
      component: Success,
      meta: {title: '答题'},
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
