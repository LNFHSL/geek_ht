<template>
  <div class="app-container">
  	<el-row class="search" :gutter="20">
       <el-col :span="8"><el-input v-model="input" placeholder="请输入商品名称"></el-input></el-col>
       <el-col :span="4">
       	    <el-select v-model="classify" placeholder="全部">
               <el-option v-for="item in options" :key="item.id" :label="item.classify" :value="item.id"></el-option>
        	  </el-select>
       </el-col>
       <el-col :span="8">
       	   <el-button type="primary" @click="search">搜索</el-button>
       </el-col>
	</el-row>
  	
  	
  	
    <el-table :data="goods" height="750" border style="width: 100%"  :default-sort = "{prop: 'name', order: 'ascending'}">
    	
    <el-table-column align="center" prop="image"  label="图片"  width="160"> <img src="image"/>
	       <template   slot-scope="scope">            
	           <img :src="scope.row.image"  min-width="70" height="70" />
	       </template>
    </el-table-column>
    	
    <el-table-column align="center" prop="name" label="名称"    width="160"> </el-table-column>
    
    <el-table-column align="center"  prop="integral"  label="积分" sortable width="160"></el-table-column>
    
    <el-table-column align="center"  prop="classify"  label="分类"  width="160"></el-table-column>
    
    <el-table-column align="center" prop="change" label="已兑换" sortable width="160"></el-table-column>
    
    <el-table-column align="center" prop="stock" label="库存" sortable width="160"></el-table-column>
    
     <el-table-column align="center" prop="date" label="时间" sortable width="160"></el-table-column>
    
     <el-table-column align="center"  label="操作" width="170">
	      <template slot-scope="scope">
		        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		       <el-button size="mini" type="danger" @click="deletes(scope.$index, scope.row)">删除</el-button>
	         
	      </template>
	      
    </el-table-column>
    
  </el-table>	
  


  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
     url:this.URL,
     goods:[],
     input:'',
     classify:'',
     options:[]
     
    }
  },
  created() {
	this.$http.post(this.URL+"/index.php/api/geek_ht/classify")
    .then((res)=>{
	 		this.options=res.data
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
     		    this.goods.splice(index,1)
     		    this.$http.post(this.URL+"/index.php/api/geek_ht/delete_goods",{
     		    	id:data.id
     		    }).then((res)=>{
     		    	 if(res.data == 1){
     		    	 	this.$message({message: '删除成功',type: 'success'});
     		    	 }else{
     		    	  this.$message.error('删除失败');
     		    	 }
     		    	
     		    })
     	})
       .catch(_ => {});
     },
     search(){
     	this.$http.post(this.URL+"/index.php/api/geek_ht/search_goods",{
     		input:this.input,
     		classify:this.classify
     	})
    .then((res)=>{
//  	       for(var i=0;i<res.data.length;i++){
//  	       	res.data[i]['image']=this.URL+res.data[i]['image']
//  	       }
//  	         console.log(res.data)
	 						this.goods=res.data
	 						 this.$message({message: '查询完成',type: 'success'});
	 				})
     }
  }
}
</script>
<style type="text/css" scope>
.search{
	margin: 30px 20px 30px 50px;
}
 	
</style>