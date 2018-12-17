import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import User from '@/views/user/User'
import Categories1 from '@/views/category/categories.vue'
import Categories2 from '@/views/category/categories2'
import Product from '@/views/product/Product.vue'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'user',
          name: 'User',
          component: User
        },
        {
          path: 'categories1',
          name: 'Categories1',
          component: Categories1
        },
        {
          path: 'categories2',
          name: 'Categories2',
          component: Categories2
        },
        {
          path: 'product',
          name: 'Product',
          component: Product
        }
      ]
    }
  ]
})
