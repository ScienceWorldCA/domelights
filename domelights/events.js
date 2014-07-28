function onDocumentMouseMove( event ) {

	event.preventDefault();

    var renderHeight = (window.innerWidth/Aspect[0]) * Aspect[1];

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderHeight) * 2 + 1;

}

function onWindowResize() {

	camera.aspect = Aspect[0]/Aspect[1];
	camera.updateProjectionMatrix();

    var renderHeight = (window.innerWidth/Aspect[0]) * Aspect[1];
	renderer.setSize( window.innerWidth, renderHeight );

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

}