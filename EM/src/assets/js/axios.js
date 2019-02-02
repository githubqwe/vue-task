import axios from 'axios'

var myaxios = {}
myaxios.install = function(Vue){
    Vue.prototype.$http = axios
    // 设置统一请求路径
    axios.defaults.baseURL='http://localhost:8888/api/private/v1'
}
export default myaxios