/**
 * Created by Robert Butterworth on 8/2/2014.
 */

var Brush = function(){

    this.Duration = 0; //Duration of the Brush in Frames
    this.Render = function(frame, canvas, originLight){}; //Write the light values to the dome given the frame

    this.PrePaint = null; // Called before paint is applied
    this.PostPaint = null; // Called after paint is applied

    //INIT
    this.init = function(){

    };
    this.init();
};
