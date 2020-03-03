import Vue from 'vue'
import store from './pages/store/store'
import App from './app.vue'
import request from './utils/netWork'
import 'font-awesome/css/font-awesome.min.css';
//设置vue的提示功能关闭
Vue.config.productionTip =false;

//声明当前组件的类型
App.mpType = 'app' //应用
//挂载store对象
Vue.prototype.$store = store
//挂载http请求
Vue.prototype.$http = request
//生成应用实例
const app = new Vue(App)
//挂载整个应用
app.$mount()
