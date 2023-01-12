<template>
  <div>
    <h3 class="mb-4">> Administrar Productos</h3>
    <router-link to="/gestion/productos/nuevo" class="btn btn-success mb-4">Nuevo Producto</router-link>
    <div v-if="showLoading" class="text-center">
      <LoadingSpinner />
    </div>
    <div v-else class="table-responsive table-bordered text-center">
      <table class="table tabla-overflow">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Descripción</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) of obtenerProductos()" :key="index">
            <td scope="row">{{ producto.nombre }}</td>
            <td>$ {{ producto.precio }}</td>
            <td class="td_descripcion">
              <div class="text-overflow-check">{{ producto.descripcion }}</div>
            </td>
            <td>
              <button type="button btn-sm" class="btn btn-sm btn-warning" @click="$router.push(`/gestion/productos/editar/${producto.id}`)" style="margin-right: 5px">
                <i class="fas fa-pen"></i>
              </button>
              <button type="button btn-sm" class="btn btn-sm btn-danger" @click="deleteItem(producto.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: "ProductosLista",
  components: {
    LoadingSpinner
  },
  data() {
    return {
      productList: [],
    }
  },

  created() {
    this.obtenerProductosAPI();
  },
  methods: {
    ...mapGetters('productos', ['obtenerProductos', 'checkLoading']),
    ...mapActions('productos', ['obtenerProductosAPI', 'eliminarProductoAPI']),

    deleteItem(index) {
      var answer = window.confirm("Deseas Borrar el siguente Producto?");
      if (answer) {
          this.eliminarProductoAPI(index)
      }
    },
  },
  computed: {
    showLoading() {
      return this.checkLoading()
    }
  }
}
</script>
<style scoped>
.td_descripcion {
    width: 400px; 
    padding-left: 40px;
}
.text-overflow-check {
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
