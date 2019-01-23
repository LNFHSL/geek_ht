<template>
	<div class="upimage">
		<el-upload
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <img v-if="image" :src="image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				action: this.URL + '/index.php/api/user/uploadJoinPic',
				imageUrl:'',
			}
		},
		created(){
			
		},
		methods:{
			handleAvatarSuccess(res, file) {
		      this.imageUrl = res.url
		      
		      if(imageUrl ==''){
		      	this.$emit('receiveimg', this.image)
		      }else{
		      	this.$emit('receiveimg', res.url)
		      }
		     
		    },
		    beforeAvatarUpload(file) {
		      const isJPG = file.type === 'image/jpeg'
		      const isLt2M = file.size / 1024 / 1024 < 2
		
		      if (!isJPG) {
		        this.$message.error('上传头像图片只能是 JPG 格式!')
		      }
		      if (!isLt2M) {
		        this.$message.error('上传图片大小不能超过 2MB!')
		      }
		      return isJPG && isLt2M
		    },
		},
		props:{
			image:String
		}
		
	}
</script>

<style >
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