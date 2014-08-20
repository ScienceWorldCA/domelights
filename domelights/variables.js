    var renderer, composer, scene, camera, stats;
    var DomeGroup, swipeMesh;

    var projector, raycaster, intersects;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var mouse = { x: 1, y: 1 }, INTERSECTED;
    var mouseX = 0;
    var mouseXOnMouseDown = 0;
    var isMouseDownOverBar = false;
    var isMouseDown = false;
    var targetRotation = 0;
    var targetRotationOnMouseDown = 0;

    var particles;

    //var vector = new THREE.Vector3();

    //var lightIndex = 0;
    var FPS = 40;

    var DomeLightManager;
    var UIObjectManager;
    var EventManager;
    var Brushes = [];
    var ActiveBrushID = 0;

    var Aspect = [16, 8];

    var videoTexture, videoFile;

    var brushColor = new THREE.Color();

    brushColor.setRGB(1,1,1);

    var timer = 0.0;


    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

        //console.log( item, loaded, total );

    };

    var attributes = {

        size:        { type: 'f', value: [] },
        customColor: { type: 'c', value: [] }

    };

    var uniforms = {

        color:   { type: "c", value: new THREE.Color( 0xffffff ) },
        texture: { type: "t", value: THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" ) }

    };

    var shaderMaterial = new THREE.ShaderMaterial( {

        uniforms: uniforms,
        attributes: attributes,
        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

        blending:       THREE.AddOperation,
        depthTest:      false,
        transparent:    true

    } );

    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    //This the logical mapping on the lights on the dome. This matrix can be used to look up the light id relative to the matrix.
    //Each light will have a matrix location so that it knows where it is.
    var LightMappingMatrix = [[-1, -1, -1, 20, -1, -1, -1, -1, -1, -1, -1, 36, -1, -1, -1, -1, -1, -1, -1, 52, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1],
        [-1, -1, -1, 22, -1, -1, -1, -1, -1, -1, -1, 38, -1, -1, -1, -1, -1, -1, -1, 54, -1, -1, -1, -1, -1, -1, -1, 69, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1],
        [-1, 21, -1, -1, -1, 23, -1, -1, -1, 37, -1, -1, -1, 39, -1, -1, -1, 53, -1, -1, -1, 55, -1, -1, -1, 68, -1, -1, -1, 2, -1, -1, -1, 3, -1, -1, -1, 5, -1, -1],
        [-1, 25, -1, -1, -1, 27, -1, -1, -1, 41, -1, -1, -1, 43, -1, -1, -1, 57, -1, -1, -1, 59, -1, -1, -1, 71, -1, -1, -1, 73, -1, -1, -1, 8, -1, -1, -1, 10, -1, -1],
        [24, -1, -1, 26, -1, -1, 28, -1, 40, -1, -1, 42, -1, -1, 44, -1, 56, -1, -1, 58, -1, -1, 60, -1, 70, -1, -1, 72, -1, -1, 6, -1, 7, -1, -1, 9, -1, -1, 11, -1],
        [-1, 30, -1, 32, -1, 34, -1, -1, -1, 46, -1, 48, -1, 50, -1, -1, -1, 62, -1, 64, -1, 66, -1, -1, -1, 75, -1, 77, -1, 79, -1, -1, -1, 14, -1, 16, -1, 18, -1, -1],
        [29, -1, 31, -1, 33, -1, 35, -1, 45, -1, 47, -1, 49, -1, 51, -1, 61, -1, 63, -1, 65, -1, 67, -1, 74, -1, 76, -1, 78, -1, 12, -1, 13, -1, 15, -1, 17, -1, 19, -1],
        [203, -1, 201, -1, 199, -1, 120, -1, 215, -1, 213, -1, 211, -1, 140, -1, 227, -1, 225, -1, 223, -1, 160, -1, 239, -1, 237, -1, 235, -1, 80, -1, 191, -1, 189, -1, 187, -1, 100, -1],
        [-1, 202, -1, 200, -1, 198, -1, 121, -1, 214, -1, 212, -1, 210, -1, 141, -1, 226, -1, 224, -1, 222, -1, 161, -1, 238, -1, 236, -1, 234, -1, 81, -1, 190, -1, 188, -1, 186, -1, 101],
        [-1, 197, -1, 195, -1, 122, -1, 124, -1, 209, -1, 207, -1, 142, -1, 144, -1, 221, -1, 219, -1, 162, -1, 164, -1, 233, -1, 231, -1, 82, -1, 84, -1, 185, -1, 183, -1, 102, -1, 104],
        [105, -1, 196, -1, 194, -1, 123, -1, 125, -1, 208, -1, 206, -1, 143, -1, 145, -1, 220, -1, 218, -1, 163, -1, 165, -1, 232, -1, 230, -1, 83, -1, 85, -1, 184, -1, 182, -1, 103, -1],
        [110, -1, 193, -1, 126, -1, 128, -1, 130, -1, 205, -1, 146, -1, 148, -1, 150, -1, 217, -1, 166, -1, 168, -1, 170, -1, 229, -1, 86, -1, 88, -1, 90, -1, 181, -1, 106, -1, 108, -1],
        [-1, 111, -1, 192, -1, 127, -1, 129, -1, 131, -1, 204, -1, 147, -1, 149, -1, 151, -1, 216, -1, 167, -1, 169, -1, 171, -1, 228, -1, 87, -1, 89, -1, 91, -1, 180, -1, 107, -1, 109],
        [-1, 118, -1, 132, -1, 134, -1, 136, -1, 138, -1, 152, -1, 154, -1, 156, -1, 158, -1, 172, -1, 174, -1, 176, -1, 178, -1, 92, -1, 94, -1, 96, -1, 98, -1, 112, -1, 114, -1, 116],
        [117, -1, 119, -1, 133, -1, 135, -1, 137, -1, 139, -1, 153, -1, 155, -1, 157, -1, 159, -1, 173, -1, 175, -1, 177, -1, 179, -1, 93, -1, 95, -1, 97, -1, 99, -1, 113, -1, 115, -1],
        [246, -1, 247, -1, 248, -1, 249, -1, 250, -1, 251, -1, 252, -1, 253, -1, 254, -1, 255, -1, 256, -1, 257, -1, 258, -1, 259, -1, 240, -1, 241, -1, 242, -1, 243, -1, 244, -1, 245, -1]];

    var LightMatrixWidth = LightMappingMatrix[0].length;
    var LightMatrixHeight = LightMappingMatrix.length;
