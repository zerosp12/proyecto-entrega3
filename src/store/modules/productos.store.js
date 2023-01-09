import axios from 'axios'

const URL_PRODUCTOS = 'https://639a60473a5fbccb5265ab59.mockapi.io/productos/'

export default {
    namespaced: true,

    state: {
        productos: [], 
        loading: true,
    },
    getters: {
        obtenerProductos(state) {
            return state.productos
        },
        obtenerContador(state) {
            return state.productos.length
        },
        checkLoading(state) {
            return state.loading
        }
    },
    mutations: {
        cargarProductos(state, productos_api) {
            state.productos = productos_api
            state.loading = false
        },
        agregarProducto(state, item) {
            state.productos.push(item)
        },
        borrarProducto(state, index) {
            let itemIndex = state.productos.findIndex((x) => x.id == index);

            if (itemIndex >= 0) {
                state.productos.splice(itemIndex, 1)
            }
        },
        editarProducto(state, producto) {
            let itemIndex = state.productos.findIndex((x) => x.id == producto.id);

            if (itemIndex >= 0) {
                state.productos[itemIndex] = producto
            }
        },
    },
    actions: {
        obtenerProductosAPI: function ({ commit }) {
            return axios.get(URL_PRODUCTOS)
                .then((productos) => {
                    commit('cargarProductos', productos.data)
                    return productos;
                })
                .catch((err) => console.log(err.response.data));
        },
        eliminarProductoAPI: function({ commit }, index) {
            axios.delete(`${URL_PRODUCTOS}/${index}`)
                .then(resp => {

                    if(resp.status == 200) {
                        commit('borrarProducto', index)
                    }
                })
                .catch(err => console.log(err.response.data))
        },
        editarProductoAPI: function({ commit }, producto) {
            return axios
            .put(`${URL_PRODUCTOS}/${producto.id}`, JSON.parse(JSON.stringify(producto)))
            .then(resultado => {

                if(resultado.status == 200) {
                    commit('editarProducto', producto)
                }

                return resultado;
            })
        },
        agregarProductoAPI: function({ commit }, producto) {
            return axios
            .post(URL_PRODUCTOS, JSON.parse(JSON.stringify(producto)))
            .then(resultado => {

                if(resultado.status == 201) {
                    commit('agregarProducto', producto)
                }
                
                return resultado;
            })
        }
    }
}