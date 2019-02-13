<template>
	<div class="no_app">
		<el-row>
		    <el-col :span="5" class="content">
		    	<el-input v-model="content" placeholder="搜索用户名"></el-input>
		    </el-col>
		    <el-col :span="2">
		    	<el-button type="primary" @click="query">查询</el-button>
		    </el-col>
		    <el-col :span="11">
		    	<el-button type="info" @click="reduction">还原</el-button>
		    </el-col>
		</el-row>
		<el-row>
		    <el-col :span="24" class="table_content">
		    	<el-table :data="pay_list" border style="width: 100%">
		    		<el-table-column align="center" prop="title" label="标题" width="200"></el-table-column>
		    		<el-table-column align="center" prop="film" label="类型" width="200"></el-table-column>
		    		<el-table-column align="center" prop="username" label="用户名"></el-table-column>
                    <el-table-column align="center" prop="createtime" label="日期" sortable ></el-table-column>
                    <el-table-column align="center" prop="money" label="支付金额/￥" width="200" ></el-table-column>
				</el-table>
		    </el-col>
		</el-row>
		<div  class="fls">
	    <el-pagination
	    	 v-if="state==1"
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
				content:'',
				pay_list:[],
				goods_page:[],
				state:1,
			}
		},
		created(){
			this.pay()
		},
		methods:{
			pay(){
				this.$http.post(this.URL+'/index.php/api/geek_pay/weixin_notifys')
				.then(res=>{
					//console.log(res.data.data)
					for(let i=0;i<res.data.data.length;i++){
						if(res.data.data[i].uid==0){
							res.data.data[i].username='系统发布'
						}
		    		 }
					this.pay_list=res.data.data
					this.goods_page=res.data
					this.state=1
				})
			},
			query(){
				this.$http.post(this.URL+'/index.php/api/geek_pay/query_notifys',{
					content:this.content
				})
				.then(res=>{
					for(let i=0;i<res.data.length;i++){
						if(res.data[i].uid==0){
							res.data[i].username='系统发布'
						}
		    		 }
					console.log(res.data)
					this.pay_list=res.data
					this.state=2
				})
			},
			 handleCurrentChange(){
		     	this.$http.post(this.URL+"/index.php/api/geek_pay/weixin_notifys",{
		     		page:this.goods_page.current_page
		     	})
		     	.then((res)=>{
		     		for(let i=0;i<res.data.data.length;i++){
						if(res.data.data[i].uid==0){
							res.data.data[i].username='系统发布'
						}
		    		 }
			        this.pay_list=res.data.data
			        this.state=1
		     	})
		     },
		     reduction(){
		     	this.pay()
		     	this.state=1
		     }
		}
	}
</script>

<style scoped="scoped">
.no_app{
	margin: 20px 60px;
}
.content{
	margin-right:6px;
}
.table_content{
	margin-top: 15px;
}
.fls{
	display: flex !important; 
	justify-content: center !important;
	z-index: 99;
}
</style>