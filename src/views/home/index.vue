<template>
	<div class="app">
		<el-row >
		  <el-col :span="7" class="tp">
        	   <div  class="tips">幻灯片图片</div>
        	    <el-upload class="avatar-uploader"  :action="action"
	                :show-file-list="false" :on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			     </el-upload>
          </el-col>
          <el-col :span="17" class="route">
          	<div  class="tips">链接地址</div>
          	<el-input v-model="route" placeholder="请输入链接地址"></el-input>
          	<el-button type="primary" class="tj" @click="sub">提交</el-button>
          </el-col>
		</el-row>
		
		<el-row class="display">
		  <el-col :span="24" class="content">
		  	<template>
		  		
			  <el-table :data="slide" border style="width: 100%">
			  	<el-table-column prop="date" label="日期" width="200"></el-table-column>
			  	
			    <el-table-column prop="img" label="图片" width="220">
			    	<template   slot-scope="scope">            
			            <img :src="scope.row.img"  width="100" height="100" />
			        </template>
			    	
			    </el-table-column>
			    
			    <el-table-column prop="route" label="链接地址" width="550" class="content"></el-table-column>
			    <el-table-column label="操作" >
				      <template slot-scope="scope">
					        <el-button size="mini" type="danger" @click="deletes(scope.$index, scope.row)">删除</el-button>
				      </template>
				      
			    </el-table-column>
			  </el-table>
			  
			</template>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				slide:[],
				route:'',
				 imageUrl: '',
				 action:this.URL+"/index.php/api/user/uploadJoinPic",
				 url:this.URL
			}
		},
		created(){
			this.query()
		},
		methods:{
			handleAvatarSuccess(res, file) {
		        this.imageUrl =res.url
		      },
		    beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		    },
		    sub(){ //提交
		      if(this.imageUrl == ''){
		      	 this.$message({message: '图片不能为空',type: 'warning'});
		      }
		      else if(this.route == ''){
		      	 this.$message({message: '链接地址不能为空',type: 'warning'});
		      }else{
		      	this.$http.post(this.URL+'/index.php/api/geek_set/send_slide',{
		      		img:this.imageUrl,
		      		route:this.route
		      	}).then((res)=>{
		      		this.imageUrl="";
		      		this.route="";
		      		this.$message({message: '上传成功',type: 'success'});
		      		this.query()
		      	})
		      }
		    },
		    query(){
		    	this.$http.post(this.URL+'/index.php/api/geek_set/display_slide')
		    	.then((res)=>{
		    		console.log(res.data)
		    		this.slide=res.data
		    	})
		    },
		    deletes(index,data){
		     	this.$confirm('确认删除吗') 
		     	.then(_ => { 
		     		    this.$http.post(this.URL+"/index.php/api/geek_set/delete_slide",{
		     		    	id:data.id
		     		    }).then((res)=>{
		     		    	 	this.slide.splice(index,1)
		     		    	 	this.$message({message: '删除成功',type: 'success'});
		     		    })
		     	})
		       .catch(_ => {});
		     },
		}
	}
</script>

<style scope>
	.display{
		margin-top: 30px;
	}
	.app{
		margin: 0 100px;
	}
	.tp{
		margin-top: 30px;
	}
	.tips{
	margin-bottom: 5px;
	margin-left: 2px;
	color: #636363;
	}
	.tj{
		float: right;
		margin-top: 100px;
	}
	.route{
		margin-top: 30px;
	}
	
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>