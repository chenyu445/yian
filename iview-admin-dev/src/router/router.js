import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login', // 必填
    name: 'login', // 必填,页面都以name值来加载
    meta: {
        title: 'Login - 登录' // 非必填，若不填默认显示iview-admin
    },
    component: () =>
        import ('@/views/login.vue') // 必填，用来加载该路由规则对应的视图，resolve用来控制异步加载
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/views/error-page/500.vue')
};



export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import ('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
// 第二种类型：该页面在Main组件的子页面区域展示，但不在左侧菜单栏显示，代表性的有首页、消息中心等
export const otherRouter = {
    path: '/', // 必填
    name: 'otherRouter', // 必填，在面包屑处理中需要用到，值固定为otherRouter（或者可以在./src/libs/util.js中修改）
    redirect: '/home', // 选填，这里如果不填在浏览器地址栏输入域名后自动跳转到首页
    component: Main, // 必填，主组件，用于加载侧边栏和右侧面包屑、标签栏、工具条、子页面路由视图等
    children: [ // 在Main右侧视图显示的页面都要作为otherRouter的children来添加
        {
            path: 'home',
            title: '首页',
            name: 'home_index',
            component: () =>
                import ('@/views/home/home.vue')
        },
        {
            path: 'department_edit',
            title: '部门编辑',
            name: 'department_edit',
            component: () =>
                import ('@/views/deptment-management/deptment_edit.vue')
        },
        {
            path: 'case_edit',
            title: '议案建议编辑',
            name: 'case_edit',
            component: () =>
                import ('@/views/case-management/case_edit.vue')
        },
        {
            path: 'case_reply',
            title: '议案建议回复',
            name: 'case_reply',
            component: () =>
                import ('@/views/case-management/case_reply.vue')
        }
        
    ]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
        path: '/deptment',
        icon: 'ios-albums',
        name: 'deptment',
        title: '部门管理',
        access: 0,
        component: Main,
        children: [
            {
                path: 'deptment_list',
                title: '部门列表',
                name: 'deptment_list',
                icon: 'ios-people',
                access: 0,
                component: () =>
                    import ('@/views/deptment-management/deptment_list.vue')
            },
            {
                path: 'deptment_add',
                title: '部门添加',
                name: 'deptment_add',
                icon: 'md-person-add',
                access: 0,
                component: () =>
                    import ('@/views/deptment-management/deptment_add.vue')
            }
        ]
    },
    {
        path: '/case-management',
        icon: 'logo-buffer',
        name: 'case-management',
        title: '议案与建议管理',
        component: Main,
        children: [
            {
                path: 'case_list',
                title: '议案与建议列表',
                name: 'case_list',
                icon: 'md-list',
                component: () =>
                    import ('@/views/case-management/case_list.vue')
            },
            {
                path: 'case_add',
                title: '议案建议添加',
                name: 'case_add',
                icon: 'ios-create-outline',
                component: () =>
                    import ('@/views/case-management/case_add.vue')
            }
        ]
    }
    
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    // preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];