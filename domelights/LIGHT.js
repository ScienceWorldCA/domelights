/**
 * Created by Robert Butterworth on 8/2/2014.
 */

var DomeLights = function(localScene)
{
    var mScene = localScene;
    var mLightMeshes= [];
    var mLights= [];
    var mLightMeta = [];

    this.__defineGetter__("Scene", function(){
        return mScene;
    });

    this.__defineGetter__("LightMeshes", function(){
        return mLightMeshes;
    });
    this.__defineSetter__("LightMeshes", function(val){
        mLightMeshes = val;
    });

    this.__defineGetter__("Lights", function(){
        return mLights;
    });
    this.__defineSetter__("Lights", function(val){
        mLights = val;
    });

    this.__defineGetter__("LightMeta", function(){
        return mLightMeta;
    });
    this.__defineSetter__("LightMeta", function(val){
        mLightMeta = val;
    });


    this.Light = function(lightColor, mPos, lightIndex){

        this.LightIndex = lightIndex; // Location on the Lookup matrix

        var mColor = [0,0,0,0];

        this.__defineGetter__("Color", function(){
            return mColor;
        });
        this.__defineSetter__("Color", function(val){
            mColor = val;
        });

        this.init = function() {
            // Add Light
            var Light = new THREE.PointLight( lightColor, 0.5, 2 );
            Light.position.set( mPos.x, mPos.y, mPos.z );
            mScene.add( Light );
            mLights.push(Light);

            // Collision Spheres
            var sphere = new THREE.SphereGeometry( 8, 4, 4 );
            var LightMesh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity:0, transparent: true } ) );
            LightMesh.position.set(mPos.x, mPos.y, mPos.z);
            mScene.add( LightMesh );
            mLightMeshes.push(LightMesh);

            mLightMeta.push(this);
        }

        this.init();
    };

}