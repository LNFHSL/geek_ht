<template>
	<div class="add_report_app">
		<el-row> <!-- 第一块 -->
		    <el-col :span="8">
		    	   <el-row>
					  <el-col :span="24" class="title_name"><span>通告封面</span></el-col>
					  <el-col :span="24"><imgs @receiveimg="receive_img"></imgs></el-col>
					</el-row>
		    </el-col>
		    
		    <el-col :span="16" class="two"><!-- 图片右边的 -->
		    	    <el-row>
					  <el-col :span="24" class="title_name"><span>通告标题</span></el-col>
					  <el-col :span="24"><el-input v-model="title" placeholder="请输入内容"></el-input></el-col>
					</el-row>
					 <el-row class="one"> <!--节目类型  招募地区-->
					 	<el-col :span="12">
					 	 	<el-row>
								<el-col :span="24" class="title_name"><span>节目类型</span></el-col>
								<el-col :span="24">
								  	    <el-select class="choice" v-model="values" placeholder="请选择">
										    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
										</el-select>
										<el-select class="choice" v-model="value" placeholder="请选择">
										    <el-option v-for="item in optionss" :key="item.id" :label="item.name" :value="item.name"></el-option>
										</el-select>
								</el-col>
							</el-row>
					 	</el-col>
					 	<el-col :span="12">
					 	 	<el-row>
						        <el-col :span="24" class="title_name"><span>招募地区</span></el-col>
								<el-col :span="24">
								  	<el-select v-model="value2" placeholder="请选择">
									    <el-option v-for="item in options_two" :key="item" :label="item" :value="item">
									    </el-option>
									</el-select>
								</el-col>
							</el-row>
					 	</el-col>
					</el-row>
					
		    	
		    </el-col>
		</el-row>
		<div class="two_box"> <!-- 第二块 -->
		<el-row type="flex" class="row-bg" justify="space-between">  
			<el-col :span="6">
				<el-row>
					<el-col :span="24" class="title_name"><span>截至时间</span></el-col>
					<el-col :span="24">
						<el-date-picker v-model="time" type="date" placeholder="选择日期"></el-date-picker>
					</el-col>
				</el-row> 
			</el-col>
			<el-col :span="6">
				<el-row>
					<el-col :span="24" class="title_name"><span>联系人</span></el-col>
					<el-col :span="24">
						<el-input v-model="name" @blur="checkName" placeholder="请输入联系人"></el-input>
					</el-col>
				</el-row> 
			</el-col>
			<el-col :span="6">
				<el-row>
					<el-col :span="24" class="title_name"><span>联系方式</span></el-col>
					<el-col :span="24">
						<el-input v-model="name_phone"  @blur="checkPhone" placeholder="请输入联系方式"></el-input>
					</el-col>
				</el-row> 
			</el-col>
		</el-row>
		</div>
		<div class="three_box"> <!-- 第三块 -->
		<el-row type="flex" class="row-bg"  justify="space-between">  
			<el-col :span="6">
				<el-row>
						<el-col :span="24" class="title_name"><span>通告类型</span></el-col>
						<el-col :span="24">
						    <el-radio-group v-model="type" size="medium">
						      <el-radio-button label="面议" ></el-radio-button>
						      <el-radio-button label="片酬"></el-radio-button>
						      <el-radio-button label="付费"></el-radio-button>
						      <el-radio-button label="免费"></el-radio-button>
						    </el-radio-group>	
						</el-col>
				</el-row> 
			</el-col>
			<el-col :span="6">
				<el-row>
					<el-col :span="24" class="title_name"><span>是否需要面试</span></el-col>
					<el-col :span="24" class='top'>
						<el-radio v-model="Interview" label="是">是</el-radio>
						<el-radio v-model="Interview" label="否">否</el-radio>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="6">
				<el-row>
					<el-col v-if="money_xy" :span="24" class="title_name"><span>请输入金额</span></el-col>
					<el-col v-if="money_xy" class="money"  :span="24"><el-input v-model="money" oninput ="value=value.replace(/[^\d.]/g,'')" placeholder="请输入金额"></el-input></el-col>
				</el-row>
				
			</el-col>
		</el-row>
		</div>
	    <div class="four_box three_box">  <!-- 第四块 -->
	    	<el-row>
			    <el-col class="title_name" :span="24"><span>通告详情</span></el-col>
			    <el-col :span="24">
			    	<el-input
						type="textarea"
						:autosize="{ minRows: 7}"
						placeholder="请输入内容"
						v-model="xq_text">
					</el-input>
			    </el-col>
			</el-row>
	    </div>
        <div class="fur_box"> <!-- 第五块 -->
        	<el-row>
			    <el-col :span="24" class="js_xz_two">
			  	    <div class="jss"   v-for="(item,index) in role" :class="seindex==index?'xzjss':''">
			  	        <div class="js" :class="seindex==index?'xzjss':''" @click="selection(index)">角色{{index+1}}</div>
			  	        <div @click="deletes(index)"><svg-icon class="gb_img" :class="seindex==index?'xzjss':''"   icon-class="gb"/></div>
			  	    </div>	
			  	    <div><el-button type="primary" round size="mini" @click="add_role">新增角色</el-button></div>
			    </el-col>
			    <el-col :span="24" class="three_box" v-for="(item,index) in role" v-if="index==seindex"> <!-- 内容 -->
			    	
			  	    <el-row type="flex" class="row-bg" justify="space-between">
			  	        <el-col :span="6">
			  	        	<el-row>
								<el-col :span="24" class="title_name"><span>性别</span></el-col>
								<el-col :span="24" class="js_xz sex" >
								        <el-radio-group v-model="item.sex" >
										    <el-radio label="不限">不限</el-radio>
										    <el-radio label="男">男</el-radio>
										    <el-radio label="女">女</el-radio>
										</el-radio-group>
								</el-col>
				           </el-row>
			  	        </el-col>
					    <el-col :span="6">
					  	    <el-row>
								<el-col :span="24" class="title_name"><span>年龄</span></el-col>
								<el-col :span="24" class="js_xz">
								      <el-radio v-model="item.age.allAge" label="1" class="radio" @change="changeAllage(index)">不限</el-radio>	
								      <el-input v-model="item.age.ageStar" class="input" @change="changeAge(index,$data)" placeholder="年龄范围" oninput ="value=value.replace(/[^\d.]/g,'')"></el-input>
								      <el-input v-model="item.age.ageEnd" @change="changeAge(index,$data)" placeholder="年龄范围" oninput ="value=value.replace(/[^\d.]/g,'')"></el-input>
								</el-col>
				           </el-row> 
					    </el-col>
					    <el-col :span="6">
					    	<el-row>
								<el-col :span="24" class="title_name"><span>身高</span></el-col>
								<el-col :span="24" class="js_xz">
								      <el-radio v-model="item.heigh.allHeigh" class="radio" label="1" @change="changeAllheigh(index)">不限</el-radio>	
								      <el-input v-model="item.heigh.heighStar" class="input" @change="changeHeigh(index,$data)"  placeholder="身高范围" oninput ="value=value.replace(/[^\d.]/g,'')"></el-input>
								      <el-input v-model="item.heigh.heighEnd" @change="changeHeigh(index,$data)" placeholder="身高范围" oninput ="value=value.replace(/[^\d.]/g,'')"></el-input>
								</el-col>
				           </el-row>
					    </el-col>
					</el-row>
					
					<el-row type="flex" class="row-bg" justify="space-between" >
					    <el-col :span="6">
					    	<el-row>
								<el-col :span="24" class="title_name"><span>人数</span></el-col>
								<el-col :span="24" >
								    	<el-input v-model="item.people" oninput ="value=value.replace(/[^\d]/g,'')" placeholder="请输入人数"></el-input>
								</el-col>    
				            </el-row>
						</el-col>
					    <el-col :span="6">
					    	<el-row>
								<el-col :span="24" class="title_name"><span>积分</span></el-col>
								<el-col :span="24">
								    	<el-input v-model="item.score" oninput ="value=value.replace(/[^\d.]/g,'')" placeholder="请输入积分"></el-input>
								</el-col>    
				            </el-row>  
					    </el-col>
					    <el-col :span="6">
					    	<el-row>
								<el-col :span="24" class="title_name"><span>片酬</span></el-col>
								<el-col :span="24" >
								    	<el-input v-model="item.money2" oninput ="value=value.replace(/[^\d.]/g,'')" placeholder="请输入片酬"></el-input>
								</el-col>    
				            </el-row>
					    </el-col>
					</el-row>
			    </el-col>
			</el-row>
			        	
        </div>	
	    <div>
	    	<el-row>
			    <el-col :span="24">
			    	<el-button class="sub" type="primary" @click="sub">提交审核</el-button>
			    </el-col>
			</el-row>
	    </div>  <!-- 提交 -->
	</div>
</template>

<script>
import imgs from '../../components/upimage'	
	
	export default{
		components:{
			imgs
		},
		data(){
			return{
				img:'',    //图片
				title:'',   //标题
				values:'',
				value:'',  //节目类型
				value2:'',  //招募地区
				type:'面议',   //通告类型
				Interview:'是', //是否需要面试
				money:'',   //钱
				time:'',    //时间
				xq_text:'', //通告详情
				name:'',  //联系人
				name_phone:'', //联系方式
				options:[],
				optionss:[],
				options_two:['全国','北京','天津','河北','山西','内蒙古','山东',
				'江苏','安徽','浙江','福建','上海','广东','广西','海南','香港',
				'澳门','湖北','湖南','河南','江西','宁夏','新疆','青海','陕西',
				'甘肃','四川','云南','贵州','西藏','重庆','辽宁','吉林','黑龙江'],
				seindex:0,//选中的下标
				money_xy:false,
				
				role:[
					{
						sex:'不限',
						age:{
							allAge:'1',
							ageStar:'',
							ageEnd:'',
						},
						heigh:{
							allHeigh:'1',
							heighStar:'',
							heighEnd:'',
						},
						people:1,
						score:0,
						money2:'',
					}
				],
				
				
			}
		},
		created(){
			this.$http.post(this.URL + '/index.php/api/geek_notice/an_classify')
			.then(res=>{
				console.log(res.data)
				this.options=res.data
			})
		},
		methods:{
			receive_img(data){ //子组件拿的图片
			 this.img=data
			},
			checkName(){   //验证联系人
				let reg=/^([\u4e00-\u9fa5]){2,5}$/;
				if(!reg.test(this.name)){ this.$message({ message: '请输入2至5位汉字',type: 'warning'});this.name=""}
			},
			checkPhone(){  //验证联系方式
				let reg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
				if(!reg.test(this.name_phone)){this.$message({ message:'请输入正确的联系方式',type: 'warning'});this.name_phone='';}
			},
			
			
			add_role(){       //添加角色
				this.role.push( new Object({
					sex:'不限',
					age:{allAge:'1',ageStar:'',ageEnd:'',},
					heigh:{allHeigh:'1',heighStar:'',heighEnd:'',},
					people:1,
					score:0,
					money2:''}) 
				);
				console.log(this.role)
			},
			deletes(index){  //删除数组
				if(this.role.length>1){
					this.role.splice(index,1);
					this.seindex=index-1;
				console.log(this.role)
				}
			},
			selection(index){   //选中哪个数组
				this.seindex=index
			},
			changeAge(index,data){   //年龄范围  为空是不限就显示
				//console.log(data.role[index].age.ageStar)
				if(data.role[index].age.ageStar!='' || data.role[index].age.ageEnd!=''){
					this.role[index].age.allAge='';
				}else{
					this.role[index].age.allAge='1';
				}
			},
			changeAllage(index){  //点击 年龄的不限 清空input
				this.role[index].age.ageStar=''
				this.role[index].age.ageEnd=''
			},
			
			changeHeigh(index,data){   //身高范围  为空是不限就显示
				//console.log(data.role[index].heigh.heighStar)
				if(data.role[index].heigh.heighStar!='' || data.role[index].heigh.heighEnd!=''){
					this.role[index].heigh.allHeigh='';
				}else{
					this.role[index].heigh.allHeigh='1';
				}
			},
			changeAllheigh(index){  //点击 身高的不限 清空input
				this.role[index].heigh.heighStar=''
				this.role[index].heigh.heighEnd=''
			},
			handleChange(value){
				   console.log(value);
			},
			sub(){  //提交
				if(this.img == ''){
					 this.$message({ message: '图片不能为空', type: 'warning'});
				}
				else if(this.title== ''){
					this.$message({ message: '通告标题不能为空', type: 'warning'});
				}
				else if(this.value== ''){
					this.$message({ message: '节目不能为空', type: 'warning'});
				}
				else if(this.value2== ''){
					this.$message({ message: '招募地区不能为空', type: 'warning'});
				}
				else if(this.time== ''){
					this.$message({ message: '截至时间不能为空', type: 'warning'});
				}
				else if(this.name== ''){
					this.$message({ message: '联系人不能为空', type: 'warning'});
				}
				else if(this.name_phone== ''){
					this.$message({ message: '联系方式不能为空', type: 'warning'});
				}
				else if(this.type== '付费' && this.money ==''){
					console.log(this.money)
						this.$message({ message: '付费金额不能为空', type: 'warning'});
				}
				else if(this.xq_text== ''){
					this.$message({ message: '通告详情不能为空', type: 'warning'});
				}else{
					 this.$http.post(this.URL + '/index.php/api/geek_notice/add_notice', {
					    thumb:this.img,  
					    title:this.title,
					    film:this.value, 
					    type:this.type,
					    talk_pay:this.Interview,
					    place:this.value2,
					    endtime:this.time,
					    connactName:this.name,
					    connact:this.name_phone,
					    content:this.xq_text,
					    money:this.money,
					    role:this.role,
					 })
					 .then(res=>{
					 	if(res.data == 1){
					 		this.$message({ message: '提交成功', type: 'success'});
					 	    this.$router.go(0)
					 	}else{
					 		this.$message.error('提交失败');
					 	}
					 	 
					 })
					
					
				}
				
			}
			
		},
		watch:{
			type:function(cur){
				console.log(cur);
				if(cur == "付费"){
					this.Interview='否'
					this.money_xy=true
				}else{
					this.Interview='是'
					this.money_xy=false
				}
				
			},
			Interview:function(cur){
				if(this.type=="付费"){
					this.Interview='否'
				}
				
			},
			values:function(cur){
    		for(let i=0;i<this.options.length;i++){
    			if(cur ==this.options[i]['id']){
    				this.value=''
    				this.optionss=this.options[i]['children']
    			}
    		}
    	}
			
		}
		
		
	}
</script>

<style scoped>
	.add_report_app{margin: 10px 60px;}
	.title_name{margin-bottom:10px ;}
	.one{margin-top:50px;}
	.two{margin-top: 15px;}
	.three{margin-top: 30px;}
	span{color:#808080;}
	.top{margin-top:7px ;}
	.two_box{margin-top: 20px;}
	.three_box{margin-top: 40px;}
	.fur_box{margin:30px 0;}
	.js_xz{display: flex;}
	.js_xz_two{display: flex;flex-wrap: wrap;}
	.jss{display:flex;border: 1px solid  #D9D9D9;padding: 5px 5px;border-radius: 30px; align-self: baseline;width: max-content;margin-right:10px ;cursor:pointer;margin-bottom: 4px;}
	.js{color:#808080;font-size:15px;padding-right:7px;}
	.xzjss{color: #FFFFFF !important;background:  dodgerblue ;}
	.row-bg{margin-top: 40px;}
	.input{margin: 0 10px;}
	.radio{display: flex;align-items: center;}
	.sex{margin-top: 15px;}
	.sub{float: right;margin-bottom: 50px;}
	.choice{width: 130px;}
</style>