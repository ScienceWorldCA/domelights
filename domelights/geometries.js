function createGeometries() {

//    attributes = {
//
//        size: {	type: 'f', value: [] },
//        customColor: { type: 'c', value: [] }
//
//    };
//
//    uniforms = {
//
//        amplitude: { type: "f", value: 1.0 },
//        color:     { type: "c", value: new THREE.Color( 0xffffff ) },
//        texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "textures/sprites/spark1.png" ) },
//
//    };
//
//    var shaderMaterial = new THREE.ShaderMaterial( {
//
//        uniforms: 		uniforms,
//        attributes:     attributes,
//        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
//        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
//
//        blending: 		THREE.AdditiveBlending,
//        depthTest: 		false,
//        transparent:	true
//
//    });
//
//
//    var radius = 200;
//    var geometry = new THREE.Geometry();
//
//    for ( var i = 0; i < 1000; i++ ) {
//
//        var vertex = new THREE.Vector3();
//        vertex.x = Math.random() * 2 - 1;
//        vertex.y = Math.random() * 2 - 1;
//        vertex.z = Math.random() * 2 - 1;
//        vertex.multiplyScalar( radius );
//
//        geometry.vertices.push( vertex );
//
//    }
//
//    sphere = new THREE.ParticleSystem( geometry, shaderMaterial );
//
//    sphere.dynamic = true;
//    //sphere.sortParticles = true;
//
//    var vertices = sphere.geometry.vertices;
//    var values_size = attributes.size.value;
//    var values_color = attributes.customColor.value;
//
//
//    for( var v = 0; v < vertices.length; v++ ) {
//
//        values_size[ v ] = 10;
//        values_color[ v ] = new THREE.Color( 0xffaa00 );
//
//        if ( vertices[ v ].x < 0 )
//            values_color[ v ].setHSL( 0.5 + 0.1 * ( v / vertices.length ), 0.7, 0.5 );
//        else
//            values_color[ v ].setHSL( 0.0 + 0.1 * ( v / vertices.length ), 0.9, 0.5 );
//
//    }
//
//    scene.add( sphere );

//	var geometry = new THREE.BoxGeometry( 200, 200, 200, 16, 16, 16 );
//	var color, f, f2, f3, p, n, vertexIndex,
//		radius = 200,
//		geometry  = new THREE.IcosahedronGeometry( radius, 1 ),
//		geometry2 = new THREE.IcosahedronGeometry( radius, 1 );
//
//	particles = new THREE.PointCloud( geometry, shaderMaterial );
//
//	var values_size = attributes.size.value;
//	var values_color = attributes.customColor.value;
//
//	var vertices = particles.geometry.vertices;
//
//	for( var v = 0,  vl = vertices.length; v < vl; v++ ) {
//		values_size[ v ] = PARTICLE_SIZE * 0.75;
//		values_color[ v ] = new THREE.Color( 0xffffff ); //new THREE.Color().setHSL( 0.01 + 0.1 * ( v / vl ), 1.0, 0.5 );
//	}
//	scene.add( particles );
//
//	var faceIndices = [ 'a', 'b', 'c', 'd' ];
//	for ( var i = 0; i < geometry2.faces.length; i ++ ) {
//
//		f  = geometry2.faces[ i ];
//		n = ( f instanceof THREE.Face3 ) ? 3 : 4;
//		for( var j = 0; j < n; j++ ) {
//			vertexIndex = f[ faceIndices[ j ] ];
//			p = geometry2.vertices[ vertexIndex ];
//			color = new THREE.Color( 0xffffff );
//			color.setHSL( ( p.y / radius + 1 ) / 2, 1.0, 0.5 );
//			f.vertexColors[ j ] = color;
//		}
//	}
//
//	var materials = [
//		new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, vertexColors: 0xffffff } ),
//		new THREE.MeshBasicMaterial( { color: 0x000000, shading: THREE.FlatShading, wireframe: false, transparent: false } )
//	];
//
	//icosahedronMesh = THREE.SceneUtils.createMultiMaterialObject( geometry2, materials );
	//scene.add( icosahedronMesh );


    /// =================
    ///  NB: Richard - This the model with all the light placements.
    /// =================

    var lightPlacementMesh;
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'obj/scienceworld/Light_Positions.obj', function ( lightPlacementMesh ) {
        Mesh = lightPlacementMesh;
        //DomeGroup.add( lightPlacementMesh );
    } );





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
        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

                child.material = materialLines;

            }

        } );

        Mesh = object;
        DomeGroup.add( object );
    } );
}