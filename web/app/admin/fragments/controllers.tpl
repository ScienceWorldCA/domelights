<table class="table table-striped">
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
<tr>
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