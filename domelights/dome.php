<!doctype html>
<html lang="en">
	<head>
		<title>Science World - Dome Lights</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				color: #ffffff;
				background-color: #111111;
				margin: 0px;
				overflow: hidden;
			}
			#info {
				position: absolute;
				top: 0px;
				width: 100%;
				padding: 5px;
				font-family: Monospace;
				font-size: 13px;
				text-align: center;
				font-weight: bold;
			}
			a {
				color: #fff;
			}
		</style>
		<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
		<script language="javascript">
		function DoPing() {
			var params = {};
			params.message = "Saved";

			document.getElementById('pingResult').innerHTML = "Saving...";
		
			$.getJSON(
				'/frontend_api/ping',
				$.param( params, true ),
				function( data ) {
					document.getElementById('pingResult').innerHTML = data.message;
				}
			);
		}
		</script>
	</head>

	<body>
		<div id="container"></div>
        <div id="info" >Science World - Dome Lights</div>
<div id="top" style="clear: both; width: 100%; height: 50px; bottom: 0px; position: absolute;"><button id="pingResult" onclick="DoPing();">Save</button></div>
		<script src="includes/three.min.js"></script>
		<script src="includes/jquery.min.js"></script>
		<script src="includes/js/loaders/OBJLoader.js"></script>
		<script src="includes/js/Detector.js"></script>
		<script src="includes/js/libs/stats.min.js"></script>

        <script src="includes/js/renderers/WebGLDeferredRenderer.js"></script>
        <script src="includes/js/ShaderDeferred.js"></script>
        <script src="includes/js/shaders/VignetteShader.js"></script>
        <script src="includes/js/shaders/CopyShader.js"></script>
        <script src="includes/js/postprocessing/EffectComposer.js"></script>
        <script src="includes/js/shaders/FXAAShader.js"></script>

        <script src="includes/js/postprocessing/EffectComposer.js"></script>
        <script src="includes/js/postprocessing/RenderPass.js"></script>
        <script src="includes/js/postprocessing/MaskPass.js"></script>
        <script src="includes/js/postprocessing/ShaderPass.js"></script>
        <script src="includes/js/shaders/ConvolutionShader.js"></script>
        <script src="includes/js/postprocessing/BloomPass.js"></script>

        <script type="x-shader/x-vertex" id="vertexshader">

			attribute float size;
			attribute vec3 customColor;

			varying vec3 vColor;

			void main() {

				vColor = customColor;

				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

				gl_PointSize = size * ( 300.0 / length( mvPosition.xyz ) );

				gl_Position = projectionMatrix * mvPosition;

			}

		</script>

        <script type="x-shader/x-fragment" id="fragmentshader">

			uniform vec3 color;
			uniform sampler2D texture;

			varying vec3 vColor;

			void main() {

				gl_FragColor = vec4( color * vColor, 1.0 );
				gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );

				//if ( gl_FragColor.a < ALPHATEST ) discard;

			}

		</script>

		<script src="variables.js"></script>
        <script src="lighting.js"></script>
		<script src="geometries.js"></script>
        <script src="createBrushes.js"></script>
		<script src="events.js"></script>
		<script src="init.js"></script>
		<script src="render.js"></script>
        <script src="renderPassSetup.js"></script>
        <script src="interface.js"></script>

        <script src="UI.js"></script>
        <script src="BRUSH.js"></script>
        <script src="LIGHT.js"></script>
        <script src="EVENT.js"></script>

        <script>

			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			//init.js
			init();

			//render.js
			animate();

		</script>

	</body>

</html>