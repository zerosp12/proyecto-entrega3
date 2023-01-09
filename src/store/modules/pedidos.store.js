import axios from 'axios'

const URL_CARRITO = 'https://639a60473a5fbccb5265ab59.mockapi.io/carrito'

export default {
    namespaced: true,

    state: {
        pedidos: [], 
        loading: true,
    },
    getters: {
        obtenerPedidos(state) {
            return state.pedidos
        },
        obtenerContador(state) {
            return state.pedidos.length
        },
        checkLoading(state) {
            return state.loading
        }
    },
    mutations: {
        cargarPedidos(state, pedidos_api) {
            state.pedidos = pedidos_api
            state.loading = false
        },
        borrarPedido(state, index) {
            let itemIndex = state.pedidos.findIndex((x) => x.id == index);

            if (itemIndex >= 0) {
                state.pedidos.splice(itemIndex, 1)
            }
        },
    },
    actions: {
        obtenerPedidosAPI: function ({ commit }) {
            return axios.get(URL_CARRITO)
                .then((pedidos) => {
                    commit('cargarPedidos', pedidos.data)
                    return pedidos;
                })
                .catch((err) => console.log(err.response.data));
        },
        eliminarPedidoAPI: function({ commit }, index) {
            axios.delete(`${URL_CARRITO}/${index}`)
                .then(resp => {

                    if(resp.status == 200) {
                        commit('borrarPedido', index)
                    }
                })
                .catch(err => console.log(err.response.data))
        }
    }
}