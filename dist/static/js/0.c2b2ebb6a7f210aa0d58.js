(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"A0++":function(e,t,u){"use strict";var s=u("YB6v");u.n(s).a},DV5s:function(e,t,u){"use strict";var s=u("Asgo"),n=u.n(s),o=u("f0Pt"),a=u.n(o),r=u("oYx3"),i=u("KEZ+");a.a.defaults.timeout=6e3,a.a.defaults.headers.post["Content-Type"]="application/json;charset=UTF-8";var l=a.a.create();l.defaults.headers.post["Content-Type"]="application/json;charset=UTF-8",a.a.interceptors.request.use=l.interceptors.request.use,l.interceptors.request.use(function(e){return i.a.state.token&&(e.headers.Authorization="token "+i.a.state.token),e},function(e){return n.a.reject(e)}),l.interceptors.response.use(function(e){return e.data},function(e){return e.response&&401===e.response.status&&(i.a.dispatch("UserLogout"),r.a.push({path:"login",query:{redirect:r.a.currentRoute.fullPath}})),n.a.reject(e.response)}),t.a={userRegister:function(e){return l.post("/api/user/register",e)},userLogin:function(e){return l.post("/api/user/login",e)},getUser:function(){return l.get("/api/user")},delUser:function(e){return l.post("/api/delUser",e)}}},EQa9:function(e,t,u){},Frjt:function(e,t,u){"use strict";var s=u("EQa9");u.n(s).a},"KEZ+":function(e,t,u){"use strict";var s,n=u("uwZQ"),o=u("UsFw"),a=u("/umX"),r=u.n(a),i=(s={},r()(s,"LOGIN",function(e,t){e.token=t,window.localStorage.setItem("token",t)}),r()(s,"LOGOUT",function(e){e.token=null,window.localStorage.removeItem("token")}),r()(s,"USERNAME",function(e,t){e.username=t,window.localStorage.setItem("username",t)}),s),l={UserLogin:function(e,t){(0,e.commit)("LOGIN",t)},UserLogout:function(e){var t=e.commit;console.log("vvvvvvv"),t("LOGOUT")},UserName:function(e,t){(0,e.commit)("USERNAME",t)}};n.default.use(o.a);var c={token:window.localStorage.getItem("token"),username:""};t.a=new o.a.Store({state:c,mutations:i,actions:l})},"Tcu/":function(e,t,u){},Vtdi:function(e,t,u){"use strict";u.r(t);var s=u("uwZQ"),n={name:"App"},o=(u("A0++"),u("F8we")),a=Object(o.a)(n,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},[],!1,null,null,null).exports,r=u("oYx3"),i=(u("Tcu/"),u("Juid")),l=(u("UZe8"),u("KEZ+"));s.default.use(i.Popover),s.default.use(i.DatePicker),s.default.use(i.Tooltip),s.default.use(i.Card),s.default.use(i.Step),s.default.use(i.Steps),s.default.use(i.Collapse),s.default.use(i.CollapseItem),s.default.use(i.Submenu),s.default.use(i.Menu),s.default.use(i.MenuItem),s.default.use(i.MenuItemGroup),s.default.use(i.TableColumn),s.default.use(i.Table),s.default.use(i.Tag),s.default.use(i.Button),s.default.use(i.Input),s.default.use(i.Radio),s.default.use(i.RadioGroup),s.default.use(i.Select),s.default.use(i.OptionGroup),s.default.use(i.Option),s.default.use(i.Checkbox),s.default.use(i.CheckboxGroup),s.default.use(i.Form),s.default.use(i.FormItem),s.default.use(i.Dialog),s.default.use(i.Pagination),s.default.use(i.Tabs),s.default.use(i.Row),s.default.use(i.Col),s.default.use(i.Breadcrumb),s.default.use(i.BreadcrumbItem),s.default.use(i.Container),s.default.use(i.Aside),s.default.use(i.Header),s.default.use(i.Main),s.default.use(i.Dropdown),s.default.use(i.DropdownItem),s.default.use(i.DropdownMenu),s.default.use(i.Icon),s.default.use(i.TabPane),s.default.use(i.Carousel),s.default.use(i.CarouselItem),s.default.use(i.Loading.directive),s.default.use(i.Progress),s.default.use(i.ButtonGroup),s.default.use(i.Switch),s.default.use(i.InputNumber),s.default.use(i.TimePicker),s.default.prototype.$message=i.Message,s.default.prototype.$msgbox=i.MessageBox,s.default.prototype.$alert=i.MessageBox.alert,s.default.prototype.$confirm=i.MessageBox.confirm,s.default.prototype.$prompt=i.MessageBox.prompt,s.default.config.productionTip=!1,new s.default({el:"#app",router:r.a,store:l.a,components:{App:a},template:"<App/>"})},YB6v:function(e,t,u){},oYx3:function(e,t,u){"use strict";var s=u("uwZQ"),n=u("CBof"),o=u("KEZ+"),a=u("DV5s"),r={data:function(){return{users:""}},created:function(){this.getUsers()},methods:{getUsers:function(){var e=this;a.a.getUser().then(function(t){t.success&&(e.users=t.result)})},del_user:function(e,t){var u=this,s={id:this.users[e]._id};a.a.delUser(s).then(function(t){u.$message({type:"success",message:"删除成功"}),u.users.splice(e,1)}).catch(function(e){console.log(e)})},logout:function(){this.$store.dispatch("UserLogout"),this.$store.state.token?this.$message({type:"info",message:"登出失败"}):(this.$router.push("/login"),this.$message({type:"success",message:"登出成功"}))}}},i=(u("Frjt"),u("F8we")),l=Object(i.a)(r,function(){var e=this,t=e.$createElement,u=e._self._c||t;return u("div",{staticClass:"hello"},[u("ul",e._l(e.users,function(t,s){return u("li",{key:t._id},[e._v("\n      "+e._s(s+1)+"."+e._s(t.username)+"\n      "),u("el-button",{on:{click:function(t){return e.del_user(s,t)}}},[e._v("删除")])],1)}),0),e._v(" "),u("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.logout()}}},[e._v("登出")])],1)},[],!1,null,"88d1b6d4",null).exports;s.default.use(n.a);var c=new n.a({mode:"history",routes:[{path:"/",name:"Hello",component:l,meta:{requiresAuth:!0}},{path:"/login",name:"login",component:function(e){u.e(3).then(function(){e(u("V4qv"))}.bind(null,u)).catch(u.oe)}},{path:"/register",name:"Register",component:function(e){u.e(5).then(function(){e(u("H+u6"))}.bind(null,u)).catch(u.oe)}},{path:"*",name:"error",component:function(e){u.e(4).then(function(){e(u("d0Yx"))}.bind(null,u)).catch(u.oe)}}]});c.beforeEach(function(e,t,u){var s=o.a.state.token;e.meta.requiresAuth?s?u():u({path:"/login",query:{redirect:e.fullPath}}):u()});t.a=c}},[["Vtdi",1,2]]]);
//# sourceMappingURL=0.c2b2ebb6a7f210aa0d58.js.map