<template>
  <div class="app">
    <el-row>
    	  <el-col :span="24" class="tips">商品名称</el-col>
        <el-col :span="24"><el-input placeholder="商品名称" v-model="name" clearable></el-input></el-col>
		</el-row>
		
		<el-row :gutter="200">
        <el-col :span="10"><div  class="tips">商品积分</div>
        <el-input placeholder="商品积分" v-model="integral" clearable @blur="judge(integral)"></el-input>
        </el-col>
        <el-col :span="12" >
        	   <div  class="tips">商品图片</div>
        	  <el-upload class="avatar-uploader"  action="http://localhost/laravel/public/index.php/api/user/uploadJoinPic"
                 :show-file-list="false" :on-success="handleAvatarSuccess"
								  :before-upload="beforeAvatarUpload">
								  <img v-if="imageUrl" :src="imageUrl" class="avatar">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				    </el-upload>
        </el-col>
		</el-row>
		  
		<el-row >
        <el-col :span="10" class="fl"><div  class="tips">商品分类</div>
        	  <el-select v-model="classify" placeholder="请选择">
               <el-option v-for="item in options" :key="item.id" :label="item.classify" :value="item.id"></el-option>
        	  </el-select>
        </el-col>
		</el-row>
		<el-row >
		  	<el-col :span="10" class="kc"><div  class="tips">库存量</div>
        	  <el-input-number v-model="stock" :min="1"  label="描述文字"></el-input-number>
        </el-col>
		</el-row>
		<el-row>
			  <el-col :span="24" class="tips">商品详情</el-col>
    	  <el-col :span="24">
	    	  	 <quill-editor v-model="content" :options="editorOption"></quill-editor> 
	        </el-form-item>
    	  </el-col>
		</el-row>
		<el-row>
			 <el-col :span="2" class="button"> <el-button type="primary" @click="returns">返回</el-button></el-col>
			  <el-col :span="2" class="button"> <el-button type="primary" @click="sub">更新</el-button></el-col>
		</el-row>
  </div>
</template>

<script>
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)

import { getList } from '@/api/table'

export default {
  data() {
    return {
    name:'',
    integral:'',
    classify:'',
    options:[],
    content:'',
    editorOption:{},
    imageUrl:'',
    url:this.URL,
    stock:1,
    flag:true,
     editorOption: {  
          modules: {
            ImageExtend: {
              loading: true,
              name: 'file',
              action:this.URL+'/index.php/api/user/uploadJoinPic',
              response: (res) => {
                return res.url
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }  
    }
  },
  created() {
    this.$http.post(this.URL+"/index.php/api/geek_ht/classify")
    .then((res)=>{
            this.options=res.data
	 	})
    
      	var id = this.$route.query.id 
  	//分类
    this.$http.post(this.URL+"/index.php/api/geek_ht/query_modify",{
    	id:id
    })
    .then((res)=>{
         this.name=res.data[0].name,
         this.integral=res.data[0].integral,
         this.stock=res.data[0].stock,
         this.classify=res.data[0].classify,
         this.imageUrl=res.data[0].image,
         this.content=res.data[0].details
         
	  })
  },
  methods: {
      handleAvatarSuccess(res, file) {
      	  console.log([res, file])
       this.imageUrl =res.url;
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
      judge(str){
          var re=/^[0-9]*$/;
	            if (re.test(str)) {
	                this.flag=true;
	            } else {
	                this.flag=false;
					this.$message({ message: '只能接数字哦',type: 'warning'});
	            }
      },
      sub(){
      	 if(this.name==''){
      	 	this.$message({ message: '商品名字不能为空',type: 'warning'});
      	 }
      	 else if(this.integral==""){
      	 		this.$message({ message: '商品积分不能为空',type: 'warning'});
      	 }
      	 else if(this.flag==false){
      	 	  this.$message({ message: '商品积分只能接数字哦',type: 'warning'});
      	 }
      	 else if(this.imageUrl==""){
      	 		this.$message({ message: '商品图片不能为空',type: 'warning'});
      	 }
      	 else if(this.classify==""){
      	 		this.$message({ message: '商品分类不能为空',type: 'warning'});
      	 }
      	 else if(this.content==""){
      	 		this.$message({ message: '商品详情不能为空',type: 'warning'});
      	 }
      	 else{
      	 		console.log(this.integral)
      	 	 this.$http.post(this.URL+"/index.php/api/geek_ht/up_goods",{
      	 	 	name:this.name,
      	 	 	integral:this.integral,
      	 	 	image:this.imageUrl,
      	 	  classify:this.classify,
      	 	 	stock:this.stock,
      	 	 	details:this.content
      	 	 })
      	 	 .then((res)=>{
      	 	 	   if(res.data.state==1){
      	 	 	   	   this.$message({message: '更新成功',type: 'success'});
      	 	 	   	
                       this.$router.go(-1)      	 	 	   
                   
      	 	 	   }else{
      	 	 	       this.$message.error('更新失败');
      	 	 	   }
      	 	 })
      	 }
      },
      returns(){
      	this.$router.go(-1)
      }
  }
  
}
</script>
<style type="text/css" scope>
.app{
	margin: 0 100px;
}
.el-row{
	margin: 20px 0;
}
.tips{
margin-bottom: 5px;
margin-left: 2px;
color: #636363;
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
.fl{margin-top: -135px;}
.kc{margin-top: -60px;}
.button{float: right;}
.tp{margin-top:20px ;}
.tb_tp{font-size: 30px;margin-left:-10px;}
</style>