<div class='row spacious'><div class='col-md-12 col-lg-12'><button class='btn btn-default' colore-context='/controllers/view' data-id='{$controller.id}'>Back</button><button class='btn btn-default pull-right' colore-context='/controllers/delete' data-id='{$controller.id}'>Delete</button></div></div>
<div class='row spacious'><div class='col-md-12 col-lg-12'>
<table class="table table-striped table-hover">
<tr> <td>ID</td> <td> <input disabled value='{$controller.id}' /> </td> </tr>
<tr> <td>Name</td> <td> <input colore-bind data-parent='#update_button' data-name='name' class='form-control' type='text' value='{$controller.name}' /> </td> </tr>
<tr> <td>Mode</td> <td> <select id='controller_mode' class='form-control' colore-bind data-parent='#update_button' data-name='mode' data-id='{$controller.mode}'></select></td> </tr>
<tr> <td>Script Name</td> <td> <select id='controller_script_name' colore-bind data-parent='#update_button' data-name='script_name' class='form-control' type='text' data-id='{$controller.script_name}'></select> </td> </tr>
<tr> <td>Comment</td> <td> <input colore-bind data-parent='#update_button' data-name='comment' name='comment' class='form-control' type='text' value='{$controller.comment}' /> </td> </tr>
</table>
</div></div>
<div class='row spacious'><div class='col-md-12 col-lg-12'><button class='btn btn-default pull-right' id='update_button' colore-context='/controllers/update' data-id='{$controller.id}'>Update</button></div></div>
<script type="text/javascript" src="/app/listeners.js"></script>
<script type="text/javascript">
$( document ).ready( function() {
	api.fillControllerModes( "#controller_mode" );
	api.fillControllerScripts( "#controller_script_name" );
 } );    
</script>