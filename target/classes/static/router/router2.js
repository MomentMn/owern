import base from '/staffdevelop/components/base2/base.js';
import  Development from "/staffdevelop/components/roadmap2/development-roadmap.js";
import Training from "/staffdevelop/components/training2/training.js"
import settings from "/staffdevelop/components/settings2.js";
import appraisal from "/staffdevelop/components/appraisal2/appraisalList.js";
import appraisalDetailEdit from "/staffdevelop/components/appraisal2/appraisalDetailEdit.js";
import appraisalDetail from "/staffdevelop/components/appraisal2/appraisalDetailInfo.js";
import  LeaderMain from "/staffdevelop/components/roadmap2/leaderMain.js";
import TrainingHistory from "/staffdevelop/components/training2/training-history.js";
import RoadmapDetail from "/staffdevelop/components/roadmap2/RoadmapDetail.js";
import appraisalReport from "/staffdevelop/components/appraisal2/appraisalReport.js";



const routes = [
    {
        path:'/',
        component:base,
        children:[
            {
                path: '/settings',
                component: settings,
                name:'settings'
            },
            {
                path: '/appraisal',
                component: appraisal,
                name:'appraisal'
            },
            {
                path: '/appraisal/report',
                component: appraisalReport,
                name:'appraisalReport'
            },
            {
                path: '/training',
                component: Training,
                name:'training'
            },
            {
                path: '/development/:id',
                component: Development,
                name:'development'
            },
            { 
            	path: '/leadermain', 
            	component: LeaderMain, 
            	name:'leadermain'
            },
        ]
    },
    {
        path: '/appraisal2/info',
        name:'appraisalDetail',
        component: appraisalDetail,
    },
    {
        path: '/appraisal2/info/edit',
        name:'appraisalDetailEdit',
        component: appraisalDetailEdit,
    },
    {
        path:'/training2/history',
        name:'TrainingHistory',
        component: TrainingHistory,
    },
	{
        path: '/roadmap2/detail/:id',
        name:'roadmapDetail',
        component: RoadmapDetail,
    },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})


export default router;