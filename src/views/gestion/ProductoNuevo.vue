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
import axios from "axios"
//--
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
      let URL_PRODUCTOS =
        "https://639a60473a5fbccb5265ab59.mockapi.io/productos"

      axios
        .post(URL_PRODUCTOS, JSON.parse(JSON.stringify(producto)))
        .then(resultado => {
          if (resultado.status == 201) {
            this.crearMensaje(1, "El producto se agrego correctamente...")
          } else {
            this.crearMensaje(2, `Se produjo un error al agregar el producto\n${resultado.statusText}`)
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
