"use strict";(self.webpackChunktai_gi=self.webpackChunktai_gi||[]).push([[850],{9850:function(e,t,r){r.r(t),r.d(t,{AudioVisualizer:function(){return g},LiveAudioVisualizer:function(){return d}});var n,i=r(1413),a=r(4165),o=r(5861),u=r(9439),c=r(2791),f={exports:{}},l={};f.exports=function(){if(n)return l;n=1;var e=c,t=Symbol.for("react.element"),r=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,a=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function u(e,r,n){var u,c={},f=null,l=null;for(u in void 0!==n&&(f=""+n),void 0!==r.key&&(f=""+r.key),void 0!==r.ref&&(l=r.ref),r)i.call(r,u)&&!o.hasOwnProperty(u)&&(c[u]=r[u]);if(e&&e.defaultProps)for(u in r=e.defaultProps)void 0===c[u]&&(c[u]=r[u]);return{$$typeof:t,type:e,key:f,ref:l,props:c,_owner:a.current}}return l.Fragment=r,l.jsx=u,l.jsxs=u,l}();var s=f.exports,d=function(e){var t=e.mediaRecorder,r=e.width,n=void 0===r?"100%":r,i=e.height,a=void 0===i?"100%":i,o=e.barWidth,f=void 0===o?2:o,l=e.gap,d=void 0===l?1:l,h=e.backgroundColor,v=void 0===h?"transparent":h,g=e.barColor,m=void 0===g?"rgb(160, 198, 255)":g,p=e.fftSize,b=void 0===p?1024:p,y=e.maxDecibels,x=void 0===y?-10:y,w=e.minDecibels,R=void 0===w?-90:w,C=e.smoothingTimeConstant,_=void 0===C?.4:C,S=(0,c.useState)((function(){return new AudioContext})),k=(0,u.Z)(S,1)[0],E=(0,c.useState)(),A=(0,u.Z)(E,2),D=A[0],O=A[1],Z=(0,c.useRef)(null);(0,c.useEffect)((function(){if(t.stream){var e=k.createAnalyser();O(e),e.fftSize=b,e.minDecibels=R,e.maxDecibels=x,e.smoothingTimeConstant=_,k.createMediaStreamSource(t.stream).connect(e)}}),[t.stream]),(0,c.useEffect)((function(){D&&"recording"===t.state&&P()}),[D,t.state]);var P=(0,c.useCallback)((function(){if(D){var e=new Uint8Array(null==D?void 0:D.frequencyBinCount);"recording"===t.state?(null==D||D.getByteFrequencyData(e),T(e),requestAnimationFrame(P)):"paused"===t.state?T(e):"inactive"===t.state&&"closed"!==k.state&&k.close()}}),[D,k.state]),T=function(e){if(Z.current){var t=function(e,t,r,n){var i=t/(r+n),a=Math.floor(e.length/i);i>e.length&&(i=e.length,a=1);for(var o=[],u=0;u<i;u++){for(var c=0,f=0;f<a&&u*a+f<e.length;f++)c+=e[u*a+f];o.push(c/a)}return o}(e,Z.current.width,f,d);!function(e,t,r,n,i,a){var o=t.height/2,u=t.getContext("2d");u&&(u.clearRect(0,0,t.width,t.height),"transparent"!==i&&(u.fillStyle=i,u.fillRect(0,0,t.width,t.height)),e.forEach((function(e,t){u.fillStyle=a;var i=t*(r+n),c=o-e/2,f=r,l=e||1;u.beginPath(),u.roundRect?(u.roundRect(i,c,f,l,50),u.fill()):u.fillRect(i,c,f,l)})))}(t,Z.current,f,d,v,m)}};return s.jsx("canvas",{ref:Z,width:n,height:a,style:{aspectRatio:"unset"}})},h=function(e,t,r,n,i){for(var a=e.getChannelData(0),o=r/(n+i),u=Math.floor(a.length/o),c=t/2,f=[],l=0,s=0;s<o;s++){for(var d=[],h=0,v=[],g=0,m=0;m<u&&s*u+m<e.length;m++){var p=a[s*u+m];p<=0&&(d.push(p),h++),p>0&&(v.push(p),g++)}var b=d.reduce((function(e,t){return e+t}),0)/h,y={max:v.reduce((function(e,t){return e+t}),0)/g,min:b};y.max>l&&(l=y.max),Math.abs(y.min)>l&&(l=Math.abs(y.min)),f.push(y)}if(.8*c>l*c){var x=.8*c/l;f=f.map((function(e){return{max:e.max*x,min:e.min*x}}))}return f},v=function(e,t,r,n,i,a,o){var u=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0,c=arguments.length>8&&void 0!==arguments[8]?arguments[8]:1,f=t.height/2,l=t.getContext("2d");if(l){l.clearRect(0,0,t.width,t.height),"transparent"!==i&&(l.fillStyle=i,l.fillRect(0,0,t.width,t.height));var s=(u||0)/c;e.forEach((function(t,i){var u=i/e.length,c=s>u;l.fillStyle=c&&o?o:a;var d=i*(r+n),h=f+t.min,v=r,g=f+t.max-h;l.beginPath(),l.roundRect?(l.roundRect(d,h,v,g,50),l.fill()):l.fillRect(d,h,v,g)}))}},g=(0,c.forwardRef)((function(e,t){var r=e.blob,n=e.width,f=e.height,l=e.barWidth,d=void 0===l?2:l,g=e.gap,m=void 0===g?1:g,p=e.currentTime,b=e.style,y=e.backgroundColor,x=void 0===y?"transparent":y,w=e.barColor,R=void 0===w?"rgb(184, 184, 184)":w,C=e.barPlayedColor,_=void 0===C?"rgb(160, 198, 255)":C,S=(0,c.useRef)(null),k=(0,c.useState)([]),E=(0,u.Z)(k,2),A=E[0],D=E[1],O=(0,c.useState)(0),Z=(0,u.Z)(O,2),P=Z[0],T=Z[1];return(0,c.useImperativeHandle)(t,(function(){return S.current}),[]),(0,c.useEffect)((function(){(0,o.Z)((0,a.Z)().mark((function e(){var t,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(S.current){e.next=2;break}return e.abrupt("return");case 2:if(r){e.next=6;break}return t=Array.from({length:100},(function(){return{max:0,min:0}})),v(t,S.current,d,m,x,R,_),e.abrupt("return");case 6:return e.next=8,r.arrayBuffer();case 8:return i=e.sent,e.next=11,(new AudioContext).decodeAudioData(i,(function(e){if(S.current){T(e.duration);var t=h(e,f,n,d,m);D(t),v(t,S.current,d,m,x,R,_)}}));case 11:case"end":return e.stop()}}),e)})))()}),[r,S.current]),(0,c.useEffect)((function(){S.current&&v(A,S.current,d,m,x,R,_,p,P)}),[p,P]),s.jsx("canvas",{ref:S,width:n,height:f,style:(0,i.Z)({},b)})}));g.displayName="AudioVisualizer"}}]);
//# sourceMappingURL=850.a9f21915.chunk.js.map