function createGeometries() {

    var loader;
    //Create ScienceWorld Dome
    loader = new THREE.OBJLoader( manager );
    loader.load( 'obj/scienceworld/dome.obj', function ( object ) {
        object.name = "DomeCollision";
        DomeGroup.add( object );
    } );

    //Create ScienceWorld Light Structure
    loader = new THREE.OBJLoader( manager );
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
        DomeGroup.add( object );

    } );

    //TODO Add Skybox ??
    /*
    var path = "textures/cube/SwedishRoyalCastle/";
    var format = '.jpg';
    var urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
    ];

    var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
    reflectionCube.format = THREE.RGBFormat;

    var refractionCube = new THREE.CubeTexture( reflectionCube.image, new THREE.CubeRefractionMapping() );
    refractionCube.format = THREE.RGBFormat;

    //var cubeMaterial3 = new THREE.MeshPhongMaterial( { color: 0x000000, specular:0xaa0000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.25 } );
    var cubeMaterial3 = new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0x993300, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3 } );
    var cubeMaterial2 = new THREE.MeshLambertMaterial( { color: 0xffee00, ambient: 0x996600, envMap: refractionCube, refractionRatio: 0.95 } );
    var cubeMaterial1 = new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0xaaaaaa, envMap: reflectionCube } )

    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = reflectionCube;

    var material = new THREE.ShaderMaterial( {

            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide

        } ),

        mesh = new THREE.Mesh( new THREE.CylinderGeometry( 900, 900, 900 ), material );
    DomeGroup.add( mesh );

    */
}