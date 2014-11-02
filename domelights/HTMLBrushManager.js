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
			// Stop the undo group
			SequenceManager.StopUndoGroup();
			SequenceManager.ApplyCurrentData();
            //Clear ActiveBrushData
            ActiveBrushData = [];
			// Start the undo group again and set the new brush data
			SequenceManager.StartUndoGroup();
			// Set the active brush id
			ActiveBrushID = id;

		}
	}
	
	this.ApplyBrushes = function() {
		SequenceManager.StopUndoGroup();
		SequenceManager.ApplyCurrentData();
		SequenceManager.StartUndoGroup();
	}
	
	this.Undo = function() {
		SequenceManager.StopUndoGroup();
		SequenceManager.Undo();
	}
	
	this.setActiveColor = function( dataIndex, red, green, blue) {
		// Stop the undo group
		SequenceManager.StopUndoGroup();
		SequenceManager.ApplyCurrentData();
		// Start the undo group again and set the new brush data
		SequenceManager.StartUndoGroup();
		ActiveBrushData[dataIndex] = new THREE.Color(red, green, blue);
	}

	this.setColorByDataIndex = function( BrushDataIndex, red, green, blue) {
		// Stop the undo group
		//SequenceManager.StopUndoGroup();
		//SequenceManager.ApplyCurrentData();
		// Start the undo group again and set the new brush data
		//SequenceManager.StartUndoGroup();
		ActiveBrushData[BrushDataIndex] = new THREE.Color(red, green, blue);
	}

	this.getHTMLBlockName = function( id )
	{
        console.log("BrushID: " + id);

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
