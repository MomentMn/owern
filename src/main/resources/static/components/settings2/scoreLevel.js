//vue 组件
let  template=
    `
<div class="td-score-table" style="width:95%;margin-top: 10px;padding:0 2.5%;height:1000px;">
    <el-table
			:data="scoreLevel"
			fit
			:stripe="false"
			header-row-class-name="score-table-head"
			:header-cell-style="headStyle"
			:cell-style="cellStyle">
			<el-table-column
			        width="90"
					label="分数"
					prop="score"
					align="center"
					:resizable="false"
					header-align="center">
			</el-table-column>
			<el-table-column
					label="名称"
					prop="name"
					align="center"
					:resizable="false"
					header-align="center">
			</el-table-column>
			<el-table-column
					label="描述"
					prop="rateKeys"
					align="center"
					:resizable="false"
					header-align="center">
			</el-table-column>
			<el-table-column
			        width="100"
					align="center"
					:resizable="false"
					header-align="center">
				<template slot-scope="scope">
				    <span class="el-icon-edit" style="color:#42d885;font-size: 20px;cursor: pointer;font-weight: bold;" v-on:click="updateScore(scope.row)"></span>
					<span class="el-icon-delete" style="color:#F2898C;font-size:20px;cursor: pointer;font-weight: bold;margin-left: 15px;" v-on:click="deleteScore(scope.row.id)"></span>
				</template>
			</el-table-column>
	</el-table>
	<div class="score-add-class">
	    <span class="el-icon-circle-plus" v-on:click="addScore"> 新增</span>
    </div>
</div>

`
export default  {
    template:template,
    props:{
        scoreLevel:{
            required:true,
            type:Array,
        }
    },
    data(){
        return {

        }
    },
    methods:{
        addScore(){
            this.$emit("addScore")
        },
        deleteScore(id){
            console.log("进来了1")
            this.$emit("deleteScore",id)
        },
        updateScore(score){
            this.$emit("updateScore",score)
        },
        headStyle(head){
            if(head.columnIndex != 3){
                return {border:"1px solid #C1BEB8",borderRight:"none"};
            }else{
                return {border:"1px solid #C1BEB8", };
            }
        },
        cellStyle(cell) {
            let border = "1px solid #C1BEB8";
            let bottomBorder = "2px solid #C1BEB8";
            let style={};
            if(cell.columnIndex != 3){
                style = {
                    borderBottom:border,
                    borderLeft:border,
                };
            }else{
                style = {
                    borderBottom:border,
                    borderLeft:border,
                    borderRight:border,
                }
            }
            if(cell.rowIndex == this.scoreLevel.length - 1){
                style.borderBottom = bottomBorder;
            }
            return style;
        }
    },
    computed:{
        lastRowId(){
            let length = this.scoreLevel.length;
            return this.scoreLevel[length-1].id;
        }
    }
}