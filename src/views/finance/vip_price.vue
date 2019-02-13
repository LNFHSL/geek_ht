<template>
	<div class="apps">
		<!-- vip -->
	    <el-row :gutter="20" v-if="state ==1" >
		  <el-col :span="5"><el-input v-model="name" placeholder="vip的名字，例如vip、svip" ></el-input></el-col>
		  <el-col :span="4"><el-input v-model="price" @blur="prices" placeholder="价格" ></el-input></el-col>
		  <el-col :span="7"><el-input v-model="discount" @blur="discounts" placeholder="优惠额度,例如0.8则为8折" ></el-input></el-col>
		  <el-col :span="4"><el-button type="primary" @click="vip">提交</el-button></el-col>
		  <el-col :span="4"><el-button type="primary" @click="View_members(state)" round>查看会员</el-button></el-col>
		</el-row>
		
		<el-row class="xianshi" v-if="state ==1">
			<el-col :span="24">
				<template>
					<el-table :data="vip_data" border style="width: 100%">
					   <el-table-column align="center" prop="name" label="名字" width="200" ></el-table-column>
					   <el-table-column align="center" prop="price" label="价格/￥" ></el-table-column>
					   <el-table-column align="center" prop="discount" label="折扣力度" ></el-table-column>
					   <el-table-column align="center"  label="状态" >
					   	    <template slot-scope="scope">
								<el-button size="mini" type="success" v-if="scope.row.state == 1">售卖</el-button>
								<el-button size="mini" type="danger"  v-if="scope.row.state == 2">下架</el-button>
							</template>
					   </el-table-column>
					   <el-table-column label="操作" align="center" width="200">
					   	  <template slot-scope="scope">
						        <el-button size="mini" type="danger" @click="deletes(scope.$index, scope.row)">删除</el-button>
						        <el-button size="mini" type="warning" @click="Lower_shelf(scope.$index, scope.row)" v-if="scope.row.state == 1">下架</el-button>
						  </template>
					   </el-table-column>
					</el-table>
				</template>
			</el-col>
		</el-row>
		
		<!-- 用户会员 -->
		<el-row :gutter="20" v-if="state ==2" >
		    <el-col :span="4">
                <el-select v-model="label" placeholder="请选择">
               <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        	  </el-select>
		    </el-col>
		    <el-col :span="8"><el-input v-model="username" placeholder="请选择" ></el-input></el-col>
		    <el-col :span="4"><el-button type="primary" @click="user_query">查询</el-button></el-col>
		    <el-col :span="4" :offset="4"><el-button class="button" type="primary" @click="View_members(state)" round >vip管理</el-button></el-col>
		</el-row>
		
		<el-row class="xianshi" v-if="state ==2">
			<el-col :span="24">
				<template>
					<el-table :data="user_data" border style="width: 100%" >
					   <el-table-column prop="username" label="用户名" ></el-table-column>
					   <el-table-column prop="name" label="会员类型" sortable ></el-table-column>
					   <el-table-column prop="time" label="开通时间" sortable ></el-table-column>
					</el-table>
				</template>
			</el-col>
		</el-row>
		<div  class="fls">
	    <el-pagination
	    	  v-if="state ==2"
			  :page-size="goods_page.per_page"
			   layout="prev, pager, next"
			  :total="goods_page.total"
			  :current-page.sync="goods_page.current_page"
			  @current-change="handleCurrentChange">
			</el-pagination>
		</div>
		
		
	</div>
</template>		
		
		

<script>
	export default{
		data(){
			return{
			  name:'',
			  price:'',
			  username:'',
			  member:'',
			  discount:'',
			  vip_data:[],
			  user_data:[],
			  goods_page:[],
			  state:1,
			  label:'',
			  options: [{value: '1',label: '用户名'}, {value: '2',label: '会员类型'}],
			}
		},
		created(){
			this.display_vip()
			this.display_user()
		},
		methods:{
			vip(){  //添加vip
				if(this.name == ''){
					this.$message({ message: 'vip名字不能为空',type: 'warning' })
				}
				else if(this.price == ''){
					this.$message({ message: '价格不能为空',type: 'warning' })
				}
				else if(this.discount == ''){
					this.$message({ message: '折扣不能为空',type: 'warning' })
				}
				else{
					this.$http.post(this.URL+'/index.php/api/geek_set/vip',{
						name:this.name.toUpperCase(),price:this.price,discount:this.discount
					})
			    	.then((res)=>{
			    		  this.name=''
			    		  this.price=''
			    		  this.discount=''
			    		  this.$message({showClose: true,message: '提交成功',type: 'success' })
			    		  this.display_vip()
			    	})
		        }
			},
			
			display_vip(){ //遍历vip
				this.$http.post(this.URL+'/index.php/api/geek_set/display_vip')
		    	.then((res)=>{
		    		 console.log(res.data)
		    		 for(let i=0;i<res.data.length;i++){
		    		 	res.data[i].discount=res.data[i].discount*100+"%"
		    		 }
		    		 this.vip_data=res.data
		    	})
			},
			display_user(){ //遍历vip用户
				this.$http.post(this.URL+'/index.php/api/geek_set/display_user')
		    	.then((res)=>{
		    		 console.log(res.data.data)
		    		 this.user_data=res.data.data
		    		 this.goods_page=res.data
		    	})
			},
			user_query(){  //查询vip用户
				this.$http.post(this.URL+'/index.php/api/geek_set/vip_user_query',{
					classify:this.label,
					input:this.username
				})
		    	.then((res)=>{
		    		 console.log(res.data)
		    		 this.user_data=res.data.data
		    	     this.goods_page=res.data
		    	})
			},
			deletes(index,data){  //删除vip  
		     	this.$confirm('确认删除吗', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }) 
		     	.then(_ => { 
		     		console.log(data)
		     		    this.$http.post(this.URL+"/index.php/api/geek_set/delete_vip",{
		     		    	id:data.id
		     		    }).then((res)=>{
		     		    	console.log(res.data)
		     		    	 if(res.data == 1){
		     		    	 	this.vip_data.splice(index,1)
		     		    	 	this.$message({message: '删除成功',type: 'success'});
		     		    	 }else if(res.data == 2){
		     		    	  this.$message.error('删除失败');
		     		    	 }else if(res.data == 3){
		     		    	  this.$message.error('还有用户使用');
		     		    	 }
		     		    	
		     		    })
		     	})
		       .catch(_ => {});
		     },
		     Lower_shelf(index,data){  //下架vip  
		     	this.$confirm('确认下架吗', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }) 
		     	.then(_ => {
		     		    this.$http.post(this.URL+"/index.php/api/geek_set/Lower_shelf",{
		     		    	id:data.id
		     		    }).then((res)=>{
		     		    	 if(res.data == 1){
		     		    	 	this.vip_data[index].state=2
		     		    	 	this.$message({message: '已下架',type: 'success'});
		     		    	 }else{
		     		    	  this.$message.error('下架失败');
		     		    	 }
		     		    	
		     		    })
		     	})
		       .catch(_ => {});
		     },
		    View_members(state){
		       if(state==1){
		       	   this.state=2
		       }else{
		       	 this.state=1
		       }
		     },
		    handleCurrentChange(){
			     //	console.log(this.goods_page.current_page)
			     	this.$http.post(this.URL+"/index.php/api/geek_set/display_user",{
			     		page:this.goods_page.current_page
			     	})
			     	.then((res)=>{
			     //   console.log(res.data.data)
				        this.user_data=res.data.data
			     	})
		    },
		    prices(){
		     	let reg=/\D/g;
				if(reg.test(this.price)){ 
					this.$message({ message: '只能输入数字',type: 'warning'});this.price=""}
				
		    },
		    discounts(){
		    	let reg=/\D./g;
				if(reg.test(this.discount)){ 
					this.$message({ message: '只能输入数字和一位小数点',type: 'warning'});this.discount=""}
		    }
			
			
	}
		
		
	}
</script>

<style scope>
	.apps{
		margin: 20px 60px;
	}
	.xianshi{
		margin-top: 30px;
	}
	.button{
		width:104px;
	}
	.fls{
		display: flex !important; 
		justify-content: center !important;
		z-index: 99;
	}
</style>