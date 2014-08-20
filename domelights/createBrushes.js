/**
 * Created by Robert Butterworth on 8/12/2014.
 */

function CreateBrushes() {

    var WipeBrush = new Brush(); // Index 0
//----------------------------------------------------------------------
    WipeBrush.PrePaint = function (index) {
        return true;
    };
    WipeBrush.PostPaint = function (index) {
        return true;
    };
    WipeBrush.Duration = 40;
    WipeBrush.Render = function (frame, canvas, originLight) {
        var col = new THREE.Color();
        col.setRGB(brushColor.r, brushColor.g, brushColor.b);

        HorizontalWipeTime(new THREE.Color(0, 0, 0), frame);
        HorizontalWipeTime(new THREE.Color(0.2, 0, 0), frame + 1);
        HorizontalWipeTime(new THREE.Color(1, 0, 0), frame + 2);
        HorizontalWipeTime(new THREE.Color(0.7, 0, 0), frame + 3);
        HorizontalWipeTime(new THREE.Color(0.2, 0, 0), frame + 4);
    };
    Brushes.push(WipeBrush);
//----------------------------------------------------------------------
//----------------------------------------------------------------------

    var ColorBrush = new Brush(); // Index 1
//----------------------------------------------------------------------
    ColorBrush.Color = new THREE.Color();
    ColorBrush.PrePaint = function (index) {
        this.Color.setRGB(brushColor.r, brushColor.g,brushColor.b);
        return true;
    };
    ColorBrush.PostPaint = function (index) {
        return true;
    };
    ColorBrush.Duration = 20;
    ColorBrush.Render = function (frame, canvas, originLight) {
        var col = new THREE.Color();
        col.setRGB(this.Color.r, this.Color.g, this.Color.b);
        setLightColor(col, originLight);
    };
    Brushes.push(ColorBrush);
}