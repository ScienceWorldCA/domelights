function render() {

    //TODO Need to lock the update the defined FPS

    if (isMouseDown) {
        checkDomeInteraction();
    }

    // Update Dome rotation
    if(FixedSpeedActive == true)
       DomeGroup.rotation.y += targetRotation;
    else
        DomeGroup.rotation.y += ( targetRotation - DomeGroup.rotation.y ) * 0.02;


    //Process Events and render them to the light array
    SequenceManager.Update();
    SequenceManager.RenderFrame(SequenceManager.SequenceTime, false);

    //Render the WebGL view
    renderer.clear();
    composer.render();

}

function animate(){

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
                    Brushes[ActiveBrushID].PostPaint(i);

                    //Only take an intersection per frame
                    break;
                }
            }
        }
    }
}