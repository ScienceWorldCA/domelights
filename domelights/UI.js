/**
 * Created by Robert Butterworth on 8/1/2014.
 */

UI = function(projector, raycaster, camera, mouse)
{
    mObjects = [];
    mCamera = camera

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

    this.Convert3Dto2D = function(pos, camera)
    {
        camera = typeof camera !== 'undefined' ? camera : mCamera;

    }


    this.init = function()
    {
        document.addEventListener( 'mouseup', this.Update, false );
        document.addEventListener( 'mouseout', this.Update, false );
        document.addEventListener( 'mousedown', this.Update, false );
        document.addEventListener( 'mouseover', this.Update, false );
    }

    this.CreateButton = function(texture, mPos, mSize)
    {
        this.onMouseUp;
        this.onMouseDown;
        this.onMouseOver;
        this.onMouseOut;
        this.onMouseMove;
        this.mesh;
        this.material
        this.map;

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
                if(this.onMouseDown != null) {
                    this.onMouseDown(event, index);
                }
            }
            else if(event.type == "mouseup")
            {
                if(this.onMouseUp != null) {
                    this.onMouseUp(event, index);
                }
            }
            else if(event.type == "mouseover")
            {
                if(this.onMouseOver != null) {
                    this.onMouseOver(event, index);
                }
            }
            else if(event.type == "mouseout")
            {
                if(this.onMouseOut != null) {
                    this.onMouseOut(event, index);
                }
            }
            else if(event.type == "mousemove")
            {
                if(this.onMouseMove != null) {
                    this.onMouseMove(event, index);
                }
            }
        }

        this.init();
    }

    this.init();
}