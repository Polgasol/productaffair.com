(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{14957:function(e,t,a){"use strict";var n=a(95318);t.Z=void 0;var i=n(a(64938)),r=a(85893),s=(0,i.default)((0,r.jsx)("path",{d:"M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star");t.Z=s},98456:function(e,t,a){"use strict";a.d(t,{Z:function(){return P}});var n=a(63366),i=a(87462),r=a(67294),s=a(86010),o=a(94780),l=a(70917),c=a(98216),u=a(71657),_=a(11496),m=a(34867);function d(e){return(0,m.Z)("MuiCircularProgress",e)}(0,a(1588).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var h=a(85893);const p=["className","color","disableShrink","size","style","thickness","value","variant"];let x,v,g,f,b=e=>e;const j=44,k=(0,l.F4)(x||(x=b`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),w=(0,l.F4)(v||(v=b`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),N=(0,_.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],t[`color${(0,c.Z)(a.color)}`]]}})((({ownerState:e,theme:t})=>(0,i.Z)({display:"inline-block"},"determinate"===e.variant&&{transition:t.transitions.create("transform")},"inherit"!==e.color&&{color:(t.vars||t).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,l.iv)(g||(g=b`
      animation: ${0} 1.4s linear infinite;
    `),k))),M=(0,_.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),y=(0,_.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.circle,t[`circle${(0,c.Z)(a.variant)}`],a.disableShrink&&t.circleDisableShrink]}})((({ownerState:e,theme:t})=>(0,i.Z)({stroke:"currentColor"},"determinate"===e.variant&&{transition:t.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,l.iv)(f||(f=b`
      animation: ${0} 1.4s ease-in-out infinite;
    `),w)));var P=r.forwardRef((function(e,t){const a=(0,u.Z)({props:e,name:"MuiCircularProgress"}),{className:r,color:l="primary",disableShrink:_=!1,size:m=40,style:x,thickness:v=3.6,value:g=0,variant:f="indeterminate"}=a,b=(0,n.Z)(a,p),k=(0,i.Z)({},a,{color:l,disableShrink:_,size:m,thickness:v,value:g,variant:f}),w=(e=>{const{classes:t,variant:a,color:n,disableShrink:i}=e,r={root:["root",a,`color${(0,c.Z)(n)}`],svg:["svg"],circle:["circle",`circle${(0,c.Z)(a)}`,i&&"circleDisableShrink"]};return(0,o.Z)(r,d,t)})(k),P={},S={},C={};if("determinate"===f){const e=2*Math.PI*((j-v)/2);P.strokeDasharray=e.toFixed(3),C["aria-valuenow"]=Math.round(g),P.strokeDashoffset=`${((100-g)/100*e).toFixed(3)}px`,S.transform="rotate(-90deg)"}return(0,h.jsx)(N,(0,i.Z)({className:(0,s.Z)(w.root,r),style:(0,i.Z)({width:m,height:m},S,x),ownerState:k,ref:t,role:"progressbar"},C,b,{children:(0,h.jsx)(M,{className:w.svg,ownerState:k,viewBox:"22 22 44 44",children:(0,h.jsx)(y,{className:w.circle,style:P,ownerState:k,cx:j,cy:j,r:(j-v)/2,fill:"none",strokeWidth:v})})}))}))},48312:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(68538)}])},68538:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return re}});var n=a(85893),i=a(67294),r=a(33352),s=a.n(r),o=a(98456),l=a(9630),c=a.n(l),u=a(14957),_=a(24542),m=a.n(_),d=i.memo((function(){return(0,n.jsx)("div",{className:m().star,children:(0,n.jsx)(u.Z,{className:m().star__icon,sx:{fontSize:"1rem"}})})})),h=a(22959),p=a.n(h),x=function(e){var t=e.overallRating,a=parseFloat(t).toFixed(1);return(0,n.jsx)("div",{className:p().rating,children:(0,n.jsx)("span",{className:p().rating__text,children:a})})},v=a(27484),g=a.n(v),f=a(70178),b=a.n(f),j=a(29387),k=a.n(j),w=a(10285),N=a.n(w),M=a(81726),y=a.n(M),P=function(e){var t=e.dateCreated;g().extend(b()),g().extend(k()),g().extend(N());var a=g().tz.guess(),i=g()(t).tz(a).format("MMM DD, YYYY");return(0,n.jsx)("div",{className:y().date,children:(0,n.jsx)("span",{className:y().date__text,children:i})})},S=a(16990),C=a.n(S),Z=function(e){var t,a=e.likesCount,i=Number(a),r=(t=i,Math.abs(t)<1e3?Math.sign(t)*t:Math.abs(t)>999&&Math.abs(t)<1e6?Math.sign(t)*Math.round(Math.abs(t)/1e3)+"K":Math.abs(t)>999999&&Math.abs(t)<1e9?Math.sign(t)*Math.round(Math.abs(t)/1e6)+"M":Math.abs(t)>999999999&&Math.abs(t)<1e12?Math.sign(t)*Math.round(Math.abs(t)/1e9)+"B":Math.sign(t)*Math.round(Math.abs(t)/1e12)+"T");return(0,n.jsx)("div",{className:C().likes,children:(0,n.jsxs)("span",{className:C().likes__text,children:[r," Likes"]})})},T=a(53947),F=a.n(T),I=function(e){var t=e.author;e.id;return(0,n.jsx)("div",{className:F().author,children:(0,n.jsx)("span",{className:F().author__link,children:t})})},L=a(54843),D=a(72580),H=a.n(D),z=function(e){var t,a=e.postTitle,r=(e.id,(0,i.useContext)(L.V));null===r||void 0===r||null===(t=r.auth)||void 0===t||t.verified;return(0,n.jsx)("div",{className:H()["post-title"],children:(0,n.jsxs)("p",{className:H()["post-title__link"],children:[a," Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quidem inventore doloremque odit rerum, exercitationem incidunt est laboriosam dolorum itaque sit corrupti soluta ducimus labore nesciunt dolores suscipit nostrum nisi!"]})})},R=a(25229),Y=a.n(R),E=function(e){var t,a=e.viewsCount,i=Number(a),r=(t=i,Math.abs(t)<1e3?Math.sign(t)*t:Math.abs(t)>9999&&Math.abs(t)<1e6?Math.sign(t)*Math.round(Math.abs(t)/1e3)+"K":Math.abs(t)>999999&&Math.abs(t)<1e9?Math.sign(t)*Math.round(Math.abs(t)/1e6)+"M":Math.abs(t)>999999999&&Math.abs(t)<1e12?Math.sign(t)*Math.round(Math.abs(t)/1e9)+"B":Math.sign(t)*Math.round(Math.abs(t)/1e12)+"T");return(0,n.jsx)("div",{className:Y().views,children:(0,n.jsxs)("span",{className:Y().views__text,children:[r," Views"]})})},X=a(10084),$=a.n(X),q=function(e){var t=e.profileImg;return(0,n.jsx)("div",{className:$()["account-icon"],children:void 0===t.profileImg?(0,n.jsx)("div",{className:$().tile}):(0,n.jsx)("div",{className:$().tile,children:(0,n.jsx)("img",{className:$().tile__image,src:t.profileImg,width:500,height:500})})})},V=function(e){var t=e.values;return(0,n.jsx)("div",{className:c().thumbnail,children:(0,n.jsxs)("a",{href:"https://www.productaffair.com/post/".concat(t.id),className:c().thumbnail__link,children:[(0,n.jsxs)("div",{className:c().thumbnail__top,children:[(0,n.jsxs)("div",{className:c().thumbnail__rating,children:[(0,n.jsx)(d,{}),(0,n.jsx)(x,{overallRating:t.overall_rating})]}),(0,n.jsx)("div",{className:c().thumbnail__date,children:(0,n.jsx)(P,{dateCreated:t.date_created})})]}),(0,n.jsx)("div",{className:c().thumbnail__mid,children:(0,n.jsx)("img",{className:c().thumbnail__image,src:t.images[0],width:500,height:500,alt:t.title})}),(0,n.jsxs)("div",{className:c().thumbnail__bot,children:[(0,n.jsxs)("div",{className:c().thumbnail__meta,children:[(0,n.jsx)(Z,{likesCount:t.likes_count}),(0,n.jsx)(E,{viewsCount:t.views_count})]}),(0,n.jsx)("div",{className:c().thumbnail__title,children:(0,n.jsx)(z,{postTitle:t.title,id:t.id})}),(0,n.jsxs)("div",{className:c().thumbnail__author,children:[(0,n.jsx)(q,{profileImg:t}),(0,n.jsx)(I,{author:t.author,id:t.user_id})]})]})]})})},W=a(58533),B=a(3471),A=a(34051),G=a.n(A),J=a(9669),Q=a.n(J);function K(e,t,a,n,i,r,s){try{var o=e[r](s),l=o.value}catch(c){return void a(c)}o.done?t(l):Promise.resolve(l).then(n,i)}var O=function(){var e,t=(e=G().mark((function e(t){var a,n,i,r;return G().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=t.pageParam,n=void 0===a?0:a,e.next=6;break;case 4:return i=e.sent,e.abrupt("return",i.data.data);case 6:return e.next=8,Q().get("https://api.productaffair.com/api/pages?page=".concat(n),{withCredentials:!0});case 8:return r=e.sent,e.abrupt("return",r.data.data);case 10:case"end":return e.stop()}}),e)})),function(){var t=this,a=arguments;return new Promise((function(n,i){var r=e.apply(t,a);function s(e){K(r,n,i,s,o,"next",e)}function o(e){K(r,n,i,s,o,"throw",e)}s(void 0)}))});return function(e){return t.apply(this,arguments)}}(),U=a(11163),ee=function(){var e=(0,U.useRouter)(),t=(0,B.useInfiniteQuery)(["homePosts"],O,{getNextPageParam:function(e,t){if(e)return t.length}}),a=t.data,i=(t.error,t.fetchNextPage),r=t.hasNextPage,l=(t.isFetching,t.isFetchingNextPage,t.status);return"error"===l&&e.push("/404"),"loading"===l?(0,n.jsx)("div",{className:s()["loading-container"],children:(0,n.jsx)(o.Z,{})}):(0,n.jsx)("main",{className:s()["home-main"],children:(0,n.jsx)(W.Z,{className:s()["home-main__section"],dataLength:null===a||void 0===a?void 0:a.pages.length,next:function(){return i()},hasMore:r,loader:(0,n.jsx)(n.Fragment,{}),children:"No posts are available"===a.pages[0]?(0,n.jsx)("div",{children:"No Posts are available"}):null===a||void 0===a?void 0:a.pages.map((function(e){return null===e||void 0===e?void 0:e.map((function(e){return(0,n.jsx)(V,{values:e},e.id)}))}))})})},te=a(9008),ae=a.n(te),ne=a(4298),ie=a.n(ne),re=function(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(ae(),{children:[(0,n.jsx)("title",{children:"Productaffair.com - Discover the best products on the market. Share your product experiences, upload images and make a review."}),(0,n.jsx)("meta",{content:"width=device-width,maximum-scale=1.0,initial-scale=1.0,minimum-scale=0.9,user-scalable=no",name:"viewport"}),(0,n.jsx)("meta",{property:"description",name:"description",content:"Discover the best products on the market. Share your product experiences, upload images and make a review.","data-app":"true"}),(0,n.jsx)("meta",{property:"og:description",name:"og:description",content:"Discover the best products on the market. Share your product experiences, upload images and make a review.","data-app":"true"}),(0,n.jsx)("meta",{property:"og:type",name:"og:type",content:"website","data-app":"true"}),(0,n.jsx)("meta",{name:"google",content:"notranslate"}),(0,n.jsx)("meta",{name:"application-name",content:"Productaffair"}),(0,n.jsx)("meta",{property:"og:site_name",content:"Productaffair"}),(0,n.jsx)("meta",{property:"og:url",content:"https://wwww.productaffair.com"}),(0,n.jsx)("meta",{property:"og:locale",content:"en_US"})]}),(0,n.jsx)(ie(),{src:"https://www.googletagmanager.com/gtag/js?id=G-2FJZ116LFW",strategy:"afterInteractive"}),(0,n.jsx)(ie(),{id:"google-analytics",strategy:"afterInteractive",children:"window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'G-2FJZ116LFW');"})]}),(0,n.jsx)(ee,{})]})}},9630:function(e){e.exports={thumbnail:"HomeThumbnail_thumbnail___c30w",thumbnail__top:"HomeThumbnail_thumbnail__top__yBkIl",thumbnail__rating:"HomeThumbnail_thumbnail__rating__HX8xH",thumbnail__mid:"HomeThumbnail_thumbnail__mid__5xG2D",thumbnail__bot:"HomeThumbnail_thumbnail__bot__CL5z8",thumbnail__meta:"HomeThumbnail_thumbnail__meta__1TQum",thumbnail__title:"HomeThumbnail_thumbnail__title__cdNID",thumbnail__author:"HomeThumbnail_thumbnail__author__7EYp6",thumbnail__image:"HomeThumbnail_thumbnail__image__c1Ysz"}},10084:function(e){e.exports={"account-icon":"ProfileImg_account-icon__uxINN","account-icon__icon":"ProfileImg_account-icon__icon__SNb2G",tile:"ProfileImg_tile__t0Wdg",tile__image:"ProfileImg_tile__image__qE2xl"}},24542:function(e){e.exports={star:"StarIcon_star__YvVfp",star__icon:"StarIcon_star__icon__67YUC"}},53947:function(e){e.exports={author:"AuthorLink_author__mLq_6",author__link:"AuthorLink_author__link__6fpQz"}},72580:function(e){e.exports={"post-title":"PostTitleLink_post-title__K9AbP","post-title__link":"PostTitleLink_post-title__link__tdWp_"}},81726:function(e){e.exports={date:"DateCreated_date__9l42N",date__text:"DateCreated_date__text__tV_Hh"}},16990:function(e){e.exports={likes:"LikesCount_likes__j3v7s",likes__text:"LikesCount_likes__text__QOJqd"}},22959:function(e){e.exports={rating:"PostRating_rating__BaJf_",rating__text:"PostRating_rating__text__yXNXp"}},25229:function(e){e.exports={views:"ViewsCount_views__EWYlA",views__text:"ViewsCount_views__text__Mp_uF"}},33352:function(e){e.exports={"loading-container":"HomeTemplate_loading-container___4s3X","home-main":"HomeTemplate_home-main__FNXFp","home-main__section":"HomeTemplate_home-main__section__s1TIC"}},9008:function(e,t,a){e.exports=a(83121)},4298:function(e,t,a){e.exports=a(63573)}},function(e){e.O(0,[355,774,888,179],(function(){return t=48312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);