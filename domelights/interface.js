/**
 * Created by Robert Butterworth on 8/2/2014.
 */
//Create UI
function buildInterface(){



    //Create Swiper UI
    var map1 = THREE.ImageUtils.loadTexture( 'textures/UI/spin_bar.png' );
    var swipeMaterial = new THREE.MeshBasicMaterial({
        color:0xffffff, shading: THREE.FlatShading,
        map: map1
    });

    swipeMesh = new THREE.Mesh( new THREE.PlaneGeometry( 80, 15, 0, 0 ), swipeMaterial );
    swipeMesh.position.set( 0, -30, 0 );
    scene.add( swipeMesh );


    //var swipeBar = new UI.Button('textures/sprites/snowflake1.png', new THREE.Vector2(50,0), new THREE.Vector2(80,15) );
    //swipeBar.onMouseUp = SetBrush;


    // Add Solid Color Brushes

    var button1 = new UIObjectHandler.CreateButton('textures/sprites/snowflake1.png', new THREE.Vector2(180,0), new THREE.Vector2(30,30) );
    button1.onMouseUp = SetBrush;
    button1.material.color.setRGB(0,1,0);

    var button2 = new UIObjectHandler.CreateButton('textures/sprites/snowflake1.png', new THREE.Vector2(180,30), new THREE.Vector2(30,30) );
    button2.onMouseUp = SetBrush;
    button2.onMouseOver = SetOver;
    button2.onMouseOut = SetOut;
    button2.material.color.setRGB(1,0,0);

    var button3 = new UIObjectHandler.CreateButton('textures/sprites/snowflake1.png', new THREE.Vector2(180,60), new THREE.Vector2(30,30) );
    button3.onMouseUp = SetBrush;
    button3.material.color.setRGB(0,0,1);

}

function SetBrush(event, index)
{
    brushColor = UIObjectHandler.Objects[index].material.color;
}

function SetOver(event, index)
{
    console.log("SetOver");
    UIObjectHandler.Objects[index].mesh.scale.x = uiObjects[index].mesh.scale.y = 2;
}

function SetOut(event, index)
{
    console.log("SetOut");
    UIObjectHandler.Objects[index].mesh.scale.x = uiObjects[index].mesh.scale.y = 1;
}