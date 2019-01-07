<template>
	<div class="app">
		<el-row>
  		<el-col :span="24"><div @click="returns"><svg-icon class="tb_tp" icon-class="fh"/></div></el-col>
  	</el-row>
		<div class="basic">
	        <el-row>
			  <el-col :span="24"><div class="head">基本信息</div></el-col>
			</el-row>		
			<el-row type="flex" class="row-bg" justify="center">
			  <el-col :span="6"><div class="grid-content bg-purple"></div>姓名：{{list.shopname}}</el-col>
			  <el-col :span="6"><div class="grid-content bg-purple"></div>联系人：{{list.contacter}}</el-col>
			  <el-col :span="6"><div class="grid-content bg-purple"></div>联系电话：{{list.contacttel}}</el-col>	
			</el-row>
			
			<el-row type="flex" class="row-bg" justify="center">
			  <el-col :span="6"><div class="grid-content bg-purple"></div>时间：{{list.date}}</el-col>
			  <el-col :span="6">
			  	<div class="grid-content bg-purple" v-if="list.type == 2">加盟类型：入住机构</div>
			  	<div class="grid-content bg-purple" v-if="list.type == 3">加盟类型：城市合伙人</div>
			  </el-col>
			  <el-col :span="6"><div class="grid-content bg-purple">
			    </div>地址：{{list.province}} {{list.city}} {{list.area}} <div class="xxdz">{{list.address}}</div>
			  </el-col>
			</el-row>
		</div>
		
		<div class="xian"></div>
		
		<div>
			<el-row>
			   <el-col :span="24"><div class="head" v-if="list.type == 2">入住机构</div></el-col>
			   <el-col :span="24"><div class="head" v-if="list.type == 3">城市合伙人</div></el-col>
			</el-row>
			<el-row type="flex" class="row-bg" justify="center">
			  <el-col :span="6"><div class="grid-content bg-purple"></div>生源数量：{{list.students}}</el-col>
			  <el-col :span="6"><div class="grid-content bg-purple"></div>机构课程：{{list.subjects}}</el-col>
			  <el-col :span="6"><div class="grid-content bg-purple"></div>视频地址：<a class="dz" :href="list.movie"  target="_blank">点击查看</a></el-col>
			</el-row>
		</div>	
		
		<div class="xian"></div>
		
		<div>
			<el-row><el-col :span="24"><div class="head">图片</div></el-col></el-row>
			<el-row type="flex" class="row-bg" justify="space-around">
			  <el-col :span="6"><div class="grid">门店照片</div></el-col>
			  <el-col :span="6"><div class="grid">身份证正面</div></el-col>
			  <el-col :span="6"><div class="grid">身份证反面</div></el-col>
			  <el-col :span="6"><div class="grid">营业执照</div></el-col>
			</el-row>
			<el-row type="flex" class="row-bg" justify="space-around"  >
				<el-col :span="6" v-for="item in list.imgs" align="center"><img class="img" :src="url+item.url"/></el-col>
			</el-row>
		</div>
		<el-row>
			<el-col :span="12"><el-button size="mini" class='cg' type="success" @click="choice(list.id,1)">通过</el-button></el-col>
			<el-col :span="12"><el-button size="mini" type="danger"  @click="choice(list.id,2)">未通过</el-button></el-col>
		</el-row>
	</div>
	
</template>

<script>
	
export default{
	data(){
	   return{
	   	list:[],
	   	imgs:[],
	   	url:this.URL
	   }	
	},
	created(){
		this.$http.post(this.URL+"/index.php/api/geek_qt/league_details",{
    	     id:this.$route.query.id
		    })
		    .then((res)=>{
				res.data['imgs']=JSON.parse(JSON.parse(res.data['imgs']))
				console.log(res.data.imgs)
				this.list=res.data
			})	
	},
	methods:{
		choice(id,state){
	     	if(state==1){
	     		this.$confirm('确认通过吗') 
			     	.then(_ => {
			     		 this.$http.post(this.URL+"/index.php/api/geek_qt/operation",{
			     		 	state:state,id:id
			     		 }).then((res)=>{
	     		    	 if(res.data == 1){
	     		    	 	this.$message({message: '成功',type: 'success'});
	     		    	 	this.$router.go(-1)
	     		    	 }else{
	     		    	  this.$message.error('失败');
	     		    	 }
	     		    	
	     		    })
			     	})
			      .catch(_ => {});
			     }
			  if(state==2){
			    this.$confirm('确认未通过吗') 
			     	.then(_ => {
				     		 this.$http.post(this.URL+"/index.php/api/geek_qt/operation",{
				     		 	state:state,id:id
				     		 }).then((res)=>{
		     		    	 if(res.data == 1){
		     		    	 	this.$message({message: '成功',type: 'success'});
		     		    	 	this.$router.go(-1)
		     		    	 }else{
		     		    	  this.$message.error('失败');
		     		    	 }
		     		    	
		     		    })
			     	})
			      .catch(_ => {});
			     }
		 },
		returns(){
			this.$router.go(-1)
		}
		
	}
}

</script>

<style scope>
.head{font-size: 20px;margin-left: 30px;}
.basic{margin-bottom: 10px;}
.el-row{margin: 20px 0;}
.xxdz{margin-left:50px;margin-top: 2px;}
.xian{width: 100%;height: 1px;background: gainsboro;}
.dz{color: blue;}
.img{height: 200px;width: 200px;}
.cg{float: right;margin-right:50px;width: 70px;}
.tb_tp{font-size: 30px;margin-left:30px;}
.grid{margin-left:58px;color: #636363;}
</style>