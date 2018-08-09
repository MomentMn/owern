//vue 组件
let  template=
`
<el-dialog            
            custom-class="roadmap-train-dialog"
            :visible.sync="$parent.roadmapTrainVisiable"
            :show-close="true"           
            :lock-scrol="true"
            :center="true"
            >
        <div class="form-wrapper">
           <div class="fixed-value">
              <div class="big_title">教师: {{this.$props.data.teacherName}}</div>
              <div class="sub_title">技能类别: {{this.$props.data.skillName1}}</div>
              <div class="sub_title">Sub-Category: {{this.$props.data.skillName2}}</div>
            </div>
            <div class="form-info">
                  <el-form label-width="160px"
                         :model="trainForm"  
                         :rules="trainRules"
                         ref="trainForm">
                    <el-form-item label="课程" prop="course">
                        <el-input v-model="trainForm.course"
                                  style="width:260px"
                                  :maxlength="255"
                                  placeholder="请输入课程名称"
                                  >
                        </el-input>
                        <span class="course-desc">
                            	查看ECDA网站提供培训 
                            <div class="course-desc-icon" @click="openWin()">
                                <i class="el-icon-arrow-right" style="font-size: 20px; font-weight:bold "></i>
                            </div>
                        </span>
                    </el-form-item>
                    
                    <el-form-item label="培训机构" prop="organization">
                        <el-input v-model="trainForm.organization"
                                 placeholder="请输入机构名称"   :maxlength="255"
                                  style="width:260px">
                        </el-input>
                    </el-form-item>                    
                    <el-form-item label="课程开始" prop="courseStartDate">                                     
                        <el-date-picker type="date" 
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :editable='false'
                            :picker-options="startTimeOption"
                             placeholder="请选择开始时间"
                             v-model="trainForm.courseStartDate"  style="width:260px">                         
                        </el-date-picker>
                    </el-form-item>     
                    
                    <el-form-item label="培训时长" prop="trainingHours">                                     
                        <el-input
                             placeholder="请输入培训时长"                            
                             :min="1" :max="9999"
                             v-model="trainForm.trainingHours"  style="width:260px">                         
                        </el-input>
                    </el-form-item>     
                    
                    <el-form-item label="课程费用" prop="courseFee">                                       
                        <el-input 
                             placeholder="请输入课程费用" 
                             v-model="trainForm.courseFee"  style="width:260px">            
                           <template slot="prepend">$</template> 
                        </el-input>                      
                        <span>
                            
                        </span>
                    </el-form-item>  
                </el-form>
            </div>
        </div>
        <div class="dialog-footer">
            <el-button  @click="$parent.roadmapTrainVisiable = false"  size="small">　取消　</el-button>          
            <el-button   size="small"
                      type="success"
                      @click="submitForm()"
                      :load="loading">新增培训计划</el-button>
        </div>
    </el-dialog>
   `
export default  {
    template: template,
    props: {
        data:{
            type:Object,
            required:true
        }
    },
    data(){
        return {
            loading:false,
            startTimeOption:{
                disabledDate: (time) => {
                    let now =new Date();
                    let t=now.getTime()-1000*60*60*24;
                    let yesterday=new Date(t);
                     return time.getTime() < yesterday;

                }
            },
            trainForm:{
                userId:this.$props.data.userId,
                planId:this.$props.data.planId,
                selfEvaluationId:this.$props.data.selfEvaluationId,
                skillId:this.$props.data.skillId
            },
            trainRules:{
                course: [
                    { required: true, message: "请输入课程", trigger: "blur" },
                    { min: 2, max: 100, message: "长度为1-255个字符", trigger: "blur" }
                ],
                organization: [
                    { min: 2, max: 100, message: "长度为1-255个字符", trigger: "blur" }
                ],
                courseFee: [
                    {
                        validator: (rule, value, callback) => {
                            let re = /^[0-9]+.?[0-9]*/;
                            // 非数值
                            if (!re.test(value)) {
                                return callback(new Error('请输入大于零的数字'));
                            }
                            if (re.test(value)&& parseInt(value)<=0) {
                                return callback(new Error('请输入大于零的数字'));
                            }
                            if(re.test(value) && parseInt(value) >999999999){
                                return callback(new Error('请输入少于100000000000数字 '));
                            }

                             return callback();

                    }, trigger: 'blur' }
                ],
                trainingHours: [
                    {
                        validator: (rule, value, callback) => {

                            let re = /^[0-9]+.?[0-9]*/;
                            // 非数值
                            if (!re.test(value)) {
                                return callback(new Error('请输入大于零的数字'));
                            }
                            if (re.test(value)&& parseInt(value)<=0) {
                                return callback(new Error('请输入大于零的数字'));
                            }
                            if(re.test(value) && parseInt(value) >9999){
                                return callback(new Error('请输入少于9999数字 '));
                            }

                            return callback();

                        }, trigger: 'blur' }
                ],

            }
        }
    },
    methods:{
        //验证表单
        submitForm() {
          try {
              this.$refs["trainForm"]["validate"](valid => {
                  if (valid) {
                      this.save(this.trainForm);
                  } else {
                      return false;
                  }
              });
          }catch (e) {
              console.dir(e);
          }
        },
        //新增 Train
        save(train) {
            this.loading=true;
            let url='/api/development/roadmap/train/save';
            try {
                server.post(url,train).then(res =>{
                        this.$emit("addSuccess");
                        this.$message.success("成功");
                    }
                ).catch(res =>{
                    this.$message.error("失败");
                });
            } catch (err) {
                this.$message.error(err.msg);
            }
            this.loading = false;
        },
        openWin(){
           top.window.open(" https://www.ecda.gov.sg/pages/default.aspx")
        }

    }
}
