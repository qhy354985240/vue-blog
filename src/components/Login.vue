<template>
  <div class="cotn_principal">
    <div class="cont_centrar">

      <div class="login-title">Totoro</div>

      <div class="cont_login">
        <div class="cont_info_log_sign_up">
          <div class="col_md_login">
            <div class="cont_ba_opcitiy">
              <h2>登录</h2>
              <p>记录</p>
              <button class="btn_login" @click="login">登录</button>
            </div>
          </div>
          <div class="col_md_sign_up">
            <div class="cont_ba_opcitiy">
              <h2>注册</h2>
              <p>成长</p>
              <button class="btn_sign_up" @click="signUp">注册</button>
            </div>
          </div>
        </div>

        <div class="cont_back_info">
          <div class="cont_img_back_grey">
            <img src="@/assets/img/bgone.jpg" alt="" >
          </div>
        </div>

        <div class="cont_forms" ref="cont_forms">
          <div class="cont_img_back_">
            <img src="@/assets/img/bgone.jpg" alt="" >
          </div>

          <!-- 登录 -->
          <div class="cont_form_login" ref="cont_form_login">
            <a href="#" @click="change"><i class="el-icon-close"/></a>
            <h2>登录</h2>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" class="input-80">
              <el-form-item prop="username" class="input-80">
                <el-input placeholder="账号" v-model="loginForm.username" autocomplete="off"/>
              </el-form-item>
              <el-form-item class="input-80" prop="password">
                <el-input placeholder="密码" v-model="loginForm.password" :type="passwordType" autocomplete="off">
                <i class="el-icon-view icon" slot="suffix" @click="showPassword" /></el-input>
              </el-form-item>
              <el-form-item class="input-80" prop="verifycode">
                <el-input v-model="loginForm.verifycode" placeholder="请输入验证码" class="identifyinput" @keyup.enter.native="login" />
              </el-form-item>
              <el-form-item class="input-80">
                <div class="identifybox">
                  <div @click="refreshCode" class="vertify-box">
                    <Vertify :identify-code="identifyCode"/>
                  </div>
                  <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
                </div>
              </el-form-item>
            </el-form>
            <button class="btn_login" @click="login">登录</button>
          </div>

          <!-- 注册 -->
          <div class="cont_form_sign_up" ref="cont_form_sign_up">
            <a href="#" @click="change"><i class="el-icon-close"/></a>
            <h2>注册</h2>
            <el-form :model="regForm" class="input-80" :rules="rules1" ref="regForm">
              <el-form-item prop="username" class="input-80">
                <el-input v-model="regForm.nickName" placeholder="你的昵称" autocomplete="off" />
              </el-form-item>
              <el-form-item prop="username" class="input-80">
                <el-input v-model="regForm.username" placeholder="账号" autocomplete="off" />
              </el-form-item>
              <el-form-item prop="password" class="input-80">
                <el-input v-model="regForm.password" placeholder="密码" autocomplete="off" type="password"/>
              </el-form-item>
              <el-form-item prop="checkPassword" class="input-80">
                <el-input v-model="regForm.checkPassword" placeholder="确认密码" autocomplete="off" type="password"/>
              </el-form-item>
              <el-form-item
                prop="email"
                class="input-80">
                <el-input v-model="regForm.email" type="email" placeholder="邮箱"/>
              </el-form-item>
            </el-form>
            <button class="btn_sign_up" @click="signUp">注册</button>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/axios.js'
  import Vertify from '@/components/vertify.vue'

  export default {
    components: {
      Vertify
    },
    data () {
      // 验证码自定义验证规则
      const validateVerifycode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (value !== this.identifyCode) {
          callback(new Error('验证码不正确!'))
        } else {
          callback()
        }
      }
      let validatePass1 = (rule, value, callback) => {
        // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
        let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/
        if (!reg.test(value)) {
          callback(new Error('密码长度需6-16位，且包含字母和字符'))
        } else {
          callback()
        }
      }
      // 验证密码是否重复
      let validatePass2 = (rule, value, callback) => {
        if (value !== this.regForm.password) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      }
      return {
        loginForm: { // 表单v-model的值
          username: '',
          password: '',
          verifycode: ''
        },
        regForm: {
          nickName: '',
          username: '',
          password: '',
          checkPassword: '',
          email: ''
        },
        active: '',
        passwordType: 'password',
        identifyCodes: '1234567890abcdefghijklmnopqrstuvwxyz',
        identifyCode: '',
        rules: { // 验证规则
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {min: 6, max: 16, message: '用户名在6到16位之间', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          verifycode: [
            { required: true, trigger: 'blur', validator: validateVerifycode }
          ]
        },
        rules1: {
          username: [
            {required: true, message: '用户名不能少', trigger: 'blur'},
            {min: 6, max: 16, message: '用户名在6到16位之间', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatePass1, trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      // 验证码初始化
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    methods: {
      // 通过改变input的type使密码可见
      showPassword () {
        this.passwordType === ''
          ? (this.passwordType = 'password')
          : (this.passwordType = '')
      },
      // 生成随机数
      randomNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 切换验证码
      refreshCode () {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      // 生成四位随机验证码
      makeCode (o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
        }
      },
      // 提交表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证通过
            let form = this.loginForm
            api.userLogin(form)
              .then((res) => {
                // 账号存在
                if (res.success) {
                  this.$message({
                    type: 'success',
                    message: '登录成功'
                  })
                  let token = res.token
                  let username = res.username
                  this.$store.dispatch('UserLogin', token)
                  this.$store.dispatch('UserName', username)
                  let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/')
                  // 跳转到指定的路由
                  this.$router.push({
                    path: redirectUrl
                  })
                } else if (res.success === false) {
                  this.$message({
                    type: 'info',
                    message: res.info
                  })
                }
              })
          } else {
            // 验证不通过
            return false
          }
        })
      },
      login () {
        if (this.$refs.cont_forms.className !== 'cont_forms' && this.active === 'login') {
          this.submitForm('loginForm')
        } else {
          this.active = 'login'
          this.$refs.cont_forms.className = 'cont_forms cont_forms_active_login'
          this.$refs.cont_form_login.style.display = 'block'
          this.$refs.cont_form_sign_up.style.opacity = '0'
          setTimeout(() => { this.$refs.cont_form_login.style.opacity = '1' }, 400)
          setTimeout(() => {
            this.$refs.cont_form_sign_up.style.display = 'none'
          }, 200)
        }
      },
      registerForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证通过
            api.userRegister(this.regForm)
              .then((res) => {
                if (res.success) {
                  this.$message({
                    type: 'success',
                    message: '注册成功'
                  })
                  let token = res.token
                  let username = res.username
                  this.$store.dispatch('UserLogin', token)
                  this.$store.dispatch('UserName', username)
                  let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/')
                  // 跳转到指定的路由
                  this.$router.push({
                    path: redirectUrl
                  })
                } else {
                  this.$message({
                    type: 'info',
                    message: '用户名已经存在'
                  })
                }
              })
          } else { // 验证不通过
            return false
          }
        })
      },
      signUp () {
        if (this.$refs.cont_forms.className !== 'cont_forms' && this.active === 'signup') {
          this.registerForm('regForm')
        } else {
          this.active = 'signup'
          this.$refs.cont_forms.className = 'cont_forms cont_forms_active_sign_up'
          this.$refs.cont_form_sign_up.style.display = 'block'
          this.$refs.cont_form_login.style.opacity = '0'

          setTimeout(() => {
            this.$refs.cont_form_sign_up.style.opacity = '1'
          }, 100)

          setTimeout(() => {
            this.$refs.cont_form_login.style.display = 'none'
          }, 400)
        }
      },

      change () {
        this.$refs.cont_forms.className = 'cont_forms'
        this.$refs.cont_form_sign_up.style.opacity = '0'
        this.$refs.cont_form_login.style.opacity = '0'
        setTimeout(() => {
          this.$refs.cont_form_sign_up.style.display = 'none'
          this.$refs.cont_form_login.style.display = 'none'
        }, 500)
      }
    }
  }
</script>

<style scoped>
.icon {
  cursor: pointer;
  padding-right: 4px;
}
.vertify-box {
  margin: 0 !important;
}
.identifybox>>> .el-button--text {
   color:#FF9800;
}
.identifybox{
 display: flex;
 justify-content: space-between;
 margin-top:4px;
}
.iconstyle{
 color:#FF9800;
}
.cotn_principal>>> .el-form-item__label {
  padding-right: 0;
}
.login-title {
  color: #ea6f5a;
  font-size: 42px;
  position: absolute;
  font-weight: 700;
  left: 60px;
  top:40px;
}
* {
  margin: 0px auto;
  padding: 0px;
  text-align: center;
font-family: 'Lato', sans-serif;
}

.cotn_principal {
  position: absolute;
  width: 100%;
  height: 100%;
/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#cfd8dc+0,607d8b+100,b0bec5+100 */
background: #aac4bc; /* Old browsers */
background: -moz-linear-gradient(-45deg,  #aac4bc 0%, #eca8a8 100%, #eed5a9 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(-45deg,  #aac4bc 0%,#eca8a8 100%,#eed5a9 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(135deg, #aac4bc 0%,#eca8a8 100%,#eed5a9 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cfd8dc', endColorstr='#b0bec5',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
background: #f1f1f1 !important;
}

.cont_centrar {
  position: relative;
  float: left;
   width: 100%;

}

.cont_login {
  position: relative;
  width: 640px;
left: 50%;
margin-left: -320px;

}

.cont_back_info {
position: relative;
  float: left;
  width: 640px;
  height: 280px;
overflow: hidden;
  background-color: #fff;
  margin-top: 100px;
box-shadow: 1px 10px 30px -10px rgba(0,0,0,0.5);
}

.cont_forms {
  position: absolute;
  overflow: hidden;
  top:100px;
left: 0px;
  width: 320px;
  height: 280px;
  background-color: #eee;
-webkit-transition: all 0.5s;
-moz-transition: all 0.5s;
-ms-transition: all 0.5s;
-o-transition: all 0.5s;
transition: all 0.5s;
}

.cont_forms_active_login {
box-shadow: 1px 10px 30px -10px rgba(0,0,0,0.5);
  height: 420px;
top:20px;
left: 0px;
-webkit-transition: all 0.5s;
-moz-transition: all 0.5s;
-ms-transition: all 0.5s;
-o-transition: all 0.5s;
transition: all 0.5s;

}

.cont_forms_active_sign_up {
box-shadow: 1px 10px 30px -10px rgba(0,0,0,0.5);
  height: 420px;
top:20px;
left:320px;
-webkit-transition: all 0.5s;
-moz-transition: all 0.5s;
-ms-transition: all 0.5s;
-o-transition: all 0.5s;
transition: all 0.5s;
}

.cont_img_back_grey {
  position: absolute;
  width: 950px;
top:-80px;
  left: -116px;
}

.cont_img_back_grey > img {
  width: 100%;
 -webkit-filter: grayscale(100%);     filter: grayscale(100%);
opacity: 0.2;
animation-name: animar_fondo;
animation-duration: 20s;
animation-timing-function: linear;
animation-iteration-count: infinite;
animation-direction: alternate;

}

.cont_img_back_ {
  position: absolute;
  width: 950px;
top:-80px;
  left: -116px;
}

.cont_img_back_ > img {
width: 100%;
opacity: 0.3;
animation-duration: 20s;
animation-timing-function: linear;
animation-iteration-count: infinite;
animation-direction: alternate;
}

.cont_forms_active_login > .cont_img_back_ {
top:0px;
-webkit-transition: all 0.5s;
-moz-transition: all 0.5s;
-ms-transition: all 0.5s;
-o-transition: all 0.5s;
transition: all 0.5s;
}

.cont_forms_active_sign_up > .cont_img_back_ {
top:0px;
left: -435px;
-webkit-transition: all 0.5s;
-moz-transition: all 0.5s;
-ms-transition: all 0.5s;
-o-transition: all 0.5s;
transition: all 0.5s;
}

.cont_info_log_sign_up {
position: absolute;
  width: 640px;
  height: 280px;
  top: 100px;
z-index: 1;
}

.col_md_login {
  position: relative;
  float: left;
  width: 50%;
}

.col_md_login > h2 {
  font-weight: 400;
margin-top: 70px;
    color: #757575;
}

.col_md_login > p {
 font-weight: 400;
margin-top: 15px;
width: 80%;
    color: #37474F;
}

.btn_login {
background-color: #FF9800;
  border: none;
  padding: 10px;
width: 200px;
border-radius:3px;
box-shadow: 1px 5px 20px -5px rgba(0,0,0,0.4);
  color: #fff;
margin-top: 10px;
cursor: pointer;
}

.col_md_sign_up {
  position: relative;
  float: left;
  width: 50%;
}

.cont_ba_opcitiy > h2 {
  font-weight: 400;
  color: #fff;
}

.cont_ba_opcitiy > p {
 font-weight: 400;
margin-top: 15px;
 color: #fff;
}
/* ----------------------------------
background text
------------------------------------
 */
.cont_ba_opcitiy {
  position: relative;
  background-color: rgba(187, 168, 170, 0.79);
  width: 80%;
  border-radius:3px ;
margin-top: 60px;
padding: 15px 0px;
}

.btn_sign_up {
background-color: #f44336;
  border: none;
  padding: 10px;
width: 200px;
border-radius:3px;
box-shadow: 1px 5px 20px -5px rgba(0,0,0,0.4);
  color: #fff;
margin-top: 10px;
cursor: pointer;
}
.cont_forms_active_sign_up {
z-index: 2;
}

@-webkit-keyframes animar_fondo {
  from { -webkit-transform: scale(1) translate(0px);
-moz-transform: scale(1) translate(0px);
-ms-transform: scale(1) translate(0px);
-o-transform: scale(1) translate(0px);
transform: scale(1) translate(0px); }
  to { -webkit-transform: scale(1.5) translate(50px);
-moz-transform: scale(1.5) translate(50px);
-ms-transform: scale(1.5) translate(50px);
-o-transform: scale(1.5) translate(50px);
transform: scale(1.5) translate(50px); }
}
@-o-keyframes identifier {
  from { -webkit-transform: scale(1);
-moz-transform: scale(1);
-ms-transform: scale(1);
-o-transform: scale(1);
transform: scale(1); }
  to { -webkit-transform: scale(1.5);
-moz-transform: scale(1.5);
-ms-transform: scale(1.5);
-o-transform: scale(1.5);
transform: scale(1.5); }

}
@-moz-keyframes identifier {
  from { -webkit-transform: scale(1);
-moz-transform: scale(1);
-ms-transform: scale(1);
-o-transform: scale(1);
transform: scale(1); }
  to { -webkit-transform: scale(1.5);
-moz-transform: scale(1.5);
-ms-transform: scale(1.5);
-o-transform: scale(1.5);
transform: scale(1.5); }

}
@keyframes identifier {
  from { -webkit-transform: scale(1);
-moz-transform: scale(1);
-ms-transform: scale(1);
-o-transform: scale(1);
transform: scale(1); }
  to { -webkit-transform: scale(1.5);
-moz-transform: scale(1.5);
-ms-transform: scale(1.5);
-o-transform: scale(1.5);
transform: scale(1.5); }
}
.cont_form_login {
  position: absolute;
  opacity: 0;
display: none;
  width: 320px;
  -webkit-transition: all 0.5s;
-moz-transition: all 0.5s;
-ms-transition: all 0.5s;
-o-transition: all 0.5s;
transition: all 0.5s;
}

.cont_forms_active_login {
z-index: 2;
}
.cont_forms_active_login  >.cont_form_login {
}

.cont_form_sign_up {
  position: absolute;
  width: 320px;
float: left;
  opacity: 0;
display: none;
  -webkit-transition: all 0.5s;
-moz-transition: all 0.5s;
-ms-transition: all 0.5s;
-o-transition: all 0.5s;
transition: all 0.5s;
}

.cont_form_sign_up > input {
text-align: left;
  padding: 15px 5px;
margin-left: 10px;
margin-top: 20px;
  width: 260px;
border: none;
    color: #757575;
}

.cont_form_sign_up > h2 {
margin-top: 50px;
font-weight: 400;
  color: #757575;
}

.cont_form_login > input {
  padding: 15px 5px;
margin-left: 10px;
margin-top: 20px;
  width: 260px;
border: none;
text-align: left;
  color: #757575;
}

.cont_form_login > h2 {
margin-top: 50px;
margin-bottom: 20px;
font-weight: 400;
color: #757575;
}
.cont_form_login > a,.cont_form_sign_up > a  {
  color: #757575;
    position: relative;
    float: left;
    margin: 10px;
margin-left: 30px;
}
</style>
