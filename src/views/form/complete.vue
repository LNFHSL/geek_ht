<template>
	<div class="app-container">
		<el-table :data="goods" height="750" border style="width: 100%"  :default-sort = "{prop: 'name', order: 'ascending'}">
    	
		    <el-table-column prop="shopname"  label="商家名称"  width="260"></el-table-column>
		    	
		    <el-table-column prop="contacter" label="联系人"    width="180"> </el-table-column>
		    
		    <el-table-column  prop="contacttel"  label="电话"  width="180"></el-table-column>
		    
		    <el-table-column  prop="students"  label="生源数量" sortable  width="180"></el-table-column>
		    
		     <el-table-column prop="date" label="时间" sortable width="180"></el-table-column>
		    
		     <el-table-column label="状态">
			      <template slot-scope="scope">
			      	  <el-button type="primary" @click="handleEdit(scope.row)" plain>详情</el-button>
				      <el-button type="success" v-if="scope.row.state == 1">已通过</el-button>
				      <el-button type="danger"  v-if="scope.row.state == 2">未通过</el-button>
			      </template>
			      
		    </el-table-column>
    
        </el-table>	
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				goods:[],
			}
		},
		created() {
      this.$http.post(this.URL+"/index.php/api/geek_qt/wait_complete")
    .then((res)=>{
    	       for(var i=0;i<res.data.length;i++){
    	       	res.data[i]['image']=this.URL+res.data[i]['image']
    	       }
    	      console.log(res.data)
	 						this.goods=res.data
	 				})
  },
	methods:{
		handleEdit(row){
     	   var id=row.id
     	   this.$router.push({path: '/form/details',query:{id:id}})
     	   
     }
	}
		
		
	}
</script>

<style>
	
</style>