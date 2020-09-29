import ListArticle from '@/views/Article/ListArticle'
import CreateArticle from '@/views/Article/CreateArticle'
import EditArticle from '@/views/Article/EditArticle'

import EmployeeAdd from '@/views/Employee/EmployeeAdd'
import EmployeeList from '@/views/Employee/EmployeeList'
import EmployeeEdit from '@/views/Employee/EmployeeEdit'

import UserList from '@/views/User/UserList'

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
                name: 'article-list',
                component: ListArticle,
                meta:{title:'文章列表'},
            },
            {
                path:'/employee/list',
                name:'employee-list',
                component:EmployeeList,
                meta:{title:'员工列表'}
            },
            {
                path: '/employee/add',
                name: 'employee-add',
                component: EmployeeAdd,
                meta: { title: '新增员工' }
            },
            {
                path: '/employee/:id/edit',
                name: 'employee-edit',
                component: EmployeeEdit,
                meta: { title: '编辑员工' }
            }, 
            {
                path: '/user/list',
                name: 'user-list',
                component: UserList,
                meta: { title: '管理员列表' }
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: { isPublic:true},
        component: Login,
        meta:{title:'登录'},
    },

]