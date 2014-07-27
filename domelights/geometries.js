function createGeometries() {

    /// =================
    ///  NB: Richard - This the model with all the light placements.
    /// =================

    var lightPlacementMesh;
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'obj/scienceworld/Light_Positions.obj', function ( lightPlacementMesh ) {
        Mesh = lightPlacementMesh;
        //DomeGroup.add( lightPlacementMesh );
    } );


    sprite1 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" );
//    sprite2 = THREE.ImageUtils.loadTexture( "textures/sprites/snowflake2.png" );
//    sprite3 = THREE.ImageUtils.loadTexture( "textures/sprites/snowflake3.png" );
//    sprite4 = THREE.ImageUtils.loadTexture( "textures/sprites/snowflake4.png" );
//    sprite5 = THREE.ImageUtils.loadTexture( "textures/sprites/snowflake5.png" );


    // Create Left and Right Turn Panels
	var squareMaterial = new THREE.MeshBasicMaterial({
		color:0xffffff, shading: THREE.FlatShading
	});

	squareMesh1 = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100, 4, 4 ), squareMaterial );
	squareMesh1.position.set( -300, 0, 300 );
	scene.add( squareMesh1 );	

	squareMesh2 = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100, 4, 4 ), squareMaterial );
	squareMesh2.position.set( 300, 0, 300 );
	scene.add( squareMesh2 );
	
	
	//===============================================================================
	//
	//  New Model code for loading of the Dome Geo
	//
	//===============================================================================

    var materialLines = new THREE.MeshBasicMaterial( { wireframe: true } );

	var loader = new THREE.OBJLoader( manager );
    loader.load( 'obj/scienceworld/dome.obj', function ( object ) {
        Mesh = object;
        DomeGroup.add( object );
    } );

    var loader = new THREE.OBJLoader( manager );
    loader.load( 'obj/scienceworld/Dome_Structure.obj', function ( object ) {
//        object.traverse( function ( child ) {
//
//            if ( child instanceof THREE.Mesh ) {
//
//                child.material = materialLines;
//
//            }
//
//        } );

        Mesh = object;
        DomeGroup.add( object );
    } );
}