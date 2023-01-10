<template>
  <div class="col-md-4 py-2 mb-3">
    <div class="card h-100 text-center user-select-none">
      <img :src="producto.image" class="card-img-top" />
      <div class="card-body">
        <h6 class="card-title fw-bold">{{ producto.nombre }}</h6>
      </div>
      <div class="card-footer d-grid gap-2">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn fw-bold btn-sm btn-danger py-2 fs-6" @click.prevent="addProductToCart($event)">
            <i class="fas fa-shopping-cart mr-2 btn-block"></i> $ {{ producto.precio }}
          </button>
          <button type="button" class="btn btn-warning fw-bold" @click="verProducto(producto.id)">
            + Info
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  name: "ProductCard",
  data: () => {
    return {
      botonActivo: false,
    };
  },
  props: {
    producto: Object,
  },
  computed: {
    chequearBoton() {
      return this.botonActivo;
    },
  },
  methods: {
    ...mapMutations('carrito', ['insertarProducto']),

    verProducto(index) {

      if (this.botonActivo == false) {
        this.$router.push(`/producto/${index}`)
      }
    },
    addProductToCart(event) {
      if (this.botonActivo == true) return;

      this.botonActivo = true;

      var target = event.currentTarget
      const currentHTML = target.innerHTML
      target.innerHTML = '<i class="fas fa-check mr-2"></i> <b>Agregado!</b>'

      this.insertarProducto({
        id_producto: Number(this.producto.id),
        precio: this.producto.precio,
        cantidad: 1,
        usuario: Number(localStorage.clientID),
      });

      setTimeout(() => {
        target.innerHTML = currentHTML
        this.botonActivo = false
      }, 500);
    },
  },
};
</script>
<style scoped>
.card {
  border: 0px !important;
  padding: 0px 0px 20px 0px;
  box-shadow: 0px 0px 6px 2px #eaeaea;
  transition: box-shadow 0.3s ease-in-out;
  width: 95%;
  margin: 1% !important;
}

a {
  text-decoration: none;
  color: #333;
}
.row>* {
  padding: 4px !important;
}
.card:hover {
  cursor: pointer;
  box-shadow: 0px 0px 6px 2px #bbb;
}
.card-footer {
  background-color: white !important;
  border-top: 0px;
  padding-bottom: 20px;
}
.card-img, .card-img-bottom, .card-img-top {
    width: 100%;
    height: 100%;
}
</style>