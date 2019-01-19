<template>
	<div class="app-container">
		<el-table :data="goods" height="590" border style="width: 100%"  :default-sort = "{prop: 'name', order: 'ascending'}">
    	
		    <el-table-column align="center" prop="shopname"  label="商家名称"  width="260"></el-table-column>
		    	
		    <el-table-column align="center" prop="contacter" label="联系人"    width="180"> </el-table-column>
		    
		    <el-table-column align="center"  prop="contacttel"  label="电话"  width="180"></el-table-column>
		    
		    <el-table-column align="center"  prop="students"  label="生源数量" sortable  width="180"></el-table-column>
		    
		     <el-table-column align="center" prop="date" label="时间" sortable width="180"></el-table-column>
		    
		     <el-table-column align="center" label="状态">
			      <template slot-scope="scope">
			      	  <el-button size="mini" type="primary" @click="handleEdit(scope.row)" plain>详情</el-button>
				      <el-button size="mini" type="success" v-if="scope.row.state == 1">已通过</el-button>
				      <el-button size="mini" type="danger"  v-if="scope.row.state == 2">未通过</el-button>
			      </template>
			      
		    </el-table-column>
    
        </el-table>	
        <div  class="fls">
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
	export default{
		data(){
			return{
				goods:[],
				goods_page:[],
			}
		},
		created() {
      this.$http.post(this.URL+"/index.php/api/geek_qt/wait_complete")
    .then((res)=>{
    	       for(var i=0;i<res.data.length;i++){
    	       	res.data[i]['image']=this.URL+res.data[i]['image']
    	       }
    	      console.log(res.data)
	 						this.goods=res.data.data
	 						this.goods_page=res.data
	 				})
  },
	methods:{
		handleEdit(row){
     	   var id=row.id
     	   this.$router.push({path: '/examine/details',query:{id:id}})
     	   
     },
     handleCurrentChange(){
     //	console.log(this.goods_page.current_page)
     	this.$http.post(this.URL+"/index.php/api/geek_qt/wait_complete",{
     		page:this.goods_page.current_page
     	})
     	.then((res)=>{
     //   console.log(res.data.data)
	        this.goods=res.data.data
     	})
     }
	}
		
		
	}
</script>

<style scope>
.fls{
		display: flex !important; 
		justify-content: center !important;
		z-index: 99;
	}	
</style>