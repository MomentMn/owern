//vue 组件
let template =
    `
    <div class="class_schedule">
        <div class="choose_center">
            <div class="choose_title">Class Schedule</div>
            <div class="center_li" @click="changeCentre(-1)">All</div>
            <div v-for="ctr in centreList" class="center_li" @click="changeCentre(ctr.id)">{{ctr.name}}</div>
        </div> 
        <div style="padding:10px 20px;float:left;width:80%;">
            <span style="font-size:20px;color:#fd9933;font-weight:600">UploadSchedule</span>
            <button style="float:right" class="green_button"><a style="color:#fff" href="http://dev.taidii.cn:8111/importCenterClassTemplet.xlsx" download="template.xlsx">Download template</a></button>
            <button style="float:right;background-color:#d9534f;margin-right:10px" class="green_button" @click="$router.go(-1)">Back</button>
            <div style="border:1px solid #ccc;padding:10px;width:90%;margin-top:20px;position:relative;min-height:100px">
                <div class="clearfix">
                    <span style="float:left;color:#d9534f;margin-top:15px;margin-right:20px">*File:</span>
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            style="border:1px solid #ccc;width:300px;padding:10px;float:left;"
                            :action="action"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList3"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">Choose File</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Upload</el-button>
                    </el-upload>
                </div>
            </div>
        </div>
        
    </div>
    
   `
export default {
    template: template,

    data() {
        return {
            centreList:[],
            centerid: this.$route.params.id,
            courseid: this.$route.params.courseid,
            fileList3: []
        }
    },
    mounted() {

    },

    created() {
        this.action = "/hq/import/excel/upload/" + this.centerid + "/" + this.courseid;
        this.getCentre()
    },

    computed: {},

    methods: {
        //getcentre
        getCentre() {
            let url = "/hq/getCenters";
            server.get(url).then(res => {
                let data = res.data.data;
                this.centreList = data;
                if (this.centreList.length != 0) {
                    this.courseid = this.centreList[0].id;
                }
            })
        },
        //changecentre
        changeCentre(id) {
            this.centerid = id;
            console.log(this.centerid)
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    },
    watch: {}
}