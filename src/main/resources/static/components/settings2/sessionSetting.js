//vue 组件
let  template=
`
<div style="width:96%;margin-top: 10px;padding:0 2%;height:1000px;">
    <div style="width:100%;height:40px;margin-bottom: 15px;">
       <el-select v-model="year"
                 v-on:change="selectChange"  
                 style="width:100px;float: left">
        <el-option
                v-for="item in years"
                :key="item"
                :label="item"
                :value="item">
        </el-option>
      </el-select>
      <el-button type="success" size="medium" style="float:right;" v-on:click="saveTimeSetting" :disabled="sessionSetting.flag">保存</el-button>
    </div>    
    <div class="seesion-setting-class">
        
        <div style="padding-left: 5%;height: 50px;padding-top: 20px;color:#E6B062">年中</div>
        <div class="seesion-setting-item-class">
            <span>评估开始日期</span>
            <el-date-picker class="date-picker"  
                    :picker-options="startTimeOption1"    
                    :disabled="sessionSetting.flag || sessionSetting.times[index].slag" 
                    :clearable="false" 
                    value-format="yyyy/MM/dd"
                    format="dd/MM/yyyy"
                    v-model="sessionSetting.times[index].startTime" 
                    type="date" 
                    v-on:change="pickChange(index)" placeholder="选择日期">
            </el-date-picker>
        </div>
        <div class="seesion-setting-item-class">
            <span>教师自我评价结束日期</span>
            <el-date-picker class="date-picker" 
                    :picker-options="startTimeOption2" 
                    :disabled="sessionSetting.flag || sessionSetting.times[index].elag" 
                    :clearable="false" 
                    value-format="yyyy/MM/dd" 
                    format="dd/MM/yyyy" 
                    v-model="sessionSetting.times[index].endTime" 
                    type="date" v-on:change="pickChange(index)" 
                    placeholder="选择日期">
             </el-date-picker>
        </div>
        <div class="seesion-setting-item-class">
            <span>评估师的审查结束日期</span>
            <el-date-picker class="date-picker" 
                    :picker-options="startTimeOption3" 
                    :disabled="sessionSetting.flag || sessionSetting.times[index].tlag"
                    :clearable="false" 
                    value-format="yyyy/MM/dd" 
                    format="dd/MM/yyyy" 
                    v-model="sessionSetting.times[index].teacherEndTime" 
                    type="date" 
                    v-on:change="pickChange(index)"  
                    placeholder="选择日期">
            </el-date-picker>
        </div>
       
        <div style="padding-left: 5%;height: 50px;padding-top:45px;color:#E6B062">年末</div>
        <div class="seesion-setting-item-class">
            <span>评估开始日期</span>
            <el-date-picker class="date-picker"  
                :picker-options="startTimeOption4" 
                :disabled="sessionSetting.flag || sessionSetting.times[index1].slag" 
                :clearable="false" 
                value-format="yyyy/MM/dd" 
                format="dd/MM/yyyy" 
                v-model="sessionSetting.times[index1].startTime" 
                type="date" 
                v-on:change="pickChange(index1)" 
                placeholder="选择日期">
            </el-date-picker>
        </div>
        <div class="seesion-setting-item-class">
            <span>教师自我评价结束日期</span>
            <el-date-picker class="date-picker"  
                    :picker-options="startTimeOption5" 
                    :disabled="sessionSetting.flag || sessionSetting.times[index1].elag" 
                    :clearable="false" 
                    value-format="yyyy/MM/dd" 
                    format="dd/MM/yyyy" 
                    v-model="sessionSetting.times[index1].endTime" 
                    type="date" 
                    v-on:change="pickChange(index1)" 
                    placeholder="选择日期">
            </el-date-picker>
        </div>
        <div class="seesion-setting-item-class">
            <span>评估师的审查结束日期</span>
            <el-date-picker class="date-picker"  
                    :picker-options="startTimeOption6" 
                    :disabled="sessionSetting.flag || sessionSetting.times[index1].tlag" 
                    :clearable="false" 
                    value-format="yyyy/MM/dd" 
                    format="dd/MM/yyyy" 
                    v-model="sessionSetting.times[index1].teacherEndTime" 
                    type="date" 
                    v-on:change="pickChange(index1)" 
                    placeholder="选择日期">
            </el-date-picker>
        </div>
    </div>   
</div>

`
export default  {
    template: template,
    // 配置属性
    props: {

    },
    data(){
        return {
            sessionSetting:'',
            years:[],
            year:'',
            index:0,
            index1:1,
            nowYear:'',
            startTimeOption1:{
                disabledDate: (time) => {
                    let t1=new Date(this.sessionSetting.times[this.index].startTime)
                    let t2=new Date(this.sessionSetting.times[this.index].endTime)
                    let t3=new Date(this.sessionSetting.times[this.index].teacherEndTime)
                    let t4=new Date(this.sessionSetting.lastMaxTime)
                    let h1=new Date()
                    if(t2.getTime()){
                        h1=t2.getTime()
                        if(h1>new Date()){
                            return time.getTime() <= new Date() || time.getTime()>=h1
                        }
                    }else if(t3.getTime()){
                        h1=t3.getTime()
                        if(h1>new Date()){
                            return time.getTime() <= new Date() || time.getTime()>=h1
                        }
                    }
                        return time.getTime() <= new Date()
                }
            },
            startTimeOption2:{
                disabledDate: (time) => {
                    let t1=new Date(this.sessionSetting.times[this.index].startTime)
                    let t2=new Date(this.sessionSetting.times[this.index].endTime)
                    let t3=new Date(this.sessionSetting.times[this.index].teacherEndTime)
                    let t4=new Date(this.sessionSetting.lastMaxTime)
                    let h1=new Date()
                    if(t1.getTime()){
                        h1=t1.getTime()<=new Date?new Date():t1.getTime()
                    }
                    if(t3.getTime()){
                        return time.getTime() <=h1 || time.getTime()>t3.getTime()
                    }else{
                        return time.getTime() <= h1
                    }
                }
            },
            startTimeOption3:{
                disabledDate: (time) => {
                    let t1=new Date(this.sessionSetting.times[this.index].startTime)
                    let t2=new Date(this.sessionSetting.times[this.index].endTime)
                    let t3=new Date(this.sessionSetting.times[this.index].teacherEndTime)
                    let t4=new Date(this.sessionSetting.lastMaxTime)
                    let h1=new Date()
                    if(t1.getTime()){
                        h1=t1.getTime()<=new Date?new Date():t1.getTime()
                    }
                    if(t2.getTime()){
                        h1=h1<=t2.getTime()?t2.getTime():h1
                        return time.getTime()<h1
                    }else{
                        return time.getTime()<=h1
                    }
                }
            },
            startTimeOption4:{
                disabledDate: (time) => {
                    let t1=new Date(this.sessionSetting.times[this.index1].startTime)
                    let t2=new Date(this.sessionSetting.times[this.index1].endTime)
                    let t3=new Date(this.sessionSetting.times[this.index1].teacherEndTime)
                    let h1=new Date()
                    if(t2.getTime()){
                        h1=t2.getTime()
                        if(h1>new Date()){
                            return time.getTime() <= new Date() || time.getTime()>=h1
                        }
                    }else if(t3.getTime()){
                        h1=t3.getTime()
                        if(h1>new Date()){
                            return time.getTime() <= new Date() || time.getTime()>=h1
                        }
                    }
                    return time.getTime() <= new Date()
                }
            },
            startTimeOption5:{
                disabledDate: (time) => {
                    let t1=new Date(this.sessionSetting.times[this.index1].startTime)
                    let t2=new Date(this.sessionSetting.times[this.index1].endTime)
                    let t3=new Date(this.sessionSetting.times[this.index1].teacherEndTime)
                    let h1=new Date()
                    if(t1.getTime()){
                        h1=t1.getTime()<=new Date?new Date():t1.getTime()
                    }
                    if(t3.getTime()){
                        return time.getTime() <=h1 || time.getTime()>t3.getTime()
                    }else{
                        return time.getTime() <= h1
                    }
                }
            },
            startTimeOption6:{
                disabledDate: (time) => {
                    let t1=new Date(this.sessionSetting.times[this.index1].startTime)
                    let t2=new Date(this.sessionSetting.times[this.index1].endTime)
                    let t3=new Date(this.sessionSetting.times[this.index1].teacherEndTime)
                    let h1=new Date()
                    if(t1.getTime()){
                        h1=t1.getTime()<=new Date?new Date():t1.getTime()
                    }
                    if(t2.getTime()){
                        h1=h1<=t2.getTime()?t2.getTime():h1
                        return time.getTime()<h1
                    }else{
                        return time.getTime()<=h1
                    }
                }
            }
        }
    },
    mounted(){
        this.createYears();
        this.searchSessionSetting();
    },
    methods:{
        createYears(){
            let date=new Date;
            let year=date.getFullYear();
            this.year=year;
            this.years.push(year-2)
            this.years.push(year-1)
            this.years.push(year)
            this.years.push(year+1)
            this.years.push(year+2)
        },
        searchSessionSetting:function(){
            this.loading = true;
            let url='/api/development/session/time/setting/list/'+this.year;
            server.get(url,{}).then(res => {
                this.loading = false;
                this.sessionSetting=res.data.data
                this.nowYear=res.data.data.nowYear
            }).catch(err =>{
                this.loading = false;
            });
        },
        selectChange(item){
            this.searchSessionSetting()
        },
        pickChange(index){

        },
        checkTime(index){
            console.log("nowYear"+this.nowYear)
            let isTrue=false
            if(this.sessionSetting.flag){
                return true
            }else{
                if(this.sessionSetting && this.sessionSetting.times){
                    if(this.sessionSetting.times[index].startTime>=this.nowYear){
                        isTrue=false;
                    }else{
                        isTrue=true;
                    }
                }
                console.log("isTrue"+isTrue)
                return isTrue
            }
        },
        saveTimeSetting(){
            this.loading = true;
            let url='/api/development/session/time/save/'+this.year;
            server.post(url,this.sessionSetting).then(res => {
                this.$message.success("成功");
                this.searchSessionSetting()
                this.loading = false;
            }).catch(err =>{
                this.$message.error("日期重复");
                this.loading = false;
            });
        }
    }
}
