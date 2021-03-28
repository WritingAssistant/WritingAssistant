import Vue from "vue"
import VueRouter from "vue-router"
import HomePage from "../pages/HomePage"
// import Me from "../pages/Me"
import login from "../pages/login"
import comments from "../pages/comments"

import rank from "../pages/rank"
import rank1 from "../pages/rank1"
import rank2 from "../pages/rank2"


import App from '../pages/views/App.vue'
import Themes from '../pages/views/Themes.vue'
import Reply from '../pages/views/Reply.vue'
import Comments from '../pages/views/Comments.vue'
import Collection from '../pages/views/Collection.vue'

Vue.use(VueRouter)


    const routes= [{
        path: "/homepage",
        component: HomePage,
        meta: { //允许自定义对象
            showNavigation: true
        }
    },
    {
        path: "/me",
        component: App,
        meta: {
            showNavigation: true
        },
        children:[
            {
                path: '/me',
                component: Themes,
            },
            {
                path: '/me/Themes',
                component: Themes,
            },
            {
                path: '/me/Reply',
                component: Reply,
            },
            {
                path: '/me/Comments',
                component: Comments,
            },
            {
                path: '/me/Collection',
                component: Collection,
            },
        ]
    },
    {
        path:"/",
        component:login
    },
    {
        path:"/comments",
        component:comments,
        meta: {
            showNavigation: true
        }
    },
    {
        path:"/rank",
        component:rank,
        meta: {
            showNavigation: true
        }
    },
        
    {path:"/rank1",
        component:rank1,
        meta: {
            showNavigation: true
        }
    },
       { 
           path:"/rank2",
        component:rank2,
        meta: {
            showNavigation: true
        },
    }
    
]

const router = new VueRouter({
   mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  



export default router