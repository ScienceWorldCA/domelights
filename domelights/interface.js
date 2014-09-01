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

        var SpinR = new UIObjectManager.CreateButton('textures/UI/SpinR.png', new THREE.Vector2(50, -60), new THREE.Vector2(19, 19));
        SpinR.onMouseDown = ButtonDownClick;
        SpinR.onMouseUp = AutoSpinR;
        SpinR.material.color.setRGB(1, 1, 1);
        SpinR.index = 1;

        var SpinL = new UIObjectManager.CreateButton('textures/UI/SpinL.png', new THREE.Vector2(-50, -60), new THREE.Vector2(19, 19));
        SpinL.onMouseUp = AutoSpinL;
        SpinL.onMouseDown = ButtonDownClick;
        SpinL.material.color.setRGB(1, 1, 1);
        SpinL.index = 1;

    }


    // Add Solid Color Brushes
    {
        var button1 = new UIObjectManager.CreateButton('textures/sprites/circle.png', new THREE.Vector2(180, 0), new THREE.Vector2(30, 30));
        button1.onMouseDown = ButtonDownClick;
        button1.onMouseUp = SetBrush;
        button1.material.color.setRGB(0, 1, 0);
        button1.index = 1;

        var button2 = new UIObjectManager.CreateButton('textures/sprites/circle.png', new THREE.Vector2(180, 30), new THREE.Vector2(30, 30));
        button2.onMouseUp = SetBrush;
        button2.onMouseDown = ButtonDownClick;
        button2.material.color.setRGB(1, 0, 0);
        button2.index = 1;

        var button3 = new UIObjectManager.CreateButton('textures/sprites/circle.png', new THREE.Vector2(180, 60), new THREE.Vector2(30, 30));
        button3.onMouseUp = SetBrush;
        button3.onMouseDown = ButtonDownClick;
        button3.material.color.setRGB(0, 0, 1);
        button3.index = 1;

        // Add Background Solid Brushes
        var button4 = new UIObjectManager.CreateButton('textures/UI/Gradient.png', new THREE.Vector2(-180, 60), new THREE.Vector2(20, 20));
        button4.onMouseDown = ButtonDownClick;
        button4.onMouseUp = SetBackground;
        button4.material.color.setRGB(1, 1, 1);
        button4.index = 2;

        var button5 = new UIObjectManager.CreateButton('textures/UI/SunnyDay.png', new THREE.Vector2(-180, 30), new THREE.Vector2(20, 20));
        button5.onMouseDown = ButtonDownClick;
        button5.onMouseUp = SetBackground;
        button5.material.color.setRGB(1, 1, 1);
        button5.index = 2;
    }

    //Debug UI
    {
        //Clear Dome
        var clearDome = new UIObjectManager.CreateButton('textures/UI/clear.png', new THREE.Vector2(180, -50), new THREE.Vector2(20, 8));
        clearDome.onMouseUp = ClearDome;
        clearDome.onMouseDown = ButtonDownClick;
        clearDome.material.color.setRGB(1, 1, 1);
        clearDome.index = 0;

        var submitSequence = new UIObjectManager.CreateButton('textures/UI/Submit.png', new THREE.Vector2(180, -70), new THREE.Vector2(20, 8));
        submitSequence.onMouseUp = SubmitSequence;
        submitSequence.onMouseDown = ButtonDownClick;
        submitSequence.material.color.setRGB(1, 1, 1);
        submitSequence.index = 0;
    }
}


//Brush Functions
{
    function SetBrush(event, uiIndex)
    {
        UIObjectManager.Objects[uiIndex].mesh.scale.x = UIObjectManager.Objects[uiIndex].mesh.scale.y = 1;

        ActiveBrushID = UIObjectManager.Objects[uiIndex].index;
        ActiveBrushData[0] = UIObjectManager.Objects[uiIndex].material.color;
    }

    function ButtonDownClick(event, index)
    {
        UIObjectManager.Objects[index].mesh.scale.x = UIObjectManager.Objects[index].mesh.scale.y = 1.2;
    }

    function SetBackground(event, uiIndex)
    {
        UIObjectManager.Objects[uiIndex].mesh.scale.x = UIObjectManager.Objects[uiIndex].mesh.scale.y = 1;

        var newEvent = new EVENT(0, 0, Brushes[UIObjectManager.Objects[uiIndex].index]);
        newEvent.IsBackground = true;
        SequenceManager.AddEvent(newEvent);
    }

    function AutoSpinR(event, uiIndex)
    {
        UIObjectManager.Objects[uiIndex].mesh.scale.x = UIObjectManager.Objects[uiIndex].mesh.scale.y = 1;
        FixedSpeedActive = true;
        targetRotation = 0.05;
    }

    function AutoSpinL(event, uiIndex)
    {
        UIObjectManager.Objects[uiIndex].mesh.scale.x = UIObjectManager.Objects[uiIndex].mesh.scale.y = 1;
        FixedSpeedActive = true;
        targetRotation = -0.05;
    }
}



//Debug Functions
function ClearDome(event, uiIndex)
{
    UIObjectManager.Objects[uiIndex].mesh.scale.x = UIObjectManager.Objects[uiIndex].mesh.scale.y = 1;
    ClearLights();
    SequenceManager.Events = [];
}

function SubmitSequence(event, uiIndex)
{
    UIObjectManager.Objects[uiIndex].mesh.scale.x = UIObjectManager.Objects[uiIndex].mesh.scale.y = 1;
    EnableDomeEventHandles(false);
    DisplaySubmit();
}





