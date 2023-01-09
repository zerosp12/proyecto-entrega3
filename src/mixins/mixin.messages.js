import ModalMessage from '@/components/ModalMessage.vue'

export const MixinMensajes = {
  components: {
    ModalMessage
  },
  data() {
    return {
      mensajeTexto: "",
      mensajeTipo: 1,
      mensajeMostrar: false,
    }
  },
  methods: {
    crearMensaje(tipo, mensaje) {
      this.mensajeTipo = tipo
      this.mensajeTexto = mensaje
      this.mensajeMostrar = true
    },
    cerrarMensaje() {
      this.mensajeMostrar = false
    },
  },
}
