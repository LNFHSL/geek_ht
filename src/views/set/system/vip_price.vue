<template>
	<div class="apps">
		<!-- vip -->
	    <el-row :gutter="20" v-if="state ==1" >
		  <el-col :span="8"><el-input v-model="name" placeholder="vip的名字，例如vip、svip" ></el-input></el-col>
		  <el-col :span="8"><el-input v-model="price" placeholder="价格" oninput ="value=value.replace(/[^\d.]/g,'')"></el-input></el-col>
		  <el-col :span="4"><el-button type="primary" @click="vip">提交</el-button></el-col>
		  <el-col :span="4"><el-button type="primary" @click="View_members(state)" round>查看会员</el-button></el-col>
		</el-row>
		
		<el-row class="xianshi" v-if="state ==1">
			<el-col :span="24">
				<template>
					<el-table :data="vip_data" border style="width: 100%">
					   <el-table-column prop="name" label="名字" ></el-table-column>
					   <el-table-column prop="price" label="价格/￥" ></el-table-column>
					   <el-table-column label="操作" >
					   	  <template slot-scope="scope">
						        <el-button size="mini" type="danger" @click="deletes(scope.$index, scope.row)">删除</el-button>
						  </template>
					   </el-table-column>
					</el-table>
				</template>
			</el-col>
		</el-row>
		
		<!-- 用户会员 -->
		<el-row :gutter="20" v-if="state ==2" >
		    <el-col :span="4">
                <el-select v-model="label" placeholder="请选择">
               <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        	  </el-select>
		    </el-col>
		    <el-col :span="8"><el-input v-model="username" placeholder="请选择" ></el-input></el-col>
		    <el-col :span="4"><el-button type="primary" @click="user_query">查询</el-button></el-col>
		    <el-col :span="4" :offset="4"><el-button class="button" type="primary" @click="View_members(state)" round >vip管理</el-button></el-col>
		</el-row>
		
		<el-row class="xianshi" v-if="state ==2">
			<el-col :span="24">
				<template>
					<el-table :data="user_data" border style="width: 100%">
					   <el-table-column prop="username" label="用户名" ></el-table-column>
					   <el-table-column prop="member" label="会员类型" ></el-table-column>
					   <el-table-column label="时间" ></el-table-column>
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
			  name:'',
			  price:'',
			  username:'',
			  member:'',
			  vip_data:[],
			  user_data:[],
			  state:1,
			  label:'',
			  options: [{value: '1',label: '用户名'}, {value: '2',label: '会员类型'}],
			}
		},
		created(){
			this.display_vip()
			this.display_user()
		},
		methods:{
			vip(){  //添加vip
				if(this.name == ''){
					this.$message({ message: 'vip名字不能为空',type: 'warning' })
				}
				else if(this.price == ''){
					this.$message({ message: '价格不能为空',type: 'warning' })
				}
				else{
					this.$http.post(this.URL+'/index.php/api/geek_qt/vip',{
						name:this.name,price:this.price})
			    	.then((res)=>{
			    		  this.name=''
			    		  this.price=''
			    		  this.$message({showClose: true,message: '提交成功',type: 'success' })
			    		  this.display_vip()
			    	})
		        }
			},
			user_query(){  //查询vip用户
				
			},
			display_vip(){ //遍历vip
				this.$http.post(this.URL+'/index.php/api/geek_qt/display_vip')
		    	.then((res)=>{
		    		 console.log(res.data)
		    		 this.vip_data=res.data
		    	})
			},
			display_user(){ //遍历vip用户
				this.$http.post(this.URL+'/index.php/api/geek_qt/display_user')
		    	.then((res)=>{
		    		 console.log(res.data)
		    		 this.user_data=res.data
		    	})
			},
			deletes(index,data){  //删除vip  
		     	this.$confirm('确认删除吗') 
		     	.then(_ => { 
		     		console.log(index)
		     		    this.$http.post(this.URL+"/index.php/api/geek_qt/delete_vip",{
		     		    	id:data.id
		     		    }).then((res)=>{
		     		    	console.log(res.data)
		     		    	 if(res.data == 1){
		     		    	 	this.vip_data.splice(index,1)
		     		    	 	this.$message({message: '删除成功',type: 'success'});
		     		    	 }else{
		     		    	  this.$message.error('删除失败');
		     		    	 }
		     		    	
		     		    })
		     	})
		       .catch(_ => {});
		     },
		     View_members(state){
		       if(state==1){
		       	   this.state=2
		       }else{
		       	 this.state=1
		       }
		     }
			
			
		}
		
		
	}
</script>

<style scope>
	.apps{
		margin: 20px 60px;
	}
	.xianshi{
		margin-top: 30px;
	}
	.button{
		width:104px;
	}
</style>