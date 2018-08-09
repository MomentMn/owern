//vue 组件
let  template=
    `
    <div class="studentList">
       <div class="choose_center"  >
            <div class="choose_title">Class Schedule</div>
            <div class="center_li">Class Schedule</div>
            <div class="center_li">Course</div>
        </div>
        
        <div class="center_detail">
            <div>
                <div class="clearfix">
                    <button>Quick Enroll</button>
                    <button @click="$router.push({path:'/scheduleDetail/'+$route.params.id,query:{centerid:centerid}})">Class schedule</button>
                    <button @click='$router.go(-1)' class="turn_back">Back</button>
                </div>
            </div>
            
            <div class="student_info">
                <div>{{name}}</div>
                <div>{{price}}/lesson</div>
                <div>{{start}} Start Class</div>
                <p  v-for="t in listdtos">{{t.repeat.substring(0,3)}} {{t.startTime.substring(0,5)}}-{{t.endTime.substring(0,5)}}</p>
            </div>
            <div class="class_list">
                      <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="id"
                          label="#"
                          width="180">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="Student Name"
                          width="180">
                        </el-table-column>
                        <el-table-column
                         prop="gender"
                          label="Gender">
                        </el-table-column>
                        <el-table-column
                         prop="number"
                          label="Contact Number">
                        </el-table-column>
                        <el-table-column
                         prop="enrolmentDate"
                          label="Enrolment Date">
                        </el-table-column>
                        <el-table-column
                         prop="leftLessons"
                          label="left Lessons">
                        </el-table-column>
                        <el-table-column
                         prop="status"
                          label="Status">
                        </el-table-column>
                        <el-table-column
                          label="Action">
                             <template slot-scope="scope">
                                <a href="">Class Renewal</a>/<a href="">Change Class</a>
                             </template>
                        </el-table-column>
                      </el-table>
            </div>
        </div>
    </div>>
    
   `
export default  {
    template: template,

    data(){
        return {
            tableData:[],
            active:false,
            centerid:'',
            activeName: 'second',
            list:[1,2,3,4,5,6],
            num:0,
            name:'',
            price:'',
            start:'',
            listdtos:'',
        }
    },
    mounted() {

    },

    created() {
        this.getStudents();
        this.centerid = this.$route.query.centreid;
        console.log(this.centerid)
    },

    computed: {},

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        getStudents(){
            console.log()
            this.name = this.$route.query.name;
            this.price = this.$route.query.price;
            this.start = this.$route.query.start;
            this.listdtos = JSON.parse(this.$route.query.listDtos);
            let url = "/hq/getStudent/" + this.$route.params.id;
            server.get(url).then(res => {
                this.tableData = res.data.data;
            });
        }
    },
    watch: {}
}