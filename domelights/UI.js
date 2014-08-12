/**
 * Created by Robert Butterworth on 8/1/2014.
 */

UI = function(projector, raycaster, camera, mouse)
{
    var mObjects = [];
    var mCamera = camera;

    // If this is not a touch interface, we may need to add rollover management

    this.__defineGetter__("Objects", function(){
        return mObjects;
    });

    this.__defineSetter__("Objects", function(val){
        mObjects = val;
    });

    this.Update = function(event)
    {
        //console.log(event.type);
        var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
        projector.unprojectVector( vector, mCamera );
        raycaster.ray.set( mCamera.position, vector.sub( mCamera.position ).normalize() );

        for (i = 0; i < mObjects.length; i++) {
            var intersects = raycaster.intersectObject( mObjects[i].mesh );

            if ( intersects.length > 0) {
                mObjects[i].CallEvent(event, i);
            }
        }
    }

    //Helper Functions

    //    this.Convert3DtoUISpace = function(pos, camera)
    //    {
    //        camera = typeof camera !== 'undefined' ? camera : mCamera;
    //    }
    //    this.getFrustumDimensions = function(camera)
    //    {
    //        camera = typeof camera !== 'undefined' ? camera : mCamera;
    //        // Near Plane dimensions
    //        var hNear = 2 * Math.tan(camera.fov / 2) * camera.near; // height
    //        var wNear = hNear * camera.aspect; // width
    //
    //        var ntr = new THREE.Vector3( wNear / 2, hNear / 2, -camera.near );
    //        camera.updateMatrixWorld();
    //        ntr.applyMatrix4( camera.matrixWorld );
    //
    //        console.log(ntr);
    //    }

    this.init = function()
    {
        document.addEventListener( 'mouseup', this.Update, false );
        document.addEventListener( 'mousedown', this.Update, false );
        document.addEventListener( 'mousemove', this.Update, false );

        //We only need to enable these if there is no touch interface
        //document.addEventListener( 'mouseout', this.Update, false );
        //document.addEventListener( 'mouseover', this.Update, false );
    }

    this.CreateButton = function(texture, mPos, mSize)
    {
        this.onMouseUp = null;
        this.onMouseDown = null;
        //this.onMouseOver = null;
        //this.onMouseOut = null;
        this.onMouseMove = null;
        this.mesh = null;
        this.material = null;
        this.map = null;

        this.init = function() {

            this.map = THREE.ImageUtils.loadTexture( texture );

            this.material = new THREE.MeshBasicMaterial({
                color:0xffffff, shading: THREE.FlatShading,
                map:  this.map
            });

            this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( mSize.x, mSize.y, 0, 0 ), this.material );
            this.mesh.position.set(  mPos.x,  mPos.y, 0 );
            scene.add(  this.mesh );

            mObjects.push(this);
        };

        this.CallEvent = function(event, index)
        {
            //console.log(event.type);

            if(event.type == "mousedown")
            {
                if(this.onMouseDown != null) this.onMouseDown(event, index);
            }
            else if(event.type == "mouseup")
            {
                if(this.onMouseUp != null) this.onMouseUp(event, index);
            }
            else if(event.type == "mousemove")
            {
                if(this.onMouseMove != null) this.onMouseMove(event, index);
            }
            //else if(event.type == "mouseover")
            //{
            //    if(this.onMouseOver != null) this.onMouseOver(event, index);
            //}
            //else if(event.type == "mouseout")
            //{
            //    if(this.onMouseOut != null) this.onMouseOut(event, index);                }
            //}

        }

        this.init();
    }

    this.init();
}