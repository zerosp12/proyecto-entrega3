import axios from 'axios'

const URL_USUARIOS = 'https://639a60473a5fbccb5265ab59.mockapi.io/usuarios/'

export default {
    namespaced: true,

    state: {
        usuario: [], 
        loading: true,
    },
    getters: {
        obtenerUsuarios(state) {
            return state.usuario
        },
        obtenerContador(state) {
            return state.usuario.length
        },
        checkLoading(state) {
            return state.loading
        }
    },
    mutations: {
        cargarUsuarios(state, usuario_api) {
            state.usuario = usuario_api
            state.loading = false
        },
        agregarUsuario(state, item) {
            state.usuario.push(item)
        },
        borrarUsuario(state, index) {
            let itemIndex = state.usuario.findIndex((x) => x.id == index);

            if (itemIndex >= 0) {
                state.usuario.splice(itemIndex, 1)
            }
        },
        editarUsuario(state, producto) {
            let itemIndex = state.usuario.findIndex((x) => x.id == producto.id);

            if (itemIndex >= 0) {
                state.usuario[itemIndex] = producto
            }
        },
    },
    actions: {
        obtenerUsuariosAPI: function ({ commit }) {
            return axios.get(URL_USUARIOS)
                .then((usuario) => {
                    commit('cargarUsuarios', usuario.data)
                    return usuario;
                })
                .catch((err) => console.log(err.response.data));
        },
        eliminarUsuarioAPI: function({ commit }, index) {
            axios.delete(`${URL_USUARIOS}/${index}`)
                .then(resp => {

                    if(resp.status == 200) {
                        commit('borrarUsuario', index)
                    }
                })
                .catch(err => console.log(err.response.data))
        },
        editarUsuarioAPI: function({ commit }, producto) {
            return axios
            .put(`${URL_USUARIOS}/${producto.id}`, JSON.parse(JSON.stringify(producto)))
            .then(resultado => {

                if(resultado.status == 200) {
                    commit('editarUsuario', producto)
                }

                return resultado;
            })
        },
        agregarUsuarioAPI: function({ commit }, producto) {
            return axios
            .post(URL_USUARIOS, JSON.parse(JSON.stringify(producto)))
            .then(resultado => {

                if(resultado.status == 201) {
                    commit('agregarUsuario', producto)
                }
                
                return resultado;
            })
        }
    }
}