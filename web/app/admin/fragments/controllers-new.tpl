<div class='row spacious'><div class='col-md-12 col-lg-12'><button class='btn btn-default' colore-context='/controllers'>Back</button></div></div>
<div class='row spacious'><div class='col-md-12 col-lg-12'>
<table class="table table-striped table-hover">
<tr> <td>Name</td> <td> <input colore-bind data-parent='#add_button' data-name='name' class='form-control' type='text' /> </td> </tr>
<tr> <td>Secret</td> <td> <input id='controller_secret' class='form-control' colore-bind data-parent='#add_button' data-name='secret' /> </td> </tr>
<tr> <td>Mode</td> <td> <select id='controller_mode' class='form-control' colore-bind data-parent='#add_button' data-name='mode'></select></td> </tr>
<tr> <td>Script Name</td> <td> <select id='controller_script_name' colore-bind data-parent='#add_button' data-name='script_name' class='form-control' type='text'></select> </td> </tr>
<tr> <td>Comment</td> <td> <input colore-bind data-parent='#add_button' data-name='comment' name='comment' class='form-control' type='text'/> </td> </tr>
</table>
</div></div>
<div class='row spacious'><div class='col-md-12 col-lg-12'><button class='btn btn-default pull-right' id='add_button' colore-context='/controllers/create'>Create</button></div></div>
<script type="text/javascript" src="/app/listeners.js"></script>
<script type="text/javascript">
$( document ).ready( function() {
	api.fillControllerModes( "#controller_mode" );
	api.fillControllerScripts( "#controller_script_name" );
 } );    
</script>