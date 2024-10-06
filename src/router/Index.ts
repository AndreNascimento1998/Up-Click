import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth"

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/Index.vue')
    },
    {
        path: '/recover-password',
        name: 'PasswordRecover',
        component: () => import('@/views/Login/PasswordRecover.vue'),
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home/Index.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    const user = await checkAuth()

    if (requiresAuth && !user) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

const checkAuth = () => {
    const auth = getAuth()
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user)
        })
    })
}


export default router
