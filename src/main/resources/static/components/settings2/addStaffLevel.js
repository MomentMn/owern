//vue 组件
let  template=
    `
<el-dialog
            title="新增教师"
            custom-class="add-staff-dialog"
            :visible.sync="$parent.AddStaffVisiable">
        <div class="dialog-border-class">
        <el-form label-width="90px"
                 :model="teacher"
                 :rules="teacherRules"
                 ref="teacherForm">
             <el-form-item label="教师" prop="id">
                <el-select v-model="teacher.id" style="width:280px">
                    <el-option
                            v-for="item in teachers"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        </div>
        <div class="dialog-footer">
            <el-button  round size="small"
                       style="width:68px;margin-left:200px;margin-top: 15px;background-color: #8FC54F;color: white;"
                      v-on:click="submitForm('teacherForm')"
                      :load="loading">提交
            </el-button>
        </div>
    </el-dialog>

`
export default  {
    template:template,
    props:{
        school:{
            required:true,
            type:Number,
        },
        dutyLevel:{
            required:true,
            type:Number,
        }
    },
    data(){
        return {
            loading:false,
            teacher:{
                id:''
            },
            dutyLevel:this.dutyLevel,
            schoolId:this.school,
            teachers:'',
            teacherRules: {
                id: [
                    {required: true, message: "请选择老师", trigger: "blur"},
                ],
            }
        }
    },
    mounted(){
        this.searchStaffLevelTeacher();
    },
    methods:{
        //关闭弹出层
        closeDialog() {
            this.$emit("change");
        },
        searchStaffLevelTeacher:function(){
            let url='/api/development/staff/level/teacher/list/';
            server.get(url,{}).then(res => {
                this.teachers=res.data.data
                this.teacher.id=this.teachers[0]["id"];
            }).catch(err =>{
            });
        },
        //验证表单
        submitForm(formName) {
            this.$refs[formName]["validate"](valid => {
                if (valid) {
                    this.addStaffLevelTeacher();
                } else {
                    return false;
                }
            });
        },
        //新增老师
        addStaffLevelTeacher() {
            this.loading = true;
            let url='/api/development/staff/level/tacher/save/'+this.dutyLevel;
            server.post(url,this.teacher).then(res =>{
                    this.$emit("addSuccess");
                    this.$message.success("添加成功");
                    this.loading = false;
                }
            ).catch(err =>{
                this.closeDialog()
                this.$message.error("添加失败");
                this.loading = false;
            });
        }
    }
}