//vue 组件
let  template=
    `
<el-dialog
            title="更新分数水平"
            custom-class="add-score-dialog"
            :visible.sync="$parent.updateScoreVisiable">
        <div class="dialog-border-class">
        <el-form label-width="90px"
                 :model="score"
                 :rules="scoreRules"
                 ref="scoreForm">
            <el-form-item label="分数" prop="score">
                <el-input v-model="score.score"
                          style="width:260px">
                </el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="score.name"
                          style="width:260px">
                </el-input>
            </el-form-item>
            <el-form-item label="描述" prop="rateKeys">
                <el-input v-model="score.rateKeys"
                          style="width:260px">
                </el-input>
            </el-form-item>
        </el-form>
        </div>
        <div class="dialog-footer">
            <el-button  round size="small"
                       style="width:68px;margin-left:200px;margin-top: 15px;background-color: #8FC54F;color: white;"
                      v-on:click="submitForm('scoreForm')"
                      :load="loading">提交
            </el-button>
        </div>
    </el-dialog>

`
export default  {
    template:template,
    props:{
        updateScore:{
            required:true,
            type:Object,
        }
    },
    data(){
        return {
            loading:false,
            score:{
                id:this.updateScore["id"],
                score:this.updateScore["score"],
                name:this.updateScore["name"],
                rateKeys:this.updateScore["rateKeys"],
                year:this.year,
            },
            scoreRules:{
                score: [
                    { required: true, message: "请输入分数", trigger: "blur" },
                ],
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" },
                    { min: 2, max: 100, message: "长度为2-100个字符", trigger: "blur" },
                ],
                rateKeys: [
                    { required: true, message: "请输入描述", trigger: "blur" },
                    { min: 2, max: 100, message: "长度为2-100个字符", trigger: "blur" },
                ]
            }
        }
    },
    methods:{
        //关闭弹出层
        closeDialog() {
            this.$emit("change");
        },
        //验证表单
        submitForm(formName) {
            this.$refs[formName]["validate"](valid => {
                if (valid) {
                    this.checkNumber(this.score.score)
                } else {
                    return false;
                }
            });
        },
        checkNumber(value){
            if (/^[0-9]*$/.test(value)) {
                this.updateScoreLevel(this.score);
            }else{
                this.$message.error("分数必须是数字");
            }
        },
        //新增score
        updateScoreLevel(score) {
            this.loading = true;
            let url='/api/development/rating/update';
            server.post(url,score).then(res =>{
                    this.$emit("updateSuccess");
                    this.$message.success("保存成功");
                    this.loading = false;
                }
            ).catch(err =>{
                this.closeDialog()
                this.$message.error("保存失败");
                this.loading = false;
            });
        }
    }
}