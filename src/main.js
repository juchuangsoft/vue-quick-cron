import Vue from "vue";
import App from "./App.vue";

// 兼容ES6的语法（适配一些不支持ES6语法的浏览器）
import "@babel/polyfill";

// 引入路由
import router from "src/router/router.js";

// 引入vuex
import store from "src/store/store.js";

// 引入include插件文件
import "src/config/include.js";

// 中央事件总线,一般用于组件间进行事件通知
/*  
 通过函数形势传递内容,如this.$bus.$on监听，this.$bus.emit触发，
*/
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
