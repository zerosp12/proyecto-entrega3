<template>
    <div>
      <h3 class="mb-4">> Viendo Pedido # {{ pedido.id }}</h3>
        <div class="table-responsive mb-4">
            <table class="table border">
                <thead>
                    <tr>
                        <td scope="row" class="fw-bold bg-light">Cliente:</td>
                        <td>{{ pedido.nombre }}</td>
                    </tr>
                    <tr>
                        <td scope="row" class="fw-bold bg-light">Fecha y Hora:</td>
                        <td>{{ obtenerFecha(pedido.fecha) }}</td>
                    </tr>
                    <tr>
                        <td scope="row" class="fw-bold bg-light">Direccíón:</td>
                        <td>{{ pedido.direccion }}</td>
                    </tr>
                </thead>
            </table>
        </div>
        <h4 class="mt-4">> Pedido</h4>
        <div class="table-responsive">
            <table class="table border text-center tabla-overflow">
                <thead>
                    <tr class="fw-bold bg-dark text-light">
                        <td>Producto</td>
                        <td>Cantidad</td>
                        <td>Precio</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(producto, index) in pedido.productos" :key="index">
                        <td>{{ obtenerNombreProducto(producto.id_producto) }}</td>
                        <td>x {{ producto.cantidad }}</td>
                        <td>$ {{ producto.precio }}</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="value-total">
                            Precio Total: $ <span>{{ obtenerTotal }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button type="button" class="btn btn-warning btn-sm fw-bold" @click="$router.go(-1)">
            <i class="fas fa-chevron-left"></i> Volver
        </button>
        <button type="button" class="btn btn-success btn-xl btn-sm fw-bold mx-2" @click="deleteItem(pedido.id)">
            <i class="fas fa-check"></i> MARCAR COMO ENTREGADO!</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'PedidosVer',
    data() {
        return {
            pedido: [],
            productos: []
        }
    }, 
    created() {
        let index = this.$route.params.id;
        this.pedido = this.obtenerPedidos().find(x => x.id == index)
        this.productos = this.obtenerProductos()
    },
    methods: {
        ...mapGetters('pedidos', ['obtenerPedidos']),
        ...mapGetters('productos', ['obtenerProductos']),
        ...mapActions('productos', ['obtenerProductosAPI']),
        ...mapActions('pedidos', ['eliminarPedidoAPI']),

        obtenerFecha(val) {
            return new Date(val * 1000).toLocaleString('es-AR')
        },
        obtenerNombreProducto(index) {
            return this.productos.find(x => x.id == index).nombre
        },
        deleteItem(index) {
            var answer = window.confirm("Estas seguro de que deses confirmar la entrega de el siguiente Pedido?");
            if (answer) {
                this.eliminarPedidoAPI(index)
                this.$router.push('/gestion/pedidos')
            }
        },
    },
    computed: {
        obtenerTotal() {
            let total = 0
            this.pedido.productos.forEach(e => {
                total += e.precio * e.cantidad
            });
            return total
        }
    }
};
</script>
<style scoped>
.value-total {
  text-align: right;
  font-size: 1.8em;
  padding-right: 40px;
}
</style>