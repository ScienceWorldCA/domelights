function initPatterns()
{
    //Load image
    var img = new Image();
    img.src = PatternBrushesImage;

    //Create Temp Canvas
    var canvas = document.createElement('canvas')

    if(canvas == undefined){console.log("Couldn't create Canvas for Pattern Brush")}

    var ctx = canvas.getContext('2d');

    if(ctx == undefined){console.log("Couldn't create Context for Pattern Brush")}

    ctx.drawImage(img, 0, 0);

    //Convert image to pattern array
    //var rawImage = ctx.getImageData(0, 0, img.width, img.height).data

    var numberWide = img.width / 40;
    var numberHigh = img.height / 16;

    //Chop up the image to the set size

    //get data for one section

    //Create arrays of images
    for(var y = 0; y < numberHigh; y++)
    {
        for (var x = 0; x < numberWide; x++)
        {
            var pattern = [];

            var rawData = ctx.getImageData(x*40, y*16, 40, 16).data;

            if(rawData == undefined){console.log("Raw Data loading FAILED")};

            var colorIndex = 0;

            for(var row = 0; row < 16; row++)
            {
                var colorRow = [];

                for(var column = 0; column < 40; column++)
                {
                    var color = [];

                    //Convert over image values to floats
                    color.push(rawData[colorIndex++]/255);
                    color.push(rawData[colorIndex++]/255);
                    color.push(rawData[colorIndex++]/255);
                    color.push(rawData[colorIndex++]/255);

                    colorRow.push(color);
                }

                pattern.push(colorRow);

            }

            PatternBrushes.push(pattern);
        }
    }

};

function getPatternData(index)
{
    //Init Patterns
    if(PatternBrushes.length < 1) {
        initPatterns();
    }

    return PatternBrushes[index];
};