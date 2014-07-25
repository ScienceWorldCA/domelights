			var renderer, scene, camera, stats;
			var particles, uniforms, attributes;
			var icosahedronMesh, squareMesh1, squareMesh2;
			var PARTICLE_SIZE = 100;

			var projector, raycaster, intersects;
			var mouse = { x: 1, y: 1 }, INTERSECTED;
			var vector = new THREE.Vector3();
            var composer;
            var lights = [];
            var lightMeshes = [];
            var lightIndex = 0;


            var textureFlare0 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" );
            var textureFlare2 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare2.png" );
            var textureFlare3 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare3.png" );

            var manager = new THREE.LoadingManager();
            manager.onProgress = function ( item, loaded, total ) {

                console.log( item, loaded, total );

            };