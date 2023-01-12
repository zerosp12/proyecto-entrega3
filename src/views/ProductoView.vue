<template>
  <div>
    <div class="row" v-if="!productoNotFound">
      <div class="col-6">
        <img :src="producto.image" class="card-img-top" />
      </div>
      <div class="col-6 product-info p-4">
        <h4 class="card-title fw-bold pb-4">{{ producto.nombre }}</h4>
        <p v-html="obtenerDescripcionConSalto"></p>
        <h3 class="pt-3 pb-2">$ {{ producto.precio }}</h3>
        <h6 class="pt-3 pb-2">Stock Disponible: {{ producto.count }}</h6>
        <button
          type="button"
          class="btn btn-success me-2 fw-bold"
          @click="$router.go(-1)"
        >
          <i class="fas fa-chevron-left"></i> Volver
        </button>
        <button
          class="btn fw-bold btn-sm btn-warning py-2 fw-bold"
          :disabled="chequearBoton"
          @click.prevent="addProductToCart($event)"
        >
          <i class="fas fa-shopping-cart me-2"></i> Agregar al Carrito
        </button>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-danger" role="alert">
        <strong>Error!</strong> No se pudo encontrar el producto solicitado ... :(
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "ProductoView",
  data() {
    return {
      producto: [],
      productoNotFound: false,
    };
  },
  created() {
    
    if(localStorage.userPrivileges == 1) {
      this.$router.push('/gestion')
      return;
    }

    let index = this.$route.params.id;
    this.producto = this.obtenerProductos().find(x => x.id == index)

    if(this.producto == undefined) {
      this.productoNotFound = true
    }
  },
  methods: {
    ...mapGetters('productos', ['obtenerProductos']),
    ...mapActions('productos', ['obtenerProductosAPI']),
    ...mapMutations('carrito', ['insertarProducto']),

    addProductToCart(event) {
      
      if(this.botonActivo) return;

      this.botonActivo = true;

      var target = event.currentTarget;
      target.innerHTML = '<i class="fas fa-check mr-2"></i> <b>Agregado!</b>';

      this.insertarProducto({
        id_producto: Number(this.producto.id),
        precio: this.producto.precio,
        cantidad: 1,
        usuario: Number(localStorage.clientID),
      });

      setTimeout(() => {
        target.innerHTML =
          '<i class="fas fa-shopping-cart mr-2"></i> Agregar al Carrito';
        this.botonActivo = false;
      }, 300);
    },
  },
  computed: {
    chequearBoton() {
      return this.botonActivo;
    },
    obtenerDescripcionConSalto() {
      if(this.producto.length == 0) return ""

      return this.producto.descripcion.replace(/\n/g, "<br />");
    },
  },
};
</script>

<style scoped>
.product-info {
  background-color: #fafafa;
}
</style>