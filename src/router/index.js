import Vue from "vue"
import VueRouter from "vue-router"
import HomePage from "../pages/HomePage"
import Me from "../pages/Me"
import login from "../pages/login"
import comments from "../pages/comments"
import rank from "../pages/rank"


Vue.use(VueRouter)


    const routes= [{
        path: "/homepage",
        component: HomePage
    },
    {
        path: "/me",
        component: Me
    },
    {
        path:"/",
        component:login
    },    {
        path:"/comments",
        component:comments
    },
    {
        path:"/rank",
        component:rank
    }
    ]
const router = new VueRouter({
   mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  



export default router