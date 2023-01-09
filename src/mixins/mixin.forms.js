export const MixinForms = {
    methods: {
      validarRePassword(value, attrValue) {
        return (!attrValue) ? true : value === attrValue;
      },
      obtenerClassEstado(field) {
        if (!field) return "";
    
        if (field.$touched || field.$submitted) {
          return field.$valid ? "is-valid" : "is-invalid";
        }
    
        return "";
      },
    },
}