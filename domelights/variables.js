    var renderer, composer, scene, camera, stats;
    var DomeGroup, swipeMesh;

    var projector, raycaster, intersects;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var mouse = { x: 1, y: 1 }, INTERSECTED;
    var mouseX = 0;
    var mouseXOnMouseDown = 0;
    var isMouseDownOverBar = false;
    var isMouseDown = false;
    var targetRotation = 0;
    var targetRotationOnMouseDown = 0;

    var particles;

    //var vector = new THREE.Vector3();

    //var lightIndex = 0;

    var DomeLightHandler;
    var UIObjectHandler;

    var Aspect = [16, 8];

    var videoTexture, videoFile;

    var brushColor = new THREE.Color();

    brushColor.setRGB(1,0,0);


    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

        //console.log( item, loaded, total );

    };

    var attributes = {

        size:        { type: 'f', value: [] },
        customColor: { type: 'c', value: [] }

    };

    var uniforms = {

        color:   { type: "c", value: new THREE.Color( 0xffffff ) },
        texture: { type: "t", value: THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" ) }

    };

    var shaderMaterial = new THREE.ShaderMaterial( {

        uniforms: uniforms,
        attributes: attributes,
        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

        blending:       THREE.AddOperation,
        depthTest:      false,
        transparent:    true

    } );
