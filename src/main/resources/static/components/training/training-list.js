import DetailDialog from "/staffdevelop/components/training/course-detail-dialog.js";
import AttendanceDialog from "/staffdevelop/components/training/course-attendance-dialog.js";
let template=`
<div class="training-list">
	<div class="clearfix">
		<el-select v-model="year" style="width:120px;" v-on:change="handleChangeYear">
			<el-option v-for="(item,index) in yearList" :key="index" :label="item" :value="item"></el-option>
		</el-select>
		<span style="color:#83ca5d;font-size:16px;">Total Cost: $ {{totalCost}}</span>
		<el-button class="right" type="success" v-on:click="exportSummary" :disabled="!courses || courses.length < 1">Export Summary</el-button>
		<el-button 
			style="margin-right:25px;width:125px;" 
			class="right" type="success" 
			icon="el-icon-plus"
			v-on:click="openDetailDialog">
			Add
		</el-button>
	</div>
	<div>
		<el-table :data="courses" border v-loading="loading">
			<el-table-column type="index" width="65" align="center" :resizable="false"></el-table-column>
			<el-table-column label="Course" align="center" :resizable="false">
				<template slot-scope="scope">
					<span style="color:#6094C4;text-decoration:underline;cursor: pointer;" v-on:click="openAttendanceDialog(scope.row)">{{ scope.row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="awardingOrganization" label="Awarding Organization" align="center" :resizable="false"></el-table-column>
			<el-table-column prop="startTime" label="Course Start" align="center" :resizable="false"></el-table-column>
			<el-table-column prop="trainingHours"  width="80" label="Training Hours" align="center" :resizable="false"></el-table-column>
			<el-table-column label="Staffs Attending" align="center" :resizable="false">
				<template slot-scope="scope">
					<span v-for="(item,index) in scope.row.members" 
						  :key="item.id"
                          style="color:#FFAE46;cursor:pointer"
                          v-on:click="handleClickMember(item.id)"
                          :title="item.name.replace('&',' ')">
						{{ item.name.split('&')[0] }}
						<span v-if="index != scope.row.members.length-1">,</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column width="90" prop="courseFee" label="Course Fee" align="center" :resizable="false"></el-table-column>
			<el-table-column width="90" prop="grant" label="Grant" align="center" :resizable="false"></el-table-column>
			<el-table-column width="90" prop="absenteePayroll" label="Absentee Payroll" align="center" :resizable="false"></el-table-column>
		</el-table>
	</div>
    <detail-dialog v-model="detailVisible" :type="courseDialogType" v-on:success="operationSuccess"></detail-dialog>
    <attendance-dialog v-model="attendanceVisible" :course="confirmCourse" v-on:success="operationSuccess"></attendance-dialog>
</div>
`;

export default {
	template:template,
	components:{
        detailDialog:DetailDialog,
        attendanceDialog:AttendanceDialog,
	},
	mounted(){
		this.getYear();
	},
	data:function(){
		return{
			year:'',
			yearList:[],
			totalCost:0,
			loading:false,
            detailVisible:false,
            attendanceVisible:false,
			courses:[],
			courseDialogType:2,
            confirmCourse:{},
		}
	},
	methods:{
		openDetailDialog:function(){
			this.detailVisible = true;
        },
        openAttendanceDialog:function(course){
			this.confirmCourse = Object.assign({},course);
            this.attendanceVisible = true;
        },
        handleClickMember(id){
            this.$router.push({name:"TrainingHistory",query:{id:id}});
        },
		getYear(){
        	this.loading = true;
  			server.get("/api/training/year",{}).then(res => {
  				this.yearList = res.data.data;
  				if(this.yearList && this.yearList.length > 0){
  					this.year = this.yearList[0];
  					this.getCourse();
				}
  				this.loading = false;
			}).catch( err =>{
				this.loading = false;
			});
		},
		getCourse(){
			this.loading = true;
			server.get("/api/training/list",{
				params:{
					year:this.year,
				}
			}).then(res => {
				this.courses = res.data.data;
				if(this.courses){
					this.totalCost = this.courses.reduce((sum,item) => sum+item.courseFee,0);
				}else{
					this.totalCost = 0;
				}
				
				this.loading = false;
			}).catch(err => {
				this.loading = false;
			});
		},
		handleChangeYear(){
			this.getCourse();
		},
        operationSuccess(){
			this.getCourse();
		},
        exportSummary(){
        	if(this.year){
                var downloadElement = document.createElement('a');
                document.body.appendChild(downloadElement);
                downloadElement.href=baseURL + "api/development/export/excel/course/list?year="+this.year;
                downloadElement.click();
                document.body.removeChild(downloadElement);
			}
		}
	}
}