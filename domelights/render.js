function render() {

    //TODO Need to lock the update the defined FPS

    if (isMouseDown) {
        checkDomeInteraction();
    }

    updateDomePosition();

    //Process Events and render them to the light array
    SequenceManager.Update();
    SequenceManager.RenderFrame(SequenceManager.SequenceTime, false);

    UIObjectManager.UpdateUI();

    //Render the WebGL view
    renderer.clear();
    composer.render();

}

function animate(){


        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        requestAnimationFrame(animate);
        //render.js
        render();

        stats.update();
}

function checkDomeInteraction() {

    //console.log('mouse.x ' + mouse.x + ' mouse.y' + mouse.y);
    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    projector.unprojectVector( vector, camera );
    raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize());

    //iterate through all dome light collision sphere to test for collision
    for (var i = 0; i < 260; i++) {
        var intersects = raycaster.intersectObject( DomeLightManager.LightMeshes[i]);
        if ( intersects.length > 0 ) {

            //Check to see if collision in on the front side of the dome.
            if(intersects[0].point.z > 0) {

                //Check to see if Paint is allowed
                if(Brushes[ActiveBrushID].PrePaint(i) == true) {

                    //create new event at the light index at the current sequence time with the current brush data.
                    var newEvent = new EVENT(SequenceManager.SequenceTime, i, Brushes[ActiveBrushID], ActiveBrushData);
                    SequenceManager.AddEvent(newEvent);

                    //Complete Post brush
                    newEvent.PostPaint(newEvent);

                    //Only take an intersection per frame
                    break;
                }
            }
        }
    }
}

function updateDomePosition()
{
    // Update Dome rotation
    if(FixedSpeedActive == false)
    {
        targetRotation -= targetRotation * 0.05;

        if( targetRotation > -0.0001 && targetRotation < 0.001)
            targetRotation = 0;

        if(targetRotation > 6)
            targetRotation = 6;

        if(targetRotation < -6)
            targetRotation = -6;
    }

    DomeGroup.rotation.y += targetRotation;
    DomeGroup.rotation.y = ((DomeGroup.rotation.y + (Math.PI * 2))% (Math.PI * 2));
}