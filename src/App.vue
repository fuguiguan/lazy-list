<template>
  <div id="app">
    <LazyList :data="list" direction="horizon" wrap>
      <Item slot="item" slot-scope="props" 
      :title="props.item.title" 
      :desc="props.item.desc"
      :url="props.item.url"
      v-on:delItem="delItem(props.item.id)"
      v-on:savaItem="savaItem(props.item)"
      />
      <Skeleton slot="skeleton"/>
    </LazyList> 
  </div>
</template>

<script>
import LazyList from '../packages/lazy-list/src/list-wrap'
import info from './utils/data'
import Item from './components/item'
import Skeleton from './components/skeleton'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    LazyList,
    Item,
    Skeleton
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['list'])
  },
  methods: {
    ...mapMutations(['init','save']),
    delItem(id) {
         this.$confirm('你确定删除该项目吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                // this.list.forEach((item,index) => {
                //     if(item.id == id) {
                //       this.list.splice(index,1)
                //     }
                //   })
                this.$store.commit('delItem',id)
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
            }).catch(() => {
                 this.$message({
                    message: '已取消删除',
                    type: 'info'
                })
            })
      },
      savaItem(item) {
        console.log(item)
      }
  },
  mounted() {
    this.init(info.data)
  }
}
</script>

<style>
#app {
  margin: 0 auto;
  width: 60%
}
</style>
