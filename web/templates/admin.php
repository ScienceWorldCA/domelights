<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title><?=$template['page_title']?> Admin</title>
<script src='/components/jquery/dist/jquery.js'></script>
<script src='/components/jquery-ui/jquery-ui.js'></script>
<script src='/components/angular/angular.js'></script>
<script src='/components/backbone/backbone.js'></script>
<link rel='stylesheet' href='/components/bootstrap/dist/css/bootstrap.css' />
<link rel='stylesheet' href='/components/bootstrap/dist/css/bootstrap-theme.css' />
<script src='/components/bootstrap/dist/js/bootstrap.js'></script>
<script src='/components/mustache.js/mustache.js'></script>
<script src='/components/underscore/underscore.js'></script>
<link rel="stylesheet" href="/app/admin.css">
</head>
<body>
<div id='loginscreen' class="container">
	<form class="form-signin">
		<h2 class="form-signin-heading">Please sign in</h2>
		<label for="inputEmail" class="sr-only">Email address</label>
		<input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
		<label for="inputPassword" class="sr-only">Password</label>
		<input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
		<div class="checkbox">
		<label>
		<input type="checkbox" value="remember-me"> Remember me
		</label>
		</div>
		<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
	</form>
</div>
<div id='mainscreen' class="container-fluid">
	<div class='row'>
		<div class='col-md-12'>Science World Domelights Control Panel</div>
	</div>
	<div class='row'>
		<div class='col-md-4'>Menu Things</div>
		<div class='col-md-8'>Main Things</div>
	</div>
</div>
<script src="app/admin.js"></script>
</body>
</html>
