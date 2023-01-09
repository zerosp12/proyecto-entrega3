<template>
  <div>
    <ModalMessage
      :Mensaje="mensajeTexto"
      :Tipo="mensajeTipo"
      :MostrarMensaje="mensajeMostrar"
      @cerrarMensaje="cerrarMensaje"
    />
    <formulario-producto
      textoTitulo="> Editar Producto"
      textoBoton="Guardar Cambios"
      :getProducto="producto"
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

let URL_PRODUCTOS = "https://639a60473a5fbccb5265ab59.mockapi.io/productos"

export default {
  name: "ProductoNuevo",
  components: { FormularioProducto },
  mixins: [MixinMensajes],
  data() {
    return {
      producto: {
        nombre: '',
        descripcion: '',
        precio: 0,
        image: '',
      },
    }
  },
  beforeCreate() {
    axios
        .get(`${URL_PRODUCTOS}/${this.$route.params.id}`, )
        .then(resultado => {
          this.producto.nombre = resultado.data.nombre
          this.producto.descripcion = resultado.data.descripcion
          this.producto.precio = Number(resultado.data.precio)
          this.producto.image = resultado.data.image
        })
    
  },
  methods: {
    enviarForm(producto) {

      axios
        .put(`${URL_PRODUCTOS}/${this.$route.params.id}`, JSON.parse(JSON.stringify(producto)))
        .then(resultado => {
          if (resultado.status == 200) {
            this.crearMensaje(1, "El producto se edito correctamente...")
          } else {
            this.crearMensaje(2, `Se produjo un error al editar el producto\n${resultado.status}`)
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
