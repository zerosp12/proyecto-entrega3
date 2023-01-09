<template>
  <div>
    <ModalMessage :Mensaje="mensajeTexto" :Tipo="mensajeTipo" :MostrarMensaje="mensajeMostrar"
      @cerrarMensaje="cerrarMensaje" />
    <div class="user-select-none">
      <div v-if="obtenerContador == 0" class="border p-3 rounded">
        <i class="fas fa-exclamation-circle"></i> Selecciona algun producto para agregar al carrito
      </div>
      <div v-else>
        <h4 class="fw-bold">Mi pedido</h4>
        <hr class="px-2">
        <div v-for="(item, index) in obtenerCarrito()" :key="index">
            <div class="bordered border-bottom py-2">
              <h5>{{ obtenerNombreProducto(item.id_producto) }} x <b>{{ item.cantidad }}</b></h5>
              <div class="row">
                <div class="col-6 fw-bold">
                  $ {{ item.precio * item.cantidad }}
                </div>
                <div class="col-6 text-end">
                  <button type="button" class="btn btn-sm btn-sm-bis btn-light" @click="sumarProducto(item.id_producto)">
                    <i class="fas fa-plus"></i>
                  </button>
                  <button type="button" class="btn btn-sm btn-sm-bis btn-light" @click="restarProducto(item.id_producto)">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-sm btn-sm-bis btn-danger" @click="borrarProducto(item.id_producto)">
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
          <button type="button" class="btn  btn-sm btn-success fw-bold" @click="irAlCarrito()">
            <i class="fas fa-shopping-cart"></i> Finalizar Pedido</button>
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
    ...mapMutations('carrito', ['sumarProducto', 'restarProducto', 'borrarProducto', 'limpiarCarrito']),

    obtenerNombreProducto(index) {
      let producto = this.productos.find((x) => x.id == index);
      return producto ? producto.nombre : "Sin nombre!";
    },

    irAlCarrito() {
      this.$router.push(`/carrito/${localStorage.clientID}`)
    }
  },
  computed: {
    ...mapGetters('carrito', ['obtenerContador', 'obtenerPrecioTotal']),
  },
};
</script>
<style scoped>
.btn-sm-bis {
  padding: 0px;
  width: 23px;
  line-height: 23px;
  margin-left: 5px;
  border: #ccc solid 1px;
}
</style>