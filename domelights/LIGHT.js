/**
 * Created by Robert Butterworth on 8/2/2014.
 */

var DomeLight = function(lightColor, mPos, localScene){

    this.light



    this.init = function() {
        // Add Light
        this.light = new THREE.PointLight(lightColor, 2, 10);
        light.position.set(mPos.x, mPos.y, mPos.z);
        localScene.add(light);
        DomeLights.push(light);
    }

    this.init();
};

function addLight( lightColor, x, y, z, localScene ) {

    // Add Light
    var light = new THREE.PointLight( new THREE.Color( 0, 0, 0 ), 2, 10 );
    light.position.set( x, y, z );
    localScene.add( light );
    DomeLights.push(light);

    // Collision Spheres
    var sphere = new THREE.SphereGeometry( 8, 4, 4 );
    var sphereLight = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 1, transparent: true } ) );
    sphereLight.position = light.position;
    localScene.add( sphereLight );
    lightMeshes.push(sphereLight);
}