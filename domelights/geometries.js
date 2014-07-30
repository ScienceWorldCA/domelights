function createGeometries() {

    var lightPlacementMesh;
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'obj/scienceworld/Light_Positions.obj', function ( lightPlacementMesh ) {
        Mesh = lightPlacementMesh;
        //DomeGroup.add( lightPlacementMesh );
    } );


    //sprite1 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" );
//    sprite2 = THREE.ImageUtils.loadTexture( "textures/sprites/snowflake2.png" );
//    sprite3 = THREE.ImageUtils.loadTexture( "textures/sprites/snowflake3.png" );
//    sprite4 = THREE.ImageUtils.loadTexture( "textures/sprites/snowflake4.png" );
//    sprite5 = THREE.ImageUtils.loadTexture( "textures/sprites/snowflake5.png" );

    var map1 = THREE.ImageUtils.loadTexture( 'textures/UI/spin_bar.png' );

	var swipeMaterial = new THREE.MeshBasicMaterial({
		color:0xffffff, shading: THREE.FlatShading,
        map: map1
	});

	swipeMesh = new THREE.Mesh( new THREE.PlaneGeometry( 80, 15, 0, 0 ), swipeMaterial );
	swipeMesh.position.set( 0, -30, 0 );
	scene.add( swipeMesh );	
	
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