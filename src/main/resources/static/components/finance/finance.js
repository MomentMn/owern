//vue 组件
let  template=
    `
    <div class="finance_center">
       <div class="finance_choose_center" style="height: 800px;background-color: #F2F4f6;">
       		<div class="choose_title">Finance</div>
            <div class="finance_center_li" style="background-color: #E7E6E3;">Settings</div>
        </div>
        <div style="height: 800px;width:100%;background-color: #F9F9f9;">
	        <div style="height: 100px;display:table-cell;vertical-align:middle;">
	            <span style="line-height: 120px;color: #FFA144;font-size: 40px;padding-left: 35px;">{{title}}{{settingValue}}</span>
	        </div>
	        <div style="margin-left: 250px">
	        	<el-tabs type="border-card"  @tab-click="handleClick">
				  <el-tab-pane label="Item List">
						<el-table :data="itemData" style="width: 100%;border:1px solid #DEDEDE">
		            		<el-table-column v-if="tableData==null" prop="class" label="Item Description" width="180">
		            			add
		            		</el-table-column>
		            	<el-table-column prop="level" label="Level" width="180">
		            	</el-table-column>
		            	<el-table-column prop="course" label="Program">
		            	</el-table-column>
		            	<el-table-column prop="type" label="Amount">
		            	</el-table-column>
		            	<el-table-column label="Action">
		                	<template slot-scope="scope">
		                 		<span class="el-table-span" @click="updateItemList(scope.row)">编辑</span><div class="shelfLine"></div>
			                </template>
		            	</el-table-column>
		          	</el-table>
				</el-tab-pane>
	
			  	<el-tab-pane label="Product bundle">
			  	<div class="Product_class">
					<el-table :data="tableData" border style="width: 100%">
	            		<el-table-column prop="chargingItem" label="Description" width="180">
	            		</el-table-column>
	            		<el-table-column prop="courseLevelDtos" label="Course" width="180">
	            		</el-table-column>
	            		<el-table-column prop="amountBefore" label="Amount"> 
	            		</el-table-column>
	            		<el-table-column prop="remarks" label="Remarks">
	               		</el-table-column>
	            		<el-table-column prop="amountAfter" label="Discount">
			            </el-table-column>
	            		<el-table-column label="Action"> 
	            			<template slot-scope="scope" > 
	                 			<span class="action_temp">
	                 				<el-button type="text" @click="updateProductBundle(scope.row)">Edit</el-button>
	                 			</span>
	                   			/
	                   			<span class="action_temp">
	                 				<el-button type="text" @click="deleteProductBundle(scope.row)">Delete</el-button>
	                 			</span>
	                 		</template>
	            		</el-table-column>
	          		</el-table>
	          		<div style="margin-top: 0px;width: 99.8%;height: 50px;position:relative;background: rgb(255, 255, 255);border-bottom: 1px solid #DEDEDE;border-left: 1px solid #DEDEDE;border-right: 1px solid #DEDEDE;">
    					<el-button type="text" @click="crProductBundle()" style="position:absolute;top: 28%;padding-left: 10px;font-size: 20px;font-weight: 500;">+ Add</el-button>
					</div>
					</div>
				  </el-tab-pane>
					
				  <el-tab-pane label="HQ Finance Setting" @tab-click="handleClick">
				  		<div class="Setting_class" style="border: 1px solid #DEDEDE;">
						<el-form :model="GSTform" class="finance_setting">
							<el-col :span="12">
							<el-form-item class="product_name_it" style="color: black !important;float: left;" label="Enable GST">
								<input v-model="enableGST" style="width:13px;height:13px" type='checkbox'></input>  
								<input v-model="enableGSTValue" v-if="enableGST==true" type='text' style="width: 200px;height: 35px;padding-left: 15px;border-radius: 3.9px;border: 1px solid GAINSBORO;">
									<div v-if="enableGST==true" style="display: inline;">%</div>
								</input>  
								
							</el-form-item>
							</el-col>
							<el-col :span="12">
							<el-form-item label="GST for credit note">
								<input v-model="crediNote" style="width:13px;height:13px" type='checkbox'>
								<input v-model="crediNoteValue" v-if="crediNote==true" type='text' style="width: 200px;height: 35px;padding-left: 15px;border-radius: 3.9px;border: 1px solid GAINSBORO;">
									<div v-if="crediNote==true" style="display: inline;">%</div>
								</input>
								
							</el-form-item>
							<br>
				  			</el-col>
				  			
				  		</el-form>
				  		
				  		<el-button type="primary" @click="saveFinanceSet('GSTform')">Save</el-button>
				  		</div>
				  </el-tab-pane>
				</el-tabs>
	        </div>
	    </div>   
        <el-dialog title="Edit Amount" :visible.sync="dialogFinanceVisible_edit">
			<el-form :model="amountForm">  
				<el-form-item label="* Amount:" style="margin-left: 40px;">
					<input v-model="amount" type='text' style="width: 250px;height:30px;border: 1px solid #aaa;border-radius: 2px;    padding-left: 10px;"></input>    
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveItem('amountForm')">保存</el-button>
				<el-button class="redbtn" @click="dialogFinanceVisible_edit = false">取消</el-button>
			</div>
       	</el-dialog>
       	
        <el-dialog class="delete-pro" title="Delete" :visible.sync="deleteVisible" >
        	<div class="dialog-border-class">
            	<p>Are you sure you want to delete this message?</p>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="deleteProductById()">Sure</el-button>
				<el-button class="redbtn" @click="deleteVisible = false">Cancel</el-button>
			</div>
       	</el-dialog>
    </div>
    
   `
export default  {
    template: template,

    data(){
        return {
        	title:'Item List',
        	amount:'',
        	active:false,
            activeName: 'second',
            amountForm:'',
            crediNote:'',
        	crediNoteValue:'',
        	titel:'',
        	courseString:'',
        	dialogFinanceVisible_edit:false,
        	deleteProduId:'',
        	deleteVisible:false,
        	enableGST:'',
        	enableGSTValue:'',
        	editItemId:'',
        	editForm:'',
        	formLabelWidth:'500px',
        	GSTform:'',
        	product:'',
            tableData:[],
            list:[1,2,3,4,5,6],
            num:0,
            itemData:[],
            Item:'',
            settingValue:'',
            sid:'',
            hqId:''
        }
    },
    mounted() {
    	this.getProductBundle();
    	this.getFinanceSet();
    	this.getItemList();
    	
    },

    created() {
    	
    },

    computed: {},

    methods: {
        handleClick(tab, event) {
           this.title = tab.label;
        },
        fun(){
        	this.dialogFinanceVisible_edit = true;
        }
        ,
        getProductBundle(){
        	let url = '/hq/getProductBundle';
            server.get(url).then(res=>{
                let data = res.data.data;
                
                for (let i=0;i<data.length;i++){
                	let courseString = '';
                	for(let j=0;j<data[i].courseLevelDtos.length;j++){
                		let course = data[i].courseLevelDtos[j];
                        if(course.courseId != null){
							courseString += course.courseName+',';														
						}
                	}
                	data[i].courseLevelDtos = [courseString]
                }
                this.tableData = data;
            }).catch(res => {
            	this.$message({
                    type:'error',
                    center: true,
                    message:res.data.data
                })
            });
        },
        deleteProductBundle(product){
        	this.deleteVisible=true;
        	this.deleteProduId=product.id;
        },
        deleteProductById(){
        	let url = '/hq/deleteProductBundle/'+this.deleteProduId;
        	server.delete(url).then(res=>{
                this.deleteVisible=false;
                this.getProductBundle();
                this.$message({
                    message: '删除成功',
                    center: true,
                    type: 'success'
                  });
            }).catch(res => {
            	this.$message({
                    type:'error',
                    center: true,
                    message:res.data.data
                })
            });
        },
        getFinanceSet(){
        	let url = '/hq/getFinanceSet';
        	server.get(url).then(res=>{
        		let data=res.data.data;
        		this.enableGST=data.gstEnabled;
        		this.crediNote=data.gstCreditNoteEnabled;
        		this.crediNoteValue=data.gstCreditNote;
            	this.enableGSTValue=data.gst;
            	this.sid=data.id;
            	this.hqId=data.hqId;
            }).catch(res => {
            	this.$message({
                    type:'error',
                    center: true,
                    message:res.data.data
                })
            });
        },
        saveFinanceSet(GSTform){
        	let url = '/hq/updateFinanceSet/'+this.sid;
        	let data={
        		id:this.sid,
                hqId:this.hqId,
        		gstEnabled:this.enableGST,
        		gstCreditNoteEnabled:this.crediNote,
        		gstCreditNote:this.crediNoteValue,
        		gst:this.enableGSTValue
        		};
        	server.put(url,data).then(res=>{
        		let newData=res.data.data;
        		this.enableGST=newData.gstEnabled;
        		this.crediNote=newData.gstCreditNoteEnabled;
        		this.crediNoteValue=newData.gstCreditNote;
            	this.enableGSTValue=newData.gst;
            	this.$message({
                    message: '修改成功',
                    center: true,
                    type: 'success'
                  });
            }).catch(res => {
            	this.$message({
                    type:'error',
                    center: true,
                    message:res.data.data
                })
            });
        },
        /*查询产品套餐*/
        async getItemList(){
        	let url = '/hq/getItemList';
            server.get(url).then(res=>{
                let data = res.data.data;
                for(let i=0;i<data.length;i++){
                    let course= data[i].amount+'/'+data[i].type;
                    data[i].type=course;
            	}
                this.itemData = data;
            }).catch(res => {
            	this.$message({
                    type:'error',
                    center: true,
                    message:res.data.data
                })
            });
        },
        
        /*/updateItemList/{id}*/
        updateItemList(Item){
        	this.dialogFinanceVisible_edit=true;
        	this.editItemId=Item.id;
        	this.amount=Item.amount;
        },
        saveItem(amountForm){	
        	let newAm=this.amount;
        	let url = '/hq/updateItemList/'+this.editItemId+'?amount='+newAm;
            server.get(url).then(res=>{
            	this.dialogFinanceVisible_edit=false;
            	this.$message({
                    message: '修改成功',
                    center: true,
                    type: 'success'
                  });
            	this.getItemList();
            }).catch(res => {
            	this.$message({
                    type:'error',
                    center: true,
                    message:res.data.data
                })
            });
        },
        updateProductBundle(Item){
        	this.$router.push('/editProduct/'+Item.id);
        },
        crProductBundle(){
        	this.$router.push('/creatProduct');
        }
    },
    watch: {}
}