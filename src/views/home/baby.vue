<template>
  <div class="app-container">
    <el-table
      :data="msg"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width:100%"
    >
      <el-table-column align="center" prop="id" label="ID" width="95"/>
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.headpic" width="60" height="60"/>
        </template>
      </el-table-column>
      <el-table-column label="称呼" prop="name" align="center"width="150"/>
      <el-table-column label="性别" prop="sex" width="100" align="center"/>
      <el-table-column label="长相" prop="lookstyle" align="center"/>
      <el-table-column label="地区" prop="place" align="center"width="100"/>
      <el-table-column label="国籍" prop="nationality" align="center"width="100"/>
      <el-table-column label="是否推荐" align="center"width="160">
        <template slot-scope="scope">
          <el-select v-model="scope.row.Recommend" placeholder="请选择" @change="changeRcmd(scope.row.id,scope.row.Recommend)">
            <el-option :key="1" :value="1" label="推荐"/>
            <el-option :key="0" :value="0" label="不推荐"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="管理" fixed="right" >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showDetail(scope.row.id)">详情</el-button>
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
      currentPage: 0,
      value: ''
    }
  },
  created() {
    this.showBaby()
  },
  methods: {
    showBaby() {
      this.$http.post(this.URL + '/index.php/api/baby/babyShow').then((res) => {
        this.msg = res.data.data
        this.total = res.data.total
        this.currentPage = res.data.current_page
        for (var n = 0; n < this.msg.length; n++) {
          if (this.msg[n]['sex'] == 1) {
            this.msg[n]['sex'] = '男'
          } else {
            this.msg[n]['sex'] = '女'
          }
        }
      })
    },
    handleCurrentChange() {
      this.$http.post(this.URL + '/index.php/api/baby/babyShow?page=' + this.currentPage).then((res) => {
        this.msg = res.data.data
        this.total = res.data.total
        this.currentPage = res.data.current_page
        for (var n = 0; n < this.msg.length; n++) {
          if (this.msg[n]['sex'] == 1) {
            this.msg[n]['sex'] = '男'
          } else {
            this.msg[n]['sex'] = '女'
          }
        }
      })
    },
    showDetail(id) {
      this.$router.push({ path: '/home/detail', query: { id: id }})
    },
    changeRcmd(id, Recommend) {
      this.$http.post(this.URL + '/index.php/api/baby/changeRcmd', {
        id: id,
        Recommend: Recommend
      }).then((res) => {
        if (res.data.state == 1) {
          this.$message.success('保存成功')
          this.showBaby()
        } else {
          this.$message.error('保存失败')
        }
      })
    }
  }
}
</script>
<style scope>
  .block{
    text-align: center;
    margin: 20px 0 20px 0;
  }
</style>

