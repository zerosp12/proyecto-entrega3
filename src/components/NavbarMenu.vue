<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <a class="navbar-brand" href="#">> Delivery Online</a>
          <button
            class="navbar-toggler d-lg-none text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseMenu"
            aria-controls="collapseMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="collapseMenu">
            <ul class="navbar-nav me-auto mt-2 mt-lg-0">
              <li v-if="obtenerPrivilegios() == 0" class="nav-item">
                <router-link class="nav-link" to="/productos">
                  <i class="fas fa-motorcycle mr-2"></i> Delivery
                </router-link>
              </li>
              <li v-if="checkLogin() && obtenerPrivilegios() == 0" class="nav-item">
                <router-link class="nav-link" :to="`/carrito/${this.obtenerId()}`">
                  <i class="fas fa-shopping-cart mr-2"></i> 
                  <span class="badge text-bg-warning">{{ obtenerCarritoCount }}</span>
                </router-link>
              </li>
              <li v-if="checkLogin()" class="nav-item">
                <router-link class="nav-link" to="/logout">
                  <i class="fas fa-user mr-2"></i> Salir
                </router-link>
              </li>
              <li v-else>
                <router-link class="nav-link" to="/login">
                  <i class="fas fa-user mr-2"></i> Ingresar!
                </router-link>
              </li>
              <li v-if="!checkLogin()">
                <router-link class="nav-link" to="/registro">
                  <i class="fas fa-user-plus mr-2"></i> Registrate
                </router-link>
              </li>
              <li v-if="checkLogin() && obtenerPrivilegios() == 1">
                <router-link class="nav-link" to="/gestion">
                  <i class="fas fa-users-cog mr-2"></i> Panel de Gesti??n
                </router-link>
              </li>
              <li v-if="checkLogin()" class="px-2 avatar-container">
                <div class="fw-bold text-white">
                  <img :src="obtenerAvatar()" class="rounded-circle avatar" />
                  {{ obtenerNombre() }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavbarMenu",
  data() {
    return {
      linkCarrito: "/carrito",
    };
  },
  created() {
    this.linkCarrito = "/carrito";

    if (this.checkLogin() != false) {

      this.linkCarrito = `/carrito/${this.obtenerId()}`;
    }
  },
  methods: {
    ...mapGetters('carrito', ['obtenerContador']),
    ...mapGetters('usuarios', ['checkLogin', 'obtenerLogin', 'obtenerId', 'obtenerDireccion', 'obtenerAvatar', 'obtenerPrivilegios', 'obtenerNombre'])
  },
  computed: {
    obtenerCarritoCount() {
        return this.obtenerContador();
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border: rgb(155, 85, 235) solid 2px;
}
.navbar-toggler {
  border: 0px;
  line-height: 30px;
  box-shadow: none;
}
.navbar {
  background-color: rgb(107, 45, 179);
  box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 1001;
  width: 100%;
  top: 0;
}
.navbar-brand {
  font-size: 2em;
  color: #fff;
  font-weight: 600;
}
.nav-link {
  font-size: 1.1em;
  margin: 0px 5px;
  padding: 8px 20px !important;
  color: #fff;
  border: transparent solid 1px;
  border-radius: 5px;
  line-height: 20px;
}
.nav-link:hover {
  color: #fff;
  border: rgb(155, 85, 235) solid 1px;
}
.router-link-exact-active {
  background-color: rgb(155, 85, 235);
  border: rgb(155, 85, 235) solid 1px;
  color: white !important;
}
.nav-link i {
  margin-right: 6px;
  min-width: 20px;
}

@media (max-width: 576px) {
  .nav-link {
    margin-bottom: 10px;
  }

  .avatar-container {
    padding: 10px 0px 10px 20px;
  }
}

@media (min-width: 576px) {
  .navbar-expand-sm .navbar-nav {
    justify-content: right;
  }

  .navbar-collapse {
    flex-grow: 0;
  }
}
</style>
