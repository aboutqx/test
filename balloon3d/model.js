var lightHelper;
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    Render = Matter.Render,
    Bodies = Matter.Bodies;
var engine;
var P=[];
var B,R,L={};
var balloonPosition = [[-474, -166, 5.6],[-484, 75, 5.5],[-219, 117, 5.2],[-320, -6, 5.2],[-475, 166, 5],
    [-393, -181, 5],[-246, 18, 4.9],[-378, 180, 4.7],[-490, -95, 4.3],[-478, -20, 4.3],[-280, -107, 4.2],[-319, -176, 4.1],
    [-293, 180, 4.1],[-404, -9, 3.8],[-4, 145, 5.7],[-20, -185, 4.6],[3, -26, 4.4],[-30, 51, 4.3],
    [210, -88, 6.1],[265, 149, 5.2],[273, -163, 5],[435, 6, 5],[211, 88, 4.8],[499, 113, 4.7],
    [353, 170, 4.7],[344, -206, 4.6],[466, -153, 4.5],[435, 160, 4.4],[501, 11, 4.3],[177, 8, 4.3],[410, -198, 3.6]
];
function isMobile(){
    var ua=navigator.userAgent.toLowerCase();
    return /android|iphone|ipad/.test(ua)
}
loadModel=function(modelParams) {
        this.objectLoader = new THREE.OBJLoader();
        var self = this;

        this.objectLoader.load(modelParams.path, function(obj) {
            obj.name = modelParams.name;
            B=obj;
            new balloonWorld().init();
        });
}


var balloonWorld = function() {
    this.scene = new Scene(document.querySelector('.container'));
    this.scene.camera.position.set(0,0,830);
    this.scene.controls.enabled=false;

    this.onMouseMove=this._onMouseMove.bind(this),
    this.resize=this._resize.bind(this),
    this.onTouchMove = this._onTouchMove.bind(this);
    window.addEventListener("resize", this.resize), isMobile() ? (window.addEventListener("touchmove", this.onTouchMove), window.addEventListener("touchend", function() {
        L.x = -1, L.y = -1
    })) : window.addEventListener("mousemove", this.onMouseMove)

}
balloonWorld.prototype = {
    init: function() {
        this.initPhysicsWorld(), this.addBalloons(), this.resize();

        this.update();

        //this.setDebug(15)

    },

    initPhysicsWorld:function(){
        var e = {
            create: function() {
                return {
                    controller: e
                }
            },
            world: function(e) {}
        };
        engine = Engine.create({
                //render: {
                    //controller: e
                //},
                constraintIterations: .1,
                positionIterations: .5
            }),
            engine.world.gravity.y = .01,
            Engine.run(engine),
            R = Bodies.circle(500, 50, 80, {
                collisionFilter: {
                    category: 2,
                    group: 0,
                    mask: 1
                },
                render: {
                    fillStyle: "#00ff00"
                }
            }),
        World.add(engine.world, R),
        Matter.Runner.stop(engine)

    },
    addBalloons: function() {
        var self=this,t = (window.innerWidth,window.innerHeight,0);
        n=balloonPosition;
        isMobile() && (n = balloonPosition.splice(0, 20))
        n.forEach(function(n, i) {
            var r = B.clone();
            o = isMobile() ? [100 * Math.random() - 50, n[1] / 5, n[2] / 1.5] : n;
            console.log(o)
            r.children[0].material=new THREE.MeshBasicMaterial({
                color: 0x8329aa,
                transparent:true,
                opacity:.6
            })
            a = new balloonGroup({
                model: r,
                position: [o[0], o[1]],
                scale: o[2],
                scene: self.scene,
                id: i
            });
            a.pBalloon.ropeEls.forEach(function(e) {
                World.add(engine.world, e)
            }), a.pBalloon.ropeBodies.forEach(function(e) {
                t += 1
            }), 
                World.add(engine.world, a.pBalloon.balloonBody), 
                P.push(a), 
                self.scene.add(a)

        })
    },
    setDebug:function(index){
        var t=P[index];
        t.line.material=new THREE.LineBasicMaterial({
            color: 0x0000ff
        });
        t.line.material.needsUpdate=true;
        t.balloon.children[0].material=new THREE.MeshBasicMaterial({
            color: 0x0000ff
        });
        t.balloon.children[0].material.needsUpdate=true;
        THREE.Vector3.prototype.toString=function(){
            return this.x+' '+this.y+' '+this.z
        }
        console.log('balloon index:'+index)
        console.log('line last vertices position:'+t.line.geometry.vertices[t.line.geometry.vertices.length-1].toString());
        console.log('balloon position:'+t.balloon.position.toString())
        var x=(-window.innerWidth/2+t.pBalloon.ropeBodies[t.pBalloon.ropeBodies.length-1].position.x);
        var y=(-t.pBalloon.ropeBodies[t.pBalloon.ropeBodies.length-1].position.y+window.innerHeight/2)
    
        console.log('rope last vertices turn to 3d position:'+x+' '+y)
    },
    _resize: function(){
        S = window.innerWidth, M = window.innerHeight, this.scene.resize(S, M),
        P.forEach(function(e) {
            e.pBalloon.ropeEls.forEach(function(e) {
                World.remove(engine.world, e)
            }), World.remove(engine.world, e.pBalloon.balloonBody)
        });
        for (var e = 0; e < P.length; e++) P[e].setPosition(S, M);
        P.forEach(function(e) {
            e.pBalloon.ropeEls.forEach(function(e) {
                World.add(engine.world, e)
            }), World.add(engine.world, e.pBalloon.balloonBody)
        })
    },
    _onMouseMove: function(e) {

        b = null;

        L.x = e.pageX,
            L.y = e.pageY,
            this.scene.pointLight.position.x = e.pageX - window.innerWidth / 2,
            this.scene.pointLight.position.y = -1 * (e.pageY - window.innerHeight / 2);
        var t = new THREE.Vector3;
        t.set(e.pageX / window.innerWidth * 2 - 1, 2 * -(e.pageY / window.innerHeight) + 1, .5),
            t.unproject(this.scene.camera),
            t.sub(this.scene.camera.position),
            t.x *= this.scene.camera.position.z / -t.z,
            t.y *= this.scene.camera.position.z / -t.z,
            t.x = t.x + window.innerWidth / 2,
            t.y = -t.y + window.innerHeight / 2;
        Body.setPosition(R, t);
        for (var n = 0; n < P.length; n++)
        P[n].updateMouseUniform(L)

    },
    _onTouchMove: function(e) {
        L.x = e.targetTouches[0].clientX, L.y = e.targetTouches[0].clientY, 
        this.scene.pointLight.position.x = e.targetTouches[0].clientX - window.innerWidth / 2, this.scene.pointLight.position.y = -1 * (e.targetTouches[0].clientY - window.innerHeight / 2);
        var t = new THREE.Vector3;
        t.set(e.targetTouches[0].clientX / window.innerWidth * 2 - 1, 2 * -(e.targetTouches[0].clientY / window.innerHeight) + 1, .5), t.unproject(this.scene.camera), t.sub(this.scene.camera.position), 
        t.x *= this.scene.camera.position.z / -t.z, t.y *= this.scene.camera.position.z / -t.z, t.x = t.x + window.innerWidth / 2, t.y = -t.y + window.innerHeight / 2,
        Body.setPosition(R, t);
        for (var n = 0; n < P.length; n++) P[n].updateMouseUniform(L)
    },
    update:function(){
        var self = this;
        requestAnimationFrame(function() { self.update() });
        this.scene.render();
        for (var e = 0; e < P.length; e++) P[e].update();
    }
}

var balloonGroup= function(e){
    THREE.Object3D.call(this)
    this.opts = e,
    this.balloonId = this.opts.id,
    this.pballoon,
    this.initPhysics(),
    this.init()
}
balloonGroup.prototype=Object.create(THREE.Object3D.prototype);
balloonGroup.prototype.initPhysics = function(t) {
    this.pBalloon = new balloonsPhysical({
        nbLinks: 15,
        position: {
            rawX: this.opts.position[0],
            rawY: this.opts.position[1],
            x: window.innerWidth/2- (-1 * this.opts.position[0]), 
            y: window.innerHeight/2 + this.opts.position[1]
        }
    }), this.originPosition = {
        x: window.innerWidth/2- (-1 * this.opts.position[0]), 
        y: window.innerHeight/2 + this.opts.position[1]
    }
}
c = (new THREE.Raycaster, new THREE.Vector2(2, 2)),
m = {
    uMouse: {
        type: "v2",
        value: c
    },
    uResolution: {
        type: "v2",
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
    },
    uIsDebug: {
        type: "f",
        value: 0
    },
    uGlobalAlpha: {
        type: "f",
        value: 1
    },
    tDiffuse: {
        type: "t",
        value: THREE.ImageUtils.loadTexture("img/env_map6.jpg")
    },
    mRefractionRatio: {
        type: "f",
        value: 1.02
    },
    mFresnelBias: {
        type: "f",
        value: .1
    },
    mFresnelPower: {
        type: "f",
        value: 2
    },
    mFresnelScale: {
        type: "f",
        value: 1
    },
};
m.tDiffuse.texture = THREE.ImageUtils.loadTexture("img/pano.jpg"), m.tDiffuse.texture.wrapT = THREE.RepeatWrapping, m.tDiffuse.texture.wrapS = THREE.RepeatWrapping, m.tDiffuse.texture.minFilter = THREE.LinearMipMapLinearFilter;
vs = "#define GLSLIFY 1\n"+
"uniform vec2 uMouse;\n"+
"varying vec3 vPosition;\n"+
"\n"+
"\n"+
"varying vec3 vReflect;\n"+
"varying vec2 vUV;\n"+
"varying float intensity;\n"+
"varying float vAlpha;\n"+
"\n"+

"uniform float mFresnelBias;\n"+
"uniform float mFresnelScale;\n"+
"uniform float mFresnelPower;\n"+
"\n"+
"varying float vReflectionFactor;\n"+
"\n"+
"void main() {\n"+
"\n"+
"  vUV = uv;\n"+
"\n"+
"  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n"+
"  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n"+
"  vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );\n"+
"  vec3 I = worldPosition.xyz - cameraPosition;\n"+
"  vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );\n"+
"\n"+
"  vec4 mPosition = modelMatrix * vec4( position, 1.0 );\n"+
"  vec3 nWorld = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );\n"+
"  I = cameraPosition - mPosition.xyz;\n"+
"  vReflect = normalize( reflect( I, nWorld ) );\n"+
"  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n"+
"\n"+
"  worldPosition = modelMatrix * vec4(position, 1.0);\n"+
"  float distFromMouse = distance( uMouse, gl_Position.xy / gl_Position.w );\n"+
"  vAlpha = ( ( 1.0 - ( distFromMouse * 4.0 ) ) * 0.5 ) + .5;\n"+
"  vAlpha = clamp( vAlpha, 0.0, 1.0 );\n"+
"\n"+
"  vPosition = gl_Position.xyz / gl_Position.w ;\n"+
"\n"+
"}\n"+
""

fs= "#define GLSLIFY 1\n"+
"uniform vec2 uResolution;\n"+
"uniform float uGlobalAlpha;\n"+
"varying vec3 vPosition;\n"+
"uniform sampler2D tDiffuse;\n"+
"uniform float mRefractionRatio;\n"+
"varying vec3 vReflect;\n"+
"varying float intensity;\n"+
"varying float vAlpha;\n"+
"\n"+
"varying float vReflectionFactor;\n"+
"\n"+
"varying vec2 vUV;\n"+
"\n"+
"void main(void) {\n"+
"\n"+
"  float PI = 3.14159265358979323846264;\n"+
"  float yaw = .5 + atan( vReflect.z, vReflect.x ) / ( 2.0 * PI );\n"+
"  float pitch = .5 + atan( vReflect.y, length( vReflect.xz ) ) / ( PI );\n"+
"  vec3 color = texture2D( tDiffuse, vec2( yaw, pitch ) ).rgb;\n"+
"  vec4 gradientColor = vec4( vec3( vPosition.xy * 0.5 + 0.5, 1.0 ) , 1.0 );\n"+
"  vec4 restColor = vec4( vec3( 0.40 ), 1.0 );\n"+
"\n"+
"  vec4 mixColor = mix( gradientColor, restColor, 1.0 - vAlpha );\n"+
"\n"+
"  vec3 reflectionColor = color * ( vReflectionFactor - 0.1 );\n"+
"  vec3 metalReflectionColor = (reflectionColor * mixColor.xyz) / 0.2;\n"+
"  vec3 flatReflectionColor = (reflectionColor + mixColor.xyz) / 0.2;\n"+
"\n"+
"  vec3 mixedReflection = mix( metalReflectionColor, flatReflectionColor, 0.3 );\n"+
"  vec3 final = mixedReflection;\n"+
"\n"+
"  gl_FragColor = vec4( vec3( vAlpha * mixedReflection * 1.0 ) + ( metalReflectionColor * 0.3 ) , 0.85 * uGlobalAlpha );\n"+
"\n"+
"}\n"+
""

v= new THREE.ShaderMaterial({
    uniforms: m,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: !0
})
balloonGroup.prototype.init = function() {
    var e = this;
    this.balloon = this.opts.model, this.balloon.balloonId = this.opts.id,
        this.balloon.position.x = this.opts.position[0], this.balloon.position.y = this.opts.position[1],
        this.balloon.scale.x = this.balloon.scale.y = this.balloon.scale.z = this.opts.scale,
        this.balloon.sortObjects = !1, this.add(this.balloon),
        this.balloon.traverse(function(e) {
            e instanceof THREE.Mesh && (e.material = v, e.renderOrder = 1)
        });
    var t = new THREE.LineBasicMaterial({
            color: 0,
            transparent: !0,
            opacity: 1
        }),
        n = new THREE.Geometry;
    this.pBalloon.ropeBodies.forEach(function(t) {
            n.vertices.push(new THREE.Vector3(e.opts.position[0], -t.position.y + window.innerHeight / 2, 0))
        }), this.line = new THREE.Line(n, t),
        this.add(this.line)

}
balloonGroup.prototype.getRopeAngle= function() {
    var e = this.pBalloon.ropeBodies.length,
        t = this.pBalloon.ropeBodies[e - 1],
        n = this.pBalloon.ropeBodies[e - 2],
        i = Math.atan2(n.position.y - t.position.y, t.position.x - n.position.x);
    return i += Math.PI / 2, i -= Math.PI
}
balloonGroup.prototype.attractToOrigin= function() {
    var e = Matter.Vector.sub(this.originPosition, this.pBalloon.balloonBody.position),
        t = Matter.Vector.normalise(e),
        n = Matter.Vector.mult(t, 0);
    n.y -= .03, Matter.Body.applyForce(this.pBalloon.balloonBody, this.pBalloon.balloonBody.position, n)
}
balloonGroup.prototype.update= function(){

    if (this.pBalloon.balloonBody && !(!this.line.geometry.vertices.length > 0)) {
        this.attractToOrigin();
        var e = this.getRopeAngle();
        this.balloon.position.x = this.pBalloon.balloonBody.position.x - window.innerWidth / 2, this.balloon.position.y = -this.pBalloon.balloonBody.position.y + window.innerHeight / 2;
        this.balloon.rotation.z = e;
        this.balloon.rotation.y=Math.PI/2;
        this.balloon.position.y-=48;
        for (var t = this.pBalloon.ropeBodies, n = this.pBalloon.ropeBodies.length, i = 0; n > i; i++) {
            var r = t[i],
                o = this.line.geometry.vertices[i];
            r && o && (o.x = r.position.x - window.innerWidth / 2, o.y = -r.position.y + window.innerHeight / 2)
        }
        this.line.geometry.verticesNeedUpdate = !0
    }

}
balloonGroup.prototype.updateMouseUniform = function(e){
    var t = e.x / window.innerWidth * 2 - 1,
        n = 2 * -(e.y / window.innerHeight) + 1;
    this.balloon.children[0].material.uniforms.uMouse.value = {
        x: t,
        y: n,
        z: 0
    }
}
balloonGroup.prototype.setPosition = function(w,h){

    var t = this;
    this.remove(this.line);
    var n = new THREE.LineBasicMaterial({
            color: 0,
            transparent: !0,
            opacity: 1
        }),
        i = new THREE.Geometry;
    this.pBalloon.ropeBodies.forEach(function(e) {
        i.vertices.push(new THREE.Vector3(t.opts.position[0], -e.position.y + window.innerHeight / 2, 0))
    }), this.line = new THREE.Line(i, n), this.add(this.line), 
    this.pBalloon.setPosition()

}
var balloonsPhysical = function(t) {
    this.position = t.position||{x: 0,y: 0};
    this.ropeHeight = window.innerHeight - this.position.y,
    this.ropeInterLinkLength = 40, 
    this.nbLinks = Math.floor(this.ropeHeight / this.ropeInterLinkLength), 
    this.ropeEls = [], this.ropeBodies = [], this.balloonBody, 
    this.initRope(),
    this.initBalloon();
}
balloonsPhysical.prototype =  {
    initRope: function() {
        var e = window.innerHeight,
            t = this.ropeHeight / this.nbLinks;
        this.ropeBodies = [], this.ropeEls = [];
        for (var n = 0; n < this.nbLinks; n++) {
            if(this.balloonId==15) console.log(e - n * t)
            var i = this.position.x,
                r = e - n * t,
                o = .8,
                a = Bodies.circle(i, r, 5, {
                    mass: o,
                    inverseMass: 1 / o,
                    collisionFilter: {
                        category: 1,
                        group: 0,
                        mask: 2
                    },
                    render: {
                        strokeStyle: "#ff0000",
                        fillStyle: "transparent"
                    }
                }),
                c = void 0;
            n > 0 ? (c = Constraint.create({
                        bodyA: a,
                        bodyB: this.ropeBodies[n - 1],
                        stiffness: 0,
                        length: t,

                        render: {
                            strokeStyle: "#00ff00"
                        }
                    }),
                    this.ropeEls.push(c)) : a.isStatic = !0,
                this.ropeEls.push(a),
                this.ropeBodies.push(a)
        }
    },
    initBalloon: function() {
        this.balloonBody = null;
        var e = this.position.x,
            t = this.position.y,
            n = this.ropeHeight / (this.nbLinks - 1),
            i = void 0;
        this.balloonBody = Bodies.rectangle(e, t, 50, 65, {
            frictionAir: .15,
            collisionFilter: {
                category: 1,
                group: 0,
                mask: 7
            },
            render: {
                strokeStyle: "#00ff00"
            }
        });
        var r = Constraint.create({
            bodyA: this.balloonBody,
            bodyB: this.ropeBodies[this.nbLinks - 1],
            stiffness: 1,
            length: n,
            render: {
                strokeStyle: "#00ff00"
            }
        });
        this.ropeEls.push(r)
    },
    setPosition:function(e){
        this.initRope(), this.initBalloon();
        var t = this.ropeBodies[0],
            n = window.innerWidth / 2,
            i = window.innerHeight / 2,
            r = n - (-1 * this.position.rawX);
        i + this.position.rawY;
        Matter.Body.setPosition(t, {
            x: r,
            y: window.innerHeight
        })
    }
}