<template>
	<div class="app">
		<el-header >
		    <el-row :gutter="20" class="head" >
		      <el-col :span="2" class="tj">添加</el-col>
              <el-col :span="5"><el-input v-model="input" placeholder="请输入分类"></el-input></el-col>
              <el-col :span="5"><el-button type="primary" plain @click="sub">提交</el-button></el-col>
			</el-row> 
		</el-header>
		<el-main>
			<el-table :data="options" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
			    <el-table-column prop="id" label="ID" sortable width="180"></el-table-column>
			   
			    <el-table-column prop="classify" label="分类" sortable ></el-table-column>
			    
			    <el-table-column label="操作" width="240">
				      <template slot-scope="scope">
					       <el-button size="mini" type="danger" @click="deletes(scope.$index, scope.row)">删除</el-button>
			 	      </template>
	            </el-table-column>
            </el-table>
            
		</el-main>
	</div>
</template>

<script>
import { getList } from '@/api/table'
 export default {
	data(){
		return{
			input:'',
			options:[]
		}
	},
	created(){
		this.$http.post(this.URL+"/index.php/api/geek_ht/classify")
    .then((res)=>{
	 		this.options=res.data
	 				}) 	
	},
	methods:{
		 deletes(index,data){
     	this.$confirm('确认删除吗') 
     	.then(_ => { 
     		    this.$http.post(this.URL+"/index.php/api/geek_ht/delete_classify",{
     		    	id:data.id
     		    }).then((res)=>{
     		    	 if(res.data == 1){
     		    	 	this.options.splice(index,1)
     		    	 	this.$message({message: '删除成功',type: 'success'});
     		    	 }else{
     		    	  this.$message.error('有此分类的商品');
     		    	 }
     		    	
     		    })
     	})
       .catch(_ => {});
     },
     sub(){
     	this.$http.post(this.URL+"/index.php/api/geek_ht/add_classify",{
     		    	input:this.input
     		    }).then((res)=>{
     		    	this.$http.post(this.URL+"/index.php/api/geek_ht/classify")
   					 .then((res)=>{
	 						this.options=res.data
	 					}) 	
     		    })
     	this.input='';	    
     }
	}
		
		
		
		
 }
</script>

<style>
	.head{
		margin-top: 50px;
		padding-left: 40px;
	}
	.tj{
		margin-top: 10px;
		color: #808080;
	}
</style>