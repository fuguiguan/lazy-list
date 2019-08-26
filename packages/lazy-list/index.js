import LazyList from './src/list-wrap'

LazyList.install = function(Vue) {
    Vue.component(LazyList.name, LazyList)
}

export default LazyList