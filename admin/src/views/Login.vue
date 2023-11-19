<template>
    <div class="wrap">
        <div id="loginmain_right">
            <div style="margin-left: 20px; height: 30px; line-height: 50px; color: white; background-color: white">
            </div>
            <div style="height: 50px; line-height: 50px; color: white; background-color: white;">
                <h2 style="font-size: 22px; padding-left: 40px; background-color: #09c; margin-right: 20px;">
                    ZHUANGXIU.com
                </h2>
            </div>
            <img id=imgcorner src="http://res.scholat.com/scholat/images/login_corner.png"
                style="float: left; background: none;" />
            <div
                style="margin-left: 20px; text-align: center; padding-top: 4px; height: 24px; font-size: 14px; background-color: white;">
                <span id="sp_err" style="padding: 3px; color: #f14b8e;"></span>
            </div>
            <div>
                <div style="margin-left: 20px; text-align: center; background-color: white; height: 230px;">
                    <form id="loginForm">
                        <input type="hidden" id="referrer" name="urlBeforeLogin" />
                        <div id="logindiv" style="margin-bottom: 24px;">
                            <div style="font-weight: bold; float: left; margin-left: 32px; margin-bottom: 5px;">
                                Username/Email
                            </div>
                            <br>
                            <input v-model='user.username' type="text" id="j_username" name="j_username" tabindex="1" class="c_input"
                                placeholder="Username or Email"
                                style="padding-top: 2px; height: 26px; font-size: 18px; font-family:'Georgia', Georgia, 'Times New Roman', Times, 'Microsoft YaHei', SimSun, SimHei, serif, Georgia, 'Times New Roman', Times, 'Microsoft YaHei', SimSun, SimHei, serif; width: 260px; margin-left: -5px; border: 1px #3399ff solid;"
                                />
                        </div>
                        <div id="logindiv" style="margin-bottom: 34px;">
                            <div style="font-weight: bold; float: left; margin-left: 32px; margin-bottom: 5px;">
                                Password
                            </div>
                            <br>
                            <input v-model='user.password' id="j_password_ext" name="j_password_ext" type="password" tabindex="2"
                                class="c_input" value="" placeholder="Password" @keyup.enter="login"
                                style="padding-top: 2px; height: 26px; font-size: 18px; font-family:'Georgia', Georgia, 'Times New Roman', Times, 'Microsoft YaHei', SimSun, SimHei, serif Georgia, 'Times New Roman', Times, 'Microsoft YaHei', SimSun, SimHei, serif; width: 260px; margin-left: -5px; border: 1px #3399ff solid;" />
                        </div>
                        <div id="logindiv" style="margin-bottom: 14px;">
                            <input id="login" value="Login" type="button" class="c_button"
                                style="border: 0; font-size: 18px; width: 272px; height: 36px; margin-right: 4px; background-color: #3399ff;"
                                tabindex="3" @click="login" >
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                user:{
                    
                }
            }
        },
        methods:{
            async login(){
                let user = await this.$http.post('login',this.user)
                console.log(user)
                if(!user) return
                this.$message({
                    type:'success',
                    message:`欢迎你，${user.data.user.username} ！`
                })
                sessionStorage.setItem('token',user.data.token)
                sessionStorage.setItem('username',user.data.user.username)
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    .wrap{
        background-color: #399;
        height: 100vh;
        width:100%;
        position: relative;
    }
    #loginmain {
        height: 380px;
        width: 800px;
        margin: 0 auto;
        border: 0 solid #9bbed9;
        border-top: 0 solid #ccc;
        padding-top: 150px;
        font-family: 'Georgia', Georgia, 'Times New Roman', Times, 'Microsoft YaHei', SimSun, SimHei, serif;
    }

    #loginmain_right {
        position:absolute;
        width: 360px;
        height: 320px;
        background-color: transparent;
        left:50%;
        top:50%;
        transform: translate(-50%,-80%);
    }

    #logindiv {
        height: 40px;
    }

    #logindiv a {
        font-size: 15px;
        margin: 10px;
        color: #206cba;
    }

    #logindiv span {
        font-size: 15px;
        padding-right: 10px;
    }

    #loginmain_right li {
        height: 25px;
        margin: 13px 10px;
        text-align: center;
    }

    #loginmain_right .count {
        font-size: 15px;
        font-weight: bold;
    }

    #loginmain_right .c_input {
        width: 135px;
        height: 28px;
        font-size: 16px;
        padding-left: 5px;
        padding-right: 5px;
        border: 1px solid #69c;
        background-color: #fafafa;
    }

    #loginmain_right .c_button {
        height: 32px;
        width: 70px;
        background-color: #09C;
        border: 1px #fff solid;
        color: #fff;
        font-family: 'Georgia', Georgia, 'Times New Roman', Times, 'Microsoft YaHei', SimSun, SimHei, serif;
    }

    #loginmain a:hover {
        text-decoration: underline;
    }

</style>