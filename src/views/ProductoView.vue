<template>
  <div>
    <div class="row">
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
          class="btn btn-primary me-2"
          @click="$router.go(-1)"
        >
          <i class="fas fa-chevron-left"></i> Volver
        </button>
        <button
          class="btn fw-bold btn-sm btn-warning py-2"
          :disabled="chequearBoton"
          @click.prevent="addProductToCart($event)"
        >
          <i class="fas fa-shopping-cart me-2"></i> Agregar al Carrito
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { MixinCarrito } from "@/mixins/mixin.carrito.js";

export default {
  name: "ProductoView",
  mixins: [MixinCarrito],
  data() {
    return {
      producto: [],
    };
  },
  created() {
    let index = this.$route.params.id;
    let URL_PRODUCTOS = `https://639a60473a5fbccb5265ab59.mockapi.io/productos/${index}`;

    axios
      .get(URL_PRODUCTOS)
      .then((productos) => {
        this.producto = productos.data;
        setTimeout(() => {
          this.showLoading = false;
        }, 500);
      })
      .catch((err) => console.log(err.response.data));
  },
  methods: {
    addProductToCart(event) {
      if (JSON.parse(localStorage.isLogin)) {
        this.botonActivo = true;

        var target = event.currentTarget;
        target.innerHTML = '<i class="fas fa-check mr-2"></i> <b>Agregado!</b>';

        this.insertarItem({
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
      } else {
        this.$router.push("/login");
      }
    },
  },
  computed: {
    chequearBoton() {
      return this.botonActivo;
    },
    obtenerDescripcionConSalto() {
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