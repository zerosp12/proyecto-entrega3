<template>
  <div>
    <h1 class="px-2 pt-4"><i :class="moduloIcono" class="mr-2"></i> {{ moduloTitulo }}</h1>
    <p v-if="moduloTexto" class="px-2">
      {{ moduloTexto }}
    </p>
    <hr class="mt-4 mb-4" />
  </div>
</template>

<script>
export default {
  props: {
    moduloTitulo: String,
    moduloTexto: String,
    moduloIcono: String,
  }
};
</script>