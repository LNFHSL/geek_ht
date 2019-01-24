<template>
  <div class="app-container">
    <el-row style="float:right; margin-bottom: 20px;width: 160px;">
      <el-col>
        <el-select
          v-model="status"
          placeholder="审核状态查询"
          @change="changeStatusShow">
          <el-option :key="6" :value="6" label="所有通告"/>
          <el-option :key="5" :value="5" label="审核不通过"/>
          <el-option :key="1" :value="1" label="审核中"/>
          <el-option :key="2" :value="2" label="通告报名中"/>
          <el-option :key="3" :value="3" label="通告进行中"/>
          <el-option :key="4" :value="4" label="通告结束"/>
        </el-select>
      </el-col>
    </el-row>
    <el-table
      :data="msg"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="封面" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.thumb" height="100" width="100">
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title" width="150" align="center"/>
      <el-table-column label="通告详情" prop="content" width="200" align="center"/>
      <el-table-column label="节目类型" prop="film" width="110" align="center"/>
      <el-table-column label="通告类型" prop="type" width="110" align="center"/>
      <el-table-column label="是否需要面试" prop="talk_pay" width="110" align="center"/>
      <el-table-column label="招募地区" prop="place" width="110" align="center"/>
      <el-table-column label="截止日期" prop="endtime" width="110" align="center"/>
      <el-table-column label="联系人" prop="connactName" width="110" align="center"/>
      <el-table-column label="联系方式" prop="connact" width="110" align="center"/>
      <el-table-column label="创建时间" prop="createtime" width="110" align="center"/>
      <el-table-column label="报名人数" prop="people" width="110" align="center"/>
      <el-table-column label="片酬" prop="money" width="110" align="center"/>
      <el-table-column label="是否支付" prop="is_pay" width="110" align="center"/>
      <el-table-column align="center" width="140" label="审核" fixed="right">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.status"
            placeholder="请选择"
            @change="changeStatus(scope.row.id,scope.row.status)">
            <el-option :key="5" :value="5" label="审核不通过"/>
            <el-option :key="1" :value="1" label="审核中"/>
            <el-option :key="2" :value="2" label="通告报名中"/>
            <el-option :key="3" :value="3" label="通告进行中"/>
            <el-option :key="4" :value="4" label="通告结束"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" width="140" label="管理" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showJoinBaby(scope.row.id)">详情</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delNotice(scope.row.id)"/>
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
    <el-dialog :visible.sync="dialog"  width="65%">
      <el-table :data="baby">
        <el-table-column prop="id" label="萌娃ID"/>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.headpic" height="50" width="50">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="称呼"/>
        <el-table-column prop="sex" label="性别"/>
        <el-table-column prop="contacts" label="联系人"/>
        <el-table-column prop="contactmode" label="联系方式"/>
      </el-table>
    </el-dialog>
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
      value: '',
      status: '',
      dialog: false,
      baby: []
    }
  },
  created() {
    this.showNotice()
  },
  methods: {
    showNotice() {
      this.$http.post(this.URL + '/index.php/api/notice/noticeShow').then((res) => {
        this.msg = res.data.data
        this.total = res.data.total
        this.currentPage = res.data.current_page
        for (var n = 0; n < this.msg.length; n++) {
        	
          this.msg[n]['thumb'] =this.msg[n]['thumb']

          if (this.msg[n]['is_pay'] == 0) {
            this.msg[n]['is_pay'] = '未支付'
          }
          if (this.msg[n]['is_pay'] == 1) {
            this.msg[n]['is_pay'] = '已支付'
          }
        }
      })
    },
    changeHeadline(e) {
      this.$router.push({ path: '/headline/change', query: { id: e }})
    },
    delHeadline(e) {
      this.$confirm('确定删除该条数据吗？', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(_ => {
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
      this.$http.post(this.URL + '/index.php/api/notice/noticeShow?page=' + this.currentPage).then((res) => {
        this.msg = res.data.data
        this.total = res.data.total
        this.currentPage = res.data.current_page
        for (var n = 0; n < this.msg.length; n++) {
          this.msg[n]['thumb'] =this.msg[n]['thumb']
          if (this.msg[n]['is_pay'] == 0) {
            this.msg[n]['is_pay'] = '未支付'
          }
          if (this.msg[n]['is_pay'] == 1) {
            this.msg[n]['is_pay'] = '已支付'
          }
        }
      })
    },
    changeStatusShow() {
      if (this.status == 6) {
        this.showNotice()
      } else {
        this.$http.post(this.URL + '/index.php/api/notice/noticeShow', {
          status: this.status
        }).then((res) => {
          this.msg = res.data.data
          this.total = res.data.total
          this.currentPage = res.data.current_page
          for (var n = 0; n < this.msg.length; n++) {
            this.msg[n]['thumb'] =this.msg[n]['thumb']

            if (this.msg[n]['is_pay'] == 0) {
              this.msg[n]['is_pay'] = '未支付'
            }
            if (this.msg[n]['is_pay'] == 1) {
              this.msg[n]['is_pay'] = '已支付'
            }
          }
        })
      }
    },
    changeStatus(id, status) {
      this.$http.post(this.URL + '/index.php/api/notice/changeStatus', {
        id: id,
        status: status
      }).then((res) => {
        if (res.data.state == 1) {
          this.$message.success('修改成功')
          this.changeStatusShow()
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    showJoinBaby(id) {
    	this.dialog = true
      this.baby = null
      this.$http.post(this.URL + '/index.php/api/notice/showJoinBaby', {
        id: id
      }).then((res) => {
      	
        if (res.data != '') {
          this.baby = res.data
          for (var n = 0; n < this.baby.length; n++) {
            if (this.baby[n]['sex'] == 1) {
              this.baby[n]['sex'] = '男'
            } else {
              this.baby[n]['sex'] = '女'
            }
          }
        }
        
      })
    },
    delNotice(id) {
      this.$confirm('确认删除该通告吗？', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(_ => {
        this.$http.post(this.URL + '/index.php/api/notice/delNotice', {
          id: id
        }).then((res) => {
          if (res.data.state == 1) {
            this.$message.success('删除成功')
            this.changeStatusShow(this.status)
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch((res) => {})
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

