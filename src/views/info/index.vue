<template>
	<div class="app">
		<el-row>
		  <el-col :span="24"><el-input v-model="title" placeholder="请输入标题"></el-input></el-col>
		</el-row>
		<el-row>
		  <el-col :span="24"><el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="content"></el-input></el-col>
		</el-row>
		<el-row>
		  <el-col :span="24"><el-button type="primary" class="tj" @click="info">提交</el-button></el-col>
		</el-row>
		<el-row>
		  <el-col :span="24" class="content">
		  	<template>
		  		
			  <el-table :data="infos" border style="width: 100%">
			  	<el-table-column prop="createtime" label="日期" width="200"></el-table-column>
			  	
			    <el-table-column prop="title" label="标题" width="220"></el-table-column>
			    
			    <el-table-column prop="content" label="内容" width="550" class="content"></el-table-column>
			    <el-table-column label="操作" >
				      <template slot-scope="scope">
					        <el-button size="mini" type="danger" @click="deletes(scope.$index, scope.row)">删除</el-button>
				      </template>
				      
			    </el-table-column>
			  </el-table>
			  
			</template>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				title:'',
				content:'',
				infos:[]
			}
		},
		created(){
			this.display_info()
		},
		methods:{
			info(){
				if(this.title=='' && this.content==''){
					    this.$message({ message: '不能为空',type: 'warning'});
					}
				else{
						this.$http.post(this.URL+'/index.php/api/geek_qt/send_info',{
							title:this.title,
							content:this.content
						}).then((res)=>{
							this.title='',
						    this.content='',
						    this.$message({ message: '上传成功',type: 'success'});
						    this.display_info()
						})
				    }
			},
			display_info(){
				this.$http.post(this.URL+'/index.php/api/geek_qt/display_info',{
					
				}).then((res)=>{
						this.infos=res.data,
						console.log(res.data)	
				   })
			},
			deletes(index,data){
		     	this.$confirm('确认删除吗') 
		     	.then(_ => { 
		     		    this.$http.post(this.URL+"/index.php/api/geek_qt/delete_info",{
		     		    	id:data.id
		     		    }).then((res)=>{
		     		    	 if(res.data == 1){
		     		    	 	this.infos.splice(index,1)
		     		    	 	this.$message({message: '删除成功',type: 'success'});
		     		    	 }else{
		     		    	  this.$message.error('删除失败');
		     		    	 }
		     		    	
					     		    })
					     	})
					       .catch(_ => {});
					     },
			
		}
	}
</script>

<style scope>
.app{
	margin: 0 100px;
}
.tj{
	float: right;
}
.el-row{
	margin: 10px 0;
}
.content{
	margin-top:50px;
}
</style> 