<template>
	<div class="app">
		<template>
		    <el-table :data="data" border style="width: 100%">
			  	<el-table-column prop="time" label="日期" width="180"></el-table-column>
			    <el-table-column prop="opinion" label="反馈" ></el-table-column>
		        <el-table-column label="操作" width="200">
			      <template slot-scope="scope">
			        <el-button size="mini" @click="read(scope.row)" v-if="scope.row.read == 0">未读</el-button>
			          
			        <el-button type="success" size="mini" v-if="scope.row.read == 1">已读</el-button>
			      </template>
			    </el-table-column>
		    </el-table>
		</template>
	</div>
</template>

<script>
	export default{
		data(){
			return{
			  data:[],	
			}
		},
		created(){
			this.$http.post(this.URL+"/index.php/api/geek_qt/feedback")
			.then((res)=>{
				console.log(res.data)
				this.data=res.data
			})
		},
		methods:{
		   read(data){
		   	this.$http.post(this.URL+"/index.php/api/geek_qt/sure_feedback",{id:data.id})
		   	data.read=1
		   	
		   }
		}
		
	}
</script>

<style>
	.app{
		margin: 10px 50px;
	}
</style>