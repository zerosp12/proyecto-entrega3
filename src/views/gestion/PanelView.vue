<template>
    <div>
        <h1 class="pt-4"><i class="fas fa-users-cog mr-2"></i> Panel de Gestión</h1>
        <hr class="mt-4 mb-4" />
        <div class="row mb-4">
            <div class="col-md-4 p-1 text-center border fw-bold text-dark" style="background-color: #b691e1">
                <i class="fas fa-user p-3" style="font-size: 3rem"></i>
                <p>Usuarios Registrados: </p>
                <h2>{{ obtenerCantidadUsuarios }}</h2>
            </div>
            <div class="col-md-4 p-1 text-center border fw-bold text-dark" style="background-color: #b691e1">
                <i class="fas fa-box p-3" style="font-size: 3rem"></i>
                <p>Productos Ingresados: </p>
                <h2>{{ obtenerCantidadProductos }}</h2>
            </div>
            <div class="col-md-4 p-1 text-center border fw-bold text-dark" style="background-color: #b691e1">
                <i class="fas fa-motorcycle p-3" style="font-size: 3rem"></i>
                <p>Pedidos Pendientes: </p>
                <h2>{{ obtenerCantidadPedidos }}</h2>
            </div>
        </div>
        <hr>
        <ul class="nav nav-pills">
            <li class="nav-item">
                <router-link class="nav-link" to="/gestion/usuarios">Usuarios</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/gestion/productos">Productos</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/gestion/pedidos">Pedidos</router-link>
            </li>
        </ul>
        <router-view class="mt-4 p-4 border rounded" />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'PanelView',
    created() {
        if (this.checkLogin() == false) {
            this.$router.push('/login')
            return;
        }

        if (this.obtenerPrivilegios() == 0) {
            this.$router.push('/productos')
            return;
        }
    },
    methods: {
        ...mapGetters('usuarios', ['obtenerPrivilegios', 'checkLogin']),
    },
    computed: {
        ...mapGetters('pedidos', ['obtenerCantidadPedidos']),
        ...mapGetters('usuarios', ['obtenerCantidadUsuarios']),
        ...mapGetters('productos', ['obtenerCantidadProductos'])
    }
}
</script>

<style scoped>
.nav-link {
    margin-right: 10px;
    border: #CCC solid 1px;
    color: #666;
    padding: 8px 30px;
}

.router-link-active,
.router-link-exact-active {
    background-color: rgb(107, 45, 179);
    border: rgb(107, 45, 179) solid 1px;
    color: white;
    font-weight: bold;
}
</style>