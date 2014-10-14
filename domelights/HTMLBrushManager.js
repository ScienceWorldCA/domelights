var HTMLBrushManager = function() {

	// Get the active brush id, else return 1
	this.GetActiveBrush = function() {
		if (Brushes[ActiveBrushID] != undefined)
			return ActiveBrushID;

		return 1;
	}

	// If id is a valid brush, then return the
	this.SetActiveBrush = function(id) {
		if (DEBUG)
			console.log("SetActiveBrush: " + id);
		if (Brushes[id] != undefined) {
			ActiveBrushID = id;
		}
	}
	
	this.setActiveColor = function( dataIndex, red, green, blue) {
		ActiveBrushData[dataIndex] = new THREE.Color(red, green, blue);
	}

	this.setColorByDataIndex = function( BrushDataIndex, red, green, blue) {
		ActiveBrushData[BrushDataIndex] = new THREE.Color(red, green, blue);
	}

	this.getHTMLBlockName = function( id )
	{
		if( Brushes[id].HTMLUI.Name ) {
			var brush_name = Brushes[id].HTMLUI.Name;
			return brush_name.replace( " ", "<br />" );
		}
	}

	// INIT
	this.init = function() {
	};
	this.init();

};

var HTMLBrushManager = new HTMLBrushManager();
