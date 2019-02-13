<template>
	<div class="Announcement_app">
		<el-row>
		    <el-col :span="24" class="head_two">
		    	 <el-button type="primary" v-if="state == 1" round @click="change(1)">已推荐通告</el-button>
		    	 <el-button type="primary" v-if="state == 2" round @click="change(2)">推荐通告</el-button>
		  	</el-col>
		</el-row>
		<el-row>
			<el-col :span="24" v-if="state == 1">
				<el-table :data="data" height="580"   border style="width: 100%">
				    <el-table-column align="center" prop="thumb" label="图片" width="150">
				    	<template   slot-scope="scope">            
				           <img :src="scope.row.thumb"  min-width="50" height="70" />
				        </template>  
				    </el-table-column>
				       
				    <el-table-column align="center" prop="title" label="标题" ></el-table-column>
				    <el-table-column align="center" prop="people" label="参加人数" sortable ></el-table-column>
				    <el-table-column align="center" prop="createtime" label="创建时间" sortable></el-table-column>
				    <el-table-column align="center" prop="endtime" label="截止时间" sortable ></el-table-column>
				    <el-table-column align="center" prop="status" label="状态" sortable ></el-table-column>
				    <el-table-column align="center" prop="endtime" label="详细信息" >
				    	<template slot-scope="scope">
					       <el-button size="mini" @click="details(scope.row)">详情</el-button>
					    </template>
				    </el-table-column>
				    
				    <el-table-column align="center" label="是否推荐" >
				    	<template slot-scope="scope">
					       <el-button size="mini" type="success" @click="Recommend(scope.$index,scope.row,1)">推荐</el-button>
					    </template>
				    </el-table-column>
				   
				</el-table>	
		    </el-col>
		</el-row>
		<el-row>
			<el-col :span="24" v-if="state == 2">
				<el-table :data="data_wc" height="580"   border style="width: 100%">
				    <el-table-column align="center" prop="thumb" label="图片" width="150">
				    	<template   slot-scope="scope">            
				           <img :src="scope.row.thumb"  min-width="50" height="70" />
				        </template>  
				    </el-table-column>
				    <el-table-column align="center" prop="title" label="标题" ></el-table-column>
				    <el-table-column align="center" prop="people" label="参加人数" sortable ></el-table-column>
				    <el-table-column align="center" prop="createtime" label="创建时间" sortable></el-table-column>
				    <el-table-column align="center" prop="endtime" label="截止时间" sortable ></el-table-column>
				    <el-table-column align="center" prop="status" label="状态" sortable ></el-table-column>
				    <el-table-column align="center" prop="endtime" label="详细信息" >
				    	<template slot-scope="scope">
					       <el-button size="mini" @click="details(scope.row)">详情</el-button>
					    </template>
				    </el-table-column>
				    
				    <el-table-column align="center" label="是否推荐" >
				    	<template slot-scope="scope">
					       <el-button size="mini" type="success" @click="Recommend(scope.$index,scope.row,2)">取消推荐</el-button>
					    </template>
				    </el-table-column>
				   
				</el-table>	
		    </el-col>
		</el-row>
		            <el-dialog title="详情" :visible.sync="dialogVisible" width="50%"> <!-- 详情 -->
						<el-row >
							<el-col :offset="2" :span="3" class="title">标题</el-col>
							<el-col :span="8">{{details_two.title}}</el-col>
							<el-col :span="3" class="title">通告类型</el-col>
							<el-col :span="5">{{details_two.film}}</el-col>
						</el-row>
						<el-row class="block">
							<el-col :offset="2" :span="3" class="title">类型</el-col>
							<el-col :span="8">{{details_two.type}}</el-col>
							<el-col :span="3" class="title">招募地址</el-col>
							<el-col :span="5">{{details_two.place}}</el-col>
						</el-row>
						<el-row class="block">
							<el-col :offset="2" :span="3" class="title">电话</el-col>
						    <el-col :span="8">{{details_two.connact}}</el-col>
							<el-col :span="3" class="title">金额</el-col>
							<el-col :span="5" v-if=" details_two.money != null">{{details_two.money}}元</el-col>
							<el-col :span="5" v-if=" details_two.money == null">无</el-col>
						</el-row>
						<el-row class="block">
							<el-col :offset="2" :span="3" class="title">联系人</el-col>
						    <el-col :span="8">{{details_two.connactName}}</el-col>
						</el-row>
						<el-row class="block">
							<el-col :offset="2" :span="3" class="title">内容详情</el-col>
							<el-col :span="16" v-html="details_two.content">{{details_two.content}}</el-col>
						</el-row>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="dialogVisible = false">确定</el-button>
							</span>
					</el-dialog>      
	</div>	
</template>

<script>
	export default{
		data(){
			return{
				state:1,
				data:[],
				data_wc:[],
				details_two:'',
				dialogVisible: false,
			}
		},
		created(){
			this.no_recommend()
		},
		methods:{
			no_recommend(){
				this.$http.post(this.URL+"/index.php/api/geek_home/Announcements")
	    		.then((res)=>{
	    			for(let i=0;i<res.data.length;i++){
	    				if(res.data[i]['status']==2){
	    					res.data[i]['status']='报名中'
	    				}else if(res.data[i]['status']==3){
	    					res.data[i]['status']='进行中'
	    				}else if(res.data[i]['status']==4){
	    					res.data[i]['status']='已结束'
	    				}
	    			}
	    			this.data=res.data
	    			console.log(res.data)
	    		})
				
				
			},
			change(state){
				if(state == 1){
					this.state=2
					this.$http.post(this.URL+"/index.php/api/geek_home/details_r")
		    		.then((res)=>{
		    			for(let i=0;i<res.data.length;i++){
		    				if(res.data[i]['status']==2){
		    					res.data[i]['status']='报名中'
		    				}else if(res.data[i]['status']==3){
		    					res.data[i]['status']='进行中'
		    				}else if(res.data[i]['status']==4){
		    					res.data[i]['status']='已结束'
		    				}
		    			}
		    			this.data_wc=res.data
		    		})	
		    			
					
				}else{
					this.state=1
					this.no_recommend()
				}
			},
			Recommend(index,data,state_two){
				if(state_two == 1){
					this.$confirm('确定推荐吗', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'success'
				       }).then(() => {
				        	this.$http.post(this.URL+"/index.php/api/geek_home/Recommends",{
							id:data.id,state:state_two
							})
							.then(res=>{
								console.log(res.data)
								if(res.data == 1){
									this.data.splice(index,1)
									this.$message({ type: 'success', message: '操作成功!'});
								}else{
									this.$message.error('操作失败');
								}
								
							})	
				       })
				}
				else if(state_two == 2){
					this.$confirm('确定取消推荐吗', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'success'
				       }).then(() => {
				        	this.$http.post(this.URL+"/index.php/api/geek_home/Recommends",{
							id:data.id,state:state_two
							})
							.then(res=>{
								console.log(res.data)
								if(res.data == 1){
									this.data_wc.splice(index,1)
									this.$message({ type: 'success', message: '操作成功!'});
								}else{
									this.$message.error('操作失败');
								}
								
							})	
				       })
				}
				
				
				
				
				
				
				
			       
			       
			},
			details(data){  //查看详情
//				console.log(data)
		    	this.dialogVisible = true,
		    	this.details_two=data
		    },
		    
		
		}
		
		
		
	}
</script>

<style scoped="scoped">
.Announcement_app{
	margin: 0 60px;
}
.head_two{
	padding-bottom: 15px;
	padding-top: 15px;
}	
.title{
	color: #8C939D;
}
.block{
	margin-top:20px;
}
</style>