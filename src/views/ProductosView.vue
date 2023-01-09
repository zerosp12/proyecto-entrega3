<template>
  <div>
    <ModuleTitle moduloTitulo="Pedí desde tu casa" moduloTexto="- Agrega los productos al carrito compras y luego finaliza el pedído!" moduloIcono="fas fa-motorcycle" />
    <div v-if="showLoading">
      <LoadingSpinner />
    </div>
    <div v-else class="row">
      <TarjetaProductos v-for="(product, index) in productList" :key="index" :producto="product" />
    </div>
  </div>
</template>

<script>
import TarjetaProductos from '@/components/TarjetaProductos.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ModuleTitle from '@/components/ModuleTitle.vue'

import axios from 'axios'

export default {
  name: 'ProductosView',
  components: {
    TarjetaProductos,
    LoadingSpinner,
    ModuleTitle
  },

  data() {
    return {
      showLoading: true,
      productList: [],
      cartList: []
    };
  },

  created() {
    let URL_PRODUCTOS = 'https://639a60473a5fbccb5265ab59.mockapi.io/productos'

    axios.get(URL_PRODUCTOS)
    .then((productos) => { 
      this.productList = productos.data 
      setTimeout(() => { this.showLoading = false }, 500)
    })
    .catch((err) => console.log(err.response.data))
  },
}
</script>

<style scoped>
</style>