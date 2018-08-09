import RoadmapTraindialog from "/staffdevelop/components/roadmap2/TrainingDialog.js"
//vue 组件
let  template=
`
<div class="roaddetail">
<div class="roaddetail-wraper"  v-loading="loading">
     <div class="title">
         <div style="display: inline-block">
          <div class="big_title">专业发展路线图 </div>
          <div><span class="name">教师名称: {{teacher.teacherName}}</span> <span class="level">当前水平: {{teacher.dutyName}}</span></div>
        </div>
        <div　class="buttons" style="display: inline-block;float:right;margin-right:30px;">        
            <el-button type="success" @click="saveEvidence()" v-if="visiableButton==1">　保存　</el-button>
            <el-button type="success" @click="back()">　返回　</el-button>
        </div>
     </div>
     <div class="content">
       <div class="cont_wraper">       
            <table>
               <tr> 
                  <td colspan="7">
                    <div class="tbltitle">
                        <span class="year">{{teacher.year}}</span> 
                        <span class="level">{{teacher.yearDutyName}}</span>                        
                     </div>
                     </td>
               </tr>               
               <!-- 一级 -->
               <template v-for="item in roadMap">               
                   <tr> 
                      <td colspan="7"><div class="fst-level">{{item.skillName}}</div></td>
                   </tr>    
                   <template v-for="item2 in item.childs">
                     <!-- 二级 -->
                       <tr class="second-level-tr"> 
                         <td style="width: 21%"><div class="second-level">{{item2.skillName}}</div></td>
                         <td style="width: 15%"> <div class="second-level">改进区域 </div></td>
                         <td style="width: 15%"><div class="second-level">行动计划 </div></td>
                         <td style="width: 15%"> <div class="second-level">证据 </div></td>
                         <td style="width: 8%"><div class="second-level"> 状态 </div></td>                 
                         <td style="width: 8%"><div class="second-level"> 审核日期 </div></td>
                         <td style="width: 8%"> 
                         <div class="second-level" >
                         <el-button type="success" size="small" @click="addTraining(item2.dutyLevelSkillId,item.skillName,item2.skillName,item2.dutyLevelSkillId)" v-if="teacher.roleType!=='teacher'&& item2.editable==1">添加培训</el-button>
                         <span v-if="teacher.roleType==='teacher' || teacher.roleType!=='teacher'&& item2.editable==0">培训计划</span>
                         </div></td>
                       </tr>
                         <template v-for="(item3,index) in item2.childs">
                          <!-- 三级 -->
                            <tr> 
                                 <td ><div class="third-level">{{item3.skillName}} </div></td>
                                 <td >
                                 <div class="third-level">                                                                 
                                   <el-input
                                      type="textarea"
                                      :rows="2"
                                      :maxlength="500"
                                       :value= "item3.areaOfImprovement" 
                                       v-model="item3.areaOfImprovement"   
                                       :max="500"   
                                        v-if="item3.editable==1"
                                      >
                                    </el-input>
                                    
                                    <template v-if="item3.editable==0"> {{item3.areaOfImprovement}}</template>
                                   </div>
                                 </td>
                                 <td ><div class="third-level">                              
                                  <el-input
                                      type="textarea"
                                      :rows="2"
                                       :value= "item3.actionPlan" 
                                       v-model="item3.actionPlan"   
                                       :maxlength="500"
                                       v-if="item3.editable==1"
                                      >
                                    </el-input>                                    
                                     <template v-if="item3.editable==0"> {{item3.actionPlan}}</template>
                                  </div></td>
                                 <td ><div class="third-level"> 
                                         <el-input
                                              type="textarea"
                                              :rows="2"
                                              :maxlength="500"
                                               :value= "item3.evidence" 
                                               v-model="item3.evidence" 
                                               v-if="item3.editable==1"
                                              >
                                            </el-input>    
                                          <template v-if="item3.editable==0"> {{item3.actionPlan}}</template>
                                    </div> </td>
                                 <td > 
                                     <div class="third-level" v-if="item3.status==1">
                                        	已完成<br> {{item3.markCompleteDateDesc}} 
                                     </div>
                                     <div class="third-level" v-if="item3.status==0 && teacher.roleType!=='teacher'&&item3.editable==1">
                                        <el-button type="success" size="small" @click="markAsComplete(item3.id)">标记<br/>完成</el-button> 
                                     </div>
                                 </td>                
                                 <td > 
                                 <div class="third-level" style="text-align: center;">  
                                  <div v-html="newLine(item3.moreReviewDate)||item3.targetCompleteDate"></div>                                    
                                    <el-date-picker type="date" 
                                        value-format="dd/MM/yyyy"    
                                        format="dd/MM/yyyy"
                                         :editable="false"    
                                          :align="'right'"    
                                           :size="'small'"       
                                          :picker-options="startTimeOption"
                                         v-model="item3.moreReviewDatetemp"  v-if="teacher.roleType!=='teacher'&&item3.editable==1">                         
                                    </el-date-picker>  
                                 </div></td>
                                 <td  :rowspan="item2.childs.length" v-if="index==0">
                                  <div class="third-level">        
                                       <template v-for="(item3,index) in item2.traingDate">   
                                        
                                        <div :class="{colorRed:item3.status===1 ,colorGreen:item3.status>=2}" >              
                                             	{{item3.name}} <br/> {{item3.gmtModifyDesc}}
                                        </div>                                       
                                          
                                       </template>
                                 </div>
                                 </td>
                           </tr>                       
                        </template>
                   </template>
               </template>                
               
               <!--汇总-->
                <tr> 
                  <td colspan="7"><div class="summary"><span>总计划培训时长: {{ teacher.trainHours||0}} 小时</span></div></td>
               </tr>    
             </table>          
       </div>
     </div> 
</div>
 <!--添加课程的弹出框-->
 <roadmap-traindialog v-if="roadmapTrainVisiable" :data="trainData"  @addSuccess="onLoadSuccess()"><roadmap-traindialog/>   
</div>

`
export default  {
    template: template,
    props: {

    },
    components:{
        roadmapTraindialog:RoadmapTraindialog
    },
    data(){
        return {
            roadMap:{
            },
            loading:true,
            roadmapTrainVisiable:false,
            teacher:{},
            trainData:{},
            startTimeOption:{
                disabledDate: (time) => {
                    return time.getTime() <= new Date();
                }
            },
            visiableButton:0,
            planData:[],
            startTimeOption:{
                disabledDate: (time) => {
                    return time.getTime() <= new Date();
                }
            }
        }
    },
    // 初始化页面
    mounted(){
        //加载老师信息
        this.loadTeacherInfo();
    },
    methods:{
      // 加载页面
        fetchRoadMap()
        {
            let evaluationId = this.$route.params.id;
            let userId = this.$route.query.teacherId;

            let url ='/api/development/roaddetail?evaluationId='+evaluationId+"&userId="+userId;
            server.get(url, {
                }).then(res => {
                    this.loading = false;
                    // 加载页面数据
                    this.roadMap = res.data.data;
                  if(this.roadMap && this.roadMap[0].childs){
                       this.visiableButton =this.roadMap[0].childs[0].editable;
                   }
                }).catch(err => {
                    this.loading = false;
                    console.log(err);
                });
        },
        loadTeacherInfo(){
            let userId = this.$route.query.teacherId;
            let evaluationId = this.$route.params.id;
            // 加载老师训练信息
            let url ='/api/development/train?userId='+userId+'&evaluationId='+evaluationId;
            server.get(url, {}).then(res => {
                // 加载页面数据
                this.teacher = res.data.data;
                // 训练页面的初始化数据
                this.trainData={
                    userId:userId,
                    teacherName:res.data&&res.data.data.teacherName,
                    dutyName:res.data.data.dutyName,
                    selfEvaluationId:evaluationId
                }
                //加载
                this.fetchRoadMap();
            }).catch(err => {
                console.log(err);
            });
        },
        // 添加课程
        addTraining(id,skillName1,skillName2,skillId){
           this.trainData.planId=id;
           this.trainData.skillName1=skillName1;
           this.trainData.skillId=skillId;
           this.trainData.skillName2=skillName2;
           this.roadmapTrainVisiable=true;
        },
        // markAsComplete
        markAsComplete(id){
            // 加载老师训练信息
            let url ='/api/development/markstatus?selfEvaluationPlanId='+id;
            server.get(url, {}).then(res => {
                // 加载页面数据
                let date  = res.data.data;
                //遍历请求
                if(this.roadMap){
                    this.roadMap.forEach((item,index)=>{
                        item.childs.forEach((item2,index2)=>{
                            item2.childs.forEach((item3,index)=>{
                                if(item3.id === id){
                                    item3.status=1;
                                    item3.markCompleteDateDesc= date;
                                    this.$set(item3,"markCompleteDateDesc",date);
                                }
                            });
                        })
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        },
        // 返回
        back(){
            let teacherId = this.$route.query.teacherId;
            if(this.$route.query.pageNo===0){
                this.$router.push({name:"development",params:{id:teacherId}})
            }
            else{
                this.$router.push({name:"training",query:{tabNo:3}})
            }

        },
        onLoadSuccess(){
            // 加载成功。
             this.loadTeacherInfo();
            this.roadmapTrainVisiable=false;
        },
        newLine(str){
            if(str){
              return str.split(",").sort().join("<br/>")
            }
            else{
                return "";
            }
        },
        saveEvidence(){
            // 保存文本信息
            if(this.roadMap){
                this.roadMap.forEach((item,index)=>{
                    item.childs.forEach((item2,index2)=>{
                        item2.childs.forEach((item3,index)=>{
                             let _moreReviewDate = "";
                            if(!item3.moreReviewDate){
                                _moreReviewDate =item3.targetCompleteDate;
                            }
                            else{
                                _moreReviewDate = item3.moreReviewDate;
                            }
                            // 临时存储器
                            if(item3.moreReviewDatetemp){
                                _moreReviewDate =(!_moreReviewDate?"": _moreReviewDate+",")+item3.moreReviewDatetemp;
                            }

                            this.planData.push({id:item3.id,
                                areaOfImprovement:item3.areaOfImprovement,
                                actionPlan:item3.actionPlan,
                                evidence:item3.evidence,
                                moreReviewDate:_moreReviewDate
                            });
                        });
                    })
                })
            }
            // 判断是否修改
            if(this.planData){
                let url='/api/development/roadmap/detail/save';
                try {
                    server.post(url,this.planData).then(res =>{
                            this.$message.success("成功");
                        }
                    ).catch(res =>{
                        this.$message.error("失败");
                    });
                } catch (err) {
                    this.$message.error(err.msg);
                }
            }

        }
    }
}
