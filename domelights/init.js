function init() {

	container = document.getElementById( 'container' );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 45, Aspect[0] / Aspect[1], 1, 10000 );
	camera.position.z = 250;

    //Init 3D Groups
    DomeGroup = new THREE.Object3D;
    DomeGroup.scale.x = .75;
    DomeGroup.scale.y = .75;
    DomeGroup.scale.z = .75;
    DomeGroup.position.y = 30;
    DomeGroup.rotation.x = 0.4; //Rotation appears to be in Radians
    scene.add(DomeGroup);

    //geometries.js
    createGeometries();

	//lighting.js
	setLighting();

    //renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLDeferredRenderer( { width: window.innerWidth, height: ((window.innerWidth/Aspect[0])* Aspect[1] ), scale: 1, antialias: true } );


    //Setup Render Pass
    //renderPassSetup();

	container.appendChild( renderer.domElement );

	//

	projector = new THREE.Projector();
	raycaster = new THREE.Raycaster();

	//

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	//events.js
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );		

}