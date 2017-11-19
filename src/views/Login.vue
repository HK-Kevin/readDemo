<template>
<div>
  <div class="topCont" >
    <div class="w1200">
      <h1 class="logo">
        <img style="height: 80px" src="../../static/img/logo.png" alt="">
      </h1>
      <h1 style="line-height: 80px;font-size: 45px">免费试读</h1>
    </div>
  </div>
  <div class="bar">
    <div class="login" @keydown.enter="handleSubmit">
      <div class="login-con">
        <Card :bordered="false" style="width: 250px">
          <p slot="title">
            <Icon type="log-in"></Icon>
            欢迎登录
            <a href="http://www.allwin.vip/case.html#form1" style="color: green"> | 注册</a>
          </p>
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="userName">
                <Input v-model="form.userName" placeholder="请输入用户名">
                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                </Input>
              </FormItem>
              <FormItem>
                <i-button @click="handleSubmit" type="primary" long>登录</i-button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import Cookies from 'js-cookie';
  export default {
    data () {
      return {
        form: {
          userName: 'hk',
          password: 'allwin'
        },
        rules: {
          userName: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    mounted(){
      this.$http.post('/user/login', "11").then((res) => {
        console.log(res)
        if (res.data === '已登入') {
          this.$router.push('/main/math');
        } else {
          return
        }
      })
    },
    methods: {
      handleSubmit () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$http.post('/user/login', this.form).then((res) => {
              if (res.data.result) {
                Cookies.set('user', this.form.userName);
                Cookies.set('password', this.form.password);
                this.$Message.success(res.data.describe);
                this.$router.push('/main/word');
              } else {
                this.$Message.error(res.data.describe);
              }
            })
          }
        });
      }
    }
  };
</script>

<style scoped>
   .bar {
    height: 520px;
    font-size: 13px;
    line-height: 1.6;
    position: relative;
    background: url(../../static/img/aboutBar.jpg) no-repeat center top;
  }
  .login {
    width: 200px;
    position: absolute;
    right: 10%;
    top:30%;
  }
   .topCont {
     width: 100%;
     margin: 0 auto;
     background: #fff;
     height: 80px;
     z-index: 999;
     color: #333;
     font-size: 13px;
     line-height: 1.6;
   }
   .w1200 {
     width: 1200px;
     padding-top: 5px;
     margin: 0 auto;
   }
   .logo {
     width: 100px;
     float: left;
     margin: 0;
     padding: 0;
     font-weight: normal;
     display: block;
     font-size: 2em;
     text-align: left;
     line-height: 1.6;
   }
</style>
