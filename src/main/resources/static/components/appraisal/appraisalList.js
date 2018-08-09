//vue 组件

let  template=
    `
    <div class="appraisal-list-div">
        <div class="appraisal-list-hear">
            <span class="appraisal-list-hear-info">Teacher's name {{userName}} : {{dutyLevelName}}</span>
            <el-select class="year-select" v-model="year" placeholder="All" @change="getSelfAppraisal">
                   <el-option
                      key="All"
                      label="All"
                      value="">
                    </el-option>
                    <el-option v-for="y in years"
                      :key="y"
                      :label="y"
                      :value="y">
                    </el-option>
            </el-select>
        </div>
        <div class="appraisal-list-body" v-for="(selfEvaluation,index) in selfEvaluationList" @click="toDetail(index)">
            <div class="left">
                <div class="appraisal-list-create-time">Staff Appraisal - {{selfEvaluation.year}} {{selfEvaluation.period}}</div>
                <div>last update {{selfEvaluation.lastUpdate}}</div>
            </div>
            <div class="appraisal-list-body-right right">
                <span v-if="selfEvaluation.status == 2" class="color-green">Draft</span>
                <span v-if="selfEvaluation.status == 3" class="color-blur">Submit</span>
                <span v-if="selfEvaluation.status == 4" class="color-yellow">Reviewed</span>
                <span v-if="selfEvaluation.status == 5" class="color-green">Draft</span>
                <span v-if="selfEvaluation.status == 6" class="color-blur">Submit</span>
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
    </div>

   `

export default  {
    template: template,
    data(){
        return {
            year:'',
            years:[],
            selfEvaluationList:[],
            userName:'',
            dutyLevelName:'',
        }
    },
    created() {
        this.getYears();
        this.getSelfAppraisal();
    },
    methods:{
        //
        getYears() {
            let url = '/self/evaluation/year/list';

            server.get(url).then(res => {
                this.years = res.data.data;
            }).catch(err => {
                this.$message.success(err.response.data.msg);
            })
        },

        //获取自评列表
        getSelfAppraisal(){
            let url = '/self/evaluation/list?year='+this.year;

            server.get(url).then(res => {
                let data = res.data.data;
                this.userName = data.userName;
                this.dutyLevelName = data.dutyLevelName;
                this.selfEvaluationList = data.list;
            }).catch(err => {
                this.$message.error(err.response.data.msg);
            })
        },
        toDetail(index){
            let selfEvaluation = this.selfEvaluationList[index];
            if(selfEvaluation.status == 2){
                this.$router.push({name:'appraisalDetailEdit',query:{'id':selfEvaluation.id,'type':'teacher'}})
            }else{
                this.$router.push({name:'appraisalDetail',query:{'id':selfEvaluation.id,'type':'teacher'}})
            }
        }
    }

}

