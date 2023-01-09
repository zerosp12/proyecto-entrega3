import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsView from '../views/ProductosView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: ProductsView,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/productos',
    name: 'productos',
    component: ProductsView,
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/carrito/:id',
    name: 'carrito_id',
    component: () => import('../views/CarritoView.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/LogoutView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/RegistroView.vue')
  },
  {
    path: '/producto/:id',
    name: 'producto',
    component: () => import('../views/ProductoView.vue')
  },
  {
    path: '/gestion',
    name: 'gestion',
    component: () => import('../views/gestion/PanelView.vue'),
    children: [
      {
        path: '/gestion/usuarios',
        component: () => import('../views/gestion/UsuariosLista.vue'),
      },
      {
        path: '/gestion/usuarios/editar/:id',
        component: () => import('../views/gestion/UsuariosEditar.vue'),
      },
      {
        path: '/gestion/productos',
        component: () => import('../views/gestion/ProductosLista.vue'),
      },
      {
        path: '/gestion/productos/nuevo',
        component: () => import('../views/gestion/ProductoNuevo.vue'),
      },
      {
        path: '/gestion/productos/editar/:id',
        component: () => import('../views/gestion/ProductoEditar.vue'),
      },
      {
        path: '/gestion/pedidos',
        component: () => import('../views/gestion/PedidosLista.vue'),
      },
      {
        path: '/gestion/pedidos/ver/:id',
        component: () => import('../views/gestion/PedidosVer.vue'),
      }
    ]
  }


]

const router = new VueRouter({
  routes
})

export default router
