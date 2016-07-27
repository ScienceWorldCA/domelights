<div class='row spacious'><div class='col-md-12 col-lg-12'><button class='btn btn-default' colore-context='/controllers'>Back</button><button class='btn btn-default pull-right' colore-context='/controllers/edit' data-id='{$controller.id}'>Edit</button></div></div>
<div class='row spacious'><div class='col-md-12 col-lg-12'><table class="table table-striped table-hover">
<tr> <td>ID</td> <td>{$controller.id}</td> </tr>
<tr> <td>Name</td> <td>{$controller.name}</td> </tr>
<tr> <td>Mode</td> <td>{$controller.mode}</td> </tr>
<tr> <td>Script Name</td> <td>{$controller.script_name}</td> </tr>
<tr> <td>Last Active</td> <td>{$controller.last_active}</td> </tr>
<tr> <td>Last IP</td> <td>{$controller.last_ip}</td> </tr>
<tr> <td>Last Animation</td> <td>{$controller.last_animation}</td> </tr>
<tr> <td>Comment</td> <td>{$controller.comment}</td> </tr>
</table>
</div></div>
<script type="text/javascript">
$('[colore-context]').on('click', function(event) {
	var context = $(this).attr( 'colore-context' );
	var args = $(this).data();
	myApp.dispatch( context, args );
});
</script>