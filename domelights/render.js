function render() {

	turnOnLightOnMouseOver();
	DomeGroup.rotation.y += ( targetRotation - DomeGroup.rotation.y ) * 0.05; 
    updateRndLights();

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
	intersects = raycaster.intersectObject( particles );

	console.log('p ' + intersects.length);
	if ( intersects.length > 0 ) {
		//console.log('p ' + intersects.length);
		if ( INTERSECTED != intersects[ 0 ].index ) {

			//attributes.size.value[ INTERSECTED ] = PARTICLE_SIZE;
			INTERSECTED = intersects[ 0 ].index;
			setLightColor(color, INTERSECTED);
			attributes.size.needsUpdate = true;
		}

	} else if ( INTERSECTED !== null ) {
		//attributes.size.value[ INTERSECTED ] = PARTICLE_SIZE;
		attributes.size.needsUpdate = true;
		INTERSECTED = null;
	}
}