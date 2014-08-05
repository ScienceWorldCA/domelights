/**
 * Created by Robert Butterworth on 8/2/2014.
 */

var DomeLights = function(localScene)
{
    var mScene = localScene;
    var mLightMeshes= [];
    var mLights= [];

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


    this.Light = function(lightColor, mPos){

        this.Light;
        this.LightMesh;
        this.LightColor = lightColor;
        this.LightPosition = mPos;

        this.SetColor = function(color)
        {

        };

        this.init = function() {
            // Add Light
            this.Light = new THREE.PointLight( this.LightColor, 0.5, 2 );
            this.Light.position.set( this.LightPosition.x, this.LightPosition.y, this.LightPosition.z );
            mScene.add( this.Light );
            mLights.push(this.Light);

            // Collision Spheres
            var sphere = new THREE.SphereGeometry( 8, 4, 4 );
            this.LightMesh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0, transparent: true } ) );
            this.LightMesh.position.set(this.LightPosition.x, this.LightPosition.y, this.LightPosition.z);
            mScene.add( this.LightMesh );
            mLightMeshes.push(this.LightMesh);
        }

        this.init();
    };

}