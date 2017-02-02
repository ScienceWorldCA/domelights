<div class='row spacious'><div class='col-md-12 col-lg-12'><button class='btn btn-default pull-right' colore-context='/admins/new'>New</button></div></div>
<div class='row spacious'><div class='col-md-12 col-lg-12'><table class="table table-striped table-hover">
<tr>
	<th>ID</th>
	<th>Email</th>
	<th>Name</th>
</tr>
{foreach $admins as $admin}
<tr colore-context='/admins/view' data-id="{$admin.id}">
	<td>{$admin.id}</td>
	<td>{$admin.email}</td>
	<td>{$admin.name}</td>
</tr>
{foreachelse}
<tr><td>No admins!</td></tr>
{/foreach}
</table>
</div></div>
<script type="text/javascript" src="/app/listeners.js"></script>