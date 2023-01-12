import axios from 'axios'

const URL_USUARIOS = 'https://639a60473a5fbccb5265ab59.mockapi.io/usuarios/'

export default {
    namespaced: true,

    state: {
        usuario: [], 
        login: {
            islogin: false,
            id: 0,
            direccion: '',
            nombre: '',
            avatar: '',
            privilegios: 0,
        },
        loading: true,
    },
    getters: {
        obtenerUsuarios(state) {
            return state.usuario
        },
        obtenerCantidadUsuarios(state) {
            return state.usuario.length
        },
        checkLoading(state) {
            return state.loading
        },
        checkLogin(state) {
            return state.login.islogin
        },
        obtenerId: (state) => state.login.id,
        obtenerDireccion: (state) => state.login.direccion,
        obtenerAvatar: (state) => state.login.avatar,
        obtenerPrivilegios: (state) => state.login.privilegios,
        obtenerNombre: (state) => state.login.nombre,
        obtenerLogin(state) {
            return state.login
        }
    },
    mutations: {
        setearValoresLogin(state) {
            const getStorageLogin = Boolean(localStorage.getItem('isLogin'))

            if(getStorageLogin == true) {
                state.login.islogin = getStorageLogin
                state.login.privilegios =  Number(localStorage.getItem('userPrivileges'))
                state.login.id = localStorage.getItem('clientID')
                state.login.direccion = localStorage.getItem('clientAddress')
                state.login.nombre = localStorage.getItem('clientName')
                state.login.avatar = localStorage.getItem('avatarPath')
            } else {
                state.login.islogin = false
            }
        },
        setLogin(state, info)
        {
            //Guardamos los valores en el storage para poder refrescar y que no cierre la sesion
            localStorage.setItem('isLogin', Boolean(true))
            localStorage.setItem('userPrivileges', Number(info.privilegios))
            localStorage.setItem('clientID', info.id)
            localStorage.setItem('clientAddress', info.direccion)
            localStorage.setItem('clientName', info.nombre)
            localStorage.setItem('avatarPath', info.avatar)

            state.login.islogin = true
            state.login.privilegios = info.privilegios
            state.login.id = info.id
            state.login.direccion = info.direccion
            state.login.nombre = info.nombre
            state.login.avatar = info.avatar
        },
        setLogout(state)
        {
            //Limpiamos los valores y el storage
            state.login.islogin = false
            state.login.privilegios =  0
            state.login.id = 0
            state.login.direccion = ''
            state.login.nombre = ''
            state.login.avatar = ''

            //No usamos clear() para no limpiar el carrito
            localStorage.removeItem('isLogin')
            localStorage.removeItem('userPrivileges')
            localStorage.removeItem('clientID')
            localStorage.removeItem('clientAddress')
            localStorage.removeItem('clientName')
            localStorage.removeItem('avatarPath')
        },
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