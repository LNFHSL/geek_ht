<template>
  <div class="app-container">
    <el-table :data="goods" height="750" border style="width: 100%"  :default-sort = "{prop: 'name', order: 'ascending'}">
    	
    <el-table-column prop="image"  label="图片"  width="160"> <img src="image"/>
	       <template   slot-scope="scope">            
	           <img :src="scope.row.image"  min-width="70" height="70" />
	       </template>
    </el-table-column>
    	
    <el-table-column prop="name" label="名称"    width="160"> </el-table-column>
    
    <el-table-column  prop="integral"  label="积分" sortable width="160"></el-table-column>
    
    <el-table-column  prop="classify"  label="分类"  width="160"></el-table-column>
    
    <el-table-column prop="change" label="已兑换" sortable width="160"></el-table-column>
    
    <el-table-column prop="stock" label="库存" sortable width="160"></el-table-column>
    
     <el-table-column prop="date" label="时间" sortable ></el-table-column>
    
     <el-table-column label="操作" width="240">
	      <template slot-scope="scope">
		        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
		       <el-button size="mini" type="danger" @click="deletes(scope.$index, scope.row)">删除</el-button>
	         
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
      this.$http.post(this.URL+"/index.php/api/geek_ht/display_goods")
    .then((res)=>{
    	       
    	       for(var i=0;i<res.data.length;i++){
    	       	res.data[i]['image']=this.URL+res.data[i]['image']
    	       }
    	       //  console.log(res.data)
	 						this.goods=res.data
	 				})
  },
  methods: {
     deletes(index,data){
     	this.$confirm('确认删除吗') 
     	.then(_ => { 
     		    this.$http.post(this.URL+"/index.php/api/geek_ht/delete_goods",{
     		    	id:data.id
     		    }).then((res)=>{
     		    	 if(res.data == 1){
     		    	 	this.goods.splice(index,1)
     		    	 	this.$message({message: '删除成功',type: 'success'});
     		    	 }else{
     		    	  this.$message.error('删除失败');
     		    	 }
     		    	
     		    })
     	})
       .catch(_ => {});
     },
     handleEdit(row){
     	   var id=row.id
     	   this.$router.push({path: '/goods/edit',query:{id:id}})
     	   
     }
  }
}
</script>
