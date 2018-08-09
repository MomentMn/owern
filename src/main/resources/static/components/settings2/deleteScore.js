//vue 组件
let  template=
    `
    <el-dialog
            custom-class="delete-score-dialog"
            :visible.sync="$parent.deleteScoreVisiable">
        <div class="dialog-border-class">
            <p>你确定要删除这条信息吗?</p>
        </div>
        <div class="dialog-footer">
            <el-button  round size="small"
                       style="width:68px;float: left;margin-left:26px;margin-top: 15px;"
                       @click="closeDialog"
            >取消</el-button>
            <el-button  round size="small"
                       style="width:68px;float: left;margin-left:200px;margin-top: 15px;background-color: #52be80;color:white;"
                       @click="deleteScore"
            >确定</el-button>
        </div>
    </el-dialog>

`
export default  {
    template:template,
    props:{
        scoreId:{
            required:true,
            type:Number,
        }
    },
    data(){
        return {
            loading:false,
        }
    },
    methods:{
        //关闭弹出层
        closeDialog() {
            this.$emit("change");
        },
        //删除score
         deleteScore() {
            this.loading = true;
            let url='/api/development/rating/delete/'+this.scoreId;
            server.delete(url,{}).then(res =>{
                    this.$emit("deleteSuccess");
                    this.$message.success("删除成功");
                    this.loading = false;
                }
            ).catch(err =>{
                this.closeDialog()
                this.$message.error("删除失败");
                this.loading = false;
            });
        }
    }
}