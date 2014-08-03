function render() {

	if (isMouseDown) {
		turnOnLightOnMouseOver();
	}
	/*if (isMouseOverBar() && isMouseDownOverBar) {
		var rotation = DomeGroup.rotation.y
		DomeGroup.rotation.y = rotation;
		targetRotation = rotation;
	}
	else
	{*/
		DomeGroup.rotation.y += ( targetRotation - DomeGroup.rotation.y ) * 0.02; 
	//}
	//console.log('render:' + ' targetRotation:' + targetRotation + ' DomeGroup.rotation.y:' + DomeGroup.rotation.y);

	updateLights();

    //composer.render();
	renderer.render( scene, camera );

}

function animate() {

	requestAnimationFrame( animate );

	//render.js
	render();
	stats.update();

}

function turnOnLightOnMouseOver() {

	//console.log('mouse.x ' + mouse.x + ' mouse.y' + mouse.y);
	var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	projector.unprojectVector( vector, camera );
	raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize() );

    for (i = 0; i < 260; i++) {
		intersects = raycaster.intersectObject( lightMeshes[i] );
		//console.log('i ' + i);
		if ( intersects.length > 0 && intersects.length < 500 ) {
			//console.log('***i ' + i + ' ' + intersects.length);
			//var c = new THREE.Color();
			//c.setRGB( 1, 0, 1 );
			setLightColor(brushColor, i);
		}
    }	

}