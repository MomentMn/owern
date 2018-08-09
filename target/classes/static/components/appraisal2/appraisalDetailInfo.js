//vue 组件
let  template=
    `
<div class="appraisal-info">
    <div class="head">
        <div class="head-left left">
            <div class="head-appraisal-info">员工评估 - {{year}} {{period}}</div>
            <div class="head-user-info">
                <span>教师名称: {{userName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>当前水平: {{dutyLevelName}}</span>
            </div>
        </div>
        <div class="head-right right">
            <el-button class="bt" type="success" @click="back">返回</el-button>
            <el-button class="bt" type="success" @click="exportInfo">导出</el-button>
        </div>
    </div>
    <div class="appraisal-body">
        <textarea v-show="!teacherShow" class="appraisal-comment" placeholder="评审人的评论" disabled>{{evaluatorComment}}</textarea>
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="检查清单" name="first">
            <div class="raing-div">
                	评分:
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
                            <div v-if="child.depth == 2" class="second-level text-center">引导问题 </div>
                            <div v-if="child.depth == 3" class="third-level">{{child.guidingQuestion}}</div>
                        </td>
                        <td style="width: 25%">
                            <div v-if="child.depth == 2" class="second-level text-center">凭证 </div>
                            <div v-if="child.depth == 3" class="third-level">
                               {{child.evidence}}
                            </div>
                        </td>
                        <td style="width: 20%">
                            <div v-if="child.depth == 2" class="second-level text-center"> 评级 </div>
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
                                <span>总分 : {{skill.totalScore}}</span>
                                <span>平均分 : {{skill.averageScore}} </span>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="反思" name="second">
            <div class="content_appraisal_table">
                <table>
                    <tr>
                        <td colspan="4">
                            <div class="fst-level">
                                <div class="reflection-head text-center">
                                    	优点和成就
                                </div>
                                <div class="text-center">
                                    	请确认并陈述可能的证据证明实力和成就。
                                </div>
                            </div>
                         </td>
                    </tr>
                    <tr>
                        <td style="width: 10%"><div class="second-level text-center">序号</div></td>
                        <td style="width: 30%"> <div class="second-level text-center">优势成就</div></td>
                        <td style="width: 30%"><div class="second-level text-center">证据 </div></td>
                        <td style="width: 30%"> <div class="second-level text-center">时间/日期 </div></td>
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
        <el-tab-pane label="提升计划" name="third">
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
                            <div v-if="plan.depth == 2" class="second-level text-center">改进的区域 </div>
                            <div v-if="plan.depth == 3" class="third-level">
                                {{plan.areaOfImprovement}}
                            </div>
                        </td>
                        <td style="width: 20%">
                            <div v-if="plan.depth == 2" class="second-level text-center">行动计划 </div>
                            <div v-if="plan.depth == 3" class="third-level">
                                {{plan.actionPlan}}
                            </div>
                        </td>
                        <td style="width: 15%">
                            <div v-if="plan.depth == 2" class="second-level text-center">目标完成日期 </div>
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