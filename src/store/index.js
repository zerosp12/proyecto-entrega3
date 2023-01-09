import Vue from 'vue'
import Vuex from 'vuex'
import carrito from './modules/carrito.store.js'
import productos from './modules/productos.store.js'
import pedidos from './modules/pedidos.store.js'
import usuarios from './modules/usuarios.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    carrito,
    productos,
    pedidos,
    usuarios
  }
})
