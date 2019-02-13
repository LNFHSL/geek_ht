import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css


import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import axios from 'axios'
axios.defaults.baseURL='http://localhost/geek/public'
Vue.prototype.URL = 'http://localhost/geek/public'
axios.defaults.withCredentials=true;
// Vue.prototype.URL = 'http://www.geekyiqi.com/geek/public'
Vue.prototype.$apiURL = axios.defaults.baseURL
Vue.prototype.$http=axios 

// 富文本
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)



Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
