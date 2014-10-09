var HTMLBrushManager = function() {
	
	// Get the active brush id, else return 1
	this.GetActiveBrush = function()
	{
		if( Brushes[ActiveBrushID] != undefined ) return ActiveBrushID;

		return 1;
	}
	
	// If id is a valid brush, then return the 
	this.SetActiveBrush = function(id)
	{
		if( DEBUG ) console.log( "SetActiveBrush: " + id );
		if( Brushes[id] != undefined ) {
			ActiveBrushID = id;
		}
	}
	
	this.setPrimaryColor = function( red, green, blue ) {
    	ActiveBrushData[0] = new THREE.Color( red, green, blue );
    }

    //INIT
    this.init = function(){};
    this.init();
    
};

var HTMLBrushManager = new HTMLBrushManager();
