(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[5],{131:function(e,c,t){},132:function(e,c,t){},135:function(e,c,t){},241:function(e,c,t){},250:function(e,c,t){"use strict";t.r(c);var a=t(14),n=t(0),s=t(16),r=(t(40),t(71)),i=(t(72),t(15),t(69)),l=t(10),j=t(41),o=(t(131),t.p+"static/media/mjolnir.61f31e18.png"),b=t(1),u=Object(i.a)("single"),d=function(e){var c=e.data,t=Object(l.d)(),a=Object(l.e)((function(e){return e.char})).randomCharLoadingStatus,n=c.name,r=c.description,i=c.thumbnail,o=(c.thumbnailName,c.homepage,c.wiki,c.id),u={data:c,id:o,status:a},d=/image_not_available/.test(i)?{objectFit:"unset"}:{objectFit:"cover"};return Object(b.jsxs)("div",{className:"randomchar__block",children:[Object(b.jsx)("img",{src:i,style:d,alt:"Random character",className:"randomchar__img"}),Object(b.jsxs)("div",{className:"randomchar__info",children:[Object(b.jsx)("p",{className:"randomchar__name",children:n}),Object(b.jsx)("p",{className:"randomchar__descr",children:r}),Object(b.jsx)("div",{className:"randomchar__btns",children:Object(b.jsx)(s.b,{to:"/characters/".concat(o),className:"button button__main",children:Object(b.jsx)("div",{className:"inner",onClick:function(){t(Object(j.a)(u))},children:"\u041d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443"})})})]})]})},h=function(){var e=Object(l.d)(),c=Object(l.e)((function(e){return e.char})),t=c.randomCharData,s=c.randomCharLoadingStatus,r=Object(n.useState)({}),i=Object(a.a)(r,2),h=i[0],m=i[1];Object(n.useEffect)((function(){O();var e=setInterval(O(),6e4);return function(){clearInterval(e)}}),[]),Object(n.useEffect)((function(){f(t)}),[t]);var O=function(){var c=Math.floor(400*Math.random()+1011e3);e(Object(j.d)(c)),f(t)},f=function(e){m(e)};return Object(b.jsxs)("div",{className:"randomchar",children:[u(s,d,h),Object(b.jsxs)("div",{className:"randomchar__static",children:[Object(b.jsxs)("p",{className:"randomchar__title",children:["\u0421\u043b\u0443\u0447\u0430\u0439\u043d\u044b\u0439 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436 \u043d\u0430 \u0441\u0435\u0433\u043e\u0434\u043d\u044f!",Object(b.jsx)("br",{}),"\u0425\u043e\u0447\u0435\u0448\u044c \u0440\u0430\u0437\u0443\u0437\u043d\u0430\u0442\u044c \u043e \u043d\u0451\u043c \u043f\u043e-\u043b\u0443\u0447\u0448\u0435?"]}),Object(b.jsx)("p",{className:"randomchar__title",children:"\u0418\u043b\u0438 \u0432\u044b\u0431\u0435\u0440\u0438 \u043a\u043e\u0433\u043e-\u043d\u0438\u0431\u0443\u0434\u044c \u0435\u0449\u0451"}),Object(b.jsx)("button",{className:"button button__main",onClick:O,children:Object(b.jsx)("div",{className:"inner",children:"\u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439 \u044d\u0442\u043e"})}),Object(b.jsx)("img",{src:o,alt:"mjolnir",className:"randomchar__decoration"})]})]})},m=t(44),O=t(26),f=t(25),_=t(251),x=t(252),v=(t(132),Object(i.a)("list")),N=function(){var e=Object(f.c)(),c=Object(n.useState)([]),t=Object(a.a)(c,2),s=t[0],r=t[1],i=Object(n.useState)(!1),l=Object(a.a)(i,2),o=l[0],u=l[1],d=Object(n.useState)(210),h=Object(a.a)(d,2),N=h[0],p=h[1],g=Object(n.useState)(!1),k=Object(a.a)(g,2),w=k[0],y=k[1],E=Object(O.b)(N),S=E.currentData,C=void 0===S?[]:S,F=E.isError,L=E.isLoading,U=E.isFetching,D=L||U,I=L||U?"loading":F?"error":"confirmed";Object(n.useEffect)((function(){return"confirmed"===I&&M(),function(){r([]),p(210),m.a.dispatch(O.a.util.resetApiState())}}),[]),Object(n.useEffect)((function(){"confirmed"===I&&M()}),[I]);var M=function(){console.log("JUST Request"),u(I),R(C)},R=function(e){var c=!1;e.length%9!=0&&(c=!0),r((function(e){return e.concat(C)})),u(I),y(c)},J=Object(n.useRef)([]),q=function(c,t){e(Object(j.c)(t)),J.current.forEach((function(e){return e.classList.remove("char__item_selected")})),J.current[c].classList.add("char__item_selected"),J.current[c].focus()},A=Object(n.useMemo)((function(){return s?v(I,(function(){return function(e){var c=e.map((function(e,c){var t=/image_not_available/.test(e.thumbnail)?{objectFit:"unset"}:{objectFit:"cover"};return Object(b.jsx)(_.a,{timeout:500,classNames:"char__item",children:Object(b.jsxs)("li",{className:"char__item",tabIndex:0,ref:function(e){return J.current[c]=e},onClick:function(){q(c,e.id)},onKeyPress:function(t){" "!==t.key&&"Enter"!==t.key||q(c,e.id)},children:[Object(b.jsx)("img",{src:e.thumbnail,alt:e.name,style:t}),Object(b.jsx)("div",{className:"char__name",children:e.name})]},e.id)},e.id)}));return Object(b.jsx)("ul",{className:"char__grid",children:Object(b.jsx)(x.a,{component:null,children:c})})}(s)}),o):null}),[I,s,N,C]);return Object(b.jsxs)("div",{className:"char__list",children:[A,Object(b.jsx)("button",{className:"button button__main button__long",disabled:D,style:{display:w?"none":"block"},onClick:function(){return p((function(e){return e+9}))},children:Object(b.jsx)("div",{className:"inner",children:"\u041f\u043e\u0434\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c"})})]})},p=t(45),g=(t(135),Object(i.a)("single")),k=function(e){var c=e.data,t=Object(l.d)(),a=Object(l.e)((function(e){return e.char})).charLoadingStatus,n=c.name,r=c.description,i=c.thumbnail,o=(c.homepage,c.wiki,c.comics),u=c.id,d={data:c,id:u,status:a},h=/image_not_available'/.test(i)?{objectFit:"contain"}:{objectFit:"cover"};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("div",{className:"char__basics",children:[Object(b.jsx)("img",{src:i,style:h,alt:n}),Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{className:"char__info-name",children:n}),Object(b.jsx)("div",{className:"char__btns",children:Object(b.jsx)(s.b,{to:"/characters/".concat(u),className:"button button__main",children:Object(b.jsx)("div",{className:"inner",onClick:function(){t(Object(j.a)(d))},children:"\u041d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443"})})})]})]}),Object(b.jsx)("div",{className:"char__descr",children:r}),Object(b.jsx)("div",{className:"char__comics",children:"\u041a\u043e\u043c\u0438\u043a\u0441\u044b:"}),Object(b.jsxs)("ul",{className:"char__comics-list",children:[o.length>0?null:"\u041a \u0441\u043e\u0436\u0430\u043b\u0435\u043d\u0438\u044e \u043a\u043e\u043c\u0438\u043a\u0441\u044b \u043f\u043e \u0434\u0430\u043d\u043d\u043e\u043c\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0443 \u043e\u0442\u0441\u0443\u0442\u0441\u0432\u0443\u044e\u0442",o.map((function(e,c){if(!(c>9)){var a=e.resourceURI.split("/").splice(-1);return Object(b.jsx)("li",{className:"char__comics-item",children:Object(b.jsx)(s.b,{to:"/comics/".concat(u),className:"",children:Object(b.jsx)("div",{className:"inner",onClick:function(){t(Object(p.b)(a))},children:e.name})})},c)}}))]})]})},w=function(){var e=Object(l.e)((function(e){return e.char})),c=e.charData,t=e.charLoadingStatus,s=Object(n.useState)(null),r=Object(a.a)(s,2),i=r[0],j=r[1];Object(n.useEffect)((function(){o()}),[]),Object(n.useEffect)((function(){o()}),[c]);var o=function(){c&&u(c)},u=function(e){j(e)};return Object(b.jsx)("div",{className:"char__info",children:g(t,k,i)})},y=t(245),E=t(246),S=(t(241),function(){var e=Object(l.d)(),c=Object(l.e)((function(e){return e.char})),t=c.searchCharLoadingStatus,r=c.searchCharData,i=Object(n.useState)({}),o=Object(a.a)(i,2),u=o[0],d=o[1],h=Object(n.useState)("idle"),m=Object(a.a)(h,2),O=m[0],f=m[1];Object(n.useEffect)((function(){d({}),f("idle")}),[]),Object(n.useLayoutEffect)((function(){return d(r),f(t),function(){d({}),f("idle")}}),[r,t]);var _={data:r,id:r.id,status:t},x=0===Object.keys(u).length?null:0!==Object.keys(u).length&&"error"!==O?Object(b.jsxs)("div",{className:"char__search-wrapper",children:[Object(b.jsxs)("div",{className:"char__search-success",children:["\u041d\u0430\u0439\u0434\u0435\u043d! \u041f\u043e\u0441\u0435\u0442\u0438\u0442\u044c \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 ",u.name,"?"]}),Object(b.jsx)(s.b,{to:"/characters/".concat(u.id),className:"button button__secondary",children:Object(b.jsx)("div",{className:"inner",onClick:function(){e(Object(j.a)(_))},children:"\u041d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443"})})]}):Object(b.jsx)("div",{className:"char__search-error",children:"\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d \u0438\u043b\u0438 \u0437\u0430\u043f\u0440\u043e\u0441 \u043d\u0435 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d. \u041f\u0435\u0440\u0435\u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0438\u043c\u044f \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0432\u043d\u043e\u0432\u044c"});return Object(b.jsxs)("div",{className:"char__search-form",children:[Object(b.jsx)(y.d,{initialValues:{charName:""},validationSchema:E.a({charName:E.b().required("\u042d\u0442\u043e \u043f\u043e\u043b\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e")}),onSubmit:function(c){var t,a=c.charName;t=a,e(Object(j.e)(t))},children:Object(b.jsxs)(y.c,{children:[Object(b.jsx)("label",{className:"char__search-label",htmlFor:"charName",children:"\u0418\u043b\u0438 \u043d\u0430\u0439\u0434\u0438\u0442\u0435 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430 \u043f\u043e \u0438\u043c\u0435\u043d\u0438:"}),Object(b.jsxs)("div",{className:"char__search-wrapper",children:[Object(b.jsx)(y.b,{id:"charName",name:"charName",type:"text",placeholder:"Enter name"}),Object(b.jsx)("button",{type:"submit",className:"button button__main",disabled:"loading"===O,children:Object(b.jsx)("div",{className:"inner",children:"\u043d\u0430\u0439\u0442\u0438"})})]}),Object(b.jsx)(y.a,{component:"div",className:"char__search-error",name:"charName"})]})}),x]})}),C=t(62),F=t(63),L=t(67),U=t(68),D=function(e){Object(L.a)(t,e);var c=Object(U.a)(t);function t(){var e;Object(C.a)(this,t);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=c.call.apply(c,[this].concat(n))).state={error:!1},e}return Object(F.a)(t,[{key:"componentDidCatch",value:function(e,c){console.log(e,c),this.setState({error:!0})}},{key:"render",value:function(){return this.state.error?Object(b.jsx)(r.a,{}):this.props.children}}]),t}(n.Component);c.default=function(){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(D,{children:Object(b.jsx)(h,{})}),Object(b.jsxs)("div",{className:"char__content",children:[Object(b.jsx)(D,{children:Object(b.jsx)(N,{})}),Object(b.jsxs)("div",{children:[Object(b.jsx)(D,{children:Object(b.jsx)(w,{})}),Object(b.jsx)(D,{children:Object(b.jsx)(S,{})})]})]})]})}},69:function(e,c,t){"use strict";var a=t(40),n=t(71),s=t(72),r=t(1);c.a=function(e){switch(e){case"single":return function(e,c,t){switch(e){case"idle":return t?Object(r.jsx)(c,{data:t}):Object(r.jsx)(s.a,{});case"loading":return Object(r.jsx)(a.a,{});case"error":return Object(r.jsx)(n.a,{});default:throw new Error("Unexpected process state")}};case"list":return function(e,c,t){switch(e){case"loading":return t?Object(r.jsx)(c,{}):Object(r.jsx)(a.a,{});case"confirmed":return Object(r.jsx)(c,{});case"error":return Object(r.jsx)(n.a,{});default:throw new Error("Unexpected process state")}};case"page":return function(e,c,t){switch(e){case"idle":return t?Object(r.jsx)(c,{data:t}):Object(r.jsx)(s.a,{});case"loading":return Object(r.jsx)(a.a,{});case"error":return Object(r.jsx)(n.a,{});default:throw new Error("Unexpected process state")}};default:throw new Error("Unexpected process state")}}},71:function(e,c,t){"use strict";var a=t.p+"static/media/ErrorMessage.42292aa1.gif",n=t(1);c.a=function(){return Object(n.jsx)("img",{src:a,alt:"Error",style:{objectFit:"contain",display:"block",width:"250px",height:"250px",margin:"0 auto"}})}},72:function(e,c,t){"use strict";t(74);var a=t(1);c.a=function(){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("p",{className:"char__select",children:"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438 \u0433\u0435\u0440\u043e\u044f \u0441\u043b\u0435\u0432\u0430 \u0434\u043b\u044f \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438"}),Object(a.jsxs)("div",{className:"skeleton",children:[Object(a.jsxs)("div",{className:"pulse skeleton__header",children:[Object(a.jsx)("div",{className:"pulse skeleton__circle"}),Object(a.jsx)("div",{className:"pulse skeleton__mini"})]}),Object(a.jsx)("div",{className:"pulse skeleton__block"}),Object(a.jsx)("div",{className:"pulse skeleton__block"}),Object(a.jsx)("div",{className:"pulse skeleton__block"})]})]})}},74:function(e,c,t){}}]);
//# sourceMappingURL=5.88e098c4.chunk.js.map