function DoStoreAnimation() {
	if( scheduled == true ) {
		location.reload();
		resetCanvas();
	} else {
		$('#submitmessage').html("<img src='assets/images/ajax-loader.gif' />").removeClass("success").removeClass("warning");
		$("#submitbutton").val("Trying...").addClass("red").removeClass("blue");
		
		api.DoStoreAnimation();
		EnableDomeEventHandles(true);
		
		return false;
	}
}

function showSubmitForm() {
	console.log("Showing Submit Dialog");
	$("#submitform").show().siblings().hide("slow");
	$("#brushcontainer").hide('slow');
	EnableDomeEventHandles(false);
}

function CloseSubmit() {
	$('userinput').css('visibility', 'hidden');
	$('blockout').css('visibility', 'hidden');
	if ($('storeResult').prop('disabled') == true) {
		// If we successfully submitted the animation, then clear the canvas
		// (hard reload for now)
		SequenceManager.ClearSequence();
	}
	EnableDomeEventHandles(true);
}

function showPopupMessage(title, message) {
	$("#popupwindowtitle").html(title);
	$("#popupmessage").html(message);
	$("#popupwindow").css('visibility', 'visible');
}

function closePopupMessage() {
	$("#popupwindow").css('visibility', 'hidden');
}

function buildBrushes() {
	$("#brushcontainer").html("Loading...");
	$.getJSON( "assets/brushes.json", function( data ) {
		$("#brushcontainer").empty();
		$.each( data, function( idx, row ) {
			//Build Brush with template settings
			var options = row['options'];
			eval(row['constructor']);
			
			var brushButton = "";
			brushButton += '<div class="box ' + row['class'] + '">';
			brushButton += '<a class="brushselector" href="#" name="brushoptions" onClick="HTMLBrushManager.SetActiveBrush( ' + row['id'] + ' );"><i class="icon-1x icon-magic" id="icon"></i><br />' + HTMLBrushManager.getHTMLBlockName( row['id'] ) + '</a>';
			brushButton += '</div>';
			$("#brushcontainer").append( brushButton );
		});
		$('A.brushselector').click(function() {
			EnableDomeEventHandles(true);
			$("#brushoptions").hide().siblings().hide();
			$("#brushoptions").html('<div id="panel"><div class="row"><h3 style="color: black;">Loading...</h3></div></div>');
			if( Brushes[ActiveBrushID].HTMLUI )
				$("#brushoptions").html(Brushes[ActiveBrushID].HTMLUI.GeneratePropertyContents());
			$("#brushoptions").show("slow").siblings().hide();
			$( this ).parent().addClass( "selected" ).siblings().removeClass("selected");
		});
	});
}

function buildColorSelector(div_id) {
	var selector_element = "#" + div_id;
	var dataIndex = $(selector_element).attr('dataIndex');
	var paletteIndex = $(selector_element).attr('paletteIndex');
	$(selector_element).html("<h4>Building...</h4>");
	$.getJSON( "assets/colors.json", function( data ) {
		var colorblock = "colorblock_" + dataIndex;
		$(selector_element).empty();
		$.each( data[paletteIndex], function( idx, row ) {
			$(selector_element).append( '<img class="colorblock ' + colorblock + ' ' + row['class'] + '" onclick="HTMLBrushManager.setColorByDataIndex(' + dataIndex + ',' + row['rgb'] + ');" src="assets/images/shim.png" />' );
		});

		$("." + colorblock).click( function() {
			$(this).addClass("selected").siblings().removeClass("selected");
		});
	});
}

function resetCanvas() {
	SequenceManager.ClearSequence();
	$("#submitbutton").attr( 'onclick', "DoStoreAnimation(); return false;" );
	$('#submitform').hide('slow');
	$('#brushcontainer').show('slow');
}