/**
 * Created by Robert Butterworth on 8/9/2014.
 */

EVENTMANAGER = function() {

    this.SequenceTime = 0; //Actual time of the Sequence.
    this.SequenceLength = 15*40;
    this.Events = [];

    this.RenderFrame = function()
    {
        for(x = 0; x < this.Events.length; x++)
        {
            if((this.Events[x].StartTime < this.SequenceTime)&&
               (this.Events[x].Brush.Duration + this.Events[x].StartTime > this.SequenceTime))
            {
                this.Events[x].Render(this.SequenceTime - this.Events[x].StartTime);
            }
        }
    };

    this.AddEvent = function(event)
    {
      //We need to sort this on addition based on time as we could be adding in an event at any point in time.
      //eg. During playback of other events.

      //TODO insert based on time.
      this.Events.push(event);

    };

    this.RemoveEvent = function(atIndex)
    {
        this.Events.pop(atIndex);
    };


    this.Update = function()
    {
        timer += 0.8;
        if(timer > this.SequenceLength) timer = 0.0;

        this.SequenceTime = Math.floor(timer);
    }

};

var EVENT = function(time, originLight, lightMatrix, canvas, brush)
{
    this.Canvas = canvas; //Canvas for lights to be rendered to.
    this.StartTime = time; //Offset from the start of the sequence in frames.
    this.OriginLight = originLight; // The Light that the animation is based from.
    this.Brush = brush; // The brush that should be applied.

    this.PrePaint = function()
    {
      if(this.Brush.PrePaint != null) this.Brush.PrePaint();
    };
    this.PostPaint = function()
    {
        if(this.Brush.PostPaint != null) this.Brush.PostPaint();
    };
    this.Render = function(CurrentFrame) // Applies brush to canvas
    {
        if (this.Brush.Render != null) this.Brush.Render(CurrentFrame, this.Canvas, this.OriginLight);
    };


    //Init
    this.init = function()
    {

    };
    this.init();
};