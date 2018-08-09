//vue 组件
import PromotionDialog from "/staffdevelop/components/roadmap/PromotionDialog.js"

let  template=
`
<div class="roadmap">
<div class="roadmap-wraper"  v-loading="loading">
     <div class="title">
        <div style="display: inline-block">
          <div class="big_title">Professional Development Roadmap </div>
          <div><span class="name">Teacher's name: {{roadMap.teacherName}}</span> <span class="level">Current Level: {{roadMap.currentLevel}}</span></div>
        </div>
        <div　class="buttons" style="display: inline-block;float:right;margin-right:30px;" v-if="roadMap.roleType!=='teacher'">        
            <el-button type="success" @click="promotion">　Promotion　</el-button> 
            <el-button type="success" @click="back">　Back　</el-button>
        </div>
     </div>
     
     <div class="content">
       <div class="cont_wraper">    
           <div v-for="item in roadMap.develops">
             <div class="year-content"><span class="year">{{item.year}} </span><span class="level"> {{item.dutyName}} </span></div>
             <div class="content__content">
                 <div class="content__cont_wraper" v-for="yearItem in item.yearEvaluations">                                      
                     <div class="left_content"> 
                        <div class="period">{{ yearItem.period==2 ? 'Annual Appraisal':'Mid-Year Review'}}</div>
                        <div class="target">Targets Completed: {{ yearItem.finishNum}}/{{ yearItem.total}}</div>
                         <div class="Average">Average Score: {{ formateNum(yearItem.score)}}</div>
                      </div>                      
                      
                       <div class="right_content"  v-if="yearItem.status===3"> 
                         <div class="desc">{{yearItem.desc}}<br/>Last updated on: {{yearItem.lastModifyDesc}}</div>
                         <div class="status greenft">Pending</div>
                         <div class="button"><el-button type="success" size="small" @click="viewDetail(yearItem.evaluationId)"> 　Expand　</el-button></div>
                       </div>
                       
                        <div class="right_content" v-if="yearItem.status===4"> 
                            <div class="desc">{{yearItem.desc}}<br/> Reviewed by Principal </div>
                            <div class="status blackft">Finished</div>
                             <div class="button"><el-button type="info" size="small" @click="viewDetail(yearItem.evaluationId)">View Detail</el-button></div>
                       </div>  
                 </div>     
            </div>               
       </div>
     </div> 
</div>
     <!-- 职务 -->
     <promotion-dialog v-if="promotionVisiable" :currentlevel="roadMap.currentLevel" :teacherId="roadMap.id"><promotion-dialog/>
</div>

`
export default  {
    template: template,
    props: {
        teacherId: {
            required: false,
            type: Number
        }
    },
    components:{
        promotionDialog:PromotionDialog
    },
    data(){
        return {
            roadMap:{},
            loading:true,
            promotionVisiable:false,
            teacher:{
            }
        }
    },
    // 初始化页面
    mounted(){

        this.fetchRoadMap();
    },
    methods:{
      // 加载页面
        fetchRoadMap()
        {
            let userId = this.$route.params.id;
            server.get('/api/development/roadmap?userId='+userId, {
            }).then(res => {
                this.loading = false;
                // 加载页面数据
                this.roadMap = res.data;

            }).catch(err => {
                this.loading = false;
                console.log(err);
            });
        },
        // 职务提升
        promotion(){
            this.promotionVisiable=true;
        },//
        viewDetail(id){
            this.$router.push({name:"roadmapDetail",params:{id:id },query:{teacherId:this.roadMap.id,pageNo:0}});
        },
        back(){
            this.$router.push({name:"leadermain"})
        },
        formateNum(score){
            return (score||0).toFixed(1);
        }
    }
}
