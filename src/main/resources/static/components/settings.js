//vue 组件
import  skillLevel  from "/staffdevelop/components/settings/skillLevel.js";
import  staffLevel  from "/staffdevelop/components/settings/staffLevel.js";
import  skillFramework  from "/staffdevelop/components/settings/skillFramework.js";
import  scoreLevel  from "/staffdevelop/components/settings/scoreLevel.js";
import  deleteScore  from "/staffdevelop/components/settings/deleteScore.js";
import  addScore  from "/staffdevelop/components/settings/addScoreLevel.js";
import  updateScore  from "/staffdevelop/components/settings/updateScoreLevel.js";
import  addStaffLevel  from "/staffdevelop/components/settings/addStaffLevel.js";
import  addCategory  from "/staffdevelop/components/settings/addCategory.js";
import  addDomain  from "/staffdevelop/components/settings/addDomain.js";
import  sessionSetting  from "/staffdevelop/components/settings/sessionSetting.js";
let  template=
    `
    <div class="staff-settings-handle">
        <div  class="settings-tab-class" style="width:96%;height:50px;padding:1px 2%;">
            <ul>
                <li class="route-tab-li" style="width:12%;text-align: center;" :class="{active:activeName == 1 }" v-on:click="handleClick(1)">
                    <span class="td-tab-number">1</span><span>Skill levels</span>
                </li>   
                <li class="router-tab-line"></li>         
                <li class="route-tab-li" style="width:13%;text-align: center;" :class="{active:activeName == 2 }" v-on:click="handleClick(2)">
                    <span class="td-tab-number">2</span><span>Staff's level</span>
                </li>
                <li class="router-tab-line"></li>     
                <li class="route-tab-li" style="width: 17%;text-align: center;" :class="{active:activeName == 3 }" v-on:click="handleClick(3)">
                    <span class="td-tab-number">3</span><span>Skill Framework</span>
                </li>
                <li class="router-tab-line"></li>               
                <li class="route-tab-li" style="width:13%;text-align: center;" :class="{active:activeName == 4}" v-on:click="handleClick(4)">
                    <span  class="td-tab-number">4</span><span>Score level</span>
                </li>
                <li class="router-tab-line"></li>     
                <li class="route-tab-li" style="width: 18%;text-align: center;" :class="{active:activeName == 5 }" v-on:click="handleClick(5)">
                    <span class="td-tab-number">5</span><span>Sessions Setting</span>
                </li>
            </ul>
        </div>       
           
        <skill-level v-if="activeName==1" :skill-level="skillLevel" :grades="grades"></skill-level>
        <staff-level v-if="activeName==2" :is-add="isAdd" :levels="tableData"  v-on:add="addHandler" ></staff-level>
        <skill-framework v-if="activeName==3" v-on:category="categoryVisible" 
            v-on:domain="domainVisible" :bskills="basicSkills" :cskills="customSkills" 
            :years="years" :levels="levelsList" :now-year="year" :now-level="levelId" :now-term="term" 
        v-on:selectChange="selectChange" v-on:allSave="allSaveSkills"></skill-framework>
        <score-level v-if="activeName==4" v-on:addScore="changeAddScoreVisiable"  v-on:updateScore="showUpdateDialog"
            v-on:deleteScore="showDeleteDialog"  :score-level="scoreLevel"></score-level>
        <session-setting v-if="activeName==5"></session-setting>    

        <!--score level-->
        <add-score v-if="AddScoreVisiable" 
            :year="year"
            :term="term"
            v-on:addSuccess="addSuccess"
            v-on:change="changeAddScoreVisiable">
        </add-score>
        <update-score v-if="updateScoreVisiable" 
            :update-score="score"
            v-on:updateSuccess="updateSuccess"
            v-on:change="changeUpdateScoreVisiable">
        </update-score>
        <delete-score v-if="deleteScoreVisiable" 
            :score-id="scoreId"
            v-on:deleteSuccess="deleteSuccess"
            v-on:change="changeDeleteScoreVisiable">
        </delete-score>
        <!--score level-->
        <!--staff level-->
        <add-staff v-if="AddStaffVisiable" 
            :school="schoolId"
            :duty-level="dutyLevel"
            v-on:change="showDownAddStaffTeacher"
            v-on:addSuccess="addLevelTeacherSuccess">
        </add-staff>
        <!--staff level-->
        <add-category v-if="AddCategoryVisiable" 
             :add-domain="domain" 
             :level="levelId"
             :year="year"
             :term="term"
             v-on:addSuccess="addCategorySuccess"
             v-on:change="closeAddCategory">
        </add-category>
        <add-domain v-if="AddDomainVisiable" 
             :skills="customSkills" 
             :level="levelId"
             :year="year"
             :term="term"
             v-on:addSuccess="addDomainSuccess"
             v-on:change="closeAddDomain">
        </add-domain>
    </div>
    `
export default  {
    template:template,
    components: {
        scoreLevel:scoreLevel,
        addScore:addScore,
        deleteScore:deleteScore,
        skillLevel:skillLevel,
        staffLevel:staffLevel,
        addStaff:addStaffLevel,
        skillFramework:skillFramework,
        addCategory:addCategory,
        addDomain:addDomain,
        sessionSetting:sessionSetting,
        updateScore:updateScore
    },
    data(){
        return {
            activeList:[1,2,3,4,5],
            activeName:1,
            loading:false,
            schoolId:1,
            /*score level*/
            scoreLevel:'',
            AddScoreVisiable:false,
            deleteScoreVisiable:false,
            updateScoreVisiable:false,
            scoreId:'',
            score:'',
            /*skill level*/
            skillLevel:[],
            grades:[],
            /*staff level*/
            levels:[],
            isAdd:true,
            AddStaffVisiable:false,
            dutyLevel:'',
            tableData:'',
            /*skill frameworl*/
            AddCategoryVisiable:false,
            AddDomainVisiable:false,
            domain:'',
            customSkills:[],
            basicSkills:[],
            levelsList:[],
            years:[],
            levelId:'',
            year:'',
            term:''
            /*skill framework*/
        }
    },
    mounted(){
        if(this.activeName==1){
            this.searchYearList();
            this.searchDutyLevel();
            this.searchSkillLevel();
            this.searchTerms();
        }
        if(this.activeName==2){
            this.searchStaffLevel();
        }
        if(this.activeName==3){
            this.searchFrameworkSkills();
        }
        if(this.activeName==4){
            this.searchScoreLevel();
        }
    },
    methods:{
        handleClick(tab) {
            this.activeName=tab;
            if(this.activeName==1){
                this.searchSkillLevel();
                this.searchYearList();
                this.searchDutyLevel();
                this.searchTerms();
            }
            if(this.activeName==2){
                this.searchStaffLevel();
            }
            if(this.activeName==3){
                this.searchFrameworkSkills();
            }
            if(this.activeName==4){
                this.searchScoreLevel();
            }
        },
        /*skill level*/
        searchSkillLevel:function(){
            this.loading = true;
            let url='/api/development/skill/level/list';
            server.get(url,{}).then(res => {
                this.loading = false;
                this.skillLevel=res.data.data.skillLevels;
                this.grades=res.data.data.grades;
            }).catch(err =>{
                this.loading = false;
            });
        },
        /*skill level*/
        /*staff level*/
        searchStaffLevel:function(){
            this.loading = true;
            let url='/api/development/staff/level/list';
            server.get(url,{}).then(res => {
                this.loading = false;
                this.tableData=res.data.data
                // console.log("tableData:"+this.tableData)
            }).catch(err =>{
                this.loading = false;
            });
        },
        addHandler(id){
            this.dutyLevel=id;
            this.AddStaffVisiable=true;
        },
        showDownAddStaffTeacher(){
            this.AddStaffVisiable=false;
        },
        addLevelTeacherSuccess(){
            this.showDownAddStaffTeacher();
            this.searchStaffLevel();
        },
        /*staff level*/
        /*skill framework*/
        searchDutyLevel:function(){
            this.loading = true;
            let url='/api/training/subDuty';
            server.get(url,{}).then(res => {
                this.loading = false;
                this.levelsList=Object.assign({},res.data.data);
                this.levelId=this.levelsList[0].id;
                console.log(this.levelsList+":"+this.levelId)
            }).catch(err =>{
                this.loading = false;
            });
        },
        searchYearList:function(){
            this.loading = true;
            let url='/api/development/session/time/year/list';
            server.get(url,{}).then(res => {
                this.loading = false;
                this.years=Object.assign({},res.data.data);
                this.year=this.years[0];
            }).catch(err =>{
                this.loading = false;
            });
        },
        searchFrameworkSkills:function(){
            this.loading = true;
            let url='/api/development/framework/skill/list/'+this.levelId+'/'+this.year+'/'+this.term;
            server.get(url,{}).then(res => {
                this.loading = false;
                this.basicSkills=res.data.data.basicSkills;
                this.customSkills=res.data.data.customSkills;
            }).catch(err =>{
                this.loading = false;
            });
        },
        searchTerms:function(){
            this.loading = true;
            let url='/self/evaluation/period';
            server.get(url,{}).then(res => {
                this.loading = false;
                this.term=res.data.data
            }).catch(err =>{
                this.loading = false;
            });
        },
        nowTerm(term){
            this.term=term;
        },
        categoryVisible(domain,level,year){
            this.levelId=level;
            this.year=year;
            this.AddCategoryVisiable=true;
            this.domain=domain;
        },
        closeAddCategory(domian){
            this.AddCategoryVisiable=false;
            this.searchFrameworkSkills();
        },
        addCategorySuccess(){
            this.closeAddCategory();
            this.searchFrameworkSkills();
        },
        domainVisible(customSkills,level,year){
            this.levelId=level;
            this.year=year;
            this.AddDomainVisiable=true;
            this.customSkills=customSkills;
        },
        closeAddDomain(){
            this.AddDomainVisiable=false;
            this.searchFrameworkSkills();
        },
        addDomainSuccess(){
            this.closeAddDomain();
            this.searchFrameworkSkills();
        },
        selectChange(level,year,term){
            this.levelId=level;
            this.year=year;
            this.term=term;
            this.searchFrameworkSkills();
        },
        allSaveSkills(basicSkills,customSkills){
            this.basicSkills=basicSkills;
            this.customSkills=customSkills;
            this.saveAllSkills(basicSkills,customSkills);
            this.searchFrameworkSkills();
        },
        saveAllSkills:function(basicSkills,customSkills){
            this.loading = true;
            let burl='/api/development/framework/skill/save/'+1+'/'+this.levelId+'/'+this.year+'/'+this.term;
            let curl='/api/development/framework/skill/save/'+2+'/'+this.levelId+'/'+this.year+'/'+this.term;
            server.post(burl,basicSkills).then(res => {
                server.post(curl,customSkills).then(res => {
                    this.$message.success("success");
                    this.searchFrameworkSkills();
                    this.loading = false;
                }).catch(err =>{
                    this.$message.error("skill name can't be null error");
                    this.loading = false;
                });
            }).catch(err =>{
                this.$message.error("skill name can't be null error");
                this.loading = false;
            });
        },
        /*skill framework*/
        /*score level*/
        searchScoreLevel:function(){
            this.loading = true;
            let url='/api/development/rating/list/'+this.year+'/'+this.term;
            server.get(url,{}).then(res => {
                this.loading = false;
                this.scoreLevel=res.data.data
            }).catch(err =>{
                this.loading = false;
            });
        },
        changeAddScoreVisiable(){
            this.AddScoreVisiable=!this.AddScoreVisiable;
        },
        addSuccess(){
            this.changeAddScoreVisiable();
            this.searchScoreLevel();
        },
        showDeleteDialog(id){
            this.scoreId=id;
            this.deleteScoreVisiable=true;
        },
        changeDeleteScoreVisiable(){
            this.deleteScoreVisiable=false;
        },
        deleteSuccess(){
            this.deleteScoreVisiable=false;
            this.searchScoreLevel();
        },
        showUpdateDialog(score){
            this.score=score;
            this.updateScoreVisiable=true;
        },
        changeUpdateScoreVisiable(){
            this.updateScoreVisiable=false;
        },
        updateSuccess(){
            this.updateScoreVisiable=false;
            this.searchScoreLevel();
        },
        /*score level*/
    },
    watch:{
        levelsList:function(val,oldval){
            if(val){
                this.levelId=val[0].id;
            }
        },
        years:function(val,oldval){
            if(val){
                this.year=val[0];
            }
        }
    }
}