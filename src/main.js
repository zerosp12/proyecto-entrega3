import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueForm from 'vue-form'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.use(vueForm, {

    validators: {
      matches: function (value, attrValue) {
        return (!attrValue) ? true : value === attrValue;
      },
    }
});

document.title = 'Proyecto Etapa 3'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
