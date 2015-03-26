function onWindowResize() {


	camera.aspect = Aspect[0]/Aspect[1];
	camera.updateProjectionMatrix();

    var renderHeight = (window.innerHeight * renderZoom);
    var renderWidth = Aspect[0] * (renderHeight / Aspect[1]);

    renderer.setSize( renderWidth, renderHeight);


    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    //renderer.setViewport( 0, -120, window.innerWidth, renderHeight );

    //UpdateDockedPanels();

}

// function UpdateDockedPanels()
// {
//     var vector = new THREE.Vector3( window.innerWidth, windowHalfY, 0.5);
//     projector.unprojectVector( vector, camera );
//     raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize() );
//     var usermesh = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000, 0, 0 ), new THREE.MeshBasicMaterial({color:0xFFFFFF}) );
//     usermesh.rotation.x = 90;

//     var intersects = raycaster.intersectObject( usermesh );

//     console.log("recalc");

//     if ( intersects.length > 0 ) {
//         console.log(intersects[0].point.y);
//     }
// }


// function isMouseOverBar() {

//    	var vector = new THREE.Vector3( mouse.x, mouse.y, .5 );
// 	projector.unprojectVector( vector, camera );
// 	raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize() );
// 	var intersects = raycaster.intersectObject( swipeCollision );

// 	if ( intersects.length > 0 ) {
// 		return true;
// 	}
// 	else {
// 		return false;
// 	}
// }

function onDocumentMouseDown( event ) {

	event.preventDefault();

	//isMouseDown = true;
// 	if (isMouseOverBar()) {
// 		isMouseDownOverBar = true;
//         FixedSpeedActive = false;
//         targetRotation = DomeGroup.rotation.y;
// 	}

	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	//targetRotationOnMouseDown = targetRotation;
	//console.log('onDocumentMouseDown:' + ' isMouseOverBar:' + isMouseDownOverBar + ' isMouseDown:' + isMouseDown + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation + ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);
}

function onDocumentMouseMove( event ) {

	event.preventDefault();

    var renderHeight = (window.innerHeight * renderZoom);
    var renderWidth = Aspect[0] * (renderHeight / Aspect[1]);

	mouse.x = ( event.clientX / renderWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderHeight) * 2 + 1;
	
// 	if (isMouseDownOverBar) {
// 		mouseX = event.clientX - windowHalfX;
// 		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.08;
// 	}	
	//console.log('onDocumentMouseMove: ' + 'isMouseDownOverBar:' + isMouseDownOverBar + ' isMouseDown:' + isMouseDown + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation+ ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);

    UIObjectManager.Update(event);
}

function onDocumentMouseUp( event ) {

// 	if (isMouseOverBar()) {
// 		var rotation = DomeGroup.rotation.y
// 		//DomeGroup.rotation.y = rotation;
// 		//targetRotation = rotation;
// 	}
	//isMouseDownOverBar = false;
	//isMouseDown = false;

    container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    container.removeEventListener( 'mouseout', onDocumentMouseOut, false );
	//console.log('onDocumentMouseUp: ' + 'isMouseDown: ' + isMouseDown + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation+ ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);

}

function onDocumentMouseOut( event ) {

	//isMouseDownOverBar = false;
	//isMouseDown = false;

    container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    container.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

// function onDocumentTouchStart( event ) {

// 	if ( event.touches.length === 1) {

// 		event.preventDefault();

// 		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
// 		//targetRotationOnMouseDown = targetRotation;
// 		//console.log('onDocumentTouchStart:' + isMouseOverBar() + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation+ ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);
// 	}
// }

// function onDocumentTouchMove( event ) {

// 	if ( event.touches.length === 1) {

// 		event.preventDefault();

// 		mouseX = event.touches[ 0 ].pageX - windowHalfX;
// 		//targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.08;
// 		//console.log('onDocumentTouchMove:' + isMouseOverBar() + ' mouseX:' + mouseX + ' mouseXOnMouseDown:' + mouseXOnMouseDown + ' targetRotation:' + targetRotation+ ' targetRotationOnMouseDown:' + targetRotationOnMouseDown);

// 	}

// }

