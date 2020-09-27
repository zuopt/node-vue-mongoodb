import router from './router'

router.beforeEach( async (to,from,next) => {
    document.title = to.meta.title
    //{
    //     next()
    // }else{
    //     next('/login')
    // }
    // console.log(to.meta.title)
    // if(sessionStorage.getItem('token')){
    //     next()
    // }else{
    //     next({ path: '/login' })
    // }
})