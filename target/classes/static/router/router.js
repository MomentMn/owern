import base from '/staffdevelop/components/base/base.js';
import  Development from "/staffdevelop/components/roadmap/development-roadmap.js";
import Training from "/staffdevelop/components/training/training.js"
import settings from "/staffdevelop/components/settings.js";
import appraisal from "/staffdevelop/components/appraisal/appraisalList.js";
import appraisalDetailEdit from "/staffdevelop/components/appraisal/appraisalDetailEdit.js";
import appraisalDetail from "/staffdevelop/components/appraisal/appraisalDetailInfo.js";
import  LeaderMain from "/staffdevelop/components/roadmap/leaderMain.js";
import TrainingHistory from "/staffdevelop/components/training/training-history.js";
import RoadmapDetail from "/staffdevelop/components/roadmap/RoadmapDetail.js";
import appraisalReport from "/staffdevelop/components/appraisal/appraisalReport.js";



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
        path: '/appraisal/info',
        name:'appraisalDetail',
        component: appraisalDetail,
    },
    {
        path: '/appraisal/info/edit',
        name:'appraisalDetailEdit',
        component: appraisalDetailEdit,
    },
    {
        path:'/training/history',
        name:'TrainingHistory',
        component: TrainingHistory,
    },
	{
        path: '/roadmap/detail/:id',
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