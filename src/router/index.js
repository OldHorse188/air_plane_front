import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import('../views/Login')
    },
    {
        path: "/index",
        name: "Index",
        component: () => import('../views/Index'),
        children:[
            {
                path:"/index/addaccount",
                name:"AddAccount",
                component:()=>import('../views/account/AddAccount'),
                alias:'/index/updateaccount'
            },
            {
                path:"/index/updateaccount",
                name:"UpdateAccount",
                component:()=>import('../views/account/AddAccount'),
            },
            {
                path:"/index/account",
                name:"Account",
                component:()=>import('../views/account/Account')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
