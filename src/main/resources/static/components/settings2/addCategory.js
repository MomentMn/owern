//vue 组件
let  template=
    `
<el-dialog
            title="添加类别" :before-close="handleClose"
            custom-class="add-category-dialog"
            :visible.sync="$parent.AddCategoryVisiable">
        <div class="dialog-border-class">
            <div class="category-table-td" v-for="(item,index) in domain.categorys">
                <div class="category-table-left">{{index+1}}</div>
                <div class="category-table-right">
                    <el-input v-model="domain.categorys[index].name" :value="item.name"
                        placeholder="请输入类别"
                        auto-complete="off"
                        style="width:100%;"
                        type="textarea"
                        resize="none"
                        :minlength="1"
                        :maxlength="60"
                        :autosize="{ minRows:1, maxRows:1}">
                    </el-input>
                </div>     
            </div>
            <div class="category-add-plus-class">
                <span class="el-icon-plus" v-on:click="addCategoryItem"></span>
            </div>
        </div>
        <div class="dialog-footer">
            <el-button size="small"
                       style="width:100px;height30px;margin-left:250px;margin-top: 20px;background-color: #8FC54F;color: white;"
                     :load="loading"
                     v-on:click="addCategory">提交
            </el-button>
        </div>
    </el-dialog>

`
export default  {
    template:template,
    props:{
        addDomain:{
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
            domain:this.addDomain,
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
        addCategoryItem(){
            let categorys=[]
            let category={};
            category.id='';
            category.name='';
            category.skills=[];
            if(this.domain.categorys){
                categorys=this.domain.categorys
                categorys.push(category)
            }else{
                categorys.push(category)
            }
            this.domain.categorys=categorys
        },
        //新增category
        addCategory() {
            this.loading = true;
            let url='/api/development/framework/category/save/'+this.level+'/'+this.year+'/'+this.term;
                server.post(url,this.domain).then(res =>{
                        this.$emit("addSuccess");
                        this.$message.success("保存成功");
                        this.loading = false;
                    }
                ).catch(err =>{
                    this.closeDialog()
                    this.$message.error("类别名不能为零");
                    this.loading = false;
                });

        }
    },
    watch:{
        addDomain:function(val,oldval){
            if(val){
                this.domain=val
            }
        }
    }
}