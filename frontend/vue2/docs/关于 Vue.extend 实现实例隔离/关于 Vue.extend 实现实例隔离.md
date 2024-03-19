# 关于 Vue.extend 实现实例隔离

[官方源](https://v2.cn.vuejs.org/v2/api/#Vue-extend)

从 Vue 构造器创建一个**子类**。参数是一个包含组件选项的对象。

## 期望

在基于动态加载实现的微前端环境中，各模块的 Vue 实例是独立的，互不影响。

## Vue.extend 对于各种情况的处理

我们先创建一个简单插件来模拟微前端环境：

```javascript
const plugin = (vue) => {
  vue.prototype.$count = { count: 0 }
}
```

然后我们分别创建两个 Vue 实例，其中一个使用 Vue.extend 构建子类来创建实例

```javascript
const App = {
  render(h) {
    return h('div', {}, this.$count)
  },
}

const CusVue = Vue.extend(App)

const vueApp = new Vue(App)

const cusApp = new CusVue()

vueApp.$mount('#vueApp')

cusApp.$mount('#cusApp')
```

然后我们直接比对两个实例的 $count 属性，是否是同一个对象，会不会在安装的时候互相覆盖

```javascript
const App = {
  render(h) {
    if (window.vueApp) {
      console.log(window.vueApp === this.$count) // std: false
    } else {
      window.vueApp = this.$count
    }
    return h('div', this.$count.count)
  },
}
```

在 devtool 工具中我们可以看到数据了 `false` 说明两次插件并没有互相覆盖，也就是说 Vue.extend 创建的子类拥有自己独立的 `prototype`。
