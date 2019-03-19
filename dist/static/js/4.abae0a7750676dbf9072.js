(window.webpackJsonp=window.webpackJsonp||[]).push([[4,5],{DV5s:function(e,r,t){"use strict";var s=t("Asgo"),o=t.n(s),a=t("f0Pt"),n=t.n(a),i=t("oYx3"),u=t("KEZ+");n.a.defaults.timeout=6e3,n.a.defaults.headers.post["Content-Type"]="application/json;charset=UTF-8";var l=n.a.create();l.defaults.headers.post["Content-Type"]="application/json;charset=UTF-8",n.a.interceptors.request.use=l.interceptors.request.use,l.interceptors.request.use(function(e){return u.a.state.token&&(e.headers.Authorization="token "+u.a.state.token),e},function(e){return o.a.reject(e)}),l.interceptors.response.use(function(e){return e.data},function(e){return e.response&&401===e.response.status&&(u.a.dispatch("UserLogout"),i.a.push({path:"login",query:{redirect:i.a.currentRoute.fullPath}})),o.a.reject(e.response)}),r.a={userRegister:function(e){return l.post("/api/user/register",e)},userLogin:function(e){return l.post("/api/user/login",e)},getUser:function(){return l.get("/api/user")},delUser:function(e){return l.post("/api/delUser",e)}}},"H+u6":function(e,r,t){"use strict";t.r(r);var s=t("DV5s"),o={data:function(){var e=this;return{regForm:{username:"",password:"",checkPassword:""},rules:{username:[{required:!0,message:"用户名不能少",trigger:"blur"},{min:6,max:16,message:"用户名在6到16位之间",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{validator:function(e,r,t){/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/.test(r)?t():t(new Error("密码长度需6-16位，且包含字母和字符"))},trigger:"blur"}],checkPassword:[{required:!0,message:"请再次输入密码",trigger:"blur"},{validator:function(r,t,s){t!==e.regForm.password?s(new Error("两次密码输入不一致")):s()},trigger:"blur"}]}}},methods:{resetForm:function(e){this.$refs[e].resetFields()},submitForm:function(e){var r=this;this.$refs[e].validate(function(e){if(!e)return!1;s.a.userRegister(r.regForm).then(function(e){if(e.success){r.$message({type:"success",message:"注册成功"});var t=e.token,s=e.username;r.$store.dispatch("UserLogin",t),r.$store.dispatch("UserName",s);var o=decodeURIComponent(r.$route.query.redirect||"/");r.$router.push({path:o})}else r.$message({type:"info",message:"用户名已经存在"})})})}}},a=t("F8we"),n=Object(a.a)(o,function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("el-form",{ref:"regForm",attrs:{model:e.regForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"用户名",prop:"username"}},[t("el-input",{model:{value:e.regForm.username,callback:function(r){e.$set(e.regForm,"username",r)},expression:"regForm.username"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{type:"password"},model:{value:e.regForm.password,callback:function(r){e.$set(e.regForm,"password",r)},expression:"regForm.password"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"确认密码",prop:"checkPassword"}},[t("el-input",{attrs:{type:"password"},model:{value:e.regForm.checkPassword,callback:function(r){e.$set(e.regForm,"checkPassword",r)},expression:"regForm.checkPassword"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("regForm")}}},[e._v("注册")]),e._v(" "),t("el-button",{on:{click:function(r){return e.resetForm("regForm")}}},[e._v("重置")])],1)],1)],1)},[],!1,null,"2e67b472",null);r.default=n.exports},V4qv:function(e,r,t){"use strict";t.r(r);var s=t("DV5s"),o={components:{Register:t("H+u6").default},data:function(){return{activeName:"login",loginForm:{username:"",password:""},rules:{username:[{required:!0,message:"用户名不能少",trigger:"blur"},{min:6,max:16,message:"用户名在6到16位之间",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},methods:{resetForm:function(e){this.$refs[e].resetFields()},submitForm:function(e){var r=this;this.$refs[e].validate(function(e){if(!e)return!1;var t=r.loginForm;s.a.userLogin(t).then(function(e){if(e.success){r.$message({type:"success",message:"登录成功"});var t=e.token,s=e.username;r.$store.dispatch("UserLogin",t),r.$store.dispatch("UserName",s);var o=decodeURIComponent(r.$route.query.redirect||"/");r.$router.push({path:o})}else!1===e.success&&r.$message({type:"info",message:e.info})})})}}},a=t("F8we"),n=Object(a.a)(o,function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("el-row",[t("el-col",{attrs:{span:10,offset:7}},[t("el-tabs",{model:{value:e.activeName,callback:function(r){e.activeName=r},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"登录",name:"login"}},[t("el-form",{ref:"loginForm",attrs:{model:e.loginForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"用户名",prop:"username"}},[t("el-input",{model:{value:e.loginForm.username,callback:function(r){e.$set(e.loginForm,"username",r)},expression:"loginForm.username"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{type:"password"},model:{value:e.loginForm.password,callback:function(r){e.$set(e.loginForm,"password",r)},expression:"loginForm.password"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("loginForm")}}},[e._v("提交")]),e._v(" "),t("el-button",{on:{click:function(r){return e.resetForm("loginForm")}}},[e._v("重置")])],1)],1)],1),e._v(" "),t("el-tab-pane",{attrs:{label:"注册",name:"register"}},[t("Register")],1)],1)],1)],1)],1)},[],!1,null,"881908c4",null);r.default=n.exports}}]);
//# sourceMappingURL=4.abae0a7750676dbf9072.js.map