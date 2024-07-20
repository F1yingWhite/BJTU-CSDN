<template>
  <div class="app-container">
    <div class='form'>
      <el-form class="search-form" inline>
        <el-form-item label="用户搜索">
          <el-input v-model="searchKeyword" placeholder="在胶SDN里搜索，请输入用户名" style="width: 300px;"></el-input>
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
        <el-table-column label="用户名">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="昵称" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.reg_time }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="删除" width="120">
          <template slot-scope="scope">
            <span><el-button type="primary" plain @click="change(scope.row.id)">删除</el-button></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList, getAll } from '@/api/form'
import { remove4 } from '@/api/form'
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
      get: {
        id: ''
      },
      list: [],
      beg: true,
      listLoading: false,
      i: 0,
      searchKeyword: '' // 添加searchKeyword属性
    }
  },
  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      if(store.getters.enable!=1){
        return;
      }
      if (vue.prototype.$articleID == undefined)
      {
        vue.prototype.$articleID = 0
      }
      this.listLoading = true
      getAll().then(response => {
        this.list = Array.from(response.data)
        console.log("Data" + this.list)
        this.listLoading = false
      })
    },

    change (id) {
      if(store.getters.enable==1){
        this.get.id = id
        remove4(this.get).then(response => {
          this.$message('用户删除成功')
          this.fetchData()
        }).catch(error => {
          this.$message.error('用户删除失败')
        })
        console.log("id" + vue.prototype.$articleID)
      }
      else{
        this.$message.error('您没有权限删除用户')
      }
    },

    search () {
      this.listLoading = true
      if (this.searchKeyword == "")
      {
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
.form {
  position: relative;
  /* transform: translate(50%, 50%); */
}

.lizi {
  position: absolute;
}
</style>
