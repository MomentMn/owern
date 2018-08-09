//vue 组件
let  template=
    `
<div class="appraisal-info">
    <div class="head">
        <div class="head-left left">
            <div class="head-appraisal-info">Staff Appraisal - {{year}} {{period}}</div>
            <div class="head-user-info">
                <span>Teacher'name: {{userName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Current Level: {{dutyLevelName}}</span>
            </div>
        </div>
        <div class="head-right right">
            <el-button class="bt" type="success" @click="back">Back</el-button>
            <el-button class="bt" type="success" @click="exportInfo">Export</el-button>
        </div>
    </div>
    <div class="appraisal-body">
        <textarea v-show="!teacherShow" class="appraisal-comment" placeholder="Appraiser's Comment" disabled>{{evaluatorComment}}</textarea>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Checklist" name="first">
            <div class="raing-div">
                Rating scale:
                <span v-for="(r,i) in ratings" :class="{'margin-left-60':i != 0}">
                    {{r.rateKeys}} = <span class="litter-span">{{r.score}}</span>
                </span>
            </div>
            <div class="content_appraisal_table">
                 <table v-for="(skill,bindex) in skillList">
                    <tr>
                        <td colspan="4"><div class="fst-level">{{skill.name}}</div></td>
                    </tr>
                    <tr v-for="(child,cindex) in skill.child">
                        <td style="width: 30%">
                            <div :class="{'second-level':child.depth == 2,'third-level':child.depth == 3}">{{child.name}}</div>
                        </td>
                        <td style="width: 25%">
                            <div v-if="child.depth == 2" class="second-level text-center">Guilding Questions </div>
                            <div v-if="child.depth == 3" class="third-level">{{child.guidingQuestion}}</div>
                        </td>
                        <td style="width: 25%">
                            <div v-if="child.depth == 2" class="second-level text-center">Evidence(s) </div>
                            <div v-if="child.depth == 3" class="third-level">
                               {{child.evidence}}
                            </div>
                        </td>
                        <td style="width: 20%">
                            <div v-if="child.depth == 2" class="second-level text-center"> Rating </div>
                            <div v-if="child.depth == 3" class="third-level text-center">
                                <span v-for="(r,i) in ratings" class="litter-span" style="cursor: default!important;"
                                :class="{'margin-left-10':i != 0 , 'green-litter-span':child.raing == r.score }"
                                >{{r.score}}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="summary">
                                <span>Total score : {{skill.totalScore}}</span>
                                <span>Average score : {{skill.averageScore}} </span>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Reflection" name="second">
            <div class="content_appraisal_table">
                <table>
                    <tr>
                        <td colspan="4">
                            <div class="fst-level">
                                <div class="reflection-head text-center">
                                    Strengths and Achievements
                                </div>
                                <div class="text-center">
                                    Please identify and state possible areas of strength and achievements substantiated with evidence
                                </div>
                            </div>
                         </td>
                    </tr>
                    <tr>
                        <td style="width: 10%"><div class="second-level text-center">S/N</div></td>
                        <td style="width: 30%"> <div class="second-level text-center">Strength and Achievements</div></td>
                        <td style="width: 30%"><div class="second-level text-center">Evidence </div></td>
                        <td style="width: 30%"> <div class="second-level text-center">Period/Date </div></td>
                    </tr>
                    <tr v-for="(reflection,index) in reflectionList">
                        <td class="text-center" style="vertical-align: middle;">{{index + 1}}</td>
                        <td>
                            <div class="third-level">
                                {{reflection.strengthsOrAchievements}}
                            </div>
                        </td>
                        <td>
                            <div class="third-level">
                                {{reflection.evidence}}
                            </div>
                        </td>
                        <td>
                            <div class="third-level text-center">
                                <span></span>{{reflection.date}}<i class="el-icon-date data-i"></i>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Improvement Plan" name="third">
            <div class="content_appraisal_table">
                <table>
                    <tr>
                        <td :colspan="teacherShow ? 3 : 4">
                            <div class="fst-level">
                                {{year}}
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(plan,index) in planList">
                        <td style="width: 35%">
                            <div :class="{'second-level':plan.depth == 2,'third-level':plan.depth == 3}">{{plan.name}}</div>
                        </td>
                        <td style="width: 20%">
                            <div v-if="plan.depth == 2" class="second-level text-center">Area of Improvement </div>
                            <div v-if="plan.depth == 3" class="third-level">
                                {{plan.areaOfImprovement}}
                            </div>
                        </td>
                        <td style="width: 20%">
                            <div v-if="plan.depth == 2" class="second-level text-center">Action Plan </div>
                            <div v-if="plan.depth == 3" class="third-level">
                                {{plan.actionPlan}}
                            </div>
                        </td>
                        <td style="width: 15%">
                            <div v-if="plan.depth == 2" class="second-level text-center">Target Date of Completion </div>
                            <div v-if="plan.depth == 3" class="third-level text-center">
                                {{plan.targetCompleteDate}}<i class="el-icon-date data-i"></i>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</div>
    
   `
export default  {
    template: template,

    data(){
        return {
            id:'',
            activeName: 'first',
            userName:'',
            year:'',
            period:'',
            dutyLevelName:'',
            ratings:[],
            skillList:[],
            reflectionList:[],
            planList:[],
            evaluatorComment:'',
            teacherShow:false,
        }
    },
    mounted() {

    },

    created() {
        this.id = this.$route.query.id;
        this.teacherShow = this.$route.query.type == 'teacher' ? true : false;
        this.getSelfEvaluationDetail(this.id);
    },

    computed: {},

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //获取自评详情
        getSelfEvaluationDetail(id){
            let url = '/self/evaluation/info?id='+id;
            //获取自评信息
            let _this = this;
            server.get(url).then(res=>{
                let data = res.data.data;
                this.evaluatorComment = data.evaluatorComment;
                this.userName = data.userName;
                this.year = data.year;
                this.period = data.period;
                this.dutyLevelName = data.dutyLevelName;
                this.skillList = data.skillList;
                this.reflectionList = data.reflection;
                this.planList = data.planList;
                this.calculateScore(this.skillList);
            }).catch(res => {
                this.$message.error(res.response.data.msg);
            });
            url = '/self/evaluation/rating/list?id='+id;
            server.get(url).then(res=>{
                let data = res.data.data;
                this.ratings = data;
            }).catch(res => {
                this.$message.error(res.response.data.msg);
            });
        },

        //计算能力分
        calculateScore(list){
            for(let i=0;i<list.length;i++){
                let total = 0;
                let num = 0;
                for(let j=0;j<list[i].child.length;j++){
                    let child = list[i].child[j];
                    if(child.depth === 3){
                        num++;
                    }
                    if(child.raing != null){
                        total += (+child.raing);
                    }
                }
                list[i].totalScore = total;
                list[i].averageScore = num == 0 ? 0 : (total/num).toFixed(1);
            }
        },

        //back按钮
        back(){
            if(this.teacherShow){
                this.$router.push({name:'appraisal'});
            }else{
                this.$router.push({name:'appraisalReport'});
            }
        },

        exportInfo(){
            window.open("/staffdevelop/api/development/export/pdf/?selfEvaluationId="+this.id);
        }


    },
    watch: {

    }
}