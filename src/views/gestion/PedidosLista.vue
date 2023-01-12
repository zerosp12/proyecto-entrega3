<template>
    <div>
        <h3 class="mb-4">> Administrar Pedidos</h3>
        <div v-if="showLoading" class="text-center">
            <LoadingSpinner />
        </div>
        <div v-else class="table-responsive table-bordered text-center">
            <table class="table tabla-overflow">
                <thead>
                    <tr>
                        <th scope="col">ID Pedido</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Artículos</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(producto, index) of obtenerPedidos()" :key="index">
                        <td scope="row">{{ producto.id }}</td>
                        <td>{{ producto.nombre }}</td>
                        <td>
                            {{ Object.keys(producto.productos).length }}
                        </td>
                        <td>
                            {{ obtenerFecha(producto.fecha) }}
                        </td>
                        <td>
                            <button type="button btn-sm" class="btn btn-sm btn-warning"
                                @click="$router.push(`/gestion/pedidos/ver/${producto.id}`)" style="margin-right: 5px">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button btn-sm" class="btn btn-sm btn-success"
                                @click="deleteItem(producto.id)">
                                <i class="fas fa-check"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: "PedidosLista",
    components: {
        LoadingSpinner
    },
    data() {
        return {
        }
    },

    created() {
        this.obtenerPedidosAPI();
    },
    methods: {
        ...mapGetters('pedidos', ['obtenerPedidos', 'checkLoading']),
        ...mapActions('pedidos', ['obtenerPedidosAPI', 'eliminarPedidoAPI']),
        obtenerFecha(val) {
            return new Date(val * 1000).toLocaleString('es-AR')
        },
        deleteItem(index) {
            var answer = window.confirm("Estas seguro de que deses confirmar la entrega de el siguiente Pedido?");
            if (answer) {
                this.eliminarPedidoAPI(index)
            }
        },
    },
    computed: 
    {
        showLoading() {
            return this.checkLoading()
        }
    }
}
</script>
