function initGraphicMode() {

	container = document.getElementById( 'container' );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 45, Aspect[0] / Aspect[1], 1, 1000 );
	camera.position.z = 250;
    camera.far = 251; //We force the far plane in as an optimisation to cull back of the dome FX, eg.un-depth tested

    //Create interaction casters
    projector = new THREE.Projector();
    raycaster = new THREE.Raycaster();

    //Init 3D Groups
    DomeGroup = new THREE.Object3D;
    DomeGroup.scale.x = 1;
    DomeGroup.scale.y = 1;
    DomeGroup.scale.z = 1;
    DomeGroup.position.y = 10;
    //DomeGroup.position.z = -130;
    DomeGroup.rotation.x = 0.4; //Rotation appears to be in Radians

    scene.add(DomeGroup);

    DomeLightManager = new DomeLights(DomeGroup);

    //EVENT.js // Main Event management
    SequenceManager = new SEQUENCE(DomeLightManager);


    //TEMP SEQUENCE
      SequenceManager.SequenceLength = 6*FPS;
//    var newEvent1 = new EVENT(5*FPS, 22, DomeLightManager, null, Brushes[1]);
//    SequenceManager.AddEvent(newEvent1);
//    var newEvent2 = new EVENT(3*FPS, 29, DomeLightManager, null, Brushes[1]);
//    SequenceManager.AddEvent(newEvent2);
//    var newEvent3 = new EVENT(1*FPS, 35, DomeLightManager, null, Brushes[1]);
//    SequenceManager.AddEvent(newEvent3);


    //geometries.js
    createGeometries();

    //lighting.js
	setLighting();

    //UI.js // Instantiate new UI Handler
    UIObjectManager = new UI(projector, raycaster, camera, mouse); // Create main ui handler

    //createBrushes.js
    CreateBrushes();

    //interface.js
    buildInterface();

    renderer = new THREE.WebGLRenderer({ width: window.innerWidth, height: ((window.innerWidth/Aspect[0])* Aspect[1] ), scale: 1});
    //renderer = new THREE.WebGLDeferredRenderer( { width: window.innerWidth, height: ((window.innerWidth/Aspect[0])* Aspect[1] ), scale: 1, antialias: false } );
    onWindowResize();

    //Setup Render Pass
    renderPassSetup();

	container.appendChild( renderer.domElement );


    // Display Statistical information
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	//events.js
    EnableDomeEventHandles(true);
    window.addEventListener('resize', onWindowResize, false);

}

function EnableDomeEventHandles(state){

    if(state == true) {

        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        //document.addEventListener('touchstart', onDocumentTouchStart, false);
        //document.addEventListener('touchmove', onDocumentTouchMove, false);
    }
    else
    {
        document.removeEventListener('mousedown', onDocumentMouseDown, false);
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        //document.removeEventListener('touchstart', onDocumentTouchStart, false);
        //document.removeEventListener('touchmove', onDocumentTouchMove, false);
    }

    UIObjectManager.EnableEventHandles(state);
}


function initRendermode()
{
    GraphicMode = false;

    //Init 3D Groups
    scene = new THREE.Scene();
    DomeGroup = new THREE.Object3D;
    DomeLightManager = new DomeLights(DomeGroup);

    //EVENT.js // Main Event management
    SequenceManager = new SEQUENCE(DomeLightManager);

    //geometries.js
    createGeometries();

    //lighting.js
    setLighting();

    //createBrushes.js
    CreateBrushes();

    //TEMP SEQUENCE
    {
        SequenceManager.SequenceLength = 6 * FPS;
        var newEvent1 = new EVENT(0, 0, Brushes[2]);
        SequenceManager.AddEvent(newEvent1);

        var brushData = [];
        brushData[0] = new THREE.Color(1, 1, 1);
        var newEvent2 = new EVENT(20, 100, Brushes[0], brushData);
        SequenceManager.AddEvent(newEvent2);
    }

    console.log("--- Render Mode Initialised ---");
}