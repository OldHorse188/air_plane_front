import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import el from 'element-ui'; //导入js
import 'element-ui/lib/theme-chalk/index.css' //导入css

//全局注册element组件
Vue.use(el);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
