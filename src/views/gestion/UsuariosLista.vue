<template>
  <div>
    <h3 class="mb-4">> Administrar Usuarios</h3>
    <div v-if="showLoading" class="text-center">
      <LoadingSpinner />
    </div>
    <div v-else class="table table-bordered text-center">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Usuario</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(usuario, index) of usersList" :key="index">
            <td scope="row">{{ usuario.usuario }}</td>
            <td>{{ usuario.nombre }}</td>
            <td>{{ usuario.email }}</td>
            <td>
              <button
                type="button btn-sm"
                class="btn btn-sm btn-warning"
                @click="$router.push(`/gestion/usuarios/editar/${usuario.id}`)"
                style="margin-right: 5px"
              >
                <i class="fas fa-pen"></i>
              </button>
              <button
                type="button btn-sm"
                class="btn btn-sm btn-danger"
                @click="deleteUsuario(usuario.id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import axios from "axios";

const URL_USUARIOS = "https://639a60473a5fbccb5265ab59.mockapi.io/usuarios";

export default {
  name: "UsuariosLista",
  components: {
    LoadingSpinner,
  },

  data() {
    return {
      showLoading: true,
      usersList: [],
    };
  },

  created() {
    
    axios
      .get(URL_USUARIOS)
      .then((usuarios) => {
        this.usersList = usuarios.data;
        setTimeout(() => {
          this.showLoading = false;
        }, 500);
      })
      .catch((err) => console.log(err.response.data));
  },
  methods: {
    deleteUsuario(index) {
      var answer = window.confirm("Deseas Borrar el Usuario?");
      if (answer) {
        axios
          .delete(`${URL_USUARIOS}/${index}`)
          .then(resp => {
            
            if(resp.status == 200) {

              let usuario = this.usersList.findIndex(x => x.id == index)

              if(usuario >= 0) {
                this.usersList.splice(usuario, 1)
              }
            }
          })
          .catch(err => console.log(err.response.data))
      }
    }
  },
};
</script>

<style scoped>
</style>