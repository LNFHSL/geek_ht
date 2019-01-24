<template>
	<div class="activity_app">
		<el-row :gutter="20" class="head"> <!-- 头部  -->
            <el-col :span="6">
		    	<el-input  v-model="name" placeholder="请输入标题"></el-input>
		    </el-col>
		    <el-col :span="6">
		    	<el-button  type="primary" @click="search" >查询</el-button>
		    	<el-button  type="info" @click="no_examine" >还原</el-button>
                <el-button  type="success" @click="exports" class="daochu">导出Excel</el-button>
		    </el-col>
		</el-row>
		<el-row>              <!-- 显示的 -->
		    <el-col :span="24">
		    	<el-table :data="tableData" border style="width: 100%">
				    <el-table-column label="封面" width="140">
				    	<template   slot-scope="scope">            
					         <img :src="scope.row.thumb"  min-width="68" height="68" />
					    </template>
				    </el-table-column>
				    <el-table-column align="center" prop="title" label="标题" width="140"></el-table-column>
				    <el-table-column align="center" prop="film" label="类型" width="130"></el-table-column>
				    <el-table-column align="center" prop="place" label="地区" width="120"></el-table-column>
				    <el-table-column align="center" prop="start_time" label="开始时间" width="140"></el-table-column>
				    <el-table-column align="center" prop="end_time" label="截止时间" width="140"></el-table-column>
				    <el-table-column align="center" prop="connactName" label="联系人" width="140"></el-table-column>
				    <el-table-column align="center" prop="connact" label="联系方式" width="130"></el-table-column>
				    <el-table-column align="center" prop="money" label="活动金额/￥" width="120"></el-table-column>
				    <el-table-column align="center" label="其他">
				    	<template slot-scope="scope">
					        <el-button size="mini" type="primary" @click="handleEdit(scope.row,1)" >其他</el-button>
					        <el-button size="mini" type="primary" @click="handleEdit(scope.row,2)" >查看报名</el-button>
			            </template>
				    </el-table-column>
				</el-table> 
		    </el-col>
		</el-row>
		<el-dialog title="详情"  :visible.sync="dialogVisible" width="50%"><!-- 详情 -->
		    <el-row   type="flex" class="row-bg" justify="end">
			    <el-col :span="12" v-if="state_two==1">
			    	<el-row>
						<el-col :span="12" >名额数量</el-col>
						<el-col :span="12">{{details.people}}人</el-col>
					</el-row>
			    </el-col>
			    <el-col :span="12" v-if="state_two==1">
			    	<el-row>
						<el-col :span="10" >年龄</el-col>
						<el-col v-if="details.allAge" :span="12">{{details.allAge}}</el-col>
						<el-col v-if="details.ageStar" :span="4">{{details.ageStar}}cm</el-col>
						<el-col v-if="details.ageStar" :span="2">—</el-col>
						<el-col v-if="details.ageEnd" :span="4">{{details.ageEnd}}cm</el-col>
					</el-row>
			    </el-col>
			</el-row>
			
		    <el-row v-if="state_two==1">
			    <el-col :span="24" class="details_bt">活动详情</el-col>
			    <el-col :span="24">{{details.content}}</el-col>
			</el-row>
		    <span slot="footer" class="dialog-footer">
		        <el-button class="right" type="primary" @click="dialogVisible = false">确定</el-button>
		    </span>
		</el-dialog>
		<div  class="fls" v-if="state==1">   <!-- 分页 -->
		    <el-pagination
				  :page-size="goods_page.per_page"
				   layout="prev, pager, next"
				  :total="goods_page.total"
				  :current-page.sync="goods_page.current_page" 
				  @current-change="handleCurrentChange">
				</el-pagination>
				<!--
				page-size  
				current-page.sync 当前页数-->
		</div>
		
		<el-dialog title="选择时间" :visible.sync="excel" width="40%" >  <!-- 选择时间 -->
		     <el-row class="center_box">
			    <el-col :span="11">   
			    	<el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
			    </el-col>
			    <el-col :span="2" class="center">—</el-col>
			    <el-col :span="11">
			    	<el-date-picker v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
			    </el-col>
			</el-row>
		    <span slot="footer" class="dialog-footer">
			    <el-button @click="excel = false">取 消</el-button>
			    <el-button type="primary" @click="export_two">确 定</el-button>
			</span>
		</el-dialog>
		<el-table id="table" v-show="false" :data="tableData_two" border style="width: 100%"> <!-- 导出 -->
			<el-table-column align="center" prop="title" label="活动名称"></el-table-column>
			<el-table-column align="center" prop="babyname" label="萌娃名称" ></el-table-column>
			<el-table-column align="center" prop="username" label="用户昵称" ></el-table-column>
			<el-table-column align="center" prop="mobile" label="用户电话" ></el-table-column>
			<el-table-column align="center" prop="connactName" label="活动联系人" ></el-table-column>
			<el-table-column align="center" prop="connact" label="联系方式" ></el-table-column>
			<el-table-column align="center" prop="time" label="购买时间" ></el-table-column>
		</el-table>

		
	</div>
</template>

<script>
	import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
	export default{
		data(){
			return{
				state_two:'',
				state:'1',
				name:'',
				value1:'',
				value2:'',
				tableData:[],
				dialogVisible: false,
				excel:false,
				details:[],
				goods_page:[],
				tableData_two:[]
				
			}
		},
		created(){
			this.no_examine()
		},
		methods:{
			no_examine(){   
				this.$http.post(this.URL + '/index.php/api/geek_notice/activitys')
				.then(res=>{
					console.log(res.data.data)
					for(let i=0;i<res.data.data.length;i++){
						res.data.data[i].start_time=res.data.data[i].start_time.substring(0,10)
						res.data.data[i].end_time=res.data.data[i].end_time.substring(0,10)
						if(res.data.data[i].allAge !=null){
							res.data.data[i].allAge='不限'
						}
						
					}
					this.state=1
					this.name=""
					this.tableData=res.data.data
					this.goods_page=res.data
				})
			},
			handleCurrentChange(){
		     //	console.log(this.goods_page.current_page)
		     	this.$http.post(this.URL+"/index.php/api/geek_notice/activitys",{
		     		page:this.goods_page.current_page
		     	})
		     	.then((res)=>{
		     		for(let i=0;i<res.data.data.length;i++){
						res.data.data[i].start_time=res.data.data[i].start_time.substring(0,10)
						res.data.data[i].end_time=res.data.data[i].end_time.substring(0,10)
						if(res.data.data[i].allAge !=null){
							res.data.data[i].allAge='不限'
						}
					}	
		     //   console.log(res.data.data)
		            this.state=1
			        this.tableData=res.data.data
		      	})
		    },
			handleEdit(data,index){
				this.dialogVisible=true
				this.details=data
				this.state_two=index
			},
			search(){
				this.$http.post(this.URL + '/index.php/api/geek_notice/query_activitys',{
					name:this.name
				})
				.then(res=>{
					console.log(res.data)
					for(let i=0;i<res.data.length;i++){
						res.data[i].start_time=res.data[i].start_time.substring(0,10)
						res.data[i].end_time=res.data[i].end_time.substring(0,10)
						if(res.data[i].allAge !=null){
							res.data[i].allAge='不限'
						}
						
					}
					this.state=2
					this.tableData=res.data
				})
			},
			exports(){  //导出excel按钮
				this.excel=true
				this.value1=""
				this.value2=''
			},
			export_two(){ //导出Excel
				this.excel=false
				this.$http.post(this.URL + '/index.php/api/geek_notice/excel_activitys',{
					value:this.value1,
				    values:this.value2
				})
				.then(res=>{
					
					this.tableData_two=res.data
					setTimeout(() => {
							if(this.tableData_two !=''){
							console.log(this.tableData_two)
							  /* generate workbook object from table */
					         var wb = XLSX.utils.table_to_book(document.querySelector('#table'))
					         /* get binary string as output */
					         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
					         try {
					             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '活动报名.xlsx')
					         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
					         return wbout
						     }
						},500)
					
				})
				
				
	       

				
				
				
				
				
			}
			

		}
	}
</script>

<style>
.activity_app{
	margin: 20px 60px;
}
.head{
	margin-bottom: 10px;
}
.daochu{
	margin-left: 8px;
}
.details_bt{
	margin-bottom: 5px;
}
.fls{
		display: flex !important; 
		justify-content: center !important;
		z-index: 99;
}
.center_box{
	display: flex;
}
.center{
	display: flex;
	align-items: center;
}
.row-bg{
	margin-bottom: 10px;
}
</style>