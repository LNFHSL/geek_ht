<template>
  <div class="app-container" >
    <el-select v-model="value" placeholder="添加分类" style="float: right; margin-bottom: 20px;">
      <el-option value="" @click.native="dialogFtype=true">添加一级分类</el-option>
      <el-option value="" @click.native="dialogStype=true">添加二级分类</el-option>
    </el-select>
    <el-table
      :data="fType"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" prop="id" label="ID" width="95"/>
      <el-table-column label="分类名" prop="typeName" align="center"/>
      <el-table-column label="子分类" align="center" width="250">
        <template slot-scope="scope">
          <el-button type="text" @click="checkSecondType(scope.row.id)">查看子分类</el-button>
          <el-dialog :visible.sync="dialogTableVisible">
            <el-table :data="sType" style="text-align: left">
              <el-table-column property="id" label="id" width="150"/>
              <el-table-column property="typeName" label="分类名"/>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete" size="small" circle @click="delType(scope.row.id)"/>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" label="管理" >
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delType(scope.row.id)"/>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFtype">
      <el-row>
        <el-input v-model="addFtypeValue" placeholder="输入分类名"/>
      </el-row>
      <el-row>
        <el-button style="float: right; margin-top: 20px;" type="primary" @click="addFirstType">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="dialogStype" >
      <el-select
        v-model="addStypeOption"
        style="margin-bottom: 20px"
        placeholder="请选择">
        <el-option
          v-for="item in fType"
          :key="item.id"
          :label="item.typeName"
          :value="item.id"
        />
      </el-select>
      <el-row>
        <el-input v-model="addStypeValue" placeholder="输入分类名"/>
      </el-row>
      <el-row>
        <el-button style="float: right; margin-top: 20px;" type="primary" @click="addSecondType">提交</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {

  data() {
    return {
      fType: [],
      sType: [],
      secondType: [],
      lastPage: '',
      total: '',
      currentPage: '',
      value: '',
      dialogTableVisible: false,
      dialogFtype: false,
      dialogStype: false,
      addFtypeValue: '',
      addStypeValue: '',
      addStypeOption: ''
    }
  },
  created() {
    this.showType()
  },
  methods: {
    showType() {
      this.$http.post(this.URL + '/index.php/api/headline/headlineTypePage').then((res) => {
        this.fType = res.data.fType
        this.sType = res.data.sType
      })
    },
    delType(id) {
      this.$confirm('确认删除该分类吗').then(_ => {
        this.$http.post(this.URL + '/index.php/api/headline/delHeadlineType', {
          id: id
        }).then((res) => {
          if (res.data.state == 1) {
            this.$message.success('删除成功')
            this.dialogTableVisible = false
            this.addFtypeValue = ''
            this.addStypeValue = ''
            this.addStypeOption = ''
            this.showType()
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {})
    },
    addFirstType() {
      if (this.addFtypeValue == '') {
        this.$message.warning('分类名不能为空')
      } else if (this.addFtypeValue.length > 30) {
        this.$message.warning('分类名不能超过30个字符')
      } else {
        this.$http.post(this.URL + '/index.php/api/headline/addHeadlineType', {
          typeName: this.addFtypeValue
        }).then((res) => {
          if (res.data.state == 1) {
            this.addFtypeValue = ''
            this.$message.success('成功添加一级分类')
            this.showType()
            this.dialogFtype = false
          } else {
            this.$message.error('添加失败')
          }
        })
      }
    },
    addSecondType() {
      if (this.addStypeValue == '' || this.addStypeOption == '') {
        this.$message.warning('一级分类和分类名不能为空')
      } else if (this.addStypeValue.length > 30) {
        this.$message.warning('分类名不能超过30个字符')
      } else {
        this.$http.post(this.URL + '/index.php/api/headline/addHeadlineType', {
          type: this.addStypeOption,
          typeName: this.addStypeValue
        }).then((res) => {
          if (res.data.state == 1) {
            this.addStypeValue = ''
            this.addStypeOption = ''
            this.$message.success('成功添加二级分类')
            this.showType()
            this.dialogStype = false
          } else {
            this.$message.error('添加失败')
          }
        })
      }
    },
    checkSecondType(id) {
      this.$http.post(this.URL + '/index.php/api/headline/showSecondType', {
        id: id
      }).then((res) => {
        this.dialogTableVisible = true
        this.sType = res.data
      })
    }
  }
}
</script>
<style>
  .add{
    float: left;
    margin-top: 20px;
  }

</style>

