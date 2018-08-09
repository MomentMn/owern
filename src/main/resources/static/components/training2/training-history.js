let template = `
<div class="teacher-training-history">
    <div class="clearfix">
        <el-select v-model="year" style="width:180px;" class="left" v-on:change="handleYearChange">
            <el-option v-for="item in yearList" :key="item" :label="item" :value="item">
            </el-option>
        </el-select>
        <el-button type="success" class="right" v-on:click="back">返回</el-button>
    </div>
    <div class="teacher-info clearfix">
        <div class="partrait left">
            <img v-if="data.pic" :src="data.pic" style="width:100%;height:100%"/>
        </div>
        <div class="info left">
            <div>{{ data.name }}</div>
            <div>出生日期: {{ data.birth }}</div>
            <div>职位: {{ data.designation }}</div>
            <div>级别: {{ data.classes }}</div>
        </div>
    </div>
    <div class="clearfix"><el-button type="success" class="right" style="margin-bottom: 20px" v-on:click="exportHistory">导出</el-button></div>
    <el-table :data="data.history" :border="true" v-loading="uploadLoading" element-loading-text="正在上传">
        <el-table-column 
            type="index" 
            align="center">
        </el-table-column>
        <el-table-column 
            label="课程" 
            prop="name"
            align="center" >
        </el-table-column>
        <el-table-column 
            label="培训机构" 
            prop="awardingOrganization"
            align="center">
        </el-table-column>
        <el-table-column 
            label="开始日期" 
            prop="startTime"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column 
            label="证书/反思"
            align="center">
            <template slot-scope="scope">
                <a v-if="scope.row.attachment" :href="scope.row.attachment" class="attachment">附件</a>
               <el-upload
               class="attachment"
               :action="uploadUrl"
               :data="{userCourseId:scope.row.id,index:scope.$index}"
               :show-file-list="false"
               :on-success="uploadSuccess"
               :before-upload="beforeUpload"
               :on-error="uploadError">
                    <span style="position: relative;top:3px;display:inline-block;">
                       <svg style="width:16px;height:16px;transform:rotate(306deg);" viewBox="0 0 24 24">
                            <path fill="#7084C6" d="M16,6H13V7.9H16C18.26,7.9 20.1,9.73 20.1,12A4.1,4.1 0 0,1 16,16.1H13V18H16A6,6 0 0,0 22,12C22,8.68 19.31,6 16,6M3.9,12C3.9,9.73 5.74,7.9 8,7.9H11V6H8A6,6 0 0,0 2,12A6,6 0 0,0 8,18H11V16.1H8C5.74,16.1 3.9,14.26 3.9,12M8,13H16V11H8V13Z" />
                       </svg>
                    </span>
               </el-upload>
            </template>
        </el-table-column>
        <el-table-column 
            label="培训时长" 
            prop="trainingHours"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column 
            label="费用" 
            prop="courseFee"
            align="center"
            width="120">
        </el-table-column>
        <el-table-column 
            label="政府补贴" 
            prop="grant"
            align="center"
            width="120">
        </el-table-column>
        <el-table-column 
            label="工资补贴" 
            prop="absenteePayroll"
            align="center"
            width="120">
        </el-table-column>
    </el-table>
</div>

`;

export default {
    template:template,
    data:function(){
        return{
            uploadUrl:baseURL + '/api/training/attachment/upload',
            uploadLoading:false,
            year:'',
            yearList:[],
            data:{},
        }
    },
    mounted(){
        this.fetchYear();
    },
    methods:{
        fetchYear() {
            this.loading = true;
            server.get("/api/training/year", {}).then(res => {
                this.yearList = res.data.data;
                if (this.yearList && this.yearList.length > 0) {
                    this.year = this.yearList[0];
                    this.fetchHistory();
                }
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },
        fetchHistory(){
            let userId = this.$route.query.id;
            server.get("/api/training/history",{
                params:{
                    userId:userId,
                    year:this.year
                }
            }).then(res => {
                this.data = res.data.data;
            }).catch( err => {})
        },
        handleYearChange(val){
            this.fetchHistory();
        },
        exportHistory(){
            let userId = this.$route.query.id;
            if(!userId || !this.year){
                return;
            }
            var downloadElement = document.createElement('a');
            document.body.appendChild(downloadElement);
            downloadElement.href=baseURL + "/api/development/export/excel/summary/user?year="+this.year+"&userId="+userId;
            console.log(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
        },
        back(){
            this.$router.push({name:"training"})
        },
        uploadSuccess(res, file, fileList){
            this.uploadLoading = false;
            let url = res.data.url;
            let index = res.data.index;
            this.data.history[index].attachment = url;
            this.$message.success("上传成功");
        },
        uploadError(err, file, fileList){
            this.uploadLoading = false;
            this.$message.error("上传错误");
        },
        beforeUpload(file){
            if(file.size > 20971520) {
                this.$message.error("附件最大20M");
                return false;
            }
            else
                this.uploadLoading = true;
        }
    }
}