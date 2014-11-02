function setLighting()
{
    addLights();
}

function addLights()
{
	// Add Sun Light
    light = new THREE.DirectionalLight( 0x111115 );
	light.position.set( .75, .75, .75 );
    scene.add( light );

    //var ambientLight = new THREE.AmbientLight( 0x181820 );
    var ambientLight = new THREE.AmbientLight( 0x080810 ); // soft white light scene.add( light );
    scene.add(ambientLight);

    BuildLights();
    BuildLightGlows();

    //console.log(attributes.customColor.value[0].g);
}

function setLightColor(newColor, Alpha, index)
{
    var alpha = Alpha || 1.0;

    newColor = new THREE.Color().setRGB(newColor.r, newColor.g, newColor.b) || new THREE.Color(1,1,1);

    if(index < 0 || index > 260){console.log("Light out of range");}

    //Get the Current color
    var currentColor = DomeLightManager.Lights[index].color;

    currentColor.r = currentColor.r * (1 - alpha);
    currentColor.g = currentColor.g * (1 - alpha);
    currentColor.b = currentColor.b * (1 - alpha);

    newColor.r = (newColor.r * alpha) + currentColor.r;
    newColor.g = (newColor.g * alpha) + currentColor.g;
    newColor.b = (newColor.b * alpha) + currentColor.b;

    DomeLightManager.Lights[index].color.setRGB(newColor.r, newColor.g, newColor.b );

    if(GraphicMode == true)
    {
        var lightbulbColorOffset = 0;
        DomeLightManager.LightBulbMeshes[index].material.color.setRGB(newColor.r + lightbulbColorOffset, newColor.g + lightbulbColorOffset, newColor.b + lightbulbColorOffset);

        // Increase the size of the Particle based on it's color brightness
        var myCol = newColor.getHSL();
        attributes.size.value[ index ] = Math.min(200 * (2 * myCol.l), 200);

        attributes.customColor.value[index].r = newColor.r;
        attributes.customColor.value[index].g = newColor.g;
        attributes.customColor.value[index].b = newColor.b;

        attributes.size.needsUpdate = true;
        attributes.customColor.needsUpdate = true;
    }
}

function BuildLights()
{
    //Light Positions
    var lightPositions = [  [8.345, 80.64, 6.063],
                            [8.345, 80.64, -6.063],
                            [27.08, 75.59, 6.133],
                            [27.08, 75.59, -6.133],
                            [16.79, 78.18, -12.2],
                            [14.2, 75.59, -23.86],
                            [43.9, 65.29, 6.175],
                            [43.9, 65.29, -6.175],
                            [35.12, 70.42, -12.31],
                            [33.18, 67.84, -24.11],
                            [22.56, 70.42, -29.6],
                            [19.44, 65.29, -39.84],
                            [57.28, 50.4, 6.063],
                            [57.28, 50.4, -6.063],
                            [50.83, 57.24, -12.24],
                            [49.66, 53.77, -23.9],
                            [40.8, 59.24, -29.64],
                            [38.08, 53.77, -39.84],
                            [27.35, 57.24, -44.56],
                            [23.47, 50.4, -52.6],
                            [-3.188, 80.64, -9.811],
                            [2.536, 75.59, -27.65],
                            [-6.412, 78.18, -19.73],
                            [-18.3, 75.59, -20.88],
                            [7.694, 65.29, -43.66],
                            [-0.8521, 70.42, -37.21],
                            [-12.67, 67.84, -39.01],
                            [-21.18, 70.42, -30.6],
                            [-31.89, 65.29, -30.8],
                            [11.93, 50.4, -56.35],
                            [4.068, 57.24, -52.12],
                            [-7.387, 53.77, -54.62],
                            [-15.58, 59.24, -47.96],
                            [-26.13, 53.77, -48.53],
                            [-33.93, 57.24, -39.78],
                            [-42.78, 50.4, -38.57],
                            [-10.32, 80.64, 0.0],
                            [-25.51, 75.59, -10.96],
                            [-20.75, 78.18, -0.0001],
                            [-25.51, 75.59, 10.96],
                            [-39.15, 65.29, -20.81],
                            [-35.65, 70.42, -10.69],
                            [-41.02, 67.84, -0.0002],
                            [-35.65, 70.42, 10.69],
                            [-39.15, 65.29, 20.81],
                            [-49.9, 50.4, -28.76],
                            [-48.31, 57.24, -19.98],
                            [-54.23, 53.77, -9.853],
                            [-50.43, 59.24, -0.0002],
                            [-54.23, 53.77, 9.852],
                            [-48.31, 57.24, 19.98],
                            [-49.9, 50.4, 28.76],
                            [-3.188, 80.64, 9.811],
                            [-18.3, 75.59, 20.88],
                            [-6.412, 78.18, 19.73],
                            [2.536, 75.59, 27.65],
                            [-31.89, 65.29, 30.8],
                            [-21.18, 70.42, 30.6],
                            [-12.67, 67.84, 39.01],
                            [-0.8523, 70.42, 37.21],
                            [7.693, 65.29, 43.66],
                            [-42.78, 50.4, 38.57],
                            [-33.93, 57.24, 39.78],
                            [-26.13, 53.77, 48.53],
                            [-15.58, 59.24, 47.96],
                            [-7.387, 53.77, 54.62],
                            [4.067, 57.24, 52.12],
                            [11.93, 50.4, 56.35],
                            [14.2, 75.59, 23.86],
                            [16.79, 78.18, 12.2],
                            [19.44, 65.29, 39.84],
                            [22.56, 70.42, 29.6],
                            [33.18, 67.84, 24.11],
                            [35.12, 70.42, 12.31],
                            [23.47, 50.4, 52.6],
                            [27.35, 57.24, 44.56],
                            [38.08, 53.77, 39.85],
                            [40.8, 59.24, 29.64],
                            [49.66, 53.77, 23.9],
                            [50.83, 57.24, 12.24],
                            [62.44, 40.09, 9.811],
                            [65.63, 33.71, 0.0003],
                            [64.64, 23.81, 21.24],
                            [67.9, 17.85, 10.96],
                            [68.09, 23.28, 0.0003],
                            [67.9, 17.85, -10.96],
                            [61.37, 7.007, 31.05],
                            [64.78, 1.055, 20.81],
                            [67.81, 6.478, 10.69],
                            [67.91, 0.5263, 0.0003],
                            [67.81, 6.478, -10.69],
                            [64.78, 1.055, -20.81],
                            [53.09, -8.849, 38.57],
                            [56.28, -15.22, 28.76],
                            [61.69, -10.74, 19.98],
                            [61.22, -17.59, 9.853],
                            [64.42, -11.74, 0.0003],
                            [61.22, -17.59, -9.852],
                            [61.69, -10.74, -19.97],
                            [56.28, -15.22, -28.76],
                            [28.63, 40.09, -56.35],
                            [20.28, 33.71, -62.41],
                            [40.18, 23.81, -54.91],
                            [31.4, 17.85, -61.19],
                            [21.04, 23.28, -64.76],
                            [10.56, 17.85, -67.96],
                            [48.49, 7.007, -48.77],
                            [39.81, 1.055, -55.18],
                            [31.12, 6.478, -61.19],
                            [20.98, 0.5263, -64.58],
                            [10.79, 6.478, -67.79],
                            [0.229, 1.055, -68.04],
                            [53.09, -8.849, -38.57],
                            [44.75, -15.22, -44.64],
                            [38.06, -10.74, -52.49],
                            [28.29, -17.59, -55.18],
                            [19.91, -11.74, -61.27],
                            [9.549, -17.59, -61.27],
                            [0.065, -10.74, -64.84],
                            [-9.964, -15.22, -62.41],
                            [-44.75, 40.09, -44.64],
                            [-53.09, 33.71, -38.57],
                            [-39.81, 23.81, -55.18],
                            [-48.49, 17.85, -48.77],
                            [-55.08, 23.28, -40.02],
                            [-61.37, 17.85, -31.05],
                            [-31.4, 7.007, -61.19],
                            [-40.18, 1.055, -54.91],
                            [-48.58, 6.478, -48.5],
                            [-54.94, 0.5263, -39.91],
                            [-61.14, 6.478, -31.21],
                            [-64.64, 1.055, -21.24],
                            [-20.28, -8.849, -62.41],
                            [-28.62, -15.22, -56.35],
                            [-38.16, -10.74, -52.42],
                            [-43.74, -17.59, -43.96],
                            [-52.12, -11.74, -37.87],
                            [-55.32, -17.59, -28.02],
                            [-61.65, -10.74, -20.1],
                            [-62.44, -15.22, -9.811],
                            [-56.28, 40.09, 28.76],
                            [-53.09, 33.71, 38.57],
                            [-64.78, 23.81, 20.81],
                            [-61.37, 17.85, 31.04],
                            [-55.09, 23.28, 40.02],
                            [-48.49, 17.85, 48.77],
                            [-67.9, 7.007, 10.96],
                            [-64.64, 1.055, 21.24],
                            [-61.14, 6.478, 31.21],
                            [-54.94, 0.5263, 39.91],
                            [-48.58, 6.478, 48.5],
                            [-40.18, 1.055, 54.91],
                            [-65.63, -8.849, -0.0003],
                            [-62.44, -15.22, 9.81],
                            [-61.65, -10.74, 20.1],
                            [-55.32, -17.59, 28.02],
                            [-52.12, -11.74, 37.87],
                            [-43.74, -17.59, 43.96],
                            [-38.16, -10.74, 52.42],
                            [-28.63, -15.22, 56.35],
                            [9.964, 40.09, 62.41],
                            [20.28, 33.71, 62.41],
                            [-0.229, 23.81, 68.04],
                            [10.56, 17.85, 67.96],
                            [21.04, 23.28, 64.76],
                            [31.4, 17.85, 61.19],
                            [-10.56, 7.007, 67.96],
                            [0.2285, 1.055, 68.04],
                            [10.79, 6.478, 67.79],
                            [20.98, 0.5263, 64.58],
                            [31.12, 6.478, 61.19],
                            [39.81, 1.055, 55.18],
                            [-20.28, -8.849, 62.41],
                            [-9.964, -15.22, 62.41],
                            [0.0645, -10.74, 64.84],
                            [9.549, -17.59, 61.27],
                            [19.91, -11.74, 61.27],
                            [28.29, -17.59, 55.18],
                            [38.06, -10.74, 52.49],
                            [44.75, -15.22, 44.64],
                            [55.09, 1.584, -40.02],
                            [61.37, 7.007, -31.04],
                            [48.58, 18.38, -48.5],
                            [54.94, 24.33, -39.91],
                            [61.14, 18.38, -31.21],
                            [64.64, 23.81, -21.24],
                            [38.16, 35.6, -52.42],
                            [43.74, 42.45, -43.96],
                            [52.12, 36.6, -37.87],
                            [55.32, 42.45, -28.02],
                            [61.65, 35.6, -20.1],
                            [62.44, 40.09, -9.81],
                            [-21.04, 1.584, -64.76],
                            [-10.56, 7.007, -67.96],
                            [-31.12, 18.38, -61.19],
                            [-20.98, 24.33, -64.58],
                            [-10.79, 18.38, -67.79],
                            [-0.2285, 23.81, -68.04],
                            [-38.06, 35.6, -52.49],
                            [-28.29, 42.45, -55.18],
                            [-19.91, 36.6, -61.27],
                            [-9.549, 42.45, -61.27],
                            [-0.0645, 35.6, -64.84],
                            [9.964, 40.09, -62.41],
                            [-68.09, 1.584, -0.0003],
                            [-67.9, 7.007, -10.96],
                            [-67.81, 18.38, 10.69],
                            [-67.91, 24.33, -0.0003],
                            [-67.81, 18.38, -10.69],
                            [-64.78, 23.81, -20.81],
                            [-61.69, 35.6, 19.97],
                            [-61.22, 42.45, 9.852],
                            [-64.42, 36.6, -0.0003],
                            [-61.22, 42.45, -9.853],
                            [-61.69, 35.6, -19.98],
                            [-56.28, 40.09, -28.76],
                            [-21.04, 1.584, 64.76],
                            [-31.4, 7.007, 61.19],
                            [-10.79, 18.38, 67.79],
                            [-20.98, 24.33, 64.58],
                            [-31.12, 18.38, 61.19],
                            [-39.81, 23.81, 55.18],
                            [-0.065, 35.6, 64.84],
                            [-9.549, 42.45, 61.27],
                            [-19.91, 36.6, 61.27],
                            [-28.29, 42.45, 55.18],
                            [-38.06, 35.6, 52.49],
                            [-44.75, 40.09, 44.64],
                            [55.08, 1.584, 40.02],
                            [48.49, 7.007, 48.77],
                            [61.14, 18.38, 31.21],
                            [54.94, 24.33, 39.91],
                            [48.58, 18.38, 48.5],
                            [40.18, 23.81, 54.91],
                            [61.65, 35.6, 20.1],
                            [55.32, 42.45, 28.02],
                            [52.12, 36.6, 37.87],
                            [43.74, 42.45, 43.96],
                            [38.16, 35.6, 52.42],
                            [28.62, 40.09, 56.35],
                            [52.78, -25.95, 27.36],
                            [57.13, -25.96, 9.358],
                            [57.13, -25.96, -9.358],
                            [52.78, -25.95, -27.36],
                            [42.32, -25.95, -41.76],
                            [26.54, -25.96, -51.46],
                            [8.739, -25.96, -57.25],
                            [-9.728, -25.95, -58.67],
                            [-26.66, -25.95, -53.17],
                            [-40.76, -25.96, -41.16],
                            [-51.76, -25.96, -26.02],
                            [-58.82, -25.95, -8.9],
                            [-58.82, -25.95, 8.9],
                            [-51.76, -25.96, 26.02],
                            [-40.76, -25.96, 41.16],
                            [-26.66, -25.95, 53.17],
                            [-9.729, -25.95, 58.67],
                            [8.738, -25.96, 57.25],
                            [26.54, -25.96, 51.46],
                            [42.32, -25.95, 41.76]];

    for(var i in lightPositions)
    {
        var color = new THREE.Color(0,0,0);
        var vector = new THREE.Vector3(lightPositions[i][0], lightPositions[i][1], lightPositions[i][2]);
        var light = new DomeLightManager.Light(color, vector, new THREE.Vector2(22,23));
    }
}

function BuildLightGlows()
{
    //Add lights for dome.
    var lightPlacementMesh = new THREE.Geometry();
    for ( i = 0; i < DomeLightManager.Lights.length; i ++ ) {
        lightPlacementMesh.vertices.push( DomeLightManager.Lights[i].position );
    }

    LightGlowSprites = new THREE.PointCloud( lightPlacementMesh, shaderMaterial );
    var values_size = attributes.size.value;
    var values_color = attributes.customColor.value;

    var vertices = LightGlowSprites.geometry.vertices;

    for( var v = 0,  vl = LightGlowSprites.geometry.vertices.length; v < vl; v++ ) {

        values_size[ v ] = 40;

        values_color[ v ] = new THREE.Color(0,0,0);

    }

    DomeGroup.add( LightGlowSprites );
}


//HELPER FUNCTIONS
{
    function ClearLights() {
        for (var i = 0; i < DomeLightManager.Lights.length; i++) {
            setLightColor(new THREE.Color(0, 0, 0), 1.0, i);
        }
    }

    function updateFadeAllLights(fadeAmount) {
        var mFadeAmount = 0.03 || fadeAmount;

        for (i = 0; i < 260; i++) {

            var color = new THREE.Color();
            color = DomeLightManager.Lights[i].color;
            //var newColor = new THREE.Color();
            //console.log('Col: ' + color.l);
            if (color.r > 0) {
                color.r -= mFadeAmount;
            }
            if (color.g > 0) {
                color.g -= mFadeAmount;
            }
            if (color.b > 0) {
                color.b -= mFadeAmount;
            }

            setLightColor(color, 1.0, i);
        }
    }

    function HorizontalWipeTime(color, indexRaw, alpha) {
        //Ensure that we are within the bounds of the Matrix (Wrap Index)
        var index = Math.floor(indexRaw % (LightMatrixWidth));

        for (var y = 0; y < LightMatrixHeight; y++) {
            var lightIndex = LightMappingMatrix[y][index];
            if (lightIndex != -1) {
                setLightColor(color, alpha, lightIndex);
            }
        }
    }

    function VerticalWipeTime(color, indexRaw, alpha) {
        //Ensure that we are within the bounds of the Matrix (Wrap Index)
        var index = Math.floor(indexRaw % (LightMatrixHeight));

        for (var x = 0; x < LightMatrixWidth; x++) {
            var lightIndex = LightMappingMatrix[index][x];
            if (lightIndex != -1) {
                setLightColor(color, alpha, lightIndex);
            }
        }
    }

    function SetAllLights(color, alpha)
    {
        for (var i = 0; i < 260; i++)
        {
            setLightColor(color, alpha, i);
        }
    }

    function GetLightInMatrix(lightIndex)
    {
        for (var i=0, len=LightMatrixHeight; i<len; i++) {
            for (var j=0, len2=LightMatrixWidth; j<len2; j++) {
                if (LightMappingMatrix[i][j] === lightIndex)
                {
                   return {x: j, y: i};
                }
            }
        }
        return {x: -1, y: -1};
    }

    function RenderDebugSequence()
    {
        for(x=0; x < 260; x++)
        {
            var newEvent = new EVENT(x*4, DomeLightOrder[x], Brushes[ActiveBrushID], ActiveBrushData);
            SequenceManager.AddEvent(newEvent);
        }
    }

}
