<table class="table table-striped">
<tr>
	<th>ID</th>
	<th>token</th>
	<th>user_id</th>
	<th>Start</th>
	<th>End</th>
	<th>State</th>
</tr>
{foreach $animations as $animation}
<tr>
	<td>{$animation.id}</td>
	<td>{$animation.token}</td>
	<td>{$animation.user_id}</td>
	<td>{$animation.start}</td>
	<td>{$animation.end}</td>
	<td>{$animation.state}</td>
</tr>
{foreachelse}
No animations!
{/foreach}
</table>