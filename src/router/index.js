import Vue from "vue"
import VueRouter from "vue-router"
import HomePage from "../pages/HomePage"
import Me from "../pages/Me"
import login from "../pages/login"
import comments from "../pages/comments"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
        path: "/homepage",
        component: HomePage
    },
    {
        path: "/me",
        component: Me
    },
    {
        path:"/login",
        component:login
    },    {
        path:"/comments",
        component:comments
    }
]
})