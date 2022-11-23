import { createRouter, createWebHashHistory } from 'vue-router'
import Content from '@/views/ContentView'
import Login from '@/views/Login/LoginView'
import SignIn from '@/views/Login/SignInView'
import Reset from '@/views/Login/Reset'
import Home from '@/views/Home/HomeView'
import Store from '@/views/Home/Store'
import Seach from '@/views/Home/SeachView'
import FlashSale from '@/views/Home/FlashSaleView'
import Stroll from '@/views/Stoll/StrollView'
import Post from '@/views/Stoll/PostView'
import Issue from '@/views/Stoll/IssueView'
import Adopt from '@/views/Adopt/AdoptView'
import Form from '@/views/Adopt/Form'
import User from '@/views/User/UserView'
import Alter from '@/views/User/AlterView'
import Order from '@/views/User/OrderView'
import MyLike from '@/views/User/LikerArticleView'
import MyArticle from '@/views/User/MyArticle'
import MyAdopt from '@/views/User/MyAdoptionView'
import Alluser from '@/views/User/Alluser'
import About from '@/views/User/AboutView'
import Cookies from 'js-cookie'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn
  },
  {
    path: '/reSet',
    name: 'reset',
    component: Reset
  },

  {
    path: '/',
    name: 'content',
    component: Content,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: 'stroll',
        name: 'stroll',
        component: Stroll
      },
      {
        path: 'adopt',
        name: 'adopt',
        component: Adopt
      },
      {
        path: 'user',
        name: 'user',
        component: User
      }
    ]
  },
  {
    path: '/store',
    name: 'store',
    component: Store
  },
  {
    path: '/post',
    name: 'post',
    component: Post
  },
  {
    path: '/issue',
    name: 'issue',
    component: Issue
  },
  {
    path: '/form',
    name: 'form',
    component: Form,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/alter',
    name: 'alter',
    component: Alter
  },
  {
    path: '/seach',
    name: 'seach',
    component: Seach
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/myLike',
    name: 'myLike',
    component: MyLike
  },
  {
    path: '/myArticle',
    name: 'myArticle',
    component: MyArticle
  },
  {
    path: '/myAdopt',
    name: 'myAdopt',
    component: MyAdopt
  },
  {
    path: '/flashSale',
    name: 'flashSale',
    component: FlashSale
  },
  {
    path: '/Alluser',
    name: 'Alluser',
    component: Alluser
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  if (to.name !== 'login' && to.name !== 'signIn' && to.name !== 'reset') {
    if (!token) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
