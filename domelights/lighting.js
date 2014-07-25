function setLighting()
{
    attributes = {

        size: {	type: 'f', value: [] },
        customColor: { type: 'c', value: [] }

    };

    uniforms = {

        amplitude: { type: "f", value: 1.0 },
        color:     { type: "c", value: new THREE.Color( 0xffffff ) },
        texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "textures/sprites/spark1.png" ) },

    };

    var shaderMaterial = new THREE.ShaderMaterial( {

        uniforms: 		uniforms,
        attributes:     attributes,
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

        blending: 		THREE.AdditiveBlending,
        depthTest: 		false,
        transparent:	true

    });


//    var radius = 200;
//    var geometry = new THREE.Geometry();
//
//    for ( var i = 0; i < 100000; i++ ) {
//
//        var vertex = new THREE.Vector3();
//        vertex.x = Math.random() * 2 - 1;
//        vertex.y = Math.random() * 2 - 1;
//        vertex.z = Math.random() * 2 - 1;
//        vertex.multiplyScalar( radius );
//
//        geometry.vertices.push( vertex );
//
//    }
//
//    sphere = new THREE.ParticleSystem( geometry, shaderMaterial );
//
//    sphere.dynamic = true;
//    //sphere.sortParticles = true;
//
//    var vertices = sphere.geometry.vertices;
//    var values_size = attributes.size.value;
//    var values_color = attributes.customColor.value;
//
//
//    for( var v = 0; v < vertices.length; v++ ) {
//
//        values_size[ v ] = 10;
//        values_color[ v ] = new THREE.Color( 0xffaa00 );
//
//        if ( vertices[ v ].x < 0 )
//            values_color[ v ].setHSL( 0.5 + 0.1 * ( v / vertices.length ), 0.7, 0.5 );
//        else
//            values_color[ v ].setHSL( 0.0 + 0.1 * ( v / vertices.length ), 0.9, 0.5 );
//
//    }
//
//    scene.add( sphere );

    addLights();
}

function addLights()
{
	light = new THREE.DirectionalLight( 0x111111 );
	light.position.set( .75, .75, .75 );
    scene.add( light );

    //Add all lights to the Dome Group

    //Light_Positions


    addLight(0xff0040, 8.34539985657, 80.5214004517, 6.06330776215, DomeGroup );
    addLight(0xff0040, 8.34539985657, 80.5214004517, -6.06329250336, DomeGroup );
    addLight(0xff0040, 27.0814990997, 75.4619979858, 6.13280773163, DomeGroup );
    addLight(0xff0040, 27.0814990997, 75.4619979858, -6.13259220123, DomeGroup );
    addLight(0xff0040, 16.7863006592, 78.0582962036, -12.195892334, DomeGroup );
    addLight(0xff0040, 14.2012996674, 75.4619979858, -23.8608932495, DomeGroup );
    addLight(0xff0040, 43.9016990662, 65.1651000977, 6.1751074791, DomeGroup );
    addLight(0xff0040, 43.9017982483, 65.1651000977, -6.17469215393, DomeGroup );
    addLight(0xff0040, 35.1209983826, 70.2935028076, -12.3073921204, DomeGroup );
    addLight(0xff0040, 33.1828994751, 67.7212982178, -24.1085929871, DomeGroup );
    addLight(0xff0040, 22.5583000183, 70.2935028076, -29.5986919403, DomeGroup );
    addLight(0xff0040, 19.4391994476, 65.1651000977, -39.8447914124, DomeGroup );
    addLight(0xff0040, 57.2803993225, 50.2779006958, 6.06350755692, DomeGroup );
    addLight(0xff0040, 57.2803993225, 50.2779006958, -6.06309223175, DomeGroup );
    addLight(0xff0040, 50.8282012939, 57.1179046631, -12.2379922867, DomeGroup );
    addLight(0xff0040, 49.6621017456, 53.6445999146, -23.9029922485, DomeGroup );
    addLight(0xff0040, 40.7975006104, 59.1195983887, -29.6408920288, DomeGroup );
    addLight(0xff0040, 38.0798988342, 53.6445999146, -39.8447914124, DomeGroup );
    addLight(0xff0040, 27.346200943, 57.1179046631, -44.55859375, DomeGroup );
    addLight(0xff0040, 23.467300415, 50.2779006958, -52.6030921936, DomeGroup );
    addLight(0xff0040, -3.18759965897, 80.5214004517, -9.81059265137, DomeGroup );
    addLight(0xff0040, 2.53630018234, 75.4619979858, -27.6510925293, DomeGroup );
    addLight(0xff0040, -6.41169929504, 78.0582962036, -19.7334918976, DomeGroup );
    addLight(0xff0040, -18.304599762, 75.4619979858, -20.8795928955, DomeGroup );
    addLight(0xff0040, 7.69390058517, 65.1651000977, -43.6611938477, DomeGroup );
    addLight(0xff0040, -0.852099716663, 70.2935028076, -37.205291748, DomeGroup );
    addLight(0xff0040, -12.6745004654, 67.7212982178, -39.0087928772, DomeGroup );
    addLight(0xff0040, -21.1791992188, 70.2935028076, -30.600692749, DomeGroup );
    addLight(0xff0040, -31.8875999451, 65.1651000977, -30.8004932404, DomeGroup );
    addLight(0xff0040, 11.9343004227, 50.2779006958, -56.3504905701, DomeGroup );
    addLight(0xff0040, 4.06780052185, 57.1179046631, -52.1222915649, DomeGroup );
    addLight(0xff0040, -7.38669967651, 53.6445999146, -54.617893219, DomeGroup );
    addLight(0xff0040, -15.5830001831, 59.1195983887, -47.9602928162, DomeGroup );
    addLight(0xff0040, -26.1273002625, 53.6445999146, -48.528793335, DomeGroup );
    addLight(0xff0040, -33.9272994995, 57.1179046631, -39.77709198, DomeGroup );
    addLight(0xff0040, -42.7766990662, 50.2779006958, -38.5739936829, DomeGroup );
    addLight(0xff0040, -10.3155002594, 80.5214004517, 7.62939453125e-06, DomeGroup );
    addLight(0xff0040, -25.513999939, 75.4619979858, -10.9567928314, DomeGroup );
    addLight(0xff0040, -20.7490005493, 78.0582962036, -9.23706029425e-05, DomeGroup );
    addLight(0xff0040, -25.5140991211, 75.4619979858, 10.9566078186, DomeGroup );
    addLight(0xff0040, -39.1467018127, 65.1651000977, -20.8093929291, DomeGroup );
    addLight(0xff0040, -35.6477012634, 70.2935028076, -10.6866922379, DomeGroup );
    addLight(0xff0040, -41.0162010193, 67.7212982178, -0.000192370600416, DomeGroup );
    addLight(0xff0040, -35.6477012634, 70.2935028076, 10.6864080429, DomeGroup );
    addLight(0xff0040, -39.146900177, 65.1651000977, 20.8091068268, DomeGroup );
    addLight(0xff0040, -49.9045982361, 50.2779006958, -28.7634925842, DomeGroup );
    addLight(0xff0040, -48.314201355, 57.1179046631, -19.9752922058, DomeGroup );
    addLight(0xff0040, -54.2274017334, 53.6445999146, -9.85269260406, DomeGroup );
    addLight(0xff0040, -50.4283981323, 59.1195983887, -0.000192370600416, DomeGroup );
    addLight(0xff0040, -54.2274017334, 53.6445999146, 9.85230731964, DomeGroup );
    addLight(0xff0040, -48.3143997192, 57.1179046631, 19.9750080109, DomeGroup );
    addLight(0xff0040, -49.904800415, 50.2779006958, 28.7631072998, DomeGroup );
    addLight(0xff0040, -3.18769979477, 80.5214004517, 9.81060791016, DomeGroup );
    addLight(0xff0040, -18.3048000336, 75.4619979858, 20.8795070648, DomeGroup );
    addLight(0xff0040, -6.41189956665, 78.0582962036, 19.7334079742, DomeGroup );
    addLight(0xff0040, 2.53600025177, 75.4619979858, 27.6512069702, DomeGroup );
    addLight(0xff0040, -31.8878993988, 65.1651000977, 30.8003082275, DomeGroup );
    addLight(0xff0040, -21.1793994904, 70.2935028076, 30.6006069183, DomeGroup );
    addLight(0xff0040, -12.6747999191, 67.7212982178, 39.0087089539, DomeGroup );
    addLight(0xff0040, -0.852299690247, 70.2935028076, 37.2053070068, DomeGroup );
    addLight(0xff0040, 7.6935005188, 65.1651000977, 43.6612091064, DomeGroup );
    addLight(0xff0040, -42.7770004272, 50.2779006958, 38.5737075806, DomeGroup );
    addLight(0xff0040, -33.9276008606, 57.1179046631, 39.7768058777, DomeGroup );
    addLight(0xff0040, -26.1277008057, 53.6445999146, 48.5286064148, DomeGroup );
    addLight(0xff0040, -15.5833997726, 59.1195983887, 47.9602088928, DomeGroup );
    addLight(0xff0040, -7.38709974289, 53.6445999146, 54.6179084778, DomeGroup );
    addLight(0xff0040, 4.06740045547, 57.1179046631, 52.1223068237, DomeGroup );
    addLight(0xff0040, 11.9338998795, 50.2779006958, 56.3506088257, DomeGroup );
    addLight(0xff0040, 14.2011003494, 75.4619979858, 23.8610076904, DomeGroup );
    addLight(0xff0040, 16.7861995697, 78.0582962036, 12.1960077286, DomeGroup );
    addLight(0xff0040, 19.4388999939, 65.1651000977, 39.8450088501, DomeGroup );
    addLight(0xff0040, 22.5580997467, 70.2935028076, 29.5989074707, DomeGroup );
    addLight(0xff0040, 33.1827011108, 67.7212982178, 24.1088085175, DomeGroup );
    addLight(0xff0040, 35.1208992004, 70.2935028076, 12.3077077866, DomeGroup );
    addLight(0xff0040, 23.4668998718, 50.2779006958, 52.6033058167, DomeGroup );
    addLight(0xff0040, 27.3458003998, 57.1179046631, 44.558807373, DomeGroup );
    addLight(0xff0040, 38.0796012878, 53.6445999146, 39.8451080322, DomeGroup );
    addLight(0xff0040, 40.7972984314, 59.1195983887, 29.6412067413, DomeGroup );
    addLight(0xff0040, 49.6619987488, 53.6445999146, 23.9034080505, DomeGroup );
    addLight(0xff0040, 50.8280982971, 57.1179046631, 12.2384080887, DomeGroup );
    addLight(0xff0040, 62.4380989075, 39.9624023438, 9.81080722809, DomeGroup );
    addLight(0xff0040, 65.6258010864, 33.5871047974, 0.00030762940878, DomeGroup );
    addLight(0xff0040, 64.6429977417, 23.6825008392, 21.2446079254, DomeGroup );
    addLight(0xff0040, 67.8974990845, 17.7304019928, 10.9570074081, DomeGroup );
    addLight(0xff0040, 68.0887985229, 23.1536006927, 0.000302741827909, DomeGroup );
    addLight(0xff0040, 67.8975982666, 17.7304019928, -10.9563922882, DomeGroup );
    addLight(0xff0040, 61.370300293, 6.88410139084, 31.0453071594, DomeGroup );
    addLight(0xff0040, 64.7844009399, 0.932101607323, 20.80950737, DomeGroup );
    addLight(0xff0040, 67.8065032959, 6.35520172119, 10.6868076324, DomeGroup );
    addLight(0xff0040, 67.9067993164, 0.403201639652, 0.000302622618619, DomeGroup );
    addLight(0xff0040, 67.806602478, 6.35520172119, -10.6862926483, DomeGroup );
    addLight(0xff0040, 64.7845993042, 0.932101607323, -20.8088932037, DomeGroup );
    addLight(0xff0040, 53.0922012329, -8.97259807587, 38.5741081238, DomeGroup );
    addLight(0xff0040, 56.2798995972, -15.3478984833, 28.763507843, DomeGroup );
    addLight(0xff0040, 61.6865997314, -10.8663988113, 19.9754085541, DomeGroup );
    addLight(0xff0040, 61.2243995667, -17.7085990906, 9.85280799866, DomeGroup );
    addLight(0xff0040, 64.4225006104, -11.8620986938, 0.000306556525175, DomeGroup );
    addLight(0xff0040, 61.2244987488, -17.7085990906, -9.85229206085, DomeGroup );
    addLight(0xff0040, 59.5371017456, -22.4189987183, 0.000206914133742, DomeGroup );
    addLight(0xff0040, 61.6866989136, -10.8663988113, -19.9748916626, DomeGroup );
    addLight(0xff0040, 56.2801017761, -15.3478984833, -28.7629928589, DomeGroup );
    addLight(0xff0040, 28.6250991821, 39.9624023438, -56.3503913879, DomeGroup );
    addLight(0xff0040, 20.2796993256, 33.5871047974, -62.4136924744, DomeGroup );
    addLight(0xff0040, 40.1805992126, 23.6825008392, -54.9141921997, DomeGroup );
    addLight(0xff0040, 31.4022006989, 17.7304019928, -61.1884918213, DomeGroup );
    addLight(0xff0040, 21.0408000946, 23.1536006927, -64.7561950684, DomeGroup );
    addLight(0xff0040, 10.5613002777, 17.7304019928, -67.9601898193, DomeGroup );
    addLight(0xff0040, 48.4902992249, 6.88410139084, -48.7731933594, DomeGroup );
    addLight(0xff0040, 39.8103981018, 0.932101607323, -55.1830940247, DomeGroup );
    addLight(0xff0040, 31.1172008514, 6.35520172119, -61.1853904724, DomeGroup );
    addLight(0xff0040, 20.9846000671, 0.403201639652, -64.5830917358, DomeGroup );
    addLight(0xff0040, 10.7901000977, 6.35520172119, -67.7901916504, DomeGroup );
    addLight(0xff0040, 0.229000300169, 0.932101607323, -68.044090271, DomeGroup );
    addLight(0xff0040, 53.0924987793, -8.97259807587, -38.5736923218, DomeGroup );
    addLight(0xff0040, 44.7471008301, -15.3478984833, -44.6369934082, DomeGroup );
    addLight(0xff0040, 38.0598983765, -10.8663988113, -52.4946937561, DomeGroup );
    addLight(0xff0040, 28.289899826, -17.7085990906, -55.1831932068, DomeGroup );
    addLight(0xff0040, 19.9078998566, -11.8620986938, -61.2692909241, DomeGroup );
    addLight(0xff0040, 9.54930019379, -17.7085990906, -61.2723922729, DomeGroup );
    addLight(0xff0040, 0.065000295639, -10.8663988113, -64.84009552, DomeGroup );
    addLight(0xff0040, -9.9638004303, -15.3478984833, -62.4138908386, DomeGroup );
    addLight(0xff0040, -44.746799469, 39.9624023438, -44.6372909546, DomeGroup );
    addLight(0xff0040, -53.0922012329, 33.5871047974, -38.574092865, DomeGroup );
    addLight(0xff0040, -39.8100013733, 23.6825008392, -55.1834907532, DomeGroup );
    addLight(0xff0040, -48.4898986816, 17.7304019928, -48.7734909058, DomeGroup );
    addLight(0xff0040, -55.0848007202, 23.1536006927, -40.0217933655, DomeGroup );
    addLight(0xff0040, -61.3703994751, 17.7304019928, -31.0452919006, DomeGroup );
    addLight(0xff0040, -31.4016990662, 6.88410139084, -61.1887931824, DomeGroup );
    addLight(0xff0040, -40.1801986694, 0.932101607323, -54.9144935608, DomeGroup );
    addLight(0xff0040, -48.5750999451, 6.35520172119, -48.5014915466, DomeGroup );
    addLight(0xff0040, -54.9375991821, 0.403201639652, -39.9147911072, DomeGroup );
    addLight(0xff0040, -61.1380004883, 6.35520172119, -31.2102928162, DomeGroup );
    addLight(0xff0040, -64.6429977417, 0.932101607323, -21.2445926666, DomeGroup );
    addLight(0xff0040, -20.2791996002, -8.97259807587, -62.4138908386, DomeGroup );
    addLight(0xff0040, -28.6247005463, -15.3478984833, -56.350692749, DomeGroup );
    addLight(0xff0040, -38.1641998291, -10.8663988113, -52.4188919067, DomeGroup );
    addLight(0xff0040, -43.7402992249, -17.7085990906, -43.9577941895, DomeGroup );
    addLight(0xff0040, -52.1186981201, -11.8620986938, -37.8667907715, DomeGroup );
    addLight(0xff0040, -55.3227005005, -17.7085990906, -28.0161914825, DomeGroup );
    addLight(0xff0040, -61.6465988159, -10.8663988113, -20.0984916687, DomeGroup );
    addLight(0xff0040, -62.4380989075, -15.3478984833, -9.8107919693, DomeGroup );
    addLight(0xff0040, -56.2801017761, 39.9624023438, 28.7630081177, DomeGroup );
    addLight(0xff0040, -53.0924987793, 33.5871047974, 38.5737075806, DomeGroup );
    addLight(0xff0040, -64.7845993042, 23.6825008392, 20.8090076447, DomeGroup );
    addLight(0xff0040, -61.3706016541, 17.7304019928, 31.0448074341, DomeGroup );
    addLight(0xff0040, -55.0850982666, 23.1536006927, 40.0214080811, DomeGroup );
    addLight(0xff0040, -48.4902992249, 17.7304019928, 48.7732086182, DomeGroup );
    addLight(0xff0040, -67.8975982666, 6.88410139084, 10.956407547, DomeGroup );
    addLight(0xff0040, -64.6432037354, 0.932101607323, 21.2441082001, DomeGroup );
    addLight(0xff0040, -61.1381988525, 6.35520172119, 31.2099075317, DomeGroup );
    addLight(0xff0040, -54.9379005432, 0.403201639652, 39.9144058228, DomeGroup );
    addLight(0xff0040, -48.5754013062, 6.35520172119, 48.5011062622, DomeGroup );
    addLight(0xff0040, -40.1805992126, 0.932101607323, 54.9142074585, DomeGroup );
    addLight(0xff0040, -65.6258010864, -8.97259807587, -0.000292370619718, DomeGroup );
    addLight(0xff0040, -62.4382019043, -15.3478984833, 9.81040763855, DomeGroup );
    addLight(0xff0040, -61.6467018127, -10.8663988113, 20.0980072021, DomeGroup );
    addLight(0xff0040, -55.3228988647, -17.7085990906, 28.0158081055, DomeGroup );
    addLight(0xff0040, -52.1189994812, -11.8620986938, 37.8664093018, DomeGroup );
    addLight(0xff0040, -43.7406005859, -17.7085990906, 43.9575080872, DomeGroup );
    addLight(0xff0040, -38.1646003723, -10.8663988113, 52.4186058044, DomeGroup );
    addLight(0xff0040, -28.6250991821, -15.3478984833, 56.3504066467, DomeGroup );
    addLight(0xff0040, 9.9638004303, 39.9624023438, 62.4139060974, DomeGroup );
    addLight(0xff0040, 20.2791996002, 33.5871047974, 62.4139060974, DomeGroup );
    addLight(0xff0040, -0.228999704123, 23.6825008392, 68.0441055298, DomeGroup );
    addLight(0xff0040, 10.5607995987, 17.7304019928, 67.9603042603, DomeGroup );
    addLight(0xff0040, 21.0403003693, 23.1536006927, 64.7564086914, DomeGroup );
    addLight(0xff0040, 31.4016990662, 17.7304019928, 61.1888084412, DomeGroup );
    addLight(0xff0040, -10.5613002777, 6.88410139084, 67.9602050781, DomeGroup );
    addLight(0xff0040, 0.228500291705, 0.932101607323, 68.0441055298, DomeGroup );
    addLight(0xff0040, 10.7896003723, 6.35520172119, 67.7903060913, DomeGroup );
    addLight(0xff0040, 20.9841003418, 0.403201639652, 64.5833053589, DomeGroup );
    addLight(0xff0040, 31.1166992188, 6.35520172119, 61.1857070923, DomeGroup );
    addLight(0xff0040, 39.8100013733, 0.932101607323, 55.183506012, DomeGroup );
    addLight(0xff0040, -20.2796993256, -8.97259807587, 62.4137077332, DomeGroup );
    addLight(0xff0040, -9.96420001984, -15.3478984833, 62.4138069153, DomeGroup );
    addLight(0xff0040, 0.0645002946258, -10.8663988113, 64.8401107788, DomeGroup );
    addLight(0xff0040, -0.492399692535, -22.4159984589, 60.3782081604, DomeGroup );
    addLight(0xff0040, 9.54889965057, -17.7085990906, 61.2725067139, DomeGroup );
    addLight(0xff0040, 19.9074001312, -11.8620986938, 61.2695083618, DomeGroup );
    addLight(0xff0040, 28.2894992828, -17.7085990906, 55.1834068298, DomeGroup );
    addLight(0xff0040, 38.0595016479, -10.8663988113, 52.4950065613, DomeGroup );
    addLight(0xff0040, 44.746799469, -15.3478984833, 44.6373062134, DomeGroup );
    addLight(0xff0040, 50.645401001, -22.4072990417, -36.795791626, DomeGroup );
    addLight(0xff0040, 55.0850982666, 1.460901618, -40.0213928223, DomeGroup );
    addLight(0xff0040, 61.3706016541, 6.88410139084, -31.0447921753, DomeGroup );
    addLight(0xff0040, 48.5754013062, 18.2593021393, -48.5010910034, DomeGroup );
    addLight(0xff0040, 54.9379005432, 24.2113018036, -39.914390564, DomeGroup );
    addLight(0xff0040, 61.1381988525, 18.2593021393, -31.2097930908, DomeGroup );
    addLight(0xff0040, 64.6432037354, 23.6825008392, -21.2440929413, DomeGroup );
    addLight(0xff0040, 38.1646995544, 35.4809036255, -52.4185905457, DomeGroup );
    addLight(0xff0040, 43.7406005859, 42.3231048584, -43.9574928284, DomeGroup );
    addLight(0xff0040, 52.1189994812, 36.4766998291, -37.866394043, DomeGroup );
    addLight(0xff0040, 55.3228988647, 42.3231048584, -28.0156917572, DomeGroup );
    addLight(0xff0040, 61.6467018127, 35.4809036255, -20.0979919434, DomeGroup );
    addLight(0xff0040, 62.4382019043, 39.9624023438, -9.81039237976, DomeGroup );
    addLight(0xff0040, -19.344499588, -22.4072990417, -59.5371932983, DomeGroup );
    addLight(0xff0040, -21.0403003693, 1.460901618, -64.7563934326, DomeGroup );
    addLight(0xff0040, -10.5607995987, 6.88410139084, -67.9602890015, DomeGroup );
    addLight(0xff0040, -31.1166992188, 18.2593021393, -61.1856918335, DomeGroup );
    addLight(0xff0040, -20.9841003418, 24.2113018036, -64.5832901001, DomeGroup );
    addLight(0xff0040, -10.7896003723, 18.2593021393, -67.7902908325, DomeGroup );
    addLight(0xff0040, -0.228499695659, 23.6825008392, -68.044090271, DomeGroup );
    addLight(0xff0040, -38.0595016479, 35.4809036255, -52.4949913025, DomeGroup );
    addLight(0xff0040, -28.2894992828, 42.3231048584, -55.183391571, DomeGroup );
    addLight(0xff0040, -19.9074001312, 36.4766998291, -61.269493103, DomeGroup );
    addLight(0xff0040, -9.54889965057, 42.3231048584, -61.2724914551, DomeGroup );
    addLight(0xff0040, -0.0644996985793, 35.4809036255, -64.84009552, DomeGroup );
    addLight(0xff0040, 9.96420001984, 39.9624023438, -62.4137916565, DomeGroup );
    addLight(0xff0040, -62.6010017395, -22.4072990417, -0.000192370600416, DomeGroup );
    addLight(0xff0040, -68.0887985229, 1.460901618, -0.000292370619718, DomeGroup );
    addLight(0xff0040, -67.8974990845, 6.88410139084, -10.9569921494, DomeGroup );
    addLight(0xff0040, -67.806602478, 18.2593021393, 10.6863079071, DomeGroup );
    addLight(0xff0040, -67.9067993164, 24.2113018036, -0.000292370619718, DomeGroup );
    addLight(0xff0040, -67.8065032959, 18.2593021393, -10.6867923737, DomeGroup );
    addLight(0xff0040, -64.7844009399, 23.6825008392, -20.8094921112, DomeGroup );
    addLight(0xff0040, -61.6866989136, 35.4809036255, 19.9749069214, DomeGroup );
    addLight(0xff0040, -61.2244987488, 42.3231048584, 9.85230731964, DomeGroup );
    addLight(0xff0040, -64.4225006104, 36.4766998291, -0.000292370619718, DomeGroup );
    addLight(0xff0040, -61.2243995667, 42.3231048584, -9.85279273987, DomeGroup );
    addLight(0xff0040, -61.6865997314, 35.4809036255, -19.9753932953, DomeGroup );
    addLight(0xff0040, -56.2798995972, 39.9624023438, -28.7634925842, DomeGroup );
    addLight(0xff0040, -19.3449993134, -22.4072990417, 59.5370063782, DomeGroup );
    addLight(0xff0040, -21.0408000946, 1.460901618, 64.7562103271, DomeGroup );
    addLight(0xff0040, -31.4022006989, 6.88410139084, 61.1885070801, DomeGroup );
    addLight(0xff0040, -10.7901000977, 18.2593021393, 67.7902069092, DomeGroup );
    addLight(0xff0040, -20.9846000671, 24.2113018036, 64.5831069946, DomeGroup );
    addLight(0xff0040, -31.117099762, 18.2593021393, 61.1854057312, DomeGroup );
    addLight(0xff0040, -39.8103981018, 23.6825008392, 55.1832084656, DomeGroup );
    addLight(0xff0040, -0.0649996995926, 35.4809036255, 64.8401107788, DomeGroup );
    addLight(0xff0040, -9.54930019379, 42.3231048584, 61.2725067139, DomeGroup );
    addLight(0xff0040, -19.9078998566, 36.4766998291, 61.2693061829, DomeGroup );
    addLight(0xff0040, -28.289899826, 42.3231048584, 55.1832084656, DomeGroup );
    addLight(0xff0040, -38.0598983765, 35.4809036255, 52.4947090149, DomeGroup );
    addLight(0xff0040, -44.7471008301, 39.9624023438, 44.637008667, DomeGroup );
    addLight(0xff0040, 50.6450996399, -22.4072990417, 36.796207428, DomeGroup );
    addLight(0xff0040, 55.0848007202, 1.460901618, 40.0218086243, DomeGroup );
    addLight(0xff0040, 48.4898986816, 6.88410139084, 48.7735061646, DomeGroup );
    addLight(0xff0040, 61.1380004883, 18.2593021393, 31.210308075, DomeGroup );
    addLight(0xff0040, 54.9375991821, 24.2113018036, 39.914806366, DomeGroup );
    addLight(0xff0040, 48.5750999451, 18.2593021393, 48.5015068054, DomeGroup );
    addLight(0xff0040, 40.1801986694, 23.6825008392, 54.9145088196, DomeGroup );
    addLight(0xff0040, 61.6465988159, 35.4809036255, 20.0985069275, DomeGroup );
    addLight(0xff0040, 55.3227005005, 42.3231048584, 28.0162067413, DomeGroup );
    addLight(0xff0040, 52.1186981201, 36.4766998291, 37.8668060303, DomeGroup );
    addLight(0xff0040, 43.7402992249, 42.3231048584, 43.9578094482, DomeGroup );
    addLight(0xff0040, 38.1641998291, 35.4809036255, 52.4189071655, DomeGroup );
    addLight(0xff0040, 28.6247005463, 39.9624023438, 56.3507080078, DomeGroup );
    addLight(0xff0040, 57.2709007263, -22.4159984589, 19.1262073517, DomeGroup );
    addLight(0xff0040, 57.2710990906, -22.4159984589, -19.1256923676, DomeGroup );
    addLight(0xff0040, 35.8877983093, -22.4159984589, -48.5575904846, DomeGroup );
    addLight(0xff0040, 18.3981990814, -22.4189987183, -56.6230926514, DomeGroup );
    addLight(0xff0040, -0.491899698973, -22.4159984589, -60.3781929016, DomeGroup );
    addLight(0xff0040, -35.09, -22.41, -49.13, DomeGroup );
    addLight(0xff0040, -48.16, -22.41, -34.99, DomeGroup );
    addLight(0xff0040, -57.57, -22.41, -18.19, DomeGroup );
    addLight(0xff0040, -57.57, -22.41, 18.18, DomeGroup );
    addLight(0xff0040, -48.16, -22.41, 34.99, DomeGroup );
    addLight(0xff0040, -35.09, -22.41, 49.13, DomeGroup );
    addLight(0xff0040, 18.39, -22.41, 56.62, DomeGroup );
    addLight(0xff0040, 35.88, -22.41, 48.55, DomeGroup );

}

function addLight( lightColor, x, y, z, localScene ) {

    // Add Light
    var light = new THREE.PointLight( 0xffffff, 2.0, 50 );
    var c = new THREE.Vector3();
    c.set( Math.random(), Math.random(), Math.random() ).normalize();
    light.color.setRGB( c.x, c.y, c.z );
    light.position.set( x, y, z );
    localScene.add( light );
    lights.push(light);

    // Geo Balls
    var sphere = new THREE.SphereGeometry( 1.5, 4, 4 );
    var sphereLight = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: light.color } ) );
    sphereLight.position = light.position;
    localScene.add( sphereLight );
    lightMeshes.push(light);



    // Fares

//    var flareColor = new THREE.Color( 0xffffff );
//    flareColor.setRGB( c.x, c.y, c.z );
//
//    var lensFlare = new THREE.LensFlare( textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );
//
////     lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
////     lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
////     lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
////
////     lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
////     lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
////     lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
////     lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );
//
//     lensFlare.customUpdateCallback = lensFlareUpdateCallback;
//     lensFlare.position = light.position;
//
//     localScene.add( lensFlare );

}

function setLightColor(color, index)
{
    var c = new THREE.Vector3();
    c.set( Math.random(), Math.random(), Math.random() ).normalize();
    lights[index].color.setRGB( c.x, c.y, c.z );
    lightMeshes[index].color.setRGB( c.x, c.y, c.z );
}

function updateRndLights()
{
    for (i = 0; i < 10; i++) {
        lightIndex += 53;
        lightIndex = lightIndex % 260;
        setLightColor(0x101010, lightIndex);
    }
}



function lensFlareUpdateCallback( object ) {

    var f, fl = object.lensFlares.length;
    var flare;
    var vecX = -object.positionScreen.x * 2;
    var vecY = -object.positionScreen.y * 2;


    for( f = 0; f < fl; f++ ) {

        flare = object.lensFlares[ f ];

        flare.x = object.positionScreen.x + vecX * flare.distance;
        flare.y = object.positionScreen.y + vecY * flare.distance;

        flare.rotation = 0;

    }

    //object.lensFlares[ 2 ].y += 0.025;
    //object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );

}