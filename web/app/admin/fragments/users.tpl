<table class="table table-striped">
<tr>
	<th>ID</th>
	<th>Email</th>
	<th>Name</th>
	<th>Active</th>
	<th>Admin</th>
</tr>
{foreach $users as $user}
<tr>
	<td>{$user.id}</td>
	<td>{$user.email}</td>
	<td>{$user.name}</td>
	<td>{$user.active}</td>
	<td>{$user.admin}</td>
</tr>
{foreachelse}
No users!
{/foreach}
</table>