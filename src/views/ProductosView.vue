<template>
  <div>
    <ModuleTitle moduloTitulo="Pedí desde tu casa" moduloTexto="- Agrega los productos al carrito compras y luego finaliza el pedído!" moduloIcono="fas fa-motorcycle" />
    <div v-if="showLoading">
      <LoadingSpinner />
    </div>
    <div v-else class="row">
      <div class="col-8">
        <div class="row">
          <TarjetaProductos v-for="(product, index) in obtenerProductos()" :key="index" :producto="product" />
        </div>
      </div>
      <div class="col-4">
        <CarritoChico />
      </div>
    </div>
  </div>
</template>

<script>
import TarjetaProductos from '@/components/TarjetaProductos.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ModuleTitle from '@/components/ModuleTitle.vue'
import CarritoChico from '@/components/CarritoChico.vue'


import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProductosView',
  components: {
    TarjetaProductos,
    LoadingSpinner,
    ModuleTitle,
    CarritoChico
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