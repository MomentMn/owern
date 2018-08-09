//vue 组件
let  template=
    `
    <div class="class_schedule">
       <div class="choose_center"  >
            <div class="choose_title">Class Schedule</div>
            <div class="center_li" @click="changeCentre(-1)">All</div>
            <div v-for="ctr in centreList" class="center_li" @click="changeCentre(ctr.id)">{{ctr.name}}</div>
        </div>
        
        <div class="center_detail">
            <div>
                <el-select v-model="selectYear" >
                    <el-option label="All" value="">All</el-option>
                    <el-option v-for="year in yearList" :label="year" :value="year">{{year}}</el-option>
                </el-select>
                <el-select v-model="selectStatus">
                    <el-option label="All" value="">All</el-option>
                    <el-option label="Started" :value="0">Started</el-option>
                    <el-option label="No Start" :value="1">No Start</el-option>
                </el-select>
                <el-select v-model="selectWeek">
                    <el-option label="All" value="">All</el-option>
                    <el-option label="Monday" value="0">Monday</el-option>
                    <el-option label="Tuesday" value="1">Tuesday</el-option>
                    <el-option label="Wednesday" value="2">Wednesday</el-option>
                    <el-option label="Thursday" value="3">Thursday</el-option>
                    <el-option label="Friday" value="4">Friday</el-option>
                    <el-option label="Saturday" value="5">Saturday</el-option>
                    <el-option label="Sunday" value="6">Sunday</el-option>
                </el-select>
                <i class="el-icon-search"></i>
                <el-input class="search_class" placeholder="Search Class" v-model="searchInfo">
                
                </el-input>
                <div style="float:right">
                    <button @click="addCourse" class="green_button">Add Course</button>
                    <button @click="getEditCourse(courseid)" class="green_button">Edit Course</button>
                    <button class="delete_course green_button" @click="deleteCourse(courseid)">Delete Course</button>
                </div>
            </div>
            
            <div class="">
                <ul class="clearfix course_list" style="padding:0">
                    <li v-for="(course,index) in courseList" @click="num=index" :class="{'tab_active':index==num}" @click="changeCourse(course.id)">{{course.name}}</li>
                </ul>
            </div>
            
            <div class="class_list">
                <button class="green_button" style="float:right;margin-bottom:10px" @click="$router.push('/addClass/'+centerid+'/'+courseid)">Add Class</button>
                <button v-if="centerid!=-1" class="green_button" style="float:right;margin-bottom:10px;margin-right:10px" @click="$router.push('/UploadSchedule/'+centerid+'/'+courseid)">Upload Schedule</button>
                      <el-table
                        :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                        border
                        fit
                        style="width: 100%">
                        <el-table-column
                        prop=""
                          label="Class Name"
                          width="180">
                            <template slot-scope="scope">
                                <span style="color:#3399ff;cursor:pointer" @click="$router.push({path:'/studentList/'+scope.row.id,query:{name:scope.row.name,price:scope.row.price,centreid:centerid,start:scope.row.startClass,listDtos:JSON.stringify(scope.row.listDtos)}})">{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                          prop="studentNumber"
                          label="Student Number"
                          width="180">
                        </el-table-column>
                        <el-table-column
                         prop="teacher"
                          label="Teacher">
                        </el-table-column>
                        <el-table-column
                         prop="startClass"
                          label="Start Class">
                        </el-table-column>
                        <el-table-column
                         prop="listDtos"
                          label="Class Time">
                          <template slot-scope="scope">
                                <div v-for="t in scope.row.listDtos">
                                    <span>{{t.repeat.substring(0,3)}}</span> <span>{{t.startTime.substring(0,5)}}</span>-<span>{{t.endTime.substring(0,5)}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                         prop="room"
                          label="Room">
                        </el-table-column>
                        <el-table-column
                         prop="price"
                          label="Tuition">
                        </el-table-column>
                        <el-table-column
                       
                          label="Action">
                             <template slot-scope="scope" > 
                             <span  class="action_temp" @click="$router.push('/editClass/'+courseid+'/'+centerid+'/'+scope.row.id)"> Edit</span>
                               /
                             <span @click="deleteClass(scope.row.id)" class="action_temp">Delete</span>
                             <span v-if="centerid==-1" @click="showCenter(scope.row.id)"  class="action_temp"> / View</span>
                             </template>
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
        
            <el-dialog title="Add Course" :visible.sync="dialogFormVisible">
                  <el-form :model="addform" :rules="rules" ref="addform">
                    <el-form-item class="class_name_label" label="Course Name:" :label-width="formLabelWidth" prop="courseName">
                      <input type='text' v-model="addform.courseName" auto-complete="off"></input>
                    </el-form-item>
                    <el-form-item label="Course Level:" :label-width="formLabelWidth" >
                        <el-select class="select_style" v-model="coursele"  multiple filterable allow-create>
                            
                        </el-select>    
                    </el-form-item>
                    <el-form-item label="Teacher:" :label-width="formLabelWidth">
                        <el-select class="select_style select_style_teacher"  v-model="addform.teacher" multiple filterable allow-create value-key="id">
                            <el-option v-for="tea in teacherList" :key="tea.id"  :label="tea.name" :value="tea" >{{tea.name}}<el-option>
                        </el-select>    
                    </el-form-item>
                    <el-form-item style="display:inline-block" label="Capacity:" :label-width="formLabelWidth">
                        <input style="width:100px" type='text' v-model="addform.capcity"></input>    
                    </el-form-item>
                    <label >
                        <input style="width:13px;height:13px" type='checkbox'  v-model="addform.apply">Apply to all
                    </label>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitAdd('addform')" class="green_button">Save</el-button>
                    <el-button class="redbtn green_button" @click="dialogFormVisible = false">Cancel</el-button>
                  </div>
            </el-dialog>
            
            <el-dialog title="Add Course" :visible.sync="dialogisAll">
                  <el-form :model="addAllform" :rules="rules" ref="addAllform">
                    <el-form-item class="class_name_label" label="Course Name:" :label-width="formLabelWidth" prop="courseName">
                      <input type='text' v-model="addAllform.courseName" auto-complete="off"></input>
                    </el-form-item>
                    <el-form-item label="Course Levels:" :label-width="formLabelWidth" >
                        <el-select class="select_style" v-model="allCoursele"  multiple filterable allow-create>
                            
                        </el-select>     
                    </el-form-item>
                    <el-form-item style="display:inline-block" label="Apply to:" :label-width="formLabelWidth">
                       <el-select class="select_style select_style_teacher"  name="addteacher" v-model="addAllform.applyTo" multiple filterable allow-create default-first-option value-key="id">
                            <el-option v-for="ctr in centreList" :key="ctr.id"  :label="ctr.name" :value="ctr" >{{ctr.name}}<el-option>
                        </el-select>    
                    </el-form-item>
                    <button type="button" @click="selectAllCenter" style="width:100px !important;height:30px !important;background-color:none;float:right;margin-right:20px" >Select All</button>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitAllCourse('addAllform')" class="green_button">Save</el-button>
                    <el-button class="redbtn" @click="dialogisAll = false" class="redbtn green_button ">Cancel</el-button>
                  </div>
            </el-dialog>

            <el-dialog
                title="Already used mechanism"
                :visible.sync="showCenterInfo"
                width="30%"
                :before-close="handleClose">
                <div v-for="info in showCenterList">{{info.name}}</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showCenterInfo = false">Cancel</el-button>
                    <el-button type="primary" @click="showCenterInfo = false">Sure</el-button>
                </span>
            </el-dialog>

            <el-dialog title="Edit Course" :visible.sync="dialogFormVisible_edit">
                  <el-form :model="editform" :rules="rules" ref="editform">
                    <el-form-item class="class_name_label" label="Course Name:" :label-width="formLabelWidth" prop="courseName">
                      <input type='text' v-model="editform.courseName" auto-complete="off"></input>
                    </el-form-item>
                    <el-form-item label="Course Level:" :label-width="formLabelWidth">
                        <el-select class="select_style"   multiple filterable  allow-create v-model="editform.courseLevels" value-key="id">
                            <el-option v-for="(lev,index) in editCoursele" :key="lev.id" :value="lev"  :label="lev.name"  >{{lev.name}}<el-option>
                        </el-select>    
                    </el-form-item>
                    <el-form-item label="Teacher:" :label-width="formLabelWidth" v-if="centerid!=-1"> 
                        <el-select class="select_style select_style_teacher"  type='text' multiple  allow-create v-model="editform.teacher" value-key="id">
                            <el-option v-for="(tea,index) in teacherList"  :label="tea.name" :value="tea" :key="tea.id">{{tea.name}}<el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item style="display:inline-block" label="Capacity:" :label-width="formLabelWidth" v-if="centerid!=-1">
                        <el-input class="edit_cap" style="width:100px" type='text' v-model="editform.capcity"></el-input>    
                    </el-form-item>
                    <label v-if="centerid!=-1">
                        <input style="width:13px;height:13px" type='checkbox' v-model="editapply">Apply to all
                    </label>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitEditCourse('editform')" class="green_button">Save</el-button>
                    <el-button class="redbtn" @click="dialogFormVisible_edit = false" class="redbtn green_button">Cancel</el-button>
                  </div>
            </el-dialog>
    </div>
   `
export default  {
    template: template,
    data(){
        return {
            searchInfo:'',
            selectYear:'',
            selectStatus:'',
            selectWeek:'',
            centreList:[],
            total: '',
            yearList:[],
            showCenterInfo:false,
            pagesize:8,
            currentPage: 1,
            courseList:[],
            editapply:false,
            teacherList:[],
            courseid:'',
            showCenterList:[],
            dialogisAll:false,
            dialogFormVisible:false,
            dialogFormVisible_edit:false,
            centerid:-1,
            coursele:[],
            allCoursele:[],
            editCoursele:[],
            addAllform:{
                courseName: '',
                courseLevels: [],
                applyTo:[],
            },
            addform: {
                courseName: '',
                courseLevels: [],
                teacher:[],
                capcity:'',
                apply:0
            },
            rules:{
                courseName: [
                    { required: true, message: 'Please enter the name of the course', trigger: 'blur' },
                    { min: 0, max: 16, message: 'The length is 0 to 16 characters', trigger: 'blur' }
                ],
            },
            editform: {
                courseName: '',
                courseLevel: [],
                teacher: '',
                mkupLessons: [],
                apply:0
            },
            formLabelWidth: '130px',
            tableData:[],
            active:false,
            activeName: 'second',
            num:0
        }
    },
    mounted() {
    },

    created() { 
        this.getCentre();
        this.getCourse(-1);
        this.getTeacher(-1);
        this.getYear();
    },

    computed: {
        tables:function(){        
            this.currentPage = 1;
            this.total = this.tableData.length;
            return this.tableData
        }
    },
    methods: {
        getYear(){
            let url = "/hq/getyear";
            server.get(url).then(res => {
               this.yearList = res.data.data;
               
            })
        },
        //add centre
        submitAdd(formName){
            //Processing create conditions
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.addform.apply == true) {
                        this.addform.apply = 1;
                    } else {
                        this.addform.apply = 0;
                    };
                    for (let i = 0; i < this.coursele.length; i++) {
                        var obj = {
                            id: null,
                            name: this.coursele[i]
                        }
                        this.addform.courseLevels.push(obj);
                    }
                    let url = "/hq/course/add/" + this.centerid + "/" + this.centerid;
                    server.post(url, this.addform).then(res => {
                        if (res.data.data == 'success') {
                            //Recapture courselist when add course successfully.
                            this.getCourse(this.centerid);
                            this.courseid = this.centreList[0].id;
                            this.num = 0;
                            this.dialogFormVisible = false;
                            //empty
                            this.coursele = [];
                            this.addform = {
                                courseName: '',
                                courseLevels: [],
                                teacher: [],
                                capcity: '',
                                apply: 0
                            }
                        }
                    })
                } else {
                    return false;
                }
            });
            
        },
        selectAllCenter(){
            var list = [];
            for (let x = 0; x < this.centreList.length; x++) {
                var a = this.centreList[x];
                list.push(a);
            }
            this.addAllform.applyTo = list;
        },
        handleClose(done) {
            this.$confirm('Confirm the closure？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        showCenter(id){
            let url = "/hq/class/view/centers/"+id;
            server.get(url).then(res => {
                this.showCenterInfo = true;
                let data = res.data.data;
                this.showCenterList = data;
            })
        },
        submitAllCourse(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {       
                    var list = [];      
                    for (let i = 0; i < this.allCoursele.length; i++) {
                        var obj = {
                            id:null,
                            name: this.allCoursele[i]
                        }
                        list.push(obj)
                    }   
                    this.addAllform.courseLevels = list;
                    let url = "/hq/course/add/-1/0";
                    server.post(url, this.addAllform).then(res => {
                        if (res.data.data == 'success') {
                            //Recapture courselist when add course successfully.
                            this.getCourse(this.centerid);
                            this.courseid = this.centreList[0].id;
                            this.num = 0;
                            this.dialogisAll = false;
                            //empty
                            this.allCoursele = [];
                            this.addAllform = {
                                courseName: '',
                                courseLevels: [],
                                applyTo: [],
                            }
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        submitEditCourse(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.editapply == true) {
                        this.editform.apply = 1;
                    } else {
                        this.editform.apply = 0;
                    };
                    if (this.editform.courseLevels.length >0) {
                        for (let i = 0; i < this.editform.courseLevels.length; i++) {
                            if (typeof (this.editform.courseLevels[i]) != 'object') {
                                this.editform.courseLevels[i] = {
                                    id: null,
                                    name: this.editform.courseLevels[i]
                                }
                            }
                        }
                    }
                    
                    var list = [];
                    if (this.editform.teacher.length>0) {
                        for (let x = 0; x < this.editform.teacher.length; x++) {
                            var a = this.editform.teacher[x];
                            list.push(a);
                        }
                    }
                    this.editform.teacher = list;
                    let url = "/hq/course/save/" + this.centerid + "/" + this.courseid + "/" + this.centerid;
                    server.post(url, this.editform).then(res => {
                        if (res.data.data == 'success') {
                            //Recapture courselist when add course successfully.
                            this.getCourse(this.centerid);
                            this.courseid = this.centreList[0].id;
                            this.num = 0;
                            this.dialogFormVisible_edit = false;
                            //empty
                            this.editCoursele = [];
                            this.addform = {
                                courseName: '',
                                courseLevels: [],
                                teacher: [],
                                capcity: '',
                                apply: 0
                            }
                        } else {
                        	this.$message({
                                type: 'error',
                                message: res.data.data
                            });
                            this.dialogFormVisible_edit = false;
                        }
                        
                    })
                } else {
                    return false;
                }
            });
        },
        getEditCourse(id){
            this.dialogFormVisible_edit = true;
            let url = "/hq/course/info/"+this.centerid+"/"+this.courseid;
            server.get(url).then(res => {
                this.editform = res.data.data;
                console.log(res.data.data)
                if (this.editform.courseLevels == null) {
                    this.editform.courseLevels=[];
                };
                this.editCoursele = this.editform.courseLevels;
                if (this.editform.teacher == null) {
                    this.editform.teacher = [];
                }; 
                if (this.editform.apply == 0) {
                    this.editapply = false;
                } else {
                    this.editapply = true;
                };
            })
        },
        deleteClass(classid){
            this.$confirm('Are you sure you want to delete?', 'Prompt', {
                confirmButtonText: 'Sure',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let url = "/hq/class/del/" + classid;
                server.delete(url).then(res => {
                    if (res.data.data == 'delete successed') {
                        this.getCourse(this.centerid);
                        this.courseid = this.centreList[0].id;
                        this.getClassList();
                        this.num = 0;
                        this.$message({
                            type: 'success',
                            message: res.data.data
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.data
                        });
                    }
                })
            }).catch(() => {

            });
           
        },
        deleteCourse(id) {
            this.$confirm('Are you sure you want to delete?', 'Prompt', {
                confirmButtonText: 'Sure',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let url = "/hq/course/del/" + id;
                server.delete(url).then(res => {
                    if (res.data.data == 'success') {
                        this.getCourse(this.centerid);
                        this.courseid = this.centreList[0].id;
                        this.num = 0;
                        this.$message({
                            type: 'success',
                            message: 'Delete success!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.data
                        });
                    }
                });
                
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });
            });
        },
        //getcentre
        getCentre(){
            let url = "/hq/getCenters";
            server.get(url).then(res=>{
                let data = res.data.data;
                this.centreList = data;
                if (this.centreList.length !=0) {
                    this.courseid = this.centreList[0].id;                    
                }
            })
        },
        handleClick(tab, event) {
        },
        changeCourse(id){
            this.courseid = id;
        //    this.getEditCourse(id)
        },
        //changecentre
        changeCentre(id) {
            this.centerid = id;
            this.getCourse(id);
            this.getTeacher(id);
            this.num = 0;            
        },
        //get course info
        getCourse(id){
            let url = "/hq/course/get/" + id;
            server.get(url).then(res => {
                let data = res.data.data;
                this.courseList = data;
                if (this.courseList.length != 0) {
                    this.courseid = this.courseList[0].id; 
                }
            });
        },
        getClassList(){
            var type = 1;
            if(this.centerid!=-1) {
                type=0;
            }
            let url = '/hq/getClassList/'+type+'?year=' + this.selectYear + '&isStart=' + this.selectStatus + '&repeat=' + this.selectWeek + '&courseId=' + this.courseid + '&keyWord=' + this.searchInfo +'&centreId='+this.centerid;
            server.get(url).then(res => {
               this.tableData=res.data.data;
               console.log(this.tableData)
            });
        },
        //get add teacher select
        getTeacher(id){
            let url = "/hq/course/all/teacher/" + id;
            server.get(url).then(res => {
                let teacher = res.data.data;
                this.teacherList = teacher;
            })
        },
        current_change: function (currentPage) {
            this.currentPage = currentPage;
        },
        addCourse(){
            if(this.centerid == -1) {
                this.dialogisAll = true;
            } else {
                this.dialogFormVisible = true;
            }
        }
    },
    watch: {
        courseid:function(){
            this.getClassList();
        },
        searchInfo:function(){
            this.getClassList();
        },
        selectYear: function() {
            this.getClassList();
        },
        selectStatus: function () {
            this.getClassList();
        },
        selectWeek: function () {
            this.getClassList();
        },
        centerid: function () {
            this.getClassList();
        },
    }
}