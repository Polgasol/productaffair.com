(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[183],{14957:function(t,e,a){"use strict";var n=a(95318);e.Z=void 0;var r=n(a(64938)),i=a(85893),s=(0,r.default)((0,i.jsx)("path",{d:"M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star");e.Z=s},98456:function(t,e,a){"use strict";a.d(e,{Z:function(){return P}});var n=a(63366),r=a(87462),i=a(67294),s=a(86010),o=a(94780),c=a(70917),l=a(98216),u=a(71657),_=a(11496),d=a(34867);function h(t){return(0,d.Z)("MuiCircularProgress",t)}(0,a(1588).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=a(85893);const g=["className","color","disableShrink","size","style","thickness","value","variant"];let p,x,v,f,b=t=>t;const j=44,k=(0,c.F4)(p||(p=b`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),w=(0,c.F4)(x||(x=b`
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
`)),y=(0,_.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],e[`color${(0,l.Z)(a.color)}`]]}})((({ownerState:t,theme:e})=>(0,r.Z)({display:"inline-block"},"determinate"===t.variant&&{transition:e.transitions.create("transform")},"inherit"!==t.color&&{color:(e.vars||e).palette[t.color].main})),(({ownerState:t})=>"indeterminate"===t.variant&&(0,c.iv)(v||(v=b`
      animation: ${0} 1.4s linear infinite;
    `),k))),M=(0,_.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(t,e)=>e.svg})({display:"block"}),N=(0,_.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.circle,e[`circle${(0,l.Z)(a.variant)}`],a.disableShrink&&e.circleDisableShrink]}})((({ownerState:t,theme:e})=>(0,r.Z)({stroke:"currentColor"},"determinate"===t.variant&&{transition:e.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:t})=>"indeterminate"===t.variant&&!t.disableShrink&&(0,c.iv)(f||(f=b`
      animation: ${0} 1.4s ease-in-out infinite;
    `),w)));var P=i.forwardRef((function(t,e){const a=(0,u.Z)({props:t,name:"MuiCircularProgress"}),{className:i,color:c="primary",disableShrink:_=!1,size:d=40,style:p,thickness:x=3.6,value:v=0,variant:f="indeterminate"}=a,b=(0,n.Z)(a,g),k=(0,r.Z)({},a,{color:c,disableShrink:_,size:d,thickness:x,value:v,variant:f}),w=(t=>{const{classes:e,variant:a,color:n,disableShrink:r}=t,i={root:["root",a,`color${(0,l.Z)(n)}`],svg:["svg"],circle:["circle",`circle${(0,l.Z)(a)}`,r&&"circleDisableShrink"]};return(0,o.Z)(i,h,e)})(k),P={},C={},S={};if("determinate"===f){const t=2*Math.PI*((j-x)/2);P.strokeDasharray=t.toFixed(3),S["aria-valuenow"]=Math.round(v),P.strokeDashoffset=`${((100-v)/100*t).toFixed(3)}px`,C.transform="rotate(-90deg)"}return(0,m.jsx)(y,(0,r.Z)({className:(0,s.Z)(w.root,i),style:(0,r.Z)({width:d,height:d},C,p),ownerState:k,ref:e,role:"progressbar"},S,b,{children:(0,m.jsx)(M,{className:w.svg,ownerState:k,viewBox:"22 22 44 44",children:(0,m.jsx)(N,{className:w.circle,style:P,ownerState:k,cx:j,cy:j,r:(j-x)/2,fill:"none",strokeWidth:x})})}))}))},9541:function(t,e,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/category",function(){return a(35312)}])},35312:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return nt}});var n=a(85893),r=(a(67294),a(11163)),i=a(3471),s=a(34051),o=a.n(s),c=a(9669),l=a.n(c);function u(t,e,a,n,r,i,s){try{var o=t[i](s),c=o.value}catch(l){return void a(l)}o.done?e(c):Promise.resolve(c).then(n,r)}var _=function(){var t,e=(t=o().mark((function t(e){var a,n,r,i,s;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=e.queryKey,n=e.pageParam,r=void 0===n?0:n,t.next=6;break;case 4:return i=t.sent,t.abrupt("return",i.data.data);case 6:return t.next=8,l().get("https://api.productaffair.com/api/category?category=".concat(a[1],"&page=").concat(r),{withCredentials:!0});case 8:return s=t.sent,t.abrupt("return",s.data.data);case 10:case"end":return t.stop()}}),t)})),function(){var e=this,a=arguments;return new Promise((function(n,r){var i=t.apply(e,a);function s(t){u(i,n,r,s,o,"next",t)}function o(t){u(i,n,r,s,o,"throw",t)}s(void 0)}))});return function(t){return e.apply(this,arguments)}}(),d=a(449),h=a.n(d),m=a(14957),g=a(18341),p=a.n(g),x=function(){return(0,n.jsx)("div",{className:p().star,children:(0,n.jsx)(m.Z,{className:p().star__icon,sx:{fontSize:"1rem"}})})},v=a(98198),f=a.n(v),b=function(t){var e=t.overallrating,a=parseFloat(e).toFixed(1);return(0,n.jsx)("div",{className:f().rating,children:(0,n.jsx)("span",{className:f().rating__text,children:a})})},j=a(27484),k=a.n(j),w=a(70178),y=a.n(w),M=a(29387),N=a.n(M),P=a(10285),C=a.n(P),S=a(91314),Z=a.n(S),T=function(t){var e=t.datecreated;k().extend(y()),k().extend(N()),k().extend(C());var a=k().tz.guess(),r=k()(e).tz(a).format("MMM DD, YYYY");return(0,n.jsx)("div",{className:Z().date,children:(0,n.jsx)("span",{className:Z().date__text,children:r})})},F=a(21453),L=a.n(F),D=function(t){var e,a=t.likescount,r=Number(a),i=(e=r,Math.abs(e)<1e3?Math.sign(e)*e:Math.abs(e)>999&&Math.abs(e)<1e6?Math.sign(e)*Math.round(Math.abs(e)/1e3)+"K":Math.abs(e)>999999&&Math.abs(e)<1e9?Math.sign(e)*Math.round(Math.abs(e)/1e6)+"M":Math.abs(e)>999999999&&Math.abs(e)<1e12?Math.sign(e)*Math.round(Math.abs(e)/1e9)+"B":Math.sign(e)*Math.round(Math.abs(e)/1e12)+"T");return(0,n.jsx)("div",{className:L().likes,children:(0,n.jsxs)("span",{className:L().likes__text,children:[i," Likes"]})})},I=a(81293),z=a.n(I),R=function(t){var e,a=t.viewscount,r=Number(a),i=(e=r,Math.abs(e)<1e3?Math.sign(e)*e:Math.abs(e)>9999&&Math.abs(e)<1e6?Math.sign(e)*Math.round(Math.abs(e)/1e3)+"K":Math.abs(e)>999999&&Math.abs(e)<1e9?Math.sign(e)*Math.round(Math.abs(e)/1e6)+"M":Math.abs(e)>999999999&&Math.abs(e)<1e12?Math.sign(e)*Math.round(Math.abs(e)/1e9)+"B":Math.sign(e)*Math.round(Math.abs(e)/1e12)+"T");return(0,n.jsx)("div",{className:z().views,children:(0,n.jsxs)("span",{className:z().views__text,children:[i," Views"]})})},E=a(6192),O=a.n(E),$=function(t){var e=t.postTitle;t.id;return(0,n.jsx)("div",{className:O()["post-title"],children:(0,n.jsx)("p",{className:O()["post-title__link"],children:e})})},q=a(20428),K=a.n(q),Y=function(t){var e=t.author;t.id;return(0,n.jsx)("div",{className:K().author,children:(0,n.jsx)("span",{className:K().author__link,children:e})})},G=a(66513),U=a.n(G),V=function(t){var e=t.profileImg;return(0,n.jsx)("div",{className:U()["account-icon"],children:void 0===e.profileImg?(0,n.jsx)("div",{className:U().tile}):(0,n.jsx)("div",{className:U().tile,children:(0,n.jsx)("img",{className:U().tile__image,src:e.profileImg,width:500,height:500})})})},B=function(t){var e=t.values;return(0,n.jsx)("div",{className:h().thumbnail,children:(0,n.jsxs)("a",{href:"https://www.productaffair.com/post/".concat(e.id),className:h().thumbnail__link,children:[(0,n.jsxs)("div",{className:h().thumbnail__top,children:[(0,n.jsxs)("div",{className:h().thumbnail__rating,children:[(0,n.jsx)(x,{}),(0,n.jsx)(b,{overallrating:e.overall_rating})]}),(0,n.jsx)("div",{className:h().thumbnail__date,children:(0,n.jsx)(T,{datecreated:e.date_created})})]}),(0,n.jsx)("div",{className:h().thumbnail__mid,children:(0,n.jsx)("img",{className:h().thumbnail__image,src:e.images[0],width:500,height:500,alt:e.title})}),(0,n.jsxs)("div",{className:h().thumbnail__bot,children:[(0,n.jsxs)("div",{className:h().thumbnail__meta,children:[(0,n.jsx)(D,{likescount:e.likes_count}),(0,n.jsx)(R,{viewscount:e.views_count})]}),(0,n.jsx)("div",{className:h().thumbnail__title,children:(0,n.jsx)($,{postTitle:e.title,id:e.id})}),(0,n.jsxs)("div",{className:h().thumbnail__author,children:[(0,n.jsx)(V,{profileImg:e}),(0,n.jsx)(Y,{author:e.author,id:e.user_id})]})]})]})})},J=a(58533),X=a(1708),Q=a.n(X),W=a(98456),H=a(9008),A=a.n(H),tt=a(4298),et=a.n(tt),at=function(){var t=(0,r.useRouter)(),e=t.query.category,a=(0,i.useInfiniteQuery)({queryKey:["getCategoryPosts",e],queryFn:_,getNextPageParam:function(t,e){if(t)return e.length}}),s=a.data,o=(a.error,a.fetchNextPage),c=a.hasNextPage,l=(a.isFetching,a.isFetchingNextPage,a.status);return"error"===l&&t.push("/404"),"loading"===l?(0,n.jsx)("div",{className:Q()["loading-container"],children:(0,n.jsx)(W.Z,{})}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(A(),{children:[(0,n.jsxs)("title",{children:["Productaffair - ",e]}),(0,n.jsx)("meta",{name:"robots",content:"noindex, follow"}),(0,n.jsx)("meta",{content:"width=device-width,maximum-scale=1.0,initial-scale=1.0,minimum-scale=0.9,user-scalable=no",name:"viewport"}),(0,n.jsx)("meta",{property:"description",name:"description",content:"Discover the best products on the market. Share your product experiences, upload images and make a review.","data-app":"true"}),(0,n.jsx)("meta",{property:"og:description",name:"og:description",content:"Discover the best products on the market. Share your product experiences, upload images and make a review.","data-app":"true"}),(0,n.jsx)("meta",{property:"og:type",name:"og:type",content:"website","data-app":"true"}),(0,n.jsx)("meta",{name:"google",content:"notranslate"}),(0,n.jsx)("meta",{name:"application-name",content:"Productaffair"}),(0,n.jsx)("meta",{property:"og:site_name",content:"Productaffair"}),(0,n.jsx)("meta",{property:"og:url",content:"https://wwww.productaffair.com"}),(0,n.jsx)("meta",{property:"og:locale",content:"en_US"})]}),(0,n.jsx)(et(),{src:"https://www.googletagmanager.com/gtag/js?id=G-2FJZ116LFW",strategy:"afterInteractive"}),(0,n.jsx)(et(),{id:"google-analytics",strategy:"afterInteractive",children:"window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'G-2FJZ116LFW');"})]}),(0,n.jsx)("main",{className:Q()["categories-main"],children:(0,n.jsx)(J.Z,{className:Q()["categories-main__section"],dataLength:null===s||void 0===s?void 0:s.pages.length,next:function(){return o()},hasMore:c,loader:(0,n.jsx)(n.Fragment,{}),children:"No posts are available"===s.pages[0]?(0,n.jsx)("div",{children:"No Posts are available"}):null===s||void 0===s?void 0:s.pages.map((function(t,e){return null===t||void 0===t?void 0:t.map((function(t,e){return(0,n.jsx)(B,{values:t},t.id)}))}))})})]})},nt=function(){return(0,n.jsx)(at,{})}},449:function(t){t.exports={thumbnail:"CategoryThumbnail_thumbnail___jaUh",thumbnail__top:"CategoryThumbnail_thumbnail__top__GpyRG",thumbnail__rating:"CategoryThumbnail_thumbnail__rating__aiCKn",thumbnail__mid:"CategoryThumbnail_thumbnail__mid__3A99P",thumbnail__bot:"CategoryThumbnail_thumbnail__bot__Py1QP",thumbnail__meta:"CategoryThumbnail_thumbnail__meta__bDJKd",thumbnail__title:"CategoryThumbnail_thumbnail__title__bj4xC",thumbnail__author:"CategoryThumbnail_thumbnail__author__sF7tb",thumbnail__image:"CategoryThumbnail_thumbnail__image__EbBVT"}},66513:function(t){t.exports={"account-icon":"ProfileImg_account-icon__Ut_eY","account-icon__icon":"ProfileImg_account-icon__icon__nwze7",tile:"ProfileImg_tile__z_FE6",tile__image:"ProfileImg_tile__image__vcEkl"}},18341:function(t){t.exports={star:"StarIcon_star__OLzyl",star__icon:"StarIcon_star__icon__8063O"}},6192:function(t){t.exports={"post-title":"PostTitleLink_post-title__Y_Cdf","post-title__link":"PostTitleLink_post-title__link__krrNx"}},20428:function(t){t.exports={author:"UploaderLink_author__e94MM",author__link:"UploaderLink_author__link__7kMq4"}},91314:function(t){t.exports={date:"DatePosted_date__tSXlu",date__text:"DatePosted_date__text__cnVuJ"}},21453:function(t){t.exports={likes:"LikesCount_likes__SvCz3",likes__text:"LikesCount_likes__text__SPCTz"}},98198:function(t){t.exports={rating:"OverallRating_rating__7hMQI",rating__text:"OverallRating_rating__text__u2kHq"}},81293:function(t){t.exports={views:"ViewsCount_views__toO3d",views__text:"ViewsCount_views__text__Xs7R4"}},1708:function(t){t.exports={"loading-container":"CategoryTemplate_loading-container__gCHGl","categories-main":"CategoryTemplate_categories-main__g_MLE","categories-main__section":"CategoryTemplate_categories-main__section__N2DI9"}},9008:function(t,e,a){t.exports=a(83121)},4298:function(t,e,a){t.exports=a(63573)}},function(t){t.O(0,[355,774,888,179],(function(){return e=9541,t(t.s=e);var e}));var e=t.O();_N_E=e}]);