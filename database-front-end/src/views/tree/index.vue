<template>
  <div class="app-container">
    <el-form class="search-form" inline>
      <el-form-item label="博客搜索/我的">
        <el-input v-model="searchKeyword" placeholder="在胶SDN里搜索，请输入博客名" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="博客名">
        <template slot-scope="scope">
          {{ scope.row.title }}
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
      <el-table-column align="center" prop="_at" label="发布时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="浏览" width="120">
        <template slot-scope="scope">
          <span><el-button type="primary" plain @click="tiaozhuan(scope.row.id)">跳转</el-button></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMySelf } from '@/api/table'
import Vue from 'vue'
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
      list: [
        {
        }],
      listLoading: false,
      searchKeyword: '' // 添加searchKeyword属性
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      console.log('我的名字是' + Vue.prototype.$userName)
      getMySelf(Vue.prototype.$userName).then(response => {
        this.list = Array.from(response.data)
        this.listLoading = false
      }).catch(
        this.listLoading = false
      )
    },

    tiaozhuan (id) {
      Vue.prototype.$articleID = id
      console.log("id" + Vue.prototype.$articleID)
      this.$router.push({ path: '/example/show' })
    },

    tiaozhuan2 (id) {
      Vue.prototype.$articleID = id
      console.log("id" + Vue.prototype.$articleID)
      this.$router.push({ path: '/example/change' })
    },

    search () {
      // 执行搜索逻辑
      // 可以使用this.searchKeyword获取搜索关键字的值，并根据需要处理搜索操作
      console.log('Search keyword:', this.searchKeyword);
      // 在这里可以根据搜索关键字进行数据筛选或重新请求数据等操作

    }
  }
}
</script>
