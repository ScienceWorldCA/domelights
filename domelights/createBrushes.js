/**
 * Created by Robert Butterworth on 8/12/2014.
 */

function CreateBrushes() {

    var WipeBrush = new Brush();
    {
        WipeBrush.Index = 0;
        WipeBrush.Duration = 40;
        WipeBrush.Render = function (frame, originLight, brushData) {
            HorizontalWipeTime(new THREE.Color(1.0, 0, 0), frame);
            HorizontalWipeTime(new THREE.Color(0.7, 0, 0), frame + 1);
            HorizontalWipeTime(new THREE.Color(0.5, 0, 0), frame + 2);
            HorizontalWipeTime(new THREE.Color(0.2, 0, 0), frame + 3);
            HorizontalWipeTime(new THREE.Color(0.0, 0, 0), frame + 4);
        };
        Brushes.push(WipeBrush);
    }

    var ColorBrush = new Brush();
    {
        ColorBrush.Index = 1;
        ColorBrush.Duration = 50;
        ColorBrush.Render = function (frame, originLight, brushData) {

            var fadeMultipler = 1 - (1 / this.Duration) * frame;

            var col = new THREE.Color();

            var myCol = brushData[0].getHSL();
            col.setHSL(myCol.h, myCol.s, myCol.l * fadeMultipler);

            //TODO Implement Alpha using fadeMultipler

            //console.log(frame + " = " + col.r + "," + col.g +  "," + col.b);
            setLightColor(col, originLight);
        };
        Brushes.push(ColorBrush);
    }

    var GradientBackgroundBrush = new Brush();
    {
        GradientBackgroundBrush.Index = 2;
        GradientBackgroundBrush.Duration = SequenceManager.SequenceLength;
        GradientBackgroundBrush.IsBackground = true;
        GradientBackgroundBrush.PrePaint = function () {return false;};
        GradientBackgroundBrush.Render = function (frame, originLight, brushData) {
            var col = new THREE.Color();

            var step = 1 / LightMatrixWidth;

            //frame = frame*0.25;
            for (var y = 0; y < LightMatrixWidth; y++) {
                col.setHSL(y * step, 1, 0.2);
                HorizontalWipeTime(col, frame + y);
            }


        };
        Brushes.push(GradientBackgroundBrush);
    }
}