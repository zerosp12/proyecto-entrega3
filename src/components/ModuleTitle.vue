<template>
  <div>
    <h1 class="px-2 pt-4"><i :class="moduloIcono" class="mr-2"></i> {{ moduloTitulo }}</h1>
    <hr class="mt-4 mb-4" />
  </div>
</template>

<script>
export default {
  props: {
    moduloTitulo: String,
    moduloIcono: String,
  }
};
</script>