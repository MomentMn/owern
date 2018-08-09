//vue 组件
let  template=
    `
  <div class="editProduct" style="background: #f9f9f9;">
    <div class="editProduct_choose_center" style="height: 800px;background-color: #F2F4f6;">
           <div class="choose_title">Finance</div>
            <div class="editProduct_center_li" style="background-color: #E7E6E3;">Settings</div>
        </div>
    <div style="height: 100px;display:table-cell;vertical-align:middle;">
      <span style="color: #FFA144;font-size: 40px;padding-left: 25px;">Edit Product Bundle</span>
    </div>
    <div style="margin-left: 350px;margin-top:40px">
      <el-form :model="form" :rules="rules" ref="form">
        <div v-for="(domain, index) in domains" :key="index" v-if="index!=0">
          <el-form-item v-model= 'domain.productFamily' :prop="'domain.' + index + '.productFamily'" class="product_name_label" label="Product Family" :label-width="formLabelWidth">
            <el-select v-model= 'domain.productFamily' @change="changeCourse(index,domains[index].productFamily.id)" clearable placeholder="All" value-key="name">
              <el-option v-for="(item,index) in Courses" :disabled="item.disabled" :key="item.id" :label="item.name" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
			<el-form-item v-model= 'domain.productId' :prop="'domain.' + index + '.productId'" class="product_name_label" label="Product" :label-width="formLabelWidth">
    		<el-select v-model= 'domain.productId' multiple placeholder="All" style="width: 400px;">
				<el-option v-for="newItem in options[domain.productFamily.id]" :key="newItem.id" :label="newItem.name" :value="newItem.id">
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
			<label>
			 <input v-model="apply" @change="changeGSTBefore()" style="width:13px;height:13px" type='checkbox'>Apply GST for This Item
		    </label>
		    <el-form-item  class="product_name_it" prop="amountAfter" label="Amount After GST" :label-width="formLabelWidth">
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
	              productFamily:{},
	            }],
	            Courses:'',
	            formLabelWidth: '300px',
	            options: [],
	            pid:this.$route.params.pid,
	            enableGST:'',
	            enableGSTValue:'',
	            rules:{
	            	chargingItem: [{required:true,message: "The charge item can not be empty",trigger: 'blur'}],
	                amountBefore:[{required:true,message: "Amount Before can not be empty",trigger: 'blur'}],
	                amountAfter:[{required:true,message: "Amount After can not be empty",trigger: 'blur'}],
	            },
	            apply:false,
	        }
	    },
	    mounted() {
	        this.Courses=this.getCourseList();
	        this.getOneProduct();
	        this.getFinanceSet();
	      },
	   
	      created() {
	      },
	   
	      computed: {},
	   
	      methods: {
	          handleClick(tab, event) {
	              console.log(tab, event);
	          },
	          addDomain() {
	              this.domains.push({
	                productId:[],
	                productFamily: {},
	              });
	              this.getFim();
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
	           /*课程更改等级随之改变*/
	           changeCourse(index,id){
	               this.$set(this.options, id, {});
//	               console.log(this.options[id]);
	               let url = '/hq/class/course/level/'+id;
	               server.get(url).then(res=>{
	                   let data= res.data.data;
	                   this.domains[index].productId = [];
	                   //this.$set(this.options, id, data);
	                   this.options[id] = data;
	                   console.log(this.options);
	               }).catch(res => {
	            	   this.$message({
	                        type:'error',
	                        center: true,
	                        message:res.data.data
	                    })
	               });
	               this.getFim();
	           },
	           /*课程更改等级随之改变*/
	           getCourse(index,id){
	        	   this.options[this.domains[index].productFamily]='';
	               this.$set(this.options, id, {});
	               let url = '/hq/class/course/level/'+id;
	               server.get(url).then(res=>{
	                   let data= res.data.data;
	                   //this.domains[index].productId = [];
	                   this.$set(this.options, id, data);
	                   this.options[this.domains[index]] = data;
	               }).catch(res => {
	            	   this.$message({
	                        type:'error',
	                        center: true,
	                        message:res.data.data
	                    })
	               });
	           },
	           /*提交表单*/
	           async saveProduct(form){
	        	   
	             this.$refs[form].validate(async valid =>{
	               if(valid){
	                   let url = '/hq/updateProductBundle';
	                     let data={
	                      id:this.pid,
	                      chargingItem:this.form.chargingItem,
	                        itemCode:this.form.itemCode,
	                        amountBefore:this.form.amountBefore,
	                        amountAfter:this.form.amountAfter,
	                        remarks:this.form.remarks,
	                        courseLevelDtos:this.getid(),
	                     };
	                     server.put(url,data).then(res=>{
	                       this.$message({
	                               message: '修改成功',
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
	           /*查询单个套餐产品*/
	           async getOneProduct(){
	             let url = '/hq/getProductBundle/'+this.pid;
	               server.get(url).then(res=>{
	                let data=res.data.data;
	                this.form.chargingItem=data.chargingItem;
	                this.form.itemCode=data.itemCode;
	                this.form.amountBefore=data.amountBefore;
	                this.form.amountAfter=data.amountAfter;
	                this.form.remarks=data.remarks;
	                
	                for(let i=0;i<data.courseLevelDtos.length;i++){
	                	this.getCourse(i,data.courseLevelDtos[i].courseId);
	                	let y = [];
	                	let x = {};
	                    for(let j=0;j<data.courseLevelDtos[i].levelDtos.length;j++){
	                    	y.push(data.courseLevelDtos[i].levelDtos[j].id);
	                    }
	                    x.id=data.courseLevelDtos[i].courseId;
	                    x.name=data.courseLevelDtos[i].courseName;
		                this.domains.push({productFamily:x,productId:y});
		            }
	               }).catch(res => {
	            	   this.$message({
	                        type:'error',
	                        center: true,
	                        message:res.data.data
	                    })
	               });
	               this.getFim();
	           },
	           getid(){
	               let x = [];
	               for (let i =0;i<this.domains.length;i++) {
	                   let obj = {};
	                   obj.courseId=this.domains[i].productFamily.id;
	                   obj.courseName=this.domains[i].productFamily.name;
	                   let lev = [];
	                   for(let j=0;j<this.domains[i].productId.length;j++){
	                     let pro = {};
	                     pro.id = this.domains[i].productId[j];
	                     pro.name = '';
	                     lev.push(pro);
	                   }
	                   obj.levelDtos=lev;
	                   x.push(obj);
	               }
	               return x;
	           },
	           async getFinanceSet(){
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
	                		   if(obj.id==this.domains[j].productFamily.id){
	                			   
	                			   obj.disabled = true;
	                		   }
		                	}
	                	   objs.push(obj);
		                }
		        	  	this.Courses=objs;
		        	}
	        },
	        watch: {
	        	
	        }
	    }