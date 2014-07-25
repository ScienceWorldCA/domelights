function render() {

	vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );

	projector.unprojectVector( vector, camera );

	raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize() );

//	intersects = raycaster.intersectObject( particles );
//
//	if ( intersects.length > 0 ) {
//		//console.log('p ' + intersects.length);
//		if ( INTERSECTED != intersects[ 0 ].index ) {
//
//			attributes.size.value[ INTERSECTED ] = PARTICLE_SIZE;
//
//			INTERSECTED = intersects[ 0 ].index;
//
//			attributes.size.value[ INTERSECTED ] = PARTICLE_SIZE * 1.25;
//			attributes.size.needsUpdate = true;
//
//		}
//
//	} else if ( INTERSECTED !== null ) {
//
//		attributes.size.value[ INTERSECTED ] = PARTICLE_SIZE;
//		attributes.size.needsUpdate = true;
//		INTERSECTED = null;
//
//	}
	
	intersects = raycaster.intersectObject( squareMesh1 );
	
	if ( intersects.length > 0 ) {
		//console.log('m1 ' + intersects.length);
		//icosahedronMesh.rotation.y -= 0.01;
		DomeGroup.rotation.y -= 0.05;
		//particles.rotation.y -= 0.01;

	} else if ( INTERSECTED !== null ) {

		INTERSECTED = null;
	}

	intersects = raycaster.intersectObject( squareMesh2 );
	
	if ( intersects.length > 0 ) {
		//console.log('m2 ' + intersects.length);
		//icosahedronMesh.rotation.y += 0.01;
		DomeGroup.rotation.y += 0.05;
		//particles.rotation.y += 0.01;

	} else if ( INTERSECTED !== null ) {

		INTERSECTED = null;
	}


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