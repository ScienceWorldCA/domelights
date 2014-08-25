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
    }


    // Add Solid Color Brushes
    {
        var button1 = new UIObjectManager.CreateButton('textures/sprites/circle.png', new THREE.Vector2(180, 0), new THREE.Vector2(30, 30));
        button1.onMouseDown = SelectBrush;
        button1.onMouseUp = SetBrush;
        button1.material.color.setRGB(0, 1, 0);
        button1.index = 1;

        var button2 = new UIObjectManager.CreateButton('textures/sprites/circle.png', new THREE.Vector2(180, 30), new THREE.Vector2(30, 30));
        button2.onMouseUp = SetBrush;
        button2.onMouseDown = SelectBrush;
        button2.material.color.setRGB(1, 0, 0);
        button2.index = 1;

        var button3 = new UIObjectManager.CreateButton('textures/sprites/circle.png', new THREE.Vector2(180, 60), new THREE.Vector2(30, 30));
        button3.onMouseUp = SetBrush;
        button3.onMouseDown = SelectBrush;
        button3.material.color.setRGB(0, 0, 1);
        button3.index = 1;

        // Add Background Solid Brushes
        var button4 = new UIObjectManager.CreateButton('textures/ui/Gradient.png', new THREE.Vector2(-180, 60), new THREE.Vector2(20, 20));
        button4.onMouseDown = SelectBrush;
        button4.onMouseUp = SetBackground;
        button4.material.color.setRGB(1, 1, 1);
        button4.index = 2;

        var button5 = new UIObjectManager.CreateButton('textures/ui/sunnyDay.png', new THREE.Vector2(-180, 30), new THREE.Vector2(20, 20));
        button5.onMouseDown = SelectBrush;
        button5.onMouseUp = SetBackground;
        button5.material.color.setRGB(1, 1, 1);
        button5.index = 2;
    }

    //Debug UI
    {
        //Clear Dome
        var clearDome = new UIObjectManager.CreateButton('textures/ui/clear.png', new THREE.Vector2(180, -50), new THREE.Vector2(20, 8));
        clearDome.onMouseUp = ClearDome;
        clearDome.onMouseDown = SelectBrush;
        clearDome.material.color.setRGB(1, 1, 1);
        clearDome.index = 0;
    }
}


//Brush Functions
function SetBrush(event, uiIndex)
{
    UIObjectManager.Objects[uiIndex].mesh.scale.x = UIObjectManager.Objects[uiIndex].mesh.scale.y = 1;

    ActiveBrushID = UIObjectManager.Objects[uiIndex].index;
    ActiveBrushData[0] = UIObjectManager.Objects[uiIndex].material.color;
}

function SelectBrush(event, index)
{
    UIObjectManager.Objects[index].mesh.scale.x = UIObjectManager.Objects[index].mesh.scale.y = 1.2;
}

function SetBackground(event, uiIndex)
{
    UIObjectManager.Objects[uiIndex].mesh.scale.x = UIObjectManager.Objects[uiIndex].mesh.scale.y = 1;

    var newEvent = new EVENT(0, 0, Brushes[UIObjectManager.Objects[uiIndex].index]);
    newEvent.IsBackground = true;
    EventManager.AddEvent(newEvent);
}


//Debug Functions
function ClearDome(event, uiIndex)
{
    UIObjectManager.Objects[uiIndex].mesh.scale.x = UIObjectManager.Objects[uiIndex].mesh.scale.y = 1;
    ClearLights();
    EventManager.Events = [];
}





