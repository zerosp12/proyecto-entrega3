export const MixinCarrito = {
    data() {
        return {
            carrito: []
        };
    },
    created() {
        //localStorage.removeItem("carritoUser")
        this.montarStorage()
    },
    methods: {
        montarStorage() {
            
            if (localStorage.carritoUser == undefined) {
                localStorage.setItem("carritoUser", JSON.stringify([]));
            }

            this.carrito = JSON.parse(localStorage.carritoUser)
            localStorage.carritoCount = this.carrito.length
        },
        guardarStorage() {
            localStorage.carritoCount = this.carrito.length
            localStorage.setItem("carritoUser", JSON.stringify(this.carrito));
        },
        obtenerStorage() {
            return JSON.parse(localStorage.carritoUser);
        },
        insertarItem(item) {

            this.montarStorage()

            let itemIndex = this.carrito.findIndex(x => x.id_producto == item.id_producto)

            if (itemIndex >= 0) {
                this.carrito[itemIndex].cantidad++
            } else {
                this.carrito.push(item)
            }

            this.guardarStorage()
        },
        sumarProducto(index) {

            this.montarStorage()

            let itemIndex = this.cartList.findIndex((x) => x.id_producto == index);

            console.log(itemIndex)
            if (itemIndex >= 0) {
                this.carrito[itemIndex].cantidad++
            }

            this.guardarStorage()
        },
        restarProducto(index) {

            this.montarStorage()

            let itemIndex = this.cartList.findIndex((x) => x.id_producto == index);

            if (itemIndex >= 0) {
                if (this.carrito[itemIndex].cantidad <= 1) {
                    this.carrito.splice(index, 1)
                } else {
                    this.carrito[itemIndex].cantidad--
                }
            }

            this.guardarStorage()
        },
        borrarProducto(index) {
            this.montarStorage()

            let itemIndex = this.cartList.findIndex((x) => x.id_producto == index);

            if (itemIndex >= 0) {
                this.carrito.splice(itemIndex, 1)
            }

            this.guardarStorage()
        },
        limpiarCarrito() {
            this.montarStorage()
            this.carrito = []
            this.guardarStorage()
        }
    }
}