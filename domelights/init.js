function initGraphicMode()
//Init into display mode and not render mode.
{

	container = document.getElementById( 'container' );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 10, Aspect[0] / Aspect[1], 1, 1000 );
	camera.position.z = 1200;
    camera.position.x = 60;
    camera.far = 1203; //We force the far plane in as an optimisation to cull back of the dome FX, eg.un-depth tested

    //Create interaction casters
    projector = new THREE.Projector();
    raycaster = new THREE.Raycaster();

    //Init 3D Groups
    DomeGroup = new THREE.Object3D;
    DomeGroup.scale.x = 1.2;
    DomeGroup.scale.y = 1.2;
    DomeGroup.scale.z = 1.2;
    DomeGroup.position.y = 0;
    //DomeGroup.position.z = -130;
    DomeGroup.rotation.x = 0.4; //Rotation appears to be in Radians

    scene.add(DomeGroup);

    DomeLightManager = new DomeLights(DomeGroup);

    //EVENT.js // Main Event management
    SequenceManager = new SEQUENCE(DomeLightManager);

    //TEMP SEQUENCE
      // SequenceManager.SequenceLength = 15*FPS;
      SequenceManager.SequenceLength = 30*FPS;
    //    var newEvent1 = new EVENT(5*FPS, 22, DomeLightManager, null, Brushes[1]);
    //    SequenceManager.AddEvent(newEvent1);
    //    var newEvent2 = new EVENT(3*FPS, 29, DomeLightManager, null, Brushes[1]);
    //    SequenceManager.AddEvent(newEvent2);
    //    var newEvent3 = new EVENT(1*FPS, 35, DomeLightManager, null, Brushes[1]);
    //    SequenceManager.AddEvent(newEvent3);


    //TIMELINE.js //Main Timeline Manager
   //TimelineManager = new TIMELINE(SequenceManager.SequenceLength);

    //geometries.js
    createGeometries();

    //lighting.js
	setLighting();

    //UI.js // Instantiate new UI Handler
    UIObjectManager = new UI(projector, raycaster, camera, mouse); // Create main ui handler

    //createBrushes.js
    CreateBrushes();

    var rendererHeight = (window.innerWidth/Aspect[0]) * Aspect[1];

    renderer = new THREE.WebGLRenderer({ width: window.innerWidth, height: rendererHeight, scale: 1, maxLights: 264, antialias : false, precision: "lowp"});
    //renderer = new THREE.WebGLDeferredRenderer( { width: window.innerWidth, height: ((window.innerWidth/Aspect[0])* Aspect[1] ), scale: 1, antialias: false } );

    //interface.js
    buildInterface();

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

        container.addEventListener('mousedown', onDocumentMouseDown, false);
        container.addEventListener('mousemove', onDocumentMouseMove, false);
        //document.addEventListener('touchstart', onDocumentTouchStart, false);
        //document.addEventListener('touchmove', onDocumentTouchMove, false);
    }
    else
    {
        container.removeEventListener('mousedown', onDocumentMouseDown, false);
        container.removeEventListener('mousemove', onDocumentMouseMove, false);
        //document.removeEventListener('touchstart', onDocumentTouchStart, false);
        //document.removeEventListener('touchmove', onDocumentTouchMove, false);
    }

    UIObjectManager.EnableEventHandles(state);
}


function initRendermode()
//Init into Render mode and not display mode
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
