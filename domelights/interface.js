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
        var map1 = THREE.ImageUtils.loadTexture('textures/UI/spin_bar.png');
        //videoTexture = new THREE.Texture( videoFile );

        var swipeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff, shading: THREE.FlatShading,
            map: map1
        });

        swipeMesh = new THREE.Mesh(new THREE.PlaneGeometry(80, 15, 0, 0), swipeMaterial);
        swipeMesh.position.set(0, -80, 0);
        scene.add(swipeMesh);

        var SpinR = new UIObjectManager.Button('textures/UI/SpinR.png', new THREE.Vector2(80, -60), new THREE.Vector2(19, 19), 0, 0);
        SpinR.onMouseDown = ButtonDownClick;
        SpinR.onMouseUp = AutoSpinR;
        SpinR.material.color.setRGB(1, 1, 1);
        SpinR.tag = 1;
        SpinR.name = "SpinRight";

        var SpinL = new UIObjectManager.Button('textures/UI/SpinL.png', new THREE.Vector2(-80, -60), new THREE.Vector2(19, 19), 0, 0);
        SpinL.onMouseUp = AutoSpinL;
        SpinL.onMouseDown = ButtonDownClick;
        SpinL.material.color.setRGB(1, 1, 1);
        SpinL.tag = 1;
        SpinL.name = "SpinLeft";


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

        var Pause = new UIObjectManager.Button('textures/UI/Pause.png', new THREE.Vector2(-85, -85), new THREE.Vector2(10, 10));
        Pause.onMouseDown = ButtonDownClick;
        Pause.onMouseUp = PlaySequence;
        Pause.onUIUpdate = PauseUpdateUI;
        Pause.material.color.setRGB(1, 1, 1);
        Pause.tag = false;
        Pause.name = "Pause";

        var Play = new UIObjectManager.Button('textures/UI/Play.png', new THREE.Vector2(-75, -85), new THREE.Vector2(10, 10));
        Play.onMouseDown = ButtonDownClick;
        Play.onMouseUp = PlaySequence;
        Play.onUIUpdate = PlayUpdateUI;
        Play.material.color.setRGB(1, 1, 1);
        Play.tag = true;
        Play.name = "Play";

    }

    // Add Solid Color Brushes
    {
        var button1 = new UIObjectManager.Button('textures/sprites/circle.png', new THREE.Vector2(150, 60), new THREE.Vector2(40, 40), 1, 1, true);
        button1.onMouseDown = ButtonDownClick;
        button1.onMouseUp = SetBrush;
        button1.onUIUpdate = updateBrushColor;
        button1.material.color.setRGB(0, 1, 0);
        button1.name = "button1";
        button1.tag = 9;
        button1.name = "button2";
        button1.Label.Text = "FireWorks";
        button1.Label.Position.y += 10;
        button1.Label.UpdateTextPosition();
        button1.Transform.parent =  leftPanel.Transform;

        var button2 = new UIObjectManager.Button('textures/sprites/circle.png', new THREE.Vector2(150, 60), new THREE.Vector2(30, 30), 1, 2, true);
        button2.onMouseDown = ButtonDownClick;
        button2.onMouseUp = SetBrush;
        button2.onUIUpdate = updateBrushColor;
        button2.material.color.setRGB(0, 1, 1);
        button2.tag = 6;
        button2.name = "button2";
        button2.Label.Text = "Loop Fade";
        button2.Label.Position.y += 10;
        button2.Label.UpdateTextPosition();
        button2.Transform.parent =  leftPanel.Transform;


        var button3 = new UIObjectManager.Button('textures/sprites/circle.png', new THREE.Vector2(150, 60), new THREE.Vector2(40, 40), 1, 3, true);
        button3.onMouseDown = ButtonDownClick;
        button3.onMouseUp = SetBrush;
        button3.onUIUpdate = updateBrushColor;
        button3.material.color.setRGB(1, 1, 0);
        button3.name = "button3";
        button3.tag = 5;
        button3.Label.Text = "Ring Fade";
        button3.Label.Position.y += 10;
        button3.Label.UpdateTextPosition();
        button3.Transform.parent =  leftPanel.Transform;
    }

    // Add Background Solid Brushes
    {
        function spinUpdate(event, uiObject)
        {
            //console.log(uiObject);

            if(uiObject.mesh.rotation.z < -1.5)
            {
                uiObject.spin = 0.1;
            }
            else if (uiObject.mesh.rotation.z > 1.5)
            {
                uiObject.spin = -0.1;
            }

            uiObject.mesh.rotation.z += uiObject.spin;
        }

        function animateImage(event, uiObject)
        {
            uiObject.timer += 0.1;
            var increment = 1/uiObject.frames * Math.floor(uiObject.timer);
            if(increment > (1/uiObject.frames)*(uiObject.frames-2) ){uiObject.timer = 0;}
            uiObject.map.offset.x = increment;
        }

        var bbutton1 = new UIObjectManager.Button('textures/UI/rainbowgradient.png', new THREE.Vector2(150, 70), new THREE.Vector2(30, 30),1,4,false);
        bbutton1.onMouseDown = ButtonDownClick;
        bbutton1.onMouseUp = SetBackground;
        bbutton1.onUIUpdate = animateImage;
        bbutton1.material.color.setRGB(1, 1, 1);
        bbutton1.tag = 2;
        bbutton1.name = "Background 1";
        bbutton1.map.repeat.x = 1/5;
        bbutton1.timer = 0;
        bbutton1.frames = 5;
        //bbutton1.Label.Text = "Rainbow";

        var bbutton2 = new UIObjectManager.Button('textures/UI/rainbowwipe.png', new THREE.Vector2(180, 70), new THREE.Vector2(30, 30),1,4,false);
        bbutton2.onMouseDown = ButtonDownClick;
        bbutton2.onMouseUp = SetBackground;
        bbutton2.onUIUpdate = animateImage;
        bbutton2.material.color.setRGB(1, 1, 1);
        bbutton2.map.repeat.x = 1/6;
        bbutton2.tag = 3;
        bbutton2.name = "Background 2";
        //bbutton2.Label.Text = "Rainbow Wipe";
        bbutton2.timer = 0;
        bbutton2.frames = 6;

        var bbutton3 = new UIObjectManager.Button('textures/UI/fulldomeflash.png', new THREE.Vector2(210, 70), new THREE.Vector2(30, 30),1,4,false);
        bbutton3.onMouseDown = ButtonDownClick;
        bbutton3.onMouseUp = SetForeground;
        bbutton3.onUIUpdate = animateImage;
        bbutton3.material.color.setRGB(1, 1, 1);
        bbutton3.tag = 4;
        bbutton3.name = "Background 3";
        //bbutton3.spin = -0.1;
       // bbutton3.Label.Text = "Green Flash";
        bbutton3.map.repeat.x = 1/6;
        bbutton3.timer = 0;
        bbutton3.frames = 6;
    }

    var timeline = new UIObjectManager.Timeline('textures/UI/smiley-face.png', new THREE.Vector2(-90, -110), new THREE.Vector2(180, 20));
    {
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
    }

    var ColorPicker = new UIObjectManager.ColorPicker(new THREE.Vector2(170, -40), new THREE.Vector2(50, 50));
    {
        function onColorPickerColorUpdated(event, uiObject)
        {
            ActiveBrushData[0].setHSL(uiObject.Hue, uiObject.Sat , uiObject.Light);
        }

       function PickerMouseMove(event, uiObject) {
            if (uiObject.isMouseDown == true) {
                uiObject.UpdatePosition(event);
            }
        }

        function PickerMouseDown(event, uiObject) {
            //console.log(event);
            uiObject.isMouseDown = true;
            uiObject.UpdatePosition(event);
        }

        function PickerMouseUp(event, uiObject) {
            //console.log(event);
            uiObject.isMouseDown = false;
        }

        function PickerMouseExit(event, uiObject) {
            //console.log(event);
            //uiObject.isMouseDown = false;
        }

        ColorPicker.name = "Color Picker";
        ColorPicker.onColorUpdated = onColorPickerColorUpdated;
        ColorPicker.HueRing.onMouseMove = PickerMouseMove;
        ColorPicker.HueRing.onMouseDown = PickerMouseDown;
        ColorPicker.HueRing.onMouseUp = PickerMouseUp;
        ColorPicker.HueRing.onMouseExit = PickerMouseExit;

        ColorPicker.onMouseMove = PickerMouseMove;
        ColorPicker.onMouseDown = PickerMouseDown;
        ColorPicker.onMouseUp = PickerMouseUp;
        ColorPicker.onMouseExit = PickerMouseExit;

        ColorPicker.SetColor(new THREE.Color(1,0,1).getHSL());

    }

    //Brush Tabs
    {
        function SetTabIndex(event, uiObject)
        {
            uiObject.onSwitchTabs();
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1;
        }
        function SelectTab(event, uiObject)
        {
            uiObject.mesh.scale.x = uiObject.mesh.scale.y = 1.05;
        }

        function onInactiveTab(uiObject)
        {
            uiObject.material.color.setRGB(0.4, 0.4, 0.4);
        }
        function onActiveTab(uiObject)
        {
            uiObject.material.color.setRGB(1, 1, 1);
        }


        var tabButton1 = new UIObjectManager.Tab('textures/UI/GradientTab.png', new THREE.Vector2(138, 95), new THREE.Vector2(25, 10), 0, 1, 1);
        tabButton1.onMouseUp = SetTabIndex;
        tabButton1.onMouseDown = SelectTab;
        tabButton1.material.color.setRGB(1, 1, 1);
        tabButton1.name = "Gradient Brushes";
        tabButton1.tag = 1;
        tabButton1.onInactiveTab = onInactiveTab;
        tabButton1.onActiveTab = onActiveTab;
        //tabButton1.UIObjectsList = UIObjectManager.UIObjectsList;
        tabButton1.Transform.parent =  leftPanel.Transform;

        var tabButton2 = new UIObjectManager.Tab('textures/UI/SolidTab.png', new THREE.Vector2(165, 95), new THREE.Vector2(25, 10), 0, 1, 2);
        tabButton2.onMouseUp = SetTabIndex;
        tabButton2.onMouseDown = SelectTab;
        tabButton2.material.color.setRGB(0.4, 0.4, 0.4);
        tabButton2.name = "Solid Brushes";
        tabButton2.tag = 1;
        tabButton2.onInactiveTab = onInactiveTab;
        tabButton2.onActiveTab = onActiveTab;
        tabButton2.Transform.parent =  leftPanel.Transform;

        var tabButton3 = new UIObjectManager.Tab('textures/UI/FXTab.png', new THREE.Vector2(192, 95), new THREE.Vector2(25, 10), 0, 1, 3);
        tabButton3.onMouseUp = SetTabIndex;
        tabButton3.onMouseDown = SelectTab;
        tabButton3.material.color.setRGB(0.4, 0.4, 0.4);
        tabButton3.name = "FX Brushes";
        tabButton3.tag = 1;
        tabButton3.onInactiveTab = onInactiveTab;
        tabButton3.onActiveTab = onActiveTab;
        tabButton3.Transform.parent =  leftPanel.Transform;


        var tabButton4 = new UIObjectManager.Tab('textures/UI/BackgroundTab.png', new THREE.Vector2(219, 95), new THREE.Vector2(25, 10), 0, 1, 4);
        tabButton4.onMouseUp = SetTabIndex;
        tabButton4.onMouseDown = SelectTab;
        tabButton4.material.color.setRGB(0.4, 0.4, 0.4);
        tabButton4.name = "Background Brushes";
        tabButton4.tag = 1;
        tabButton4.onInactiveTab = onInactiveTab;
        tabButton4.onActiveTab = onActiveTab;
        tabButton4.Transform.parent =  leftPanel.Transform;

        tabButton1.onSwitchTabs();

        var Line1 = new UIObjectManager.DrawLine(new THREE.Vector3(280, 89,0 ), new THREE.Vector3(120, 89,0), new THREE.Color(0.8,0.8,0.8), new THREE.Color(0.8,0.8,0.8));
        //tabButton2.UIObjectsList = UIObjectManager.UIObjectsList;

    }

    var myText = new UIObjectManager.Text(new THREE.Vector3(86, -88, 2 ), new THREE.Color(1,0,0), "Welcome", "right");
    {
        function UpdateTimeText(event, uiObject)
        {
            var sequenceCurrentTime = Math.floor(SequenceManager.GetSequenceTime() / FPS);

            if(sequenceCurrentTime != uiObject.currentime) {
                uiObject.Text = (sequenceCurrentTime + 1) + " Seconds";
                uiObject.currentime = sequenceCurrentTime;
            }
        }

        myText.Text = "Carla is a Cutie";
        myText.TextAlignment = "right";
        myText.onUIUpdate = UpdateTimeText;
    }

    //Debug UI
    {
        //Clear Dome
        var clearDome = new UIObjectManager.Button('textures/UI/clear.png', new THREE.Vector2(115, -100), new THREE.Vector2(20, 8));
        clearDome.onMouseUp = ClearDome;
        clearDome.onMouseDown = ButtonDownClick;
        clearDome.onMouseEnter = ButtonDownClick;
        clearDome.onMouseExit = ResetUI;
        clearDome.material.color.setRGB(1, 1, 1);
        clearDome.tag = 0;
        clearDome.name = "ClearDome";

        //Submit Sequence
        var submitSequence = new UIObjectManager.Button('textures/UI/Submit.png', new THREE.Vector2(230, -100), new THREE.Vector2(20, 8));
        submitSequence.onMouseUp = SubmitSequence;
        submitSequence.onMouseDown = ButtonDownClick;
        submitSequence.onMouseEnter = ButtonDownClick;
        submitSequence.onMouseExit = ResetUI;
        submitSequence.material.color.setRGB(1, 1, 1);
        submitSequence.tag = 0;
        submitSequence.name = "SubmitSequence";
    }
}






