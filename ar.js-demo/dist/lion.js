!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=14)}([function(e,t,n){"use strict";function r(){i.call(this),this.setMaxListeners(20)}var i=n(6).EventEmitter;r.prototype=Object.create(i.prototype),r.prototype.constructor=r,r.prototype.off=function(e,t){return t?this.removeListener(e,t):e?this.removeAllListeners(e):this.removeAllListeners()},e.exports=r},function(e,t,n){"use strict";e.exports={mbs:0,secs:0,update:function(e,t,n,r){var i,o=e.getAllResponseHeaders();if(o){var s=o.match(/content-length: (\d+)/i);s&&s.length&&(i=s[1])}if(i){i=parseInt(i,10);var a=i/1024/1024,u=(Date.now()-t)/1e3;this.secs+=u,this.mbs+=a,r&&this.log(n,a,u)}else r&&console.warn.call(console,"Can't get Content-Length:",n)},log:function(e,t,n){if(e){var r="File loaded: "+e.substr(e.lastIndexOf("/")+1)+" size:"+t.toFixed(2)+"mb time:"+n.toFixed(2)+"s speed:"+(t/n).toFixed(2)+"mbps";console.log.call(console,r)}var i="Total loaded: "+this.mbs.toFixed(2)+"mb time:"+this.secs.toFixed(2)+"s speed:"+this.getMbps().toFixed(2)+"mbps";console.log.call(console,i)},getMbps:function(){return this.mbs/this.secs}}},function(e,t,n){"use strict";var r=n(4);r.stats=n(1),e.exports=r},function(e,t,n){"use strict";e.exports=function(){try{return!!new Blob}catch(e){return!1}}()},function(e,t,n){"use strict";var r=n(0),i=n(5),o=0;e.exports=function e(t){var n,s={},a=[],u=[],c=0,l=0,d={},f=function(r){if(Array.isArray(r))return r.forEach(f),n;var o,s=!!r.assets&&Array.isArray(r.assets);return o=s?e(m(r,t)):i(m(r,t)),o.once("destroy",E),u.push(o),d[o.id]=o,n},h=function(e){return arguments.length?s[e]?s[e]:d[e]:a},p=function(e){if(h(e))return h(e);var t=null;return Object.keys(d).some(function(n){return!!(t=d[n].find&&d[n].find(e))}),t},v=function(e){return e&&e.split("?")[0].split(".").pop().toLowerCase()},m=function(e,t){if("string"==typeof e){e={url:e}}return void 0===e.isTouchLocked&&(e.isTouchLocked=t.isTouchLocked),void 0===e.blob&&(e.blob=t.blob),void 0===e.basePath&&(e.basePath=t.basePath),e.id=e.id||e.url||String(++o),e.type=e.type||v(e.url),e.crossOrigin=e.crossOrigin||t.crossOrigin,e.webAudioContext=e.webAudioContext||t.webAudioContext,e.log=t.log,e},y=function(){return l=u.length,u.forEach(function(e){e.on("progress",g).once("complete",w).once("error",b).start()}),u=[],n},g=function(e){var t=c+e;n.emit("progress",t/l)},w=function(e,t,r){Array.isArray(e)&&(e={id:t,file:e,type:r}),c++,n.emit("progress",c/l),s[e.id]=e.file,a.push(e),n.emit("childcomplete",e),x()},b=function(e){l--,n.listeners("error").length?n.emit("error",e):console.error(e),x()},E=function(e){d[e]=null,delete d[e],s[e]=null,delete s[e],a.some(function(t,n){if(t.id===e)return a.splice(n,1),!0})},x=function(){c>=l&&n.emit("complete",a,s,t.id,"group")},_=function(){for(;u.length;)u.pop().destroy();return n.off("error"),n.off("progress"),n.off("complete"),a=[],s={},t.webAudioContext=null,l=0,c=0,Object.keys(d).forEach(function(e){d[e].destroy()}),d={},n.emit("destroy",n.id),n};return n=Object.create(r.prototype,{_events:{value:{}},id:{get:function(){return t.id}},add:{value:f},start:{value:y},get:{value:h},find:{value:p},getLoader:{value:function(e){return d[e]}},loaded:{get:function(){return c>=l}},file:{get:function(){return a}},destroy:{value:_}}),t=m(t||{},{basePath:"",blob:!1,touchLocked:!1,crossOrigin:null,webAudioContext:null,log:!1}),Array.isArray(t.assets)&&f(t.assets),Object.freeze(n)}},function(e,t,n){"use strict";var r=n(0),i=n(3),o=n(1);e.exports=function(e){var t,n,s,a,u,c,l=e.id,d=e.basePath||"",f=e.url,h=e.type,p=e.crossOrigin,v=e.isTouchLocked,m=e.blob&&i,y=e.webAudioContext,g=e.log,w=function(){switch(a=Date.now(),h){case"json":T();break;case"jpg":case"png":case"gif":case"webp":case"svg":M();break;case"mp3":case"ogg":case"opus":case"wav":case"m4a":S();break;case"ogv":case"mp4":case"webm":case"hls":C();break;case"bin":case"binary":E("arraybuffer");break;case"txt":case"text":E("text");break;default:throw"AssetsLoader ERROR: Unknown type for file with URL: "+d+f+" ("+h+")"}},b=function(e){e&&(c={id:l,file:e,type:h},t.emit("progress",1),t.emit("complete",c,l,h),z())},E=function(e,t){n=t||_,s=new XMLHttpRequest,s.open("GET",d+f,!0),s.responseType=e,s.addEventListener("progress",x),s.addEventListener("load",n),s.addEventListener("error",j),s.send()},x=function(e){e.lengthComputable&&t.emit("progress",e.loaded/e.total)},_=function(){L()&&b(s.response)},L=function(){return s&&s.status<400?(o.update(s,a,f,g),!0):(j(s&&s.statusText),!1)},T=function(){E("json",function(){if(L()){var e=s.response;"string"==typeof e&&(e=JSON.parse(e)),b(e)}})},M=function(){m?A():R()},R=function(){s=new Image,p&&(s.crossOrigin="anonymous"),s.addEventListener("error",j,!1),s.addEventListener("load",k,!1),s.src=d+f},k=function(e){if(window.clearTimeout(u),!e&&(s.error||!s.readyState))return void j();b(s)},A=function(){E("blob",function(){L()&&(s=new Image,s.addEventListener("error",j,!1),s.addEventListener("load",H,!1),s.src=window.URL.createObjectURL(s.response))})},H=function(){window.URL.revokeObjectURL(s.src),b(s)},S=function(){y?O():P("audio")},C=function(){m?E("blob"):P("video")},O=function(){E("arraybuffer",function(){L()&&y.decodeAudioData(s.response,function(e){s=null,b(e)},function(e){j(e)})})},P=function(e){s=document.createElement(e),v||(window.clearTimeout(u),u=window.setTimeout(k,2e3),s.addEventListener("canplaythrough",k,!1)),s.addEventListener("error",j,!1),s.preload="auto",s.src=d+f,s.load(),v&&b(s)},j=function(e){window.clearTimeout(u);var n=e;if(s&&s.tagName&&s.error){n="MediaError: "+["","ABORTED","NETWORK","DECODE","SRC_NOT_SUPPORTED"][s.error.code]+" "+s.src}else s&&s.statusText?n=s.statusText:e&&e.message?n=e.message:e&&e.type&&(n=e.type);t.emit("error",'Error loading "'+d+f+'" '+n),F()},z=function(){t.off("error"),t.off("progress"),t.off("complete"),s&&(s.removeEventListener("progress",x),s.removeEventListener("load",n),s.removeEventListener("error",j),s.removeEventListener("load",k),s.removeEventListener("canplaythrough",k),s.removeEventListener("load",H))},F=function(){z(),s&&s.abort&&s.readyState<4&&s.abort(),s=null,y=null,c=null,window.clearTimeout(u),t.emit("destroy",l)};return t=Object.create(r.prototype,{_events:{value:{}},id:{value:e.id},start:{value:w},loaded:{get:function(){return!!c}},file:{get:function(){return c}},destroy:{value:F}}),Object.freeze(t)}},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function i(e){return"number"==typeof e}function o(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!i(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,i,a,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var l=new Error('Uncaught, unspecified "error" event. ('+t+")");throw l.context=t,l}if(n=this._events[e],s(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),n.apply(this,a)}else if(o(n))for(a=Array.prototype.slice.call(arguments,1),c=n.slice(),i=c.length,u=0;u<i;u++)c[u].apply(this,a);return!0},n.prototype.addListener=function(e,t){var i;if(!r(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?o(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,o(this._events[e])&&!this._events[e].warned&&(i=s(this._maxListeners)?n.defaultMaxListeners:this._maxListeners)&&i>0&&this._events[e].length>i&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),i||(i=!0,t.apply(this,arguments))}if(!r(t))throw TypeError("listener must be a function");var i=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,i,s,a;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],s=n.length,i=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(o(n)){for(a=s;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){i=a;break}if(i<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],r(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){return this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(r(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){function t(){d.onResize(),d.copySizeTo(r.domElement),null!==f.arController&&d.copySizeTo(f.arController.canvas)}function n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;if(_.push(e),_.length<t+1)return e;_.shift();var n=(new THREE.Matrix4).multiplyScalar(0);for(var r in _)for(var i in _[r].elements)n.elements[i]+=_[r].elements[i];return n.multiplyScalar(1/t)}var r=new THREE.WebGLRenderer({antialias:!0,alpha:!0});r.shadowMap.type=THREE.PCFSoftShadowMap,r.shadowMap.enabled=!0,r.autoClear=!1,r.setClearColor(0),r.setSize(window.innerWidth,window.innerHeight),r.domElement.style.position="absolute",r.domElement.style.top="0px",r.domElement.style.left="0px",e.appendChild(r.domElement);var i=[],o=new THREE.Scene;o.add(new THREE.AmbientLight(13421772));var a=new THREE.DirectionalLight(16777215,1);a.position.set(1,1,1).normalize(),o.add(a),new THREE.PointLight(13421772,1,500).position.set(12,12,12);var c=new THREE.Camera;o.add(c);var l=void 0;l=debug?{sourceType:"image",sourceUrl:"./parttern/fu-profile.png"}:{sourceType:"webcam"};var d=new THREEx.ArToolkitSource(l);d.init(function(){t()}),window.addEventListener("resize",function(){t()});var f=new THREEx.ArToolkitContext({cameraParametersUrl:"./data/camera_para.dat",detectionMode:"mono",patternRatio:.9});f.init(function(){c.projectionMatrix.copy(f.getProjectionMatrix())}),i.push(function(){!1!==d.ready&&(f.update(d.domElement),o.visible=c.visible)});var h=new THREE.Group;o.add(h);new THREEx.ArMarkerControls(f,c,{type:"pattern",patternUrl:"./parttern/fu-marker.patt",changeMatrixMode:"cameraTransformMatrix"});o.visible=!1;var p=new THREE.Group;o.add(p);var v=new THREEx.ArSmoothedControls(p,{lerpPosition:.8,lerpQuaternion:.8,lerpScale:1});i.push(function(e){v.update(h)});var m=new THREE.Scene;if(h.add(m),m.fog=new THREE.Fog(10526880,200,1e3),debug){var y=new THREE.AxesHelper;m.add(y)}var g=new THREE.ShadowMaterial;g.opacity=.7;//! bug in threejs. can't set in constructor
var w=new THREE.PlaneGeometry(6,6),b=new THREE.Mesh(w,g);b.receiveShadow=!0,b.depthWrite=!1,b.rotation.x=-Math.PI/2,m.add(b);var E=new s.default(o,c,r);E.load(function(){m.add(E.mesh),a.target=E.mesh});var x=new u.default(o,c,r);x.load(function(){m.add(x.mesh[0])}),i.push(function(){E.render(),x.render()});var _=[],L=new Stats;document.body.appendChild(L.dom),i.push(function(){c.updateMatrix(),c.matrix.copy(n(c.matrix.clone())),r.render(o,c),L.update()});var T=null;requestAnimationFrame(function e(t){requestAnimationFrame(e),T=T||t-1e3/60;var n=Math.min(200,t-T);T=t,i.forEach(function(e){e(n/1e3,t/1e3)})})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var o=n(12),s=r(o),a=n(13),u=r(a);window.debug=!1},,,,function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t,n,i){r(this,e),this.scene=t,this.camera=n,this.renderer=i,this.clock=new THREE.Clock,this._init()}return i(e,[{key:"_init",value:function(){this.mixers=[];var e=window.debug?.03:.06;this.scaleSize=e}},{key:"load",value:function(e){var t=this;(new THREE.FBXLoader).load("models/animated/lion.FBX",function(n){n.mixer=new THREE.AnimationMixer(n),t.mixers.push(n.mixer),n.mixer.clipAction(n.animations[0]).play(),n.traverse(function(e){e.isMesh&&(e.receiveShadow=!0,t._setMatrial(e))}),n.scale.set(t.scaleSize,t.scaleSize,t.scaleSize),n.rotation.y=Math.PI,n.rotation.x=-Math.PI/2,t.mesh=n,e()})}},{key:"render",value:function(){var e=this.clock.getDelta();if(this.mixers.length>0)for(var t=0;t<this.mixers.length;t++)this.mixers[t].update(e)}},{key:"_setMatrial",value:function(e){e.material.map=new THREE.CanvasTexture(document.querySelector("img"))}}]),e}();t.default=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=0,s=0,a=function(){function e(t,n,i){r(this,e),this.scene=t,this.camera=n,this.renderer=i,this.clock=new THREE.Clock,this._originalMesh=null,this._init()}return i(e,[{key:"_init",value:function(){this.mesh=[];var e=window.debug?120:180;this.scaleSize=e}},{key:"load",value:function(e){var t=this;(new THREE.FBXLoader).load("models/animated/yuanbao.FBX",function(n){n.scale.set(t.scaleSize,t.scaleSize,t.scaleSize),n.rotation.x=1.2*Math.PI,n.position.y=Math.random(),n.position.z=-1.7,t._originalMesh=n,t.mesh.push(n),e()})}},{key:"render",value:function(){this.clock.getDelta();if((s=performance.now())-o>2e3&&this._originalMesh&&this._originalMesh.position.z>0){for(var e=0;e<3;e++){var t=this._originalMesh.clone();t.position.x=2*(2*Math.random()-1),t.position.z=-1.7-Math.random(),this.scene.add(t),this.mesh.push(t)}o=s}if(this.mesh)for(var n=0;n<this.mesh.length;n++){this.mesh[n].position.z+=.04;var r=this.camera;r.updateMatrix(),r.updateMatrixWorld();var i=new THREE.Frustum;i.setFromMatrix((new THREE.Matrix4).multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse));var a=this.mesh[n].position;!i.containsPoint(new THREE.Vector3(a.x,a.y,a.z-.8))&&a.z>0&&this.scene.remove(this.mesh[n])}}},{key:"_setMatrial",value:function(e){}}]),e}();t.default=a},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){window.assets=e,(0,u.default)(c),setTimeout(function(){l.style.display="none",document.querySelector("canvas").style.opacity=1},200)}var o=n(2),s=r(o),a=n(8),u=r(a),c=document.querySelector(".container"),l=c.querySelector(".progress-bar"),d=[{id:"bg",url:"textures/bg1.jpg"},{id:"cloud",url:"textures/cloud.png"}];window.getAssets=function(e){return window.assets.find(function(t){return t.id===e}).file};(0,s.default)({log:!0}).add(d).on("error",function(e){console.error(e)}).on("progress",function(e){l.innerHTML="Loading..."+(100*e).toFixed()+"%"}).on("complete",i).start()}]);