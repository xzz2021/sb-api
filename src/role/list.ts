const adminList = [
  // {
  //   path: '/dashboard-xzz', // 路径
  //   component: '#',
  //   redirect: '/dashboard-xzz/Workplace',
  //   name: 'Dashboard-xzz', // 组件名称
  //   meta: {
  //     title: 'router.dashboard', // 菜单名称
  //     icon: 'ant-design:dashboard-filled',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'workplace-xzz',
  //       component: 'views/Dashboard-xzz/Workplace',
  //       name: 'Workplace-xzz',
  //       meta: {
  //         title: 'router.workplace',
  //         noCache: true,
  //         affix: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/authorization-xzz',
  //   component: '#',
  //   redirect: '/authorization-xzz/user',
  //   name: 'Authorization-xzz',
  //   meta: {
  //     title: 'router.authorization',
  //     icon: 'eos-icons:role-binding',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'department-xzz',
  //       component: 'views/Authorization-xzz/Department/Department',
  //       name: 'Department-xzz',
  //       meta: {
  //         title: 'router.department'
  //       }
  //     },
  //     {
  //       path: 'user-xzz',
  //       component: 'views/Authorization-xzz/User/User',
  //       name: 'User-xzz',
  //       meta: {
  //         title: 'router.user'
  //       }
  //     },
  //     {
  //       path: 'menu-xzz',
  //       component: 'views/Authorization-xzz/Menu/Menu',
  //       name: 'Menu-xzz',
  //       meta: {
  //         title: 'router.menuManagement'
  //       }
  //     },
  //     {
  //       path: 'role-xzz',
  //       component: 'views/Authorization-xzz/Role/Role',
  //       name: 'Role-xzz',
  //       meta: {
  //         title: 'router.role'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/datascan-xzz',
    component: '#',
    redirect: '/datascan/tableone-xzz',
    name: 'Datascan-xzz',
    meta: {
      title: '数据面板',
      icon: 'eos-icons:role-binding',
      alwaysShow: true
    },
    children: [
      {
        path: 'tableone-xzz',
        component: 'views/Datascan-xzz/Tableone/Tableone',
        name: 'Tableone-xzz',
        meta: {
          title: '表格一'
        }
      }
    ]
  },
  {
    path: '/dashboard',
    component: '#',
    redirect: '/dashboard/Workplace',
    name: 'Dashboard',
    meta: {
      title: 'router.dashboard',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'analysis',
        component: 'views/Dashboard/Analysis',
        name: 'Analysis',
        meta: {
          title: 'router.analysis',
          noCache: true,
          affix: true
        }
      },
      {
        path: 'workplace',
        component: 'views/Dashboard/Workplace',
        name: 'Workplace',
        meta: {
          title: 'router.workplace',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/external-link',
    component: '#',
    meta: {},
    name: 'ExternalLink',
    children: [
      {
        path: 'https://element-plus-admin-doc.cn/',
        name: 'DocumentLink',
        meta: {
          title: 'router.document',
          icon: 'clarity:document-solid'
        }
      }
    ]
  },
  {
    path: '/guide',
    component: '#',
    name: 'Guide',
    meta: {},
    children: [
      {
        path: 'index',
        component: 'views/Guide/Guide',
        name: 'GuideDemo',
        meta: {
          title: 'router.guide',
          icon: 'cib:telegram-plane'
        }
      }
    ]
  },
  {
    path: '/components',
    component: '#',
    redirect: '/components/form/default-form',
    name: 'ComponentsDemo',
    meta: {
      title: 'router.component',
      icon: 'bx:bxs-component',
      alwaysShow: true
    },
    children: [
      {
        path: 'form',
        component: '##',
        name: 'Form',
        meta: {
          title: 'router.form',
          alwaysShow: true
        },
        children: [
          {
            path: 'default-form',
            component: 'views/Components/Form/DefaultForm',
            name: 'DefaultForm',
            meta: {
              title: 'router.defaultForm'
            }
          },
          {
            path: 'use-form',
            component: 'views/Components/Form/UseFormDemo',
            name: 'UseForm',
            meta: {
              title: 'UseForm'
            }
          }
        ]
      },
      {
        path: 'table',
        component: '##',
        redirect: '/components/table/default-table',
        name: 'TableDemo',
        meta: {
          title: 'router.table',
          alwaysShow: true
        },
        children: [
          {
            path: 'default-table',
            component: 'views/Components/Table/DefaultTable',
            name: 'DefaultTable',
            meta: {
              title: 'router.defaultTable'
            }
          },
          {
            path: 'use-table',
            component: 'views/Components/Table/UseTableDemo',
            name: 'UseTable',
            meta: {
              title: 'UseTable'
            }
          },
          {
            path: 'tree-table',
            component: 'views/Components/Table/TreeTable',
            name: 'TreeTable',
            meta: {
              title: 'TreeTable'
            }
          },
          {
            path: 'table-image-preview',
            component: 'views/Components/Table/TableImagePreview',
            name: 'TableImagePreview',
            meta: {
              title: 'router.PicturePreview'
            }
          },
          {
            path: 'table-video-preview',
            component: 'views/Components/Table/TableVideoPreview',
            name: 'TableVideoPreview',
            meta: {
              title: 'router.tableVideoPreview'
            }
          }
          // {
          //   path: 'ref-table',
          //   component: 'views/Components/Table/RefTable',
          //   name: 'RefTable',
          //   meta: {
          //     title: 'RefTable'
          //   }
          // }
        ]
      },
      {
        path: 'editor-demo',
        component: '##',
        redirect: '/components/editor-demo/editor',
        name: 'EditorDemo',
        meta: {
          title: 'router.editor',
          alwaysShow: true
        },
        children: [
          {
            path: 'editor',
            component: 'views/Components/Editor/Editor',
            name: 'Editor',
            meta: {
              title: 'router.richText'
            }
          },
          {
            path: 'json-editor',
            component: 'views/Components/Editor/JsonEditor',
            name: 'JsonEditor',
            meta: {
              title: 'router.jsonEditor'
            }
          }
        ]
      },
      {
        path: 'search',
        component: 'views/Components/Search',
        name: 'Search',
        meta: {
          title: 'router.search'
        }
      },
      {
        path: 'descriptions',
        component: 'views/Components/Descriptions',
        name: 'Descriptions',
        meta: {
          title: 'router.descriptions'
        }
      },
      {
        path: 'image-viewer',
        component: 'views/Components/ImageViewer',
        name: 'ImageViewer',
        meta: {
          title: 'router.imageViewer'
        }
      },
      {
        path: 'dialog',
        component: 'views/Components/Dialog',
        name: 'Dialog',
        meta: {
          title: 'router.dialog'
        }
      },
      {
        path: 'icon',
        component: 'views/Components/Icon',
        name: 'Icon',
        meta: {
          title: 'router.icon'
        }
      },
      {
        path: 'icon-picker',
        component: 'views/Components/IconPicker',
        name: 'IconPicker',
        meta: {
          title: 'router.iconPicker'
        }
      },
      {
        path: 'echart',
        component: 'views/Components/Echart',
        name: 'Echart',
        meta: {
          title: 'router.echart'
        }
      },
      {
        path: 'count-to',
        component: 'views/Components/CountTo',
        name: 'CountTo',
        meta: {
          title: 'router.countTo'
        }
      },
      {
        path: 'qrcode',
        component: 'views/Components/Qrcode',
        name: 'Qrcode',
        meta: {
          title: 'router.qrcode'
        }
      },
      {
        path: 'highlight',
        component: 'views/Components/Highlight',
        name: 'Highlight',
        meta: {
          title: 'router.highlight'
        }
      },
      {
        path: 'infotip',
        component: 'views/Components/Infotip',
        name: 'Infotip',
        meta: {
          title: 'router.infotip'
        }
      },
      {
        path: 'input-password',
        component: 'views/Components/InputPassword',
        name: 'InputPassword',
        meta: {
          title: 'router.inputPassword'
        }
      },
      {
        path: 'waterfall',
        component: 'views/Components/Waterfall',
        name: 'Waterfall',
        meta: {
          title: 'router.waterfall'
        }
      },
      {
        path: 'image-cropping',
        component: 'views/Components/ImageCropping',
        name: 'ImageCropping',
        meta: {
          title: 'router.imageCropping'
        }
      },
      {
        path: 'video-player',
        component: 'views/Components/VideoPlayer',
        name: 'VideoPlayer',
        meta: {
          title: 'router.videoPlayer'
        }
      }
    ]
  },
  {
    path: '/function',
    component: '#',
    redirect: '/function/multipleTabs',
    name: 'Function',
    meta: {
      title: 'router.function',
      icon: 'ri:function-fill',
      alwaysShow: true
    },
    children: [
      {
        path: 'multipleTabs',
        component: 'views/Function/MultipleTabs',
        name: 'MultipleTabs',
        meta: {
          title: 'router.multipleTabs'
        }
      },
      {
        path: 'multipleTabs-demo/:id',
        component: 'views/Function/MultipleTabsDemo',
        name: 'MultipleTabsDemo',
        meta: {
          hidden: true,
          title: 'router.details',
          canTo: true
        }
      },
      {
        path: 'request',
        component: 'views/Function/Request',
        name: 'Request',
        meta: {
          title: 'router.request'
        }
      },
      {
        path: 'test',
        component: 'views/Function/Test',
        name: 'Test',
        meta: {
          title: 'router.permission',
          permission: ['add', 'edit', 'delete']
        }
      }
    ]
  },
  {
    path: '/hooks',
    component: '#',
    redirect: '/hooks/useWatermark',
    name: 'Hooks',
    meta: {
      title: 'hooks',
      icon: 'ic:outline-webhook',
      alwaysShow: true
    },
    children: [
      {
        path: 'useWatermark',
        component: 'views/hooks/useWatermark',
        name: 'UseWatermark',
        meta: {
          title: 'useWatermark'
        }
      },
      {
        path: 'useTagsView',
        component: 'views/hooks/useTagsView',
        name: 'UseTagsView',
        meta: {
          title: 'useTagsView'
        }
      },
      {
        path: 'useValidator',
        component: 'views/hooks/useValidator',
        name: 'UseValidator',
        meta: {
          title: 'useValidator'
        }
      },
      {
        path: 'useCrudSchemas',
        component: 'views/hooks/useCrudSchemas',
        name: 'UseCrudSchemas',
        meta: {
          title: 'useCrudSchemas'
        }
      },
      {
        path: 'useClipboard',
        component: 'views/hooks/useClipboard',
        name: 'UseClipboard',
        meta: {
          title: 'useClipboard'
        }
      },
      {
        path: 'useNetwork',
        component: 'views/hooks/useNetwork',
        name: 'UseNetwork',
        meta: {
          title: 'useNetwork'
        }
      }
    ]
  },
  {
    path: '/level',
    component: '#',
    redirect: '/level/menu1/menu1-1/menu1-1-1',
    name: 'Level',
    meta: {
      title: 'router.level',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: '##',
        redirect: '/level/menu1/menu1-1/menu1-1-1',
        meta: {
          title: 'router.menu1'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu11',
            component: '##',
            redirect: '/level/menu1/menu1-1/menu1-1-1',
            meta: {
              title: 'router.menu11',
              alwaysShow: true
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu111',
                component: 'views/Level/Menu111',
                meta: {
                  title: 'router.menu111'
                }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'Menu12',
            component: 'views/Level/Menu12',
            meta: {
              title: 'router.menu12'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2Demo',
        component: 'views/Level/Menu2',
        meta: {
          title: 'router.menu2'
        }
      }
    ]
  },
  {
    path: '/example',
    component: '#',
    redirect: '/example/example-dialog',
    name: 'Example',
    meta: {
      title: 'router.example',
      icon: 'ep:management',
      alwaysShow: true
    },
    children: [
      {
        path: 'example-dialog',
        component: 'views/Example/Dialog/ExampleDialog',
        name: 'ExampleDialog',
        meta: {
          title: 'router.exampleDialog'
        }
      },
      {
        path: 'example-page',
        component: 'views/Example/Page/ExamplePage',
        name: 'ExamplePage',
        meta: {
          title: 'router.examplePage'
        }
      },
      {
        path: 'example-add',
        component: 'views/Example/Page/ExampleAdd',
        name: 'ExampleAdd',
        meta: {
          title: 'router.exampleAdd',
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/example/example-page'
        }
      },
      {
        path: 'example-edit',
        component: 'views/Example/Page/ExampleEdit',
        name: 'ExampleEdit',
        meta: {
          title: 'router.exampleEdit',
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/example/example-page'
        }
      },
      {
        path: 'example-detail',
        component: 'views/Example/Page/ExampleDetail',
        name: 'ExampleDetail',
        meta: {
          title: 'router.exampleDetail',
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/example/example-page'
        }
      }
    ]
  },
  {
    path: '/error',
    component: '#',
    redirect: '/error/404',
    name: 'Error',
    meta: {
      title: 'router.errorPage',
      icon: 'ci:error',
      alwaysShow: true
    },
    children: [
      {
        path: '404-demo',
        component: 'views/Error/404',
        name: '404Demo',
        meta: {
          title: '404'
        }
      },
      {
        path: '403-demo',
        component: 'views/Error/403',
        name: '403Demo',
        meta: {
          title: '403'
        }
      },
      {
        path: '500-demo',
        component: 'views/Error/500',
        name: '500Demo',
        meta: {
          title: '500'
        }
      }
    ]
  }
  // {
  //   path: '/authorization',
  //   component: '#',
  //   redirect: '/authorization/user',
  //   name: 'Authorization',
  //   meta: {
  //     title: 'router.authorization',
  //     icon: 'eos-icons:role-binding',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'department',
  //       component: 'views/Authorization/Department/Department',
  //       name: 'Department',
  //       meta: {
  //         title: 'router.department'
  //       }
  //     },
  //     {
  //       path: 'user',
  //       component: 'views/Authorization/User/User',
  //       name: 'User',
  //       meta: {
  //         title: 'router.user'
  //       }
  //     },
  //     {
  //       path: 'menu',
  //       component: 'views/Authorization/Menu/Menu',
  //       name: 'Menu',
  //       meta: {
  //         title: 'router.menuManagement'
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: 'views/Authorization/Role/Role',
  //       name: 'Role',
  //       meta: {
  //         title: 'router.role'
  //       }
  //     }
  //   ]
  // }
]

export default adminList
