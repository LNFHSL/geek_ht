<template>
  <div class="app-container">
    <el-table :data="goods" height="580" border style="width: 100%"  :default-sort = "{prop: 'name', order: 'ascending'}">
    	
    <el-table-column align="center" prop="image"  label="图片"  width="160"> <img src="image"/>
	       <template   slot-scope="scope">            
	           <img :src="scope.row.image"  min-width="70" height="70" />
	       </template>
    </el-table-column>
    	
    <el-table-column align="center" prop="name" label="名称"    width="160"> </el-table-column>
    
    <el-table-column align="center"  prop="integral"  label="积分" sortable width="160"></el-table-column>
    
    <el-table-column align="center"   prop="classify"  label="分类"  width="160"></el-table-column>
    
    <el-table-column align="center" prop="change" label="已兑换" sortable width="160"></el-table-column>
    
    <el-table-column align="center" prop="stock" label="库存" sortable width="160"></el-table-column>
    
     <el-table-column align="center" prop="date" label="时间" sortable ></el-table-column>
    
     <el-table-column align="center" label="操作" width="240">
	      <template slot-scope="scope">
		       <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
		       <el-button size="mini" type="danger" @click="deletes(scope.$index, scope.row)">删除</el-button>
	         
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
			<!--
			page-size  
			current-page.sync 当前页数-->
		</div>

  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
     url:this.url,
     goods:[],
     goods_page:[],
     
    }
  },
  created() {
      this.$http.post(this.URL+"/index.php/api/geek_ht/display_goods")
    .then((res)=>{
    	       
//  	       for(var i=0;i<res.data.length;i++){
//  	       	res.data[i]['image']=this.URL+res.data[i]['image']
//  	       }
 	         console.log(res.data.data)
	 						this.goods=res.data.data
	 						this.goods_page=res.data
	 				})
  },
  methods: {
     deletes(index,data){
     	this.$confirm('确认删除吗', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }) 
     	.then(_ => { 
     		    this.$http.post(this.URL+"/index.php/api/geek_ht/delete_goods",{
     		    	id:data.id
     		    }).then((res)=>{
     		    	 if(res.data == 1){
     		    	 	this.goods.splice(index,1)
     		    	 	this.$message({message: '删除成功',type: 'success'});
     		    	 }else{
     		    	  this.$message.error('删除失败,请刷新网页再删除 ');
     		    	 }
     		    	
     		    })
     	})
       .catch(_ => {});
     },
     handleEdit(row){
     	   var id=row.id
     	   this.$router.push({path: '/goods/edit',query:{id:id}})
     },
     handleCurrentChange(){
     //	console.log(this.goods_page.current_page)
     	this.$http.post(this.URL+"/index.php/api/geek_ht/display_goods",{
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
<style type="text/css" scope>
.fls{
		display: flex !important; 
		justify-content: center !important;
		z-index: 99;
}
</style>