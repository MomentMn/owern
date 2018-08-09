//vue 组件
let  template=
    `
<div>
    <div class="top_container">
        <img class="taidii_png" src="/asset/images/taidii.png" alt="">
    </div>
    <div class="left-container left">
        <ul>
            <li :class="{active:this.$route.name == 'home' }">
                <router-link to="/home">Home</router-link>
            </li>
            <li :class="{active:this.$route.name == 'classSchedule' }">
                <router-link to="/classSchedule">ClassSchedule</router-link>
            </li>
            <li :class="{active:this.$route.name == 'finance' }">
                <router-link to="/finance">Finance</router-link>
            </li>
            <li :class="{active:this.$route.name == 'listOfBranches' }">
                <router-link to="/listOfBranches/0">List of Branches</router-link>
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
