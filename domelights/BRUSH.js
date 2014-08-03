/**
 * Created by Robert Butterworth on 8/2/2014.
 */


var Brush = function(){

    this.startTime;
    this.endTime;



    this.duration = function(){
        return this.endTime - this.startTime;
    }

    this.GetLights = function(){

    };
    this.GetColors = function(time){

    };

    //INIT
    this.init = function(){

    };

    this.init();
}

