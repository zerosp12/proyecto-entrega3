<template>
  <div>
    <ModalMessage :Mensaje="mensajeTexto" :Tipo="mensajeTipo" :MostrarMensaje="mensajeMostrar"
      @cerrarMensaje="cerrarMensaje" />
    <h1 class="pt-4">
      <i class="fas fa-shopping-cart mr-2"></i> Mi pedido
    </h1>
    <hr class="mt-4 mb-4" />
    <div class="user-select-none">
      <div v-if="obtenerContador == 0">
        <div class="text-center">
          <img src="../assets/empty-order.svg">
          <p class="pt-4 texto-carrito-vacio">Pedido Vacío</p>
        </div>
      </div>
      <div v-else class="table-responsive table-bordered">
        <table class="table text-center tabla-overflow">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Opciones</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in obtenerCarrito()" :key="index">
              <td scope="row">{{ obtenerNombreProducto(item.id_producto) }}</td>
              <td>{{ item.cantidad }}</td>
              <td>
                <button type="button" class="btn btn-sm botones-chicos" @click="sumarProducto(item.id_producto)">
                  <i class="fas fa-plus"></i>
                </button>
                <button type="button" class="btn btn-sm botones-chicos" @click="restarProducto(item.id_producto)">
                  <i class="fas fa-minus"></i>
                </button>
                <button type="button" class="btn btn-sm text-danger botones-chicos" @click="borrarProducto(item.id_producto)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
              <td class="w-25">$ {{ item.precio }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <table v-if="obtenerContador > 0" class="table text-center">
        <thead>
            <tr>
              <td colspan="4" class="value-total">
                Precio Total: $ <span>{{ obtenerPrecioTotal }}</span>
              </td>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2" class="p-2 text-start">
              <button type="button" class="btn btn-sm btn-danger fw-bold" @click="limpiarCarrito()"><i
                  class="fas fa-trash"></i>
                Limpiar Carrito</button>
            </td>
            <td colspan="2" class="text-end p-2">
              <button type="button" class="btn btn-sm btn-success fw-bold" @click="finalizarPedido()">
                <i class="fas fa-shopping-cart"></i> Finalizar Pedido
              </button>
            </td>
          </tr>
          </tbody>
      </table>
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
      botonActivo: false,
      clientID: "",
    };
  },
  created() {

    if (this.obtenerPrivilegios() == 1) {
      this.$router.push('/gestion')
      return;
    }

    this.productos = this.obtenerProductos();
  },
  methods: {
    ...mapGetters('productos', ['obtenerProductos']),
    ...mapGetters('carrito', ['obtenerCarrito']),
    ...mapGetters('usuarios', ['checkLogin', 'obtenerId', 'obtenerNombre', 'obtenerDireccion', 'obtenerPrivilegios']),
    ...mapMutations('carrito', ['sumarProducto', 'restarProducto', 'borrarProducto', 'limpiarCarrito']),

    obtenerNombreProducto(index) {
      let producto = this.productos.find((x) => x.id == index);
      return producto ? producto.nombre : "Sin nombre!";
    },

    finalizarPedido() {

      if (this.checkLogin() == false) {
        this.$router.push('/login')
        return;
      }

      if (this.botonActivo == true) return;

      let pedido = {
        usuario: this.obtenerId(),
        nombre: this.obtenerNombre(),
        direccion: this.obtenerDireccion(),
        productos: []
      }

      this.obtenerCarrito().forEach(x => {

        pedido.productos.push({
          id_producto: Number(x.id_producto),
          cantidad: Number(x.cantidad),
          precio: Number(x.precio),
        })

      })

      this.botonActivo = true

      this.$store.dispatch('carrito/terminarPedido', pedido).then(
        x => {
          if (x.status == 201) {
            this.botonActivo = false
            this.crearMensaje(1, "Su pedido fue cargado exitosamente! En breve haremos el envío.")
            this.limpiarCarrito()
          } else {
            this.crearMensaje(2, "Se produjo un error al intentar cargar el pedido, intenta nuevamente!")
          }
        }
      )

    },
  },
  computed: {
    ...mapGetters('carrito', ['obtenerContador', 'obtenerPrecioTotal']),
  },
};
</script>
<style scoped>
.botones-chicos {
  padding: 0px;
  width: 25px;
  line-height: 25px;
  margin-left: 5px;
  border: 0px;
  background-color: transparent;
}
.texto-carrito-vacio {
  text-align: center;
  font-size: 18px;
  color: #b4b4b4;
  font-weight: 400;
  padding-right: 25px;
}
.value-total {
  text-align: right;
  font-size: 1.8em;
  padding-right: 40px;
}
</style>