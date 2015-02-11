if( ! window ) {

	var window = function() {
		var innerWidth = 1920;
		var innerHeight = 1080;
	}

}
    var buildVersion = "0.1.0";

    var renderer, composer, scene, camera, stats;
    var videoTexture, videoFile;
    var DomeGroup, swipeMesh;

    var projector, raycaster, intersects;

    var renderZoom = 0.97;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var mouse = { x: 1, y: 1 }, INTERSECTED;
    var mouseX = 0;
    var mouseXOnMouseDown = 0;
    var isMouseDownOverBar = false;
    var isMouseDown = false;
    var targetRotation = 0;
    var targetRotationOnMouseDown = 0;
    var FixedSpeedActive = false;

    // These are the sprites used to create the glow effects.
    var LightGlowSprites;
    var DomeLightManager;
    var UIObjectManager;
    var SequenceManager;
    var Brushes = [];
    var ActiveBrushID = 1;
    var ActiveBrushData = [new THREE.Color(1, 1, 1), new THREE.Color(1, 0, 0)];
    
    var timer = 0.0;

    //Setup Settings
    var UseStubLights = true;
    var GraphicMode = true;
    var Aspect = [16, 9];
    var FPS = 40;
    
    var DEBUG = true;
    
    var scheduled = false;

    //Brush Data
    var FireEffectArray = [];
    var FireFrame;
    var flameArray = [new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40)];
    var flameArrayNext = [new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40),new Array(40)];

    //Pattern Brush Data
    var PatternBrushesImage = './textures/patterns/grad.png';
    var PatternBrushes = [];

    //Used for Debug Purposes
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        //console.log( item, loaded, total );
    };

    // Parameters used for the Sprite Glows on the lights
    {
        var attributes = {

            size: { type: 'f', value: [] },
            customColor: { type: 'c', value: [] }

        };

        var uniforms = {

            color: { type: "c", value: new THREE.Color(0xffffff) },
            texture: { type: "t", value: THREE.ImageUtils.loadTexture('textures/lensflare/lensflare0.png') }

        };

        var shaderMaterial = new THREE.ShaderMaterial({

            uniforms: uniforms,
            attributes: attributes,
            vertexShader: document.getElementById('vertexshader').textContent,
            fragmentShader: document.getElementById('fragmentshader').textContent,

            blending: THREE.AddOperation,
            depthTest: false,
            transparent: true

        });
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

    var DomeLightOrder = [137,129,123,198,33,27,34,120,124,130,138,139,131,125,121,35,28,40,46,45,215,214,209,208,205,204,152,153,252,253,155,154,147,146,206,207,212,213,47,41,42,48,49,211,210,142,143,148,149,156,157,254,255,159,158,151,150,145,144,141,140,51,50,44,43,57,56,62,61,227,226,221,220,217,216,172,173,257,175,174,167,166,218,219,224,225,63,64,58,59,60,66,65,223,222,162,163,168,169,176,177,258,259,179,178,171,170,165,164,161,160,67,74,239,238,232,229,228,92,93,240,241,95,94,87,86,230,231,236,237,76,75,70,71,72,77,235,82,88,96,242,243,233,256,248,133,132,192,193,196,197,202,203,29,30,31,201,200,195,194,126,127,134,135,249,250,136,128,122,199,32,26,25,24,251,11,18,19,100,101,104,105,110,111,118,119,247,246,117,116,109,108,103,102,186,187,17,16,9,10,5,21,22,23,37,39,38,36,20,1,4,3,8,7,14,15,189,188,183,182,106,107,114,115,245,244,113,112,180,181,184,185,190,191,13,12,80,81,84,85,90,91,98,99,97,89,83,234,78,79,6,73,2,69,0,52,54,53,55,68];

    var LightConversionArray=
        [[20,36,52,0,1],
        [22,38,54,69,4],
        [23,37,39,53,55,68,2,3,5,21],
        [27,41,43,57,59,71,73,8,10,25],
        [28,40,42,44,56,58,60,70,72,6,7,9,11,24,26],
        [34,46,48,50,62,64,66,75,77,79,14,16,18,30,32],
        [33,35,45,47,49,51,61,63,65,67,74,76,78,12,13,15,17,19,29,31],
        [199,120,215,213,211,140,227,225,223,160,239,237,235,80,191,189,187,100,203,201],
        [198,121,214,212,210,141,226,224,222,161,238,236,234,81,190,188,186,101,202,200],
        [122,124,209,207,142,144,221,219,162,164,233,231,82,84,185,183,102,104,197,195],
        [194,123,125,208,206,143,145,220,218,163,165,232,230,83,85,184,182,103,105,196],
        [126,128,130,205,146,148,150,217,166,168,170,229,86,88,90,181,106,108,110,193],
        [127,129,131,204,147,149,151,216,167,169,171,228,87,89,91,180,107,109,111,192],
        [134,136,138,152,154,156,158,172,174,176,178,92,94,96,98,112,114,116,118,132],
        [133,135,137,139,153,155,157,159,173,175,177,179,93,95,97,99,113,115,117,119],
        [248,249,250,251,252,253,254,255,256,257,258,259,240,241,242,243,244,245,246,247]];

    var DomeMappingArray=
        [["65a","64a","112a","111a","66a"],
        ["59a","63a","113a","110a","67a"],
        ["60a","61a","62a","114a","115a","116a","109a","68a","57a","58a"],
        ["6","40","65","66","90","134","108a","69a","56a","29a"],
        ["17","18","41","64","67","89","91","133","135","107a","70a","55a","32a","30a","28a"],
        ["7","19","42","63","68","88","92","132","136","106a","71a","54a","33a","11a","27a"],
        ["5","16","20","39","43","62","69","87","93","112","113","131","105a","92a","91a","72a","53a","34a","10a","12a"],
        ["26a","8","21","38","44","61","70","86","94","111","114","130","137","93a","90a","73a","52a","35a","9a","13a"],
        ["4","15","22","37","45","60","71","85","95","110","115","129","104a","94a","89a","74a","51a","36a","8a","14a"],
        ["25a","9","23","36","46","59","72","84","96","109","143","128","138","95a","88a","75a","50a","37a","7a","15a"],
        ["16a","3","14","24","35","47","58","73","83","97","108","116","127","103a","96a","87a","76a","49a","38a","6a"],
        ["17a","24a","10","25","34","48","57","74","82","98","107","117","126","139","97a","86a","77a","48a","39a","5a"],
        ["18a","2","13","26","33","49","56","75","81","99","106","118","125","102a","98a","85a","78a","47a","40a","4a"],
        ["19a","23a","11","27","32","50","55","76","80","100","105","119","124","140","99a","84a","79a","46a","41a","3a"],
        ["2a","20a","1","12","28","31","51","54","77","79","101","104","120","123","101a","100a","83a","80a","45a","42a"],
        ["1a","21a","22a","31a","29","30","52","53","144","78","102","103","121","122","141","142","82a","81a","44a","43a"]];

    function convertArrayMapping()
    {
        var lightRenderOrder = [];
        var lightOrder =[];

        for (var i=0; i<260; i++)
        {
            var lightIndex = GetLightInDome(i)

            var len = lightIndex.length;
            var realIndex = lightIndex;

            if(lightIndex.substring(len-1, len) == "a")
            {
                realIndex =  parseInt(lightIndex.substring(0, len-1)) + 144;
            }
            else
            {
                realIndex =  parseInt(lightIndex);

                if(realIndex == null)
                {
                    console.log(i);
                }
            }

            lightOrder.push(realIndex);
        }

        //console.log(JSON.stringify(lightOrder));
        console.log("ReadArraySize: " +lightOrder.length);

        for (var i=0; i < 260; i++)
        {
            if(lightRenderOrder[lightOrder[i]-1] != null)
            {
                console.log(lightRenderOrder[lightOrder[i]-1]);
            }
            lightRenderOrder[lightOrder[i]-1] = i;
        }
        console.log("FinalArraySize: " + lightRenderOrder.length);
        return lightRenderOrder;
    }

    function GetLightInDome(lightIndex)
    {
        for (var i=0, len=LightMatrixHeight; i<len; i++) {
            for (var j=0, len2=LightConversionArray[i].length; j<len2; j++) {
                if (LightConversionArray[i][j] === lightIndex)
                {
                    return DomeMappingArray[i][j];
                }
            }
        }
        return {x: -1, y: -1};
    }

    function Clone(obj) {

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = Clone(obj[i]);
            }
            return copy;
        }

        // Handle THREE.Color
        if (obj instanceof THREE.Color) {
            var copy = new THREE.Color;
            copy.copy(obj);
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = Clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
