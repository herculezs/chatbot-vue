(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a2549fc"],{"063e":function(e,t,o){e.exports=o.p+"img/step_1.f6a9e2b0.gif"},"1a4e":function(e,t,o){"use strict";var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"form-group",class:{"form-group-error":e.validPhone.$error}},[o("vue-tel-input",{staticClass:"form__input-tel",class:e.getClassByLengthCountryCode,attrs:{defaultCountry:"GB",placeholder:"65 243 236",enabledCountryCode:"",validCharactersOnly:""},on:{input:e.changeTel,"country-changed":e.countryChanged},model:{value:e.getPhone,callback:function(t){e.getPhone=t},expression:"getPhone"}},[o("template",{slot:"arrow-icon"},[o("span",{staticClass:"form__input-tel-arrow-icon"},[e._v(" ⌄ ")])])],2),e.validPhone.$error?[e.validPhone.required?e._e():o("div",{staticClass:"form__input-error"},[e._v(" Field is required ")])]:e._e()],2)},s=[],a={props:{value:{type:String},diaCode:{type:String},validPhone:{type:Object}},computed:{getClassByLengthCountryCode:function(){return"code-length-".concat(this.diaCode.length)},getPhone:{get:function(){return this.value},set:function(e){return this.$emit("input",e)}}},methods:{changeTel:function(e,t){this.$emit("input",t.number.input)},countryChanged:function(e){this.$emit("onDiaCode",e)}}},n=a,r=(o("399f"),o("2877")),l=Object(r["a"])(n,i,s,!1,null,null,null);t["a"]=l.exports},"259a":function(e,t,o){},"399f":function(e,t,o){"use strict";var i=o("259a"),s=o.n(i);s.a},"39b7":function(e,t,o){"use strict";var i=o("f53f"),s=o.n(i);s.a},cb26:function(e,t,o){e.exports=o.p+"img/step_2.cafbc398.gif"},cd56:function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"onBoarding"},[o("Content",[o("Onboarding")],1)],1)},s=[],a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"onBoarding-carousel"},[i("VueSlickCarousel",e._b({ref:"slickCarousel"},"VueSlickCarousel",e.carousel.settings,!1),[i("div",{staticClass:"onBoarding-carousel__slide"},[i("img",{staticClass:"onBoarding__video onBoarding__video_step1",attrs:{src:o("063e"),alt:"video"}}),i("div",{staticClass:"text-center"},[i("button",{staticClass:"button button_w-100\n        button_theme-default button_size-m\n        onBoarding-carousel__button",on:{click:function(t){return t.preventDefault(),e.gotToSlide(1)}}},[e._v(" Find out how ")])])]),i("div",{staticClass:"onBoarding-carousel__slide"},[i("img",{staticClass:"onBoarding__video onBoarding__video_step2",attrs:{src:o("cb26"),alt:"video"}}),i("div",{staticClass:"title onBoarding__titl text-center mb-4"},[e._v(" How it works ")]),i("div",{staticClass:"text onBoarding__tex text-center mb-3"},[e._v(" Step 1: You answer 16 quick questions about yourself and receive your first report ")]),i("div",{staticClass:"text onBoarding__tex text-center mb-3"},[e._v(" Step 2: Ask your contacts to answer 16 quick questions about you to receive your comparative report. ")]),i("button",{staticClass:"button button_w-100\n      button_theme-default button_size-m",on:{click:function(t){return t.preventDefault(),e.gotToSlide(2)}}},[e._v(" Start ")])]),i("div",{staticClass:"onBoarding-carousel__slide"},[i("div",{staticClass:"title onBoarding__title"},[e._v(" Details ")]),i("div",{staticClass:"caption text-center mb-3"},[e._v(" We need your phone number so we can notify you of the results. We won’t contact you otherwise. ")]),i("form",{staticClass:"form"},[i("div",{staticClass:"form-group",class:{"form-group-error":e.$v.formData.name.$error}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.name,expression:"formData.name"}],staticClass:"form__input",attrs:{placeholder:"Your name"},domProps:{value:e.formData.name},on:{input:function(t){t.target.composing||e.$set(e.formData,"name",t.target.value)}}}),e.$v.formData.name.$error?[e.$v.formData.name.required?e._e():i("div",{staticClass:"form__input-error"},[e._v(" Field is required ")])]:e._e()],2),i("TelInput",{attrs:{diaCode:e.formData.diaCode,validPhone:e.$v.formData.phone},on:{onDiaCode:e.countryChanged},model:{value:e.formData.phone,callback:function(t){e.$set(e.formData,"phone",t)},expression:"formData.phone"}})],1),i("button",{staticClass:"button button_w-100 button_theme-default\n      button_size-m slide-details__button",on:{click:function(t){return t.preventDefault(),e.start(t)}}},[e._v(" Send Code ")]),i("div",{staticClass:"caption onBoarding-carousel-button__caption text-center"},[e._v(" By using our service, you consent to our Privacy Policy and Terms and Conditions below ")])])]),i("TermsConditionsModal"),i("PolicyModal"),i("div",{staticClass:"footer-menu"},[i("ul",{staticClass:"footer-menu__list"},[i("li",{staticClass:"footer-menu__item"},[i("span",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-terms",modifiers:{"modal-terms":!0}}]},[e._v(" Terms & Conditions ")])]),i("li",{staticClass:"footer-menu__item"},[i("span",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-policy",modifiers:{"modal-policy":!0}}]},[e._v(" Privacy Policy ")])])])])],1)},n=[],r=(o("99af"),o("b0c0"),o("ac1f"),o("5319"),o("a7ab")),l=o.n(r),c=o("1dce"),u=o("1a4e"),d=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("b-modal",{attrs:{id:"modal-policy","hide-footer":""},scopedSlots:e._u([{key:"modal-title",fn:function(){return[e._v(" Privacy Policy ")]},proxy:!0}])},[o("p",{staticClass:"text mb-3"},[e._v(" At innerworks, accessible from https://innerworks, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by innerworks and how we use it. ")]),o("p",{staticClass:"text mb-3"},[e._v(" If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. ")]),o("p",{staticClass:"text mb-3"},[e._v(" This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in innerworks. This policy is not applicable to any information collected offline or via channels other than this website. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Consent")]),o("p",{staticClass:"text mb-3"},[e._v(" By using our website, you hereby consent to our Privacy Policy and agree to its terms. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Information we collect")]),o("p",{staticClass:"text mb-3"},[e._v(" The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide. When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("How we use your information")]),o("p",{staticClass:"text mb-3"},[e._v(" We use the information we collect in various ways, including to: "),o("br"),e._v(" * Provide, operate, and maintain our webste"),o("br"),e._v(" * Improve, personalize, and expand our webste"),o("br"),e._v(" * Understand and analyze how you use our webste"),o("br"),e._v(" * Develop new products, services, features, and functionality"),o("br"),e._v(" * Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the webste, and for marketing and promotional purposes"),o("br"),e._v(" * Send you emails"),o("br"),e._v(" * Find and prevent fraud ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Log Files")]),o("p",{staticClass:"text mb-3"},[e._v(" innerworks follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services’ analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information. Our Privacy Policy was created with the help of the Privacy Policy Generator and the Disclaimer Generator. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Cookies and Web Beacons")]),o("p",{staticClass:"text mb-3"},[e._v(" Like any other website, innerworks uses ‘cookies’. These cookies are used to store information including visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information. For more general information on cookies, please read “What Are Cookies”. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Advertising Partners Privacy Policies")]),o("p",{staticClass:"text mb-3"},[e._v(" You may consult this list to find the Privacy Policy for each of the advertising partners of innerworks. ")]),o("p",{staticClass:"text mb-3"},[e._v(" Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on innerworks, which are sent directly to users’ browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. ")]),o("p",{staticClass:"text mb-3"},[e._v(" Note that innerworks has no access to or control over these cookies that are used by third-party advertisers. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Third Party Privacy Policies")]),o("p",{staticClass:"text mb-3"},[e._v(" innerworks’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. ")]),o("p",{staticClass:"text mb-3"},[e._v(" You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites. ")]),o("p",{staticClass:"text mb-3"},[e._v(" CCPA Privacy Rights (Do Not Sell My Personal Information) Under the CCPA, among other rights, California consumers have the right to: ")]),o("p",{staticClass:"text mb-3"},[e._v(" Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers. ")]),o("p",{staticClass:"text mb-3"},[e._v(" Request that a business delete any personal data about the consumer that a business has collected. ")]),o("p",{staticClass:"text mb-3"},[e._v(" Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data. ")]),o("p",{staticClass:"text mb-3"},[e._v(" If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("GDPR Data Protection Rights")]),o("p",{staticClass:"text mb-3"},[e._v(" We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: ")]),o("p",{staticClass:"text mb-3"},[e._v(" The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service. ")]),o("p",{staticClass:"text mb-3"},[e._v(" The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete. ")]),o("p",{staticClass:"text mb-3"},[e._v(" The right to erasure – You have the right to request that we erase your personal data, under certain conditions. ")]),o("p",{staticClass:"text mb-3"},[e._v(" The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions. ")]),o("p",{staticClass:"text mb-3"},[e._v(" The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions. The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions. ")]),o("p",{staticClass:"text mb-3"},[e._v(" If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Children’s Information")]),o("p",{staticClass:"text mb-3"},[e._v(" Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. ")]),o("p",{staticClass:"text mb-3"},[e._v(" innerworks does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records. ")])])},h=[],m=o("2877"),p={},f=Object(m["a"])(p,d,h,!1,null,null,null),v=f.exports,y=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("b-modal",{attrs:{id:"modal-terms","hide-footer":""},scopedSlots:e._u([{key:"modal-title",fn:function(){return[e._v(" Welcome to innerworks! ")]},proxy:!0}])},[o("p",{staticClass:"text mb-3"},[e._v(" These terms and conditions outline the rules and regulations for the use of innerworks’s Website, located at https://innerworks/. By accessing this website we assume you accept these terms and conditions. Do not continue to use innerworks if you do not agree to take all of the terms and conditions stated on this page. ")]),o("p",{staticClass:"text mb-3"},[e._v(" The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Cookies")]),o("p",{staticClass:"text mb-3"},[e._v(" We employ the use of cookies. By accessing innerworks, you agreed to use cookies in agreement with the innerworks’s Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Policy")]),o("p",{staticClass:"text mb-3"},[e._v(" Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("License")]),o("p",{staticClass:"text mb-3"},[e._v(" Unless otherwise stated, innerworks and/or its licensors own the intellectual property rights for all material on innerworks. All intellectual property rights are reserved. You may access this from innerworks for your own personal use subjected to restrictions set in these terms and conditions. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("You must not:")]),o("p",{staticClass:"text mb-3"},[e._v(" Republish material from innerworks Sell, rent or sub-license material from innerworks Reproduce, duplicate or copy material from innerworks Redistribute content from innerworks This Agreement shall begin on the date hereof. Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. innerworks does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of innerworks,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, innerworks shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website. ")]),o("p",{staticClass:"text mb-3"},[e._v(" innerworks reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions. You warrant and represent that: You are entitled to post the Comments on our website and have all necessary licenses and consents to do so; ")]),o("p",{staticClass:"text mb-3"},[e._v(" The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party; ")]),o("p",{staticClass:"text mb-3"},[e._v(" The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy ")]),o("p",{staticClass:"text mb-3"},[e._v(" The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity. You hereby grant innerworks a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Hyperlinking to our Content")]),o("p",{staticClass:"text mb-3"},[e._v(" The following organizations may link to our Website without prior written approval: Government agencies; Search engines; News organizations; ")]),o("p",{staticClass:"text mb-3"},[e._v(" Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site. ")]),o("p",{staticClass:"text mb-3"},[e._v(" We may consider and approve other link requests from the following types of organizations: commonly-known consumer and/or business information sources; dot.com community sites; associations or other groups representing charities; online directory distributors; internet portals; accounting, law and consulting firms; and educational institutions and trade associations. ")]),o("p",{staticClass:"text mb-3"},[e._v(" We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of innerworks; and (d) the link is in the context of general resource information. ")]),o("p",{staticClass:"text mb-3"},[e._v(" These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site. ")]),o("p",{staticClass:"text mb-3"},[e._v(" If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to innerworks. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response. ")]),o("p",{staticClass:"text mb-3"},[e._v(" If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to innerworks. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response. ")]),o("p",{staticClass:"text mb-3"},[e._v(" No use of innerworks’s logo or other artwork will be allowed for linking absent a trademark license agreement. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("iFrames")]),o("p",{staticClass:"text mb-3"},[e._v(" Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website. Content Liability We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Your Privacy")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Please read Privacy")]),o("h3",{staticClass:"h5 mb-2"},[e._v("Policy Reservation of Rights")]),o("p",{staticClass:"text mb-3"},[e._v(" We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v(" Removal of links from our website ")]),o("p",{staticClass:"text mb-3"},[e._v(" If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly. We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date. ")]),o("h3",{staticClass:"h5 mb-2"},[e._v(" Disclaimer ")]),o("p",{staticClass:"text mb-3"},[e._v(" To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will: limit or exclude our or your liability for death or personal injury; limit or exclude our or your liability for fraud or fraudulent misrepresentation; ")]),o("p",{staticClass:"text mb-3"},[e._v(" limit any of our or your liabilities in any way that is not permitted under applicable law; or exclude any of our or your liabilities that may not be excluded under applicable law. The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty. ")])])},b=[],g={},w=Object(m["a"])(g,y,b,!1,null,null,null),C=w.exports,_=o("b5ae"),k=_.required,x={components:{VueSlickCarousel:l.a,TelInput:u["a"],PolicyModal:v,TermsConditionsModal:C},mixins:[c["validationMixin"]],validations:{formData:{name:{required:k},phone:{required:k}}},data:function(){return{formData:{phone:null,name:"",diaCode:""},carousel:{settings:{arrows:!1,dots:!0,dotsClass:"slick-dots",edgeFriction:.35,infinite:!1,speed:500,slidesToShow:1,slidesToScroll:1,adaptiveHeight:!0},refBySlide:{0:"videoRef1",1:"videoRef2"}},currentPage:0}},computed:{getClassByLengthCountryCode:function(){return"code-length-".concat(this.formData.diaCode.length)}},mounted:function(){this.initialSlider()},methods:{initialSlider:function(){var e=this.$route.params.slide;e&&this.gotToSlide(e)},gotToSlide:function(e){this.$refs.slickCarousel.goTo(e)},countryChanged:function(e){this.formData.diaCode=e.dialCode},prepareDataForRequest:function(){var e="+".concat(this.formData.diaCode).concat(this.formData.phone).replace(/\s/g,"");return{name:this.formData.name,phone:e}},start:function(){var e=this;if(this.$v.$touch(),!this.$v.$invalid){var t=this.prepareDataForRequest();this.$store.dispatch("auth/registerRequest",t).then((function(){e.$router.push("enter-security-code")}))}}}},P=x,T=(o("39b7"),Object(m["a"])(P,a,n,!1,null,null,null)),W=T.exports,D=o("51e0"),q={components:{Onboarding:W,Content:D["a"]},name:"Main"},S=q,B=Object(m["a"])(S,i,s,!1,null,null,null);t["default"]=B.exports},f53f:function(e,t,o){}}]);
//# sourceMappingURL=chunk-4a2549fc.e8ce91db.js.map