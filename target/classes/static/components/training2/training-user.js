let template = `
<div class="teacher-training-history">
   
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
    <div class="clearfix" style="margin-bottom: 20px;">
        <el-select v-model="year" style="width:180px;" class="left" v-on:change="handleYearChange">
            <el-option v-for="item in yearList" :key="item" :label="item" :value="item">
            </el-option>
        </el-select>
    </div>
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
            label="开始时间"
            prop="startTime"
            align="center"
            width="120">
            <template slot-scope="scope">
                <div v-if="scope.row.status == 1" style="font-size:16px;color:#FFAE46">未开始</div>
                <div v-if="scope.row.status == 2" style="font-size:16px;color:#78C64E">进行中</div>
                {{ scope.row.startTime }}
            </template>
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
    </el-table>
</div>

`;

export default {
    template:template,
    data:function(){
        return{
            uploadUrl:baseURL + '/api/training/attachment/upload',
            year:'',
            yearList:[],
            data:{},
            uploadLoading:false,
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
            server.get("/api/training/course/user",{
                params:{
                    year:this.year
                }
            }).then(res => {
                this.data = res.data.data;
            }).catch( err => {})
        },
        handleYearChange(val){
            this.fetchHistory();
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