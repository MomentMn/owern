//vue 组件

let  template=
    `
    <div class="appraisal-report-div">
        <div class="appraisal-report-head">
            <el-select v-model="year" style="width: 120px" @change="getAllAppraisal">
                <el-option  v-for="y in years" 
                :key="y"
                :label="y"
                :value="y"></el-option>
            </el-select>
            <el-select v-model="period" style="width: 120px;margin-left: 10px;" @change="getAllAppraisal">
                <el-option
                :key="1"
                label="Mid-Year"
                :value="1"></el-option>
                <el-option
                :key="2"
                label="Annual"
                :value="2"></el-option>
            </el-select>
        </div>
        <div class="appraisal-report-body">
            <div class="duty-level-div" v-for="(d,index) in data">
                <div class="duty-level" @click="showTeacher(index)">
                    <div class="left" :class="{'green-litter-span':d.num == 1,'yellow-litter-span':d.num == 2,'red-litter-span':d.num == 3}"></div>
                    <div class="left" style="margin-left: 20px">{{d.dutyLevelName}}</div>
                    
                    <div class="right" style="margin-right: 20px">
                        <span>{{d.completeCount}}</span>/<span>{{d.totalCount}}</span>
                        <i v-show="d.flag" class="el-icon-arrow-down"></i>
                        <i v-show="!d.flag" class="el-icon-arrow-up"></i>
                    </div>
                </div>
                <el-collapse-transition>
                    <div v-show="d.flag" class="teacher-list-div">
                        <div v-for="l in d.list" class="teacher-div item" @click="toDetail(l.id,l.status)">
                            <img class="teacher-div-img" 
                                :class="{'status-submit':l.status == 4}" 
                                :src="l.url ? l.url : '/asset/images/null_pic.png'"/>
                            <div class="red-div" v-show="l.status == 3 || l.status == 6"></div>
                            <div class="text-center teacher-name" :title="l.teacherName">{{l.teacherName}}</div>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
        </div>
    </div>

   `

export default  {
    template: template,
    data(){
        return {
            years:[],
            year:0,
            period:1,
            data:[
            ],
            show:true,
        }
    },
    created() {
        this.getDate();
    },
    methods:{

        showTeacher(index){
            this.data[index].flag = !this.data[index].flag;
        },
        getDate(){
            let url = '/self/evaluation/year/list';
            let _this = this;

            server.get(url).then(res => {
                this.years = res.data.data;
                this.year = res.data.data[0];

                url = '/self/evaluation/period';
                server.get(url).then(res => {
                    this.period = res.data.data;
                    _this.getAllAppraisal();
                }).catch(err => {
                    this.$message.error(err.response.data.msg);
                })

            }).catch(err => {
                this.$message.error(err.response.data.msg);
            })
        },

        getAllAppraisal(){
            let url = '/self/evaluation/all/list?year='+(this.year||0)+'&period='+(this.period||0);

            server.get(url).then(res => {
                let data = res.data.data;
                for(let i=0;i<data.length;i++){
                    data[i].flag = false;
                }
                this.data = data;
            }).catch(err => {
                this.$message.error(err.response.data.msg);
            })
        },

        toDetail(id,status){
            if(status == 4 || status == 6){
                this.$router.push({name:'appraisalDetail',query:{'id':id,'type':'leader'}})
            }else if(status == 3){
                this.$router.push({name:'appraisalDetailEdit',query:{'id':id,'type':'leader'}})
            }
        }
    }

}

