<template>
  <div>
    <h3 class="mb-4">{{ textoTitulo }}</h3>
    <vue-form :state="formstate" @submit.prevent="enviarFormulario()">
    <validate auto-label class="form-group required-field mb-3">
      <label for="nombre" class="form-label">Nombre</label>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del Producto"
        v-model="producto.nombre"
        class="form-control"
        :class="obtenerClassEstado(formstate.nombre)"
        required
      />
      <field-messages name="nombre" show="$touched || $submitted">
        <div slot="required" class="text-danger">Debes ingresar un Nombre</div>
      </field-messages>
    </validate>
    <validate auto-label class="form-group required-field mb-3">
      <label for="descripcion" class="form-label">Descripción</label>
      <textarea
        name="descripcion"
        rows="3"
        class="form-control"
        placeholder="Descripción"
        v-model="producto.descripcion"
        :class="obtenerClassEstado(formstate.descripcion)"
        required
      ></textarea>
      <field-messages name="descripcion" show="$touched || $submitted">
        <div slot="required" class="text-danger">Debes ingresar una Descripción</div>
      </field-messages>
    </validate>
    <validate auto-label class="form-group required-field mb-3">
      <label for="precio" class="form-label">Precio</label>
      <input
        type="numeric"
        class="form-control"
        name="precio"
        placeholder="$"
        v-model="producto.precio"
        required
        :class="obtenerClassEstado(formstate.precio)"
      />
      <field-messages name="precio" show="$touched || $submitted">
        <div slot="required" class="text-danger">Debes ingresar un Precio</div>
      </field-messages>
    </validate>
    <validate auto-label class="form-group required-field mb-3">
      <label for="url" class="form-label">URL Imagen</label>
      <input
        type="text"
        class="form-control"
        name="url"
        placeholder=""
        v-model="producto.image"
        required
        :class="obtenerClassEstado(formstate.url)"
      />
      <field-messages name="url" show="$touched || $submitted">
          <div slot="required" class="text-danger">Debes ingresar una Imagen</div>
      </field-messages>
    </validate>
    <button type="button" class="btn btn-warning" @click="$router.go(-1)">
      <i class="fas fa-chevron-left"></i> Volver
    </button>
    <button type="submit" class="btn btn-success">
      {{ textoBoton }}
    </button>
    </vue-form>
  </div>
</template>

<script>
import { MixinForms } from "@/mixins/mixin.forms.js"

export default {
  name: "FormularioProducto",
  components: {},
  mixins: [MixinForms],
  props: {
    getProducto: Object,
    textoTitulo: String,
    textoBoton: String,
  },
  data() {
    return {
      formstate: {},
      
      producto: {
        nombre: '',
        descripcion: '',
        precio: '',
        image: '',
      },
    }
  },
  created() {
    
    if(this.getProducto != null) {
    this.producto = this.getProducto
    }
  },
  computed: {
  },
  methods: {
    enviarFormulario() {
      if (this.formstate.$valid) {
        this.$emit('enviarForm', this.producto)
      }

    },
  },
}
</script>

<style scoped>
button {
  margin-right: 10px;
}
</style>
