<template>
  <div id="app">
    <NavbarMenu />
    <router-view class="container mb-4"/>
    <FooterMain />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import FooterMain from './components/FooterMain.vue';
import NavbarMenu from "./components/NavbarMenu.vue";

export default {
  name: "App",
  components: {
    NavbarMenu,
    FooterMain,
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
  margin-top: 80px;
  margin-bottom: 100px;
}
html, body {
  min-height: 100%;
}
.tabla-overflow {
  min-width: 1000px;
}
</style>
