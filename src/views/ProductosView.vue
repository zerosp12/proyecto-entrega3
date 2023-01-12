<template>
  <div>
    <ModuleTitle moduloTitulo="Pedí desde tu casa" moduloIcono="fas fa-motorcycle" />
    <div v-if="showLoading">
      <LoadingSpinner />
    </div>
    <div v-else class="row panel">
      <div class="col-xs-6 col-xxl-8">
        <div class="row">
          <TarjetaProductos v-for="(product, index) in obtenerProductos()" :key="index" :producto="product" />
        </div>
      </div>
      <div class="col-xs-6 col-xxl-4">
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
<style scoped>
.panel {
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 1399px) {
  .panel {
      flex-direction: column-reverse;
  }
}
</style>