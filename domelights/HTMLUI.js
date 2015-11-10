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
    this.Checkbox = function(label, checked, dataIndex){

    	this.checked = checked;
        this.DataIndex = dataIndex;

        this.GenerateHTML = function(){
        	
        	checked = "";
        	
        	if( this.checked == true ) {
        		checked = " checked"; 
        	}

            var html = ("<div class=\"row lineout-full\"><input type=\"checkbox\"" + checked + " onchange=\"ActiveBrushData[" + dataIndex + "] = this.checked;\" />" + label + "</div>\n");

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
    this.Colors = function(options, dataIndex){

		this.DataIndex = dataIndex;
		this.PaletteIndex = options.slots[this.DataIndex].Palette;
        
        this.GenerateHTML = function(){

        	var html = ( '<div class="row lineout-full" id="colorselector' + this.DataIndex + '" dataIndex="' + this.DataIndex + '" paletteIndex="' + this.PaletteIndex + '">' +
        			'<script>buildColorSelector( "colorselector' + this.DataIndex + '" );</script>' +
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
    this.OptionBox = function(options, selected, text, dataIndex){

    	this.options = options;
    	this.text = text;
    	this.selected = selected;
        this.DataIndex = dataIndex;

        this.GenerateHTML = function(){

            var itemIndex = 0;
            var selectionText = "";

            var html = "<div class=\"row lineout-full\"><optionh4>" + this.text + "</optionh4>";
        	html += "<select onchange=\"ActiveBrushData[" + dataIndex + "] = this.value;\">\n";
            
            for(key in this.options) 
            {
                if(itemIndex == selected)
                    selectionText = "selected";
                else
                    selectionText = "";

            	html += "\t<option value = \"" + this.options[key] + "\"" + selectionText + ">" + key + "</option>\n";
                itemIndex++;
            }
            
            html += "</select></div>\n";

            return html;
        };

        this.init = function()
        {
            return this;
        };
        this.init();
    };
    this.OptionBox.Prototype = Object.create(this.BaseHTMLUIObject());

    //Label UI
    this.Label = function(text)
    {
        this.Text = text;
        this.GenerateHTML = function(){

            var html = ("<div class=\"row lineout-full\"><h4>" + this.Text + "</h4></div>\n");

            return html;
        };
        this.init = function()
        {
            return this;
        };
        this.init();
    };

    //Slider UI
    this.Slider = function(val1, val2, val3, val5, val6){

	if (arguments.length === 2) 
	{
		this.DataIndex = val2;
        this.mMinValue = val1.slots[this.DataIndex].Min;
        this.mMaxValue = val1.slots[this.DataIndex].Max;
        this.mStep = val1.slots[this.DataIndex].Step;
        this.mCurrentValue = val1.slots[this.DataIndex].Default;
	}
	else
	{
        this.DataIndex = val6;
        this.mMinValue = val1;
        this.mMaxValue = val2;
        this.mStep = val3;
        this.mCurrentValue = val5;
	}
        this.GenerateHTML = function(){

            var html = ("\t<input class=\"slider\" type=\"range\" min=\"" + this.mMinValue + "\" max=\"" + this.mMaxValue + "\" value=\"" + this.mCurrentValue + "\" step=\"" + this.mStep + "\" oninput=\"ActiveBrushData[" + this.DataIndex + "] = this.value;\">\n");

            return html;
        };

        this.init = function()
        {
            return this;
        };
        this.init();
    };
    this.Slider.Prototype = Object.create(this.BaseHTMLUIObject());


    //AddUI Helper
    this.AddUI = function(uiItem)
    {
        self.UIProperties.push(uiItem);
    };


    //Render the UIProperties to the generatedHtml
    this.GeneratePropertyContents = function()
    {
        generatedHtml = '<div class="panel">\n';
        generatedHtml = '<div class="row"><h3 style="color: black;">' + this.Name + '</h3></div>\n';

        for(var index = 0; index < self.UIProperties.length; index++)
        {
            generatedHtml += self.UIProperties[index].GenerateHTML();
        }

        generatedHtml += '<div class="row">&nbsp;</div>';
        generatedHtml += '<div class="row">';
        generatedHtml += '<div class="undoapply box lineout-left green"><a class="brushselector" onclick="HTMLBrushManager.Undo();"><br /><br />Undo<br /></a></div>';
        generatedHtml += '<div class="undoapply box lineout-right teal"><a class="brushselector" onclick="HTMLBrushManager.ApplyBrushes();"><br /><br />Apply<br /></a></div>';
        generatedHtml += "</div>\n";

        return generatedHtml;

    };

    //INIT
    this.init = function(){};
    this.init();

};
