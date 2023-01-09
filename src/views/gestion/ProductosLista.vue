<template>
  <div>
    <h3 class="mb-4">> Administrar Productos</h3>
    <router-link to="/gestion/productos/nuevo" class="btn btn-success mb-4">Nuevo Producto</router-link>
    <div v-if="showLoading" class="text-center">
      <LoadingSpinner />
    </div>
    <div v-else class="table table-bordered text-center">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Descripción</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) of productList" :key="index">
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
let URL_PRODUCTOS = `https://639a60473a5fbccb5265ab59.mockapi.io/productos/`

import axios from "axios"
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: "ProductosLista.vue",
  components: {
    LoadingSpinner
  },
  data() {
    return {
      showLoading: true,
      productList: [],
    }
  },

  created() {
    axios
      .get(URL_PRODUCTOS)
      .then(productos => {
        this.productList = productos.data
        setTimeout(() => {
          this.showLoading = false
        }, 500)
      })
      .catch(err => console.log(err.response.data))
  },

  methods: {
    deleteItem(index) {
      var answer = window.confirm("Deseas Borrar el siguente Producto?");
      if (answer) {
        axios
          .delete(`${URL_PRODUCTOS}/${index}`)
          .then(resp => {
            
            if(resp.status == 200) {

              let product = this.productList.findIndex(x => x.id == index)

              if(product >= 0) {
                this.productList.splice(product, 1)
              }
            }
          })
          .catch(err => console.log(err.response.data))
      }
    }
  },
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
