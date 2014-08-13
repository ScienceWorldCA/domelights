/**
 * Created by Robert Butterworth on 8/12/2014.
 */

function CreateBrushes() {

    var WipeBrush = new Brush(); // Index 0
//----------------------------------------------------------------------
    WipeBrush.PrePaint = function () {
        console.log("WipeBrush.PrePaint");
    };
    WipeBrush.PostPaint = function () {
        console.log("WipeBrush.PostPaint");
    };
    WipeBrush.Duration = 40;
    WipeBrush.Render = function (frame, canvas) {
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
    ColorBrush.PrePaint = function () {
        console.log("CBRUSH.PrePaint");
    };
    ColorBrush.PostPaint = function () {
        console.log("CBRUSH.PostPaint");
    };
    ColorBrush.Duration = 20;
    ColorBrush.Render = function (frame, canvas, originLight) {
        var col = new THREE.Color();
        col.setRGB(Math.random(), Math.random(), Math.random());
        setLightColor(col, originLight);
    };
    Brushes.push(ColorBrush);
}