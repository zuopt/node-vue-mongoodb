import ListArticle from '@/views/ListArticle'
import CreateArticle from '@/views/CreateArticle'
import EditArticle from '@/views/EditArticle'
import Login from '@/views/Login'
import Layout from '@/layout/index'

export default [
    {
        path: '/',
        name: 'home',
        component: Layout,
        redirect: '/articles/index',
        meta:{title:'首页'},
        children: [
            {
                path: '/articles/create',
                name: 'create-article',
                component: CreateArticle,
                meta:{title:'新建文章'},

            },
            {
                path: '/articles/:id/edit',
                name: 'edit-article',
                component: EditArticle,
                meta:{title:'编辑文章'},
            },
            {
                path: '/articles/index',
                name: 'list-article',
                component: ListArticle,
                meta:{title:'文章列表'},
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta:{title:'登录'},
    },

]