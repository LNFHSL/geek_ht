<template>
  <div class="app-container">
  	<el-row  class="head" :gutter="20">
	    <el-col :span="12">
	       <el-button type="primary" round v-if="state== 1" @click="switchs(state)">切换到认证列表</el-button>
	       <el-button type="primary" round v-if="state== 2" @click="switchs(state)">切换到未认证列表</el-button>
	    </el-col >  
	    <el-col :span="6">
	    	<el-input v-if="state== 2" v-model="name" placeholder="请输入内容"></el-input>
	    </el-col>
	    <el-col :span="6">
	    	<el-button v-if="state== 2" type="primary">主要按钮</el-button>
	    </el-col>
  	</el-row>
  	
  	<el-row>
  	    <el-col :span="24">
        <el-table :data="meng_was" height="750" border style="width: 100%"  :default-sort = "{prop: 'name', order: 'ascending'}">
    	
		    <el-table-column prop="headpic"  label="头像"  width="180">
		    	<template   slot-scope="scope">            
			           <img :src="scope.row.headpic"  min-width="70" height="70" />
			      </template>
		    </el-table-column>
		    	
		    <el-table-column prop="name" label="萌娃的名称"    width="180"> </el-table-column>
		    
		    <el-table-column  prop="nationality"  label="国籍"  width="180"></el-table-column>
		    
		    <el-table-column  prop="sex"  label="性别" sortable  width="180"></el-table-column>
		    
		    <el-table-column  prop="height"  label="身高" sortable  width="180"></el-table-column>
		    
		    <el-table-column  prop="weight"  label="体重" sortable  width="160"></el-table-column>
		    
		     <el-table-column label="操作">
			      <template slot-scope="scope">
				        <el-button size="mini" type="primary" @click="handleEdit(scope.row)" plain>详情</el-button>
				        <el-button size="mini" type="success" v-if="state== 1" @click="choice(scope.$index, scope.row,1)">通过</el-button>
				        <el-button size="mini" type="danger"  v-if="state== 1" @click="choice(scope.$index, scope.row,2)">未通过</el-button>
			      </template>
			      
		    </el-table-column>
		    
		     <el-table-column v-if="state== 2"  label="状态">
		     	    <template slot-scope="scope">
						<el-button  size="mini" type="success" v-if="scope.row.isAuth == 1">已通过</el-button>
						<el-button  size="mini" type="danger"  v-if="scope.row.isAuth == 2">未通过</el-button>
					</template>
		     </el-table-column>
    
        </el-table>	
        </el-col>
	</el-row>

  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
     state:1,
     url:this.url,
     meng_was:[],
     name:'',
    }
  },
  created() {
      this.meng_wa()
  },
  methods: {
     choice(index,data,state){
     	if(state==1){
     		this.$confirm('确认通过吗') 
		     	.then(_ => {
		     		 this.$http.post(this.URL+"/index.php/api/geek_qt/meng_wa_rz",{
		     		 	state:state,id:data.id
		     		 }).then((res)=>{
     		    	 if(res.data == 1){
     		    	 	this.meng_was.splice(index,1)
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
			     		 this.$http.post(this.URL+"/index.php/api/geek_qt/meng_wa_rz",{
			     		 	state:state,id:data.id
			     		 }).then((res)=>{
	     		    	 if(res.data == 1){
	     		    	 	this.meng_was.splice(index,1)
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
     	   this.$router.push({path: '/user/children_details',query:{id:id}})
     	   
     },
     meng_wa(){
     	this.$http.post(this.URL+"/index.php/api/geek_qt/meng_wa")
        .then((res)=>{
	    	    for(let i=0;i<res.data.length;i++){
	    	    	if(res.data[i]['sex']==1){
	    	    		res.data[i]['sex']='男'
	    	    	}
	    	    	else if(res.data[i]['sex']==2){
	    	    		res.data[i]['sex']='女'
	    	    	}
	    	    }
		 		this.meng_was=res.data
		 	})
     },
     meng_wa_wc(){
     	this.$http.post(this.URL+"/index.php/api/geek_qt/meng_wa_wc")
        .then((res)=>{
	    	    for(let i=0;i<res.data.length;i++){
	    	    	if(res.data[i]['sex']==1){
	    	    		res.data[i]['sex']='男'
	    	    	}
	    	    	else if(res.data[i]['sex']==2){
	    	    		res.data[i]['sex']='女'
	    	    	}
	    	    }
	    	    console.log(res.data)
		 		this.meng_was=res.data
		 	})
     },
     
     switchs(state){
     
     	if(state==1){
     		this.state=2
     		this.meng_wa_wc()
     		
     	}else if(state==2){
     		this.state=1
     		this.meng_wa()
  	}	
     }
     
  }
}
</script>

<style type="text/css">
	.head{
		margin-bottom: 20px;
	}
</style>