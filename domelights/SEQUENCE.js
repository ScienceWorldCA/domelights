/**
 * Created by Robert Butterworth on 8/9/2014.
 */

SEQUENCE = function() {

    var self = this;
    this.SequenceTime = 0; //Actual time of the Sequence.
    this.SequenceLength = 15*FPS;
    this.Version = 1;
    this.Events = [];
    this.Play = true;
    var mUndoIndex = 0;
    var mMaxUndoIndex = 0;

    var previousTime = new Date().getTime();

    this.GetSequenceTime = function()
    {
        return this.SequenceTime;
    };

    this.SetSequenceTime = function(time)
    {
        timer = time;
        this.SequenceTime = time;
    }

    this.ClearSequence = function()
    {
        ClearLights();
        this.Events = [];
        mUndoIndex = 0;
        mMaxUndoIndex = 0;
    }

    this.GetSequenceLength = function()
    {
        return this.SequenceLength;
    };

    this.__defineGetter__("UndoIndex", function(){
        return mUndoIndex;
    });

    this.__defineSetter__("UndoIndex", function(val){

        if(val > mMaxUndoIndex){val = mMaxUndoIndex;}
        if(val < 0){val = 0;}

        mUndoIndex = val;
        UpdateUndoStack(false);
    });


    this.RenderFrame = function(frame, returnFrame)
    {
        var x;

        ClearLights();

        //Render Background
        for(x = 0; x < this.Events.length; x++)
        {
            if((this.Events[x].StartTime <= frame)&&
               (this.Events[x].Brush.Duration + this.Events[x].StartTime > frame))
            {
                if(this.Events[x].IsBackground == true && this.Events[x].Enabled == true)
                {
                        this.Events[x].Render(frame - this.Events[x].StartTime);
                }
            }
        }
        //Render Foreground
        for(x = 0; x < this.Events.length; x++)
        {
            if((this.Events[x].StartTime <= this.SequenceTime)&&
               (this.Events[x].Brush.Duration + this.Events[x].StartTime > frame))
            {
                if(this.Events[x].IsBackground == false && this.Events[x].Enabled == true)
                {
                        this.Events[x].Render(frame - this.Events[x].StartTime);
                }
            }
        }

        //Create Stream
        if(returnFrame == true)
        {
            var binaryFrame = "";

            for (var i = 0; i < 260; i++) {

                var color = new THREE.Color();

                var lightIndex = DomeLightOrder[i];

                color = DomeLightManager.Lights[lightIndex].color;

                binaryFrame += color.getHexString();
                // binaryFrame += String.fromCharCode( color.r );
                // binaryFrame += String.fromCharCode( color.g );
                // binaryFrame += String.fromCharCode( color.b );
            }

            return binaryFrame;
        }
    };

    this.RenderSequence = function(JSONSequenceConstructionFile)
    {
        var BinarySequenceStream = "";

        this.LoadSequence(JSONSequenceConstructionFile);

        if(this.Events.length < 1)
        {
            console.log("--- No Events in Sequence to Render ---");
            return undefined;
        }

        for (var i = 0; i < this.SequenceLength; i++) {
            this.SequenceTime = i;
            BinarySequenceStream += this.RenderFrame(i,true);
        }

        console.log("--- Stream Rendered ---");

        return BinarySequenceStream;
    };

    this.AddEvent = function(event)
    {
        //We need to sort this on addition based on time as we could be adding in an event at any point in time.
        //eg. During playback of other events.
        UpdateUndoStack(true);

        mUndoIndex++;
        mMaxUndoIndex = mUndoIndex;

        event.ActionID = mUndoIndex;

        this.Events.push(event);


        //Now we've added another event, sort to ensure they are in the correct order
        this.Events.sort(function(a,b){
            return a.StartTime - b.StartTime;
        });
    };

    this.RemoveEvent = function(atIndex)
    {
        this.Events.remove(atIndex);
    };

    this.Update = function()
    {
        if(this.Play == true)
        {
            timer += 0.8; //getFrameDelta();
            if (timer > this.SequenceLength) timer = 0.0;

            this.SequenceTime = Math.floor(timer);
        }
    };

    function getFrameDelta()
    {
        var frameDelta = 0;

        var currentTime = new Date().getTime();
        var delta = currentTime - previousTime;
        previousTime = currentTime;

        //console.log(delta);
        frameDelta = delta / (1000/FPS);

        return frameDelta;
    }

    //Used to load Objects with the right types
    function RebuildBrushData(Data)
    {
      var CleanData = [];

      if( Data ) {
	      for(var x =0; x < Object.keys(Data).length; x++)
	      {
	          if(Data[x].r != undefined && Data[x].g != undefined && Data[x].b != undefined)
	              CleanData[x] = new THREE.Color(Data[x].r,Data[x].g,Data[x].b);
	          else
	              CleanData[x] = Data[x];
	      }
      }
      return CleanData;
    }

    this.SaveSequence = function()
    {
        this.SequenceConstructionFile = {};
        this.SequenceConstructionFile.Events = [];

        //Set Sequence Properties
        this.SequenceConstructionFile.Version = this.Version;
        this.SequenceConstructionFile.SequenceLength = this.SequenceLength;

        //Add all the Events
        for(var index = 0; index < this.Events.length; index++) {

            var SequenceConstructionEvent = {};

            SequenceConstructionEvent.StartTime = this.Events[index].StartTime;
            SequenceConstructionEvent.OriginLight = this.Events[index].OriginLight;
            SequenceConstructionEvent.BrushID = this.Events[index].Brush.Index;
            SequenceConstructionEvent.BrushData = this.Events[index].BrushData;

            this.SequenceConstructionFile.Events.push(SequenceConstructionEvent);
        }
        return JSON.stringify(this.SequenceConstructionFile);
    };

    this.LoadSequence = function(JSONSequenceConstructionFile)
    {
        this.Events = [];

        var SequenceConstructionFile = JSON.parse(JSONSequenceConstructionFile);
        //Set Sequence Properties
        if(this.Version > SequenceConstructionFile.Version){
            console.log("--- Sequence Upgrade Maybe Required ---");
        }

        this.SequenceLength = SequenceConstructionFile.SequenceLength;

        //Add all the Events
        for(var index = 0; index < SequenceConstructionFile.Events.length; index++) {

            var newEvent = new EVENT(SequenceConstructionFile.Events[index].StartTime,
                                      SequenceConstructionFile.Events[index].OriginLight,
                                      Brushes[SequenceConstructionFile.Events[index].BrushID],
                                      RebuildBrushData(SequenceConstructionFile.Events[index].BrushData));
            this.AddEvent(newEvent);
        }

        console.log("--- File Loaded ---");
    };

    this.Undo = function()
    {
        if(mUndoIndex > 0)
        {
            mUndoIndex--;
            UpdateUndoStack(false);
        }
    };

    this.Redo = function()
    {
        if(mUndoIndex < mMaxUndoIndex)
        {
            mUndoIndex++;
            UpdateUndoStack(false);
        }
    };

    var UpdateUndoStack = function(clearPostIndex)
    {
        console.log("Update Stack");
        var mClearPostIndex = clearPostIndex || false;

        for(var i = 0; i < self.Events.length; i++)
        {
            if(self.Events[i].ActionID > mUndoIndex ){
                if(mClearPostIndex == true)
                {
                    self.Events.splice(i, 1);
                    mMaxUndoIndex = mUndoIndex;
                }
                else
                {
                    self.Events[i].Enabled = false;
                }
            }
            else{
                self.Events[i].Enabled = true;
            }
        }
    };




};

var EVENT = function(time, originLight, brush, brushData)
{
    this.ActionID = 0;
    this.Enabled = true;
    this.IsBackground = false;
    this.StartTime = time; //Offset from the start of the sequence in frames.
    this.OriginLight = originLight; // The Light that the animation is based from.
    this.Brush = brush; // The brush that should be applied.
    this.BrushData = brushData; //The current brush data

    this.ApplyData = function()
    {
        this.BrushData = Clone(this.BrushData);
    };

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
        if (this.Brush.Render != null) this.Brush.Render(CurrentFrame, this.OriginLight, this.BrushData);
    };


    //Init
    this.init = function()
    {

    };
    this.init();
};
