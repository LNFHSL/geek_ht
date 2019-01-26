<template>
  <div class="app-container">
    <el-row style=" margin-bottom: 20px;" :gutter="20">
      <el-col :span="4">
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
       <el-col :span="6"><el-input v-model="input" placeholder="请输入查询内容"></el-input></el-col>
       <el-col :span="6">
       	<el-button type="primary" @click="search">查询</el-button>
       	<el-button  type="info" @click="no_examine" >还原</el-button>
       	<el-button  type="success" @click="exports" >导出Excel</el-button>
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
      <el-table-column label="是否支付" prop="is_pay" width="110" align="center"/>
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
      <el-table-column label="通告详情" prop="content" width="200" align="center"/>
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
    
    <div  class="fls" v-if="state==1">   <!-- 分页 -->
		    <el-pagination
				  :page-size="goods_page.per_page"
				   layout="prev, pager, next"
				  :total="goods_page.total"
				  :current-page.sync="goods_page.current_page" 
				  @current-change="handleCurrentChange">
				</el-pagination>
				<!--
				page-size  
				current-page.sync 当前页数-->
		</div>
    <el-dialog :visible.sync="dialog"  width="65%"> <!-- 萌娃详情  -->
      <el-table :data="baby">
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.headpic" height="50" width="50">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="萌娃名称"/>
        <el-table-column prop="sex" label="性别"/>
        <el-table-column prop="username" label="用户昵称"/>
        <el-table-column prop="mobile" label="用户电话"/>
        <el-table-column prop="time" label="报名时间"/>
      </el-table>
    </el-dialog>
    <el-dialog title="选择时间" :visible.sync="excel" width="40%" >  <!-- 选择时间 -->
		     <el-row class="center_box">
			    <el-col :span="11">   
			    	<el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
			    </el-col>
			    <el-col :span="2" class="center">—</el-col>
			    <el-col :span="11">
			    	<el-date-picker v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
			    </el-col>
			</el-row>
		    <span slot="footer" class="dialog-footer">
			    <el-button @click="excel = false">取 消</el-button>
			    <el-button type="primary" @click="export_two">确 定</el-button>
			</span>
		</el-dialog>
    		<el-table id="table" v-show="false" :data="tableData_two" border style="width: 100%"> <!-- 导出 -->
					<el-table-column align="center" prop="title" label="活动名称"></el-table-column>
					<el-table-column align="center" prop="name" label="萌娃名称" ></el-table-column>
					<el-table-column align="center" prop="username" label="用户昵称" ></el-table-column>
					<el-table-column align="center" prop="mobile" label="用户电话" ></el-table-column>
					<el-table-column align="center" prop="contacts" label="活动联系人" ></el-table-column>
					<el-table-column align="center" prop="contactmode" label="联系方式" ></el-table-column>
					<el-table-column align="center" prop="time" label="报名时间" ></el-table-column>
				</el-table> 
  
  
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  
  data() {
    return {
    	state:'1',
      msg: [],
      lastPage: 0,
      total: 0,
      currentPage: 0,
      value: '',
      status: '',
      dialog: false,
      baby: [],
      input:'',
      goods_page:[],
      excel:false,
      value1:'',
      value2:'',
      tableData_two:[]
    }
  },
  created() {
    this.showNotice()
  },
  methods: {
    showNotice() {
      this.$http.post(this.URL + '/index.php/api/notice/noticeShow').then((res) => {
        this.msg = res.data.data
        this.goods_page=res.data
        this.state=1
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
      this.$http.post(this.URL + '/index.php/api/notice/noticeShow',{
      	page:this.goods_page.current_page
      })
      .then((res) => {
      	this.state=1
        this.msg = res.data.data
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
    },
    search(){
    	this.$http.post(this.URL + '/index.php/api/geek_notice/searchs', {
        input:this.input
      }).then((res) => {
      	  this.msg = res.data
      	  this.state=2
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
    no_examine(){
    	this.showNotice()
    },
    exports(){
    	  this.excel=true
				this.value1=""
				this.value2=''
    },
    export_two(){ //导出Excel
				this.excel=false
				this.$http.post(this.URL + '/index.php/api/geek_notice/excel_notice',{
					value:this.value1,
				    values:this.value2
				})
				.then(res=>{
					console.log(res.data)
					this.tableData_two=res.data
					if(this.tableData_two ==''){
						  this.$message('没有人报名哦');
					}
					else{
					  setTimeout(() => {
							console.log(this.tableData_two)
							  /* generate workbook object from table */
					         var wb = XLSX.utils.table_to_book(document.querySelector('#table'))
					         /* get binary string as output */
					         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
					         try {
					             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '通告报名表.xlsx')
					         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
					         return wbout},500)
					}
				})
			},
  }
}
</script>
<style scope>
.fls{
		display: flex !important; 
		justify-content: center !important;
		z-index: 99;
}
.center_box{
	display: flex;
}
.center{
	display: flex;
	align-items: center;
}
.row-bg{
	margin-bottom: 10px;
}
</style>

