<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Colore Example / <?=$template['page_title']?>
</title>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
<script language="javascript">
function DoPing() {
	var params = {};
	params.message = $("#pingText").val();

	$.getJSON(
		'ping',
		$.param( params, true ),
		function( data ) {
			document.getElementById('pingResult').value = data.message;
		}
	);
}
</script>
</head>
<body>
	<?=$template['place_holder_message']?><br />
	You called &quot;<?=$template['context']?>&quot;.<br />
	Ping: <input type="text" id="pingText" value="test" size="64" length="64"/><br />
	Result: <input type="text" disabled id="pingResult" size="64" length="64"/><br />
	<button onclick="DoPing();">Ping</button>
</body>
</html>
