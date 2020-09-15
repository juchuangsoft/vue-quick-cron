import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

// 路由配置项
const routerConfig = {
  base: process.env.BASE_URL,
  routes: [
    // 路由进入重定向
    {
      path: "/",
      redirect: "/test",
    },
    {
      path: "/test",
      name: "test",
      component:()=>import('src/views/test.vue')
    },
  ],
};

export default new Router(routerConfig);
