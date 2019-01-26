<template>
	<div class="no_app">
		<el-row>
		    <el-col :span="5">
		  	    <el-select v-model="choice" placeholder="请选择">
				    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				    </el-option>
				</el-select>
		    </el-col>
		    <el-col :span="5" class="content">
		    	<el-input v-model="content" placeholder="请输入内容"></el-input>
		    </el-col>
		    <el-col :span="13">
		    	<el-button type="primary" @click="query">查询</el-button>
		    </el-col>
		</el-row>
		<el-row>
		    <el-col :span="24" class="table_content">
		    	<el-table :data="pay_list" border style="width: 100%">
		    		<el-table-column prop="date" label="日期" width="180"></el-table-column>
                    <el-table-column prop="date" label="日期" width="180"></el-table-column>
                    <el-table-column prop="date" label="日期" width="180"></el-table-column>
				</el-table>
		    </el-col>
		</el-row>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				choice:'所有',
				options:[{value:'所有',label:'所有'},{value:'vip',label:'vip'},{value:'通告',label:'发布通告费用'}],
				content:'',
				pay_list:[],
			}
		},
		created(){
			this.pay()
		},
		methods:{
			pay(){
				this.$http.post(this.URL+'/index.php/api/geek_pay/weixin_notifys')
				.then(res=>{
					this.pay_list=res.data
				})
			},
			
			
			query(){
				
			}
		}
	}
</script>

<style scoped="scoped">
.no_app{
	margin: 20px 60px;
}
.content{
	margin-right:6px;
}
.table_content{
	margin-top: 15px;
}
</style>