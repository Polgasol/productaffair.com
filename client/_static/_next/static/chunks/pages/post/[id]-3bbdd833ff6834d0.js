(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[687],{23208:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/post/[id]",function(){return n(29214)}])},17339:function(t,e,n){"use strict";n.d(e,{P:function(){return u},w:function(){return m}});var a=n(34051),r=n.n(a),o=n(9669),s=n.n(o);function i(t,e,n,a,r,o,s){try{var i=t[o](s),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(a,r)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){i(o,a,r,s,c,"next",t)}function c(t){i(o,a,r,s,c,"throw",t)}s(void 0)}))}}var u=function(){var t=c(r().mark((function t(e){var n,a;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.next=5;break;case 3:return n=t.sent,t.abrupt("return",n.data);case 5:return t.next=7,s().post("https://api.productaffair.com/api/follow",e,{withCredentials:!0});case 7:return a=t.sent,t.abrupt("return",a.data);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),m=function(){var t=c(r().mark((function t(e){var n,a;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s().post("https://api.productaffair.com/api/unfollow",e,{withCredentials:!0});case 2:n=t.sent,t.next=8;break;case 6:return a=t.sent,t.abrupt("return",a.data);case 8:return t.abrupt("return",n.data);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},29214:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return Ae}});var a=n(85893),r=n(67294),o=n(3019),s=n.n(o),i=n(35403),c=n.n(i),u=n(91811),m=n(36111),l=n(57512),_=n.n(l),d=n(34051),p=n.n(d),f=n(9669),h=n.n(f);function x(t,e,n,a,r,o,s){try{var i=t[o](s),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(a,r)}function v(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){x(o,a,r,s,i,"next",t)}function i(t){x(o,a,r,s,i,"throw",t)}s(void 0)}))}}var b=function(){var t=v(p().mark((function t(e){var n,a;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.next=5;break;case 3:return n=t.sent,t.abrupt("return",n.data.data);case 5:return t.next=7,h().post("https://api.productaffair.com/api/like",e,{withCredentials:!0});case 7:return a=t.sent,t.abrupt("return",a.data.data);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),g=function(){var t=v(p().mark((function t(e){var n,a;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.next=5;break;case 3:return n=t.sent,t.abrupt("return",n.data.data);case 5:return t.next=7,h().post("https://api.productaffair.com/api/unlike",e,{withCredentials:!0});case 7:return a=t.sent,t.abrupt("return",a.data.data);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),j=n(3471),w=n(11163),k=function(t){var e=t.postId,n=t.isLike,o=t.isAuthor,s=(0,j.useQueryClient)(),i=(0,w.useRouter)(),c=(0,r.useState)(!1),l=c[0],d=c[1],p=(0,j.useMutation)({mutationFn:function(t){return b({postId:t})},onSuccess:function(t){"Like"===t&&(d(!0),s.invalidateQueries(["getPost",e]))}}),f=(0,j.useMutation)({mutationFn:function(t){return g({postId:t})},onSuccess:function(t){"!Like"===t&&(d(!1),s.invalidateQueries(["getPost",e]))}});return(0,r.useEffect)((function(){return"Like"===n?d(!0):"!Like"===n?d(!1):void 0}),[n]),(0,a.jsx)("div",{className:_()["like-btn"],children:l?(0,a.jsx)(m.Z,{className:_()["like-btn__like-icon"],onClick:function(){"Guest"===o&&i.push("/login"),f.mutate(e)}}):(0,a.jsx)(u.Z,{className:_()["like-btn__unlike-icon"],onClick:function(){"Guest"===o&&i.push("/login"),p.mutate(e)}})})},y=n(27484),N=n.n(y),C=n(70178),M=n.n(C),S=n(29387),P=n.n(S),F=n(10285),L=n.n(F),I=n(60552),A=n.n(I),Z=function(t){var e=t.dateCreated;N().extend(M()),N().extend(P()),N().extend(L());var n=N().tz.guess(),r=N()(e).tz(n).format("MMM DD, YYYY");return(0,a.jsx)("div",{className:A().dateposted,children:(0,a.jsx)("span",{className:A().dateposted__text,children:r})})},E=n(46965),B=n.n(E),R=function(t){var e,n=t.likesCount,r=Number(n),o=(e=r,Math.abs(e)<1e3?Math.sign(e)*e:Math.abs(e)>999&&Math.abs(e)<1e6?Math.sign(e)*Math.round(Math.abs(e)/1e3)+"K":Math.abs(e)>999999&&Math.abs(e)<1e9?Math.sign(e)*Math.round(Math.abs(e)/1e6)+"M":Math.abs(e)>999999999&&Math.abs(e)<1e12?Math.sign(e)*Math.round(Math.abs(e)/1e9)+"B":Math.sign(e)*Math.round(Math.abs(e)/1e12)+"T");return(0,a.jsx)("div",{className:B()["likes-count"],children:(0,a.jsxs)("span",{className:B()["likes-count__text"],children:[o," Likes"]})})},T=n(32901),O=n.n(T),D=function(t){var e,n=t.viewsCount,r=Number(n),o=(e=r,Math.abs(e)<1e3?Math.sign(e)*e:Math.abs(e)>9999&&Math.abs(e)<1e6?Math.sign(e)*Math.round(Math.abs(e)/1e3)+"K":Math.abs(e)>999999&&Math.abs(e)<1e9?Math.sign(e)*Math.round(Math.abs(e)/1e6)+"M":Math.abs(e)>999999999&&Math.abs(e)<1e12?Math.sign(e)*Math.round(Math.abs(e)/1e9)+"B":Math.sign(e)*Math.round(Math.abs(e)/1e12)+"T");return(0,a.jsx)("div",{className:O()["views-count"],children:(0,a.jsxs)("span",{className:O()["views-count__text"],children:[o," Views"]})})},Q=n(67677),q=(n(55796),function(t){var e=t.values,n=e.data.isLike,r=e.data.data.images,o=e.data.isAuthor;return(0,a.jsxs)("div",{className:c().post,children:[(0,a.jsx)("div",{className:c().post__top,children:(0,a.jsx)(Q.tv,{"aria-label":"My Favorite Images",options:{rewind:!0,width:900,gap:"1rem"},style:{backgroundColor:"var(--meta-data)"},children:r.map((function(t,n){return(0,a.jsx)(Q.jw,{children:(0,a.jsx)("img",{className:c().post__images,src:t,width:900,height:900,alt:e.data.data.title},n)},n)}))})}),(0,a.jsxs)("div",{className:c().post__bottom,children:[(0,a.jsx)(k,{postId:e.data.data.id,isLike:n,isAuthor:o}),(0,a.jsx)(R,{likesCount:e.data.data.likes_count}),(0,a.jsx)(D,{viewsCount:e.data.data.views_count}),(0,a.jsx)(Z,{dateCreated:e.data.data.date_created})]})]})});function z(t,e,n,a,r,o,s){try{var i=t[o](s),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(a,r)}var Y=function(){var t,e=(t=p().mark((function t(e){var n,a;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.next=5;break;case 3:return n=t.sent,t.abrupt("return",n.data);case 5:return t.next=7,h().get("https://api.productaffair.com/api/post/".concat(e),{withCredentials:!0});case 7:return a=t.sent,t.abrupt("return",a.data);case 9:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){z(o,a,r,s,i,"next",t)}function i(t){z(o,a,r,s,i,"throw",t)}s(void 0)}))});return function(t){return e.apply(this,arguments)}}(),G=n(19574),H=n.n(G),K=n(41897),W=n.n(K),V=function(){return(0,a.jsx)("div",{className:W().overall,children:(0,a.jsx)("span",{className:W().overall__label,children:"Overall:"})})},J=n(27404),U=n.n(J),X=function(t){var e=t.overallRating,n=parseFloat(e).toFixed(1);return(0,a.jsx)("div",{className:U().overall,children:(0,a.jsx)("span",{className:U().overall__text,children:n})})},$=n(14755),tt=n.n($),et=function(t){var e=t.ratingsList,n=[{id:0,label:"Quality",rating:parseFloat(e.quality).toFixed(1)},{id:1,label:"Price",rating:parseFloat(e.price).toFixed(1)},{id:2,label:"Customer Service",rating:parseFloat(e.customer_service).toFixed(1)}];return(0,a.jsx)("div",{className:tt()["ratings-list"],children:n.map((function(t){return(0,a.jsxs)("div",{className:tt()["ratings-list__row"],children:[(0,a.jsx)("div",{className:tt()["ratings-list__title"],children:(0,a.jsx)("span",{className:tt()["ratings-list__label"],children:t.label})}),(0,a.jsx)("div",{className:tt()["ratings-list__score"],children:(0,a.jsx)("span",{className:tt()["ratings-list__text"],children:t.rating})})]},t.id)}))})},nt=n(66973),at=n.n(nt),rt=function(t){var e=t.storeName;return(0,a.jsx)("div",{className:at().store,children:(0,a.jsx)("span",{className:at().store__text,children:e})})},ot=n(73850),st=n.n(ot),it=function(t){var e=t.postTitle;return(0,a.jsx)("div",{className:st()["post-title"],children:(0,a.jsx)("h3",{className:st()["post-title__text"],children:e})})},ct=n(14957),ut=n(47874),mt=n.n(ut),lt=function(){return(0,a.jsx)("div",{className:mt().star,children:(0,a.jsx)(ct.Z,{className:mt().star__icon,sx:{fontSize:"1rem"}})})},_t=n(23508),dt=n(60181),pt=n(58533),ft=n(865),ht=n.n(ft),xt=function(){return(0,a.jsx)("div",{className:ht().from,children:(0,a.jsx)("span",{className:ht().from__label,children:"from"})})},vt=n(5529),bt=n.n(vt),gt=function(t){var e=t.username;return(0,a.jsx)("div",{className:bt()["comment-name"],children:(0,a.jsx)("a",{href:"http://localhost:8080",className:bt()["comment-name__link"],children:(0,a.jsxs)("span",{className:bt()["comment-name__text"],children:["@",e]})})})},jt=n(72727),wt=n.n(jt),kt=function(t){var e=t.dateCreated;N().extend(M()),N().extend(P()),N().extend(L());var n=N().tz.guess(),r=N()(e).tz(n).format("MMM DD, YYYY");return(0,a.jsx)("div",{className:wt()["comment-date"],children:(0,a.jsx)("span",{className:wt()["comment-date__text"],children:r})})},yt=n(50211),Nt=n.n(yt),Ct=function(t){var e=t.comment;return(0,a.jsx)("div",{className:Nt().comment,children:(0,a.jsx)("span",{className:Nt().comment__text,children:e})})},Mt=n(3725),St=n.n(Mt),Pt=function(t){var e,n=t.likesCount,r=(e=n,Math.abs(e)<1e3?Math.sign(e)*e:Math.abs(e)>999&&Math.abs(e)<1e6?Math.sign(e)*Math.round(Math.abs(e)/1e3)+"K":Math.abs(e)>999999&&Math.abs(e)<1e9?Math.sign(e)*Math.round(Math.abs(e)/1e6)+"M":Math.abs(e)>999999999&&Math.abs(e)<1e12?Math.sign(e)*Math.round(Math.abs(e)/1e9)+"B":Math.sign(e)*Math.round(Math.abs(e)/1e12)+"T");return(0,a.jsx)("div",{className:St()["comment-likes"],children:(0,a.jsxs)("span",{className:St()["comment-likes__text"],children:[r," Likes"]})})};function Ft(t,e,n,a,r,o,s){try{var i=t[o](s),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(a,r)}function Lt(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){Ft(o,a,r,s,i,"next",t)}function i(t){Ft(o,a,r,s,i,"throw",t)}s(void 0)}))}}var It=function(){var t=Lt(p().mark((function t(e){var n,a,r,o,s;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.queryKey,a=e.pageParam,r=void 0===a?0:a,t.next=6;break;case 4:return o=t.sent,t.abrupt("return",o.data.data);case 6:return t.next=8,h().get("https://api.productaffair.com/api/comments?postId=".concat(n[1],"&page=").concat(r),{withCredentials:!0});case 8:return s=t.sent,t.abrupt("return",s.data.data);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),At=function(){var t=Lt(p().mark((function t(e){var n,a;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.next=5;break;case 3:return n=t.sent,t.abrupt("return",n.data.data);case 5:return t.next=7,h().post("https://api.productaffair.com/api/comments",e,{withCredentials:!0});case 7:return a=t.sent,t.abrupt("return",a.data.data);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),Zt=function(){var t=Lt(p().mark((function t(e){var n,a;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.next=5;break;case 3:return n=t.sent,t.abrupt("return",n.data.data);case 5:return t.next=7,h().post("https://api.productaffair.com/api/comments/like",e,{withCredentials:!0});case 7:return a=t.sent,t.abrupt("return",a.data.data);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),Et=function(){var t=Lt(p().mark((function t(e){var n,a;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.next=5;break;case 3:return n=t.sent,t.abrupt("return",n.data.data);case 5:return t.next=7,h().post("https://api.productaffair.com/api/comments/unlike",e,{withCredentials:!0});case 7:return a=t.sent,t.abrupt("return",a.data.data);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),Bt=function(){var t=Lt(p().mark((function t(e){var n,a;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.next=5;break;case 3:return n=t.sent,t.abrupt("return",n.data.data);case 5:return t.next=7,h().post("https://api.productaffair.com/api/comments/delete",e,{withCredentials:!0});case 7:return a=t.sent,t.abrupt("return",a.data.data);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),Rt=n(54843),Tt=n(87827),Ot=n.n(Tt),Dt=function(t){t.isAuthor;var e=t.isLike,n=t.commentId,o=(0,r.useContext)(Rt.V).user.guest,s=(0,j.useQueryClient)(),i=(0,w.useRouter)(),c=(0,r.useState)(!1),l=c[0],_=c[1],d=(0,j.useMutation)({mutationFn:function(t){return Zt({commentId:t})},onSuccess:function(t){!0===t&&(_(!0),s.invalidateQueries(["getComments",n]))}}),p=(0,j.useMutation)({mutationFn:function(t){return Et({commentId:t})},onSuccess:function(t){!1===t&&(_(!1),s.invalidateQueries(["getComments",n]))}});return(0,r.useEffect)((function(){return!0===e?_(!0):!1===e?_(!1):void 0}),[e]),(0,a.jsx)("div",{className:Ot()["like-btn"],children:l?(0,a.jsx)(m.Z,{className:Ot()["like-btn__btn"],onClick:function(){!0===o&&i.push("/login"),p.mutate(n)}}):(0,a.jsx)(u.Z,{className:Ot()["like-btn__btn"],onClick:function(){!0===o&&i.push("/login"),d.mutate(n)}})})},Qt=n(15826),qt=n.n(Qt),zt=n(83321),Yt=n(98456),Gt=function(t){var e=t.commentBtn,n=t.isLoading;return(0,a.jsx)("div",{className:qt()["comment-btn"],children:e?(0,a.jsx)(zt.Z,{type:"submit",variant:"contained",disabled:n,className:qt()["comment-btn__btn"],sx:{borderRadius:"0"},children:n?(0,a.jsx)(Yt.Z,{className:qt()["comment-btn__loading-btn"],size:24,sx:{color:"var(--meta-data)"}}):"Comment"}):(0,a.jsx)(zt.Z,{type:"submit",variant:"contained",className:qt()["comment-btn__disabled-btn"],disabled:!0,sx:{borderRadius:"0"},children:"Comment"})})},Ht=n(27650),Kt=n.n(Ht),Wt=n(74231),Vt=n(95496),Jt=n(87536);function Ut(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function Xt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function $t(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),a.forEach((function(e){Xt(t,e,n[e])}))}return t}function te(t){return function(t){if(Array.isArray(t))return Ut(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"===typeof t)return Ut(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Ut(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var ee=Wt.Ry().shape({commentText:Wt.Z_().min(1).max(500).required().defined()}).defined(),ne=function(t){var e,n,o=t.setCommentError,s=t.setComment,i=t.comment,c=t.id,u=(0,w.useRouter)(),m=(0,r.useContext)(Rt.V),l=null===m||void 0===m||null===(e=m.auth)||void 0===e?void 0:e.verified,_=N()();N().extend(M()),N().extend(P()),N().extend(L());var d=N().tz.guess(),p=N()(_).tz(d).format("MMM DD, YYYY"),f=null===m||void 0===m||null===(n=m.user)||void 0===n?void 0:n.username,h=(0,r.useState)(!1),x=h[0],v=h[1],b=(0,Jt.cI)({resolver:(0,Vt.X)(ee)}),g=b.register,k=b.handleSubmit,y=(b.clearErrors,b.formState.errors,(0,j.useMutation)({mutationFn:function(t){var e=$t({id:c},t);return At(e)},onSuccess:function(t){var e={username:f,dateCreated:p,likesCount:0,isLike:!1,isAuthor:!0,commentId:t.commentId,commentText:t.commentText};s([e].concat(te(i))),o(!1)},onError:function(){o(!0)}})),C=y.mutate,S=(y.data,y.reset,y.isLoading),F=(y.isError,y.isSuccess,k((function(t){return l?C(t):u.push("/login")}),(function(t){o(!0)})));return(0,a.jsxs)("form",{className:Kt()["post-comments__comment-input"],onSubmit:F,autoComplete:"off",role:"presentation",children:[(0,a.jsx)("div",{className:Kt().comment,children:(0,a.jsx)("input",$t({type:"text",className:Kt().comment__input,placeholder:"Write a comment..."},g("commentText"),{onChange:function(t){return(e=t).target.value&&v(!0),void(""===e.target.value&&v(!1));var e},autoComplete:"off",role:"presentation"}))}),(0,a.jsx)(Gt,{commentBtn:x,isLoading:S})]})},ae=n(44895),re=n.n(ae),oe=n(41733);function se(t,e,n,a,r,o,s){try{var i=t[o](s),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(a,r)}var ie=function(t){var e=t.commentId,n=t.isAuthor,r=t.setComment,o=t.comment,s=(0,w.useRouter)(),i=(0,j.useQueryClient)(),c=(s.query.id,(0,j.useMutation)({mutationFn:function(t){return Bt({commentId:t})},onSuccess:function(){i.invalidateQueries({queryKey:["getComment",e]});var t=o.filter((function(t){return t.commentId!==e}));r(t)}})),u=(c.data,c.isLoading),m=c.isError,l=c.mutate,_=function(){var t,a=(t=p().mark((function t(){return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n&&l(e);case 2:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){se(o,a,r,s,i,"next",t)}function i(t){se(o,a,r,s,i,"throw",t)}s(void 0)}))});return function(){return a.apply(this,arguments)}}();return(0,a.jsx)("div",{children:u&&(0,a.jsx)(zt.Z,{disabled:u,children:(0,a.jsx)(oe.Z,{sx:{color:"var(--gray)",cursor:"pointer",fontSize:"1.3rem"},onClick:_})})?m:(0,a.jsx)(zt.Z,{children:(0,a.jsx)(oe.Z,{sx:{color:"var(--meta-data)",cursor:"pointer",fontSize:"1.3rem"},onClick:_})})})};function ce(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function ue(t){return function(t){if(Array.isArray(t))return ce(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"===typeof t)return ce(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ce(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var me=function(){var t=(0,w.useRouter)().query.id,e=(0,r.useState)(!1),n=e[0],o=e[1],s=(0,r.useState)(!1),i=s[0],c=s[1],u=(0,j.useInfiniteQuery)({queryKey:["getComments",t],queryFn:It,getNextPageParam:function(t,e){if(t)return e.length},onError:function(){c(!0)}}),m=u.data,l=(u.error,u.fetchNextPage),_=u.hasNextPage,d=u.isFetching,p=(u.isFetchingNextPage,u.status),f=(u.isLoading,(0,r.useState)([])),h=f[0],x=f[1];return(0,a.jsxs)("div",{className:re()["post-comments"],children:[(0,a.jsx)(ne,{setCommentError:o,setComment:x,comment:h,id:t}),n?(0,a.jsx)("div",{className:re()["post-comments__error-con"],children:(0,a.jsx)("span",{className:re()["post-comments__error"],children:"Couldn't comment. Please retry"})}):(0,a.jsx)(a.Fragment,{}),(0,a.jsxs)("div",{className:re()["post-comments__comment-section"],children:[h?h.map((function(t,e){return(0,a.jsxs)("div",{className:re()["post-comments__comment-section-body"],children:[(0,a.jsxs)("div",{className:re()["post-comments__comment-top"],children:[(0,a.jsxs)("div",{className:re()["post-comments__comment-name"],children:[(0,a.jsx)(xt,{}),(0,a.jsx)(gt,{username:t.username})]}),(0,a.jsx)(kt,{dateCreated:t.dateCreated})]}),(0,a.jsx)("div",{className:re()["post-comments__comment-mid"],children:(0,a.jsx)(Ct,{comment:t.commentText})}),(0,a.jsxs)("div",{className:re()["post-comments__comment-bot"],children:[(0,a.jsxs)("div",{className:re()["post-comments__comment-likes"],children:[(0,a.jsx)(Dt,{isLike:t.isLike,commentId:t.commentId,isAuthor:t.isAuthor}),(0,a.jsx)(Pt,{likesCount:t.likesCount})]}),t.isAuthor?(0,a.jsx)(ie,{commentId:t.commentId,isAuthor:t.isAuthor,comment:h,setComment:x}):(0,a.jsx)(a.Fragment,{})]})]},t.commentId)})):(0,a.jsx)(a.Fragment,{}),"loading"===p?(0,a.jsx)("div",{className:re()["loading-container"],children:(0,a.jsx)(Yt.Z,{className:re()["loading-container__loading"],sx:{color:"var(--meta-data)"},size:30})}):(0,a.jsx)(pt.Z,{dataLength:null===m||void 0===m?void 0:m.pages.length,next:function(){return l()},hasMore:_,loader:(0,a.jsx)(a.Fragment,{}),children:void 0===m.pages[0]?(0,a.jsx)("div",{className:re()["post-comments__comment-available"],children:(0,a.jsx)("span",{className:re()["post-comments__comment-available-text"],children:"No comments available."})}):null===m||void 0===m?void 0:m.pages.map((function(t){return null===t||void 0===t?void 0:t.map((function(t){if(h.some((function(e){return e.commentId===t.commentId})))return(0,a.jsx)(a.Fragment,{});var e={username:t.username,dateCreated:t.dateCreated,likesCount:t.likesCount,isLike:t.isLike,isAuthor:t.isAuthor,commentId:t.commentId,commentText:t.commentText};return x(ue(h).concat([e]))}))}))}),"loading"!==p&&d&&void 0!==m.pages?(0,a.jsx)("div",{className:re()["loading-container"],children:(0,a.jsx)(Yt.Z,{className:re()["loading-container__loading"],sx:{color:"var(--meta-data)"},size:30})}):(0,a.jsx)(a.Fragment,{}),i?(0,a.jsx)("div",{className:re().error,children:(0,a.jsx)("span",{className:re().error__text,children:"Sorry, there was a problem with your request."})}):(0,a.jsx)(a.Fragment,{})]})]})},le=function(t){var e=t.values,n=(0,r.useState)(!1),o=n[0],s=n[1];return(0,a.jsxs)("div",{className:H()["post-details"],children:[(0,a.jsx)(it,{postTitle:e.data.data.title}),(0,a.jsx)("div",{className:H()["post-details__store"],children:(0,a.jsx)(rt,{storeName:e.data.data.store_name})}),(0,a.jsxs)("div",{className:H()["post-details__overall-label"],children:[(0,a.jsx)(V,{}),(0,a.jsx)(lt,{}),(0,a.jsx)(X,{overallRating:e.data.data.overall_rating})]}),o?(0,a.jsx)(et,{ratingsList:e.data.data}):(0,a.jsx)(a.Fragment,{}),(0,a.jsx)("div",{className:H()["post-details__expand"],onClick:function(){s((function(t){return!0!==t}))},children:o?(0,a.jsx)(dt.Z,{}):(0,a.jsx)(_t.Z,{})}),(0,a.jsx)(me,{})]})},_e=n(9008),de=n.n(_e),pe=n(4298),fe=n.n(pe),he=n(16175),xe=n.n(he),ve=function(t){var e=t.profileImg;return(0,a.jsx)("div",{className:xe()["account-icon"],children:void 0===e.profileImg?(0,a.jsx)("div",{className:xe().tile}):(0,a.jsx)("div",{className:xe().tile,children:(0,a.jsx)("img",{className:xe().tile__image,src:e.profileImg,width:500,height:500})})})};function be(t,e,n,a,r,o,s){try{var i=t[o](s),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(a,r)}var ge=function(){var t,e=(t=p().mark((function t(e){var n,a;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.next=5;break;case 3:return n=t.sent,t.abrupt("return",n.data.data);case 5:return t.next=7,h().post("https://api.productaffair.com/api/deletepost",e,{withCredentials:!0});case 7:return a=t.sent,t.abrupt("return",a.data.data);case 9:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){be(o,a,r,s,i,"next",t)}function i(t){be(o,a,r,s,i,"throw",t)}s(void 0)}))});return function(t){return e.apply(this,arguments)}}();function je(t,e,n,a,r,o,s){try{var i=t[o](s),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(a,r)}var we=function(){var t=(0,w.useRouter)(),e=(0,j.useQueryClient)(),n=t.query.id,r=(0,j.useMutation)({mutationFn:function(t){return ge({postId:t})},onSuccess:function(){e.invalidateQueries({queryKey:["getPost",n]}),t.push("/")},onError:function(){t.push("/404")}}),o=(r.data,r.isLoading),s=r.isError,i=r.mutate,c=function(){var t,e=(t=p().mark((function t(){return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:i(n);case 1:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){je(o,a,r,s,i,"next",t)}function i(t){je(o,a,r,s,i,"throw",t)}s(void 0)}))});return function(){return e.apply(this,arguments)}}();return(0,a.jsx)("div",{children:o&&(0,a.jsx)(zt.Z,{disabled:o,children:(0,a.jsx)(oe.Z,{sx:{color:"var(--gray)",cursor:"pointer",fontSize:"1.3rem"},onClick:c})})?s:(0,a.jsx)(zt.Z,{children:(0,a.jsx)(oe.Z,{sx:{color:"var(--meta-data)",cursor:"pointer",fontSize:"1.3rem"},onClick:c})})})},ke=n(31812),ye=n(10384),Ne=n.n(ye),Ce=function(t){var e=t.values,n=e.author,r=e.user_id;return(0,a.jsx)("div",{className:Ne().uploader,children:(0,a.jsx)("a",{href:"https://www.productaffair.com/profile/".concat(r),className:Ne().uploader__link,children:(0,a.jsx)("span",{className:Ne().uploader__text,children:n})})})},Me=n(64982),Se=n.n(Me),Pe=n(17339),Fe=function(t){var e=t.userId,n=t.isFollowed,o=t.isAuthor,s=(0,w.useRouter)(),i=(0,r.useState)(!1),c=i[0],u=i[1],m=(0,r.useState)(!1),l=(m[0],m[1],(0,j.useQueryClient)(),(0,j.useMutation)({mutationFn:function(t){var e={userId:t};return(0,Pe.P)(e)},onSuccess:function(t){"Following"===t.data&&u(!0)},onError:function(){s.push("/404")}})),_=(0,j.useMutation)({mutationFn:function(t){var e={userId:t};return(0,Pe.w)(e)},onSuccess:function(t){"!Following"===t.data&&u(!1)},onError:function(){s.push("/404")}});return(0,r.useEffect)((function(){return"Following"===n&&"!Author"===o?u(!0):"!Following"===n&&"!Author"===o||"Guest"===n&&"Guest"===o?u(!1):void 0}),[n]),(0,a.jsx)("div",{className:Se()["follow-btn"],children:!1===c&&"!Author"===o||"Guest"===n&&"Guest"===o?(0,a.jsx)("button",{type:"button",className:Se()["follow-btn__btn"],onClick:function(){"Guest"===o&&s.push("/login"),"!Author"===o&&l.mutate(e)},children:"Follow"}):!0===c&&"!Author"===o?(0,a.jsx)("button",{type:"button",className:Se()["unfollow-btn__btn"],onClick:function(){"Guest"===o&&s.push("/login"),"!Author"===o&&_.mutate(e)},children:"Following"}):_.isLoading?(0,a.jsx)(ke.Z,{}):(0,a.jsx)(a.Fragment,{})})},Le=n(98396),Ie=function(){(0,Le.Z)("(min-width:56.25rem)");var t=(0,w.useRouter)(),e=t.query.id,n=(0,j.useQuery)(["getPost",e],(function(){return Y(e)})),r=n.data,o=n.isLoading,i=n.isError;if(o)return(0,a.jsx)("div",{className:s()["loading-container"],children:(0,a.jsx)(Yt.Z,{})});i&&t.push("/404");var c=r.isAuthor,u=r.isFollowed,m={data:r,isLoading:o,isError:i};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(de(),{children:[(0,a.jsx)("title",{children:m.data.data.title}),(0,a.jsx)("meta",{property:"description",name:"description",content:"Discover the best products on the market. Share your product experiences, upload images and make a review.","data-app":"true"}),(0,a.jsx)("meta",{property:"og:description",name:"og:description",content:"Discover the best products on the market. Share your product experiences, upload images and make a review.","data-app":"true"}),(0,a.jsx)("meta",{property:"og:type",name:"og:type",content:"website","data-app":"true"}),(0,a.jsx)("meta",{name:"google",content:"notranslate"}),(0,a.jsx)("meta",{name:"application-name",content:"Productaffair"}),(0,a.jsx)("meta",{property:"og:site_name",content:"Productaffair"}),(0,a.jsx)("meta",{property:"og:url",content:"https://wwww.productaffair.com"}),(0,a.jsx)("meta",{property:"og:locale",content:"en_US"})]}),(0,a.jsx)(fe(),{src:"https://www.googletagmanager.com/gtag/js?id=G-2FJZ116LFW",strategy:"afterInteractive"}),(0,a.jsx)(fe(),{id:"google-analytics",strategy:"afterInteractive",children:"window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'G-2FJZ116LFW');"})]}),(0,a.jsx)("main",{className:s()["post-main"],children:(0,a.jsxs)("section",{className:s()["post-main__section"],children:[(0,a.jsxs)("div",{className:s()["post-main__uploader"],children:[(0,a.jsxs)("div",{className:s()["post-main__uploader-name"],children:[(0,a.jsx)(ve,{profileImg:m.data.data}),(0,a.jsx)(Ce,{values:m.data.data})]}),"!Author"===c&&"!Following"===u||"Guest"===c&&"Guest"===u?(0,a.jsx)(Fe,{userId:m.data.data.user_id,isFollowed:u,isAuthor:c}):o?(0,a.jsx)(ke.Z,{loading:!0}):"Author"===c?(0,a.jsx)(we,{}):(0,a.jsx)(Fe,{userId:m.data.data.user_id,isFollowed:u,isAuthor:c})]}),(0,a.jsxs)("div",{className:s()["main-content"],children:[(0,a.jsx)(q,{values:m}),(0,a.jsx)(le,{values:m})]})]})})]})},Ae=function(){return(0,a.jsx)(Ie,{})}},44895:function(t){t.exports={"loading-container":"CommentSection_loading-container__aJK30","loading-container__loading":"CommentSection_loading-container__loading__QWjdW","post-comments__comment-section-body":"CommentSection_post-comments__comment-section-body__pZSvm","post-comments__comment-top":"CommentSection_post-comments__comment-top__tT3p_","post-comments__comment-name":"CommentSection_post-comments__comment-name__gyBOa","post-comments__comment-mid":"CommentSection_post-comments__comment-mid__7bc6P","post-comments__comment-likes":"CommentSection_post-comments__comment-likes__6qEC1","post-comments__comment-bot":"CommentSection_post-comments__comment-bot__xdepJ","post-comments__comment-readmore":"CommentSection_post-comments__comment-readmore__K9mlJ","post-comments__error-con":"CommentSection_post-comments__error-con__JtNV4","post-comments__error":"CommentSection_post-comments__error__PCSSD","post-comments__comment-available":"CommentSection_post-comments__comment-available__syBhd","post-comments__comment-available-text":"CommentSection_post-comments__comment-available-text__z0tHF","comment-input-con":"CommentSection_comment-input-con__0rfLb",error:"CommentSection_error__svnVX",error__text:"CommentSection_error__text__iHoxc"}},15826:function(t){t.exports={"comment-btn":"CommentBtn_comment-btn__qR3vR","comment-btn__btn":"CommentBtn_comment-btn__btn__QujUc","comment-btn__disabled-btn":"CommentBtn_comment-btn__disabled-btn__BPD1d","comment-btn__loading-btn":"CommentBtn_comment-btn__loading-btn__cHb7u"}},87827:function(t){t.exports={"like-btn__btn":"LikeBtn_like-btn__btn__zBebu"}},27650:function(t){t.exports={"post-comments__comment-input":"Comment_post-comments__comment-input__v1xDR",comment:"Comment_comment__NnWL0",comment__input:"Comment_comment__input__WgyQI"}},865:function(t){t.exports={from:"FromLabel_from__hB7cq",from__label:"FromLabel_from__label__nn4mS"}},5529:function(t){t.exports={"comment-name__link":"CommenterLink_comment-name__link__3K2kL","comment-name__text":"CommenterLink_comment-name__text__OSSbF"}},72727:function(t){t.exports={"comment-date":"CommentDate_comment-date__QlpAH","comment-date__text":"CommentDate_comment-date__text__BeHr1"}},3725:function(t){t.exports={"comment-likes":"CommentLikes_comment-likes__oaI44","comment-likes__text":"CommentLikes_comment-likes__text__Fvybh"}},50211:function(t){t.exports={comment:"CommentText_comment__7xEgR",comment__text:"CommentText_comment__text__FFrpw"}},19574:function(t){t.exports={"post-details":"PostDetails_post-details__eXO8l","post-details__uploader":"PostDetails_post-details__uploader__ImjOh","post-details__uploader-name":"PostDetails_post-details__uploader-name__2Byqg","post-details__main":"PostDetails_post-details__main__3nSwt","post-details__store":"PostDetails_post-details__store__i8QNR","post-details__overall-label":"PostDetails_post-details__overall-label__qbIHW","post-details__expand":"PostDetails_post-details__expand__lsnMl"}},64982:function(t){t.exports={"follow-btn":"FollowBtn_follow-btn__cWN6S","follow-btn__btn":"FollowBtn_follow-btn__btn__MLE9_","unfollow-btn":"FollowBtn_unfollow-btn__idv4K","unfollow-btn__btn":"FollowBtn_unfollow-btn__btn__1ZeL7"}},16175:function(t){t.exports={"account-icon":"ProfileIcon_account-icon__NSewB","account-icon__icon":"ProfileIcon_account-icon__icon__tuNEM",tile:"ProfileIcon_tile__PbMpY",tile__image:"ProfileIcon_tile__image__HS2Ng"}},47874:function(t){t.exports={star:"StarIcon_star__DqR7w",star__icon:"StarIcon_star__icon___bIEm"}},41897:function(t){t.exports={overall:"OverallLabel_overall__5XBsU",overall__label:"OverallLabel_overall__label__cNYdr"}},10384:function(t){t.exports={uploader:"UploaderLink_uploader__g9vP4",uploader__link:"UploaderLink_uploader__link___btFQ",uploader__text:"UploaderLink_uploader__text__67JaA"}},27404:function(t){t.exports={overall:"OverallRating_overall__mHZ0n",overall__text:"OverallRating_overall__text__imNSC"}},14755:function(t){t.exports={"ratings-list":"RatingsList_ratings-list__WOpqe","ratings-list__row":"RatingsList_ratings-list__row__BqQtX","ratings-list__score":"RatingsList_ratings-list__score__ocQq_","ratings-list__label":"RatingsList_ratings-list__label__sb77t","ratings-list__text":"RatingsList_ratings-list__text__MLVsI"}},73850:function(t){t.exports={"post-title__text":"PostTitle_post-title__text__xYDXU"}},66973:function(t){t.exports={store:"StoreName_store__kuwPQ",store__text:"StoreName_store__text__Mp_Hz"}},35403:function(t){t.exports={post:"Post_post__4amES",post__top:"Post_post__top__AJFVT",post__bottom:"Post_post__bottom__mL_I_",post__images:"Post_post__images__Z4r9_"}},57512:function(t){t.exports={"like-btn":"LikeBtn_like-btn__Zhr_O","like-btn__unlike-icon":"LikeBtn_like-btn__unlike-icon__gMGZg","like-btn__like-icon":"LikeBtn_like-btn__like-icon__PFj56"}},60552:function(t){t.exports={dateposted__text:"DatePosted_dateposted__text___w45q"}},46965:function(t){t.exports={"likes-count":"LikesCount_likes-count__INWez","likes-count__text":"LikesCount_likes-count__text__uiJ3O"}},32901:function(t){t.exports={"views-count":"ViewsCount_views-count__sZu0C","views-count__text":"ViewsCount_views-count__text__rgvlp"}},3019:function(t){t.exports={"loading-container":"PostTemplate_loading-container__HesIS","post-main":"PostTemplate_post-main__PRMFB","post-main__uploader":"PostTemplate_post-main__uploader__l03em","post-main__uploader-name":"PostTemplate_post-main__uploader-name__G8nSF","post-main__section":"PostTemplate_post-main__section__6VyZ_","main-content":"PostTemplate_main-content__LCdHh"}}},function(t){t.O(0,[796,355,241,774,888,179],(function(){return e=23208,t(t.s=e);var e}));var e=t.O();_N_E=e}]);