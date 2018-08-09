//vue 组件
let  template=
`
<div>
    <div class="left-container left">
        <div class="nav-name">Staff Development</div> 
        <ul>
           
            <li :class="{active:this.$route.name == 'appraisal' }">
                <router-link to="/appraisal">Staff Appraisal</router-link>
            </li>
           
            <li :class="{active:this.$route.name == 'training' }">
                <router-link to="/training">Staff Training</router-link>
            </li>
            <li :class="{active:this.$route.name == 'development' }">
                <router-link to="/development/0?type=teacher">Professional Development</router-link>
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
