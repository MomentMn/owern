//vue 组件
let  template=
    `
	<div class="creatProduct" style="background: #f9f9f9;">
		<div class="creatProduct_choose_center" style="height: 800px;background-color: #F2F4f6;">
       		<div class="choose_title">Finance</div>
            <div class="creatProduct_center_li" style="background-color: #E7E6E3;">Settings</div>
        </div>
		<div style="height: 100px;display:table-cell;vertical-align:middle;">
			<span style="color: #FFA144;font-size: 40px;padding-left: 25px;">Create Product Bundle</span>
		</div>
		<div style="margin-left: 350px;margin-top:40px">
			<el-form :model="form" :rules="rules" ref="form">
				<div v-for="(domain, index) in domains" :key="domain.key">
					<el-form-item v-model= 'domain.productFamilyId' :prop="'domain.' + index + '.productFamilyId'" class="product_name_label" label="Product Family" :label-width="formLabelWidth">
						<el-select v-model= 'domain.productFamilyId' @change="changeCourse(index,domains[index].productFamilyId)" clearable placeholder="All">
							<el-option v-for="(item,index) in Courses" :disabled="item.disabled"  :key="index" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
		        	</el-form-item>
		        	<el-form-item v-model= 'domain.productId' :prop="'domain.' + index + '.productId'" class="product_name_label" label="Product" :label-width="formLabelWidth">
		            	<el-select v-model= 'domain.productId' multiple placeholder="All" style="width: 400px;">
							<el-option v-for="newItem in options[domain.productFamilyId]" :key="newItem.id" :label="newItem.name" :value="newItem.id">
							</el-option>
						</el-select> 
		        	</el-form-item>
				</div>  
		        <el-form-item class="product_name_it" prop="chargingItem" label="Charging Item" :label-width="formLabelWidth">
		            <input v-model="form.chargingItem"  type='text' style="width: 381px;height: 35px;padding-left: 15px;border-radius: 3.9px;border: 1px solid GAINSBORO;"></input>    
		        </el-form-item>
		        <el-form-item label="Item Code" :label-width="formLabelWidth">
		            <input v-model="form.itemCode"  type='text' style="width: 381px;height: 35px;padding-left: 15px;border-radius: 3.9px;border: 1px solid GAINSBORO;"></input>    
		        </el-form-item>
		        <el-form-item  class="product_name_it" prop="amountBefore" style="display:inline-block" label="Amount Before GST" :label-width="formLabelWidth">
		            <input v-model="form.amountBefore" @keyup="changeGSTBefore()" type='text' style="width: 381px;height: 35px;padding-left: 15px;border-radius: 3.9px;border: 1px solid GAINSBORO;"></input>    
		        </el-form-item>
		        <label >
		            <input v-model="apply" @change="changeGSTBefore()" style="width:13px;height:13px" type='checkbox'>Apply GST for This Item
		        </label>
		        <el-form-item  class="product_name_it" prop="amountAfter"label="Amount After GST" :label-width="formLabelWidth">
		            <input v-model="form.amountAfter" @keyup="changeGSTAfter()" type='text' style="width: 381px;height: 35px;padding-left: 15px;border-radius: 3.9px;border: 1px solid GAINSBORO;"></input>    
		        </el-form-item>
		        <el-form-item label="Remarks" style="display:inline-block" :label-width="formLabelWidth">
		            <input v-model="form.remarks" type='text' style="width: 381px;height: 35px;padding-left: 15px;border-radius: 3.9px;border: 1px solid GAINSBORO;"></input>    
		        </el-form-item>
		        <el-button type="text" @click="addDomain">Add another Product</el-button>
	      	</el-form>
			<div slot="footer" class="product-dialog-footer" style="margin-left: 735px">
				<el-button type="primary" @click="saveProduct('form')">Create</el-button>
				<el-button class="redbtn" @click="$router.push('/finance')">Cancel</el-button>
			</div> 
		</div>
	</div>
    
   `
export default  {
    template: template,

    data(){
        return {
        	form:{
        		chargingItem:'',	
        		itemCode:'',
                amountBefore:'',
                amountAfter:'',
                remarks:'',
        	},
        	domains: [{
            	productId:[],
            	productFamilyId:'',
            	productFamilyName:'',
            }],
            Courses:[],
            formLabelWidth: '300px',
            dynamicCourses:[],
            options: [],
            oldOptions:[],
            value5: '',
            value4: '',
            id:'',
            enableGSTValue:'',
            amountAfter:'',
            apply:false,
            amountBefore:'',
            rules:{
            	chargingItem: [{required:true,message: "The charge item cannot be empty",trigger: 'blur'}],
                amountBefore:[{required:true,message: "Amount Before can not be empty",trigger: 'blur'}],
                amountAfter:[{required:true,message: "Amount After can not be empty",tigger: 'blur' }],
            }
        }
    },
    mounted() {
    	this.Courses=this.getCourseList();
    	this.getFinanceSet();
    },

    created() {
    },

    computed: {},

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        selectAll(val) {
        },
        addDomain() {
            this.domains.push({
            	product:[],
            	productFamily: '',
            	key: Date.now()
            });
            
         },
         /*查询hq创建的课程*/
         async getCourseList(){
         	let url = '/hq/course/get/-1';
             server.get(url).then(res=>{
                 let data = res.data.data;
                 this.Courses=data;
             }).catch(res => {
            	 this.$message({
                     type:'error',
                     center: true,
                     message:res.data.data
                 })
             });
         },
         /*查询课程等级*/
         async getCourseItemList(courseId){
         	 let url = '/hq/class/course/level/'+courseId;
             server.get(url).then(res=>{
                 let data = res.data.data;
                 this.Courses=data;
             }).catch(res => {
            	 this.$message({
                     type:'error',
                     center: true,
                     message:res.data.data
                 })
             });
         },
         /*课程更改等级随之改变*/
         async changeCourse(index,id){
             let CourseItem = this.domains[index];
             CourseItem.productId = [];
             this.$set(this.options, CourseItem.productFamilyId, {});
             let url = '/hq/class/course/level/'+id;
             server.get(url).then(res=>{
                 let data= res.data.data;
                 this.$set(this.options, id, data);
             }).catch(res => {
            	 this.$message({
                     type:'error',
                     center: true,
                     message:res.data.data
                 })
             });
             this.getFim();
         },
         /*提交表单*/
         async saveProduct(form){
        	 this.$refs[form].validate(async valid =>{
                 if(valid){
                	 let url = '/hq/saveProductBundle';
                     let data={
                    	id:0,
                    	chargingItem:this.form.chargingItem,
                        itemCode:this.form.itemCode,
                        amountBefore:this.form.amountBefore,
                        amountAfter:this.form.amountAfter,
                        remarks:this.form.remarks,
                        courseLevelDtos:this.getid(),
                     };
                     server.post(url,data).then(res=>{
                    	 this.$message({
                             message: '创建成功',
                             center: true,
                             type: 'success'
                           });
                 		this.$router.push('/finance');
                     }).catch(res => {
                    	 this.$message({
 	                        type:'error',
 	                        center: true,
 	                        message:res.data.data
 	                    })
                     });
                 }
             });
        
         },
         
         getid(){
             let x = [];
             for (let i =0;i<this.domains.length;i++) {
                 let obj = {};
                 obj.courseId=this.domains[i].productFamilyId;
                 obj.courseName=this.domains[i].productFamilyName;
                 let lev = [];
                 for(let j=0;j<this.domains[i].productId.length;j++){
                	 let pro = {};
                	 pro.id = this.domains[i].productId[j];
                	 pro.name = this.domains[i].productId[j].value;
                	 lev.push(pro);
                 }
                 obj.levelDtos=lev;
                 x.push(obj);
             }
             console.log(x);
             return x;
         },
         getFinanceSet(){
          	let url = '/hq/getFinanceSet';
          	server.get(url).then(res=>{
          		let data=res.data.data;
          		this.enableGST=data.gstEnabled;
              	this.enableGSTValue=data.gst;
              }).catch(res => {
            	  this.$message({
                      type:'error',
                      center: true,
                      message:res.data.data
                  })
              });
          },
          changeGSTBefore(){
         	 if(this.apply==true&&this.enableGST==true){
         		 this.form.amountAfter = ((100+this.enableGSTValue)*this.form.amountBefore)/100;
             	 this.form.amountAfter = this.form.amountAfter.toFixed(2);
         	 }else{
         		 this.form.amountAfter = this.form.amountBefore;
         	 }
          },
          changeGSTAfter(){
         	 if(this.apply==true&&this.enableGST==true){
         		 this.form.amountBefore = (100*this.form.amountAfter)/(100+this.enableGSTValue);
             	 this.form.amountBefore = this.form.amountBefore .toFixed(2);
         	 }else{
         		 this.form.amountBefore = this.form.amountAfter;
         	 }
          },
          getFim(){
        	  let objs=[];
        	  	for(let i =0;i<this.Courses.length;i++){
        	  		let obj={};
            	    obj.id=this.Courses[i].id;
            	    obj.name=this.Courses[i].name;
            	    for(let j=0;j<this.domains.length;j++){
            		   if(obj.id==this.domains[j].productFamilyId){
            			   obj.disabled = true;
            		   }
                	}
            	   objs.push(obj);
                }
        	  	this.Courses=objs;
        	}
    },
    watch: {}
}