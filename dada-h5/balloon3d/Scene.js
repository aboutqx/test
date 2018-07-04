var THREE = require('./three.min')
//var OrbitControls = require('three-orbit-controls')(THREE)
//canvas dom,model params
var Scene = function(dom, option) {
    this.container = dom;
    this.option=option||{}


    this.stats, this.controls;
    this.camera, this.scene, this.renderer;
    this.canvasWidth, this.canvasHeight;

    this.fov = 45;

    this.object, this.isloaded = false;
    this.init();

}

Scene.prototype = {
    init: function() {
        var option = this.option;

        this.canvasWidth = option.width || window.innerWidth;
        this.canvasHeight = option.height || window.innerHeight;

        this.camera = new THREE.PerspectiveCamera(this.fov, this.canvasWidth / this.canvasHeight, .1, 50000);

        // scene
        this.scene = new THREE.Scene();
        this.scene.camera=this.camera;
        this.addLight();

        if (this.container.querySelector('canvas')) {
            this.container.removeChild(this.container.querySelector('canvas'))
        }
        this.renderer = new THREE.WebGLRenderer({ alpha: option.alpha || true, antialias: false });
        this.gl = this.renderer.context;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        this.renderer.setClearColor(0x202327, 1);//111222
        this.container.appendChild(this.renderer.domElement);


        //this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
        //this.controls.enableDamping = true;
        //this.controls.dampingFactor = 0.25;

        //this.addGridHelper(5);
        //this.initPostprocessing();
 
    },
    add:function(object){
        this.scene.add(object)
    },
    initPostprocessing: function() {
        try{
            this.composer = new THREE.EffectComposer(this.renderer);
            this.msaaRenderPass = new THREE.ManualMSAARenderPass(this.scene, this.camera);
            this.msaaRenderPass.unbiased = true;
            this.composer.addPass(this.msaaRenderPass);
            this.copyPass = new THREE.ShaderPass(THREE.CopyShader);

            this.copyPass.renderToScreen = true;
            this.composer.addPass(this.copyPass);

            this.msaaRenderPass.sampleLevel = 4;

        }catch(e){
            console.warn("can't init Postprocessing")
        }
    },
    addLightHelpr: function() {

        var matBox = new THREE.MeshPhongMaterial();
        var geoBox = new THREE.BoxGeometry(5000, 5000, 5000);

        var skyBox = new THREE.Mesh(geoBox, matBox);
        this.scene.add(skyBox);

        lightHelper = new THREE.SpotLightHelper(this.spotLight);
        this.scene.add(lightHelper);
    },
    addGridHelper: function(step, size) {
        var size = size || 10;

        var gridHelper = new THREE.GridHelper(size, step);
        this.scene.add(gridHelper);
    },
    addLight: function() {

        var ambLight = new THREE.AmbientLight(0xfff000, 1);

        this.scene.add(ambLight)

        this.pointLight = new THREE.PointLight(0xffffff, 1, 330)
        this.pointLight.position.set(0,0,300)
        this.scene.add(this.pointLight)
    },

    resize: function(w,h) {
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    },
    onMouseMove: function(e) {


    },
    animate: function() {
        var self = this;
        requestAnimationFrame(function() { self.animate() });
        
        this.render();
    },

    render: function() {
        this.lightHelper && this.lightHelper.update(); // required

        //this.controls.update();
        this.composer ? (this.composer.render()) : this.renderer.render(this.scene, this.camera);
    }
}
module.exports=Scene;