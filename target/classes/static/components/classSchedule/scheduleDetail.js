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
            <button style="float:left;background-color:#d9534f;margin-bottom:50px" @click="$router.go(-1)">Back</button>
            <div class="class_list">
                      <el-table
                        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="number"
                          label="StartDate And Time"
                          width="180">
                           <template slot-scope="scope">
                                <span>{{scope.row.date}} {{scope.row.time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                          prop="day"
                          label="Day"
                          width="180">
                        </el-table-column>
                        <el-table-column
                         prop="program"
                          label="Program">
                        </el-table-column>
                        <el-table-column
                         prop="centre"
                          label="Centre">
                        </el-table-column>
                        <el-table-column
                         prop="totalSeat"
                          label="Total No of Seats">
                        </el-table-column>
                        <el-table-column
                         prop="userSeat"
                          label="No of Seats Available">
                        </el-table-column>
                      </el-table>
                       <el-pagination
                          background
                          layout="pager"
                          :total="total"
                          page-size="8"
                           @current-change="current_change"
                          >
                      </el-pagination>
            </div>
        </div>
    </div>>
    
   `
export default  {
    template: template,

    data(){
        return {
            tableData:[],
            centerid:this.$route.query.centerid,
            active:false,
            currentPage:1,
            pagesize:8,
            total:'',
            activeName: 'second',
            list:[1,2,3,4,5,6],
            num:0
        }
    },
    mounted() {

    },

    created() {
        this.getDetail();
    },

    computed: {},

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        current_change: function (currentPage) {
            this.currentPage = currentPage;
        },
        getDetail(){          
            if(this.centerid !=-1) {
                this.centerid =0;
            }
            let url = "/hq/getClassSchedule/" + this.$route.params.id+"/"+this.centerid;
            server.get(url).then(res => {
                this.tableData = res.data.data;
                this.total = res.data.data.length;
            });
        }
    },
    watch: {}
}