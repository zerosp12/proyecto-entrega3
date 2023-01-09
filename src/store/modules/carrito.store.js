import axios from 'axios'

export default {
    namespaced: true,

    state: {
        carrito: []
    },
    getters: {
        obtenerCarrito(state) {
            return state.carrito
        },
        obtenerContador(state) {
            return state.carrito.length
        },
        obtenerPrecioTotal(state) {
            let precio = 0;

            state.carrito.forEach(function (a) {
              precio += Number(a.precio * a.cantidad);
            });
      
            return precio;
        }
    },
    mutations: {
        cargarCarrito(state) {
            if (localStorage.carrito == undefined) {
                localStorage.setItem("carrito", JSON.stringify([]));
            }
            
            state.carrito = JSON.parse(localStorage.carrito)
        },
        insertarProducto(state, item) {
            let itemIndex = state.carrito.findIndex(x => x.id_producto == item.id_producto)

            if (itemIndex >= 0) {
                state.carrito[itemIndex].cantidad++
            } else {
                state.carrito.push(item)
            }  
            
            localStorage.setItem("carrito", JSON.stringify(state.carrito));
        },
        sumarProducto(state, index) {
            let itemIndex = state.carrito.findIndex((x) => x.id_producto == index);

            if (itemIndex >= 0) {
                state.carrito[itemIndex].cantidad++
            }
            
            localStorage.setItem("carrito", JSON.stringify(state.carrito));
        },
        restarProducto(state, index) {
            let itemIndex = state.carrito.findIndex((x) => x.id_producto == index);

            if (itemIndex >= 0) {
                if (state.carrito[itemIndex].cantidad <= 1) {
                    state.carrito.splice(index, 1)
                } else {
                    state.carrito[itemIndex].cantidad--
                }
            }

            localStorage.setItem("carrito", JSON.stringify(state.carrito));
        },
        borrarProducto(state, index) {
            let itemIndex = state.carrito.findIndex((x) => x.id_producto == index);

            if (itemIndex >= 0) {
                state.carrito.splice(itemIndex, 1)
            }
            
            localStorage.setItem("carrito", JSON.stringify(state.carrito));
        },
        limpiarCarrito(state) {
            state.carrito = []
            
            localStorage.setItem("carrito", JSON.stringify(state.carrito));
        }
    },
    actions: {
        terminarPedido: function(state, carrito) {
            return axios
            .post('https://639a60473a5fbccb5265ab59.mockapi.io/carrito', JSON.parse(JSON.stringify(carrito)))
        }
    }
}