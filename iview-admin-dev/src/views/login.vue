<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="account">
                            <Input v-model="form.account" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="md-person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="md-lock"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <!--<p class="login-tip">输入任意用户名和密码即可</p>-->
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import authService from '@/api/authService';
export default {
    data () {
        return {
            form: {
                account: '',
                password: ''
            },
            setTimeObj:{},
            rules: {
                account: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        isMobilePhone(str) {
            let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(str)) {
                return false;
            } else {
                return true;
            }
        },
         
        handleSubmit () {
            var that = this
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                //    
                    var self = this;
                    authService.login(this.form).then(res=>{
                        console.log('res')
                        Cookies.set('user', res.name);
                        Cookies.set('userInfo', res);
                        Cookies.set('token', res.token);
                        console.log('res.type')
                        Cookies.set('access', res.role != 'admin' ? 1 : 0 );
                        that.$router.push({name:'case_list'})
                    })
                }
            });
        }
    },
    mounted() {
        
    },
};
</script>

<style>

</style>
