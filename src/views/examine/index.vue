<template>
  <div class="app-container">
    <el-table :data="goods" height="750" border style="width: 100%"  :default-sort = "{prop: 'name', order: 'ascending'}">
    	
    <el-table-column prop="shopname"  label="商家名称"  width="260"></el-table-column>
    	
    <el-table-column prop="contacter" label="联系人"    width="180"> </el-table-column>
    
    <el-table-column  prop="contacttel"  label="电话"  width="180"></el-table-column>
    
    <el-table-column  prop="students"  label="生源数量" sortable  width="180"></el-table-column>
    
     <el-table-column prop="date" label="时间" sortable width="180"></el-table-column>
    
     <el-table-column label="操作">
	      <template slot-scope="scope">
		        <el-button size="mini" type="primary" @click="handleEdit(scope.row)" plain>详情</el-button>
		        <el-button size="mini" type="success" @click="choice(scope.$index, scope.row,1)">通过</el-button>
		        <el-button size="mini" type="danger" @click="choice(scope.$index, scope.row,2)">未通过</el-button>
	         
	      </template>
	      
    </el-table-column>
    
  </el-table>	
  


  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
     url:this.url,
     goods:[],
    }
  },
  created() {
      this.$http.post(this.URL+"/index.php/api/geek_qt/wait")
    .then((res)=>{
    	       for(var i=0;i<res.data.length;i++){
    	       	res.data[i]['image']=this.URL+res.data[i]['image']
    	       }
    	      console.log(res.data)
	 						this.goods=res.data
	 				})
  },
  methods: {
     choice(index,data,state){
     	if(state==1){
     		this.$confirm('确认通过吗') 
		     	.then(_ => {
		     		 this.$http.post(this.URL+"/index.php/api/geek_qt/operation",{
		     		 	state:state,id:data.id,uid:data.uid,type:data.type
		     		 }).then((res)=>{
     		    	 if(res.data == 1){
     		    	 	this.goods.splice(index,1)
     		    	 	this.$message({message: '成功',type: 'success'});
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
			     		 	state:state,id:data.id,uid:data.uid,type:data.type
			     		 }).then((res)=>{
	     		    	 if(res.data == 1){
	     		    	 	this.goods.splice(index,1)
	     		    	 	this.$message({message: '成功',type: 'success'});
	     		    	 }else{
	     		    	  this.$message.error('失败');
	     		    	 }
	     		    	
	     		    })
		     	})
		      .catch(_ => {});
		     }
		 },
     handleEdit(row){
     	   var id=row.id
     	   this.$router.push({path: '/examine/details',query:{id:id}})
     	   
     }
  }
}
</script>