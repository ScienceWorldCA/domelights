function render() {

    if (isMouseDown) {
        turnOnLightOnMouseOver();
    }
    /*if (isMouseOverBar() && isMouseDownOverBar) {
     var rotation = DomeGroup.rotation.y
     DomeGroup.rotation.y = rotation;
     targetRotation = rotation;
     }
     else
     {*/
    DomeGroup.rotation.y += ( targetRotation - DomeGroup.rotation.y ) * 0.02;
    //}
    //console.log('render:' + ' targetRotation:' + targetRotation + ' DomeGroup.rotation.y:' + DomeGroup.rotation.y);

    /* Calculate Light Values

        - Iterate through all events
            - sort in order of time

        - Cycle through all frames writing out all light values.
            - Create a dome light single frame buffer
                - Cycle through all events in time order
                    - Increment time on all events
                    - Call each event to render to the buffer


    * Event
        - Start time
        - Origin Light
        - Brush Index

    * Brush
        - Update (Function)
        - Render (Function)
        -----------------------
        - PostPaint (Function)
        - PrePaint (Function)

    */

    EventManager.Update();
    EventManager.RenderFrame();

    updateFadeAllLights();

    renderer.clear();
    composer.render();
    //renderer.render( scene, camera );

}

function animate() {

    requestAnimationFrame( animate );

    //render.js
    render();
    stats.update();

//    if ( videoFile.readyState === videoFile.HAVE_ENOUGH_DATA ) {
//
//        if ( videoTexture ) videoTexture.needsUpdate = true;
//
//    }

}

function turnOnLightOnMouseOver() {

    //console.log('mouse.x ' + mouse.x + ' mouse.y' + mouse.y);
    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    projector.unprojectVector( vector, camera );
    raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize());

    for (i = 0; i < 260; i++) {
        intersects = raycaster.intersectObject( DomeLightManager.LightMeshes[i]);
        if ( intersects.length > 0 ) {
            if(intersects[0].point.z > 0) {
                //setLightColor(brushColor, i);
                var newEvent = new EVENT(EventManager.SequenceTime, i,null,null, Brushes[1]);
                EventManager.AddEvent(newEvent);
            }
        }
    }
}

