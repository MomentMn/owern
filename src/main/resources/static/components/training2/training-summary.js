let template=`
<div class="training-summary">
	<div class="clearfix">
		<el-select v-model="year" style="width:120px;" v-on:change="handleChangeYear">
			<el-option v-for="(item,index) in yearList" :key="index" :label="item" :value="item"></el-option>
		</el-select>
		<el-button class="right" type="success" v-on:click="exportSummary" :disabled="!summary || summary.length < 1">导出详细报告</el-button>
	</div>
	<div v-loading="loading">
		<el-table :data="summary" border>
			<el-table-column type="index" width="65" align="center" :resizable="false"></el-table-column>
			<el-table-column prop="name" label="员工" align="center" :resizable="false" :resizable="false"></el-table-column>
			<el-table-column prop="planHour" label="计划总训练时长" align="center" :resizable="false"></el-table-column>
			<el-table-column prop="completeHour" label="完成训练时长" align="center" :resizable="false"></el-table-column>
			<el-table-column width="90" prop="fee" label="课程费用" align="center" :resizable="false"></el-table-column>
			<el-table-column width="90" prop="grant" label="政府补贴" align="center" :resizable="false"></el-table-column>
			<el-table-column width="90" prop="payroll" label="工资补贴" align="center" :resizable="false"></el-table-column>
		</el-table>
	</div>
<div>
`;

export default {
	template:template,
	data:function(){
		return{
			loading:false,
			year:'',
			yearList:[],
            summary:[]
		}
	},
	mounted(){
		this.fetchYear();
	},
	methods:{
		fetchYear(){
            this.loading = true;
            server.get("/api/training/year").then(res => {
                this.yearList = res.data.data;
                if(this.yearList && this.yearList.length > 0){
                    this.year = this.yearList[0];
                    this.fetchSummary();
                }
                this.loading = false;
            }).catch( err =>{
                this.loading = false;
            });
		},
		fetchSummary(){
			this.loading = true;
			server.get("/api/training/summary",{
				params:{
					year:this.year,
				}
			}).then( res => {
				let data = res.data.data;
				if(data){
                    data.forEach(item => item.name = item.name.replace('&', ' '));
				}
				this.summary = data;
                this.loading = false;
			}).catch(err => {
				this.loading = false;
			})
		},
        handleChangeYear(val){
			this.fetchSummary();
		},
        exportSummary(){
        	if(this.year){
                var downloadElement = document.createElement('a');
                document.body.appendChild(downloadElement);
                downloadElement.href=baseURL + "/api/development/export/excel/summary?year="+this.year;
                downloadElement.click();
                document.body.removeChild(downloadElement);
			}
		}
	}
}