<div class='row spacious'><div class='col-md-12 col-lg-12'><button class='btn btn-default' colore-context='/admins'>Back</button><button class='btn btn-default pull-right' colore-context='/admins/edit' data-id='{$admin.id}'>Edit</button></div></div>
<div class='row spacious'><div class='col-md-12 col-lg-12'><table class="table table-striped table-hover">
<tr> <td>ID</td> <td>{$admin.id}</td> </tr>
<tr> <td>Email</td> <td>{$admin.email}</td> </tr>
<tr> <td>Name</td> <td>{$admin.name}</td> </tr>
</table>
</div></div>
<script type="text/javascript">
$('[colore-context]').on('click', function(event) {
	var context = $(this).attr( 'colore-context' );
	var args = $(this).data();
	myApp.dispatch( context, args );
});
</script>