(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2abbed94"],{"58a9":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"create-password"},[e("Content",[e("h1",{staticClass:"h4 text-center mb-6"},[t._v("Create new password")]),e("CreatePassword",{on:{submit:t.changePassword}})],1)],1)},s=[],o=(e("ac1f"),e("5319"),e("f3f3")),i=e("96b5"),n=e("51e0"),d=e("2f62"),u={components:{CreatePassword:i["a"],Content:n["a"]},computed:Object(o["a"])({},Object(d["b"])({getProfile:"auth/getProfile",getSecurityCode:"auth/getSecurityCode",getRedirectAuth:"auth/getRedirectAuth"})),methods:{changePassword:function(t){var a=this,e={password:t.password,code:this.getSecurityCode};this.$store.dispatch("auth/newPassword",{formData:e,userId:this.getProfile.id}).then((function(){a.$router.replace(a.getRedirectAuth)}))}}},m=u,c=e("2877"),p=Object(c["a"])(m,r,s,!1,null,null,null);a["default"]=p.exports},"96b5":function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("form",{staticClass:"form"},[e("div",{staticClass:"form-group",class:{"form-group-error":t.$v.formData.password.$error}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.password,expression:"formData.password"}],staticClass:"form__input",attrs:{placeholder:"Password",type:"password"},domProps:{value:t.formData.password},on:{input:function(a){a.target.composing||t.$set(t.formData,"password",a.target.value)}}}),t.$v.formData.password.$error?[t.$v.formData.password.required?t._e():e("div",{staticClass:"form__input-error"},[t._v(" Field is required ")]),t.$v.formData.password.minLength?t._e():e("div",{staticClass:"form__input-error"},[t._v(" Password must have at least "+t._s(t.$v.formData.password.$params.minLength.min)+" letters ")])]:t._e()],2),e("div",{staticClass:"form-group",class:{"form-group-error":t.$v.formData.repeatPassword.$error}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.repeatPassword,expression:"formData.repeatPassword"}],staticClass:"form__input",attrs:{placeholder:"Confirm password",type:"password"},domProps:{value:t.formData.repeatPassword},on:{input:function(a){a.target.composing||t.$set(t.formData,"repeatPassword",a.target.value)}}}),t.$v.formData.repeatPassword.$error?[t.$v.formData.repeatPassword.sameAsPassword?t._e():e("div",{staticClass:"form__input-error"},[t._v(" Passwords must be identical ")])]:t._e()],2),e("div",{staticClass:"form-group form-group_submit"},[e("button",{staticClass:"button button_w-100 button_theme-default button_size-m",on:{click:function(a){return a.preventDefault(),t.changePassword(a)}}},[t._v(" Create ")])])])},s=[],o=e("1dce"),i=e("b5ae"),n=i.required,d=i.sameAs,u=i.minLength,m={components:{},name:"CreatePassword",mixins:[o["validationMixin"]],validations:{formData:{password:{required:n,minLength:u(4)},repeatPassword:{sameAsPassword:d("password")}}},data:function(){return{formData:{password:null,repeatPassword:null}}},computed:{},methods:{changePassword:function(){this.$v.$touch(),this.$v.$invalid||this.$emit("submit",this.formData)}}},c=m,p=e("2877"),l=Object(p["a"])(c,r,s,!1,null,null,null);a["a"]=l.exports}}]);
//# sourceMappingURL=chunk-2abbed94.438e48ef.js.map