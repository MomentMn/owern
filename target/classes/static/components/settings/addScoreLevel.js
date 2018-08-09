//vue 组件
let  template=
    `
<el-dialog
            title="Add score level"
            custom-class="add-score-dialog"
            :visible.sync="$parent.AddScoreVisiable">
        <div class="dialog-border-class">
        <el-form label-width="90px"
                 :model="score"
                 :rules="scoreRules"
                 ref="scoreForm">
            <el-form-item label="score" prop="score">
                <el-input v-model="score.score" placeholder="Please enter the score" maxlength="3"
                          style="width:260px">
                </el-input>
            </el-form-item>
            <el-form-item label="name" prop="name">
                <el-input v-model="score.name" placeholder="Please enter the name"
                          style="width:260px">
                </el-input>
            </el-form-item>
            <el-form-item label="key" prop="rateKeys">
                <el-input v-model="score.rateKeys" placeholder="Please enter the key"
                          style="width:260px">
                </el-input>
            </el-form-item>
        </el-form>
        </div>
        <div class="dialog-footer">
            <el-button  round size="small"
                       style="width:68px;margin-left:200px;margin-top: 15px;background-color: #8FC54F;color: white;"
                      v-on:click="submitForm('scoreForm')"
                      :load="loading">Submit
            </el-button>
        </div>
    </el-dialog>

`
export default  {
    template:template,
    props:{
        year:{
            required:true,
            type:Number,
        },
        term:{
            required:true,
            type:Number,
        }
    },
    data(){
        return {
            loading:false,
            score:{
                id:0,
                score:'',
                name:'',
                rateKeys:'',
                year:this.year,
            },
            scoreRules:{
                score: [
                    { required: true, message: "Please enter the score", trigger: "blur" },
                ],
                name: [
                    { required: true, message: "Please enter the name", trigger: "blur" },
                    { min: 2, max: 100, message: "The length is 2-100 characters", trigger: "blur" },
                ],
                rateKeys: [
                    { required: true, message: "Please enter the key", trigger: "blur" },
                    { min: 2, max: 100, message: "The length is 2-100 characters", trigger: "blur" },
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
                this.addScoreLevel(this.score);
            }else{
                this.$message.error("Score must be number");
            }
        },
        //新增score
        addScoreLevel(score) {
            this.loading = true;
            let url='/api/development/rating/save/'+this.term;
            server.post(url,score).then(res =>{
                    this.$emit("addSuccess");
                    this.$message.success("success");
                    this.loading = false;
                }
            ).catch(err =>{
                this.closeDialog()
                this.$message.error("error");
                this.loading = false;
            });
        }
    }
}