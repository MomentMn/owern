let template = `
<el-dialog :visible.sync="dialogVisible" :before-close="closeDialog" width="800px" custom-class="course-dialog" v-on:open="openDialog">
	<el-form ref="tmpCourse" :model="tmpCourse" label-width="180px" :rules="rules" v-on:validate="validate">
		<el-form-item label="课程" prop="name">
			<el-input v-model="tmpCourse.name"></el-input>
		</el-form-item>
		
		<el-form-item label="培训机构" prop="awardingOrganization">
			<el-input v-model="tmpCourse.awardingOrganization"></el-input>
		</el-form-item>
		
		<el-form-item label="课程开始时间" prop="startTime">
			<el-date-picker v-model="tmpCourse.startTime"
			type="date"
			placeholder="选择时间"
			format="dd/MM/yyyy"
			value-format="dd/MM/yyyy"
			:picker-options="dateOption">
    		</el-date-picker>
		</el-form-item>
		
		<el-form-item label="培训时长" prop="trainingHours">
			<el-input v-model="tmpCourse.trainingHours"></el-input>
		</el-form-item>
		
		<el-form-item label="课程费用" prop="courseFee">
			<el-input v-model="tmpCourse.courseFee"></el-input>
			<span> / 人</span>
		</el-form-item>
		
		<el-form-item label="教师" prop="members">
			<div class="select-area el-input__inner">
				<span class="select-area-plus el-icon-circle-plus-outline" v-on:click="innerVisible=true"></span>
				<span class="select-label" v-for="(member,index) in tmpCourse.members" :key="member.id" :title="member.name.split('&').join(' ')">
					{{ member.name.split('&')[0] }}
					<span class="el-icon-close select-label-delete" v-on:click="handleDeleteMember(index)"></span>
				</span>
			</div>
		</el-form-item>
		
		<el-form-item label="培训技能" prop="dutyLevelSkillCode">
			<el-select v-model="tmpCourse.dutyLevelSkillCode" popper-class="training-skill-select">
				<el-option v-for="item in subCategory" :label="item.name" :value="item.code" :key="item.id" :title="item.name"/>
			</el-select>
		</el-form-item>
	</el-form>
	
	<div style="margin:45px auto 10px auto;" :style="{width: type==0?'408px':type==1?'522px':'280px' }">
		<el-button v-on:click="handleCancel" :disabled="buttonDisabled">取消</el-button>
		<el-button v-if="type!=2" type="success" v-on:click="handleSave" :disabled="buttonDisabled">保存计划</el-button>
		<el-button type="success" v-on:click="handleConfirm" :disabled="buttonDisabled">确认添加</el-button>
		<el-button v-if="type==1" type="danger" v-on:click="handleDelete" :disabled="buttonDisabled">删除计划</el-button>
	</div>
	
	<el-dialog :visible.sync="innerVisible" append-to-body custom-class="training-course-select-user">
		<el-checkbox-group v-model="selectTeachers">
			<div v-for="teacher in teachers" class="check-box">
				<el-checkbox
					:label="teacher"
					:key="teacher.id"
					:title="teacher.name.split('&').join(' ')">
					{{ teacher.name.split('&')[0] }}
				</el-checkbox>
			</div>
		</el-checkbox-group>
		<div slot="footer">
			<el-button v-on:click="handleSelectCancel">取消</el-button>
			<el-button v-on:click="handleSelectOk">确定</el-button>
		</div>
	</el-dialog>
</el-dialog>
`;

export default {
	template:template,
	props:{
		value:{
			type:Boolean,
			default:function(){return false;}
		},
		course:{
			type:Object,
			required:false,
		},
		type:{
			//0为plan add，1 为plan modify，2 为 list add
			type:Number,
			default:0,
		}
	},
	data:function(){
        var validateHours = (rule, value, callback) => {
        	if(value){
        	    var strValue = value.toString();
				if(strValue.match(/^[1-9]\d?$/)){
					callback();
				}else{
					callback(new Error("请输入少于100的整数"));
				}
			}
		};
        var validateFee = (rule, value, callback) => {
            if(value){
                var strValue = value.toString();
                if(strValue.match(/^[1-9]\d{0,10}$/)){
                    callback();
                }else{
                    callback(new Error("请输入少于11位数的整数"));
                }
            }
        };
        var validateSpace = (rule, value, callback) => {
            if(value){
                var strValue = value.toString();
                if(strValue.match(/(^\s)|(\s$)/)){
                    callback(new Error("please not start or end with space"));
                }else{
                    callback();
                }
            }
        };
		return{
            buttonDisabled:false,
			innerVisible:false,
			isOK:true,
			buttonType:1,
			tmpCourse:{
				name:'',
                awardingOrganization:'',
                startTime:'',
                trainingHours:'',
                courseFee:'',
				members:[],
                dutyLevelSkillId:'',
				dutyLevelSkillCode:'',
			},
			//待选区
			teachers:[],
			selectTeachers:[],
			subCategory:[],
			rules:{},
			planRules:{
            	id:1,
                name:[
                    {required:true, message:'课程名称不能为空', trigger:'blur'},
                    {validator:validateSpace,trigger:'blur'},
                    { min: 1, max: 250, message: '名称长度是1-250字符', trigger: 'blur' }
                ],
                awardingOrganization:[
                    {validator:validateSpace,trigger:'blur'},
                    { min: 1, max: 250, message: '培训机构名称长度是1-250字符', trigger: 'blur' }
                ],
                members:[
                    {type:'array',required:true, message:'教师不能为空', trigger:'blur'}
                ],
                courseFee:[
                    {validator:validateSpace,trigger:'blur'},
                    { validator:validateFee, trigger:'blur'},
                ],
                trainingHours:[
                    {validator:validateSpace,trigger:'blur'},
                    { validator:validateHours, trigger:'blur'},
                ],
			},
			confirmRules:{
            	id:2,
                name:[
                    {required:true, message:'课程名称不能为空', trigger:'blur'},
                    {validator:validateSpace,trigger:'blur'},
                    { min: 1, max: 250, message: '名称长度是1-250字符', trigger: 'blur' }
                ],
                awardingOrganization:[
                    {required:true, message:'培训机构名称不能为空', trigger:'blur'},
                    {validator:validateSpace,trigger:'blur'},
                    { min: 1, max: 250, message: '培训机构名称长度是1-250字符', trigger: 'blur' }
                ],
                members:[
                    {type:'array',required:true, message:'教师不能为空', trigger:'blur'}
                ],
                courseFee:[
                    {required:true, message:'费用不能为空', trigger:'blur'},
                    {validator:validateSpace,trigger:'blur'},
                    { validator:validateFee, trigger:'blur'},
				],
                startTime:[
                    {required:true, message:'开始时间不能为空', trigger:'blur'}
                ],
                trainingHours:[
                    {required:true, message:'训练时间不能为空', trigger:'blur'},
                    {validator:validateSpace,trigger:'blur'},
                    { validator:validateHours, trigger:'blur'},
                ],
			},
			dateOption:{
            	disabledDate:date => {
            		return date.getTime() < Date.now() - 8.64e7;
				}
			}
		}
	},
	mounted(){
		this.fetchSubCategory();
	},
	methods:{
		closeDialog:function(done){
			this.teachers = [];
			this.selectTeachers = [];
			this.$refs['tmpCourse'].resetFields();
			done();
		},
        openDialog(){
            this.fetchTeachers();
        },
		handleSelectOk(){
			let selectIds = this.selectTeachers.map(item => item.id);
			//待选区去除已选择的老师
			this.teachers = this.teachers.filter(item => selectIds.indexOf(item.id) < 0);
			//已选区添加已选择的老师
			this.tmpCourse.members = this.tmpCourse.members.concat(this.selectTeachers);
			//清空已选择区
			this.selectTeachers = [];
			this.innerVisible = false;
		},
        handleSelectCancel(){
			this.selectTeachers=[];
			this.innerVisible = false;
		},
		handleDeleteMember(index){
        	let member = this.tmpCourse.members.splice(index,1);
        	this.teachers.push(member[0]);
		},
		fetchTeachers(){
			server.get("/api/training/all/teacher").then(res => {
				let data = res.data.data;
				if(!data) return;
				let existTeacherIds = this.tmpCourse.members.map(item => item.id);
				this.teachers = data.filter(item => existTeacherIds.indexOf(item.id) < 0);
			}).catch(err => {
                if(err.response && err.response.data.msg){
                    this.$message.error(err.response.data.msg);
                }else{
                	this.$message.error("服务器连接错误")
				}
			});
		},
		fetchSubCategory(){
			server.get("/api/training/subCategory").then(res => {
				this.subCategory = res.data.data;
			}).catch(err => {
                if(err.response && err.response.data.msg){
                    this.$message.error(err.response.data.msg);
                }else{
                    this.$message.error("服务器连接错误")
                }
			});
		},
		handleSave(){
            this.$refs['tmpCourse'].clearValidate();
            this.buttonType = 1;
            if(this.rules.id == 1){
                this.$refs['tmpCourse'].validate().then(_=>{}).catch(_=>{});
			}else{
                this.rules = this.planRules;
			}
		},
		handleConfirm(){
			this.$refs['tmpCourse'].clearValidate();
            this.buttonType = 2;
            if(this.rules.id == 2){
            	//只触发校验，不对校验结果进行任何操作
                this.$refs['tmpCourse'].validate().then(_=>{}).catch(_=>{});
            }else{
            	//当rules更换时，自动会触发校验
                this.rules = this.confirmRules;
            }
			
		},
		validate(prop, status){
			//真正的校验操作
			this.isOK = this.isOK && status;
			if(prop == "members"){
				if(this.isOK){
					let code = this.tmpCourse.dutyLevelSkillCode;
					let skill = this.subCategory.find(item => item.code == code);
					if(skill){
                        this.tmpCourse.dutyLevelSkillId = skill.id;
					}
					if(this.buttonType == 1){
						this.tmpCourse.status = 1;
						this.validateOK();
					}else{
						this.tmpCourse.status = 2;
						this.validateOK();
					}
				}
				this.isOK = true;
				this.buttonType = 1;
			}
		},
        handleDelete(){
            this.buttonDisabled=true;
			server.delete("/api/training/course/delete",{
				params:{
					id:this.tmpCourse.id,
				}
			}).then(res => {
				this.$message.success("删除成功");
                this.buttonDisabled=false;
                this.$emit("success");
                this.dialogVisible = false;
			}).catch(err => {
                this.buttonDisabled=false;
                if(err.response && err.response.data.msg){
                    this.$message.error(err.response.data.msg);
                }else{
                    this.$message.error("服务器连接错误")
                }
			})
		},
        handleCancel(){
            this.dialogVisible = false;
		},
		validateOK(){
            if(this.type != 1){
                this.saveCourse();
            }else{
                this.modifyCourse();
            }
		},
		saveCourse(){
            this.buttonDisabled = true;
        	server.post("/api/training/course/add",this.tmpCourse).then(res => {
                this.$message.success("添加课程成功")
                this.buttonDisabled = false;
                this.$emit("success");
                this.dialogVisible = false;
			}).catch(err => {
                if(err.response && err.response.data.msg){
                    this.$message.error(err.response.data.msg);
                }else{
                    this.$message.error("服务器连接错误")
                }
                this.buttonDisabled = false;
			});
		},
		modifyCourse(){
            this.buttonDisabled = true;
			server.post("/api/training/course/modify",this.tmpCourse).then(res => {
				this.$message.success("更新课程成功")
                this.buttonDisabled = false;
                this.$emit("success");
                this.dialogVisible = false;
			}).catch(err => {
                if(err.response && err.response.data.msg){
                    this.$message.error(err.response.data.msg);
                }else{
                    this.$message.error("服务器连接错误");
                }
                this.buttonDisabled = false;
			})
		}
	},
	computed:{
		dialogVisible:{
			get:function(){
				return this.value;
			},
			set:function(val){
				this.$emit("input", val);
			}
		},
	},
	watch:{
		course(val, oldVal){
			this.tmpCourse = Object.assign({}, val);
			if(this.tmpCourse.courseFee){
				this.tmpCourse.courseFee = this.tmpCourse.courseFee / this.tmpCourse.members.length;
			}
		},
	}
}