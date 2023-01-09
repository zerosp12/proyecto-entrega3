<template>
  <div>
    <ModalMessage :Mensaje="mensajeTexto" :Tipo="mensajeTipo" :MostrarMensaje="mensajeMostrar"
      @cerrarMensaje="cerrarMensaje" />
    <formulario-producto textoTitulo="> Editar Producto" textoBoton="Guardar Cambios" :getProducto="producto"
      @enviarForm="enviarForm($event)" />
  </div>
</template>

<script>
import FormularioProducto from "@/components/FormularioProducto.vue"
//--
import { MixinMensajes } from "@/mixins/mixin.messages.js"
import { mapGetters } from 'vuex'

export default {
  name: "ProductoNuevo",
  components: { FormularioProducto },
  mixins: [MixinMensajes],
  data() {
    return {
      producto: {
        id: 0,
        nombre: '',
        descripcion: '',
        precio: 0,
        image: '',
      },
    }
  },
  created() {
    let index = this.$route.params.id;
    this.producto = this.obtenerProductos().find(x => x.id == index)
  },
  methods: {
    ...mapGetters('productos', ['obtenerProductos', 'obtenerResultado']),

    enviarForm(producto) {
      //Gracias Google
      this.$store.dispatch('productos/editarProductoAPI', producto)
        .then(resultado => {
          if (resultado.status == 200) {
            this.crearMensaje(1, "El producto se edito correctamente...")
          } else {
            this.crearMensaje(2, "Se produjo un error al editar el producto")
          }
        })
    },
  },
}
</script>

<style scoped>
button {
  margin-right: 10px;
}
</style>
