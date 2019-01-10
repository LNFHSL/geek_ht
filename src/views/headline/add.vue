<!--suppress ALL -->
<template>
  <div class="app" >
    <el-row>
      <el-col :span="24" class="tips">头条标题</el-col>
      <el-col :span="24"><el-input v-model="title" placeholder="头条标题" clearable/></el-col>
    </el-row>
    <el-row class="editRow">
      <el-col :span="24" class="tips">头条内容</el-col>
      <el-col :span="24" >
        <quill-editor
          ref="myQuillEditor"
          v-model="content"
          :options="editorOption"
          style="height: 200px;"
          class="qEditor"
        />
      </el-col>
    </el-row>
    <el-row :gutter="200">
      <el-col :span="10">
        <div class="tips">一级分类</div>
        <el-select v-model="value1" placeholder="请选择" @change="checkSecondType">
          <el-option
            v-for="item in headlineFirstType"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="12">
        <div class="tips">头条封面</div>
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="24" id="sType">
        <div class="tips">二级分类</div>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in secondType"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"/>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" class="button"> <el-button type="primary" class="enterBtn" @click="addheadline">提交</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)

export default {

  data() {
    return {
      action:this.URL + '/index.php/api/user/uploadJoinPic',
      url: this.URL,
      img: '',
      imageUrl: '',
      title: '',
      content: ``,
      uploadMsg: [],
      headlineFirstType: [],
      secondType: [],
      headlineSecondType: [],
      value1: '',
      value2: '',
      fId: '',
      editorOption: {
        placeholder: '请输入头条内容',
        modules: {
          ImageExtend: {
            loading: true,
            name: 'file',
            action: this.URL + '/index.php/api/user/uploadJoinPic',
            response: (res) => {
              return res.url
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function() {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  created() {
    this.showHeadlineType()
  },
  methods: {
    addheadline() {
      if (this.title.length > 50) {
        this.$message.warning('标题不超过50个字符')
      } else if (this.content > 5000) {
        this.$message.warning('内容不超过5000个字符')
      } else {
        if (this.title != '' && this.content != '' && this.value2 != '' && this.img!='') {
          this.$http.post(this.URL + '/index.php/api/headline/addHeadline', {
            title: this.title,
            content: this.content,
            cover:this.img,
            type: this.value2
          }).then((res) => {
            if (res.data.state == 1) {
              this.$message.success('发布成功!')
            } else {
              this.$message.error('发布失败！')
            }
          })
        } else {
          this.$message.warning('标题、内容、分类和封面不能为空！')
        }
      }
    },
    showHeadlineType() {
      this.$http.post(this.URL + '/index.php/api/headline/showHeadlineType').then((res) => {
        this.headlineFirstType = res.data.headlineFirstType
        this.headlineSecondType = res.data.headlineSecondType
      })
    },
    checkSecondType() {
      var n = 0
      this.secondType.length = 0
      this.value2 = ''
      for (var i = 0; i < this.headlineSecondType.length; i++) {
        if (this.value1 == this.headlineSecondType[i].type) {
          this.secondType[n] = this.headlineSecondType[i]
          n++
        }
      }
    },
    handleAvatarSuccess(res, file) {
      console.log([res, file])
      this.img=res.url,
      this.imageUrl = res.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  }
}
</script>
<style type="text/css">
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
.qEditor img{
  height: 100px;
  width: 100px;
}
.button{float: right;}
  .editRow{
    margin-bottom: 90px;
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
  #sType{
    margin-top: -100px;
  }
</style>
