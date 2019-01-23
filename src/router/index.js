import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/headline/addType', component: () => import('@/views/headline/addType'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  { // 商品管理
    path: '/goods',
    component: Layout,
    redirect: '/goods/add_goods',
    name: 'Goods',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'add_goods',
        name: 'Add_goods',
        component: () => import('@/views/goods/add_goods'),
        meta: { title: '添加商品', icon: 'tj' }
      },

      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/goods/goods'),
        meta: { title: '商品', icon: 'sp' }
      },
      {
        path: 'query',
        name: 'Query',
        component: () => import('@/views/goods/query'),
        meta: { title: '查询', icon: 'ck1' }
      },
      {
        path: 'classify',
        name: 'Classify',
        component: () => import('@/views/goods/classify'),
        meta: { title: '分类', icon: 'fl' }
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/goods/edit'),
        meta: { title: '编辑', icon: 'fl' },
        hidden: true
      }

    ]
  },
  { // 头条管理
    path: '/headline',
    component: Layout,
    redirect: '/headline',
    name: 'headline',
    meta: { title: '头条管理', icon: 'tt2' },
    children: [
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/headline/add'),
        meta: { title: '添加头条', icon: 'tj' }
      },
      {
        path: 'headline',
        name: 'headline',
        component: () => import('@/views/headline/index'),
        meta: { title: '头条', icon: 'tt' }
      },
      {
        path: 'type',
        name: 'nested',
        component: () => import('@/views/headline/type'),
        meta: { title: '分类', icon: 'fl' }
      },
      {
        path: 'change',
        name: 'Change',
        component: () => import('@/views/headline/change'),
        hidden: true,
        meta: { title: '分类', icon: 'fl' }
      }
    ]
  },

  { // 加盟审核
    path: '/examine',
    component: Layout,
    redirect: '/examine/index',
    name: 'Examine',
    meta: { title: '加盟管理', icon: 'sh' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/examine/index'),
        meta: { title: '待审核', icon: 'dd' }
      },
      {
        path: 'complete',
        name: 'Complete',
        component: () => import('@/views/examine/complete'),
        meta: { title: '查看', icon: 'wc' }
      },
      {
        path: 'details',
        name: 'Details',
        component: () => import('@/views/examine/details'),
        meta: { title: '详情', icon: 'wc' },
        hidden: true
      }
    ]
  },
  {// 通告管理
    path: '/notice',
    component: Layout,
    meta: { title: '通告管理', icon: 'tggl' },
    children: [
      {
        path: 'index',
        name: '通告',
        component: () => import('@/views/notice/index'),
        meta: { title: '通告', icon: 'tg' }
      },
      {
        path: 'type',
        name: '通告管理',
        component: () => import('@/views/notice/type'),
        meta: { title: '通告活动类型管理', icon: 'fl' }
      },
      {
        path: 'report',
        name: '通告举报管理',
        component: () => import('@/views/notice/report'),
        meta: { title: '通告举报管理', icon: 'jb' }
      },
      {
        path: 'add_report',
        name: '发布通告',
        component: () => import('@/views/notice/add_report'),
        meta: { title: '发布通告', icon: 'fb' }
      }
    ]
  },
  { // 首页推荐
    path: '/home',
    component: Layout,
    meta: { title: '首页推荐', icon: 'sy2' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/home/index'),
        meta: { title: '幻灯片管理', icon: 'lb3' }
      },
      {
        path: 'baby',
        name: '萌娃推荐',
        component: () => import('@/views/home/baby'),
        meta: { title: '萌娃推荐', icon: 'recommend' }
      },
      {
        path: 'Announcement',
        name: '通告推荐',
        component: () => import('@/views/home/Announcement'),
        meta: { title: '通告推荐', icon: 'xlb' }
      },
      {
        path: 'detail',
        name: '萌娃详情',
        component: () => import('@/views/home/detail'),
        meta: { title: '萌娃详情', icon: 'xlb' },
        hidden: true
      }
    ]
  },
  { // 系统消息
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    name: 'Info',
    meta: { title: '系统消息', icon: 'xx' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/info/index'),
        meta: { title: '发送系统消息', icon: 'fsxx' }
      }

    ]
  }
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  
  { // 设置
    path: '/set',
    component: Layout,
    redirect: '/set/index',
    name: 'Set',
    meta: { title: '设置', icon: 'sz', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'site_title',
        name: 'Site_title',
        component: () => import('@/views/set/site_title'),
        meta: { title: '站点标题', icon: 'zd' }
      },
      {
        path: 'vip_price',
        name: 'Vip_price',
        component: () => import('@/views/set/Vip_price'),
        meta: { title: 'vip管理', icon: 'vip' }
      }
    ]
  },
 
  // { path: '*', redirect: '/404', hidden: true }
]
