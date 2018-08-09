//vue 组件
let  template=
    `
	<div class="home_center">
		<div class="home_staff" style="display:table-cell">
			<div class="staff_img">
				<img src="../../asset/images/staff.png">
				<div class="font_border">
					<h3 class="font-style">Staff</h3>
					<div class="font_bott">
					<span class="">Total number of staff:</span>
					<span style="color:#FF9b39">{{totalStaff}}</span></br>
					<span class="">Attendance rate:</span>
					<span style="color:#FF9b39">{{staffAttendanceRate}}</span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="home_finance" style="display:table-cell">
			<div class="finance_img">
				<img src="../../asset/images/finance.png">
				<div class="font_border">
					<h3 class="font-style">Finance</h3>
					
					<div class="font_bott">
						<span class="">Total Outstanding Amount:$</span>
						<span style="color:#FF9b39">{{outStandingAmount}}</span><br>
						<span class="">Total Outstanding Amount For The Month:$</span>
						<span style="color:#FF9b39">{{outStandingAmountTheMonth}}</span>
					</div>
				</div>
			</div>
			        
		</div>
		
		<div class="home_student" style="display:table-cell">
			<div class="student_img">
				<img src="../../asset/images/student.png">
				<div class="font_border">
					<h3 class="font-style">Student</h3>
					<div class="font_bott">
						<span class="">Total number of students:</span>
						<span style="color:#FF9b39">{{totalStudent}}</span><br>
						<span class="">Attendance rate:</span>
						<span style="color:#FF9b39">{{studentAttendanceRate}}</span><br>
						<span class="">Total number of new enrollment:</span>
						<span style="color:#FF9b39">{{newStudentCount}}</span><br>
						<span class="">Total number of withdrawals:</span>
						<span style="color:#FF9b39">{{leaveStudentCount}}</span>
					</div>
				</div>
			</div>
			        
		</div>
	</div>
    
   `
export default  {
    template: template,

    data(){
        return {
        	staffAttendanceRate:'',
        	totalStaff:'',
        	totalStudent:'',
        	outStandingAmountTheMonth:'',
        	leaveStudentCount:'',
        	outStandingAmount:'',
        	studentAttendanceRate:'',
        	newStudentCount:'',
        }
    },
    mounted() {
    	this.getHomeInfo();
    },

    created() {
    	
    },

    computed: {},

    methods: {
        async getHomeInfo(){
        	let url = '/hq/getHomePageCount';
            server.get(url).then(res=>{
                let data = res.data.data;
                
                this.staffAttendanceRate = data.staffAttendanceRate,
                this.totalStaff = data.totalStaff;
                this.totalStudent = data.totalStudent;
                this.outStandingAmountTheMonth = data.outStandingAmountTheMonth;
                if(data.outStandingAmountTheMonth==null){
                	this.outStandingAmountTheMonth = 0;
                }
                this.leaveStudentCount = data.leaveStudentCount;
                this.outStandingAmount = data.outStandingAmount;
                if(data.outStandingAmount==null){
                	this.outStandingAmount = 0;
                }
                this.studentAttendanceRate = data.studentAttendanceRate;
                this.newStudentCount = data.newStudentCount;
            }).catch(res => {
                this.$message.error(res);
            });
        }
        
        
        
    },
    watch: {}
}