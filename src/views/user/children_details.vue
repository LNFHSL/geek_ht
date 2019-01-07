<template>
	<div class="app">
		<el-row>
		    <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
		</el-row>
		<el-row>
		    <el-col :span="8"><div class="head_img"><img class="img" :src="children.headpic"/></div></el-col>
		    <el-col :span="5"><div class="head_name">称呼：{{children.name}}</div></el-col>
		    <el-col :span="5"><div class="head_name">生日：{{children.brithday}}</div></el-col>
		    <el-col :span="4"><div class="head_name">性别：{{children.sex}}</div></el-col>
		</el-row>
		<el-row>
		    <el-col :span="5"><div class="head_name">称呼：{{children.name}}</div></el-col>
		    <el-col :span="5"><div class="head_name">生日：{{children.brithday}}</div></el-col>
		    <el-col :span="4"><div class="head_name">性别：{{children.sex}}</div></el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				children:[]
			}
		},
		created(){
			this.$http.post(this.URL+"/index.php/api/geek_qt/meng_wa_xq",{
				id:this.$route.query.id
			}).then((res)=>{
				console.log(res.data)
				if(res.data['sex']==1){
	    	    		res.data['sex']='男'
	    	    	}
	    	    	else if(res.data['sex']==2){
	    	    		res.data['sex']='女'
	    	    	}
				this.children=res.data
			})
			
		},
		
		methods:{
			
		}
		
		
		
	}
	
</script>

<style>
.app{margin:50px 70px;}	
.img{width: 200px;height: 200px;}
</style>