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

  {   //商品管理
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '添加商品', icon: 'tj' }
      },
      
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '商品', icon: 'sp' }
      },
      {
        path: 'query',
        name: 'Query',
        component: () => import('@/views/query/index'),
        meta: { title: '查询', icon: 'ck1' }
      },
      {
        path: 'classify',
        name: 'Classify',
        component: () => import('@/views/classify/index'),
        meta: { title: '分类', icon: 'fl' }
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/tree/edit'),
        meta: { title: '编辑', icon: 'fl' },
        hidden: true
      }
      
    ]
  },
  
  
   { //审核  
    path: '/form',
    component: Layout,
    redirect: '/form/index',
    name: 'Form',
    meta: { title: '加盟管理', icon: 'sh' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '待审核', icon: 'dd' },
      },
      {
        path: 'complete',
        name: 'Complete',
        component: () => import('@/views/form/complete'),
        meta: { title: '查看', icon: 'wc' },
      },
      {
        path: 'details',
        name: 'Details',
        component: () => import('@/views/form/details'),
        meta: { title: '详情', icon: 'wc' },
        hidden: true
      }
    ]
  },
  {   //系统消息
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
      },
      
      
    ]
  },
  { //设置
    path: '/set',
    component: Layout,
    redirect: '/set/index',
    name: 'Set',
    meta: { title: '设置', icon: 'sz' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/set/index'),
        meta: { title: '幻灯片管理', icon: 'lb3' },
      },
     
    ]
  },
  { //用户管理 
    path: '/user',
    component: Layout,
    redirect: '/user/children',
    name: 'User',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'children',
        name: 'Children',
        component: () => import('@/views/user/children'),
        meta: { title: '童星萌娃管理', icon: 'user' },
      },
      {
        path: 'cash',
        name: 'Cash',
        component: () => import('@/views/user/cash'),
        meta: { title: '提现管理', icon: 'tx' },
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/user/feedback'),
        meta: { title: '反馈管理', icon: 'fk' },
      },
      {
        path: 'children_details',
        name: 'Children_details',
        component: () => import('@/views/user/children_details'),
        meta: { title: '儿童详情', icon: 'fk' },
        hidden: true
      }
     
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
