function init() {

	container = document.getElementById( 'container' );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;

    //Init 3D Groups
    DomeGroup = new THREE.Object3D;
    DomeGroup.scale.x = 4;
    DomeGroup.scale.y = 4;
    DomeGroup.scale.z = 4;
    //DomeGroup.position.z = 50;
    scene.add(DomeGroup);

    //geometries.js
    createGeometries();

	//lighting.js
	setLighting();

    //renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLDeferredRenderer( { width: window.innerWidth, height: window.innerHeight, scale: 1, antialias: false } );


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

}