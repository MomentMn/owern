//vue 组件
let  template=
    `
    <div class="add_class">
        <div class="choose_center"  >
                <div class="choose_title">Class Schedule</div>
                <div class="center_li" @click="changeCentre(-1)">All</div>
                <div class="center_li" v-for="ctr in centreList" @click="changeCentre(ctr.id)">{{ctr.name}}</div>
         </div>
         <div class="center_detail">
                 <div class="detail_head">
                    <button class="redbtn" @click="$router.go(-1)">Back</button>  
                    <span>Add Class</span>  
                 </div>
                 <div class="form_info">
                    <div>
                        <span style="margin-left:43px">Course:</span>
                        <el-select v-model="formData.course" @change="changeCourse(formData.course)" value-key="id">
                            <el-option v-for="cur in courseList"  :label="cur.name" :value="cur" :key="cur.id">{{cur.name}}<el-option>
                        </el-select>
                        <span style="margin-left:200px">Course Level:</span>
                        <el-select v-model="formData.courseLevel"  value-key="id">
                            <el-option v-for="lev in courseLevels" :label="lev.name" :value="lev" :key="lev.id">{{lev.name}}</option>
                        </el-select>
                    </div>
                    <div>
                        <span class="red_name">*Class Name:</span>
                        <el-input v-model="formData.className" style="width:250px"></el-input>
                    </div>
                    <div>
                        <span style="margin-left:-20px">Payment Mode:</span>
                        <el-radio-group v-model="formData.payType" @change="changeShowDate()">
                            <el-radio :label="0">By Period</el-radio>
                            <el-radio :label="1">By Lesson</el-radio>
                            <el-radio :label="2">By Term</el-radio>
                            <el-radio :label="3">By Month</el-radio>
                        </el-radio-group>
                        <span>(Can not be modified after saving, please choose carefully)</span>
                    </div>
                    <div>
                        <span class="red_name">*Tuition Unit:</span>
                        <el-input style="width:100px" v-model="formData.tuitionStandard"></el-input>
                        <span>SGD/{{tuiName}}</span>
                    </div>
                    <div class="chose_date">
                        <span class="red_name" style="margin-left:14px">*Start Date:</span>
                        <el-date-picker
                          v-model="formData.dateFrom"
                          type="date"
                          value-format="yyyy-MM-dd"
                          v-bind:disabled="formData.datePending"
                          :placeholder="holder">
                        </el-date-picker>
                        <span style="margin-left:-50px" v-if="showtodata">
                            <span>To:</span>
                            <el-date-picker
                             v-model="formData.dateTo"
                            type="date"
                            value-format="yyyy-MM-dd"
                            v-bind:disabled="formData.datePending"
                            :placeholder="holder">
                            </el-date-picker>
                        </span>
                        <label><input  v-model="formData.datePending" type="checkbox" v-model="timeClock" @change="datepending">Date pending</label>
                    </div>
                    <div class="clearfix" style="margin-left:20px">
                        <span >Class time:</span>
                        <div style="display:inline-block;vertical-align:top" >
                            <div v-for="(x,x_index) in formData.classStart" :key="x_index">
                                <el-select v-model="x.reapeat" @change="getReapeat(x_index,x)"  >
                                    <el-option value="--">--</el-option>
                                    <el-option v-for="t in weekList" :label="t.name" :value="t.id" v-if="t.id != -1">{{t.name}}</el-option>
                                </el-select>
                                <el-select class="select_time" style="width:60px" v-model="x.sthour" placeholder=''>
                                    <el-option v-for="h in hour" :value="h">{{h}}<el-option>
                                </el-select>:
                                <el-select class="select_time" style="width:60px" v-model="x.stminu" placeholder=''>
                                    <el-option v-for="m in minu" :value="m">{{m}}<el-option>
                                </el-select> To:
                                <el-select class="select_time" style="width:60px" v-model="x.endhour" placeholder=''>
                                    <el-option v-for="h in hour" :value="h">{{h}}<el-option>
                                </el-select>:
                                <el-select class="select_time" style="width:60px" v-model="x.endminu" placeholder=''>
                                    <el-option v-for="m in minu" :value="m">{{m}}<el-option>
                                </el-select>
                            </div>
                        </div>
                        <br>
                        <div style="margin-left:106px">
                            <el-select placeholder="Add Time"  @change="addTimeSelect">
                                <el-option v-for="t in weekList" :value="t.id" :label="t.name">{{t.name}}</el-option>
                            </el-select>
                        </div>
                    </div>
                    <div v-if="showtodata" style="margin-left:38px">
                        <span>Lessons:</span>
                        <span>0</span>
                    </div>
                    <div style="margin-left:52px">
                        <span>Room:</span>
                        <el-select style="margin-right:200px" v-model="formData.room" @change="changecap(formData.room)" value-key="id">
                            <el-option v-for="room in roomList" :label="room.name" :value="room" :key="room.id"></el-option>
                        </el-select>
                        <span>Room capacity:</span>
                        <span>{{roomcap}}</span>
                    </div>
                    <div style="margin-left:33px">
                        <span>Capacity:</span>
                        <el-input style="width:250px" v-model="formData.capaCity"></el-input>
                    </div>
                    <div style="margin-left:38px">
                        <span>Teacher:</span>
                        <el-select v-model="formData.teacher" value-key="id">
                            <el-option v-for="tea in teacherList" :label="tea.name" :value="tea" :key="tea.id">{{tea.name}}</el-option>
                        </el-select>
                        <span style="margin-left:200px">Assistant:</span>
                        <el-select v-model="formData.asistantTeacher" value-key="id">
                            <el-option v-for="tea in teacherList" :label="tea.name" :value="tea" :key="tea.id">{{tea.name}}</el-option>
                        </el-select>
                    </div>
                 </div>
                 <div class="form_submit clearfix">
                    <button class="submit_btn" @click="saveClass()">保存</button>
                 </div>
         </div>   
    </div>>
    
   `
export default  {
    template: template,
    data() {
        return {
            holder:'Selection date',
            showtodata:true,
            tuiName:'Period',
            centreList:[],
            courseList:[],
            courseLevels:[],
            teacherList:[],
            week:{
                id:'-1',
                name: 'Add Time'
            },
            centerid:'',
            radio2:'',
            timeClock:false,
            courseid:'',
            roomList:[],
            classStartList:[],
            roomcap:'',
            hour:[9,10,11,12,13,14,15],
            minu:[0,5,10,15,20,25,30,35,40,45,50,55],
            formData:{
                course: {
                    id: '',
                    name: ""
                },
                courseLevel: {
                    id: '',
                    name: ""
                },
                className: "",
                payType: 0,
                tuitionStandard: '',
                dateFrom: "",
                dateTo: "",
                datePending: false,
                classStart: [{
                    reapeat:0,
                    starTime:'',
                    sthour:'9',
                    stminu:'0',
                    endTime: "",
                    endhour: "9",
                    endminu: "0",
                    name:''
                }],
                totalLesson: 10,
                room: {
                    id: '',
                    name: ""
                },
                capaCity: '',
                teacher: {
                    id: '',
                    name: ""
                },
                asistantTeacher: {
                    id: '',
                    name: ""
                }
            },
            list:[
                {
                    time:'Monday',
                }
            ],
            weekList:[
                {
                    id: -1,
                    name: 'Add Time',
                },
                {
                    id:0,
                    name: 'Monday',
                },
                {
                    id:1,
                    name: 'Tuesday',
                },
                {
                    id:2,
                    name: 'Wednesday',
                },
                {
                    id:3,
                    name: 'Thursday',
                },
                {
                    id:4,
                    name: 'Friday',
                },
                {
                    id:5,
                    name: 'Saturday',
                },
                {
                    id:6,
                    name: 'Sunday',
                },
            ],
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: 'Today',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: 'Yesterday',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: 'A week ago',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            value1: '',
            value2: '',
        };
    },
    mounted() {

    },

    created() {
        this.centerid = this.$route.params.id;  
        this.courseid = this.$route.params.courseid;  
        this.getCentre();                  
        this.getCourse(this.centerid);
        this.getTime(this.centerid);
        this.getCourseInfo(this.courseid);        
        this.getRoom();
        this.getLevel()
    },

    computed: {},

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //添加时间下拉列表
        addTimeSelect(t) {
            console.log(t)
            if (t != -1) {
                var obj = {
                    reapeat: t,
                    starTime: '',
                    sthour: '9',
                    stminu: '0',
                    endTime: "",
                    endhour: "9",
                    endminu: "0",
                    name: ''
                };
                console.log(obj)
                this.formData.classStart.push(obj);
            }
        },
        getReapeat(x_index, t) {
            if (t.reapeat == '--') {
                this.formData.classStart.splice(x_index, 1)
            }
        },
        datepending(){
            if (this.formData.datePending == true) {
                this.holder = "undetermined";
            } else {
                this.holder = "Selection date";
            }
        },
        changeShowDate(){
            if(this.formData.payType !=0) {
                this.showtodata = false;
            } else {
                this.showtodata = true;
                this.tuiName = 'Period'
            };
            if (this.formData.payType ==1) {
                this.tuiName = 'Lesson'
            } else if (this.formData.payType ==2) {
                this.tuiName = 'Term'
            } else if (this.formData.payType == 3) {
                this.tuiName = 'Month'
            }
        },
        
        changeCourse(info){
            var id = info.id;
            this.courseid = id;
            // console.log(this.courseid)
        },
        //获取centre
        getCentre() {
            let url = "/hq/getCenters";
            server.get(url).then(res => {
                let data = res.data.data
                this.centreList = data;
            })
        },
        changecap(data){
            this.roomcap = data.capacity;
        },
        //get course info
        getCourse(id) {
            let url = "/hq/course/get/" + this.centerid;
            server.get(url).then(res => {
                let data = res.data.data;
                this.courseList = data;              
                this.formData.course = this.courseList[0];
                // this.courseid = this.formData.course.id;
            });
        },
        getTime(id) {
            let url = "/hq/class/time/" + this.centerid;
            server.get(url).then(res => {
            //    console.log(res.data.data)
            });
        },
        //get course info
        getRoom(id) {
            let url = "/hq/class/room/" + this.centerid;
            server.get(url).then(res => {
                this.roomList = res.data.data;
                if (this.roomList.length>0){
                    this.formData.room = this.roomList[0];
                    this.roomcap = this.roomList[0].capacity;
                }
            });
        },
        changeCentre(id) {
            this.centerid = id;
            this.getCourse(id);
            // this.getTeacher(id);
            // this.num = 0;
        },
        getLevel(){
            let url = "/hq/class/course/level/" + this.courseid;
            server.get(url).then(res => {
              console.log(res.data.data)
            })

        },
        getCourseInfo(id) {
            let url = "/hq/course/info/" + this.centerid + "/" + this.courseid;
            server.get(url).then(res => {
                let data = res.data.data;
                if (data.courseLevels == null) {
                    data.courseLevels = [];
                }
                if (data.teacher == null) {
                    data.teacher = [];
                }
                this.courseLevels = data.courseLevels;
                this.formData.courseLevel = data.courseLevels[0];
                this.formData.teacher = data.teacher[0];
                this.formData.asistantTeacher =data.teacher[0];
                this.teacherList = data.teacher;
            })
        },
        saveClass() {

            // if (this.formData.asistantTeacher != undefined  && this.formData.teacher != undefined) {
            //     if (this.formData.asistantTeacher.id == this.formData.teacher.id) {
            //         this.$message({
            //             type: 'error',
            //             message: "助教与教师不能相同"
            //         });
            //         this.modifystatus();
            //         return false;
            //     } 
            // }
            for (let i = 0; i < this.formData.classStart.length; i++) {
                this.formData.classStart[i].starTime = this.formData.classStart[i].sthour + ':' + this.formData.classStart[i].stminu;
                this.formData.classStart[i].endTime = this.formData.classStart[i].endhour + ':' + this.formData.classStart[i].endminu;
                var t1 = this.formData.classStart[i].starTime;
                var t2 = this.formData.classStart[i].endTime;
                var c1 = Date.parse('2008-08-08 ' + t1); //'2008-08-08'这个日期随便给的
                var c2 = Date.parse('2008-08-08 ' + t2);
                if (c1 > c2) {
                    this.$message({
                        type: 'error',
                        message: "The start time must be greater than the end time"
                    });
                    return false;
                } 
            }
            if (this.formData.dateFrom != '' && this.formData.dateTo != 0) {
                if (this.formData.dateFrom > this.formData.dateTo) {
                    this.$message({
                        type: 'error',
                        message: "The start time must be greater than the end time"
                    });
                    return false
                };  
            }
            let url = "/hq/class/add/" + this.centerid+"/"+this.courseid+"/"+this.centerid;
            server.post(url,this.formData).then(res => {
                if (res.data.data == 'success') {
                    this.$message({
                        type: 'success',
                        message: "Add successfully"
                    })
                    this.$router.push('/classSchedule')
                } else {
                    this.$message({
                        type:'error',
                        message:res.data.data
                    })
                }
                
            })
        },
    },
    watch: {
        courseid:function(){
            // console.log(this.courseid)
            this.getCourseInfo();
            this.getLevel()
        }
    }
}