const guestMenu = [
  {
    path: '/dashboard-xzz', // 路径
    component: '#',
    redirect: '/dashboard-xzz/Workplace',
    name: 'Dashboard-xzz', // 组件名称
    meta: {
      title: 'router.dashboard', // 菜单名称
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'workplace-xzz',
        component: 'views/Dashboard-xzz/Workplace',
        name: 'Workplace-xzz',
        meta: {
          title: 'router.workplace',
          noCache: true,
          affix: true
        }
      }
    ]
  }]

export default guestMenu
