<template>
	<div class="user_edit_app">
		<el-row>
		    <el-col :span="10">
		    	<el-row>
					<el-col :offset="6" :span="24" class="title_name"><span>通告封面</span></el-col>
					<el-col :offset="6" :span="24"><imgs :image="image" @receiveimg="receive_img"></imgs></el-col>
				</el-row>
				<el-row class="block">
				    <el-col :offset="6" :span="24" class="title_name"><span>用户类型</span></el-col>
				    <el-col :offset="6" :span="24">
				    	 <el-select v-model="type" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
				    </el-col>
				</el-row>
		    </el-col>
		    
		    <el-col :span="14">
		    	<el-row class="block">
				    <el-col :span="24" class="title_name"><span>用户名</span></el-col>
				    <el-col :span="24"><el-input v-model="username" class="input" placeholder="请输入用户名"></el-input></el-col>
				</el-row>
				<el-row>
				    <el-col :span="24" class="title_name"><span>手机号码</span></el-col>
				    <el-col :span="24"><el-input v-model="mobile" class="input" placeholder="请输入手机号码"></el-input></el-col>
				</el-row>
				<el-row class="block">
				    <el-col :span="24" class="title_name"><span>积分</span></el-col>
				    <el-col :span="24"><el-input v-model="score" class="input" placeholder="请输入积分"></el-input></el-col>
				</el-row>
				<el-row>
				    <el-col :span="24" class="title_name"><span>金额</span></el-col>
				    <el-col :span="24"><el-input v-model="money" class="input" placeholder="请输入金额"></el-input></el-col>
				</el-row>
				
				
		    </el-col>
		</el-row>
		<br>
		<el-row>
		  <el-col :span="19"><el-button class="button" type="success" @click="modify" >提交</el-button></el-col>
		  <el-col :span="2"><el-button class="button" type="primary" @click="returns" >返回</el-button></el-col>
		</el-row>
		
	</div>
</template>

<script>
import imgs from '../../components/upimage'	
	export default{
		components:{
			imgs
		},
		data(){
			return{
				id:'',
				options:[{label:'普通用户',value:1},{label:'商家',value:2},{label:'合伙人',value:3}],
				username:'',
				mobile:'',
				score:'',
				money:'',
				type:'',
				image:'',

			}
		},
		created(){
			this.id = this.$route.query.id 
			
			 this.$http.post(this.URL+"/index.php/api/geek_qt/user_edit",{
			 	id:this.id
			 })
		    .then((res)=>{
		    	console.log(res.data)
		            this.username=res.data.username,
		            this.mobile=res.data.mobile,
		            this.score=res.data.score,
		            this.money=res.data.money,
		            this.type=res.data.type,
		            this.image=res.data.image
			 })

		    
		},
		methods:{
			receive_img(data){ //子组件拿的图片
			 this.img=data
			},
			returns(){
				this.$router.go(-1)
			},
			modify(){
				   this.$confirm('确认修改吗?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
						this.$http.post(this.URL+"/index.php/api/geek_qt/modify_edit",{
							id:this.$route.query.id,
					        username:this.username,
				            mobile:this.mobile,
				            score:this.score,
				            money:this.money,
				            type:this.type,
				            image:this.image
						}).then(res=>{
							if(res.data== 1){
								      this.$message({ message: '提交成功', type: 'success'});
							}else{
								this.$message.error('提交失败');
							}
						});
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消'
			          });          
			        });
				
				
				
				
				
				

				
			}	
		}
		
	}
</script>

<style scoped>
.user_edit_app{
	margin:20px 60px;
}
.title_name{
	margin-bottom:10px;
}
.block{
	margin-top: 20px;
	margin-bottom: 30px;
}
.input{
	width: 600px;
}
.button{
	float: right;
}
span{
	color:  #454545;
}
</style>