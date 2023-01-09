import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/productos',
    name: 'productos',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductosView.vue')
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
  },
  {
    path: '/carrito/:id',
    name: 'carrito_id',
    component: () => import(/* webpackChunkName: "about" */ '../views/CarritoView.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogoutView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegistroView.vue')
  },
  {
    path: '/producto/:id',
    name: 'producto',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductoView.vue')
  },
  {
    path: '/gestion',
    name: 'gestion',
    component: () => import(/* webpackChunkName: "about" */ '../views/PanelView.vue'),
    children: [
      {
        path: '/gestion/usuarios',
        component: () => import(/* webpackChunkName: "about" */ '../views/gestion/UsuariosLista.vue'),
      },
      {
        path: '/gestion/usuarios/editar/:id',
        component: () => import(/* webpackChunkName: "about" */ '../views/gestion/UsuariosEditar.vue'),
      },
      {
        path: '/gestion/productos',
        component: () => import(/* webpackChunkName: "about" */ '../views/gestion/ProductosLista.vue'),
      },
      {
        path: '/gestion/productos/nuevo',
        component: () => import(/* webpackChunkName: "about" */ '../views/gestion/ProductoNuevo.vue'),
      },
      {
        path: '/gestion/productos/editar/:id',
        component: () => import(/* webpackChunkName: "about" */ '../views/gestion/ProductoEditar.vue'),
      }
    ]
  }


]

const router = new VueRouter({
  routes
})

export default router
