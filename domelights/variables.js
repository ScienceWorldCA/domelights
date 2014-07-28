			var renderer, scene, camera, stats;
			var particles, uniforms, attributes;
			var DomeGroup, rotateMesh;
			var PARTICLE_SIZE = 100;

			var projector, raycaster, intersects;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;			
			var mouse = { x: 1, y: 1 }, INTERSECTED;
			var mouseX = 0;
			var mouseXOnMouseDown = 0;
			var targetRotation = 0;
			var targetRotationOnMouseDown = 0;			
			
			//var vector = new THREE.Vector3();
            var composer;
            var lights = [];
            var lightMeshes = [];
            var lightIndex = 0;

            var Aspect = [16, 9];


//            var textureFlare0 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" );
//            var textureFlare2 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare2.png" );
//            var textureFlare3 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare3.png" );

            var manager = new THREE.LoadingManager();
            manager.onProgress = function ( item, loaded, total ) {

                console.log( item, loaded, total );

            };