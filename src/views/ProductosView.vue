<template>
  <div>
    <ModuleTitle moduloTitulo="Pedí desde tu casa" moduloTexto="- Agrega los productos al carrito compras y luego finaliza el pedído!" moduloIcono="fas fa-motorcycle" />
    <div v-if="showLoading">
      <LoadingSpinner />
    </div>
    <div v-else class="row">
      <TarjetaProductos v-for="(product, index) in obtenerProductos()" :key="index" :producto="product" />
    </div>
  </div>
</template>

<script>
import TarjetaProductos from '@/components/TarjetaProductos.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ModuleTitle from '@/components/ModuleTitle.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProductosView',
  components: {
    TarjetaProductos,
    LoadingSpinner,
    ModuleTitle
  },
  created() {
    this.obtenerProductosAPI();
  },
  methods: {
    ...mapGetters('productos', ['obtenerProductos', 'checkLoading']),
    ...mapActions('productos', ['obtenerProductosAPI']),
  },
  computed: {
    showLoading() {
      return this.checkLoading()
    }
  }
}
</script>