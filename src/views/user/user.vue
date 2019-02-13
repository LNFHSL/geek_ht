<template>
	<div class="user_app">
		<el-row>
		    <el-col :span="24">
		    	<el-row :gutter="20">
				    <el-col :span="4">
				    	<el-select v-model="value" placeholder="请选择">
						    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						    </el-option>
						</el-select> 
				    </el-col>
                    <el-col :span="6">
                    	<el-input v-model="input" v-if="value!=3" placeholder="请输入内容"></el-input>
                    	<el-select v-model="value_two" v-if="value==3" placeholder="请选择">
						    <el-option v-for="item in options_two" :key="item.value" :label="item.label" :value="item.value">
						    </el-option>
						</el-select> 
                    </el-col>
                    <el-col :span="2">
                    	 <el-button type="primary" @click="query">查询</el-button>
                    </el-col>
                    <el-col :span="10">
                    	 <el-button type="info" @click="list_data"  plain>还原</el-button>
                    </el-col>
				</el-row>
		    </el-col>
		</el-row>
		<el-row class="table">
		    <el-col :span="24"> 
		    	<el-table :data="tableData" border style="width: 100%" height="600">
		    		<el-table-column align="center" prop="image" label="头像" width="180">
		    			<template slot-scope="scope">
		    				<img :src="scope.row.image"  min-width="70" height="70" />
		    			</template>
		    		</el-table-column>
				    <el-table-column align="center" prop="username" label="用户名" ></el-table-column>
				    <el-table-column align="center" prop="mobile" label="手机号码" ></el-table-column>
				    <el-table-column align="center" prop="type" label="用户类型" ></el-table-column>
				    <el-table-column align="center" prop="name" label="用户VIP" ></el-table-column>
				    <el-table-column align="center" prop="score" label="积分" ></el-table-column>
				    <el-table-column align="center" prop="money" label="金钱/￥" ></el-table-column>
				    <el-table-column align="center" label="操作" >
				    	<template slot-scope="scope">
				    	    <el-button type="primary" icon="el-icon-edit" @click="edit(scope)" circle></el-button>
				    	</template>
				    </el-table-column>
				</el-table>
		    </el-col>
		</el-row>
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
				options:[{value:'1',label:'用户名'},{value:'2',label:'联系电话'},{value:'3',label:'用户类型'},],
				options_two:[{value:'1',label:'普通会员'},{value:'2',label:'商家'},{value:'3',label:'合伙人'},],
				value:'',
				value_two:'',
				input:'',
				tableData:[],
				goods_page:[],
			}
		},
		created(){
			this.list_data()
		},
		methods:{
			list_data(){
				this.$http.post(this.URL+"/index.php/api/geek_qt/user_list")
				.then(res=>{
					for(let i=0;i<res.data.data.length;i++){
						
						if(res.data.data[i].type == 1){
							res.data.data[i].type='普通会员'
						}else if(res.data.data[i].type == 2){
							res.data.data[i].type='商家'
						}else if(res.data.data[i].type == 3){
							res.data.data[i].type='合伙人'
						}
						
						if(res.data.data [i].name == null){
							res.data.data[i].name ='普通用户'
						}
					}
						
					console.log(res.data.data)
					this.tableData=res.data.data
					this.goods_page=res.data
				})
			},
			
			
			
		    edit(data){
		    	this.$router.push({path: '/user/user_edit',query:{id:data.row.id}})
		    },
		    query(){
		    	if(this.value==''){
		    		this.$message({ message: '请选择一个查询类型', type: 'warning'});
		    	}else if(this.value_two == ''){
		    		this.$message({ message: '内容不能为空', type: 'warning'});
		    	}
		    	this.$http.post(this.URL+"/index.php/api/geek_qt/query_user_list",{
		    		classify:this.value,
		    		classify_two:this.value_two,
		    		input:this.input,
		    		
		    	}).then(res=>{
		    		for(let i=0;i<res.data.length;i++){
						
						if(res.data[i].type == 1){
							res.data[i].type='普通会员'
						}else if(res.data[i].type == 2){
							res.data[i].type='商家'
						}else if(res.data[i].type == 3){
							res.data[i].type='合伙人'
						}
						if(res.data[i].name == null){	
							res.data[i].name ='普通用户'
						}
					}
		    		console.log(res.data)
		    		this.tableData=res.data
		    	})
		    },
		    handleCurrentChange(){
		     //	console.log(this.goods_page.current_page)
		     	this.$http.post(this.URL+"/index.php/api/geek_qt/user_list",{
		     		page:this.goods_page.current_page
		     	})
		     	.then((res)=>{
		     //   console.log(res.data.data)
			        this.goods_page=res.data.data
		     	})
		    }
		    
		}
	}
</script>

<style scoped>
.user_app{
	margin:20px 60px;
}
.table{
	margin-top: 30px;
}
.fls{
	display: flex !important; 
	justify-content: center !important;
	z-index: 99;
}
</style>