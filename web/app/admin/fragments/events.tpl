<table class="table table-striped">
<tr>
	<th>ID</th>
	<th>Created</th>
	<th>Start</th>
	<th>End</th>
	<th>Type</th>
	<th>Comment</th>
	<th>Options</th>
	<th>Active</th>
</tr>
{foreach $events as $event}
<tr>
	<td>{$event.id}</td>
	<td>{$event.created}</td>
	<td>{$event.start}</td>
	<td>{$event.end}</td>
	<td>{$event.type}</td>
	<td>{$event.comment}</td>
	<td>{$event.options}</td>
	<td>{$event.active}</td>
</tr>
{foreachelse}
No schedules!
{/foreach}
</table>