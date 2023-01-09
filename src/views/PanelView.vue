<template>
  <div>
    <h1 class="pt-4"><i class="fas fa-users-cog mr-2"></i> Panel de Gestión</h1>
    <hr class="mt-4 mb-4" />
    <ul class="nav nav-pills">
        <li class="nav-item">
            <router-link class="nav-link" to="/gestion/usuarios">Usuarios</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/gestion/productos">Productos</router-link>
        </li>
    </ul>
    <router-view class="mt-4 p-4 border rounded" />
  </div>
</template>
<style scoped>
.nav-link {
    margin-right: 10px;
    border: #CCC solid 1px;
    color: #666;
    padding: 8px 30px;
}
.router-link-active, .router-link-exact-active {
    background-color: rgb(107, 45, 179);
    border: rgb(107, 45, 179) solid 1px;
    color: white;
    font-weight: bold;
}
</style>