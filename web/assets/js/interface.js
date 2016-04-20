/**
 * Created by Robert Butterworth on 8/2/2014.
 */
//Create UI
function buildInterface() {

    //Debug Functions
    function ClearDome(event, uiObject)
    {
        uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;
        ClearLights();
        SequenceManager.Events = [];
    }

    function SubmitSequence(event, uiObject)
    {
        uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;
        EnableDomeEventHandles(false);
        DisplaySubmit();
    }

    var leftPanel = new UIObjectManager.Panel(new THREE.Vector2(0,0),new THREE.Vector2(1,1),0,0);

    //Brush Functions
    {
        function updateBrushColor(event, uiObject)
        {
            if(uiObject.mesh.visible == true) {
                uiObject.material.color = Clone(ActiveBrushData[0]);
            }
        }
        function ResetUI(event, uiObject)
        {
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;
        }

        function SetBrush(event, uiObject)
        {
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;

            ActiveBrushID = uiObject.tag;
            ActiveBrushData[0] = uiObject.material.color;
        }

        function ButtonDownClick(event, uiObject)
        {
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1.2;
        }

        function SetForeground(event, uiObject)
        {
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;

            var newEvent = new EVENT(SequenceManager.SequenceTime, 0, Brushes[uiObject.tag], ActiveBrushData);
            SequenceManager.AddEvent(newEvent);
        }

        function SetBackground(event, uiObject)
        {
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;

            var newEvent = new EVENT(SequenceManager.SequenceTime, 0, Brushes[uiObject.tag]);
            newEvent.IsBackground = true;
            SequenceManager.AddEvent(newEvent);
        }

        function AutoSpinR(event, uiObject)
        {
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;
            FixedSpeedActive = true;
            targetRotation = 0.05;
        }

        function AutoSpinL(event, uiObject)
        {
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;
            FixedSpeedActive = true;
            targetRotation = -0.05;
        }
    }

    //Create Swiper UI
    {
//         var map1 = THREE.ImageUtils.loadTexture('textures/UI/spin_bar.png');
//         //videoTexture = new THREE.Texture( videoFile );

//         var swipeMaterial = new THREE.MeshBasicMaterial({
//             color: 0xffffff, shading: THREE.FlatShading
//         });

//         swipeCollision = new THREE.Mesh(new THREE.PlaneGeometry(100, 10, 0, 0), new THREE.MeshBasicMaterial({
//             color: 0xff0000, shading: THREE.FlatShading
//         }));
//         swipeCollision.position.set(0, -85, 0);
//         scene.add(swipeCollision);

//         swipeMesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 2, 0, 0), swipeMaterial);
//         swipeMesh.position.set(0, -85, 1);
//         scene.add(swipeMesh);

        var SpinR = new UIObjectManager.Button('textures/UI/SpinR.png', new THREE.Vector2(65, -85), new THREE.Vector2(15, 15), 0, 0);
        SpinR.onMouseDown = ButtonDownClick;
        SpinR.onMouseUp = AutoSpinR;
        SpinR.material.color.setRGB(1, 1, 1);
        SpinR.tag = 1;
        SpinR.name = "SpinRight";

        var SpinL = new UIObjectManager.Button('textures/UI/SpinL.png', new THREE.Vector2(-65, -85), new THREE.Vector2(15, 15), 0, 0);
        SpinL.onMouseUp = AutoSpinL;
        SpinL.onMouseDown = ButtonDownClick;
        SpinL.material.color.setRGB(1, 1, 1);
        SpinL.tag = 1;
        SpinL.name = "SpinLeft";


    }

    var domeSpinner = new UIObjectManager.Slider('textures/UI/smiley-face.png', new THREE.Vector2(-55, -87), new THREE.Vector2(110, 4));
    {
        function onDomeSpinnerHandleMouseDown(event, uiObject)
        {

            FixedSpeedActive = false;

            this.mesh.scale.x = this.mesh.scale.y = 1.2;
            uiObject.isMouseDown = true;
            uiObject.isMouseDownPosition = new THREE.Vector2(event.x, event.y);
        }

        function onDomeSpinnerHandleMouseEnter(event, uiObject)
        {
            this.mesh.scale.x = this.mesh.scale.y = 1.2;
        }

        function onDomeSpinnerHandleMouseExit(event, uiObject)
        {
            this.mesh.scale.x = this.mesh.scale.y = 1;
            //SequenceManager.Play = true;
        }

        function onDomeSpinnerHandleMouseUp(event, uiObject)
        {
            if(uiObject.isMouseDownPosition == null)
                return;
                
            this.mesh.scale.x = this.mesh.scale.y = 1;

            var sx;

            if(uiObject.Parent != null)
                sx = uiObject.Parent.Size.x;
            else
                sx = uiObject.Size.x;

            var percent = (event.x - uiObject.isMouseDownPosition.x) / sx;
            targetRotation = (percent * (Math.PI * 2))/4;

            //console.log(event.x - uiObject.isMouseDownPosition.x);
            //targetRotation = 0.05;

            uiObject.isMouseDown = false;
            uiObject.isMouseDownPosition = null;
        }

        function onDragDomeSpinner(event, uiObject)
        {
            if(uiObject.isMouseDown == true)
            {
                console.log(uiObject.isMouseDownPosition.x - event.x);
                //SequenceManager.SequenceTime += (event.x - uiObject.isMouseDownPosition.x)/2;
                //uiObject.isMouseDownPosition = new THREE.Vector2(event.x, event.y);
            }
        }

        function onDomeSpinnerMove(event, uiObject)
        {
            if(uiObject.SliderHandle.isMouseDown == true)
            {
                //var degreeStep = this.Size.x / (Math.PI * 2);
                var percent = (event.intersection[0].point.x - uiObject.Position.x) / this.Size.x;
                DomeGroup.rotation.y = percent * (Math.PI * 2);

                uiObject.isMouseDownPosition = new THREE.Vector2(event.x, event.y);
            }
        }

        function onTimelineMouseExit(event, uiObject)
        {
            uiObject.SliderHandle.isMouseDown = false;
            uiObject.SliderHandle.mesh.scale.x = uiObject.SliderHandle.mesh.scale.y = 1;
        }

        function onSliderUIUpdate(event, uiObject)
        {
            if(!isMouseDown)
            {
                uiObject.SliderHandle.isMouseDown = false
            }

            if(this.SliderHandle != null)
            {
                var yPos = this.Position.y + (this.Size.y / 2);


                var degreeStep = this.Size.x / (Math.PI * 2);
                //console.log(DomeGroup.rotation.y);
                this.SliderHandle.mesh.position.set(this.Position.x + (degreeStep *  DomeGroup.rotation.y ),  yPos, 1 );
                //this.mesh.position.set(  mPos.x,  mPos.y, 0 );
            }
        };

        function GetSequenceTime(){ return SequenceManager.GetSequenceTime();}
        function GetSequenceLength(){ return SequenceManager.GetSequenceLength();}

        //domeSpinner.onMouseDown = ButtonDownClick;
        //domeSpinner.onMouseUp = SetForeground;
        //domeSpinner.material.color.setRGB(1, 1, 1);
        domeSpinner.SequenceTime = GetSequenceTime;
        domeSpinner.SequenceLength = GetSequenceLength;
        domeSpinner.tag = 5;
        domeSpinner.name = "MainTimeline";

        //Todo: Fix Dragging of domeSpinner
        domeSpinner.SliderHandle.Parent = domeSpinner;
        domeSpinner.onUIUpdate = onSliderUIUpdate;
        domeSpinner.SliderHandle.onMouseDown = onDomeSpinnerHandleMouseDown;
        domeSpinner.SliderHandle.onMouseUp = onDomeSpinnerHandleMouseUp;
        domeSpinner.SliderHandle.onMouseEnter = onDomeSpinnerHandleMouseEnter;
        domeSpinner.SliderHandle.onMouseExit = onDomeSpinnerHandleMouseExit;
        //domeSpinner.SliderHandle.onMouseMove = onDragDomeSpinner;
        domeSpinner.onMouseMove = onDomeSpinnerMove;
        domeSpinner.onMouseUp = onDomeSpinnerHandleMouseUp;
        domeSpinner.onMouseExit = onTimelineMouseExit;
    }

    //Playback Controls
    {
        function PlaySequence(event, uiObject)
        {
            SequenceManager.Play = uiObject.tag;
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;
        }

        function PauseUpdateUI(event, uiObject)
        {
            if(SequenceManager.Play == true)
            {
                uiObject.material.color.setRGB(1, 1, 1);
            }
            else
            {
                uiObject.material.color.setRGB(1, 1, 0);
            }
        }

        function PlayUpdateUI(event, uiObject)
        {
            if(SequenceManager.Play == true)
            {
                uiObject.material.color.setRGB(0, 1, 0);
            }
            else
            {
                uiObject.material.color.setRGB(1, 1, 0);
            }
        }

        var Pause = new UIObjectManager.Button('textures/UI/Pause.png', new THREE.Vector2(5, -75), new THREE.Vector2(10, 10));
        Pause.onMouseDown = ButtonDownClick;
        Pause.onMouseUp = PlaySequence;
        Pause.onUIUpdate = PauseUpdateUI;
        Pause.material.color.setRGB(1, 1, 1);
        Pause.tag = false;
        Pause.name = "Pause";

        var Play = new UIObjectManager.Button('textures/UI/Play.png', new THREE.Vector2(-5, -75), new THREE.Vector2(10, 10));
        Play.onMouseDown = ButtonDownClick;
        Play.onMouseUp = PlaySequence;
        Play.onUIUpdate = PlayUpdateUI;
        Play.material.color.setRGB(1, 1, 1);
        Play.tag = true;
        Play.name = "Play";

    }

    var blockTimeline = new UIObjectManager.BlockTimeline('textures/UI/smiley-face.png', new THREE.Vector2(-70, -100), new THREE.Vector2(8, 8));
    {
        function GetSequenceTime(){ return SequenceManager.GetSequenceTime();}
        function SetSequenceTime(time){ SequenceManager.SetSequenceTime(time);}
        function GetSequenceLength(){ return SequenceManager.GetSequenceLength();}

        //timeline.material.color.setRGB(1, 1, 1);
        blockTimeline.SequenceTime = GetSequenceTime;
        blockTimeline.SequenceLength = GetSequenceLength;
        blockTimeline.SetSequenceTime = SetSequenceTime;
        blockTimeline.tag = 5;
        blockTimeline.name = "MainTimeline";
    }
 
}






