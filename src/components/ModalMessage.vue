<template>
  <div v-if="MostrarMensaje">
    <div class="back-message">
        <div v-if="Tipo == 1" class="alert alert-success alert-dismissible" role="alert">
            <strong>EXITO!</strong><br>{{ Mensaje }}
            <button type="button" class="btn-close" @click="$emit('cerrarMensaje')"></button>
        </div>
        <div v-else-if="Tipo == 2" class="alert alert-danger alert-dismissible" role="alert">
            <strong>ERROR!</strong><br>{{ Mensaje }}
            <button type="button" class="btn-close" @click="$emit('cerrarMensaje')"></button>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "ModalMessage",
  props: {
    MostrarMensaje: Boolean,
    Mensaje: String,
    Tipo: Number,
  }
};
</script>
<style scoped>
.back-message {
  width: 100%; 
  height: 100%; 
  display: block;
  position: fixed; 
  top: 0; 
  left: 0; 
  background-color: rgba(0,0,0,0.5); 
  padding: 20px;
  z-index: 1100;
}

.alert {
  top: 100px;
  max-width: 600px;
  margin: auto;
}

@media (max-width: 576px) {
  .alert {
    width: 90%;
  }
}
</style>