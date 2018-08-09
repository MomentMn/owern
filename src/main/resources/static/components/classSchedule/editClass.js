//vue 组件
let template =
    `
    <div class="add_class">
        <div class="choose_center"  >
                <div class="choose_title">Class Schedule</div>
                <div class="center_li">All</div>
                <div class="center_li" v-for="ctr in centreList">{{ctr.name}}</div>
         </div>
         <div class="center_detail">
                 <div class="detail_head">
                    <button class="redbtn" @click="$router.go(-1)">Back</button>  
                 </div>
                 <div class="form_info">
                    <div>
                        <span style="margin-left:43px">Course:</span>
                        <el-select v-model="formData.course" @change="changeCourse(formData.course)" value-key="id">
                            <el-option v-for="cur in courseList"  :label="cur.name" :value="cur" :key="cur.id">{{cur.name}}<el-option>
                        </el-select>
                        <span style="margin-left:200px">Course Level:</span>
                        <el-select v-model="formData.courseLevel" value-key="id">
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
                            <el-radio v-if="formData.payType==0" :label="0">By Period</el-radio>
                            <el-radio v-if="formData.payType==1" :label="1">By Lesson</el-radio>
                            <el-radio v-if="formData.payType==2" :label="2">By Term</el-radio>
                            <el-radio v-if="formData.payType==3" :label="3">By Month</el-radio>
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
                          v-bind:disabled="true"
                          :placeholder="holder">
                        </el-date-picker>
                        <span style="margin-left:-50px" v-if="showtodata">
                            <span>To:</span>
                            <el-date-picker
                             v-model="formData.dateTo"
                            type="date"
                            value-format="yyyy-MM-dd"
                            v-bind:disabled="true"
                            :placeholder="holder">
                            </el-date-picker>
                        </span>
                       
                    </div>
                    <div class="clearfix" style="margin-left:20px">
                        <span >Class time:</span>
                        <div style="display:inline-block;vertical-align:top" >
                            <div v-for="(x,x_index) in formData.classStart" :key="x_index">
                                <el-select v-model="x.reapeat" @change="getReapeat(x_index,x)"  v-bind:disabled="true" >
                                    <el-option value="--">--</el-option>
                                    <el-option v-for="t in weekList" :label="t.name" :value="t.id" v-if="t.id != -1">{{t.name}}</el-option>
                                </el-select>
                                <el-select class="select_time" style="width:60px" v-model="x.sthour" placeholder='' v-bind:disabled="true">
                                    <el-option v-for="h in hour" :value="h">{{h}}<el-option>
                                </el-select>:
                                <el-select class="select_time" style="width:60px" v-model="x.stminu" placeholder='' v-bind:disabled="true">
                                    <el-option v-for="m in minu" :value="m">{{m}}<el-option>
                                </el-select> To:
                                <el-select class="select_time" style="width:60px" v-model="x.endhour" placeholder='' v-bind:disabled="true">
                                    <el-option v-for="h in hour" :value="h">{{h}}<el-option>
                                </el-select>:
                                <el-select class="select_time" style="width:60px" v-model="x.endminu" placeholder='' v-bind:disabled="true">
                                    <el-option v-for="m in minu" :value="m">{{m}}<el-option>
                                </el-select>
                            </div>
                        </div>
                        <br>
                        <div style="margin-left:106px">
                            <el-select placeholder="Add Time"  @change="addTimeSelect"  v-bind:disabled="true">
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
                        <el-select style="margin-right:200px" v-model="formData.room" @change="changecap(formData.room)" value-key="id" >
                            <el-option v-for="room in roomList" :label="room.name" :value="room" :key="room.id">{{room.name}}</el-option>
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
                    <button class="submit_btn" @click="saveClass()">Save</button>
                 </div>
         </div>   
    </div>>
    
   `
export default {
    template: template,
    data() {
        return {
            holder: 'Selection date',
            showtodata: true,
            tuiName: 'Period',
            centreList: [],
            courseList: [],
            courseLevels: [],
            teacherList: [],
            classid:'',
            week: {
                id: '-1',
                name: 'Add Time'
            },
            centerid: '',
            radio2: '',
            timeClock: false,
            courseid: '',
            roomList: [],
            classStartList: [],
            roomcap: '',
            hour: [9, 10, 11, 12, 13, 14, 15],
            minu: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
            formData: {
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
                    reapeat: 0,
                    starTime: '',
                    sthour: '9',
                    stminu: '0',
                    endTime: "",
                    endhour: "9",
                    endminu: "0",
                    name: ''
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
            list: [
                {
                    time: 'Monday',
                }
            ],
            weekList: [
                {
                    id: -1,
                    name: 'Add Time',
                },
                {
                    id: 0,
                    name: 'Monday',
                },
                {
                    id: 1,
                    name: 'Tuesday',
                },
                {
                    id: 2,
                    name: 'Wednesday',
                },
                {
                    id: 3,
                    name: 'Thursday',
                },
                {
                    id: 4,
                    name: 'Friday',
                },
                {
                    id: 5,
                    name: 'Saturday',
                },
                {
                    id: 6,
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
        this.centerid = this.$route.params.centerid;
        this.classid = this.$route.params.classid;
        this.getCentre();
        this.getCourse(this.centerid);
        this.getCourseInfo();
        this.getTime(this.centerid);
        this.getRoom();
        this.getLevel();
        this.getEditInfo();
    },

    computed: {},

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        changeDate(date) {
            var date = new Date(date);//如果date为10位不需要乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;

        },
        //添加时间下拉列表
        addTimeSelect(t) {
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

                this.formData.classStart.push(obj);
            }
        }, 
        getEditInfo(){
            let url = "/hq/class/edit/"+this.classid+"/"+this.centerid;
            server.get(url).then(res => {
                let data = res.data.data
                this.formData.className = data.className;
                this.formData.payType = data.payType;
                this.formData.capaCity = data.capaCity;
                this.formData.tuitionStandard = data.tuitionStandard;
                this.formData.course = data.course;
                this.formData.room = data.room;
                this.formData.courseLevel = data.courseLevel;
                this.formData.classStart = data.classStart;
                this.formData.teacher = data.teacher;
                this.formData.asistantTeacher = data.asistantTeacher;
                for (let i = 0; i < this.formData.classStart.length; i++) {
                    this.formData.classStart[i].sthour = this.formData.classStart[i].starTime.substring(0,2);
                    this.formData.classStart[i].endhour = this.formData.classStart[i].endTime.substring(0,2);
                    this.formData.classStart[i].stminu = this.formData.classStart[i].starTime.substring(3, 5);
                    this.formData.classStart[i].endminu = this.formData.classStart[i].endTime.substring(3, 5);
                }
                this.formData.dateFrom = this.changeDate(data.dateFrom).substring(0,10);
                this.formData.dateTo = this.changeDate(data.dateTo).substring(0, 10);
                if(data.payType!=0) {
                    this.showtodata =false;
                }
            })
        },
        getReapeat(x_index, t) {
            if (t.reapeat == '--') {
                this.formData.classStart.splice(x_index, 1)
            }
        },
        datepending() {
            if (this.formData.datePending == true) {
                this.holder = "undetermined";
            } else {
                this.holder = "Selection date";
            }
        },
        changeShowDate() {
            if (this.formData.payType != 0) {
                this.showtodata = false;
            } else {
                this.showtodata = true;
                this.tuiName = 'Period'
            };
            if (this.formData.payType == 1) {
                this.tuiName = 'Lesson'
            } else if (this.formData.payType == 2) {
                this.tuiName = 'Term'
            } else if (this.formData.payType == 3) {
                this.tuiName = 'Month'
            }
        },
        changeCourse(info) {
            var id = info.id;
            this.courseid = id;
        },
        //获取centre
        getCentre() {
            let url = "/hq/getCenters";
            server.get(url).then(res => {
                let data = res.data.data
                this.centreList = data;
            })
        },
        changecap(data) {
            this.roomcap = data.capacity;
        },
        //get course info
        getCourse(id) {
            let url = "/hq/course/get/" + this.centerid;
            server.get(url).then(res => {
                let data = res.data.data;
                this.courseList = data;
            });
        },

        getTime(id) {
            let url = "/hq/class/time/" + this.centerid;
            server.get(url).then(res => {
            });
        },
        //get course info
        getRoom(id) {
            let url = "/hq/class/room/" + this.centerid;
            server.get(url).then(res => {
                this.roomList = res.data.data;
                if (this.roomList.length>0){
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
        getLevel() {
            // let url = "http://localhost:9050/hq/class/course/level/" + this.courseid;
            // server.get(url).then(res => {
                
            // })

        },
        getCourseInfo(id) {
            let url = "/hq/course/info/" + this.centerid + "/" + this.$route.params.courseid;
            server.get(url).then(res => {
                let data = res.data.data;
                if (data.courseLevels == null) {
                    data.courseLevels = [];
                }
                this.courseLevels = data.courseLevels;
                this.teacherList = data.teacher;
            })
        },
        ChangeCourseInfo(id) {
            let url = "/hq/course/info/" + this.centerid + "/" + this.courseid;
            server.get(url).then(res => {
                let data = res.data.data;
                if (data.courseLevels == null) {
                    data.courseLevels = [];
                }
                this.courseLevels = data.courseLevels;
                this.formData.courseLevel = data.courseLevels[0];
                this.formData.teacher = data.teacher[0];
                this.formData.asistantTeacher = data.teacher[0];
                this.teacherList = data.teacher;
            })
        },
        saveClass() {
            for (let i = 0; i < this.formData.classStart.length; i++) {
                this.formData.classStart[i].starTime = this.formData.classStart[i].sthour + ':' + this.formData.classStart[i].stminu;
                this.formData.classStart[i].endTime = this.formData.classStart[i].endhour + ':' + this.formData.classStart[i].endminu;
            }
            console.log(this.formData.dateFrom - this.formData.dateTo)
            // if () {
            //     this.$message({
            //         type: 'error',
            //         message: "开始时间必须大于结束时间"
            //     });
            //     this.modifystatus();
            //     return false
            // };
            console.log(this.formData)
            let url = "/hq/class/edit/save/" + this.classid;
            server.post(url, this.formData).then(res => {
                // this.modifystatus();
                if (res.data.data == 'success') {
                    this.$message({
                        type: 'success',
                        message: "Add successfully"
                    })
                    this.$router.push('/classSchedule')
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.data
                    })
                }

            })
        },
    },
    watch: {
        courseid: function () {
            this.ChangeCourseInfo();
            this.getRoom();
        },
        centerid:function(){
            this.getRoom()
        }
    }
}