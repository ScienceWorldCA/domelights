function DoStoreAnimation() {

	$('storeResult').html("Saving...");

	// Verify input
	if ($('userrealname').val() == '' || $('userrealname').val() == '<name>') {
		alert("Missing user name!");
		return false;
	} else if ($('useremail').val() == '' || $('useremail').val() == '<email>') {
		alert("Missing email address!");
		return false;
	} else {
		api.DoStoreAnimation();
		EnableDomeEventHandles(true);
	}

	return false;
}

function DisplaySubmit() {
	$('blockout').css('visibility', 'visible');
	$('userinput').css('visibility', 'visible');
	console.log("Showing Submit Dialog");
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

function buildColorSelector( div_id ) {
	$("#"+div_id).append("<h4>Building...</h4>");
	$.getJSON( "colors.json", function(data) {
		$("#"+div_id).empty();
		$("#"+div_id).append( "<h4>Select color...</h4>\n" );
		
		$.each( data, function( idx, row ) {
			$("#"+div_id).append( '<img class="colorblock ' + row['class'] + '" onclick="HTMLBrushManager.setPrimaryColor(' + row['rgb'] + ');" src="images/shim.png" />' );
		} );
		
		$('.colorblock').click(function() {
			$(this).addClass("selected").siblings().removeClass("selected");
		});
		
	} );
}