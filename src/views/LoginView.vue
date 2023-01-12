<template>
  <div class="form-content">
    <ModalMessage :Mensaje="mensajeTexto" :Tipo="mensajeTipo" :MostrarMensaje="mensajeMostrar"
      @cerrarMensaje="cerrarMensaje" />
    <ModuleTitle moduloTitulo="Tu Cuenta" moduloIcono="fas fa-user" />
    <vue-form :state="loginform" @submit.prevent="enviarLogin()">
      <validate auto-label class="form-group required-field mb-3">
        <label class="form-label">Usuario</label>
        <input v-model="model.username" type="text" name="username" class="form-control"
          :class="obtenerClassEstado(loginform.username)" required />
        <field-messages name="username" show="$touched || $submitted">
          <div slot="required" class="text-danger">
            Debes ingresar un Usuario
          </div>
        </field-messages>
      </validate>
      <validate auto-label class="form-group required-field mb-3">
        <label class="form-label" for="password">Contraseña</label>
        <input v-model="model.password" type="password" name="password" class="form-control"
          :class="obtenerClassEstado(loginform.password)" required />
        <field-messages name="password" show="$touched || $submitted">
          <div slot="required" class="text-danger">
            Debes ingresar una Contraseña
          </div>
        </field-messages>
      </validate>
      <div class=" d-grid gap-2">
        <button type="submit" class="btn btn-warning fw-bold mb-4">
          Ingresar
        </button>
      </div>
      <div class="text-center">
        <p>
          No eres miembro?
          <router-link to="/registro">Registrate</router-link>
        </p>
      </div>
    </vue-form>
  </div>
</template>
<script>
import ModuleTitle from "@/components/ModuleTitle.vue";

import { MixinForms } from "@/mixins/mixin.forms.js";
import { MixinMensajes } from "@/mixins/mixin.messages.js";
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "LoginView",
  components: {
    ModuleTitle,
  },
  mixins: [MixinForms, MixinMensajes],
  data() {
    return {
      usuarios: {},

      //Form Check
      loginform: {},
      model: {
        username: "",
        password: "",
      },
    };
  },
  created() {

    if (this.checkLogin() == true) {
      this.$router.push('/productos')
      return;
    }

    this.usuarios = this.obtenerUsuarios();
  },
  methods: {
    ...mapGetters('usuarios', ['obtenerUsuarios', 'checkLogin', 'obtenerId']),
    ...mapGetters('carrito', ['obtenerContador']),
    ...mapMutations('usuarios', ['setearValoresLogin', 'setLogin']),

    enviarLogin() {

      let info = this.usuarios.find((x) =>
        x.usuario == this.model.username && x.password == this.model.password
      );

      if (info) {
        this.setLogin(info)
        this.setearValoresLogin()

        if (info.privilegios == 1) {
          this.$router.push('/gestion')
        }
        else {
          this.$router.push((this.obtenerContador() > 0) ? `/carrito/${this.obtenerId()}` : '/productos')
        }
        
      } else {
        this.crearMensaje(2, "Los datos ingresados no son correctos");
      }
    },
  },
};
</script>
<style scoped>
.form-content {
  max-width: 30rem;
}
</style>
