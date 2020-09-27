import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

// import '@/permission'
import './http';

Vue.config.productionTip = false
 
new Vue({
    router:router,
    render: h => h(App),
}).$mount('#app')


