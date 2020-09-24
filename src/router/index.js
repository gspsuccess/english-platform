import Vue from 'vue'
import Router from 'vue-router'

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '控制台', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/imitate',
    component: Layout,
    name: 'imitate',
    meta: {
      title: '模拟试卷',
      icon: 'component'
    },
    children: [
      {
        path: 'listen-index-A',
        component: () => import('@/views/imitate/listen-index-A'),
        name: 'listen-index-A',
        meta: { title: '听力PartA' }
      },
      {
        path: 'listen-main-A',
        component: () => import('@/views/imitate/listen-main-A'),
        name: 'listen-main-A',
        meta: { title: '添加听力PartA' },
        hidden: true
      },
      {
        path: 'listen-verify-A',
        component: () => import('@/views/imitate/listen-verify-A'),
        name: 'listen-verify-A',
        meta: { title: '审核听力PartA' },
        hidden: true
      },
      {
        path: 'listen-index-B',
        component: () => import('@/views/imitate/listen-index-B'),
        name: 'listen-index-B',
        meta: { title: '听力PartB' }
      },
      {
        path: 'listen-main-B',
        component: () => import('@/views/imitate/listen-main-B'),
        name: 'listen-main-B',
        meta: { title: '添加听力PartB' },
        hidden: true
      },
      {
        path: 'listen-verify-B',
        component: () => import('@/views/imitate/listen-verify-B'),
        name: 'listen-verify-B',
        meta: { title: '审核听力PartB' },
        hidden: true
      },
      {
        path: 'read-index-A',
        component: () => import('@/views/imitate/read-index-A'),
        name: 'read-index-A',
        meta: { title: '阅读PartA' }
      },
      {
        path: 'read-main-A',
        component: () => import('@/views/imitate/read-main-A'),
        name: 'read-main-A',
        meta: { title: '添加阅读PartA' },
        hidden: true
      },
      {
        path: 'read-verify-A',
        component: () => import('@/views/imitate/read-verify-A'),
        name: 'read-verify-A',
        meta: { title: '审核阅读PartA' },
        hidden: true
      },
      {
        path: 'read-index-B',
        component: () => import('@/views/imitate/read-index-B'),
        name: 'read-index-B',
        meta: { title: '阅读PartB' }
      },
      {
        path: 'read-main-B',
        component: () => import('@/views/imitate/read-main-B'),
        name: 'read-main-B',
        meta: { title: '添加阅读PartB' },
        hidden: true
      },
      {
        path: 'read-verify-B',
        component: () => import('@/views/imitate/read-verify-B'),
        name: 'read-verify-B',
        meta: { title: '审核阅读PartB' },
        hidden: true
      },
      {
        path: 'read-index-C',
        component: () => import('@/views/imitate/read-index-C'),
        name: 'read-index-C',
        meta: { title: '阅读PartC' }
      },
      {
        path: 'read-main-C',
        component: () => import('@/views/imitate/read-main-C'),
        name: 'read-main-C',
        meta: { title: '添加阅读PartC' },
        hidden: true
      },
      {
        path: 'read-verify-C',
        component: () => import('@/views/imitate/read-verify-C'),
        name: 'read-verify-C',
        meta: { title: '审核阅读PartC' },
        hidden: true
      },
      {
        path: 'write-index-A',
        component: () => import('@/views/imitate/write-index-A'),
        name: 'write-index-A',
        meta: { title: '写作PartA' }
      },
      {
        path: 'write-main-A',
        component: () => import('@/views/imitate/write-main-A'),
        name: 'write-main-A',
        meta: { title: '添加写作PartA' },
        hidden: true
      },
      {
        path: 'write-verify-A',
        component: () => import('@/views/imitate/write-verify-A'),
        name: 'write-verify-A',
        meta: { title: '审核写作PartA' },
        hidden: true
      },
      {
        path: 'write-index-B',
        component: () => import('@/views/imitate/write-index-B'),
        name: 'write-index-B',
        meta: { title: '写作PartB' }
      },
      {
        path: 'write-main-B',
        component: () => import('@/views/imitate/write-main-B'),
        name: 'write-main-B',
        meta: { title: '添加写作PartB' },
        hidden: true
      },
      {
        path: 'write-verify-B',
        component: () => import('@/views/imitate/write-verify-B'),
        name: 'write-verify-B',
        meta: { title: '审核写作PartB' },
        hidden: true
      }
    ]
  },
  {
    path: '/exam',
    component: Layout,
    redirect: 'noRedirect',
    name: 'exam',
    children: [
      {
        path: 'index',
        component: () => import('@/views/exam/index'),
        name: 'index',
        meta: { title: '真题试卷', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/word',
    component: Layout,
    redirect: 'noRedirect',
    name: 'word',
    children: [
      {
        path: 'index',
        component: () => import('@/views/word/index'),
        name: 'word-index',
        meta: { title: '单词素材', icon: 'education' }
      }
    ]
  },
  {
    path: '/listen',
    component: Layout,
    redirect: 'noRedirect',
    name: 'listen',
    children: [
      {
        path: 'index',
        component: () => import('@/views/listen/index'),
        name: 'listen-index',
        meta: { title: '听力素材', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'profile',
        meta: { title: '账户设置', icon: 'lock' }
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

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
