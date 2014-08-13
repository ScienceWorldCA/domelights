/**
 * Created by Robert Butterworth on 8/2/2014.
 */
//Create UI
function buildInterface(){



    //Create Swiper UI

    //videoFile = document.getElementById( 'videoBrush_01' );

    var map1 = THREE.ImageUtils.loadTexture( 'textures/UI/spin_bar.png' );
    //videoTexture = new THREE.Texture( videoFile );

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

    var button1 = new UIObjectManager.CreateButton('textures/sprites/circle.png', new THREE.Vector2(180,0), new THREE.Vector2(30,30) );
    button1.onMouseDown = SelectBrush;
    button1.onMouseUp = SetBrush;
    button1.material.color.setRGB(0,1,0);

    var button2 = new UIObjectManager.CreateButton('textures/sprites/circle.png', new THREE.Vector2(180,30), new THREE.Vector2(30,30) );
    button2.onMouseUp = SetBrush;
    button2.onMouseDown = SelectBrush;
    button2.material.color.setRGB(1,0,0);

    var button3 = new UIObjectManager.CreateButton('textures/sprites/circle.png', new THREE.Vector2(180,60), new THREE.Vector2(30,30) );
    button3.onMouseUp = SetBrush;
    button3.onMouseDown = SelectBrush;
    button3.material.color.setRGB(0,0,1);

}

function SetBrush(event, index)
{
    brushColor = UIObjectManager.Objects[index].material.color;
    UIObjectManager.Objects[index].mesh.scale.x = UIObjectManager.Objects[index].mesh.scale.y = 1;
}

function SelectBrush(event, index)
{
    UIObjectManager.Objects[index].mesh.scale.x = UIObjectManager.Objects[index].mesh.scale.y = 1.2;
}
