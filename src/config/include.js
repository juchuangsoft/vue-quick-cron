/*
 * 通用引入文件，一般用于引入一些新的插件或者其他的vue插件内容
    建议：所有新引入的插件在此处填写名称
        当前引入插件有：
        elementUl
        vuex
        vue-router
        babel/polyfill
 */
import Vue from "vue";

// import 项目公用样式
import "src/assets/css/common.scss";

// import 全局接口入口
import "src/api/api.js";

// import element-ui并且注册
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

