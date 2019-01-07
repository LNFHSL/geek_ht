<template>
	<div class="app">
		<el-row>
  		<el-col :span="24"><div @click="returns"><svg-icon class="tb_tp" icon-class="fh"/></div></el-col>
  	</el-row>
		<el-row>
		    <el-col :span="6"><div class="head_img"><img class="img" :src="children.headpic"/></div></el-col>
		    <el-col :span="18" >
		    	<el-row>
				    <el-col :span="8"><div class="head_name">称呼：{{children.name}}</div></el-col>
				    <el-col :span="8"><div class="head_name">生日：{{children.brithday}}</div></el-col>
				    <el-col :span="8"><div class="head_name">性别：{{children.sex}}</div></el-col>
				</el-row>
				<el-row class="info">
				    <el-col :span="8"><div class="head_name">体重：{{children.weight}}kg</div></el-col>
				    <el-col :span="8"><div class="head_name">身高：{{children.height}}cm</div></el-col>
				    <el-col :span="8"><div class="head_name">鞋码：{{children.shoesize}}码</div></el-col>
				</el-row>
				<el-row class="info">
				    <el-col :span="8"><div class="head_name">地区：{{children.place}}</div></el-col>
				    <el-col :span="8"><div class="head_name">国籍：{{children.nationality}}</div></el-col>
				    <el-col :span="8"><div class="head_name">长相：{{children.lookstyle}}</div></el-col>
				</el-row>
				<el-row  class="info">
					 <el-col :span="8"><div class="head_name">图片地址：<a class="image_dz" :href="href+children.id"  target="_blank">点击查看</a></div></el-col>
				    <el-col :span="8"><div class="head_name">特长：{{children.speciality}}</div></el-col>
				</el-row>
		    </el-col>
		</el-row>
		<!--<el-row>
		    <el-col :span="24"><div class="image">图片</div></el-col>
		</el-row>
		<el-row>
		    <el-col :span="24"><div class="image">图片地址：<a class="image_dz" :href="href+children.id"  target="_blank">点击查看</a></div></el-col>
		</el-row>-->
		<!--<el-row type="flex" class="row-bg" justify="space-around">
			  <el-col :span="6" v-for="item in children_image"><img class="img" :src="url+item.file"/></el-col>
			</el-row>-->
		<el-row class="button">
			<el-col :span="12">
				<el-button class="adopt" size="mini" type="success" @click="choice(children.id,1)">通过</el-button>
			</el-col>
			<el-col :span="12">
				<el-button size="mini" type="danger" @click="choice(children.id,2)">未通过</el-button>
			</el-col>
			
				        
						
		</el-row>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				children:[],
				url:this.URL,
				href:"http://localhost:8080/#/star_detail/"  //前端萌娃详情地址
			}
		},
		created(){
			this.$http.post(this.URL+"/index.php/api/geek_qt/meng_wa_xq",{
				id:this.$route.query.id
			}).then((res)=>{
<<<<<<< HEAD
				console.log(res.data)
				if(res.data['sex']==1){
	    	    		res.data['sex']='男'
	    	    	}
	    	    	else if(res.data['sex']==2){
	    	    		res.data['sex']='女'
	    	    	}
				this.children=res.data
=======
				if(res.data.list['sex']==1){
	    	    		res.data.list['sex']='男'
	    	    	}
	    	    	else if(res.data.list['sex']==2){
	    	    		res.data.list['sex']='女'
	    	    	}
				this.children=res.data.list
				this.children_image=res.data.list_img
>>>>>>> f06f826d2a68f55599513529fee0f79e6cd1d2e7
			})
			
		},
		
		methods:{
			choice(id,state){
	     	if(state==1){
	     		this.$confirm('确认通过吗') 
			     	.then(_ => {
			     		 this.$http.post(this.URL+"/index.php/api/geek_qt/meng_wa_rz",{
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
				     		 this.$http.post(this.URL+"/index.php/api/geek_qt/meng_wa_rz",{
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
.app{margin:0px 70px;}	
.img{width: 200px;height: 200px;border-radius:10px;}
.info{margin-top: 40px;}
.image{margin: 30px 0 30px 0;font-size: 20px;}
.image_dz{color: blue;}
.head_name{color: #454545;}
.adopt{float: right;margin-right: 30px;}
.button{margin-top: 300px;}
.tb_tp{font-size: 30px;margin:20px 0;}
</style>