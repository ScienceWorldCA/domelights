<table class="table table-striped">
<tr>
	<th>ID</th>
	<th>Email</th>
	<th>Name</th>
</tr>
{foreach $admins as $admin}
<tr>
	<td>{$admin.id}</td>
	<td>{$admin.email}</td>
	<td>{$admin.name}</td>
</tr>
{foreachelse}
<tr><td>No admins!</td></tr>
{/foreach}
</table>