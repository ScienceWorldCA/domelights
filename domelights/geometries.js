function createGeometries() {

    var loader = new THREE.OBJLoader( manager );
    loader.load( 'obj/scienceworld/dome.obj', function ( object ) {
        Mesh = object;
        object.name = "DomeCollision";
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