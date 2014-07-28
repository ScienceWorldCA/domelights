function onWindowResize() {

	camera.aspect = Aspect[0]/Aspect[1];
	camera.updateProjectionMatrix();

    var renderHeight = (window.innerWidth/Aspect[0]) * Aspect[1];
	renderer.setSize( window.innerWidth, renderHeight );

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

}

function isMouseOverBar() {

	var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	projector.unprojectVector( vector, camera );
	raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize() );
	intersects = raycaster.intersectObject( rotateMesh );			
	if ( intersects.length > 0 ) {
		return true;
	}
	else {
		return false;
	}
}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	if (isMouseOverBar()) {
		isMouseDown = true;
	}
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;

}


function onDocumentMouseMove( event ) {

	event.preventDefault();

    var renderHeight = (window.innerWidth/Aspect[0]) * Aspect[1];

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderHeight) * 2 + 1;	
	
	if (isMouseOverBar() && isMouseDown) {
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
	}	
}

function onDocumentMouseUp( event ) {

	//document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	isMouseDown = false;
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

	//document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	isMouseDown = false;
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

	if ( event.touches.length === 1) {

		event.preventDefault();

		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length === 1) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

	}

}

