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

	isMouseDown = true;
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;
	//console.log('onDocumentMouseDown:' + isMouseOverBar() + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation + ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);

}


function onDocumentMouseMove( event ) {

	event.preventDefault();

    var renderHeight = (window.innerWidth/Aspect[0]) * Aspect[1];

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderHeight) * 2 + 1;	
	
	if (!isMouseOverBar() && isMouseDown) {
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
	}	
	//console.log('onDocumentMouseMove:' + isMouseOverBar() + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation+ ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);
}

function onDocumentMouseUp( event ) {

	isMouseDown = false;
	
	if (isMouseOverBar()) {
		DomeGroup.rotation.y = 0;
		targetRotation = 0;
	}
	//console.log('onDocumentMouseUp:' + isMouseOverBar() + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation+ ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );


}

function onDocumentMouseOut( event ) {

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

