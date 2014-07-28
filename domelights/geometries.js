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


    //sprite1 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" );
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
//    var path = "textures/cube/pisa/";
//    var format = '.png';
//    var urls = [
//            path + 'px' + format, path + 'nx' + format,
//            path + 'py' + format, path + 'ny' + format,
//            path + 'pz' + format, path + 'nz' + format
//    ];
//
//    var textureCube = THREE.ImageUtils.loadTextureCube( urls );
//    var loader = new THREE.JSONLoader();
//    loader.load( "obj/leeperrysmith/LeePerrySmith.js", function( geometry, materials ) {
//
//        var mapColor = THREE.ImageUtils.loadTexture( "obj/leeperrysmith/Map-COL.jpg" );
//        var mapHeight = THREE.ImageUtils.loadTexture( "obj/leeperrysmith/Infinite-Level_02_Disp_NoSmoothUV-4096.jpg" );
//        mapHeight.repeat.set( 0.998, 0.998 );
//        mapHeight.offset.set( 0.001, 0.001 )
//        mapHeight.wrapS = mapHeight.wrapT = THREE.RepeatWrapping;
//        mapHeight.anisotropy = 4;
//        mapHeight.format = THREE.RGBFormat;
//
//        var material = new THREE.MeshPhongMaterial( { map: mapColor, bumpMap: mapHeight, bumpScale: 8.5, shininess: 75, specular: 0x333333, wrapAround: true, metal: true } );
//
//        var object = new THREE.Mesh( geometry, material );
//        object.scale.multiplyScalar( 25 );
//        object.position.y = -25;
//        DomeGroup.add( object );
//
//    } );


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