<template>
	<div class="app">
		
		<el-row>
		  <el-col :span="24"><el-input v-model="title" placeholder="请输入菜单名称"></el-input></el-col>
		</el-row>
		<el-row>
		  <el-col :span="24">
				
				 <el-select v-model="parent_id" placeholder="上级菜单">
						<el-option
							v-for="item in options"
							:label="item.menu_name" 
							:value="item.id">
						</el-option>
					</el-select>
			</el-col>
		</el-row>
		<el-row>
		  <el-col :span="24"><el-input placeholder="请输入链接" v-model="content"></el-input></el-col>
		</el-row>
		<el-row>
		  <el-col :span="24"><el-input placeholder="排序：默认1，越小越靠前" v-model="order"></el-input></el-col>
		</el-row>
		<el-alert
    title="公众号最多3个一级菜单，最多5个二级菜单"
    type="warning"
    show-icon>
  </el-alert>
		<el-row>
		  <el-col :span="24"><el-button type="primary" class="tjs" @click="info">提交</el-button></el-col>
		</el-row>
		 
		<el-row>
		  <el-col :span="24" class="content">
		  	<template>
		  		
			  <el-table :data="infos" border style="width: 100%">
			  	
			    <el-table-column prop="menu_name" label="菜单名称"></el-table-column>
			    
			    <el-table-column prop="suoshu" label="所属菜单"  class="content"></el-table-column>
			    <el-table-column  label="链接"  class="content">
						  <template slot-scope="scope">
					        <a :href="scope.row.link" target="_blank">{{scope.row.link}}</a>
				      </template>

					</el-table-column>
					 <el-table-column prop="order" label="排序" class="content"></el-table-column>
			    <el-table-column label="操作" >
				      <template slot-scope="scope">
					        <el-button size="mini" type="danger" @click="deletes(scope.$index, scope.row)">删除</el-button>
				      </template>
				      
			    </el-table-column>
			  </el-table>
			  
			</template>
		  </el-col>
		</el-row>

		<a  class="el-button  el-button--success" :href="api_url+'/api/weixin/menu'" target="_blank">发布菜单到微信</a>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				title:'',
				content:'',
				infos:[],
				parent_id:'',
				api_url:'',
				options:[]
			}
		},
		created(){
			this.display_info()
			this.api_url  = this.URL
		},
		methods:{
			info(){
				if(this.title=='' && this.content==''){
					    this.$message({ message: '不能为空',type: 'warning'});
					}
				else{
						this.$http.post(this.URL+'/index.php/api/geek_qt/weixin_menu_save',{
							menu_name:this.title,
							order:this.order,
							parent_id:this.parent_id,
							link:this.content
						}).then((res)=>{
							this.title='',
						    this.content='',
						    this.$message({ message: '添加成功',type: 'success'});
						    this.display_info()
						})
				    }
			},
			display_info(){
				this.$http.post(this.URL+'/index.php/api/geek_qt/weixin_menu_list',{
					
				}).then((res)=>{
					  
					 this.options = 	this.infos=res.data 
				   })
			},
			deletes(index,data){
		     	this.$confirm('确认删除吗') 
		     	.then(_ => { 
		     		    this.$http.post(this.URL+"/index.php/api/geek_qt/weixin_menu_del",{
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
.tjs{
	float: right;
}
.el-row{
	margin: 10px 0;
}
.content{
	margin-top:50px;
}
</style> 