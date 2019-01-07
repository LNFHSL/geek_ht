<template>
  <div class="app-container">
    <el-table
      :data="msg"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" prop="id" label="ID" width="95"/>
      <el-table-column label="标题" prop="title" align="center"/>
      <el-table-column label="发布日期" prop="date" width="110" align="center"/>
      <el-table-column label="具体时间" prop="time" width="110" align="center"/>
      <el-table-column align="center" width="150" label="管理" >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="changeHeadline(scope.row.id)"/>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delHeadline(scope.row.id)"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :page-size="10"
        :total="total"
        :current-page.sync="currentPage"
        layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      msg: [],
      lastPage: 0,
      total: 0,
      currentPage: 0
    }
  },
  created() {
    this.showHeadline()
  },
  methods: {
    showHeadline() {
      this.$http.post(this.URL + '/index.php/api/headline/headlinePage').then((res) => {
        this.msg = res.data.data
        this.total = res.data.total
        this.currentPage = res.data.current_page
      })
    },
    changeHeadline(e) {
      this.$router.push({ path: '/headline/change', query: { id: e }})
    },
    delHeadline(e) {
      this.$confirm('确定删除该条数据吗？').then(_ => {
        this.$http.post(this.URL + '/index.php/api/headline/delHeadline', {
          id: e
        }).then((res) => {
          if (res.data.state == '1') {
            this.$message.success('删除成功')
            this.showHeadline()
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {})
    },
    handleCurrentChange() {
      this.$http.post(this.URL + '/index.php/api/headline/headlinePage?page=' + this.currentPage).then((res) => {
        this.msg = res.data.data
        this.total = res.data.total
        this.currentPage = res.data.current_page
      })
    }
  }
}
</script>
<style>
  .block{
    text-align: center;
    margin: 20px 0 20px 0;
  }
</style>

