<div class='row spacious'><div class='col-md-12 col-lg-12'><button class='btn btn-default pull-right' colore-context='/controllers/new'>New</button></div></div>
<div class='row spacious'><div class='col-md-12 col-lg-12'><table class="table table-striped table-hover">
<tr>
	<th>ID</th>
	<th>Name</th>
	<th>Mode</th>
	<th>Script Name</th>
	<th>Last Active</th>
	<th>Last IP</th>
	<th>Last Animation</th>
	<th>Comment</th>
</tr>
{foreach $controllers as $controller}
<tr colore-context='/controllers/view' data-id="{$controller.id}">
	<td>{$controller.id}</td>
	<td>{$controller.name}</td>
	<td>{$controller.mode}</td>
	<td>{$controller.script_name}</td>
	<td>{$controller.last_active}</td>
	<td>{$controller.last_ip}</td>
	<td>{$controller.last_animation}</td>
	<td>{$controller.comment}</td>
</tr>
{foreachelse}
No controllers!
{/foreach}
</table>
</div></div>
<script type="text/javascript" src="/app/listeners.js"></script>