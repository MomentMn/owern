//vue 组件
let  template=
`
<div>
    <div class="left-container left">
        <div class="nav-name">员工发展 </div> 
        <ul>
           
            <li :class="{active:this.$route.name == 'appraisal' }">
                <router-link to="/appraisal">员工自评</router-link>
            </li>
           
            <li :class="{active:this.$route.name == 'training' }">
                <router-link to="/training">员工培训</router-link>
            </li>
            <li :class="{active:this.$route.name == 'development' }">
                <router-link to="/development/0?type=teacher">职业发展</router-link>
            </li>           
        </ul>
    </div>
    <div class="right-container left">
        <router-view></router-view>
    </div>
</div>

   `
export default  {
    template: template,
    props: {
        mymsg: {
            required: true,
            type: String
        }
    },
    data(){
        return {msg: "demo"}
    },
    mounted() {

    },

    created() {
    },

    computed: {},

    methods: {},
    watch: {}
}
