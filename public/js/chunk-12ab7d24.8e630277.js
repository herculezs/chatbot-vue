(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12ab7d24"],{"1a4e":function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"form-group",class:{"form-group-error":t.validPhone.$error}},[o("vue-tel-input",{staticClass:"form__input-tel",class:t.getClassByLengthCountryCode,attrs:{defaultCountry:"GB",placeholder:"65 243 236",enabledCountryCode:"",validCharactersOnly:""},on:{input:t.changeTel,"country-changed":t.countryChanged},model:{value:t.getPhone,callback:function(e){t.getPhone=e},expression:"getPhone"}},[o("template",{slot:"arrow-icon"},[o("span",{staticClass:"form__input-tel-arrow-icon"},[t._v(" ⌄ ")])])],2),t.validPhone.$error?[t.validPhone.required?t._e():o("div",{staticClass:"form__input-error"},[t._v(" Field is required ")])]:t._e()],2)},r=[],n={props:{value:{type:String},diaCode:{type:String},validPhone:{type:Object}},computed:{getClassByLengthCountryCode:function(){return"code-length-".concat(this.diaCode.length)},getPhone:{get:function(){return this.value},set:function(t){return this.$emit("input",t)}}},methods:{changeTel:function(t,e){this.$emit("input",e.number.input)},countryChanged:function(t){this.$emit("onDiaCode",t)}}},s=n,i=(o("399f"),o("2877")),u=Object(i["a"])(s,a,r,!1,null,null,null);e["a"]=u.exports},"259a":function(t,e,o){},"399f":function(t,e,o){"use strict";var a=o("259a"),r=o.n(a);r.a},a55b:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"reset-password"},[o("Content",[o("h1",{staticClass:"h4 text-center mb-6"},[t._v("Login")]),o("form",{staticClass:"form"},[o("TelInput",{attrs:{diaCode:t.diaCode,validPhone:t.$v.formData.phone},on:{onDiaCode:t.countryChanged},model:{value:t.formData.phone,callback:function(e){t.$set(t.formData,"phone",e)},expression:"formData.phone"}}),o("div",{staticClass:"form-group",class:{"form-group-error":t.$v.formData.password.$error}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.password,expression:"formData.password"}],staticClass:"form__input",attrs:{placeholder:"Password",type:"password"},domProps:{value:t.formData.password},on:{input:function(e){e.target.composing||t.$set(t.formData,"password",e.target.value)}}}),t.$v.formData.password.$error?[t.$v.formData.password.required?t._e():o("div",{staticClass:"form__input-error"},[t._v(" Field is required ")])]:t._e()],2),o("div",{staticClass:"form-group form-group_link"},[o("router-link",{staticClass:"link",attrs:{to:"/reset-password"}},[t._v("Forgot password?")])],1),o("div",{staticClass:"form-group form-group_submit"},[o("button",{staticClass:"form button button_w-100 button_theme-default button_size-m",on:{click:function(e){return e.preventDefault(),t.login(e)}}},[t._v(" Log in ")])])],1)])],1)},r=[],n=(o("99af"),o("ac1f"),o("5319"),o("f3f3")),s=o("1dce"),i=o("51e0"),u=o("1a4e"),l=o("2f62"),c=o("b5ae"),d=c.required,p={components:{Content:i["a"],TelInput:u["a"]},mixins:[s["validationMixin"]],validations:{formData:{phone:{required:d},password:{required:d}}},data:function(){return{formData:{phone:null,password:null},diaCode:""}},computed:Object(n["a"])(Object(n["a"])({},Object(l["b"])({getRedirectAuth:"auth/getRedirectAuth"})),{},{getClassByLengthCountryCode:function(){return"code-length-".concat(this.diaCode.length)}}),methods:{prepareDataForRequest:function(){var t="+".concat(this.diaCode).concat(this.formData.phone).replace(/\s/g,"");return{password:this.formData.password,phone:t}},countryChanged:function(t){this.diaCode=t.dialCode},login:function(){var t=this;if(this.$v.$touch(),!this.$v.$invalid){var e=this.prepareDataForRequest();this.$store.dispatch("auth/loginRequest",e).then((function(){t.$router.replace(t.getRedirectAuth)}))}}}},f=p,h=o("2877"),m=Object(h["a"])(f,a,r,!1,null,null,null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-12ab7d24.8e630277.js.map