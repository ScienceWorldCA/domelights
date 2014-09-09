/**
 * Created by Robert Butterworth on 8/1/2014.
 */

UI = function(projector, raycaster, camera, mouse)
{
    var self = this;
    var mUIObjects = [];
    var mCamera = camera;

    //Helper Objects
    var UpdateEvent = function()
    {
        this.type = "uiupdate"
    };

    var MouseEnterEvent = function()
    {
        this.type = "mouseenter"
    };

    var MouseExitEvent = function()
    {
        this.type = "mouseexit"
    };


    // If this is not a touch interface, we may need to add rollover management
    this.__defineGetter__("Objects", function(){
        return mUIObjects;
    });

    this.__defineSetter__("Objects", function(val){
        mUIObjects = val;
    });

    //Check all UI for Collision Events
    this.Update = function(event)
    {
        //console.log(event);
        var hitUI = [];

        var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
        projector.unprojectVector( vector, mCamera );
        raycaster.ray.set( mCamera.position, vector.sub( mCamera.position ).normalize() );

        for (var i = 0; i < mUIObjects.length; i++) {

            //Check for interaction
            if(mUIObjects[i].mesh != null)
            {
                var intersects = raycaster.intersectObject( mUIObjects[i].mesh );
                if ( intersects.length > 0) {

                    //Copy the intersection into the event for later use
                    event.intersection = intersects;

                    //Determine if it is a mouse enter event
                    if(event.type == "mousemove" && mUIObjects[i].MouseOver == false)
                    {
                        mUIObjects[i].MouseOver = true;
                        CallEvent(new MouseEnterEvent(), mUIObjects[i]);
                    }
                    else
                    {
                        //Handle all over events
                        CallEvent(event, mUIObjects[i]);
                    }

                    //Add it to the List of hit UI
                    hitUI.push(i);
                    //break;
                }
            }
        }

        //Determine Mouse Exit Event
        for (var i = 0; i < mUIObjects.length; i++)
        {
            //check all items and skip hitUI items
            if(jQuery.inArray(i,hitUI) == -1)
            {
                //UI wasn't just hit in update, check to see if it has mouseOver
                if(mUIObjects[i].MouseOver == true)
                {
                    //Mouse Exited UI
                    CallEvent(new MouseExitEvent(), mUIObjects[i]);
                    mUIObjects[i].MouseOver = false;
                }

            }
        }
    };

    //Call update on UI Objects
    this.UpdateUI = function()
    {
       for (var i = 0; i < mUIObjects.length; i++) {CallEvent(new UpdateEvent(),mUIObjects[i]);}
    };

    this.AddUIObject = function(uiObject)
    {
        uiObject.index = mUIObjects.length;
        mUIObjects.push(uiObject);
    }

    //Helper Functions
    function CallEvent(event, uiObject)
    {
       //console.log(uiObject);
        //console.log(">>: " + event.type);

        if(event.type == "uiupdate")
        {
            if(uiObject.onUIUpdate != null) uiObject.onUIUpdate(event, uiObject);
        }
        else if(event.type == "mousedown")
        {
            if(uiObject.onMouseDown != null) uiObject.onMouseDown(event, uiObject);
        }
        else if(event.type == "mouseup")
        {
            if(uiObject.onMouseUp != null) uiObject.onMouseUp(event, uiObject);
        }
        else if(event.type == "mousemove")
        {
            if(uiObject.onMouseMove != null) uiObject.onMouseMove(event, uiObject);
        }
        else if(event.type == "mouseenter")
        {
            if(uiObject.onMouseEnter != null) uiObject.onMouseEnter(event, uiObject);
        }
        else if(event.type == "mouseexit")
        {
            if(uiObject.onMouseExit != null) uiObject.onMouseExit(event, uiObject);
        }
    };

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
        this.EnableEventHandles(true);

        //We only need to enable these if there is no touch interface
        //document.addEventListener( 'mouseout', this.Update, false );
        //document.addEventListener( 'mouseover', this.Update, false );
    };

    this.EnableEventHandles = function(state){

        if(state == true) {

            document.addEventListener( 'mouseup', this.Update, false );
            document.addEventListener( 'mousedown', this.Update, false );
            document.addEventListener( 'mousemove', this.Update, false );
        }
        else
        {
            document.removeEventListener( 'mouseup', this.Update, false );
            document.removeEventListener( 'mousedown', this.Update, false );
            document.removeEventListener( 'mousemove', this.Update, false );
        }
    }


    this.BaseUIObject = function(texture, mPos, mSize, groupID)
    {
        this.index = null;
        this.onMouseUp = null;
        this.onMouseDown = null;
        this.onMouseMove = null;
        this.onMouseEnter = null;
        this.onMouseExit = null;
        this.onUIUpdate = null;
        this.MouseOver = false;
        this.mesh = null;
        this.material = null;
        this.map = null;
        this.tag = null;
        this.name = "";
        this.GroupID = groupID || 0;
    };

    this.Button = function(texture, mPos, mSize, groupID)
    {
        //this.prototype = new self.BaseUIObject(texture, mPos, mSize, groupID);
        this.index = null;
        this.onMouseUp = null;
        this.onMouseDown = null;
        this.onMouseMove = null;
        this.onMouseEnter = null;
        this.onMouseExit = null;
        this.onUIUpdate = null;
        this.MouseOver = false;
        this.mesh = null;
        this.material = null;
        this.map = null;
        this.tag = null;
        this.name = "";
        this.GroupID = groupID || 0;

        this.init = function()
        {
            this.map = THREE.ImageUtils.loadTexture( texture );

            this.material = new THREE.MeshBasicMaterial({
                color:0xffffff, shading: THREE.FlatShading,
                map:  this.map
            });

            this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( mSize.x, mSize.y, 0, 0 ), this.material );
            this.mesh.position.set(  mPos.x,  mPos.y, 0 );
            scene.add(  this.mesh );

            self.AddUIObject(this);
            return this;
        };
        this.init();
    };

    this.Tab = function(texture, mPos, mSize, groupID)
    {
       //this.prototype = new self.BaseUIObject(texture, mPos, mSize, groupID);
        this.index = null;
        this.onMouseUp = null;
        this.onMouseDown = null;
        this.onMouseMove = null;
        this.onMouseEnter = null;
        this.onMouseExit = null;
        this.onUIUpdate = null;
        this.MouseOver = false;
        this.mesh = null;
        this.material = null;
        this.map = null;
        this.tag = null;
        this.name = "";
        this.GroupID = groupID || 0;

        this.init = function() {

            this.map = THREE.ImageUtils.loadTexture( texture );

            this.material = new THREE.MeshBasicMaterial({
                color:0xffffff, shading: THREE.FlatShading,
                map:  this.map
            });

            this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( mSize.x, mSize.y, 0, 0 ), this.material );
            this.mesh.position.set(  mPos.x,  mPos.y, 0 );
            scene.add(  this.mesh );

            self.AddUIObject(this);
            return this;
        };
        this.init();
    };

    this.Timeline = function(texture, mPos, mSize, groupID)
    {
        //this.prototype = new self.BaseUIObject(texture, mPos, mSize, groupID);
        this.index = null;
        this.onMouseUp = null;
        this.onMouseDown = null;
        this.onMouseMove = null;
        this.onMouseEnter = null;
        this.onMouseExit = null;
        this.onUIUpdate = null;
        this.MouseOver = false;
        this.mesh = null;
        this.material = null;
        this.map = null;
        this.tag = null;
        this.name = "";
        this.GroupID = groupID || 0;

        //Timeline Specific
        this.Size = new THREE.Vector2(mSize.x,mSize.y);
        this.Position = new THREE.Vector2(mPos.x,mPos.y);
        this.TimeHandle = null;
        this.SequenceTime = null;
        this.SequenceLength = null;

        //Update Timeline with
        this.onUIUpdate = function(event, uiObject)
        {
            if(this.TimeHandle != null)
            {
                var yPos = this.Position.y + (this.Size.y / 2);

                var frameStep = this.Size.x / this.SequenceLength();

                this.TimeHandle.mesh.position.set(this.Position.x + (frameStep *  this.SequenceTime()),  yPos, 1 );
                //this.mesh.position.set(  mPos.x,  mPos.y, 0 );
            }
        };

        this.DrawTimelineLines = function()
        {
            var yPos = this.Position.y + (this.Size.y / 2);

            DrawLine(
                new THREE.Vector3(this.Position.x, yPos,0 ),
                new THREE.Vector3(this.Position.x + this.Size.x, yPos,0)
            );
            DrawLine(
                new THREE.Vector3(this.Position.x, this.Position.y + (this.Size.y * 0.25),0 ),
                new THREE.Vector3(this.Position.x, this.Position.y + (this.Size.y * 0.75),0)
            );
            DrawLine(
                new THREE.Vector3(this.Position.x + this.Size.x, this.Position.y + (this.Size.y * 0.25),0 ),
                new THREE.Vector3(this.Position.x + this.Size.x, this.Position.y + (this.Size.y * 0.75),0)
            );
        };

        this.init = function()
        {
            this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( mSize.x, mSize.y, 0, 0 ), new THREE.MeshBasicMaterial({color:0x000000}));
            this.mesh.position.set(  mPos.x + (mSize.x /2),  mPos.y + (mSize.y / 2), -0.5 );
            scene.add(  this.mesh );

            this.DrawTimelineLines();
            this.TimeHandle = new self.Button('textures/sprites/circle.png', new THREE.Vector2(0,0), new THREE.Vector2(10, 10));
            self.AddUIObject(this);
            return this;
        };
        this.init();
    };

    function DrawLine(Pos1, Pos2)
    {
//        //for (var i = 0; i < 300; i++) {
//
//            var geometry = new THREE.BufferGeometry();
//            var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });
//
//            var positions = new Float32Array(6);
//            positions = [300,300,300,-300,-300,-300];
//
//            var colors = new Float32Array(6);
//            colors= [1,1,1,1,1,1];
//
//            geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
//            geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
//
//            geometry.computeBoundingSphere();
//
//            mesh = new THREE.Line( geometry, material );
        var geometry = new THREE.BufferGeometry();
        var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors, linewidth: 5 });

        var positions = new Float32Array( 6 );
        var colors = new Float32Array( 6 );

        //for ( var i = 0; i < segments; i ++ ) {

            // positions
            positions[0] = Pos1.x;
            positions[1] = Pos1.y;
            positions[2] = Pos1.z;

            positions[3] = Pos2.x;
            positions[4] = Pos2.y;
            positions[5] = Pos2.z;

            // colors
            colors[0] =  1.0;
            colors[1] =  1.0;
            colors[2] =  1.0;
            // colors
            colors[3] =  1.0;
            colors[4] =  1.0;
            colors[5] =  1.0;

        //}

        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

        geometry.computeBoundingSphere();

        var mesh = new THREE.Line( geometry, material );
        scene.add(mesh);
        //}
    }


    this.init();
};
