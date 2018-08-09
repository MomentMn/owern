let template = `
<el-dialog
    :title="course.name"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    custom-class="attendance-dialog">
    <div class="detail">
       <span>{{ course.awardingOrganization }}</span>
       <span>{{ course.startTime }}</span>
       <span>共 {{ course.trainingHours }} 小时</span>
       <span>费用: $ {{ course.courseFee }}</span>
    </div>
    <el-table :data="teachers" :cell-class-name="setCellClass" v-loading="uploadLoading" element-loading-text="正在上传">
        <el-table-column type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="教师"  align="center"></el-table-column>
        <el-table-column prop="attachment" label="证明和反思" align="center">
            <template slot-scope="scope">
                   <a v-if="scope.row.attachment" :href="scope.row.attachment" class="attachment">附件</a>
                   <el-upload
                   class="attachment"
                   :action="uploadUrl"
                   :data="{userCourseId:scope.row.id,index:scope.$index}"
                   :show-file-list="false"
                   :on-success="uploadSuccess"
                   :before-upload="beforeUpload"
                   :on-error="uploadError">
                        <span style="position: relative;top:3px;display:inline-block;">
                           <svg style="width:16px;height:16px;transform:rotate(306deg);" viewBox="0 0 24 24">
                                <path fill="#7084C6" d="M16,6H13V7.9H16C18.26,7.9 20.1,9.73 20.1,12A4.1,4.1 0 0,1 16,16.1H13V18H16A6,6 0 0,0 22,12C22,8.68 19.31,6 16,6M3.9,12C3.9,9.73 5.74,7.9 8,7.9H11V6H8A6,6 0 0,0 2,12A6,6 0 0,0 8,18H11V16.1H8C5.74,16.1 3.9,14.26 3.9,12M8,13H16V11H8V13Z" />
                           </svg>
                        </span>
                   </el-upload>
            </template>
        </el-table-column>
        <el-table-column label="出勤" align="center">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.attendance"
                active-color="#13ce66"
                :active-value="2"
                :inactive-value="1"
                :disabled="scope.row.status == 3">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="补助金" align="center" width="120">
            <template slot-scope="scope">
                <el-input v-model="scope.row.grant" size="small" :disabled="scope.row.status == 3"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="缺席工资表" align="center" width="120">
            <template slot-scope="scope">
                <el-input v-model="scope.row.payroll" size="small" :disabled="scope.row.status == 3"></el-input>
            </template>
        </el-table-column>
    </el-table>
    <div style="width:400px;margin:45px auto 0px" class="clearfix" v-if="!teachers || teachers[0].status!=3">
        <el-button class="left" v-on:click="cancelAttendance">取消</el-button>
        <el-button type="success" class="right" v-on:click="confirmAttendance">确认并保存</el-button>
    </div>
</el-dialog>
`;

export default {
    template:template,
    props:{
        value:{
            required:true,
            default:false
        },
        course:{
            required:true,
            type:Object
        }
    },
    data:function(){
        return {
            uploadUrl:baseURL + "/api/training/attachment/upload",
            uploadLoading:false,
            skillName:"Learning to Lie",
            organization:"ECDA",
            hours:8,
            fee:1000,
            courseStart:'12/12/2018',
            teachers:[{
                name:'Jack',
                attendance:false,
                grant:'',
                payroll:'',
                },
                {
                    name:'Jack',
                    attendance:false,
                    grant:'',
                    payroll:'',
                }
            ]
        }
    },
    methods:{
        handleClose(done){done();},
        setCellClass(cell){
            if(cell.columnIndex == 0)
                return 'first-column';
            else if(cell.columnIndex == 5)
                return 'last-column';
            else return '';
        },
        fetchAttendance(){
            server.get("/api/training/course/confirm/detail",{
                params:{
                    courseId:this.course.id
                }
            }).then(res => {
                let teachers = res.data.data;
                let teacherName = this.course.members;
                teachers.forEach(item => {
                    let teacher = teacherName.find(i => i.id == item.userId);
                    item.name = teacher.name.replace('&',' ');
                    if(item.attendance == 0)
                        item.attendance=1;
                });
                this.teachers = teachers;
            }).catch(err => {
                if(err.response && err.response.data.msg){
                    this.$message.error(err.response.data.msg);
                }else{
                    this.$message.error("服务器连接错误")
                }
            });
        },
        confirmAttendance(){
            server.post("/api/training/course/complete",this.teachers).then( res =>{
                this.$message.success("确认成功");
                this.$emit('success');
                this.dialogVisible = false;
            }).catch(err => {
                if(err.response && err.response.data.msg){
                    this.$message.error(err.response.data.msg);
                }else{
                    this.$message.error("服务器连接错误")
                }
            });
        },
        cancelAttendance(){
            this.dialogVisible = false;
        },
        uploadSuccess(res, file, fileList){
            this.uploadLoading = false;
            let url = res.data.url;
            let index = res.data.index;
            this.teachers[index].attachment = url;
            this.$message.success("上传成功");
        },
        uploadError(err, file, fileList){
            this.uploadLoading = false;
            this.$message.error("上传错误");
        },
        beforeUpload(file){
            if(file.size > 20971520) {
                this.$message.error("附件最大20M");
                return false;
            }
            else
                this.uploadLoading = true;
        }
    },
    computed:{
        dialogVisible:{
            get(){return this.value;},
            set(val){this.$emit('input', val);}
        }
    },
    watch:{
        course(val,oldVal){
            if(val && val.id){
                this.fetchAttendance();
            }
        }
    }
}