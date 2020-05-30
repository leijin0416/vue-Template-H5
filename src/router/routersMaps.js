/**
 * getComponentMin() 路由懒加载
 * @param {string} name  -文件夹
 * @param {string} component  -.vue
 */
const getComponentMin = (name, component) => () =>
    import(`@/views/${name}/${component}.vue`);
    
/** 
 * getComponentMAx() 路由懒加载
 * @param {string} name  -文件夹
 * @param {string} component  -.vue
 */
const getComponentMAx = (name, component) => () =>
    import(`@/views/htmls/${name}/${component}.vue`);

/**
 * meta 可配置参数
 * @param {boolean} displayNavBar 是否需要底部导航
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 * to.meta.index || from.meta.index || this.$router.isBack
 */
export const constantRouterMaps = [
    {
        path: '/',
        component: getComponentMin('htmls', 'index'),
        meta: { title: '首页-绿色星球', displayNavBar: true }
    },
    {
        path: '/login',
        name: 'login',
        component: getComponentMin('logins', 'login'),
        meta: { title: '登录-绿色星球', displayNavBar: false }
    },
    {
        path: '/index',
        name: 'index',
        component: getComponentMin('htmls', 'index'),
        meta: { title: '首页-绿色星球', displayNavBar: true }
    },
    {
        path: '/transmit',
        name: 'transmit',
        component: getComponentMAx('otc', 'index'),
        meta: { title: '传递-绿色星球', displayNavBar: true }
    },
    {
        path: '/shop',
        name: 'shop',
        component: getComponentMAx('shop', 'index'),
        meta: { title: '商城-绿色星球', displayNavBar: true }
    },
    {
        path: '/home',
        name: 'home',
        component: getComponentMAx('home', 'index'),
        meta: { title: '我的-绿色星球', displayNavBar: true }
    },
    {
        path: '/info',
        name: 'info',
        component: getComponentMAx('home', 'info'),
        meta: { title: '我的-绿色星球', displayNavBar: false }
    },
    {
        path: '/share',
        name: 'share',
        component: getComponentMAx('home', 'share'),
        meta: { title: '我的邀请-绿色星球', displayNavBar: false }
    },
    {
        path: '*',
        redirect: '/'
    }
]