import Vue from 'vue'
import Router from 'vue-router'
//左边侧边栏
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/sign',
    component: () => import('@/views/sign/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '胶SDN', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '博客', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '搜索博客', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '我的博客', icon: 'tree' }
      },
      {
        path: 'show',
        name: 'Show',
        component: () => import('@/views/show/index'),
        meta: { title: '浏览博客', icon: 'table' }
      },
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '发布博客', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '个人中心',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1'), // Parent router-view
        name: 'Menu1',
        meta: { title: '个人信息' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index'),
            name: 'Menu1-1',
            meta: { title: '隐私设置' }
          },
          // {
          //   path: 'menu1-2',
          //   component: () => import('@/views/nested/menu1/menu1-2'),
          //   name: 'Menu1-2',
          //   meta: { title: '消息' },
          //   children: [
          //     // {
          //     //   path: 'menu1-2-1',
          //     //   component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
          //     //   name: 'Menu1-2-1',
          //     //   meta: { title: '赞' }
          //     // },
          //     // {
          //     //   path: 'menu1-2-2',
          //     //   component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
          //     //   name: 'Menu1-2-2',
          //     //   meta: { title: '私信' }
          //     // }
          //   ]
          // },
        ]
      },

      {
        path: 'menu1-3',
        component: () => import('@/views/nested/menu1/menu1-3/index'),
        name: 'Menu1-3',
        meta: { title: '收藏' }
      },

      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: '修改密码' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/role',
    name: 'Example',
    meta: { title: '管理员权限', icon: 'el-icon-s-help' },
    children: [{
      path: 'role',
      name: 'Role',
      component: () => import('@/views/role/index'),
      meta: { title: '删除用户文章', icon: 'dashboard' }
    },
    {
      path: 'role1',
      name: 'Role1',
      component: () => import('@/views/role1/index'),
      meta: { title: '删除用户', icon: 'dashboard' }
    }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router