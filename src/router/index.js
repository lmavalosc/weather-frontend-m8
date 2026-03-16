import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const HomeView = () => import('../views/HomeView.vue')
const DetailView = () => import('../views/DetailView.vue')
const LoginView = () => import('../views/LoginView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
const FavoritosView = () => import('../views/FavoritosView.vue')
const PerfilView = () => import('../views/PerfilView.vue')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // ── Rutas públicas ──────────────────────────────────────────
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/lugar/:id',
            name: 'detail',
            component: DetailView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            // Si ya está autenticado, redirigir al home
            beforeEnter: (to, from, next) => {
                if (store.getters['auth/isAuthenticated']) {
                    next({ name: 'home' })
                } else {
                    next()
                }
            }
        },
        {
            path: '/registro',
            name: 'registro',
            component: RegisterView,
            beforeEnter: (to, from, next) => {
                if (store.getters['auth/isAuthenticated']) {
                    next({ name: 'home' })
                } else {
                    next()
                }
            }
        },

        // ── Rutas privadas (requieren autenticación) ────────────────
        {
            path: '/favoritos',
            name: 'favoritos',
            component: FavoritosView,
            meta: { requiresAuth: true }
        },
        {
            path: '/perfil',
            name: 'perfil',
            component: PerfilView,
            meta: { requiresAuth: true }
        },

        // ── Catch-all ───────────────────────────────────────────────
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
})

// ── Navigation Guard global ──────────────────────────────────────────────────
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated']

    if (to.meta.requiresAuth && !isAuthenticated) {
        // Guardar la ruta a la que quería acceder para redirigir tras el login
        next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
        next()
    }
})

export default router
