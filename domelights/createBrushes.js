/**
 * Created by Robert Butterworth on 8/12/2014.
 */

function CreateBrushes() {

    var WipeBrush = new Brush();
    {
        WipeBrush.Index = 0;
        WipeBrush.Duration = 40;
        WipeBrush.PrePaint = function () {

            if(! ActiveBrushData[0] instanceof THREE.Color)
                ActiveBrushData[0] = new THREE.Color;

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

    var ColorBrush = new Brush();
    {
        ColorBrush.Index = 1;
        ColorBrush.Duration = 50;
        ColorBrush.PrePaint = function () {

            if(! ActiveBrushData[0] instanceof THREE.Color)
                ActiveBrushData[0] = new THREE.Color;

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

    var GradientBackgroundBrush = new Brush();
    {
        GradientBackgroundBrush.Index = 2;
        GradientBackgroundBrush.Duration = SequenceManager.SequenceLength;
        GradientBackgroundBrush.IsBackground = true;
        GradientBackgroundBrush.PrePaint = function () {

            if(ActiveBrushData[0] != 0)
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
        htmlUI.AddUI(new htmlUI.Label("Animated ?:"));
        htmlUI.AddUI(new htmlUI.Slider(0, 1 , 1, 0, 0));
        Brushes.push(GradientBackgroundBrush);
    }

    var VerticalRainbowWipeBrush = new Brush();
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

    var DomeFlashBrush = new Brush();
    {
        DomeFlashBrush.Index = 4;
        DomeFlashBrush.Duration = 50;
        DomeFlashBrush.PrePaint = function () {
            if(! ActiveBrushData[0] instanceof THREE.Color)
                ActiveBrushData[0] = new THREE.Color;

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

    var HorizontalRingBrush = new Brush();
    {
        HorizontalRingBrush.Index = 5;
        HorizontalRingBrush.Duration = 30;
        HorizontalRingBrush.PrePaint = function () {
            if(! ActiveBrushData[0] instanceof THREE.Color)
                ActiveBrushData[0] = new THREE.Color;

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

    var VerticalRingBrush = new Brush();
    {
        VerticalRingBrush.Index = 6;
        VerticalRingBrush.Duration = 30;
        VerticalRingBrush.PrePaint = function () {
            if(! ActiveBrushData[0] instanceof THREE.Color)
                ActiveBrushData[0] = new THREE.Color;

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

    var LaunchBrush = new Brush();
    {
        // Base section to the Firework Brush
        LaunchBrush.Index = 7;
        LaunchBrush.Duration = 30;
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

    var FireWorkBurstBrush = new Brush();
    {
        FireWorkBurstBrush.Index = 8;
        FireWorkBurstBrush.Duration = 30;
        FireWorkBurstBrush.PrePaint = function () {
            if(! ActiveBrushData[0] instanceof THREE.Color)
                ActiveBrushData[0] = new THREE.Color;

            if(ActiveBrushData[1] != 5)
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

    var FireWorkBrush = new Brush();
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

    var SequenceTwoColorCycle = new Brush();
    {
        SequenceTwoColorCycle.Index = 10;
        SequenceTwoColorCycle.Duration = SequenceManager.SequenceLength;
        SequenceTwoColorCycle.IsBackground = true;
        SequenceTwoColorCycle.PrePaint = function () {

            if(! ActiveBrushData[0] instanceof THREE.Color)
                ActiveBrushData[0] = new THREE.Color;

            if(! ActiveBrushData[1] instanceof THREE.Color)
                ActiveBrushData[1] = new THREE.Color;


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

    var SolidColorBrush = new Brush();
    {
        ColorBrush.Index = 11;
        ColorBrush.Duration = SequenceManager.SequenceLength;
        ColorBrush.IsBackground = true;
        ColorBrush.PrePaint = function ()
        {
            if(! ActiveBrushData[0] instanceof THREE.Color)
                ActiveBrushData[0] = new THREE.Color;

            return true;
        };
        ColorBrush.PostPaint = function (event) {
            event.StartTime = 0;
        };
        ColorBrush.Render = function (frame, originLight, brushData)
        {
            SetAllLights(brushData[0], 1);
        };

        var htmlUI = new HTMLUI();
        htmlUI.Name = "Solid Color";
        htmlUI.AddUI(new htmlUI.Label("Brush Colour:"));
        htmlUI.AddUI(new htmlUI.Colors(0));
//        htmlUI.AddUI(new htmlUI.Label("Example Button:"));
//        htmlUI.AddUI(new htmlUI.OptionBox(1, 0, [
//            { "name": "Test", "value": "1"}
//        ]));
        ColorBrush.HTMLUI = htmlUI;

        Brushes.push(ColorBrush);
    }

    // Helper Brush functions

    var RGBBlendColors = function (color1, color2, blendAmount)
    {
        var c1 = new THREE.Color();
        var c2 = new THREE.Color();

        c1.setRGB(color1.r, color1.g, color1.b );
        c2.setRGB(color2.r, color2.g, color2.b );

        c1.r = c1.r * (1 - blendAmount);
        c1.g = c1.g * (1 - blendAmount);
        c1.b = c1.b * (1 - blendAmount);

        c2.r = (c2.r * blendAmount) + c1.r;
        c2.g = (c2.g * blendAmount) + c1.g;
        c2.b = (c2.b * blendAmount) + c1.b;

        return c2;
    }
}

























