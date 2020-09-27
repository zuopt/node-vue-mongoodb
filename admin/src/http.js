import axios from 'axios'
import Vue from 'vue'
import router from "./router";

const http = axios.create({
    baseURL:'http://localhost:3001/api'
})

http.interceptors.request.use(function(config){
    config.headers.Authorization ='Bearer ' + sessionStorage.token
    return config
},function(err){
    return Promise.reject(err)
})

http.interceptors.response.use(res => {
    return res
},err => {
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
        console.log(err.response)
        if(err.response.status == 401){
            console.log('login')
            router.push('/login')
        }
    }
})

Vue.prototype.$http = http