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
            <el-button v-show="showFlag" class="bt" type="success" @click="submit">提交</el-button>
            <el-button v-show="!showFlag" class="bt" type="success" @click="save">保存</el-button>
            <el-button v-show="showFlag && !teacherShow" class="bt" type="success" @click="exportInfo">导出</el-button>
        </div>
    </div>
    <div class="appraisal-body">
        <textarea v-show="!teacherShow && showFlag" class="appraisal-comment" placeholder="评审人的评论" @blur="commentChange">{{evaluatorComment}}</textarea>
        <el-tabs v-show="showFlag" v-model="activeName" @tab-click="handleClick" v-loading="loading">
            <el-tab-pane label="检查清单" name="1">
                <div class="raing-div">
                    	评分:
                    <span v-for="(r,i) in ratings" :class="{'margin-left-60':i != 0}">{{r.rateKeys}} = <span class="litter-span">{{r.score}}</span></span>
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
                                    <textarea @blur="skillEvidenceChange(bindex,cindex,$event)" maxlength="500">{{child.evidence}}</textarea>
                                </div>
                            </td>
                            <td style="width: 20%"> 
                                <div v-if="child.depth == 2" class="second-level text-center"> 评级</div>
                                <div v-if="child.depth == 3" class="third-level text-center"> 
                                    <span v-for="(r,i) in ratings" class="litter-span" 
                                    :class="{'margin-left-10':i != 0 , 'green-litter-span':child.raing == r.score }" 
                                    @click="skillScoreChange(bindex,cindex,$event)">{{r.score}}</span>
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
            <el-tab-pane label="反思" name="2">
                <div class="content_appraisal_table">
                    <table>
                        <tr> 
                            <td colspan="5">
                                <div class="fst-level">
                                    <div class="reflection-head text-center">
                                        	优点和成就
                                    </div>
                                    <div class="text-center">
                                        	请确认并陈述可能的证据证明实力和成就
                                    </div>
                                </div>
                             </td>
                        </tr>    
                        <tr> 
                            <td style="width: 10%"><div class="second-level text-center">序号</div></td>
                            <td style="width: 34%"> <div class="second-level text-center">优势成就</div></td>
                            <td style="width: 34%"><div class="second-level text-center">证据 </div></td>
                            <td style="width: 14%"> <div class="second-level text-center">时间/日期 </div></td>
                            <td style="width: 8%"> <div class="second-level text-center"> &nbsp;</div></td>
                        </tr>
                        <tr v-for="(reflection,index) in reflectionList"> 
                            <td class="text-center" style="height:250px;vertical-align: middle;">{{index + 1}}</td>
                            <td>
                                <div class="third-level">
                                    <textarea @blur="changeReflection('strengthsOrAchievements',index,$event)" style="height:225px" maxlength="500">{{reflection.strengthsOrAchievements}}</textarea>
                                </div>
                            </td>
                            <td>
                                <div class="third-level">
                                    <textarea @blur="changeReflection('evidence',index,$event)" style="height:225px" maxlength="500">{{reflection.evidence}}</textarea>
                                </div>
                            </td>
                            <td>
                                <div class="third-level">
                                    <el-date-picker
                                        v-model="reflection.date"
                                        value-format="dd/MM/yyyy"
                                        format="dd/MM/yyyy"
                                        :editable="false"
                                        :picker-options="startTimeOption"
                                        type="date"
                                        @change="changeReflection('time',index,$event)">
                                    </el-date-picker>
                                </div>
                            </td>
                            <td>
                                <div class="third-level text-center"><i class="el-icon-delete" style="font-size: 30px;color: red;cursor: pointer;" @click="deleteReflection(index)"></i></div>
                            </td>
                        </tr>
                        <tr> 
                            <td class="text-center" style="height:250px;vertical-align: middle;">{{reflectionList.length + 1}}</td>
                            <td>
                                <div class="third-level">
                                    <el-button type="danger" plain @click="changeReflection('add',null,$event)"><i class="el-icon-plus el-icon--left"></i>添加新的反思</el-button>
                                </div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                        </tr>
                    </table>  
                </div> 
            </el-tab-pane>
            <el-tab-pane label="提升计划" name="3">
                <div class="content_appraisal_table">
                    <table>
                        <tr> 
                            <td :colspan="teacherShow ? 3 : 4 ">
                                <div class="fst-level">
                                    {{year}}
                                </div>
                            </td>
                        </tr>    
                        <tr v-for="(plan,index) in planList">
                            <td style="width: 35%">
                                <div :class="{'second-level':plan.depth == 2,'third-level':plan.depth == 3}">{{plan.name}}</div>
                            </td>
                            <td style="width: 35%">
                                <div v-if="plan.depth == 2" class="second-level text-center">改进区域</div>
                                <div v-if="plan.depth == 3" class="third-level">
                                    <textarea @blur="planChange(index,'areaOfImprovement',$event)" maxlength="500">{{plan.areaOfImprovement}}</textarea>
                                </div>
                            </td>
                            <td style="width: 35%">
                                <div v-if="plan.depth == 2" class="second-level text-center">行动计划 </div>
                                <div v-if="plan.depth == 3" class="third-level">
                                    <textarea @blur="planChange(index,'actionPlan',$event)" maxlength="500">{{plan.actionPlan}}</textarea>
                                </div>
                            </td>
                            <td style="width: 15%">
                                <div v-if="plan.depth == 2" class="second-level text-center">完成目标日期 </div>
                                <div v-if="plan.depth == 3" class="third-level text-center">
                                    <el-date-picker
                                        v-model="plan.targetCompleteDate"
                                        value-format="dd/MM/yyyy"
                                        format="dd/MM/yyyy"
                                        :editable="false"
                                        :picker-options="startTimeOption"
                                        type="date"
                                        @change="planChange(index,'time',$event)">
                                    </el-date-picker>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 35%">
                                <div class="third-level">
                                    <el-button type="danger" plain @click="addPlan"><i class="el-icon-plus el-icon--left"></i>添加新目标</el-button>
                                </div>
                            </td>
                            <td style="width: 20%" v-if="!teacherShow"></td>
                            <td style="width: 20%"></td>
                            <td style="width: 15%"></td>
                        </tr>
                    </table>  
                </div> 
            </el-tab-pane>
        </el-tabs>
        <div v-show="!showFlag">
            <div class="text-center">
                Select Improvement Targets
            </div>
            <div class="content_appraisal_table">       
                 <table v-for="(skill,bindex) in skillList">
                    <tr> 
                        <td colspan="3"><div class="fst-level">{{skill.name}}</div></td>
                    </tr>    
                    <tr v-for="(child,cindex) in skill.child"> 
                        <td style="width: 50%">
                            <div :class="{'second-level':child.depth == 2,'third-level':child.depth == 3}">{{child.name}}</div>
                        </td>
                        <td style="width: 30%"> 
                            <div v-if="child.depth == 2" class="second-level text-center"> 评级 </div>
                            <div v-if="child.depth == 3" class="third-level text-center"> 
                                <span class="litter-span green-litter-span" v-if="child.raing">{{child.raing}}</span>
                            </div>
                        </td>
                        <td style="width: 20%"> 
                            <div v-if="child.depth == 2" class="second-level text-center"> 选择目标 </div>
                            <div v-if="child.depth == 3" class="third-level text-center"> 
                                <el-checkbox class="checkbox-default" 
                                    :class="{'gray-checkbox':child.haveHistory}"
                                    :true-label="child.dutyLevelSkillId" 
                                    :false-label="-child.dutyLevelSkillId" 
                                    :checked="child.selfEvaluationPlanId ? true : false"
                                    @change="checkSkill"
                                    ></el-checkbox>
                            </div>
                        </td>
                    </tr>
                    <tr> 
                        <td colspan="3">
                            <div class="blank-hr">
                                
                            </div>
                        </td>
                    </tr>    
                </table>  
            </div> 
        </div>
    </div>
</div>
    
   `
export default  {
    template: template,

    data(){
        return {
            id:'',
            activeName: '1',
            userName:'',
            year:'',
            period:'',
            dutyLevelName:'',
            ratings:[],
            skillList:[],
            reflectionList:[],
            planList:[],
            showFlag:true,
            checkList:[],
            planTime:[],
            startTimeOption:{
                disabledDate: (time) => {
                    return time.getTime() <= new Date();
                }
            },
            evaluatorComment:'',
            teacherShow:false,
            loading:false
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
                this.calculateSkillScore(null);
                for (let i=0;i<this.skillList.length;i++){
                    let skill = this.skillList[i];
                    if(skill.child != null){
                        for(let j=0;j<skill.child.length;j++){
                            if(skill.child[j].selfEvaluationPlanId != null){
                                this.checkList.push(skill.child[j].dutyLevelSkillId);
                            }
                            // if(skill.child[j].targetScore == null){
                            //     skill.child[j].targetScore = skill.child[j].raing;
                            // }
                        }
                    }
                }
                //console.log(this.skillList);

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

        //能力evidence改变 触发方法
        skillEvidenceChange(bindex,cindex,event){
            let value = event.target.value;
            this.skillChange(bindex,cindex,value,null);
        },

        //分数改变触发方法
        skillScoreChange(bindex,cindex,event){
            let value = event.target.textContent;
            this.skillChange(bindex,cindex,null,value);
            this.calculateSkillScore(bindex);
        },

        //能力改变提交
        skillChange(bindex,cindex,evidence,score){
            let url = '/self/evaluation/save/skill';

            let dutyLevelSkillId = this.skillList[bindex].child[cindex].dutyLevelSkillId;
            let selfSkillId = this.skillList[bindex].child[cindex].id;
            if(evidence != null){
                this.skillList[bindex].child[cindex].evidence = evidence;
            }
            if(score != null){
                this.skillList[bindex].child[cindex].raing = score;
                //同步分数
                // if(this.skillList[bindex].child[cindex].targetScore == null){
                //     this.skillList[bindex].child[cindex].targetScore = score;
                // }
            }

            let data = {
                'selfEvaluationId':this.id,
                'dutyLevelSkillId':dutyLevelSkillId,
                'selfSkillId':selfSkillId,
                'evidence':evidence,
                'score':score
            }

            this.loading = true;

            server.post(url,data).then(res => {

                this.skillList[bindex].child[cindex].id = res.data.data;
                this.loading = false;
                this.$forceUpdate();
            }).catch(res => {
                this.loading = false;
                this.$message.error(res.response.data.msg);
            });
        },

        //计算能力分
        calculateSkillScore(index){
            if(index != null){
                this.calculateScore(this.skillList,index);
            }else{
                this.calculateScore(this.skillList,null);
            }
        },

        //计算能力分
        calculateScore(list,index){
            for(let i=0;i<list.length;i++){
                if(index == null || index === i){
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
            }
        },

        //reflection改变
        changeReflection(str,index,event){
            switch (str){
                case 'add':
                    this.reflectionChange(null,null,null,null);
                    break;
                case 'strengthsOrAchievements':
                    this.reflectionChange(index,event.target.value,null,null);
                    break;
                case 'evidence':
                    this.reflectionChange(index,null,event.target.value,null);
                    break;
                case 'time':
                    if(event == null){
                        event = "";
                    }
                    this.reflectionChange(index,null,null,event);
                    break;
            }
        },

        reflectionChange(index,strengthsOrAchievements,evidence,time){
            let url = '/self/evaluation/save/achieve';

            let id = null;
            if(index != null){
                id = this.reflectionList[index].id;
            }
            let data = {
                'id':id,
                'selfEvaluationId':this.id,
                'strengthsOrAchievements':strengthsOrAchievements,
                'evidence':evidence,
                'time':time
            }

            this.loading = true;

            server.post(url,data).then(res => {
                if(id === null){
                    let reflection = {};
                    reflection.id = res.data.data;
                    reflection.strengthsOrAchievements = "";
                    reflection.evidence = "";
                    reflection.date = "";
                    this.reflectionList.push(reflection);

                }else{
                    if(strengthsOrAchievements){
                        this.reflectionList[index].strengthsOrAchievements = strengthsOrAchievements;
                    }
                    if(evidence){
                        this.reflectionList[index].evidence = evidence;
                    }
                    if(time){
                        this.reflectionList[index].date = time;
                    }
                }
                this.loading = false;
                this.$forceUpdate();
            }).catch(res => {
                this.loading = false;
                this.$message.error(res.response.data.msg);
            });
        },

        //删除成就
        deleteReflection(index){

            let url = '/self/evaluation/delete/achieve/' + this.id + '/'+this.reflectionList[index].id;
            server.delete(url).then(res => {
                let list = [];
                for(let i=0;i<this.reflectionList.length;i++){
                    if(index != i){
                        list.push(this.reflectionList[i]);
                    }
                }
                this.reflectionList = list;
                this.$forceUpdate();
            }).catch(res => {
                this.$message.error(res.response.data.msg);
            });
        },

        checkSkill(event){
            if(event > 0){
                this.checkList.push(event);
            }else{
                let list = [];
                for(let i=0;i<this.checkList.length;i++){
                    if(this.checkList[i] != (-event)){
                        list.push(this.checkList[i]);
                    }
                }
                this.checkList = list;
            }
            console.log(this.checkList);
        },

        //新增计划
        addPlan(){
            this.showFlag = false;
        },

        planChange(index,str,event){
            switch (str){
                case 'areaOfImprovement':
                    this.planList[index].areaOfImprovement = event.target.value;
                    this.savePlan(index,null,null,event.target.value);
                    break;
                case 'actionPlan':
                    this.planList[index].actionPlan = event.target.value;
                    this.savePlan(index,event.target.value,null,null);
                    break;
                case 'time':
                    this.savePlan(index,null,event ? event : '',null);
                    break;
            }
        },

        //保存计划
        savePlan(index,actionPlan,targetCompleteDate,areaOfImprovement){
            let url = '/self/evaluation/save/plan';

            let id = this.planList[index].id;
            let dutyLevelSkillId = this.planList[index].dutyLevelSkillId;
            let data = {
                'id':id,
                'selfEvaluationId':this.id,
                'dutyLevelSkillId':dutyLevelSkillId,
                'actionPlan':actionPlan,
                'targetCompleteDate':targetCompleteDate,
                'areaOfImprovement':areaOfImprovement
            }

            this.loading = true;

            server.post(url,data).then(res => {
                this.loading = false;
            }).catch(res => {
                this.$message.error(res.response.data.msg);
                this.loading = false;
            });
        },

        targetScoreChange(dutyLevelSkillId,bindex,cindex,event){
            for(let i=0;i<this.checkList.length;i++){
                if(this.checkList[i] == dutyLevelSkillId){
                    this.skillList[bindex].child[cindex].targetScore = event.target.textContent;
                }
            }
        },

        //保存按钮
        save(){
            let targetScore = [];

            for (let i=0;i<this.skillList.length;i++){
                let skill = this.skillList[i];
                if(skill.child != null){
                    for(let j=0;j<skill.child.length;j++){
                        let child = skill.child[j];
                        for(let k=0;k<this.checkList.length;k++){
                            if(this.checkList[k] == child.dutyLevelSkillId){
                                let score = {};
                                score.dutyLevelSkillId = child.dutyLevelSkillId;
                                score.targetScore = child.targetScore;
                                targetScore.push(score);
                            }
                        }
                    }
                }
            }

            let data = {
                'selfEvaluationId':this.id,
                'scoreList':targetScore
            };

            console.log(data);

            let url = '/self/evaluation/add/plan';

            let _this = this;

            server.post(url,data).then(res => {
                let newUrl = "/self/evaluation/plan/list?id="+_this.id;
                server.get(newUrl).then(res => {
                    this.planList = res.data.data;
                    this.showFlag = true;
                })
            }).catch(res => {
                this.$message.error(res.response.data.msg);
            });
        },

        commentChange(event){
            let url = '/self/evaluation/save/comment';
            let data = {
                'selfEvaluationId':this.id,
                'comment':event.target.value
            }
            server.post(url,data).then(res => {

            }).catch(res => {
                this.$message.error(res.data.msg);
            });
        },

        //back按钮
        back(){
            if(!this.showFlag){
                this.showFlag = true;
            }else{
                if(this.teacherShow){
                    this.$router.push({name:'appraisal'});
                }else{
                    this.$router.push({name:'appraisalReport'});
                }
            }
        },

        //submit按钮
        submit(){
            let url = '/self/evaluation/submit/'+this.id;

            for(let i=0;i<this.skillList.length;i++){
                let skill = this.skillList[i];
                for(let j=0;j<skill.child.length;j++){
                    let child = skill.child[j];
                    if(child.depth == 3){
                        if(child.evidence == null || child.evidence.trim() == ''){
                            this.$message.error('检查清单证据不能为空');
                            return;
                        }
                        if(child.raing == null){
                            this.$message.error('检查清单证据不能为空');
                            return;
                        }
                    }
                }
            }
            for(let i=0;i<this.reflectionList.length;i++){
                let reflection = this.reflectionList[i];
                if(reflection.strengthsOrAchievements == null || reflection.strengthsOrAchievements.trim() == ''){
                    this.$message.error('反思、优势或成就不能为空');
                    return;
                }
                if(reflection.evidence == null || reflection.evidence.trim() == ''){
                    this.$message.error('反思证据不能为空');
                    return;
                }
                if(reflection.date == null){
                    this.$message.error('反思时间/日期不能为空');
                    return;
                }
            }
            for(let i=0;i<this.planList.length;i++){
                let plan = this.planList[i];
                if(plan.depth == 3){
                    if(plan.actionPlan == null || plan.actionPlan.trim() == ''){
                        debugger
                        this.$message.error('改进计划行动计划不能为空');
                        return;
                    }
                    if(plan.targetCompleteDate == null){
                        this.$message.error('改进计划目标完成不能为空');
                        return;
                    }
                    if(!this.teacherShow){
                        if(plan.areaOfImprovement == null || plan.areaOfImprovement.trim() == ''){
                            this.$message.error('改进计划区域不空');
                            return;
                        }
                    }
                }
            }

            server.put(url).then(res => {
                if(this.teacherShow){
                    this.$router.push({name:'appraisal'});
                }else{
                    this.$router.push({name:'appraisalReport'});
                }
            }).catch(res => {
                this.$message.error(res.response.data.msg);
            });
        },

        exportInfo(){
            window.open("/api/development/export/pdf/?selfEvaluationId="+this.id);
        }
    },
    watch: {

    }
}