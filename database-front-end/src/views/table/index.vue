<template>
  <div class="app-container">
    <div class='form'>
      <el-form class="search-form" inline>
        <el-form-item label="博客搜索/全局">
          <el-input v-model="searchKeyword" placeholder="在胶SDN里搜索，请输入博客名" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="博客名">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="作者" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.user_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.catgory }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="阅读数" width="110" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.view }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="点赞数" width="110" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.xihuan }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="收藏数" width="110" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.collect }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="发布时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.publish_date }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="浏览" width="120">
          <template slot-scope="scope">
            <span><el-button type="primary" plain @click="tiaozhuan(scope.row.id)">跳转</el-button></span>
          </template>
        </el-table-column>
      </el-table>
  </div>
  </div>
</template>

<script>
import { getList,getAll } from '@/api/table'
import store from '@/store'
import vue from 'vue'
export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      list: [],
      beg : true,
      listLoading: false,
      i:0,
      searchKeyword: '' // 添加searchKeyword属性
    }
  },
  created () {
    this.fetchData()
  },

  methods: {
    fetchData(){
      if(vue.prototype.$articleID==undefined){
        vue.prototype.$articleID=0
      }
      this.listLoading = true
      getAll().then(response => {
        this.list = Array.from(response.data)
        console.log("Data"+this.list)
        this.listLoading = false
      })
    },
   
    tiaozhuan(id){
      vue.prototype.$articleID=id
      console.log("id"+vue.prototype.$articleID)
      this.$router.push({ path: '/example/show' })
    },

    search () {
        this.listLoading = true
        if(this.searchKeyword==""){
          this.fetchData()
          return
        }
        getList(this.searchKeyword).then(response => {
          this.list = Array.from(response.data)
          this.listLoading = false
        })
      }
    }
  }
</script>

<style scoped>
.form{
  position: relative;
  /* transform: translate(50%, 50%); */
}

.lizi{
  position: absolute;
}
</style>