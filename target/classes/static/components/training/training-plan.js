import DetailDialog from "/staffdevelop/components/training/course-detail-dialog.js";
let template=`
<div class="training-plan">
	<div class="clearfix">
		<el-select v-model="year" style="width:120px;" v-on:change="handleChangeYear">
			<el-option v-for="(item,index) in yearList" :key="index" :label="item" :value="item"></el-option>
		</el-select>
		<el-button style="width:125px;" class="right" type="success" icon="el-icon-plus" v-on:click="openDetailDialog">Add</el-button>
	</div>
	<div>
		<el-table :data="courses" border v-loading="loading">
			<el-table-column type="index" width="65" align="center" :resizable="false"></el-table-column>
			<el-table-column label="Course" align="center" :resizable="false">
				<template slot-scope="scope">
					<span style="color:#6094C4;text-decoration:underline;cursor: pointer;"
					v-on:click="modifyCourse(scope.row)">
					    {{ scope.row.name }}
					</span>
				</template>
			</el-table-column>
			<el-table-column prop="awardingOrganization" label="Awarding Organization" align="center" :resizable="false"></el-table-column>
			<el-table-column prop="startTime" label="Course Start" align="center" :resizable="false"></el-table-column>
			<el-table-column prop="trainingHours"  width="80" label="Training Hours" align="center" :resizable="false"></el-table-column>
			<el-table-column label="Staffs Attending" align="center" :resizable="false">
				<template slot-scope="scope">
					<span v-for="(item,index) in scope.row.members" 
						  :key="item.id"
						  style="color:#FFAE46;"
						  :title="item.name.replace('&',' ')">
						{{ item.name.split('&')[0] }}
						<span v-if="index != scope.row.members.length-1">,</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column width="90" prop="courseFee" label="Course Fee" align="center" :resizable="false"></el-table-column>
		</el-table>
	</div>
	<detail-dialog v-model="modifyCourseVisible" :course="selectCourse" :type="1" v-on:success="courseOperationSuccess"></detail-dialog>
	<detail-dialog v-model="newCourseVisible" :type="0" v-on:success="courseOperationSuccess"></detail-dialog>
</div>
`;

export default {
	template:template,
	components:{
        detailDialog:DetailDialog,
	},
	data:function(){
		return{
			year:'',
			yearList:[],
            modifyCourseVisible:false,
            newCourseVisible:false,
			loading:false,
			courses:[],
            selectCourse:{},
            courseDialogType:0,
            tmpCourse:{
                name:'',
                awardingOrganization:'',
                startTime:'',
                trainingHours:'',
                courseFee:'',
                members:[],
                dutyLevelSkillId:'',
                dutyLevelSkillCode:''
            },
		}
	},
	mounted(){
		this.getYear();
	},
	methods:{
        openDetailDialog(){
            this.courseDialogType = 0;
            this.selectCourse = this.tmpCourse;
            this.newCourseVisible = true;
        },
        modifyCourse(course){
            this.courseDialogType = 1;
            this.selectCourse = course;
            this.modifyCourseVisible = true;
        },
        getYear(){
            this.loading = true;
            server.get("/api/training/year",{}).then(res => {
                this.yearList = res.data.data;
                if(this.yearList && this.yearList.length > 0){
                    this.year = this.yearList[0];
                    this.getCourse(this.year);
                }else{
                    this.year = '';
                    this.getCourse(new Date().getYear())
                }
                this.loading = false;
            }).catch( err =>{
                this.loading = false;
            });
        },
        getCourse(year){
            this.loading = true;
            server.get("/api/training/plan/list",{
                params:{
                    year:year,
                }
            }).then(res => {
                this.courses = res.data.data;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },
        handleChangeYear(val){
            this.getCourse(val);
        },
        courseOperationSuccess(){
            this.getYear();
        }
	}
}