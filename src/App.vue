<template>
  <div id="app">
    <NavbarMenu />
    <router-view class="container mt-4 mb-4"/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import NavbarMenu from "./components/NavbarMenu.vue";

export default {
  name: "App",
  components: {
    NavbarMenu,
  },
  created() {
    this.cargarCarrito()
    this.obtenerProductosAPI()
    this.obtenerUsuariosAPI()
    this.setearValoresLogin()
  },
  methods: {
    ...mapMutations('carrito', ['cargarCarrito']),
    ...mapActions('productos', ['obtenerProductosAPI']),
    ...mapMutations('usuarios', ['setearValoresLogin']),
    ...mapActions('usuarios', ['obtenerUsuariosAPI'])
  }
};
</script>

<style>
#app {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 0.9em;
  margin-top: 100px;
  padding-bottom: 40px
}
</style>
