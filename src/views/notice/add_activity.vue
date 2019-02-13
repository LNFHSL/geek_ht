<template>
	<div  class="add_activity_app">
		<el-row> <!-- 第一块 -->
		  <el-col :span="12">
		  	    <el-row>
					<el-col :span="24" class="title_name"><span>通告封面</span></el-col>
					<el-col :span="24"><imgs @receiveimg="receive_img"></imgs></el-col>
				</el-row>
		  	
		  </el-col>
		  <el-col :span="12" class="right_box" >
			  	<el-row>
				    <el-col :span="24">
				    	<el-row>
							<el-col :span="24" class="title_name"><span>通告标题</span></el-col>
							<el-col :span="24"><el-input v-model="title" placeholder="请输入内容"></el-input></el-col>
						</el-row>
				    	
				    </el-col>
				</el-row>
				<el-row class="class_box"> 
				    <el-col :span="12">
				    	<el-row>
							<el-col :span="24" class="title_name"><span>节目类型</span></el-col>
							<el-col :span="24">
								<el-select class="choice" v-model="values" placeholder="请选择">
									<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
								<el-select class="choice" v-model="film" placeholder="请选择">
									<el-option v-for="item in optionss" :key="item.id" :label="item.name" :value="item.name"></el-option>
								</el-select>
							</el-col>
						</el-row>
				    </el-col>
				    <el-col :span="12">
				    	<el-row>
						    <el-col :span="24" class="title_name"><span>招募地区</span></el-col>
							<el-col :span="24">
								<el-select v-model="place" placeholder="请选择">
									<el-option v-for="item in options_two" :key="item" :label="item" :value="item">
									</el-option>
								</el-select>
							</el-col>
						</el-row>
				    </el-col>
				</el-row>
		  </el-col>
		</el-row>
		<el-row type="flex" class="row-bg" justify="space-between">  <!-- 第二块 -->
		    <el-col :span="6">
		    	<el-row>
					<el-col :span="24" class="title_name"><span>起止时间</span></el-col>
					<el-col :span="24" class="time_box">
						<el-date-picker class="time" v-model="start_time" type="date" placeholder="选择日期"></el-date-picker>
						<div class="time_xian">—</div>
					    <el-date-picker class="time" v-model="end_time" type="date" placeholder="选择日期"></el-date-picker>
					</el-col>
				</el-row>
		    </el-col>
		    <el-col :span="6">
		    	<el-row>
					<el-col :span="24" class="title_name"><span>联系人</span></el-col>
					<el-col :span="24">
						<el-input v-model="connactName" @blur="checkName" placeholder="请输入联系人"></el-input>
					</el-col>
				</el-row>
		    </el-col>
		    <el-col :span="6">
		    	<el-row>
					<el-col :span="24" class="title_name"><span>联系方式</span></el-col>
					<el-col :span="24">
						<el-input v-model="connact"  @blur="checkPhone" placeholder="请输入联系方式"></el-input>
					</el-col>
				</el-row> 
		    </el-col>
		</el-row>
		<el-row type="flex" class="row-bg" justify="space-between"> <!-- 第三块  -->
		    <el-col :span="6">
		    	<el-row>
					<el-col :span="24" class="title_name"><span>年龄/cm</span></el-col>
					<el-col :span="24">
						<el-radio v-model="allAge"  @change="allAges" label="1">不限</el-radio>
						<el-input  v-model="ageStar" @change="agemaxmin"  class="age" placeholder="最小年龄" oninput ="value=value.replace(/[^\d]/g,'')"></el-input>
						<el-input v-model="ageEnd"  @change="agemaxmin"  class="age" placeholder="最大年龄" oninput ="value=value.replace(/[^\d]/g,'')"></el-input>
					</el-col>
				</el-row>
		    </el-col>
		    <el-col :span="6">
		    	<el-row>
					<el-col :span="24" class="title_name"><span>名额数量</span></el-col>
					<el-col :span="24">
						<el-input-number v-model="people" :min="1" :max="500" label="名额数量"></el-input-number>
					</el-col>
				</el-row>
		    </el-col>
		    <el-col :span="6">
		    	<el-row>
					<el-col :span="24" class="title_name"><span>活动金额</span></el-col>
					<el-col :span="24">
						<el-input-number v-model="money" :min="0" label="请输入活动金额"></el-input-number>
					</el-col>
				</el-row>
		    </el-col>
		</el-row>
		<el-row class="row-bg"> <!-- 第四块 -->
		    <el-col :span="24" class="title_name"><span>通告标题</span></el-col>
			<el-col :span="24">
				<el-input type="textarea"
					   :autosize="{ minRows:4, maxRows: 6}"
					   placeholder="请输入内容"
					   v-model="content">
				</el-input>
			</el-col>
		</el-row>
		<el-row class="button_box">
		    <el-col :span="24">
		    	<el-button type="primary" @click="sub">提交</el-button>
		    </el-col>
		</el-row>
		
		    	    
		    
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
				thumb:'',    //图片
				title:'',    //标题
				film:'',     //活动类型	
				place:'',    // 地区
				start_time:'', //开始时间
				end_time:'',   //结束时间    
				connactName:'', //联系人
				connact:'', //联系方式
				allAge:'1',  //不限年龄
				ageStar:'', //年龄的开始
				ageEnd:'', //年龄的结束
				people:'1',   //名额数量
				money:'0',    //活动金额
				content:'',  //活动详情
				values:'',
				options:[],
				optionss:[],
				options_two:['全国','北京','天津','河北','山西','内蒙古','山东',
				'江苏','安徽','浙江','福建','上海','广东','广西','海南','香港',
				'澳门','湖北','湖南','河南','江西','宁夏','新疆','青海','陕西',
				'甘肃','四川','云南','贵州','西藏','重庆','辽宁','吉林','黑龙江'],
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
				console.log(data)
			 this.thumb=data
			},
			checkName(){   //验证联系人
				let reg=/^([\u4e00-\u9fa5]){2,5}$/;
				if(!reg.test(this.connactName)){ this.$message({ message: '请输入2至5位汉字',type: 'warning'});this.connactName=""}
			},
			checkPhone(){  //验证联系方式
				let reg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
				if(!reg.test(this.connact)){this.$message({ message:'请输入正确的联系方式',type: 'warning'});this.connact='';}
			},
			allAges(){
				this.ageStar=''
				this.ageEnd=''
			},
			agemaxmin(){
				if(this.ageStar !='' || this.ageEnd !=''){
					this.allAge=''
				}else{
					this.allAge='1'
				}
			},
			sub(){
				if(this.thumb == ''){
					 this.$message({ message: '图片不能为空', type: 'warning'});
				}
				else if(this.title== ''){
					this.$message({ message: '活动标题不能为空', type: 'warning'});
				}
				else if(this.film== ''){
					this.$message({ message: '活动类型不能为空', type: 'warning'});
				}
				else if(this.place== ''){
					this.$message({ message: '地区不能为空', type: 'warning'});
				}
				else if(this.start_time== ''){
					this.$message({ message: '开始时间不能为空', type: 'warning'});
				}
				else if(this.end_time== ''){
					this.$message({ message: '结束时间不能为空', type: 'warning'});
				}
				else if(this.connactName== ''){
					this.$message({ message: '联系人不能为空', type: 'warning'});
				}
				else if(this.connact== ''){
					this.$message({ message: '联系方式不能为空', type: 'warning'});
				}
				else if(this.people== ''){
					this.$message({ message: '名额数量不能为空', type: 'warning'});
				}
				else if(this.money== ''){
					this.$message({ message: '活动金额不能为空', type: 'warning'});
				}
				else if(this.content== ''){
					this.$message({ message: '活动详情不能为空', type: 'warning'});
				}
				else{
					 this.$http.post(this.URL + '/index.php/api/geek_notice/add_activitys', {
						thumb:this.thumb,  
						title:this.title,
						film:this.film, 
						place:this.place,
						start_time:this.start_time,
						end_time:this.end_time,
						connactName:this.connactName,
						connact:this.connact,
						allAge:this.allAge,
						ageStar:this.ageStar,
						ageEnd:this.ageEnd,
						people:this.people,
						money:this.money,
						content:this.content
					 })
					 .then(cur=>{
					 	if(cur.data == 1){
					 		this.$message({  message: '提交成功', type: 'success'  });
					 		  setTimeout(() => {this.$router.go(0)}, 800)
					 		
					 	}else{
					 		this.$message.error('提交失败');
					 	}
					 })
					
				}
				
				
				
			}
		},
		watch:{
			values:function(cur){
	    		for(let i=0;i<this.options.length;i++){
	    			if(cur ==this.options[i]['id']){
	    				this.value=''
	    				this.optionss=this.options[i]['children']
	    			}
    		    }
            },
//          people:function(cur){
//          	console.log(cur)
//          }
           
		}
	}
</script>

<style scoped="scoped">
.add_activity_app{
	margin:30px 60px;
}
.title_name{
	margin-bottom:10px;
}
.choice{
	width: 130px;
}
.class_box{
	margin-top: 30px;
}
.right_box{
	margin-top: 20px;
}
.time_box{
	display: flex;
}
.time{
	width:150px;
}
.time_xian{
	display: flex;
	align-items: center;
	margin: 0 3px;
}
.age{
	width: 90px;
}
.row-bg{
	margin-top:20px;
}
.button_box{
	margin-top:12px;
	float: right;
}
</style>