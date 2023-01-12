<template>
  <div>
    <ModalMessage :Mensaje="mensajeTexto" :Tipo="mensajeTipo" :MostrarMensaje="mensajeMostrar"
      @cerrarMensaje="cerrarMensaje" />
    <div class="user-select-none carrito-chiquito">
      <div v-if="obtenerContador == 0">
        <h5 class="fw-bold"><i class="fas fa-shopping-cart px-2"></i> Mi pedido</h5>
        <hr class="px-2">
        <div class="text-center">
          <img src="../assets/empty-order.svg">
          <p class="pt-4">Pedido Vacío</p>
        </div>
      </div>
      <div v-else>
        <h5 class="fw-bold"><i class="fas fa-shopping-cart px-2"></i> Mi pedido</h5>
        <hr class="px-2">
        <div v-for="(item, index) in obtenerCarrito()" :key="index">
          <div class="bordered border-bottom py-2">
            <h6>{{ obtenerNombreProducto(item.id_producto) }} x <b>{{ item.cantidad }}</b></h6>
            <div class="row">
              <div class="col-6 fw-bold">
                $ {{ item.precio * item.cantidad }}
              </div>
              <div class="col-6 text-end">
                <button type="button" class="btn btn-sm btn-sm-bis" @click="sumarProducto(item.id_producto)">
                  <i class="fas fa-plus"></i>
                </button>
                <button type="button" class="btn btn-sm btn-sm-bis" @click="restarProducto(item.id_producto)">
                  <i class="fas fa-minus"></i>
                </button>
                <button type="button" class="btn btn-sm btn-sm-bis text-danger"
                  @click="borrarProducto(item.id_producto)">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-end my-3">
          <h4>Precio Total: $ <span>{{ obtenerPrecioTotal }}</span></h4>
        </div>
        <div class="text-end my-3">
          <button type="button" class="btn  btn-sm btn-warning fw-bold" @click="irAlCarrito()">
            <i class="fas fa-shopping-cart"></i> Ir al Carrito</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MixinMensajes } from "@/mixins/mixin.messages.js"
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "CartView.vue",
  mixins: [MixinMensajes],
  data() {
    return {
      productos: [],
      clientID: "",
    };
  },
  created() {

    this.productos = this.obtenerProductos();
  },
  methods: {
    ...mapGetters('productos', ['obtenerProductos']),
    ...mapGetters('carrito', ['obtenerCarrito']),
    ...mapGetters('usuarios', ['obtenerId']),
    ...mapMutations('carrito', ['sumarProducto', 'restarProducto', 'borrarProducto', 'limpiarCarrito']),

    obtenerNombreProducto(index) {
      let producto = this.productos.find((x) => x.id == index);
      return producto ? producto.nombre : "Sin nombre!";
    },

    irAlCarrito() {
      this.$router.push(`/carrito/${this.obtenerId()}`)
    }
  },
  computed: {
    ...mapGetters('carrito', ['obtenerContador', 'obtenerPrecioTotal']),
  },
};
</script>
<style scoped>
.info {
  font-size: 1.5rem;
  width: 40px;
  text-align: left;
  color: #4292d7;
  float: left;
  padding-left: 4px;
}

.btn-sm-bis {
  padding: 0px;
  width: 23px;
  line-height: 23px;
  margin-left: 5px;
  background-color: transparent;
  border: 0px
}

.carrito-chiquito p {
  text-align: center;
  font-size: 18px;
  color: #b4b4b4;
  font-weight: 400;
  padding-right: 25px;
}

@media (max-width: 1399px) {
  .carrito-chiquito {
    padding: 10px;
    margin-bottom: 20px !important;
    ;
  }
}
</style>