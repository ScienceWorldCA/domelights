/**
 * Created by Robert Butterworth on 8/12/2014.
 */

function CreateBrushes() {

    var WipeBrush = new Brush();                // INDEX: 0
    {
        WipeBrush.Index = 0;
        WipeBrush.Duration = 120;
        WipeBrush.PrePaint = function ()
        {
            if(!(ActiveBrushData[0] instanceof THREE.Color))
            {
                ActiveBrushData[0] = new THREE.Color(1,0,0);
            }
            return true;
        };
        WipeBrush.Render = function (frame, originLight, brushData) {
            //WipeBrush.Duration = brushData[1];
            //HorizontalWipeTime(brushData[0], frame);
            var width = brushData[1] || 3;

            for (var x = 0; x < width; x++) {
                HorizontalWipeTime(brushData[0], frame + x);
            }
        };

        var htmlUI = new HTMLUI();
        htmlUI.Name = "Wipe Color";
        htmlUI.AddUI(new htmlUI.Label("Select a Wipe Colour"));
        htmlUI.AddUI(new htmlUI.Colors(0));
        htmlUI.AddUI(new htmlUI.Slider(1, 20, 1, 5, 1));
        WipeBrush.HTMLUI = htmlUI;

        Brushes.push(WipeBrush);
    }

    var ColorBrush = new Brush();               // INDEX: 1
    {
        ColorBrush.Index = 1;
        ColorBrush.Duration = 150;
        ColorBrush.PrePaint = function ()
        {

            if(!(ActiveBrushData[0] instanceof THREE.Color))
            {
                ActiveBrushData[0] = new THREE.Color(1,0,0);
            }

            return true;
        };
        ColorBrush.Render = function (frame, originLight, brushData) {

            var fadeMultiplier = 1 - (1 / this.Duration) * frame;

            var col = new THREE.Color();

            var myCol = brushData[0].getHSL();
            col.setHSL(myCol.h, myCol.s, myCol.l * fadeMultiplier);

            // console.log(frame + " = " + col.r + "," + col.g + "," + col.b);
            setLightColor(col, fadeMultiplier, originLight);
        };

        var htmlUI = new HTMLUI();
        htmlUI.Name = "Finger Paint";
        htmlUI.AddUI(new htmlUI.Label("Brush Colour:"));
        htmlUI.AddUI(new htmlUI.Colors(0));
        // htmlUI.AddUI(new htmlUI.Label("Example Button:"));
        // htmlUI.AddUI(new htmlUI.OptionBox(1, 0, [
            // { "name": "Test", "value": "1"}
        // ]));
        ColorBrush.HTMLUI = htmlUI;

        Brushes.push(ColorBrush);
    }

    var GradientBackgroundBrush = new Brush(); // INDEX: 2
    {
        GradientBackgroundBrush.Index = 2;
        GradientBackgroundBrush.Duration = SequenceManager.SequenceLength;
        GradientBackgroundBrush.IsBackground = true;
        GradientBackgroundBrush.PrePaint = function () 
        {
            ActiveBrushData[0] = 0;
            return true;
        };
        GradientBackgroundBrush.PostPaint = function (event) {
            event.StartTime = 0;
        };
        GradientBackgroundBrush.Render = function (frame, originLight, brushData) {
            var col = new THREE.Color();

            var step = 1 / LightMatrixWidth;

            // frame = frame*0.25;
            for (var y = 0; y < LightMatrixWidth; y++) {
                col.setHSL(y * step, 1, 0.2);
                HorizontalWipeTime(col, (frame * brushData[0]) + y);
            }

        };
        var htmlUI = new HTMLUI();
        htmlUI.Name = "Rainbow";
        GradientBackgroundBrush.HTMLUI = htmlUI;
        htmlUI.AddUI(new htmlUI.Checkbox("Animated", false, 0));
        Brushes.push(GradientBackgroundBrush);
    }

    var VerticalRainbowWipeBrush = new Brush(); // INDEX: 3
    {
        VerticalRainbowWipeBrush.Index = 3;
        VerticalRainbowWipeBrush.Duration = (LightMatrixHeight * 3);
        VerticalRainbowWipeBrush.Render = function (frame, originLight, brushData) {
            VerticalWipeTime(new THREE.Color(1, 0, 0), frame);
            if (frame < this.Duration - 2) {
                VerticalWipeTime(new THREE.Color(0, 1, 0), frame + 1);
                VerticalWipeTime(new THREE.Color(0, 0, 1), frame + 2);
            }
        };
        var htmlUI = new HTMLUI();
        htmlUI.Name = "RGB Wipe";
        htmlUI.AddUI(new htmlUI.Label("No options available."));
        VerticalRainbowWipeBrush.HTMLUI = htmlUI;
        Brushes.push(VerticalRainbowWipeBrush);
    }


    var DomeFlashBrush = new Brush();           // INDEX: 4
    {
        DomeFlashBrush.Index = 4;
        DomeFlashBrush.Duration = 150;
        DomeFlashBrush.PrePaint = function () 
        {
            if(!(ActiveBrushData[0] instanceof THREE.Color))
            {
                ActiveBrushData[0] = new THREE.Color(1,0,0);
            }
            return true;
        };
        DomeFlashBrush.Render = function (frame, originLight, brushData) {

            var pulseColour = brushData[0];
            var fadeMultiplier = 1 - (1 / this.Duration) * frame;
            var myColour = pulseColour.getHSL();

            var col = new THREE.Color();
            col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);

            SetAllLights(col, fadeMultiplier);

        };
        var htmlUI = new HTMLUI();
        htmlUI.Name = "Flash Dome";
        htmlUI.AddUI(new htmlUI.Label("Colour:"));
        htmlUI.AddUI(new htmlUI.Colors(0));
        DomeFlashBrush.HTMLUI = htmlUI;
        Brushes.push(DomeFlashBrush);
    }

    var HorizontalRingBrush = new Brush();      // INDEX: 5
    {
        HorizontalRingBrush.Index = 5;
        HorizontalRingBrush.Duration = 90;
        HorizontalRingBrush.PrePaint = function () 
        {
            if(!(ActiveBrushData[0] instanceof THREE.Color))
            {
                ActiveBrushData[0] = new THREE.Color(1,0,0);
            }
            return true;
        };
        HorizontalRingBrush.Render = function (frame, originLight, brushData) {

            // TODO: Add nice fade in and fade out + do alpha blend
            // var pulseColour = new THREE.Color(0,1,0);
            var pulseColour = brushData[0];
            var fadeMultiplier = 1 - (1 / this.Duration) * frame;
            var myColour = pulseColour.getHSL();

            var col = new THREE.Color();
            col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);

            var row = GetLightInMatrix(originLight).y;

            VerticalWipeTime(col, row, fadeMultiplier);

        };
        var htmlUI = new HTMLUI();
        htmlUI.Name = "Horizontal Rings";
        htmlUI.AddUI(new htmlUI.Label("Foreground Colour:"));
        htmlUI.AddUI(new htmlUI.Colors(0));
        HorizontalRingBrush.HTMLUI = htmlUI;
        Brushes.push(HorizontalRingBrush);
    }

    var VerticalRingBrush = new Brush();        // INDEX: 6
    {
        VerticalRingBrush.Index = 6;
        VerticalRingBrush.Duration = 90;
        VerticalRingBrush.PrePaint = function ()
        {
            if(!(ActiveBrushData[0] instanceof THREE.Color))
            {
                ActiveBrushData[0] = new THREE.Color(1,0,0);
            }
            return true;
        };
        VerticalRingBrush.Render = function (frame, originLight, brushData) {

            // TODO: Add nice fade in and fade out + do alpha blend
            // var pulseColour = new THREE.Color(0,1,0);
            var pulseColour = brushData[0];
            var fadeMultiplier = 1 - (1 / this.Duration) * frame;
            var myColour = pulseColour.getHSL();

            var col = new THREE.Color();
            col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);

            var column = GetLightInMatrix(originLight).x;

            HorizontalWipeTime(col, column, fadeMultiplier);

        };
        var htmlUI = new HTMLUI();
        htmlUI.Name = "Vertical Rings";
        htmlUI.AddUI(new htmlUI.Label("Foreground Colour:"));
        htmlUI.AddUI(new htmlUI.Colors(0));
        VerticalRingBrush.HTMLUI = htmlUI;
        Brushes.push(VerticalRingBrush);
    }

    var LaunchBrush = new Brush();              // INDEX: 7
    {
        // Base section to the Firework Brush
        LaunchBrush.Index = 7;
        LaunchBrush.Duration = 90;
        LaunchBrush.Render = function (frame, originLight, brushData) {

            // TODO: Add nice fade in and fade out + do alpha blend
            var pulseColour = new THREE.Color(0.5, 0.5, 0.5);
            var fadeMultiplier = ((1 / this.Duration) * frame) + 0.5;
            var myColour = pulseColour.getHSL();
            var rippleDistance = brushData[2];

            var col = new THREE.Color();
            // col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);

            var originPosition = GetLightInMatrix(originLight);
            // console.log(originLight + " : " + originPosition.x + " - " +
            // originPosition.y);

            var offset = Math.floor(((1 / this.Duration) * frame) * rippleDistance);

            // var lightIndex = LightMappingMatrix[(originPosition.y - offset)%
            // LightMatrixHeight][originPosition.x-1];
            // col.setHSL(myColour.h, myColour.s, myColour.l *
            // (0.75*fadeMultiplier));
            // if(lightIndex != -1 ){setLightColor(col, lightIndex);}

            var lightIndex = LightMappingMatrix[(originPosition.y - offset)][originPosition.x];

            col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);
            if (lightIndex != -1) {
                setLightColor(col, fadeMultiplier, lightIndex);
            }

            // lightIndex = LightMappingMatrix[(originPosition.y - offset)%
            // LightMatrixHeight][originPosition.x+1];
            // col.setHSL(myColour.h, myColour.s, myColour.l *
            // (0.75*fadeMultiplier));
            // if(lightIndex != -1 ){setLightColor(col, lightIndex);}

            // HorizontalWipeTime(col, column);

        };
        Brushes.push(LaunchBrush);
    }

    var FireWorkBurstBrush = new Brush();       // INDEX: 8
    {
        FireWorkBurstBrush.Index = 8;
        FireWorkBurstBrush.Duration = 30;
        FireWorkBurstBrush.PrePaint = function () 
        {
            if(!(ActiveBrushData[0] instanceof THREE.Color))
            {
                ActiveBrushData[0] = new THREE.Color(1,0,0);
            }
            ActiveBrushData[1] = 5;
            return true;
        };
        FireWorkBurstBrush.Render = function (frame, originLight, brushData) {

            // TODO: Add nice fade in and fade out + do alpha blend
            var pulseColour = new THREE.Color(1, 0, 0);
            var fadeMultiplier = 1 - (1 / this.Duration) * frame;
            var myColour = brushData[0].getHSL();
            var rippleDistance = brushData[1];

            var col = new THREE.Color();
            col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);

            var originPosition = GetLightInMatrix(originLight);

            var offset = Math.floor(((1 / this.Duration) * frame) * rippleDistance);

            var step = 2 * Math.PI / 30; // see note 1
            var r = offset;

            for (var trail = 1; trail < rippleDistance; trail++) {
                r = r - trail;
                if (r < 0) {
                    r = 0;
                }

                // fadeMultiplier = fadeMultiplier / (trail+1);

                for (var theta = 0; theta < 2 * Math.PI; theta += step) {
                    var x = r * Math.cos(theta);
                    var y = r * Math.sin(theta); // note 2.
                    // ctx.lineTo(x,y);
                    // console.log("X: " + Math.floor(x) + " Y: " +
                    // Math.floor(y));
                    var xLight = Math.floor(originPosition.y - x) % LightMatrixHeight;
                    if (xLight < 0) {
                        continue;
                    }

                    var yLight = Math.floor(originPosition.x - y) % LightMatrixWidth;
                    if (yLight < 0) {
                        continue;
                    }

                    // console.log("X: " + Math.floor(originPosition.y - x)%
                    // LightMatrixHeight + "Y: " + Math.floor(originPosition.x +
                    // y) % LightMatrixWidth);

                    var lightIndex = LightMappingMatrix[xLight][yLight];

                    col.setHSL(myColour.h, myColour.s, (myColour.l * fadeMultiplier) * (Math.random() * 0.5 + 0.5));
                    if (lightIndex != -1) {
                        setLightColor(col, fadeMultiplier, lightIndex);
                    }
                }
            }
            // HorizontalWipeTime(col, column);

        };
        Brushes.push(FireWorkBurstBrush);
    }

    var FireWorkBrush = new Brush();            // INDEX: 9
    {
        FireWorkBrush.Index = 9;
        FireWorkBrush.Duration = 0;
        FireWorkBrush.PrePaint = function (LightIndex) {
            // Create a Burst at this light
            var newEvent = new EVENT(SequenceManager.SequenceTime, LightIndex, Brushes[8], ActiveBrushData);
            SequenceManager.AddEvent(newEvent);

            newEvent.PrePaint(newEvent);

            var originPosition = GetLightInMatrix(LightIndex);

            // console.log(LightMatrixHeight + " : " + originPosition.x);

            var launchIndex = LightMappingMatrix[LightMatrixHeight - 1][originPosition.x];
            if (launchIndex == -1) {
                launchIndex = LightMappingMatrix[LightMatrixHeight - 1][originPosition.x + 1];
            }

            // console.log("INDEX: " + launchIndex);

            ActiveBrushData[2] = (LightMatrixHeight - 1) - originPosition.y;

            newEvent = new EVENT(SequenceManager.SequenceTime - 30, launchIndex, Brushes[7], ActiveBrushData);
            SequenceManager.AddEvent(newEvent);

            return false;
        };

        var htmlUI = new HTMLUI();
        htmlUI.Name = "Fireworks";
        htmlUI.AddUI(new htmlUI.Label("Fireworks Colour:"));
        htmlUI.AddUI(new htmlUI.Colors(0));
        htmlUI.AddUI(new htmlUI.Label("Select explosion size:"));
        htmlUI.AddUI(new htmlUI.Slider(1, 10, 1, 5, 1));
        FireWorkBrush.HTMLUI = htmlUI;

        Brushes.push(FireWorkBrush);
    }

    /* ------  Full Duration Brushes  ------------------------------ */

    var SequenceTwoColorCycle = new Brush();    // INDEX: 10
    {
        SequenceTwoColorCycle.Index = 10;
        SequenceTwoColorCycle.Duration = SequenceManager.SequenceLength;
        SequenceTwoColorCycle.IsBackground = true;
        SequenceTwoColorCycle.PrePaint = function () 
        {
           if(!(ActiveBrushData[0] instanceof THREE.Color))
            {
                ActiveBrushData[0] = new THREE.Color(1,0,0);
            }
           if(!(ActiveBrushData[1] instanceof THREE.Color))
            {
                ActiveBrushData[1] = new THREE.Color(0,0,1);
            }
           return true;
        };
        SequenceTwoColorCycle.PostPaint = function (event) {
            event.StartTime = 0;
        };
        SequenceTwoColorCycle.Render = function (frame, originLight, brushData) {
            var col = new THREE.Color();

            var fadeMultiplier = (1 / this.Duration) * frame;

            if(fadeMultiplier < 0.5) {
                SetAllLights(RGBBlendColors(brushData[0], brushData[1], fadeMultiplier*2), 1);
            }
            else {
                SetAllLights(RGBBlendColors(brushData[0], brushData[1], (1 - fadeMultiplier)*2, 1));
            }

        };
        var htmlUI = new HTMLUI();
        htmlUI.Name = "Two Colour";
        htmlUI.AddUI(new htmlUI.Label("Colour 1:"));
        htmlUI.AddUI(new htmlUI.Colors(0));
        htmlUI.AddUI(new htmlUI.Label("Colour 2:"));
        htmlUI.AddUI(new htmlUI.Colors(1));
        SequenceTwoColorCycle.HTMLUI = htmlUI;
        Brushes.push(SequenceTwoColorCycle);
    }

    var SolidColorBrush = new Brush();          // INDEX: 11
    {
        SolidColorBrush.Index = 11;
        SolidColorBrush.Duration = SequenceManager.SequenceLength;
        SolidColorBrush.IsBackground = true;
        SolidColorBrush.PrePaint = function ()
        {
            if(!(ActiveBrushData[0] instanceof THREE.Color))
            {
                ActiveBrushData[0] = new THREE.Color(1,0,0);
            }
            return true;
        };
        SolidColorBrush.PostPaint = function (event) {
            event.StartTime = 0;
        };
        SolidColorBrush.Render = function (frame, originLight, brushData)
        {
            SetAllLights(brushData[0], 1);
        };

        var htmlUI = new HTMLUI();
        htmlUI.Name = "Solid Color";
        htmlUI.AddUI(new htmlUI.Label("Brush Colour:"));
        htmlUI.AddUI(new htmlUI.Colors(0));

        SolidColorBrush.HTMLUI = htmlUI;

        Brushes.push(SolidColorBrush);
    }

    var FireBackground = new Brush();           // INDEX: 12
    {
        FireBackground.Index = 12;
        FireBackground.Duration = SequenceManager.SequenceLength;
        FireBackground.IsBackground = true;
        
        FireBackground.PrePaint = function ()
        {
            if(!(ActiveBrushData[0] instanceof THREE.Color))
            {
                ActiveBrushData[0] = new THREE.Color(1,0,0);
            }
            if(!(ActiveBrushData[1] instanceof THREE.Color))
            {
                ActiveBrushData[1] = new THREE.Color(0,0,1);
            }
            ActiveBrushData[2] = 6;
            ActiveBrushData[3] = 6;
            return true;
        };
        
        FireBackground.PostPaint = function (event)
        {
            event.StartTime = 0;
            
            for (var j=0, len2=LightMatrixWidth; j<len2; j++)
            {
                var col = new THREE.Color(Math.random(), 0 ,0);
                FireEffectArray[j] = col;
            }
        };
        FireBackground.Render = function (frame, originLight, brushData)
        {

            var floatFrame = frame/brushData[3];
            var updateFrame = Math.floor(floatFrame);

            var blendFrame = Math.round((floatFrame - updateFrame) * 100) / 100;

            var updateFlameSource = false;

            if(updateFrame != FireFrame)
            {
                FireFrame = updateFrame;
                updateFlameSource = true;
            }

            fireValueCalc(updateFlameSource, brushData);

            for (var i=0; i < LightMatrixHeight; i++)
            {
                for (var j=0; j < LightMatrixWidth; j++)
                {
                    var col1 = new THREE.Color(0.0, 0.0 ,1.0);
                    var col2 = new THREE.Color(1.0, 0.0 ,0.0);

                    var lightIndex = LightMappingMatrix[i][j];

                    var v1 = flameArray[15-i][39-j];
                    var v2 = flameArrayNext[15-i][39-j] || v1;

                    var floatValue = LerpFloat(v1, v2, blendFrame);

                    col = RGBBlendColors(brushData[0], brushData[1], floatValue);

                    if(lightIndex != -1)
                    {
                        setLightColor(col, 1.0, lightIndex);
                    }
                }
            }


            return;
        };

        var htmlUI = new HTMLUI();
        htmlUI.Name = "Fire";
        htmlUI.AddUI(new htmlUI.Label("Colour 1:"));
        htmlUI.AddUI(new htmlUI.Colors(0));
        htmlUI.AddUI(new htmlUI.Label("Colour 2:"));
        htmlUI.AddUI(new htmlUI.Colors(1));
        htmlUI.AddUI(new htmlUI.Label("Select size:"));
        htmlUI.AddUI(new htmlUI.Slider(1, 10, 1, 5, 2));
        htmlUI.AddUI(new htmlUI.Label("Select speed:"));
        htmlUI.AddUI(new htmlUI.Slider(1, 20, 0.1, 5, 3));
        FireBackground.HTMLUI = htmlUI;
        Brushes.push(FireBackground);
    }

    var PatternBrush = new Brush();           // INDEX: 13
    {
        PatternBrush.Index = 13;
        PatternBrush.Duration = SequenceManager.SequenceLength;
        PatternBrush.IsBackground = true;

        PatternBrush.PrePaint = function ()
        {
            ActiveBrushData[0] = 0;
            return true;
        };

        PatternBrush.PostPaint = function (event)
        {
            event.StartTime = 0;
        };
        PatternBrush.Render = function (frame, originLight, brushData)
        {
            var progression = frame / (this.Duration);

            var xoffset = Math.floor(LightMatrixWidth * progression ); //LightMatrixWidth * (frame / this.duration));
            var yoffset = Math.floor(LightMatrixHeight * progression );
            //var offset = 1;

            //var index = (j + parseInt(brushData[0])) % 39;
            var xblend = (frame % 30) / 30;
            var yblend = (frame % 30) / 30;

            var imageColors = getPatternData(parseInt(brushData[0]));

            for (var i=0; i < LightMatrixHeight; i++)
            {
                for (var j = 0; j < LightMatrixWidth; j++)
                {
                    var x1 = (j + xoffset + 38) % 39;
                    var x2 = (j + xoffset) % 39;

                    var y1 = i; //(i + xoffset-1) % 15;
                    var y2 = i; //(i + yoffset) % 15;

                    //console.log(j);
                    var colArray1 = imageColors[y1][x1];
                    var colArray2 = imageColors[y2][x2];

                    var col1 = new THREE.Color(colArray1[0], colArray1[1], colArray1[2]);
                    var col2 = new THREE.Color(colArray2[0], colArray2[1], colArray2[2]);


                    var col = RGBBlendColors(col1, col2, xblend);

                    var lightIndex = LightMappingMatrix[i][j];

                    if(lightIndex != -1)
                    {
                        setLightColor(col, 1.0, lightIndex);
                    }
                }
            }

            return;
        };

        var htmlUI = new HTMLUI();
        htmlUI.Name = "Pattern";
        var patternOption = {"Rainbow Twist":0, "Color Gradient":1, "Flame Peaks":2, "Rose":3};
        htmlUI.AddUI(new htmlUI.OptionBox(patternOption, 0, "Pattern", 0));
        //var scrollOption = {"None":0, "Horizontal":1, "Vertical":2};
        //htmlUI.AddUI(new htmlUI.OptionBox(scrollOption, 0, "Scroll", 1));
        PatternBrush.HTMLUI = htmlUI;
        Brushes.push(PatternBrush);
    }

    var VideoPattenBrush = new Brush();           // INDEX: 14
    {
        VideoPattenBrush.Index = 14;
        VideoPattenBrush.Duration = SequenceManager.SequenceLength;
        VideoPattenBrush.IsBackground = true;

        VideoPattenBrush.PrePaint = function ()
        {
            ActiveBrushData[0] = 0;
            return true;
        };

        VideoPattenBrush.PostPaint = function (event)
        {
            event.StartTime = 0;
        };
        VideoPattenBrush.Render = function (frame, originLight, brushData)
        {
            var index = brushData[0];
            
            if(videoPatternsRoot + videoPatterns[index] != videoVideo.src)
            {
                 videoVideo.src = videoPatternsRoot + videoPatterns[index];
            }

            var videoTime = frame / 40;

            var videoCanvas = getVideoPatternData(videoTime);

            for (var i=0; i < LightMatrixHeight; i++)
            {
                for (var j = 0; j < LightMatrixWidth; j++)
                {
                    var colArray = videoCanvas[i][j];

                    var col = new THREE.Color(colArray[0], colArray[1], colArray[2]);

                    var lightIndex = LightMappingMatrix[i][j];

                    if(lightIndex != -1)
                    {
                        setLightColor(col, 1.0, lightIndex);
                    }
                }
            }

            return;
        };

        var htmlUI = new HTMLUI();
        htmlUI.Name = "Video";
        var patternOption = {"Rainbow Rain":0, "Rainbow Wave":1, "UV Meter":2};
        htmlUI.AddUI(new htmlUI.OptionBox(patternOption, 0, "Pattern", 0));
        VideoPattenBrush.HTMLUI = htmlUI;
        Brushes.push(VideoPattenBrush);
    }


    // Helper Brush functions
    function fireValueCalc(updateFlameSource, brushData)
    {
        //Update BaseFire
        if(updateFlameSource)
        {
            if(flameArrayNext[0][0] != undefined)
            {
                flameArray = flameArrayNext.map(function(arr) {
                    return arr.slice();
                });
            }
            else
            {
                flameArray = flameArrayNext;
            }

            for (var column=0, len2=LightMatrixWidth; column<len2; column++)
            {
                flameArrayNext[0][column] = ((Math.random()* (Math.random()*brushData[2])) + (flameArrayNext[0][column]/2)) / 2;
                if(isNaN(flameArrayNext[0][column]))
                {
                    flameArrayNext[0][column] = 1;
                }
            }
        
            for (var row=1, len=LightMatrixHeight; row<len; row++)
            {
                for (var column=0, len2=LightMatrixWidth; column<len2; column++)
                {
                    var left = column-1;
                    if(left < 0){left = 39;}
                    var right = (column+1 % 39);

                    var v1 = flameArrayNext[row][column] * 1.2;

                    var v2 = flameArrayNext[row-1][left] * 0.5;
                    var v3 = flameArrayNext[row-1][column] * 1.8;
                    var v4 = flameArrayNext[row-1][right] * 0.5;

                    var v5 = (Math.random()/8);

                    if(Math.random() > 0.9)
                    {
                       v5 = v5 * -1;

                       if(Math.random() > 0.97)
                       {
                            v5 = -1.45;     
                       }
                    }

                    if(isNaN(v1)){v1=0;}
                    if(isNaN(v2)){v2=0;}
                    if(isNaN(v3)){v3=0;}
                    if(isNaN(v4)){v4=0;}

                    flameArrayNext[row][column] =  ((v1 + v2 + v3 + v4 - v5) / 5);
                }
            }
        }
        for (var column=0, len2=LightMatrixWidth; column<len2; column++)
        {
            //flameArray[0][column] = flameArray[0][column] - 0.05;
        }

    }

}

























