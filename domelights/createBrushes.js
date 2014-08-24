/**
 * Created by Robert Butterworth on 8/12/2014.
 */

function CreateBrushes() {

    var WipeBrush = new Brush();
    {
        WipeBrush.Index = 0;
        WipeBrush.Duration = 40;
        WipeBrush.PrePaint = function (index) {
            return true;
        };
        WipeBrush.PostPaint = function (index) {
            return true;
        };
        WipeBrush.Render = function (frame, originLight, brushData) {
            var col = new THREE.Color();
            col.setRGB(brushColor.r, brushColor.g, brushColor.b);

            HorizontalWipeTime(new THREE.Color(0, 0, 0), frame);
            HorizontalWipeTime(new THREE.Color(0.2, 0, 0), frame + 1);
            HorizontalWipeTime(new THREE.Color(1, 0, 0), frame + 2);
            HorizontalWipeTime(new THREE.Color(0.7, 0, 0), frame + 3);
            HorizontalWipeTime(new THREE.Color(0.2, 0, 0), frame + 4);
        };
        Brushes.push(WipeBrush);
    }

    var ColorBrush = new Brush();
    {
        ColorBrush.Index = 1;
        ColorBrush.Duration = 20;
        ColorBrush.PrePaint = function (index) {
            return true;
        };
        ColorBrush.PostPaint = function (index) {
            return true;
        };
        ColorBrush.Render = function (frame, originLight, brushData) {
            var col = new THREE.Color();
            col.setRGB(brushData[0].r, brushData[0].g, brushData[0].b);
            setLightColor(col, originLight);
        };
        Brushes.push(ColorBrush);
    }

    var GradientBackgroundBrush = new Brush();
    {
        GradientBackgroundBrush.Index = 2;
        GradientBackgroundBrush.Duration = EventManager.SequenceLength;
        GradientBackgroundBrush.IsBackground = true;
        GradientBackgroundBrush.PrePaint = function (index) {return false;};
        GradientBackgroundBrush.Render = function (frame, originLight, brushData) {
            var col = new THREE.Color();
            //col.setRGB(this.Color.r, this.Color.g, this.Color.b);

            var step = 1 / LightMatrixWidth;

            //frame = frame*0.25;
            for (var y = 0; y < LightMatrixWidth; y++) {
                col.setHSL(y * step, 1, 0.1);
                HorizontalWipeTime(col, frame + y);
            }


        };
        Brushes.push(GradientBackgroundBrush);
    }
}