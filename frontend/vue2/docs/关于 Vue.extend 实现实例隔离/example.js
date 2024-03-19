import Vue from '../../node_modules/vue/dist/vue.esm.browser.js'

const plugin = (vue) => {
  vue.prototype.$count = { count: 0 }
}

const App = {
  render(h) {
    if (window.vueApp) {
      console.log(window.vueApp === this.$count)
    } else {
      window.vueApp = this.$count
    }
    return h('div', this.$count.count)
  },
}

const CusVue = Vue.extend(App)

Vue.use(plugin)
CusVue.use(plugin)

const vueApp = new Vue(App)

const cusApp = new CusVue()

vueApp.$mount('#vueApp')

cusApp.$mount('#cusApp')
