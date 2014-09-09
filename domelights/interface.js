/**
 * Created by Robert Butterworth on 8/2/2014.
 */
//Create UI
function buildInterface() {

    //Create Swiper UI
    {
        var map1 = THREE.ImageUtils.loadTexture('textures/UI/spin_bar.png');
        //videoTexture = new THREE.Texture( videoFile );

        var swipeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff, shading: THREE.FlatShading,
            map: map1
        });

        swipeMesh = new THREE.Mesh(new THREE.PlaneGeometry(80, 15, 0, 0), swipeMaterial);
        swipeMesh.position.set(0, -70, 0);
        scene.add(swipeMesh);

        var SpinR = new UIObjectManager.Button('textures/UI/SpinR.png', new THREE.Vector2(50, -60), new THREE.Vector2(19, 19));
        SpinR.onMouseDown = ButtonDownClick;
        SpinR.onMouseUp = AutoSpinR;
        SpinR.material.color.setRGB(1, 1, 1);
        SpinR.tag = 1;
        SpinR.name = "SpinRight";

        var SpinL = new UIObjectManager.Button('textures/UI/SpinL.png', new THREE.Vector2(-50, -60), new THREE.Vector2(19, 19));
        SpinL.onMouseUp = AutoSpinL;
        SpinL.onMouseDown = ButtonDownClick;
        SpinL.material.color.setRGB(1, 1, 1);
        SpinL.tag = 1;
        SpinL.name = "SpinLeft";

    }

    //Playback Controls
    {
        var Pause = new UIObjectManager.Button('textures/UI/Pause.png', new THREE.Vector2(-5, -85), new THREE.Vector2(10, 10));
        Pause.onMouseDown = ButtonDownClick;
        Pause.onMouseUp = PlaySequence;
        Pause.onUIUpdate = PauseUpdateUI;
        Pause.material.color.setRGB(1, 1, 1);
        Pause.tag = false;
        Pause.name = "Pause";

        var Play = new UIObjectManager.Button('textures/UI/Play.png', new THREE.Vector2(5, -85), new THREE.Vector2(10, 10));
        Play.onMouseDown = ButtonDownClick;
        Play.onMouseUp = PlaySequence;
        Play.onUIUpdate = PlayUpdateUI;
        Play.material.color.setRGB(1, 1, 1);
        Play.tag = true;
        Play.name = "Play";
    }

    // Add Solid Color Brushes
    {
        var button1 = new UIObjectManager.Button('textures/sprites/circle.png', new THREE.Vector2(190, 50), new THREE.Vector2(20, 20));
        button1.onMouseDown = ButtonDownClick;
        button1.onMouseUp = SetBrush;
        button1.material.color.setRGB(0, 1, 0);
        button1.name = "button1";
        button1.tag = 1;

        var button2 = new UIObjectManager.Button('textures/sprites/circle.png', new THREE.Vector2(190, 70), new THREE.Vector2(20, 20));
        button2.onMouseUp = SetBrush;
        button2.onMouseDown = ButtonDownClick;
        button2.material.color.setRGB(1, 0, 0);
        button2.name = "button2";
        button2.tag = 1;

        var button3 = new UIObjectManager.Button('textures/sprites/circle.png', new THREE.Vector2(190, 90), new THREE.Vector2(20, 20));
        button3.onMouseUp = SetBrush;
        button3.onMouseDown = ButtonDownClick;
        button3.material.color.setRGB(0, 0, 1);
        button3.name = "button3";
        button3.tag = 1;

        var button4 = new UIObjectManager.Button('textures/sprites/circle.png', new THREE.Vector2(170, 50), new THREE.Vector2(20, 20));
        button4.onMouseDown = ButtonDownClick;
        button4.onMouseUp = SetBrush;
        button4.material.color.setRGB(1, 1, 0);
        button4.name = "button4";
        button4.tag = 1;

        var button5 = new UIObjectManager.Button('textures/sprites/circle.png', new THREE.Vector2(170, 70), new THREE.Vector2(20, 20));
        button5.onMouseUp = SetBrush;
        button5.onMouseDown = ButtonDownClick;
        button5.material.color.setRGB(1, 0, 1);
        button5.name = "button5";
        button5.tag = 1;

        var button6 = new UIObjectManager.Button('textures/sprites/circle.png', new THREE.Vector2(170, 90), new THREE.Vector2(20, 20));
        button6.onMouseUp = SetBrush;
        button6.onMouseDown = ButtonDownClick;
        button6.material.color.setRGB(0, 1, 1);
        button6.name = "button6";
        button6.tag = 1;
    }


    // Add Background Solid Brushes
    {
        var bbutton1 = new UIObjectManager.Button('textures/UI/Gradient.png', new THREE.Vector2(-180, 60), new THREE.Vector2(20, 20));
        bbutton1.onMouseDown = ButtonDownClick;
        bbutton1.onMouseUp = SetBackground;
        bbutton1.material.color.setRGB(1, 1, 1);
        bbutton1.tag = 2;
        bbutton1.name = "Background 1";

        var bbutton2 = new UIObjectManager.Button('textures/UI/SunnyDay.png', new THREE.Vector2(-180, 30), new THREE.Vector2(20, 20));
        bbutton2.onMouseDown = ButtonDownClick;
        bbutton2.onMouseUp = SetBackground;
        bbutton2.material.color.setRGB(1, 1, 1);
        bbutton2.tag = 3;
        bbutton2.name = "Background 2";

        var bbutton3 = new UIObjectManager.Button('textures/UI/smiley-face.png', new THREE.Vector2(-180, 0), new THREE.Vector2(20, 20));
        bbutton3.onMouseDown = ButtonDownClick;
        bbutton3.onMouseUp = SetForeground;
        bbutton3.material.color.setRGB(1, 1, 1);
        bbutton3.tag = 4;
        bbutton3.name = "Background 3";
    }

    var timeline = new UIObjectManager.Timeline('textures/UI/smiley-face.png', new THREE.Vector2(-90, -105), new THREE.Vector2(180, 20));
    {
        //timeline.onMouseDown = ButtonDownClick;
        //timeline.onMouseUp = SetForeground;
        //timeline.material.color.setRGB(1, 1, 1);
        timeline.SequenceTime = GetSequenceTime;
        timeline.SequenceLength = GetSequenceLength;
        timeline.tag = 5;
        timeline.name = "MainTimeline";

        //Todo: Fix Dragging of timeline
        timeline.TimeHandle.onMouseDown = onTimeHandleMouseDown;
        timeline.TimeHandle.onMouseUp = onTimeHandleMouseUp;
        timeline.TimeHandle.onMouseEnter = onTimeHandleMouseEnter;
        timeline.TimeHandle.onMouseExit = onTimeHandleMouseExit;
        //timeline.TimeHandle.onMouseMove = onDragTimeline;
        timeline.onMouseMove = onTimelineMove;
        timeline.onMouseUp = onTimeHandleMouseUp;
        timeline.onMouseExit = onTimelineMouseExit;

        function onTimeHandleMouseDown(event, uiObject)
        {
            this.mesh.scale.x = this.mesh.scale.y = 1.2;
            SequenceManager.Play = false;
            uiObject.isMouseDown = true;
            uiObject.isMouseDownPosition = new THREE.Vector2(event.x, event.y);
        }

        function onTimeHandleMouseEnter(event, uiObject)
        {
            this.mesh.scale.x = this.mesh.scale.y = 1.2;
        }

        function onTimeHandleMouseExit(event, uiObject)
        {
            this.mesh.scale.x = this.mesh.scale.y = 1;
            //SequenceManager.Play = true;
        }

        function onTimeHandleMouseUp(event, uiObject)
        {
            this.mesh.scale.x = this.mesh.scale.y = 1;
            uiObject.isMouseDown = false;
            uiObject.isMouseDownPosition = null;
        }

        function onDragTimeline(event, uiObject)
        {
            if(uiObject.isMouseDown == true)
            {
                console.log(uiObject.isMouseDownPosition.x - event.x);
                //SequenceManager.SequenceTime += (event.x - uiObject.isMouseDownPosition.x)/2;
                //uiObject.isMouseDownPosition = new THREE.Vector2(event.x, event.y);
            }
        }

        function onTimelineMove(event, uiObject)
        {
            if(uiObject.TimeHandle.isMouseDown == true)
            {
              SequenceManager.Play = false;
              var frameStep =  SequenceManager.SequenceLength / uiObject.Size.x;
              SequenceManager.SetSequenceTime((event.intersection[0].point.x - uiObject.Position.x) * frameStep);
            }
        }

        function onTimelineMouseExit(event, uiObject)
        {
            uiObject.TimeHandle.isMouseDown = false;
            uiObject.TimeHandle.mesh.scale.x = uiObject.TimeHandle.mesh.scale.y = 1;
        }


        function GetSequenceTime(){ return SequenceManager.GetSequenceTime();}
        function GetSequenceLength(){ return SequenceManager.GetSequenceLength();}
    }


    //Debug UI
    {
        //Clear Dome
        var clearDome = new UIObjectManager.Button('textures/UI/clear.png', new THREE.Vector2(180, -50), new THREE.Vector2(20, 8));
        clearDome.onMouseUp = ClearDome;
        clearDome.onMouseDown = ButtonDownClick;
        clearDome.onMouseEnter = ButtonDownClick;
        clearDome.onMouseExit = ResetUI;
        clearDome.material.color.setRGB(1, 1, 1);
        clearDome.tag = 0;
        clearDome.name = "ClearDome";

        //Submit Sequence
        var submitSequence = new UIObjectManager.Button('textures/UI/Submit.png', new THREE.Vector2(180, -70), new THREE.Vector2(20, 8));
        submitSequence.onMouseUp = SubmitSequence;
        submitSequence.onMouseDown = ButtonDownClick;
        submitSequence.onMouseEnter = ButtonDownClick;
        submitSequence.onMouseExit = ResetUI;
        submitSequence.material.color.setRGB(1, 1, 1);
        submitSequence.tag = 0;
        submitSequence.name = "SubmitSequence";
    }
}


//Brush Functions
{
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

        var newEvent = new EVENT(SequenceManager.SequenceTime, 0, Brushes[uiObject.tag]);
        SequenceManager.AddEvent(newEvent);
    }

    function SetBackground(event, uiObject)
    {
        uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;

        var newEvent = new EVENT(0, 0, Brushes[uiObject.tag]);
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

}



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





