$('.actionable').on('click', function(event) {
	var view = $(this).data('view');
	var id = $(this).data('id');
	alert("Calling: " + view + "/" + id);
});
$('.view-pick').on('click', function(event) {
	var view = $(this).data('view');
	var id = $(this).data('id');
	alert("Calling: " + view + "/" + id);
});
$('[colore-context]').on('click', function(event) {
	var context = $(this).attr( 'colore-context' );
	var args = $(this).data();
	myApp.dispatch( context, args );
});
$('[colore-bind]').on('change blur keydown', function(event) {
	var bindParent = $( this ).data( 'parent' );
	var bindName = $( this ).data( 'name' );
	if( $( this ).is( ':checkbox' ) ) {
		var bindValue = $( this ).is( ':checked' ); 
	} else {
		var bindValue = $( this ).val(); 
	}
	$( bindParent ).data( bindName, bindValue );
});