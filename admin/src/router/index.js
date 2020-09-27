import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const createRouter = () => new VueRouter({
    // mode:'history',
    scrollBehavior:() => ({ y : 0}),
    routes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
    if(to.path == '/login'){
        next()
    }else if ( !to.meta.isPublic && !sessionStorage.token) {
        return next('/login')
    }else {
        next()
    }
})

export default router