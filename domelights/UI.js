/**
 * Created by Robert Butterworth on 8/1/2014.
 */

UI = function(projector, raycaster, camera, mouse)
{
    var self = this;
    var mUIObjects = [];
    var mCamera = camera;

    //Helper Objects
    var UpdateEvent = function(){

        this.type = "uiupdate"
    };

    var MouseEnterEvent = function(){

        this.type = "mouseenter"
    };

    var MouseExitEvent = function(){

        this.type = "mouseexit"
    };

    var ColorUpdatedEvent = function(){

        this.type = "colorUpdated"
    };


    // If this is not a touch interface, we may need to add rollover management
    this.__defineGetter__("Objects", function(){
        return mUIObjects;
    });

    this.__defineSetter__("Objects", function(val){
        mUIObjects = val;
    });

    //Check all UI for Collision Events
    this.Update = function(event){

        //console.log(event);
        var hitUI = [];

        var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
        projector.unprojectVector( vector, mCamera );
        raycaster.ray.set( mCamera.position, vector.sub( mCamera.position ).normalize() );

        for (var i = 0; i < mUIObjects.length; i++) {

            //Check for interaction
            if(mUIObjects[i].mesh != null && mUIObjects[i].mesh.visible == true)
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

        //Catch Mouse Up and clear all mouse down flags.
        if(event.type == "mouseup" && hitUI.length == 0)
        {
            for (var i = 0; i < mUIObjects.length; i++)
            {
                if(mUIObjects[i].isMouseDown == true)
                {
                    mUIObjects[i].isMouseDown = false;
                    CallEvent(event, mUIObjects[i]);
                }
            }
        }
    };

    //Call update on UI Objects
    this.UpdateUI = function(){
       for (var i = 0; i < mUIObjects.length; i++) {CallEvent(new UpdateEvent(),mUIObjects[i]);}
    };

    this.AddUIObject = function(uiObject){

        uiObject.index = mUIObjects.length;
        mUIObjects.push(uiObject);
    };

    //Helper Functions
    function CallEvent(event, uiObject){

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

    this.init = function(){
        this.EnableEventHandles(true);

        //We only need to enable these if there is no touch interface
        //document.addEventListener( 'mouseout', this.Update, false );
        //document.addEventListener( 'mouseover', this.Update, false );
    };

    this.EnableEventHandles = function(state){

        if(state == true) {

            container.addEventListener( 'mouseup', this.Update, false );
            container.addEventListener( 'mousedown', this.Update, false );
            container.addEventListener( 'mousemove', this.Update, false );
        }
        else
        {
            container.removeEventListener( 'mouseup', this.Update, false );
            container.removeEventListener( 'mousedown', this.Update, false );
            container.removeEventListener( 'mousemove', this.Update, false );
        }
    };

    this.BaseUIObject = function(){
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
        this.name = "#NO_NAME#";
        this.GroupID = 0;
        this.TabID = 0;
        this.isMouseDown = false;

        this.Transform = null;



        return this;
    };

    this.Button = function(texture, mPos, mSize, groupID, tabID, mShowLabel){
        this.GroupID = groupID || 0;
        this.TabID = tabID || 0;
        this.ShowLabel = mShowLabel || false;
        var mVisible = true;

        this.__defineGetter__("Visible", function(){
            return mVisible;
        });

        this.__defineSetter__("Visible", function(val){
            mVisible = val;
            if(this.mesh != null){this.mesh.visible = val;}
            if(this.Label != null){this.Label.Visible = val;}
        });

        this.init = function()
        {
            this.Transform = new THREE.Object3D;
            scene.add(  this.Transform );

            this.map = THREE.ImageUtils.loadTexture( texture );

            this.material = new THREE.MeshBasicMaterial({
                color:0xffffff, shading: THREE.FlatShading,
                map:  this.map
            });

            if(this.ShowLabel == true) {
                this.Label = new self.Text(new THREE.Vector3(mPos.x, mPos.y - (mSize.y * 0.75), 2), "Button", "center");
                this.Label.Transform.parent = this.Transform;
            }

            this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( mSize.x, mSize.y, 0, 0 ), this.material );
            this.mesh.position.set(  mPos.x,  mPos.y, 0 );
            this.Transform.add(  this.mesh );

            self.AddUIObject(this);
            return this;
        };
        this.init();
    };
    this.Button.Prototype = Object.create(this.BaseUIObject());

    this.TimeBlockButton = function(texture, mPos, mSize, groupID, tabID){
        this.GroupID = groupID || 0;
        this.TabID = tabID || 0;
        var mVisible = true;
        this.Time = 0;

        this.__defineGetter__("Visible", function(){
            return mVisible;
        });

        this.__defineSetter__("Visible", function(val){
            mVisible = val;
            if(this.mesh != null){this.mesh.visible = val;}
            if(this.mesh2 != null){this.mesh2.visible = val;}
        });

        this.__defineGetter__("Checked", function(){
            return mVisible;
        });

        this.__defineSetter__("Checked", function(val){
            mVisible = val;
            if(this.mesh2 != null){this.mesh2.visible = !val;}
        });

        this.init = function()
        {
            this.Transform = new THREE.Object3D;
            scene.add(  this.Transform );

            this.material1 = new THREE.MeshBasicMaterial({
                color:0xffffff, shading: THREE.FlatShading
            });
            this.material2 = new THREE.MeshBasicMaterial({
                color:0x000000, shading: THREE.FlatShading
            });

            this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( mSize, mSize, 0, 0 ), this.material1 );
            this.mesh.position.set(  0,  0, 0 );
            this.Transform.add(  this.mesh );

            this.mesh2 = new THREE.Mesh( new THREE.PlaneGeometry( mSize-1, mSize-1, 0, 0 ), this.material2 );
            this.mesh2.position.set(  0,  0, 0.5 );

            this.Transform.position.set(  mPos.x,  mPos.y, 0.5 );
            this.Transform.add(  this.mesh2 );

            self.AddUIObject(this);
            return this;
        };
        this.init();
    };
    this.TimeBlockButton.Prototype = Object.create(this.BaseUIObject());


    this.Tab = function(texture, mPos, mSize, tabGroupID, groupID, tabID) {
        this.GroupID = groupID || 0;
        this.TabID = tabID || 0;
        this.TabGroupID = tabGroupID || 0;

        this.onInactiveTab = null;
        this.onActiveTab = null;

        this.onSwitchTabs = function () {
            for (var i = 0; i < mUIObjects.length; i++) {

                //Only operate on same Group ID Items
                if (this.GroupID == mUIObjects[i].GroupID) {
                    //Toggle visibility on active Tab Items
                    if (mUIObjects[i].TabGroupID == 0) {
                        if (i == this.index) {
                            if(mUIObjects[i].onActiveTab != null){mUIObjects[i].onActiveTab(mUIObjects[i]);}
                        }
                        else {
                            if(mUIObjects[i].onInactiveTab != null){mUIObjects[i].onInactiveTab(mUIObjects[i]);}
                        }
                    }
                    else if (this.TabID == mUIObjects[i].TabID)
                    {
                        if(mUIObjects[i].Visible != null)
                        {
                            mUIObjects[i].Visible = true;
                        }
                    }
                    else
                    {
                        if(mUIObjects[i].Visible != null)
                        {
                            mUIObjects[i].Visible = false;
                        }
                    }

                }
            }
        }

        this.init = function()
        {

            this.Transform = new THREE.Object3D;
            scene.add(  this.Transform );

            this.map = THREE.ImageUtils.loadTexture( texture );

            this.material = new THREE.MeshBasicMaterial({
                color:0xffffff, shading: THREE.FlatShading,
                map:  this.map
            });

            this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( mSize.x, mSize.y, 0, 0 ), this.material );
            this.mesh.position.set(  mPos.x,  mPos.y, 0 );
            this.Transform.add(  this.mesh );

            self.AddUIObject(this);
            return this;
        };
        this.init();
    };
    this.Tab.Prototype = Object.create(this.BaseUIObject());



    this.Timeline = function(texture, mPos, mSize, groupID, tabID){
        this.GroupID = groupID || 0;
        this.TabID = tabID || 0;

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

            self.DrawLine(
                new THREE.Vector3(this.Position.x, yPos,0 ),
                new THREE.Vector3(this.Position.x + this.Size.x, yPos,0)
            );
            self.DrawLine(
                new THREE.Vector3(this.Position.x, this.Position.y + (this.Size.y * 0.25),0 ),
                new THREE.Vector3(this.Position.x, this.Position.y + (this.Size.y * 0.75),0)
            );
            self.DrawLine(
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
    this.Timeline.Prototype = Object.create(this.BaseUIObject());

    this.BlockTimeline = function(texture, mPos, mSize, groupID, tabID, timeSteps, timeBlockSize){
        this.GroupID = groupID || 0;
        this.TabID = tabID || 0;

        //Timeline Specific
        this.Size = new THREE.Vector2(mSize.x,mSize.y);
        this.Position = new THREE.Vector2(mPos.x,mPos.y);
        this.TimeBlocks = [];
        this.TimeSteps = 15 || timeSteps;
        this.TimeBlockSize = 8 || timeBlockSize;
        this.SequenceTime = null;
        this.SequenceLength = null;
        this.SetSequenceTime = null;

        this.onMouseDown = function(event, uiObject)
        {
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1.15;
        }
        this.onMouseUp = function(event, uiObject)
        {
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;
            this.parent.SetSequenceTime((uiObject.Time * (this.parent.SequenceLength() / this.parent.TimeSteps)) + 1);
        }
        this.onMouseMove = function(event, uiObject)
        {
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;
        }
        //Update Timeline with
        this.onUIUpdate = function(event, uiObject)
        {
            var frameStep = this.TimeSteps / this.SequenceLength();
            var blockTime = this.SequenceTime() * frameStep;

            //console.log(blockTime);
            for(var x = 0; x < this.TimeBlocks.length; x++)
            {
                this.TimeBlocks[x].Checked = blockTime > x ? true : false;
            }

//            if(this.TimeHandle != null)
//            {
//                var yPos = this.Position.y + (this.Size.y / 2);
//
//                var frameStep = this.Size.x / this.SequenceLength();
//
//                this.TimeHandle.mesh.position.set(this.Position.x + (frameStep *  this.SequenceTime()),  yPos, 1 );
//                //this.mesh.position.set(  mPos.x,  mPos.y, 0 );
//            }
        };

//        this.DrawTimelineLines = function()
//        {
//            var yPos = this.Position.y + (this.Size.y / 2);
//
//            self.DrawLine(
//                new THREE.Vector3(this.Position.x, yPos,0 ),
//                new THREE.Vector3(this.Position.x + this.Size.x, yPos,0)
//            );
//            self.DrawLine(
//                new THREE.Vector3(this.Position.x, this.Position.y + (this.Size.y * 0.25),0 ),
//                new THREE.Vector3(this.Position.x, this.Position.y + (this.Size.y * 0.75),0)
//            );
//            self.DrawLine(
//                new THREE.Vector3(this.Position.x + this.Size.x, this.Position.y + (this.Size.y * 0.25),0 ),
//                new THREE.Vector3(this.Position.x + this.Size.x, this.Position.y + (this.Size.y * 0.75),0)
//            );
//        };

        this.init = function()
        {
            //var blockButton = new UIObjectManager.TimeBlockButton('textures/UI/Play.png', mPos, this.TimeBlockSize);

            for(var x =0; x < this.TimeSteps; x++)
            {
                //console.log("Index: " + x + " - " + (this.Position.x + ((x * this.TimeBlockSize) + 5)));
                var blockButton = new UIObjectManager.TimeBlockButton('textures/UI/Play.png', new THREE.Vector2(this.Position.x + (x * (this.TimeBlockSize + 2) ), this.Position.y), this.TimeBlockSize);
                blockButton.onMouseDown = this.onMouseDown;
                blockButton.onMouseUp = this.onMouseUp;
                blockButton.onMouseMove = this.onMouseMove;
                blockButton.Time = x;
                blockButton.parent = this;
                this.TimeBlocks.push(blockButton);
            }

            //var blockButton = new UIObjectManager.TimeBlockButton('textures/UI/Play.png', new THREE.Vector2(-95, -85), new THREE.Vector2(8, 8));
            //this.TimeBlocks.push(blockButton);

            self.AddUIObject(this);
            return this;
        };
        this.init();
    };
    this.BlockTimeline.Prototype = Object.create(this.BaseUIObject());

    this.HueRing = function(mPos, mSize, groupID, tabID){
        this.GroupID = groupID || 0;
        this.TabID = tabID || 0;

        var mHue = 0;
        this.__defineGetter__("Hue", function(){
            return mHue;
        });

        this.__defineSetter__("Hue", function(val){
            mHue = val;
            this.HueHandle.rotation.z = ((mHue + 0.5) * 2) * Math.PI;
            if(this.OnHueUpdated != null){this.OnHueUpdated(mHue);}
        });

        this.HueHandle = new THREE.Object3D;
        this.OnHueUpdated = null;

        this.UpdatePosition = function(event)
        {
            //Get Hit Point from event and make a vector
            var vec = new THREE.Vector2(this.HueHandle.position.x - event.intersection[0].point.x,
                                        event.intersection[0].point.y - this.HueHandle.position.y);
            vec.normalize();
            //convert the vector to radians
            this.HueHandle.rotation.z = Math.atan2( vec.x, vec.y );
            mHue = (this.HueHandle.rotation.z / Math.PI)/2 + 0.5;

            if(this.OnHueUpdated != null){this.OnHueUpdated(mHue);}
        };

        this.init = function()
        {
            this.map = THREE.ImageUtils.loadTexture( 'textures/UI/ColorWheel.png' );

            this.material = new THREE.MeshBasicMaterial({
                color:0xffffff, shading: THREE.FlatShading,
                map:  this.map
            });

            this.HueHandle.position.set(mPos.x - 0.5, mPos.y, 0);

            //Color selection ring foreground
            var object = new THREE.Mesh( new THREE.RingGeometry( 2.3, 3.3, 20, 0, 0, Math.PI * 2 ), new THREE.MeshBasicMaterial({color:0xFFFFFF, shading: THREE.FlatShading}));
            object.position.set(0 , 28.3, 1 );
            this.HueHandle.add( object );

            //Color selection ring background
            object = new THREE.Mesh( new THREE.RingGeometry( 2, 3.6, 20, 0, 0, Math.PI * 2 ), new THREE.MeshBasicMaterial({color:0x000000, shading: THREE.FlatShading}));
            object.position.set(0 , 28.3, 1 );
            this.HueHandle.add( object );

            scene.add(this.HueHandle);

            //Color Wheel Background Ring
            object = new THREE.Mesh( new THREE.RingGeometry( 24, 33, 40, 0, 0, Math.PI * 2 ), this.material );
            object.position.set( mPos.x, mPos.y, 0 );
            scene.add( object );

            //Color Wheel Collision Mesh Ring
            this.mesh = new THREE.Mesh( new THREE.RingGeometry( 24, 35, 40, 0, 0, Math.PI * 2 ), new THREE.MeshBasicMaterial({color:0x000000, shading: THREE.FlatShading}) );
            this.mesh.position.set( mPos.x, mPos.y, -1);
            scene.add( this.mesh );

            self.AddUIObject(this);
            return this;
        };
        this.init();
    };
    this.HueRing.Prototype = Object.create(this.BaseUIObject());

    this.ColorPicker = function(mPos, mSize, groupID, tabID){
        var mColorPicker = this;
        this.GroupID = groupID || 0;
        this.TabID = tabID || 0;

        var ColorPicker = this;
        this.HueRing = null;
        this.ColorHandle = new THREE.Object3D;
        this.onColorUpdated = null;

        var SwatchScale = new THREE.Vector2(29,29);

        this.__defineGetter__("Hue", function(){
            return this.HueRing.Hue;
        });

        this.__defineSetter__("Hue", function(val){

            if(val > 1){val = 1;}
            if(val < 0){val = 0;}

            this.HueRing.Hue = val;
            if(mColorPicker.onColorUpdated != null){mColorPicker.onColorUpdated(new ColorUpdatedEvent(), mColorPicker)}
        });

        this.__defineGetter__("Sat", function(){
            return 1 - this.ColorHandle.position.x;
        });

        this.__defineSetter__("Sat", function(val){

            if(val > 1){val = 1;}
            if(val < 0){val = 0;}

            this.ColorHandle.position.x = 1 - val;
            if(mColorPicker.onColorUpdated != null){mColorPicker.onColorUpdated(new ColorUpdatedEvent(), mColorPicker)}
        });

        this.__defineGetter__("Light", function(){
            return this.ColorHandle.position.y;
        });

        this.__defineSetter__("Light", function(val){

            if(val > 1){val = 1;}
            if(val < 0){val = 0;}

            this.ColorHandle.position.y = val;
            if(mColorPicker.onColorUpdated != null){mColorPicker.onColorUpdated(new ColorUpdatedEvent(), mColorPicker)}
        });

        this.SetColor = function(color)
        {
            this.Hue = color.h;
            this.Sat = color.s;
            this.Light = color.l;

            mColorUpdated(this.Hue);
        };

        var mColorUpdated = function(hue)
        {
            UpdateSwatchColor(hue);
            if(mColorPicker.onColorUpdated != null){mColorPicker.onColorUpdated(new ColorUpdatedEvent(), mColorPicker)}
        }

        var UpdateSwatchColor = function(hue)
        {
            ColorPicker.mesh.geometry.faces[0].vertexColors[0] = new THREE.Color().setHSL(hue,1,1);
            ColorPicker.mesh.geometry.faces[0].vertexColors[1] = new THREE.Color().setHSL(hue,1,0.5);
            ColorPicker.mesh.geometry.faces[0].vertexColors[2] = new THREE.Color().setHSL(hue,0,1);

            ColorPicker.mesh.geometry.faces[1].vertexColors[0] = new THREE.Color().setHSL(hue,1,0.5);
            ColorPicker.mesh.geometry.faces[1].vertexColors[1] = new THREE.Color().setHSL(hue,0,0.5);
            ColorPicker.mesh.geometry.faces[1].vertexColors[2] = new THREE.Color().setHSL(hue,0,1);

            ColorPicker.mesh.geometry.colorsNeedUpdate = true;
        };

        this.UpdatePosition = function(event)
        {
            var color = new THREE.Color();
            color.h = this.HueRing.Hue;
            color.s = 1 - ((event.intersection[0].point.x - (this.mesh.position.x - SwatchScale.x /2)) / SwatchScale.x);
            color.l = (event.intersection[0].point.y - (this.mesh.position.y - SwatchScale.y /2)) / SwatchScale.y;

            this.SetColor(color);
        };

        this.init = function()
        {
            this.map = THREE.ImageUtils.loadTexture( 'textures/UI/LightToDark.png' );

            this.material = new THREE.MeshLambertMaterial({
                color:0xFFFFFF,
                shading: THREE.FlatShading,
                vertexColors: THREE.VertexColors,
                emissive:0xFFFFFF,
                map: this.map
            });


            var ColorHandleGroup = new THREE.Object3D;

            ColorHandleGroup.position.set(mPos.x-(SwatchScale.x/2), mPos.y-(SwatchScale.y/2), 0);
            ColorHandleGroup.scale.set(SwatchScale.x,SwatchScale.y,1);

            //Color selection ring foreground
            var object = new THREE.Mesh( new THREE.RingGeometry( 1.3/SwatchScale.x, 2.3/SwatchScale.y, 20, 0, 0, Math.PI * 2 ), new THREE.MeshBasicMaterial({color:0xFFFFFF, shading: THREE.FlatShading}));
            object.position.set(0 , 0, 1 );
            this.ColorHandle.add( object );

            //Color selection ring background
            object = new THREE.Mesh( new THREE.RingGeometry( 1/SwatchScale.x, 2.6/SwatchScale.y, 20, 0, 0, Math.PI * 2 ), new THREE.MeshBasicMaterial({color:0x000000, shading: THREE.FlatShading}));
            object.position.set(0 , 0, 1 );
            this.ColorHandle.add( object );

            ColorHandleGroup.add(this.ColorHandle);

            scene.add(ColorHandleGroup);

            //ColorSwatch Border
            var Outline = new THREE.Mesh( new THREE.PlaneGeometry( SwatchScale.x +1, SwatchScale.y+1, 0, 0 ), new THREE.MeshBasicMaterial({color:0xFFFFFF, shading: THREE.FlatShading}));
            Outline.position.set( mPos.x, mPos.y, 0.90 );
            scene.add( Outline );

            //ColorSwatch
            this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( SwatchScale.x, SwatchScale.y, 1, 1 ), this.material);
            this.mesh.position.set( mPos.x, mPos.y, 1 );
            scene.add( this.mesh );

            //Hue Ring Object
            this.HueRing = new self.HueRing(mPos, mSize, groupID, tabID);
            this.HueRing.name = "HueRing";
            this.HueRing.OnHueUpdated = mColorUpdated;

            self.AddUIObject(this);

            return this;
        };
        this.init();
    };
    this.ColorPicker.Prototype = Object.create(this.BaseUIObject());


    this.Panel = function(mPos, mSize, groupID, tabID)
    {
        this.GroupID = groupID || 0;
        this.TabID = tabID || 0;

        this.__defineGetter__("Visible", function(){
            return this.Transform.visible;
        });

        this.__defineSetter__("Visible", function(val){
            this.Transform.visible = val;
        });

        this.init = function()
        {
            this.Transform = new THREE.Object3D;
            scene.add(  this.Transform );

            self.AddUIObject(this);
            return this;
        };
        this.init();
    };

    this.Panel.Prototype = Object.create(this.BaseUIObject());

    this.DrawLine = function(Pos1, Pos2, color1, color2){

        var mColor1 = color1 || new THREE.Color(1,1,1);
        var mColor2 = color2 || new THREE.Color(1,1,1);

        var geometry = new THREE.BufferGeometry();
        var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors, linewidth: 5 });

        var positions = new Float32Array( 6 );
        var colors = new Float32Array( 6 );

        // positions
        positions[0] = Pos1.x;
        positions[1] = Pos1.y;
        positions[2] = Pos1.z;

        positions[3] = Pos2.x;
        positions[4] = Pos2.y;
        positions[5] = Pos2.z;

        // colors
        colors[0] =  mColor1.r;
        colors[1] =  mColor1.g;
        colors[2] =  mColor1.b;
        // colors
        colors[3] =  mColor2.r;
        colors[4] =  mColor2.g;
        colors[5] =  mColor2.b;

        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

        geometry.computeBoundingSphere();

        var mesh = new THREE.Line( geometry, material );
        scene.add(mesh);
    };

    this.Text = function(pos, text, textAlignment)
    {
        var Self = this;
        var mTextAlignment = textAlignment || "center";
        var mText = text || "BASE";
        var text3d = null;
        var textMesh = THREE.Geometry();
        var mat = null;
        var position = pos;
        var mVisible = true;
        var mTextOptions =
        {
            size: 5,
            height: 0,
            curveSegments: 0,
            font: "helvetiker",
            bevelThickness: 0,
            amount: 0
        };

        var mRebuildText = function(text)
        {
            if(text != null && text3d != null) {
                scene.remove(textMesh);
                text3d = new THREE.TextGeometry(text, mTextOptions);
                text3d.computeBoundingBox();
                textMesh = new THREE.Mesh(text3d, mat); // = text3d;
                Self.UpdateTextPosition();
                scene.add(textMesh);
                //this.Transform.add(textMesh);
            }
        };

        this.__defineGetter__("Visible", function(){
            return mVisible;
        });

        this.__defineSetter__("Visible", function(val){
            mVisible = val;
            if(textMesh != null){textMesh.visible = val;}
        });

        this.__defineGetter__("Position", function(){
            return position;
        });

        this.__defineSetter__("Position", function(val){
            position = val;
            this.UpdateTextPosition();
        });

        this.__defineGetter__("TextAlignment", function(){
            return mTextAlignment;
        });

        this.__defineSetter__("TextAlignment", function(val){
            mTextAlignment = val.toLowerCase();
            this.UpdateTextPosition();
        });

        this.__defineGetter__("Text", function(){
            return mText;
        });

        this.__defineSetter__("Text", function(val){
            mText = val;
            mRebuildText(mText);
        });

        this.UpdateTextPosition = function()
        {
            var textWidth = textMesh.geometry.boundingBox.max.x - textMesh.geometry.boundingBox.min.x;

            var TextAlignmentPos =  this.Transform.position.x;

            if(mTextAlignment == "center"){TextAlignmentPos = position.x - (textWidth/2);}
            else if(mTextAlignment == "right"){TextAlignmentPos = position.x - textWidth;}

            textMesh.position.set(TextAlignmentPos,  position.y,  position.z);
        }

        this.init = function()
        {
            this.Transform = new THREE.Object3D;
            scene.add(  this.Transform );

            mat = new THREE.MeshBasicMaterial( { color: 0xffffff } );
            text3d = new THREE.TextGeometry( mText, mTextOptions);
            text3d.computeBoundingBox();
            textMesh = new THREE.Mesh( text3d, mat );
            this.UpdateTextPosition();
            scene.add( textMesh );
            //this.Transform.children.push(textMesh);
        };

        this.init();

        self.AddUIObject(this);

        return this;
        //var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

    };
    this.Text.Prototype = Object.create(this.BaseUIObject());

    this.init();
};
