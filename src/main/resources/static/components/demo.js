//vue 组件
let  template=
`
<div>
 <div>{{msg}}</div>
 <el-row>
  <el-button>默认按钮 {{this.$props.mymsg}} </el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</el-row>
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
