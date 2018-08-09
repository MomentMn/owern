//vue 组件
let  template=
`
<el-dialog            
            custom-class="promotion-dialog"
            :visible.sync="$parent.promotionVisiable"
            :show-close="true"           
            :lock-scrol="true"
            :center="true"
            >
        <div class="dialog-wrapper">       
          <img src="/staffdevelop/asset/images/promotion_ch.png" style="width: 100%;height: 100%">
              <div class="current-level">{{currentLevel}}</div>
              <div class="divwh divwh-zero" @click="save('最高领导者')"></div>
              <div class="divwh divwh-first" @click="save('高级领导教师')"></div>
              <div class="divwh divwh-second" @click="save('高级中心领导')" ></div>
              <div class="divwh divwh-third" @click="save('领导教师')"></div>
              <div class="divwh divwh-fourth" @click="save('中心领导')"></div>
              <div class="divwh divwh-fiveth" @click="save('高级学前教师')"></div>
              <div class="divwh divwh-sixth" @click="save('高级保育员')"></div>
              <div class="divwh divwh-seventh" @click="save('学前教师')"></div>
              <div class="divwh divwh-eighth" @click="save('2级保育员')"></div>
              <div class="divwh divwh-ninth" @click="save('初级幼儿教师')"></div>
              <div class="divwh divwh-tenth" @click="save('1级保育员')"></div>
              <div class="divwh divwh-eleventh" @click="save('初级保育员')"></div>
              <div class="divwh divwh-twelfth" @click="save('婴幼儿保育员')"></div>          
         </div>           
        </div>        
    </el-dialog>
   `
export default  {
    template: template,
    props: {
        currentlevel:{
            type:String,
            required:true
        },
        teacherId:{
            type:Number,
            required:true
        }
    },
    data(){
        return {
            currentLevel:this.$props.currentlevel,
            loading:false
        }
    },
    methods:{
        // promotion
        save(promotion) {
           this.$confirm("你确定 ?","",{
                cancelButtonText:"不",
                confirmButtonText:"是"
              }).then(() => {
                   let url='/api/development/promotion?teacherId='+this.$props.teacherId+"&promotion="+promotion;
                   try {
                       server.get(url).then(res =>{
                             // res.data.data
                           this.currentLevel = res&&res.data&&res.data.data;
                            this.$message.success(res.data.msg);
                           }).catch(res =>{
                               this.$message.error(res.response && res.response.data && res.response.data.msg ||"失败");
                           });

                   } catch (err) {
                       this.$message.error(err.msg);
                   }
               }).catch(() => {

               });


        }
    }
}
