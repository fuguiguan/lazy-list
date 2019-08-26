import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        searchText: '',
        list: []
    },
    getters: {

    },
    mutations: {
        addItem: (state,payload) => {
            const list = state.list
            list.unshift(payload)
            state.list = list
        },
        delItem: (state,id) =>{
            const list = [...state.list]
            list.forEach((ele,index) => {
                if(ele.id == id) {
                    list.splice(index,1)
                }
            })
            state.list = list
        },
        init(state,payload)  {
            state.list = state.list.concat(payload)
        },
        setSearchText(state,payload) {
            state.searchText = payload
        },
        save(state,payload) {
            const list = state.list
            state.list = {...list,...payload}
        }
    },
    actions: {

    }
})

export default store