//vue 组件
let  template=
`
<div style="width:96%;margin-top: 10px;padding:0 2%;">
    <div style="width:100%;height:40px;margin-bottom: 5px;">
       <el-select v-model="year"
                 v-on:change="selectChange"  
                 style="width:100px;float: left">
        <el-option
                v-for="item in years"
                :key="item"
                :label="item"
                :value="item">
        </el-option>
      </el-select>
      <el-select v-model="term"
                 v-on:change="selectTermChange"  
                 style="width:150px;float: left;margin-left: 30px;">
        <el-option
                v-for="item in terms"
                :key="item.id"
                :label="item.name"
                :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="level"
                 v-on:change="selectChange"  
                 style="width:230px;float: left;margin-left: 30px;">
        <el-option
                v-for="item in levels"
                :key="item.id"
                :label="item.name"
                :value="item.id">
        </el-option>
      </el-select>
      <el-button type="success" size="medium" style="float:right;" :disabled="flag" v-on:click="AllSaveSkills">Save</el-button>
    </div>
    <div class="framework-tab-class" style="width:100%;height:50px;">
        <el-tabs v-model="activeName" v-on:tab-click="handleClick">
            <el-tab-pane name="1">
                <div slot="label">Basic Skills</span></div>
            </el-tab-pane>
            <el-tab-pane name="2">
                <div slot="label">Custom Skills</div>
            </el-tab-pane>
        </el-tabs>
    </div>
    <div style="width: 100%;margin-top: 10px;">        
        <div v-if="activeName==1">
            <div class="framework-domain-scoll-border" :style="{height:sheight1+'px'}">
                <div class="framework-domain-class" :style="{width:width1+'px'}">
                    <div class="skill-domain-item" :class="{active:item.id== checkedId}" v-on:click="checkdomain(item,index2)" v-for="(item,index2) in basicSkills">
                        <span class="skill-domain-item-span" >{{item.name}}</span>                                                                                                                                                                            
                    </div>
                </div>
            </div>
            <div class="framework-skill-table">
                <div class="framework-class1" v-for="(item,index) in categorys">
                    <div class="framework-class2" >
                        <div class="framework-item-class1">{{cutstr(item.name,45)}}</div> 
                        <div class="framework-item-class2">Guiding Questions</div> 
                    </div>
                    <div class="framework-class3" v-for="(item1,index1) in item.skills">
                        <div class="framework-class4">
                            <div class="framework-item-class3">{{item1.name}}</div> 
                            <div class="framework-item-class4">
                                <el-input v-model="categorys[index].skills[index1].guidingQuestions" :value="item1.guidingQuestions"
                                    placeholder="Please enter the Guiding Question"
                                    auto-complete="off"
                                    style="width:96%;"
                                    type="textarea"
                                    resize="none"
                                    :disabled="flag"
                                    :autosize="{ minRows:2, maxRows:2}"
                                    v-on:blur="changeGuidings(index,index1)">
                                </el-input>
                            </div> 
                        </div>
                    </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                </div>
            </div>
        </div>
        <div v-if="activeName==2">
            <div class="framework-domain-scoll-border" :style="{height:sheight2+'px'}">
                <div class="framework-domain-class" :style="{width:width2+'px'}">
                    <div class="skill-domain-item" :class="{active:item.id== checkedId2}" v-for="(item,index2) in customSkills">
                        <span class="skill-domain-item-span" v-on:click="checkdomain2(item,index2)">{{item.name}}</span>                                                                                                                                                                            
                    </div>
                    <div class="skill-domain-item" style="border: 0px;color:#8FC54F;">
                        <p v-if="!flag" class="el-icon-circle-plus" v-on:click="addDomain" style="font-size: 20px;margin-left: 60px;"></p>                                                           
                        <p v-if="!flag" class="skill-domain-add-span" v-on:click="addDomain">add domain</p>
                        <p v-if="flag" class="el-icon-circle-plus"  style="font-size: 20px;margin-left: 60px;"></p>                                                           
                        <p v-if="flag" class="skill-domain-add-span" >add domain</p>
                    </div>
                </div>
            </div>
            <div class="framework-skill-table">
                <div class="framework-class1" v-for="(item,index) in categorys2">
                        <div class="framework-class2">
                            <div class="framework-item-class1">{{cutstr(item.name,45)}}</div> 
                            <div class="framework-item-class2">Guiding Questions</div> 
                        </div>
                        <div class="framework-class3" v-for="(item1,index1) in item.skills">
                            <div class="framework-class4">
                                <div class="framework-item-class3">
                                    <el-input v-model="categorys2[index].skills[index1].name" :value="item1.name"
                                        placeholder="Please enter the skill name"
                                        auto-complete="off"
                                        style="width:96%;"
                                        type="textarea"
                                        resize="none"
                                        :disabled="flag"
                                        :autosize="{ minRows:2, maxRows:2}"
                                        v-on:blur="changeGuidings2(index,index1)">
                                    </el-input>
                                </div> 
                                <div class="framework-item-class42">
                                    <el-input v-model="categorys2[index].skills[index1].guidingQuestions" :value="item1.guidingQuestions"
                                        placeholder="Please enter the guiding Question"
                                        auto-complete="off"
                                        style="width:96%;"
                                        type="textarea"
                                        resize="none"
                                        :disabled="flag"
                                        :autosize="{ minRows:2, maxRows:2}"
                                        v-on:blur="changeGuidings2(index,index1)">
                                    </el-input>
                                </div>
                                <div class="framework-item-class5">
                                    <span v-if="!flag" class="el-icon-delete" style="color:#F2898C;cursor: pointer;font-weight: bold;" v-on:click="deleteSkill(index,item1,index1)"></span>
                                    <span v-if="flag" class="el-icon-delete" style="color:#F2898C;cursor: pointer;font-weight: bold;"></span>
                                </div>  
                            </div>
                        </div>   
                        <div v-if="activeName==2" class="framework-add-skill-class">
                            <span v-if="!flag" class="el-icon-circle-plus" v-on:click="addSkill(index)"> Add skill</span>
                            <span v-if="flag" class="el-icon-circle-plus"> Add skill</span>
                        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                    </div>   
                <div v-if="activeName==2" class="framework-add-category-class">
                        <span v-if="!flag" class="el-icon-circle-plus" v-on:click="addCategory"> Add category</span>
                        <span v-if="flag" class="el-icon-circle-plus"> Add category</span>
                </div>
            </div> 
        </div>
    </div>       
</div>

`
export default  {
    template: template,
    // 配置属性
    props: {
        bskills:{
            required:true,
            type:Array
        },
        cskills:{
            required:true,
            type:Array
        },
        levels:{
            required:true,
            type:Array
        },
        years:{
            required:true,
            type:Array
        },
        nowLevel:{
            required:true,
            type:Number
        },
        nowYear:{
            required:true,
            type:Number
        },
        nowTerm:{
            required:true,
            type:Number
        },
    },
    data(){
        return {
            activeName:'1',
            basicSkills:[],
            customSkills:[],
            categorys:[],
            domainIndex:0,
            categorys2:[],
            domainIndex2:0,
            domain:'',
            /*筛选框*/
            year:this.years[0],
            level:this.nowLevel,
            checkedId:'',
            checkedId2:'',
            terms:[
                {
                    id:1,
                    name:'Mid-Year'
                },
                {
                    id:2,
                    name:'Annual'
                }
            ],
            term:this.nowTerm,
            /*筛选框*/
            width1:998,
            sheight1:65,
            width2:998,
            sheight2:65,
            flag:false
        }
    },
    mounted(){
        this.fetchNowYear();
    },
    methods:{
        handleClick(tab, event) {
            this.activeName=tab.name;
        },
        checkVisible(list){
            if(list.length==0){
                return true;
            }else{
                return false;
            }
        },
        checkdomain(item,index2){
            this.domainIndex=index2
            this.categorys=item.categorys;
            this.checkedId=item.id
        },
        changeGuidings(index,index1){
            this.basicSkills[this.domainIndex].categorys=this.categorys;
        },
        checkdomain2(item,index2){
            this.domainIndex2=index2
            this.categorys2=item.categorys;
            this.domain=item;
            this.checkedId2=item.id
        },
        changeGuidings2(index,index1){
            this.customSkills[this.domainIndex2].categorys=this.categorys2;
        },
        addSkill(index){
            let skills=[]
            let skill={};
            skill.id='';
            skill.name='';
            skill.guidingQuestions='';
            if(this.customSkills[this.domainIndex2].categorys[index].skills){
                skills=this.customSkills[this.domainIndex2].categorys[index].skills
                skills.push(skill)
            }else{
                skills.push(skill)
            }
            this.customSkills[this.domainIndex2].categorys[index].skills=skills;
        },
        deleteSkill(index,item1,index1){
            this.customSkills[this.domainIndex2].categorys[index].skills.splice(index1,1)
        },
        addCategory(){
            this.domain.categorys=this.categorys2;
            if(this.customSkills){
                if(this.customSkills.length!=0){
                    this.$emit("category",this.domain,this.level,this.year)
                }
            }
        },
        addDomain(){
            this.$emit("domain",this.customSkills,this.level,this.year)
        },
        selectChange(){
            this.domainIndex=0
            this.domainIndex2=0
            this.checkedId2=0
            this.checkedId=0
            this.domain={}
            this.categorys=[]
            this.categorys2=[]
            this.$emit("selectChange",this.level,this.year,this.term)
        },
        selectTermChange(){
            this.domainIndex=0
            this.domainIndex2=0
            this.checkedId2=0
            this.checkedId=0
            this.domain={}
            this.categorys=[]
            this.categorys2=[]
            this.flag= false;
            if(this.nowTerm==2){
                if(this.term==1){
                    this.flag= true;
                }
            }
            this.$emit("selectChange",this.level,this.year,this.term)
        },
        AllSaveSkills(){
            this.$emit("allSave",this.basicSkills,this.customSkills)
        },
        fetchNowYear(){
            let date=new Date;
            let year=date.getFullYear();
            if(this.year==year){
                if(this.nowTerm==2){
                    if(this.term==1){
                        this.flag= true;
                    }
                }
            }else{
                this.flag= false
            }
        },
        cutstr(str,len) {
            console.log("紧挨了")
            var str_length = 0;
            var str_len = 0;
            let str_cut = new String();
            str_len = str.length;
            for (var i = 0; i < str_len; i++) {
                let a = str.charAt(i);
                str_length++;
                if (escape(a).length > 4) {
                    //中文字符的长度经编码之后大于4
                    str_length++;
                }
                str_cut = str_cut.concat(a);
                if (str_length >= len) {
                    str_cut = str_cut.concat("...");
                    return str_cut;
                }
            }
            //如果给定字符串小于指定长度，则返回源字符串；
            if (str_length < len) {
                return str;
            }
        }
    },
   watch:{
       bskills:function(val,oldval){
           if(val){
               this.basicSkills=val;
               this.categorys=val[0].categorys;
               this.checkedId=val[0].id;
               if(val.length>4){
                    this.width1=998+(val.length-4)*242;
                    this.sheight1=75
               }else{
                   this.width1=998;
                   this.sheight1=65
               }
           }
       },
       cskills:function(val,oldval){
           if(val){
               this.customSkills=val;
               this.domain=val[0];
               if(val[0]){
                   this.categorys2=val[0].categorys;
                   this.checkedId2=val[0].id;
               }
               if(val.length>3){
                   this.width2=962+(val.length-3)*242;
                   this.sheight2=75
               }else{
                   this.width2=998;
                   this.sheight2=65
               }
           }
       },
       nowLevel:function(val,oldval){
           if(val){
               this.level=val;
           }
       },
       nowYear:function(val,oldval){
           if(val){
               this.year=val;
           }
       },
       years:function(val,oldval){
           if(val){
               this.year=val[0];
           }
       },
       nowTerm:function(val,oldval){
           console.log("term:"+val)
           if(val){
               this.term=val;
           }
       }
   }
}
