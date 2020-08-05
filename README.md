# 文档

[1 面试](https://juejin.im/post/5ec9f2dff265da76e25c99cb) | [2 面试题](https://juejin.im/post/5ecf1da15188254316147991#heading-28) | [3 面试+分析题](https://juejin.im/post/5ede4c556fb9a047a6446a8e#comment) | [4 面试+分析题](https://juejin.im/post/5ee1e42ef265da770d3dcc2c#comment) | [vue总结---面试!!!](https://juejin.im/post/6850037277675454478)

[图表可视化](https://www.jianshu.com/p/8cac22daca98) | [可视化实例](https://echarts.apache.org/examples/zh/index.html) | [常用GIF压缩](https://www.jianshu.com/p/37554cff3fe9) | [JavaScript数组去重（12种方法）](https://segmentfault.com/a/1190000016418021?utm_source=tag-newest) | [如何实现防抖和节流，及使用场景](https://juejin.im/post/5f02710c6fb9a07e7a53ce11)

[H5效果GIF链接](https://cdn.u1.huluxia.com/g4/M01/4F/26/rBAAdl7SbIOAZCCcAAcn4lsR0wY574.gif)

---

## （一）索引栏-城市列表

- src/components/case-indexBar/constAZ.js  全部的中文拼音；

- src/components/case-indexBar/vuePY.js  将中文转换成拼音，并按字母排序；

## （二）上拉加载

- src/components/case-pullRefresh/index.vue  下拉刷新 && 上拉加载；

---

## （三）Mock 数据

[Mock 步骤参考](https://www.jianshu.com/p/ccd53488a61b) | [Mock 数据参考文档](http://mockjs.com/examples.html) | [Mock 官网文档](https://github.com/nuysoft/Mock/wiki)

- 项目目录下创建 mock 文件夹

- mock 文件夹下添加 db.js 文件

### 1、全局安装 json-server

```js
npm install --g json-server

// 更改json-server默认3000端口
json-server --watch mock/db.js --port 3004
```

### 2.1、mockjs 批量生成伪数据

```js
npm install mockjs --save-dev

"mock": "json-server --watch mock/db.js --m mock/post-to-get.js",  // 开启 npm run mock
```

### 2.2、faker.js 批量生成伪数据

```js
npm install faker --save-dev

"mock": "json-server --watch mock/faker-data.js --m mock/post-to-get.js",
```

---

## （四）node 版本

[版本控制 10.12.0 zip](https://nodejs.org/zh-cn/download/releases/)

```js
where node  // 查看node位置

> del /f/s/q node_modules> nul

> rmdir /s/q node_modules

npm install --registry https://registry.npm.taobao.org  // 临时使用一次

```

### npm install 关于报错 "node-pre-gyp error"

```js
> npm install -g node-gyp  // -1

> npm install --g --production windows-build-tools    // -2

> npm i --unsafe-perm   // 3   等待十秒若不行转4

------------------------

// npm 报错 "node-pre-gyp WARN Using request for node-pre-gyp https download"

npm cache clean -f  // 清除缓存，再转3   -4

权限不够，--unsafe-perm 解决
```

[node-pre-gyp WARN -node-canvas](https://blog.csdn.net/weixin_39496363/article/details/104849444)

---

## （五）前端优化

[Animate css动画](http://www.jq22.com/yanshi819) | [掘金-‘正则’等工具函数](https://juejin.im/post/5e6cf42bf265da57397e3694)

[新型冠状病毒疫情实时爬虫1](https://github.com/BlankerL/DXY-COVID-19-Crawler)| [新型冠状病毒疫情实时爬虫2](https://juejin.im/post/5e480369f265da57127e3d15) | [VANT GIT操作](https://github.com/Line999/vue-h5-template/blob/master/src/App.vue) | [一个抽奖的轮子](https://wheel.assetss.cn/docs/#/?id=vue-big-wheel)

### 1、vw 适配

16px*2

![vw.png](https://images2017.cnblogs.com/blog/1210235/201709/1210235-20170918164258259-1200967116.png)

### 2、页面左右滑动页面效果手势

需要在路由（beforeEach）中判断

```js
const history = window.sessionStorage;
let count = history.getItem('count') || 0;
history.clear();

router.beforeEach((to, from, next) => {
    // 第一级栏目
    const subArr = ['/', '/transmit', '/home', '/shop']
    let [toIndex, prevIndex] = [parseInt(history.getItem(to.path)), parseInt(history.getItem(from.path))]
    for (let index in subArr) history.setItem(subArr[index], 0)

    if (toIndex || toIndex === 0) {
        // 判断前进/后退
        if (toIndex > prevIndex) {
            store.commit('handleDirectionId', 'next')
        } else if (toIndex === prevIndex) {  // 一级栏目无切换效果
            store.commit('handleDirectionId', '')
        } else {
            store.commit('handleDirectionId', 'prev')
        }
    } else if (!subArr.includes(to.path)) {
        ++count;
        history.setItem(to.path, count)
        store.commit('handleDirectionId', 'next')
    }
    next();
});

this.$router.back(-1); // 按钮返回

```

### 3、vuex使用logger的日志功能

可以通过这个logger插件可以明细的看到数据的变化

- **引入文件**

```js
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production';

---------

plugins: debug ? [createLogger()] : [] // 开发环境下显示 vuex状态 的修改日志
```

- prev sate 代表之前的数据

- mutations代表经过vuex中的mutations中方法修改后的数据

- next会列出state中执行此方法后的值

![vuex.png](https://img-blog.csdnimg.cn/20191231154406254.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzMzYzODg0,size_16,color_FFFFFF,t_70)

### 4、keep-alive 组件级缓存

**场景**：在一个列表项很长的时候我们通常需要进行分页操作，移动端的分页操作基本上是“上拉加载” 和 “下拉刷新”；假如我们已经进入了这个列表的第四页，那么当我们想进去详情页查看详情的时候，当我们返回的时候这个时候页码会直接变为1，因为数据已经初始化状态；这个问题我们通常需要keep-alive组件来解决；

keep-alive是Vue内置的一个组件，通常是用来保留数据状态或避免重复渲染，也就是我们说的缓存效果；

属性：

- include：接受值为字符串或者正则表达式，只有匹配的才被缓存；

- exclude：接受值为字符串或者正则表达式，被匹配的路由将不会被缓存；

- 路由元信息 meta，meta 路由元信息对象里面放着的是类似于局部变量，在路由匹配的组件内部都能够访问得到，我们可以通过meta来定义一个自定义字段来判断标识页面是否需要开启缓存

meta: { keepAlive: true // 需要被缓存 }

### 6、ProgressBarPlugin 开启打包进度显示

```js
npm i -D progress-bar-webpack-plugin
```
