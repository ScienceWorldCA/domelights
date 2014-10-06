/**
 * Created by Robert Butterworth on 8/2/2014.
 */

var Brush = function(){

    this.Index = 0; //Index of the brush
    this.Duration = 0; //Duration of the Brush in Frames
    this.Render = function(frame, originLight){}; //Write the light values to the dome given the frame
    this.HTMLUI = null;

    this.Data = []; // Arbitrary data for the brush

    this.PrePaint =  function(){return true;}; // Called before paint is applied
    this.PostPaint =  function(){return true;}; // Called after paint is applied

    this.GeneratePropertyContents = function()
    {
        if(this.HTMLUI != null)
        {
            return this.HTMLUI.GeneratePropertyContents();
        }
    };

    //INIT
    this.init = function(){};
    this.init();

};