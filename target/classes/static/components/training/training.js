import TrainingList from "/staffdevelop/components/training/training-list.js";
import TrainingPlan from "/staffdevelop/components/training/training-plan.js";
import TrainingNeed from "/staffdevelop/components/training/training-need.js";
import TrainingSummary from "/staffdevelop/components/training/training-summary.js";
export default {
	template:`
	<div class="training">
		<div style="border-bottom:1px solid #d2cfcb">
			<div class="training-tab">
				<span :class="{active:tab==1}" v-on:click="handleClick(1)">Training List</span>
				<span :class="{active:tab==2}" v-on:click="handleClick(2)">Training Plan</span>
				<span :class="{active:tab==3}" v-on:click="handleClick(3)">Training Need</span>
				<span :class="{active:tab==4}" v-on:click="handleClick(4)">Training Summary</span>
			</div>
		</div>
		<div class="training-board">
			<training-list v-if="tab==1"></training-list>
			<training-plan v-if="tab==2"></training-plan>
			<training-need v-if="tab==3"></training-need>
			<training-summary v-if="tab==4"></training-summary>
		</div>
	</div>
	`,
	components:{
		trainingList:TrainingList,
		trainingPlan:TrainingPlan,
		trainingNeed:TrainingNeed,
		trainingSummary:TrainingSummary
	},
	data:function(){
		return{
			tab:1
		}
	},
	created(){
		if(this.$route&&this.$route.query&&this.$route.query.tabNo){
			this.tab =this.$route.query.tabNo
		}
	},
	methods:{
		handleClick:function(tabIndex){
			this.tab=tabIndex;
		}
	}
}