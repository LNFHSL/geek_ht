<template>
  <div class="app-container">
    <el-table
      :data="msg"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center"  label="图片" width="180">
	      <template   slot-scope="scope">            
		           <img :src="scope.row.cover"  min-width="70" height="70" />
				</template>
			</el-table-column>
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
			  :page-size="goods_page.per_page"
			   layout="prev, pager, next"
			  :total="goods_page.total"
			  :current-page.sync="goods_page.current_page"
			  @current-change="handleCurrentChange">
			</el-pagination>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      msg: [],
      goods_page:[],
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
        this.goods_page=res.data
      })
    },
    changeHeadline(e) {
      this.$router.push({ path: '/headline/change', query: { id: e }})
    },
    delHeadline(e) {
      this.$confirm('确定删除该条数据吗？', {
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
     handleCurrentChange(){
     //	console.log(this.goods_page.current_page)
     	this.$http.post(this.URL+"/index.php/api/headline/headlinePage",{
     		page:this.goods_page.current_page
     	})
     	.then((res)=>{
     //   console.log(res.data.data)
	        this.msg=res.data.data
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

