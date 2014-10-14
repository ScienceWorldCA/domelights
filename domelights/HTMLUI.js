HTMLUI = function() {
    var self = this;
    this.UIProperties = [];
    var generatedHtml = null; // this is used a cache.

    this.ID = 0;
    this.Name = "";
    this.Class = "";
    this.Icon = "";
    this.Category = "default";

    this.__defineGetter__( "GeneratedHTML", function() {

        if(generatedHtml == null)
        {
            this.GeneratePropertyContents();
        }
        return generatedHtml;
    });

    //Base Class
    this.BaseHTMLUIObject = function(){
        return this;
    };

    //CheckBox UI
    this.Checkbox = function(checked, dataIndex){

        this.DataIndex = dataIndex;

        this.GenerateHTML = function(){

            var html = ("\t<Checkbox><a href=\"#\" OnClick=\"ActiveBrushData[" + dataIndex + "] = myValue; return false;\"></a></Checkbox>\n");

            return html;
        };

        this.init = function()
        {
            return this;
        };
        this.init();
    };
    this.Checkbox.Prototype = Object.create(this.BaseHTMLUIObject());

    //Color UI
    this.Colors = function(dataIndex){

        this.DataIndex = dataIndex;

        this.GenerateHTML = function(){

        	var html = ( '<div class="row lineout-full" id="colorselector' + dataIndex + '" dataIndex="' + dataIndex + '">' +
        			'<script>buildColorSelector( "colorselector' + dataIndex + '" );</script>' +
        			'</div>' );

            return html;
        };

        this.init = function()
        {
            return this;
        };
        this.init();
    };
    this.Colors.Prototype = Object.create(this.BaseHTMLUIObject());

    //Gradient UI
    this.Gradient = function(startColor, endColor, dataIndex){

        this.DataIndex = dataIndex;

        this.GenerateHTML = function(){

            var html = ("\t<Gradient><a href=\"#\" OnClick=\"ActiveBrushData[" + dataIndex + "] = myValue; return false;\"></a></Gradient>\n");

            return html;
        };

        this.init = function()
        {
            return this;
        };
        this.init();
    };
    this.Gradient.Prototype = Object.create(this.BaseHTMLUIObject());

    //OptionBox UI
    this.OptionBox = function(optionGroup, checked, dataIndex){

        this.DataIndex = dataIndex;

        this.GenerateHTML = function(){

            var html = ("\t<OptionBox><a href=\"#\" OnClick=\"ActiveBrushData[" + dataIndex + "] = myValue; return false;\"></a></OptionBox>\n");

            return html;
        };

        this.init = function()
        {
            return this;
        };
        this.init();
    };
    this.OptionBox.Prototype = Object.create(this.BaseHTMLUIObject());

    //Slider UI
    this.Slider = function(minValue, maxValue, step, currentValue, dataIndex){

        this.DataIndex = dataIndex;
        this.mMinValue = minValue;
        this.mMaxValue = maxValue;
        this.mStep = step;
        this.mCurrentValue = currentValue;

        this.GenerateHTML = function(){

            var html = ("\t<input type=\"range\" min=\"" + this.mMinValue + "\" max=\"" + this.mMaxValue + "\" value=\"" + this.mCurrentValue + "\" step=\"" + this.mStep + "\" onchange=\"ActiveBrushData[" + dataIndex + "] = this.value;\">\n");

            return html;
        };

        this.init = function()
        {
            return this;
        };
        this.init();
    };
    this.Slider.Prototype = Object.create(this.BaseHTMLUIObject());


    this.AddUI = function(uiItem)
    {
        self.UIProperties.push(uiItem);
    };


    //Render the UIProperties to the generatedHtml
    this.GeneratePropertyContents = function()
    {
        console.log("Build UI");

        generatedHtml = '<div class="panel">\n';
        generatedHtml = '<div class="row"><h3 style="color: black;">' + this.Name + '</h3></div>\n';

        for(var index = 0; index < self.UIProperties.length; index++)
        {
            generatedHtml += self.UIProperties[index].GenerateHTML();
        }

        generatedHtml += '<div class="row"><div class="lineout-left"><a class="colorblock green">Reset</a></div><div class="lineout-right"><a class="colorblock teal">Apply</a></div></div>';
        generatedHtml += "</div>\n";

        return generatedHtml;

    };

    //INIT
    this.init = function(){};
    this.init();

};