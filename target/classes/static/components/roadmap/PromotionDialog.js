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
          <img src="/staffdevelop/asset/images/promotion.png" style="width: 100%;height: 100%">
              <div class="current-level">{{currentLevel}}</div>
              <div class="divwh divwh-zero" @click="save('Pinnacle Leader')"></div>
              <div class="divwh divwh-first" @click="save('Senior Lead Teacher')"></div>
              <div class="divwh divwh-second" @click="save('Senior Centre Leader')" ></div>
              <div class="divwh divwh-third" @click="save('Lead Teacher')"></div>
              <div class="divwh divwh-fourth" @click="save('Centre Leader')"></div>
              <div class="divwh divwh-fiveth" @click="save('Senior Pre-school Teacher')"></div>
              <div class="divwh divwh-sixth" @click="save('Senior Educarer')"></div>
              <div class="divwh divwh-seventh" @click="save('Pre-school Teacher')"></div>
              <div class="divwh divwh-eighth" @click="save('Educarer 2')"></div>
              <div class="divwh divwh-ninth" @click="save('Beginning Pre-school Teacher')"></div>
              <div class="divwh divwh-tenth" @click="save('Educarer 1')"></div>
              <div class="divwh divwh-eleventh" @click="save('Beginning Educarer')"></div>
              <div class="divwh divwh-twelfth" @click="save('Infant/Toddler Educarer')"></div>          
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
           this.$confirm("Are you sure ?","",{
                cancelButtonText:"no",
                confirmButtonText:"yes"
              }).then(() => {
                   let url='/api/development/promotion?teacherId='+this.$props.teacherId+"&promotion="+promotion;
                   try {
                       server.get(url).then(res =>{
                             // res.data.data
                           this.currentLevel = res&&res.data&&res.data.data;
                            this.$message.success(res.data.msg);
                           }).catch(res =>{
                               this.$message.error(res.response && res.response.data && res.response.data.msg ||"fail");
                           });

                   } catch (err) {
                       this.$message.error(err.msg);
                   }
               }).catch(() => {

               });


        }
    }
}
