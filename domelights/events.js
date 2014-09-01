function onWindowResize() {

	camera.aspect = Aspect[0]/Aspect[1];
	camera.updateProjectionMatrix();

    var renderHeight = (window.innerWidth/Aspect[0]) * Aspect[1];
	renderer.setSize( window.innerWidth, renderHeight );

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

}

function isMouseOverBar() {

   	var vector = new THREE.Vector3( mouse.x, mouse.y, .5 );
	projector.unprojectVector( vector, camera );
	raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize() );
	var intersects = raycaster.intersectObject( swipeMesh );

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
	if (isMouseOverBar()) {
		isMouseDownOverBar = true;
        FixedSpeedActive = false;
	}

	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;
	//console.log('onDocumentMouseDown:' + ' isMouseOverBar:' + isMouseDownOverBar + ' isMouseDown:' + isMouseDown + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation + ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);
}




function onDocumentMouseMove( event ) {

	event.preventDefault();

    var renderHeight = (window.innerWidth/Aspect[0]) * Aspect[1];

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderHeight) * 2 + 1;
	
	if (isMouseDownOverBar) {
		mouseX = event.clientX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.08;
	}	
	//console.log('onDocumentMouseMove: ' + 'isMouseDownOverBar:' + isMouseDownOverBar + ' isMouseDown:' + isMouseDown + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation+ ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);

    UIObjectManager.Update(event);
}

function onDocumentMouseUp( event ) {

	if (isMouseOverBar()) {
		var rotation = DomeGroup.rotation.y
		//DomeGroup.rotation.y = rotation;
		//targetRotation = rotation;
	}
	isMouseDownOverBar = false;
	isMouseDown = false;

	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
	//console.log('onDocumentMouseUp: ' + 'isMouseDown: ' + isMouseDown + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation+ ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);

}

function onDocumentMouseOut( event ) {

	isMouseDownOverBar = false;
	isMouseDown = false;

	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

	if ( event.touches.length === 1) {

		event.preventDefault();

		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;
		//console.log('onDocumentTouchStart:' + isMouseOverBar() + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation+ ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);
	}
}

function onDocumentTouchMove( event ) {

	if ( event.touches.length === 1) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.08;
		//console.log('onDocumentTouchMove:' + isMouseOverBar() + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation+ ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);

	}

}

