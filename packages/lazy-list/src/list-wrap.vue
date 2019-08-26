<template>
    <div class="list-wrap">
        <div class="search" v-if="showSearch">
            <Search v-on:queryItems="queryItems" v-on:addItem="addItem"/>
        </div>
        <div v-if="queryinfos.length" :class="[{'list-x': isListX},{'wraped': isWrap}]">
            <List v-for="item in queryinfos" :key="item.id">
                <div slot="item"><slot name="item" :item="item"></slot></div>
                <div slot="skeleton"><slot name="skeleton"></slot></div>
            </List>
        </div>
        <div v-else><h4>No Data</h4></div>
    </div>
</template>

<script>
import List from './list'
import Search from './search'
import { mapState, mapMutations} from 'vuex'
import { truncate } from 'fs';
export default {
    name: 'LazyList',
    components: {
        List,
        Search
    },
    props: {
        /**
         * 列表渲染的数据源
         */
        data: {
            type: Array,
            default: () => []
        },
        /**
         * 列表渲染的方向 vertical和horizon
         */
        direction: {
            type: String,
            default: 'vertical'
        },
        /**
         * 控制列表渲染是否换行no-wrap和wrap
         */
        wrap: {
            type: Boolean,
            default: true
        },
        /**
         * 是否显示搜索框
         */
        showSearch: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isListX: this.direction == 'horizon',
            isWrap: this.wrap
        }
    },
    methods: {
        ...mapMutations(['setSearchText']),
        queryItems(searchText) {
        this.setSearchText(searchText)
      },
      addItem(formData) {
        if(formData.title&&formData.url&&formData.desc){
              this.$store.commit('addItem',formData)
              this.$message({
                message: '添加成功',
                type: 'success'
                })
        }else {
          this.$message({
            message: '请输入合法的内容',
            type: 'error'
          })
        }

      }
    },
    computed: {
      ...mapState(['list','searchText']), 
      queryinfos: function() {
        return this.list.filter(item => {  
          return item.title.toLowerCase().startsWith(this.searchText) || item.title.toLowerCase().includes(this.searchText)
        });
      }
    }
}
</script>

<style scoped>
    .list-x {
        display: flex;
        display: -webkit-flex;
        display: -ms-flexbox;
        flex-direction: row;
        justify-content: space-around   
        
    }
    .wraped {
        flex-wrap: wrap
    }
</style>