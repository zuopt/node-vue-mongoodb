import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const createRouter = () => new VueRouter({
    mode:'history',
    scrollBehavior:() => ({ y : 0}),
    routes
})

const router = createRouter()

export default router