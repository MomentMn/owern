//vue 组件
let  template=
`
<div class="leaderMain">
  <div class="content">
         <el-table
            :data="this.$props.levels"
            border
            fit="true"
            style="width: 100%;"
            header-row-class-name="leader-table-head"
            :cell-class-name="cellClassName"
            :highlight-current-row="false"
            >
           
            <el-table-column
              prop="dutyName"
              header-align="center"
              :resizable="false"
              min-width="20%"
              label="Levels"
              >    
              <template slot-scope="scope">
                 <div>{{scope.row.dutyName}}</div>
             </template>
            </el-table-column>
            
            <el-table-column
              prop="name"
              :resizable="false"
              header-align="center"
              min-width="80%"
              label="Teachers"
              >
               <template slot-scope="scope">
                   <div style="display: inline-block">
                      <div class="item" v-for="item in scope.row.teachers" v-on:click="pickHeadHandler(item.id)">
                          <img :src="item.url" class="round_icon"/>
                          <div class="item_text">{{item.name}}</div> 
                       </div>
                   </div>
                   <div class="operate" v-if="isHidden(scope.row,1)">                                      
                     <i class="el-icon-circle-plus colorGreen" v-on:click="addHandler(scope.row.id)"></i>
                   </div>
                    <div class="operate" v-if="isHidden(scope.row,2)">                                      
                     <i class="el-icon-circle-plus colorYellow" v-on:click="addHandler(scope.row.id)"></i>
                   </div>
                    <div class="operate" v-if="isHidden(scope.row,3)">                                      
                     <i class="el-icon-circle-plus colorRed" v-on:click="addHandler(scope.row.id)"></i>
                   </div>
              </template>        
              
            </el-table-column>                   
                
          </el-table>
  </div>
</div>

`
export default  {
    template: template,
    // 配置属性
    props: {
        levels: {
            required: true,
            type: Array,
            default:[]
        },
        // 是否添加
        isAdd:{
                required: true,
                type:Boolean
            }
    },
    data(){
        return {
            isAdd:this.$props.isAdd
        }
    },
    mounted(){
        this.isAdd = this.$props.isAdd;
    },
    methods:{
        cellClassName(row, column, rowIndex, columnIndex){
              //一级
            if(row.columnIndex===0 &&row.row && row.row.level ===1){
                return "cellGreen";
            }
            // 二级
            else if(row.columnIndex===0  && row.row && row.row.level ===2){
                return "cellYellow";
            }
            //三级
            else if(row.columnIndex===0  && row.row && row.row.level ===3){
                return "cellRed";
            }
        },
        // 点击头像
        pickHeadHandler(id){
            this.$emit("pick",id)
        },
        // 点击添加
        addHandler(id){
            this.$emit("add",id)
        },
        isHidden(row,level){
            return this.isAdd && row && row.level===level
        }
    }
}
