<table class="table table-striped">
<tr><th>Day</th><th>Start Time</th><th>End Time</th><th>Type</th><th>Active</th></tr>
{foreach $schedules as $schedule}
<tr><td>{$schedule.day}</td><td>{$schedule.start}</td><td>{$schedule.end}</td><td>{$schedule.type}</td><td>{$schedule.active}</td></tr>
{foreachelse}
No schedules!
{/foreach}
</table>