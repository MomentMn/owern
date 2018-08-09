import  LeaderPage from "/staffdevelop/components/LeaderPage.js"
//vue 组件
let  template=
`
<div class="myleaderpage">
  <div class="content">   
       <leader-page :is-add="isAdd" :levels="tableData" @pick="pickHandler" @add="addHandler"></leader-page> 
  </div>
</div>

`
export default  {
    template: template,
    components: {
        leaderPage:LeaderPage
    },
    data(){
        return {
            isAdd:false,
            tableData: []
        }
    },
    mounted(){
        this.searchStaffLevel();
    },
    // 注册方法
    methods:{
        searchStaffLevel:function(){
            this.loading = true;
            let url='/api/development/staff/level/list/';
            server.get(url,{}).then(res => {
                this.loading = false;
                this.tableData=res.data.data
                // console.log("tableData:"+this.tableData)
            }).catch(err =>{
                this.loading = false;
            });
        },
        pickHandler(id){
            // 跳转
            this.$router.push({name:"development",params:{id:id}});
        },
       addHandler(id){
            alert(id);
        }
    }

}
