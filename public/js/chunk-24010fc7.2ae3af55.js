(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-24010fc7"],{"0c01":function(t,e,r){},1148:function(t,e,r){"use strict";var a=r("a691"),n=r("1d80");t.exports="".repeat||function(t){var e=String(n(this)),r="",o=a(t);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(r+=e);return r}},"13d5":function(t,e,r){"use strict";var a=r("23e7"),n=r("d58f").left,o=r("a640"),i=r("ae40"),s=o("reduce"),l=i("reduce",{1:0});a({target:"Array",proto:!0,forced:!s||!l},{reduce:function(t){return n(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"13d9":function(t,e){t.exports=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,r=[],a=0;a<t.rangeCount;a++)r.push(t.getRangeAt(a));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){"Caret"===t.type&&t.removeAllRanges(),t.rangeCount||r.forEach((function(e){t.addRange(e)})),e&&e.focus()}}},"3de6":function(t,e,r){},"408a":function(t,e,r){var a=r("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=a(t))throw TypeError("Incorrect invocation");return+t}},"4b5f":function(t,e,r){"use strict";var a=r("0c01"),n=r.n(a);n.a},5423:function(t,e,r){},"59f7":function(t,e,r){"use strict";var a=r("c29a"),n=r.n(a);n.a},"762c":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"report"},[r("Content",[t.isOthersAmount?t._e():r("div",{staticClass:"report-notifications"},[t._v(" To keep responses anonymous and honest, I will wait until I have received at least 4 responses before I send your first results and will update you as I receive more ")]),r("h1",{staticClass:"h4 text-center mb-1"},[t._v("Well done "+t._s(t.getProfile.name)+"!")]),r("h2",{staticClass:"text mb-5 text-center"},[t._v("Here’s your first report")]),t.getGuessedCard?[r("div",{staticClass:"h5 mb-4"},[t._v(" You guessed you are ")]),r("Card",{attrs:{title:t.getGuessedCard.title,showText:t.getGuessedCard.showText,hideText:t.getGuessedCard.hideText,tag:t.getGuessedCard.tag,img:t.getGuessedCard.src}})]:t._e(),t.getCard?[r("div",{staticClass:"h5 mb-4"},[t._v(" Based on your answers ")]),r("Card",{attrs:{title:t.getCard.title,showText:t.getCard.showText,hideText:t.getCard.hideText,img:t.getCard.src,tag:t.getCard.tag}})]:t._e(),t.isOthersAmount?[r("div",{staticClass:"h5 mb-4"},[t._v(" Based on answers from your contacts ")]),r("Card",{attrs:{title:t.getCardOthersAverage.title,showText:t.getCardOthersAverage.showText,hideText:t.getCardOthersAverage.hideText,img:t.getCardOthersAverage.src,tag:t.getCardOthersAverage.tag,defaultOpen:!0}})]:t._e(),r("div",{staticClass:"diagram mb-5"},[t.respondentsCount?r("div",{staticClass:"diagram__title-with-respondents mb-3"},[r("div",{staticClass:"report__respondents"},[r("svg",{staticClass:"report__respondents-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 12.42 15.93"}},[r("circle",{attrs:{fill:"none",stroke:"#999","stroke-miterlimit":"10",cx:"6.21",cy:"4",r:"3.91"}}),r("path",{attrs:{fill:"none",stroke:"#999","stroke-miterlimit":"10",d:"M2.29,16a5.71,5.71,0,0,1,11.34-.92,5.62,5.62,0,0,1,.08.92",transform:"translate(-1.79 -0.07)"}})]),t._v(" Respondents: "+t._s(t.respondentsCount)+" ")])]):t._e(),r("Radar",{attrs:{data:t.radarData}})],1),r("b-modal",{attrs:{id:"modal-multi-1","modal-class":"modal-sticky-bottom","hide-footer":""},scopedSlots:t._u([{key:"modal-title",fn:function(){return[t._v(" Crowdsource your Work Persona ")]},proxy:!0}])},[r("p",{staticClass:"text mb-3"},[t._v(' Your report so far is what you think your personality is. This is called your Anima. The "you" that others experience is called your Persona. We can find out what your Work Persona is by asking people you work or have worked with to answer questions about you. ')]),r("p",{staticClass:"text mb-3"},[t._v(" Share the link with your colleagues - they can answer a similar questionnaire about you and remain totally anonymous. We do this so they are more open and honest than they might be if you asked them directly. ")]),r("p",{staticClass:"text mb-4"},[t._v(" You need to get at least 4 responses for us to show the anonymised results. We will continue to update you as we receive more responses. ")]),r("InputCopy",{staticClass:"mb-4",model:{value:t.shareLink,callback:function(e){t.shareLink=e},expression:"shareLink"}})],1),r("FeedbackModal",{model:{value:t.showReportModal,callback:function(e){t.showReportModal=e},expression:"showReportModal"}}),r("button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-multi-1",modifiers:{"modal-multi-1":!0}}],staticClass:"button button_w-100 button_theme-default button_size-m"},[t._v(" Ask Colleagues ")])],2)],1)},n=[],o=(r("99af"),r("7db0"),r("b0c0"),r("07ac"),r("f3f3")),i=r("ad01"),s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"form__input-copy"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.getValue,expression:"getValue"}],staticClass:"form__input form__input-copy",attrs:{placeholder:"Link",type:"text"},domProps:{value:t.getValue},on:{input:function(e){e.target.composing||(t.getValue=e.target.value)}}}),r("button",{staticClass:"form__button-copy",attrs:{type:"button"},on:{click:t.copyInputData}},[r("svg",{attrs:{width:"24px",height:"24px",viewBox:"0 0 24 24",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[r("g",{attrs:{id:"Wireframes",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"}},[r("g",{attrs:{id:"report---share-modal",transform:"translate(-307.000000, -623.000000)"}},[r("g",{attrs:{id:"input-copy",transform:"translate(24.000000, 603.000000)"}},[r("g",{attrs:{id:"icon-copy",transform:"translate(283.000000, 20.000000)"}},[r("polygon",{attrs:{id:"Path",points:"0 0 24 0 24 24 0 24"}}),r("path",{attrs:{d:"M7,6 L7,3 C7,2.44771525 7.44771525,2 8,2 L20,2\n                  C20.5522847,2 21,2.44771525 21,3 L21,17 C21,17.5522847\n                  20.5522847,18 20,18 L17,18 L17,21 C17,21.552 16.55,22.000018\n                  15.993,22.000018 L4.007,22.000018 C3.74065346,22.0015966 3.48465319,21.8969771\n                  3.29565863,21.7092963 C3.10666406,21.5216155 3.0002613,21.2663512 3,21\n                  L3.003,7 C3.003,6.448 3.453,6 4.01,6 L7,6 Z M5.003,8 L5,20 L15,20 L15,8\n                  L5.003,8 Z M9,6 L17,6 L17,16 L19,16 L19,4 L9,4 L9,6 Z",id:"Shape",fill:"#999999","fill-rule":"nonzero"}})])])])])])])])},l=[],u=r("f904"),c=r.n(u),d={props:{value:{type:String}},computed:{getValue:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},methods:{copyInputData:function(){c()(this.value),this.$notify({type:"success",title:"Link copied"})}}},h=d,f=(r("8d06"),r("2877")),g=Object(f["a"])(h,s,l,!1,null,null,null),p=g.exports,m=r("51e0"),v=r("a2ba"),y=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-modal",{attrs:{"modal-class":"text-center","hide-footer":""},model:{value:t.getModalShow,callback:function(e){t.getModalShow=e},expression:"getModalShow"}},[r("h3",{staticClass:"h5 mb-3"},[t._v(" "+t._s(t.formData.question1.question)+" ")]),r("StarRatingReport",{staticClass:"mb-5",model:{value:t.formData.question1.value,callback:function(e){t.$set(t.formData.question1,"value",e)},expression:"formData.question1.value"}}),r("h3",{staticClass:"h5 mb-3"},[t._v(" "+t._s(t.formData.question2.question)+" ")]),r("StarRatingReport",{staticClass:"mb-5",model:{value:t.formData.question2.value,callback:function(e){t.$set(t.formData.question2,"value",e)},expression:"formData.question2.value"}}),r("h3",{staticClass:"h5 mb-3"},[t._v(" "+t._s(t.formData.question3.question)+" ")]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.formData.question3.value,expression:"formData.question3.value"}],staticClass:"form__input mb-3",attrs:{placeholder:"Your message"},domProps:{value:t.formData.question3.value},on:{input:function(e){e.target.composing||t.$set(t.formData.question3,"value",e.target.value)}}}),t._v(" "),r("button",{staticClass:"button button_w-100 button_theme-default button_size-m",on:{click:t.sendFeedBack}},[t._v(" Send ")])],1)},b=[],w=(r("d81d"),r("45fc"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("star-rating",{directives:[{name:"touch",rawName:"v-touch:swipe.right",value:t.swipeSelectedRating,expression:"swipeSelectedRating",arg:"swipe",modifiers:{right:!0}}],ref:"rating",attrs:{increment:.5,rating:t.getRating,"border-color":"#7811C9","active-color":"#7811C9","inactive-color":"#fff","border-width":6,"star-size":40},on:{"rating-selected":t.selectedRating}})}),C=[],R=(r("a9e3"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:["vue-star-rating",{"vue-star-rating-rtl":t.rtl},{"vue-star-rating-inline":t.inline}]},[r("div",{staticClass:"vue-star-rating",on:{mouseleave:t.resetRating}},[t._l(t.maxRating,(function(e){return r("span",{key:e,class:[{"vue-star-rating-pointer":!t.readOnly},"vue-star-rating-star"],style:{"margin-right":t.margin+"px"}},[r("star",{attrs:{fill:t.fillLevel[e-1],size:t.starSize,points:t.starPoints,"star-id":e,step:t.step,"active-color":t.activeColor,"inactive-color":t.inactiveColor,"border-color":t.borderColor,"border-width":t.borderWidth,"rounded-corners":t.roundedCorners,rtl:t.rtl,glow:t.glow,"glow-color":t.glowColor},on:{"star-selected":function(e){return t.setRating(e,!0)},"star-mouse-move":t.setRating}})],1)})),t.showRating?r("span",{class:["vue-star-rating-rating-text",t.textClass]},[t._v(" "+t._s(t.formattedRating))]):t._e()],2)])}),x=[],k=(r("b680"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("svg",{staticClass:"vue-star-rating-star",attrs:{height:t.getSize,width:t.getSize,viewBox:t.viewBox},on:{mousemove:t.mouseMoving,click:t.selected}},[r("linearGradient",{attrs:{id:t.grad,x1:"0",x2:"100%",y1:"0",y2:"0"}},[r("stop",{attrs:{offset:t.getFill,"stop-color":t.rtl?t.inactiveColor:t.activeColor}}),r("stop",{attrs:{offset:t.getFill,"stop-color":t.rtl?t.activeColor:t.inactiveColor}})],1),r("filter",{attrs:{id:t.glowId,height:"130%",width:"130%",filterUnits:"userSpaceOnUse"}},[r("feGaussianBlur",{attrs:{stdDeviation:t.glow,result:"coloredBlur"}}),r("feMerge",[r("feMergeNode",{attrs:{in:"coloredBlur"}}),r("feMergeNode",{attrs:{in:"SourceGraphic"}})],1)],1),r("polygon",{directives:[{name:"show",rawName:"v-show",value:t.fill>1,expression:"fill > 1"}],attrs:{points:t.starPointsToString,fill:t.getGradId,stroke:t.glowColor,filter:"url(#"+this.glowId+")"}}),r("polygon",{attrs:{points:t.starPointsToString,fill:t.getGradId,stroke:t.getBorderColor,"stroke-width":t.border,"stroke-linejoin":t.roundedCorners?"round":"miter"}}),r("polygon",{attrs:{points:t.starPointsToString,fill:t.getGradId}})],1)}),S=[],_=(r("cb29"),r("a15b"),r("13d5"),r("d3b7"),r("25f0"),{props:{fill:{type:Number,default:0},points:{type:Array,default:function(){return[]}},size:{type:Number,default:50},starId:{type:Number,required:!0},activeColor:{type:String,required:!0},inactiveColor:{type:String,required:!0},borderColor:{type:String,default:"#000"},borderWidth:{type:Number,default:0},roundedCorners:{type:Boolean,default:!1},rtl:{type:Boolean,default:!1},glow:{type:Number,default:0},glowColor:{type:String,required:!1}},created:function(){this.starPoints=this.points.length?this.points:this.starPoints,this.calculatePoints(),this.grad=this.getRandomId(),this.glowId=this.getRandomId()},computed:{starPointsToString:function(){return this.starPoints.join(",")},getGradId:function(){return"url(#".concat(this.grad,")")},getSize:function(){var t=this.roundedCorners&&this.borderWidth<=0?parseInt(this.size)-parseInt(this.border):this.size;return parseInt(t)+parseInt(this.border)},getFill:function(){return this.rtl?"".concat(100-this.fill,"%"):"".concat(this.fill,"%")},border:function(){return this.roundedCorners&&this.borderWidth<=0?6:this.borderWidth},getBorderColor:function(){return this.roundedCorners&&this.borderWidth<=0?this.fill<=0?this.inactiveColor:this.activeColor:this.borderColor},maxSize:function(){return this.starPoints.reduce((function(t,e){return Math.max(t,e)}))},viewBox:function(){return"0 0 ".concat(this.maxSize," ").concat(this.maxSize)}},methods:{mouseMoving:function(t){this.$emit("star-mouse-move",{event:t,position:this.getPosition(t),id:this.starId})},getPosition:function(t){var e=.92*this.size,r=this.rtl?Math.min(t.offsetX,45):Math.max(t.offsetX,1),a=Math.round(100/e*r);return Math.min(a,100)},selected:function(t){this.$emit("star-selected",{id:this.starId,position:this.getPosition(t)})},getRandomId:function(){return Math.random().toString(36).substring(7)},calculatePoints:function(){var t=this;this.starPoints=this.starPoints.map((function(e){return t.size/t.maxSize*e+1.5*t.border}))}},data:function(){return{starPoints:[19.8,2.2,6.6,43.56,39.6,17.16,0,17.16,33,43.56],grad:"",glowId:""}}}),D=_,P=(r("cd18"),Object(f["a"])(D,k,S,!1,null,"a2341b4e",null)),O=P.exports,M={components:{star:O},model:{prop:"rating",event:"rating-selected"},props:{increment:{type:Number,default:1},rating:{type:Number,default:0},roundStartRating:{type:Boolean,default:!0},activeColor:{type:String,default:"#ffd055"},inactiveColor:{type:String,default:"#d8d8d8"},maxRating:{type:Number,default:5},starPoints:{type:Array,default:function(){return[]}},starSize:{type:Number,default:50},showRating:{type:Boolean,default:!0},readOnly:{type:Boolean,default:!1},textClass:{type:String,default:""},inline:{type:Boolean,default:!1},borderColor:{type:String,default:"#999"},borderWidth:{type:Number,default:0},roundedCorners:{type:Boolean,default:!1},padding:{type:Number,default:0},rtl:{type:Boolean,default:!1},fixedPoints:{type:Number,default:null},glow:{type:Number,default:0},glowColor:{type:String,default:"#fff"}},created:function(){this.step=100*this.increment,this.currentRating=this.rating,this.selectedRating=this.currentRating,this.createStars(this.roundStartRating)},methods:{setRating:function(t,e){if(!this.readOnly){var r=this.rtl?(100-t.position)/100:t.position/100;this.currentRating=(t.id+r-1).toFixed(2),this.currentRating=this.currentRating>this.maxRating?this.maxRating:this.currentRating,this.createStars(),e?(this.selectedRating=this.currentRating,this.$emit("rating-selected",this.selectedRating),this.ratingSelected=!0):this.$emit("current-rating",this.currentRating)}},resetRating:function(){this.readOnly||(this.currentRating=this.selectedRating,this.createStars(this.shouldRound))},createStars:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];t&&this.round();for(var e=0;e<this.maxRating;e++){var r=0;e<this.currentRating&&(r=this.currentRating-e>1?100:100*(this.currentRating-e)),this.$set(this.fillLevel,e,Math.round(r))}},round:function(){var t=1/this.increment;this.currentRating=Math.min(this.maxRating,Math.ceil(this.currentRating*t)/t)}},computed:{formattedRating:function(){return null===this.fixedPoints?this.currentRating:this.currentRating.toFixed(this.fixedPoints)},shouldRound:function(){return this.ratingSelected||this.roundStartRating},margin:function(){return this.padding+this.borderWidth}},watch:{rating:function(t){this.currentRating=t,this.selectedRating=t,this.createStars(this.shouldRound)}},data:function(){return{step:0,fillLevel:[],currentRating:0,selectedRating:0,ratingSelected:!1}}},q=M,I=(r("4b5f"),Object(f["a"])(q,R,x,!1,null,"977758e6",null)),A=I.exports,T={components:{StarRating:A},props:{value:{type:Number}},computed:{getRating:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},methods:{selectedRating:function(t){this.getRating=t},swipeSelectedRating:function(){this.getRating=this.$refs.rating.currentRating}}},L=T,B=(r("59f7"),Object(f["a"])(L,w,C,!1,null,null,null)),N=B.exports,E=r("2f62"),j={components:{StarRatingReport:N},props:{value:{type:Boolean,default:!1}},data:function(){return{formData:{question1:{type:"rating",question:"Did you find the app gave you new insight into your personality?",value:0},question2:{type:"rating",question:"Thanks you!  Let us know what we can do to be even better\nor if you would like us to contact you?",value:0},question3:{type:"textarea",question:"What can we do to improve?",value:""}}}},computed:Object(o["a"])(Object(o["a"])({},Object(E["b"])({getProfile:"auth/getProfile"})),{},{getModalShow:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}),watch:{"formData.question2.value":{handler:function(){this.formData.question3.question=this.getQuestionsByRating()}}},methods:{getQuestionsByRating:function(){var t=this.formData.question2.value,e="";switch(!0){case t<=3:e="What can we do to improve?";break;case t>=3.5&&t<=4:e="What was the reason for your score?";break;case t>4:e="Thank you!  Let us know what we can do to be even better or if you would like us to contact you?";break;default:e="What can we do to improve?";break}return e},objIsEmpty:function(t){var e=!0;return Object.values(t).some((function(t){if(t.value)return e=!1,!0})),e},prepareDatForRequest:function(){return{feedbackId:"PERSONALITY_MBIT_FEEDBACK",U1:this.getProfile.name,items:Object.values(this.formData).map((function(t,e){return{id:e+1,question:t.question,answer:t.value}}))}},sendFeedBack:function(){var t=this.objIsEmpty(this.formData);if(t)this._showErrorNotify("Rating is empty");else{var e=this.prepareDatForRequest();this.$store.dispatch("auth/setCompletedFeedbackRequest",e),this.getModalShow=!1}}}},F=j,$=Object(f["a"])(F,y,b,!1,null,null,null),z=$.exports,W=r("5a50"),G={components:{Card:i["a"],InputCopy:p,Content:m["a"],Radar:v["a"],FeedbackModal:z},name:"Report",data:function(){return{radarData:[{value:[],areaStyle:{color:"rgba(120, 17, 200, 0.5)"},itemStyle:{color:"rgba(120, 17, 200, 0.8)"},symbol:"none",name:"Me"},{value:[],type:"radar",areaStyle:{color:"rgba(255, 0, 0, 0.5)"},itemStyle:{color:"rgba(255, 0, 0, 0.8)"},symbol:"none",name:"Others"}],respondentsCount:null,shareLink:null,tag:null,tagOthersAverage:null,showReportModal:!1}},computed:Object(o["a"])(Object(o["a"])({},Object(E["b"])({getProfile:"auth/getProfile"})),{},{isOthersAmount:function(){return this.respondentsCount>3},getCard:function(){return this.tag?W["a"].cards[this.tag]:null},getCardOthersAverage:function(){return this.tagOthersAverage?W["a"].cards[this.tagOthersAverage]:null},getGuessedCard:function(){return this.tag?W["a"].cards[this.getProfile.selfPersonalityType]:null}}),created:function(){this.fetchPersonalityTypeReport()},methods:{fetchPersonalityTypeReport:function(){var t=this;this.$api.personalityTypeReport.fetchPersonalityTypeReport().then((function(e){t.respondentsCount=e.othersAmount,t.setRadar(e.self,"Me"),t.isOthersAmount&&t.setRadar(e.othersAverage,"Others"),t.showFeedBackModalByParams(e.othersAmount),t.tag=e.selfResult,t.tagOthersAverage=e.othersAverageResult,t.shareLink="".concat(window.location.host).concat(e.invitationLink)}))},setRadar:function(t,e){var r=this.radarData.find((function(t){return t.name===e}));r.value=Object.values(t)},showFeedBackModalByParams:function(){var t=this.isOthersAmount,e=this.getProfile.completedFeedbacks.length;!e&&t&&this.setShowReportModal(!0)},setShowReportModal:function(t){this.showReportModal=t}}},U=G,V=(r("99cd"),Object(f["a"])(U,a,n,!1,null,null,null));e["default"]=V.exports},"81d5":function(t,e,r){"use strict";var a=r("7b0b"),n=r("23cb"),o=r("50c4");t.exports=function(t){var e=a(this),r=o(e.length),i=arguments.length,s=n(i>1?arguments[1]:void 0,r),l=i>2?arguments[2]:void 0,u=void 0===l?r:n(l,r);while(u>s)e[s++]=t;return e}},"8d06":function(t,e,r){"use strict";var a=r("5423"),n=r.n(a);n.a},"99cd":function(t,e,r){"use strict";var a=r("c094"),n=r.n(a);n.a},a15b:function(t,e,r){"use strict";var a=r("23e7"),n=r("44ad"),o=r("fc6a"),i=r("a640"),s=[].join,l=n!=Object,u=i("join",",");a({target:"Array",proto:!0,forced:l||!u},{join:function(t){return s.call(o(this),void 0===t?",":t)}})},b680:function(t,e,r){"use strict";var a=r("23e7"),n=r("a691"),o=r("408a"),i=r("1148"),s=r("d039"),l=1..toFixed,u=Math.floor,c=function(t,e,r){return 0===e?r:e%2===1?c(t,e-1,r*t):c(t*t,e/2,r)},d=function(t){var e=0,r=t;while(r>=4096)e+=12,r/=4096;while(r>=2)e+=1,r/=2;return e},h=l&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!s((function(){l.call({})}));a({target:"Number",proto:!0,forced:h},{toFixed:function(t){var e,r,a,s,l=o(this),h=n(t),f=[0,0,0,0,0,0],g="",p="0",m=function(t,e){var r=-1,a=e;while(++r<6)a+=t*f[r],f[r]=a%1e7,a=u(a/1e7)},v=function(t){var e=6,r=0;while(--e>=0)r+=f[e],f[e]=u(r/t),r=r%t*1e7},y=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==f[t]){var r=String(f[t]);e=""===e?r:e+i.call("0",7-r.length)+r}return e};if(h<0||h>20)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return String(l);if(l<0&&(g="-",l=-l),l>1e-21)if(e=d(l*c(2,69,1))-69,r=e<0?l*c(2,-e,1):l/c(2,e,1),r*=4503599627370496,e=52-e,e>0){m(0,r),a=h;while(a>=7)m(1e7,0),a-=7;m(c(10,a,1),0),a=e-1;while(a>=23)v(1<<23),a-=23;v(1<<a),m(1,1),v(2),p=y()}else m(0,r),m(1<<-e,0),p=y()+i.call("0",h);return h>0?(s=p.length,p=g+(s<=h?"0."+i.call("0",h-s)+p:p.slice(0,s-h)+"."+p.slice(s-h))):p=g+p,p}})},c094:function(t,e,r){},c29a:function(t,e,r){},cb29:function(t,e,r){var a=r("23e7"),n=r("81d5"),o=r("44d2");a({target:"Array",proto:!0},{fill:n}),o("fill")},cd18:function(t,e,r){"use strict";var a=r("3de6"),n=r.n(a);n.a},d58f:function(t,e,r){var a=r("1c0b"),n=r("7b0b"),o=r("44ad"),i=r("50c4"),s=function(t){return function(e,r,s,l){a(r);var u=n(e),c=o(u),d=i(u.length),h=t?d-1:0,f=t?-1:1;if(s<2)while(1){if(h in c){l=c[h],h+=f;break}if(h+=f,t?h<0:d<=h)throw TypeError("Reduce of empty array with no initial value")}for(;t?h>=0:d>h;h+=f)h in c&&(l=r(l,c[h],h,u));return l}};t.exports={left:s(!1),right:s(!0)}},f904:function(t,e,r){"use strict";var a=r("13d9"),n={"text/plain":"Text","text/html":"Url",default:"Text"},o="Copy to clipboard: #{key}, Enter";function i(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function s(t,e){var r,s,l,u,c,d,h=!1;e||(e={}),r=e.debug||!1;try{l=a(),u=document.createRange(),c=document.getSelection(),d=document.createElement("span"),d.textContent=t,d.style.all="unset",d.style.position="fixed",d.style.top=0,d.style.clip="rect(0, 0, 0, 0)",d.style.whiteSpace="pre",d.style.webkitUserSelect="text",d.style.MozUserSelect="text",d.style.msUserSelect="text",d.style.userSelect="text",d.addEventListener("copy",(function(a){if(a.stopPropagation(),e.format)if(a.preventDefault(),"undefined"===typeof a.clipboardData){r&&console.warn("unable to use e.clipboardData"),r&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var o=n[e.format]||n["default"];window.clipboardData.setData(o,t)}else a.clipboardData.clearData(),a.clipboardData.setData(e.format,t);e.onCopy&&(a.preventDefault(),e.onCopy(a.clipboardData))})),document.body.appendChild(d),u.selectNodeContents(d),c.addRange(u);var f=document.execCommand("copy");if(!f)throw new Error("copy command was unsuccessful");h=!0}catch(g){r&&console.error("unable to copy using execCommand: ",g),r&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),h=!0}catch(g){r&&console.error("unable to copy using clipboardData: ",g),r&&console.error("falling back to prompt"),s=i("message"in e?e.message:o),window.prompt(s,t)}}finally{c&&("function"==typeof c.removeRange?c.removeRange(u):c.removeAllRanges()),d&&document.body.removeChild(d),l()}return h}t.exports=s}}]);
//# sourceMappingURL=chunk-24010fc7.2ae3af55.js.map