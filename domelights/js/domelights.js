function DoStoreAnimation() {

	$('#submitmessage').html("<img src='images/ajax-loader.gif' />").removeClass("success").removeClass("warning");
	$("#submitbutton").val("Trying...").addClass("red").removeClass("blue");

	api.DoStoreAnimation();
	EnableDomeEventHandles(true);

	return false;
}

function showSubmitForm() {
	console.log("Showing Submit Dialog");
	$("#submitform").show().siblings().hide("slow");
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
	var selector_element = "#"+div_id;
	var dataIndex = $(selector_element).attr('dataIndex');
	$(selector_element).html("<h4>Building...</h4>");
	$.getJSON( "colors.json", function(data) {
		var colorblock = "colorblock_" + dataIndex;
		$(selector_element).empty();
		$(selector_element).append( "<h4>Select color...</h4>\n" );
		
		$.each( data, function( idx, row ) {
			$(selector_element).append( '<img class="colorblock ' + colorblock + ' ' + row['class'] + '" onclick="HTMLBrushManager.setColorByDataIndex(' + dataIndex + ',' + row['rgb'] + ');" src="images/shim.png" />' );
		} );
		
		$("." + colorblock).click(function() {
			$(this).addClass("selected").siblings().removeClass("selected");
		});
		
	} );
}