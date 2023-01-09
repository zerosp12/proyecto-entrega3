<template>
  <div>
    <ModalMessage
      :Mensaje="mensajeTexto"
      :Tipo="mensajeTipo"
      :MostrarMensaje="mensajeMostrar"
      @cerrarMensaje="cerrarMensaje"
    />
    <formulario-producto
      textoTitulo="> Nuevo Producto"
      textoBoton="Agregar Producto"
      :getProducto="null"
      @enviarForm="enviarForm($event)"
    />
  </div>
</template>

<script>
import FormularioProducto from "@/components/FormularioProducto.vue"
//--
import { MixinMensajes } from "@/mixins/mixin.messages.js"

export default {
  name: "ProductoNuevo",
  components: { FormularioProducto },
  mixins: [MixinMensajes],
  data() {
    return {}
  },
  methods: {

    enviarForm(producto) {
        //Gracias Google
        this.$store.dispatch('productos/agregarProductoAPI', producto)

        .then(resultado => {
          if (resultado.status == 201) {
            this.$router.push({path: '/gestion/productos'})
          } else {
            this.crearMensaje(2, `Se produjo un error al agregar el producto\n\r${resultado.statusText}`)
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
