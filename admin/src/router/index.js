import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

Vue.use(Router)

const createRouter = () => new VueRouter({
    // mode:'history',
    scrollBehavior:() => ({ y : 0}),
    routes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
    NProgress.start()
    document.title = to.meta.title
    if(to.path == '/login'){
        next()
    }else if ( !to.meta.isPublic && !sessionStorage.token) {
        return next('/login')
    }else {
        next()
    }
})
router.afterEach(()=>{
    NProgress.done()
})

export default router