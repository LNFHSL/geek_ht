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
    <el-row>
      <el-col :span="24" class="tips">一级分类</el-col>
      <el-col :span="24">
        <el-select v-model="value1" placeholder="请选择" @change="checkSecondType">
          <el-option
            v-for="item in headlineFirstType"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="tips">二级分类</el-col>
      <el-col :span="24">
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
                return this.URL + res.url
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
          if (this.title != '' && this.content != '' && this.value2 != '') {
            this.$http.post(this.URL + '/index.php/api/addHeadline', {
              title: this.title,
              content: this.content,
              type: this.value2
            }).then((res) => {
              if (res.data.state == 1) {
                this.$message.success('发布成功!')
              } else {
                this.$message.error('发布失败！')
              }
            })
          } else {
            this.$message.warning('标题、内容和分类不能为空！')
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
  .qEditor img{
    height: 100px;
    width: 100px;
  }
  .button{float: right;}
  .editRow{
    margin-bottom: 90px;
  }
</style>
