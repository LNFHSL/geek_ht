<template>
  <div class="app" >
    <el-row>
      <el-col :span="24" class="tips">头条标题</el-col>
      <el-col :span="24"><el-input v-model="title" placeholder="头条标题" clearable/></el-col>
    </el-row>
    <el-row >
      <el-col :span="24" class="tips">头条内容</el-col>
      <el-col :span="24">
        <quill-editor v-model="content" :options="editorOption" class="qEditor"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="24" class="tips">发布日期</el-col>
          <el-col :span="12"><el-input v-model="date" placeholder="2019-01-01" clearable/></el-col>
          <el-col :span="24" class="tips">具体时间</el-col>
          <el-col :span="12"><el-input v-model="time" placeholder="14：15：20" clearable/></el-col>
          <el-col :span="24">
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
          <el-col :span="24" class="up">
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
      </el-col>
      <el-col :span="12">
        <div class="tips">头条封面</div>
        <el-upload
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" class="button"> <el-button type="primary" @click="goBack">返回</el-button></el-col>
      <el-col :span="2" class="button"> <el-button type="primary" @click="changeHeadline">提交</el-button></el-col>
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
      action: this.URL + '/index.php/api/user/uploadJoinPic',
      id: '',
      title: '',
      content: '',
      date: '',
      time: '',
      tId: '',
      url: this.URL,
      img: '',
      imageUrl: '',
      stock: 1,
      value1: '',
      value2: '',
      secondType: [],
      headlineFirstType: '',
      headlineSecondType: '',
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
    this.showHeadline(this.$route.query.id)
  },
  methods: {
    showHeadline(id) {
      this.$http.post(this.URL + '/index.php/api/headline/showHeadline', {
        id: id
      }).then((res) => {
        this.title = res.data[0].title
        this.content = res.data[0].content
        this.date = res.data[0].date
        this.time = res.data[0].time
        this.tId = res.data[0].type
        this.img = res.data[0].cover
        this.imageUrl =res.data[0].cover
        this.showHeadlineType()
      })
    },
    changeHeadline: function() {
      if (this.title.length > 50) {
        this.$message.warning('标题不要超过50个字符')
      } else if (this.content.length > 5000) {
        this.$message.warning('内容不要超过5000个字符')
      } else if (this.date.length > 20) {
        this.$message.warning('日期不要超过20个字符')
      } else if (this.time.lenth > 20) {
        this.$message.warning('时间不要超过20个字符')
      } else if (this.title == '' ||
        this.content == '' ||
        this.date == '' ||
        this.time == '' ||
        this.title == '' ||
        this.img == '' ||
        this.value2 == '') {
        this.$message.warning('内容不能为空')
      } else {
        this.$http.post(this.URL + '/index.php/api/headline/changeHeadline', {
          id: this.$route.query.id,
          title: this.title,
          content: this.content,
          date: this.date,
          time: this.time,
          cover: this.img,
          type: this.value2
        }).then((res) => {
          if (res.data.state == 1) {
            this.$message.success('修改成功')
            this.showHeadline(this.$route.query.id)
          } else {
            this.$message.error('修改失败')
          }
        })
      }
    },
    goBack: function() {
      this.$router.go(-1)
    },
    showHeadlineType() {
      this.$http.post(this.URL + '/index.php/api/headline/showHeadlineType', {
        id: this.tId
      }).then((res) => {
        this.headlineFirstType = res.data.headlineFirstType
        this.headlineSecondType = res.data.headlineSecondType
        this.value1 = res.data.fType
        this.checkSecondType()
        this.value2 = res.data.sType
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
      this.img = res.url
      this.imageUrl = this.URL + res.url
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
    }
  }
}
</script>
<style type="text/css" scope>
.app{
	margin: 0 60px;
}
.el-col{
	margin: 8px 0;
}
.tips{
margin-bottom: 5px;
margin-left: 2px;
color: #636363;
}

.button{float: right;}
.qEditor img{
   height: 100px;
   width: 100px;
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
