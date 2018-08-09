
import  Development from "/staffdevelop/components/roadmap/development-roadmap.js";
import Training from "/staffdevelop/components/training/training.js"
import settings from "/staffdevelop/components/settings.js";
import appraisal from "/staffdevelop/components/appraisal/appraisalList.js";
import appraisalDetailEdit from "/staffdevelop/components/appraisal/appraisalDetailEdit.js";
import appraisalDetail from "/staffdevelop/components/appraisal/appraisalDetailInfo.js";
import  LeaderMain from "/staffdevelop/components/roadmap/leaderMain.js";
import TrainingHistory from "/staffdevelop/components/training/training-history.js";
import RoadmapDetail from "/staffdevelop/components/roadmap/RoadmapDetail.js";
import ClassSchedule from "/staffdevelop/components/classSchedule/classSchedule.js";
import StudentList from "/staffdevelop/components/classSchedule/studentList.js";
import ScheduleDetail from "/staffdevelop/components/classSchedule/scheduleDetail.js";
import AddClass from "/staffdevelop/components/classSchedule/addClass.js";
import EditClass from "/staffdevelop/components/classSchedule/editClass.js";
import Finance from '/staffdevelop/components/finance/finance.js';
import CreatProduct from '/staffdevelop/components/finance/creatProduct.js';
import Home from '/staffdevelop/components/home/home.js';
import EditProduct from '/staffdevelop/components/finance/editProduct.js';
import UploadSchedule from '/staffdevelop/components/classSchedule/uploadSchedule.js';



const routes = [
            {
                path: '/settings',
                component: settings,
                name:'settings'
            },
            {
                path: '/home',
                component: Home,
                name:'home'
            },
            {
                path: '/finance',
                component: Finance,
                name:'finance'
            },
            {
                path: '/creatProduct',
                component: CreatProduct,
                name:'creatProduct'
            },
            {
                path: '/editProduct/:pid',
                component: EditProduct,
                name:'editProduct'
            },
            {
                path: '/appraisal',
                component: appraisal,
                name:'appraisal'
            },
            {
                path: '/training',
                component: Training,
                name:'training'
            },
            {
                path: '/classSchedule',
                component: ClassSchedule,
                name:'classSchedule',
            },
            {
                path:'/addClass/:id/:courseid',
                component:AddClass,
                name:'addClass'
            },
            {
                path:'/editClass/:courseid/:centerid/:classid',
                component:EditClass,
                name:'editClass'
            },
            {
                path:'/uploadSchedule/:id/:courseid',
                component: UploadSchedule,
                name:'uploadSchedule'
            },
            {
                path:'/studentList/:id',
                component:StudentList,
                name:'studentList'
            },
            {
                path:'/ScheduleDetail/:id',
                component:ScheduleDetail,
                name:'ScheduleDetail'
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