//vue 组件
let  template=
`
<div>
    <div class="left-container left">
        <div class="nav-name">Staff Development</div> 
        <ul>
            <li :class="{active:this.$route.name == 'settings' }">
                <router-link to="/settings">Settings</router-link>
            </li>            
            <li :class="{active:this.$route.name == 'appraisalReport' }">
                <router-link to="/appraisal/report">Staff Appraisal</router-link>
            </li>
            <li :class="{active:this.$route.name == 'training' }">
                <router-link to="/training">Staff Training</router-link>
            </li>           
            <li :class="{active:this.$route.name == 'leadermain' }">
                <router-link to="/leaderMain">Professional Development</router-link>
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
