<template>
  <div class="container">
    <el-form :model="form" label-width="80px" label-position="left" >
      <el-form-item label="头像">
        <img :src="msg['headpic']" width="60" height="60"/>
      </el-form-item>
      <el-form-item label="称呼">
        {{msg['name']}}
      </el-form-item>
      <el-form-item label="性别">
        {{msg['sex']}}
      </el-form-item>
      <el-form-item label="体重">
        {{msg['weight']}}斤
      </el-form-item>
      <el-form-item label="身高">
        {{msg['height']}}cm
      </el-form-item>
      <el-form-item label="鞋码">
        {{msg['shoesize']}}码
      </el-form-item>
      <el-form-item label="国籍">
        {{msg['nationality']}}
      </el-form-item>
      <el-form-item label="地区">
        {{msg['place']}}
      </el-form-item>
      <el-form-item label="生日">
        {{msg['brithday']}}
      </el-form-item>
      <el-form-item label="长相">
        {{msg['lookstyle']}}
      </el-form-item>
      <el-form-item label="特长">
        {{msg['speciality']}}
      </el-form-item>
      <el-form-item label="拍摄经历">
        {{msg['shotexp']}}
      </el-form-item>
      <el-form-item label="演出经历">
        {{msg['showexp']}}
      </el-form-item>
      <el-form-item label="获奖经历">
        {{msg['awardexp']}}
      </el-form-item>
      <el-form-item label="是否推荐">
        {{msg['Recommend']}}
      </el-form-item>

    </el-form>
    <el-row>
      <el-col style="float: left" :span="5" class="button"> <el-button type="primary" @click="goBack">返回</el-button></el-col>
    </el-row>
  </div>

</template>

<script>
export default {

  data() {
    return {
      form: {},
      msg: [],
      lastPage: 0,
      total: 0,
      currentPage: 0,
      value:'',
      dialog: false,
      detail:[]
    }
  },
  created() {
    this.showDetail(this.$route.query.id)
  },
  methods: {
    showDetail(id) {
      this.$http.post(this.URL + '/index.php/api/baby/babyShow',{
        id:id
      }).then((res) => {
        this.msg = res.data
        if(this.msg['sex']==1){
          this.msg['sex']='男'
        }else{
          this.msg['sex']='女'
        }
        if(this.msg['Recommend']==0){
          this.msg['Recommend']='不推荐'
        }else{
          this.msg['Recommend']='推荐'
        }
      })
    },
    goBack: function() {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
.container{
  width :500px;
  margin:auto;
  padding: 30px;
}
.el-form-item{
  text-align: center;
}
</style>

