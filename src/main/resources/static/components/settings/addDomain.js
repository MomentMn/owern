//vue 组件
let  template=
    `
<el-dialog
            title="Add domain" :before-close="handleClose"
            custom-class="add-domain-dialog"
            :visible.sync="$parent.AddDomainVisiable">
        <div class="dialog-border-class">
            <div class="category-table-td" v-for="(item,index) in customSkills">
                <div class="category-table-left">{{index+1}}</div>
                <div class="category-table-right">
                    <el-input v-model="item.name" :value="item.name"
                        placeholder="Please enter the domain"
                        auto-complete="off"
                        style="width:100%;"
                        type="textarea"
                        resize="none"
                        :minlength="1"
                        :maxlength="80"
                        :autosize="{ minRows:1, maxRows:1}">
                    </el-input>
                </div>     
            </div>
            <div class="category-add-plus-class">
                <span class="el-icon-plus" v-on:click="addDomainItem"></span>
            </div>
        </div>
        <div class="dialog-footer">
            <el-button size="small"
                       style="width:100px;height30px;margin-left:250px;margin-top: 20px;background-color: #8FC54F;color: white;"
                     :load="loading"
                     v-on:click="addDomain">Submit
            </el-button>
        </div>
    </el-dialog>

`
export default  {
    template:template,
    props:{
        skills:{
            required:true,
            type:Object
        },
        level:{
            required:true,
            type:Number
        },
        year:{
            required:true,
            type:Number
        },
        term:{
            required:true,
            type:Number
        }
    },
    data(){
        return {
            loading:false,
            customSkills:this.skills,
        }
    },
    mounted(){

    },
    methods:{
        //关闭弹出层
        closeDialog() {
            this.$emit("change");
        },
        handleClose(){
            this.closeDialog();
        },
        addDomainItem(){
            let domains=[]
            let domain={};
            domain.id=''
            domain.name='';
            domain.categorys=[];
            if(this.customSkills){
                domains=this.customSkills
                domains.push(domain)
            }else{
                domains.push(domain)
            }
            this.customSkills=domains;
        },
        //新增category
        addDomain() {
            this.loading = true;
            let url='/api/development/framework/domain/save/'+this.level+'/'+this.year+'/'+this.term;
            server.post(url,this.customSkills).then(res =>{
                    this.$emit("addSuccess");
                    this.$message.success("success");
                    this.loading = false;
                }
            ).catch(err =>{
                this.closeDialog()
                this.$message.error("domain name cant't be null error");
                this.loading = false;
            });
        }
    },
    watch:{
        skills:function(val,oldval){
            if(val){
                this.customSkills=val
            }
        }
    }
}