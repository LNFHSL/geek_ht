<template>
	<div class="report_app">
	    <div class="head">
	    	<el-row :gutter="10">
				<el-col :span="3" v-if="state == 1 "><el-button type="primary" round @click="change_state(1)">已处理</el-button></el-col>
				<el-col :span="3" v-if="state == 2 || state==3"><el-button type="primary" round @click="change_state(2)">未处理</el-button></el-col>
				<el-col :span="3" v-if="state == 1"><el-button type="primary" round @click="change_state_mb(3)">回复信息模版</el-button></el-col>
			</el-row>
	    </div>
	        <el-row>
	        	<el-col :span="24">
	        		<div class="content">
				    	<div v-if="state == 1">
								<el-table class="table" height="480" :data="data" border style="width: 100%">
									<el-table-column align="center" prop="title" label="标题" width="300"></el-table-column>
									<el-table-column align="center" prop="content" label="内容" ></el-table-column>
									<el-table-column align="center" prop="time" label="日期" width="120"></el-table-column>
									<el-table-column align="center" prop="date" label="被举报人详情" width="130">
										<template slot-scope="scope">
									        <el-button size="mini" type="primary" @click="details_r(scope.row)">详情</el-button>
									    </template>
									</el-table-column>
								    <el-table-column align="center" label="操作" width="180" >
								    	<template slot-scope="scope">
									        <el-button size="mini" type="success" @click="choice(scope.$index, scope.row,1)">确认</el-button>
									        <el-button size="mini" type="danger" @click="choice(scope.$index, scope.row,2)">举报有误</el-button>
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
				        <div v-if="state == 2">
								<el-table class="table" height="480" :data="data_wc" border style="width: 100%">
									<el-table-column align="center" prop="title" label="标题" width="300"></el-table-column>
									<el-table-column align="center" prop="content" label="内容" ></el-table-column>
									<el-table-column align="center" prop="time" label="日期" width="120"></el-table-column>
									<el-table-column align="center" prop="date" label="被举报人详情" width="130">
										<template slot-scope="scope">
									        <el-button size="mini" type="primary" @click="details_r(scope.row)">详情</el-button>
									    </template>
									</el-table-column>
								    <el-table-column align="center" label="操作" width="180" >
								    	<template slot-scope="scope">
									        <el-button size="mini" type="success" v-if="scope.row.state == 1" >举报成功</el-button>
									        <el-button size="mini" type="danger"  v-if="scope.row.state == 2">举报有误</el-button>
									        </template>
								    </el-table-column>
								</el-table>
								<div  class="fls">
								    <el-pagination
										  :page-size="goods_page_wc.per_page"
										   layout="prev, pager, next"
										  :total="goods_page_wc.total"
										  :current-page.sync="goods_page_wc.current_page" 
										  @current-change="handleCurrentChange_wc">
										</el-pagination>
										<!--
										page-size  
										current-page.sync 当前页数-->
								</div>
				    	</div>
				    	<div v-if="state == 3"> <!-- 回复信息模版 -->
				    		<el-row :gutter="20">
							  <el-col :span="6"><div class="titles">对举报人发送的信息:</div></el-col>
							</el-row>
							<el-row>
								<el-col :span="24" class="content_two">
								  	<el-input v-model="input" placeholder="请输入内容"></el-input>
								</el-col>
								<el-col :span="24" class="content_two">
								  	<el-input  type="textarea" :rows="8" placeholder="请输入内容" v-model="textarea">
									</el-input>
								</el-col>
								<el-col :span="24"  >
									<el-button type="primary" class="tj" @click="set_template">提交</el-button>
								</el-col>
							</el-row>
							<el-row :gutter="20">
							  <el-col :span="6"><div class="titles">对被举报的人发送的信息:</div></el-col>
							</el-row>
							<el-row>
								<el-col :span="24" class="content_two">
								  	<el-input v-model="input_two" placeholder="请输入内容"></el-input>
								</el-col>
								<el-col :span="24" class="content_two">
								  	<el-input  type="textarea" :rows="8" placeholder="请输入内容" v-model="textarea_two">
									</el-input>
								</el-col>
								<el-col :span="24"  >
									<el-button type="primary" class="tj" @click="set_template_two">提交</el-button>
								</el-col>
							</el-row>
							
				    	</div>  
				    </div>
	        		<el-dialog title="详情" :visible.sync="dialogVisible" width="50%"> <!-- 详情 -->
						<el-row >
							<el-col :offset="2" :span="3" class="title">标题</el-col>
							<el-col :span="8">{{details_two.title}}</el-col>
							<el-col :span="3" class="title">通告类型</el-col>
							<el-col :span="5">{{details_two.film}}</el-col>
						</el-row>
						<el-row class="block">
							<el-col :offset="2" :span="3" class="title">时间</el-col>
							<el-col :span="8">{{details_two.endtime}}</el-col>
							<el-col :span="3" class="title">招募地址</el-col>
							<el-col :span="5">{{details_two.place}}</el-col>
						</el-row>
						<el-row class="block">
							<el-col :offset="2" :span="3" class="title">电话</el-col>
						    <el-col :span="8">{{details_two.connact}}</el-col>
							<el-col :span="3" class="title">类型</el-col>
							<el-col :span="5">{{details_two.type}}</el-col>
						</el-row>
						<el-row class="block">
							<el-col :offset="2" :span="3" class="title">内容详情</el-col>
							<el-col :span="16" v-html="details_two.content">{{details_two.content}}</el-col>
						</el-row>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
							</span>
					</el-dialog>
	        		
	        	</el-col>
	        </el-row>
	    
	</div>
</template>

<script>
	export default{
		data(){
			return{
				state:1,
				textarea:'',
				textarea_two:'',
				jb:'jb',
				bjb:'bjb',
				data:[],
				data_wc:[],
				goods_page:[],
				goods_page_wc:[],
				dialogVisible: false,
				details_two:'',
				input_two:'',
				input:''
			}
		},
		created(){
			this.$http.post(this.URL+"/index.php/api/geek_notice/reports",{//后台举报
					type:1
				})
			.then(res=>{
				console.log(res.data)
				for(let i=0;i<res.data.data.length;i++){
					res.data.data[i]['title']=JSON.parse(res.data.data[i]['title'])
				}
				this.data=res.data.data
				this.goods_page=res.data
				})
		},
		methods:{
			choice(index,data,state){
				console.log(index,data,state)
				if(state== 2){
					 this.$confirm('确定举报有误吗', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	this.$http.post(this.URL+"/index.php/api/geek_notice/judge",{
						state:2,id:data.id
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
				}else if(state== 1){
					 this.$confirm('确定举报成功吗', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'success'
			        }).then(() => {
			        	this.$http.post(this.URL+"/index.php/api/geek_notice/judge",{
						state:1,id:data.id,
						report_id:data.report_id,
						Article_id:data.Article_id
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
				
		    },
		    details_r(data){  //查看详情
		    	this.dialogVisible = true,
		    	this.$http.post(this.URL+"/index.php/api/geek_notice/details",{
                     id:data.Article_id
				})
				.then(res=>{
					res.data['endtime']=res.data['endtime'].substr(0,10)
					
					this.details_two=res.data
					//console.log(res.data)
				})
		    	
		    },

			set_template(){  //上传举报信息模版
				this.$http.post(this.URL+"/index.php/api/geek_notice/set_templates",{
					type:this.jb,
					title:this.input,
					info_template:this.textarea
				})
				.then(res=>{
					console.log(res.data)
					if(res.data == 1){
						this.$message({ message: '上传成功', type: 'success'})
					}else{
						   this.$message.error('上传失败');
					}
					
				})
			},
			set_template_two(){ //上传被举报信息模版
				this.$http.post(this.URL+"/index.php/api/geek_notice/set_templates",{
					type:this.bjb,
					title:this.input_two,
					info_template:this.textarea_two
				})
				.then(res=>{
					console.log(res.data)
					if(res.data == 1){
						this.$message({ message: '上传成功', type: 'success'})
					}else{
						   this.$message.error('上传失败');
					}
					
				})
			},
			
			change_state(state){  //完成举报
				if(state==1){
					this.state=2
					this.$http.post(this.URL+"/index.php/api/geek_notice/reports_wc",{ //完成举报判断
						type:1
					})
					.then(res=>{
						console.log(res.data)
						for(let i=0;i<res.data.data.length;i++){
							res.data.data[i]['title']=JSON.parse(res.data.data[i]['title'])
						}
						this.data_wc=res.data.data
						this.goods_page_wc=res.data
					})
				}else if(state == 2){
					this.state=1
					
					
				}
			},
			change_state_mb(state){  //切换到模版
				this.state=3
				this.$http.post(this.URL+"/index.php/api/geek_notice/template",{ //信息模版
					type:this.jb
				})
				.then(res=>{
					console.log(res.data)
					if(res.data == '' || res.data == null){
						this.input='无'
						this.textarea='无'
					}else{
						this.input=res.data.title
						this.textarea=res.data.info_template
					}
					
				})
				
				this.$http.post(this.URL+"/index.php/api/geek_notice/template_two",{ //信息模版
					type:this.bjb
				})
				.then(res=>{
					console.log(res.data)
					if(res.data == '' || res.data == null){
						this.input_two='无'
						this.textarea_two='无'
					}else{
						this.input_two=res.data.title
						this.textarea_two=res.data.info_template
					}
					
				})
			},
		    handleCurrentChange(){
		     //	console.log(this.goods_page.current_page)
		     	this.$http.post(this.URL+"/index.php/api/geek_notice/reports",{
		     		page:this.goods_page.current_page
		     	})
		     	.then((res)=>{
			     	for(let i=0;i<res.data.data.length;i++){
						res.data.data[i]['title']=JSON.parse(res.data.data[i]['title'])
					}	 
		     //   console.log(res.data.data)
			        this.data=res.data.data
		     	})
		    },
		    handleCurrentChange_wc(){
		     //	console.log(this.goods_page.current_page)
		     	this.$http.post(this.URL+"/index.php/api/geek_notice/reports_wc",{
		     		page:this.goods_page_wc.current_page
		     	})
		     	.then((res)=>{
		     //   console.log(res.data.data)
			        for(let i=0;i<res.data.data.length;i++){
						res.data.data[i]['title']=JSON.parse(res.data.data[i]['title'])
					 }
			        this.data_wc=res.data.data
		     	})
		    }
		}
		
		
	}
</script>

<style scope>
.report_app{
   margin:10px 60px;
}
.titles{
	font-size: 23px;
	margin-top:10px ;
}
.content_two{	
	margin: 20px 0;
}
.tj{
   float: right;
}
.table{
	margin: 20px 0;
}
.fls{
		display: flex !important; 
		justify-content: center !important;
		z-index: 99;
}
.title{
	color: #8C939D;
}
.block{
	margin-top:20px;
}
</style>