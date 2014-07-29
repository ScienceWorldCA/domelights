function setLighting()
{
    addLights();
}

function addLights()
{
	light = new THREE.DirectionalLight( 0x222222 );
	light.position.set( .75, .75, .75 );
    scene.add( light );

    //Add all lights to the Dome Group
    addLightPositions();
}

function addLight( lightColor, x, y, z, localScene ) {

    // Add Light
    var light = new THREE.PointLight( new THREE.Color( 1, 1, 1 ), 2, 10 );
    //var c = new THREE.Vector3();
    //c.set( Math.random(), Math.random(), Math.random() ).normalize();
    //light.color.setRGB( c.x, c.y, c.z );
    light.position.set( x, y, z );
    localScene.add( light );
    lights.push(light);

    // Geo Balls
    var sphere = new THREE.SphereGeometry( 8, 4, 4 );
    var sphereLight = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 1, transparent: true } ) );
    sphereLight.position = light.position;
    localScene.add( sphereLight );
    lightMeshes.push(sphereLight);

    // Fares

//    var flareColor = new THREE.Color( 0xffffff );
//    flareColor.setRGB( c.x, c.y, c.z );
//
//    var lensFlare = new THREE.LensFlare( textureFlare0, 700, 0.0, THREE.AddOperation, flareColor );
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
	//console.log('Col: ' + color.r);
    lights[index].color.setRGB( color.r, color.g, color.b );
    //lightMeshes[index].color.setRGB( c.x, c.y, c.z );
}

function updateLights()
{
    for (i = 0; i < 260; i++) {
	
        var color = new THREE.Color();
		color = lights[i].color;
		//var newColor = new THREE.Color();
		//console.log('Col: ' + color.l);
		if(color.r > 0)
		{
			color.r -= 0.03;
			color.g -= 0.03;
			color.b -= 0.03;
			
			setLightColor(color, i);
		}
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


function addLightPositions()
{
    //Light_Positions
    addLight(0xff0040, 8.34539985657, 80.6445007324, 6.06330013275, DomeGroup );
    addLight(0xff0040, 8.34539985657, 80.6445007324, -6.06330013275, DomeGroup );
    addLight(0xff0040, 27.0814990997, 75.5850982666, 6.13280010223, DomeGroup );
    addLight(0xff0040, 27.0814990997, 75.5850982666, -6.13259983063, DomeGroup );
    addLight(0xff0040, 16.7863006592, 78.1813964844, -12.1958999634, DomeGroup );
    addLight(0xff0040, 14.2012996674, 75.5850982666, -23.8609008789, DomeGroup );
    addLight(0xff0040, 43.9016990662, 65.2882003784, 6.1750998497, DomeGroup );
    addLight(0xff0040, 43.9017982483, 65.2882003784, -6.17469978333, DomeGroup );
    addLight(0xff0040, 35.1209983826, 70.4166030884, -12.3073997498, DomeGroup );
    addLight(0xff0040, 33.1828994751, 67.8443984985, -24.1086006165, DomeGroup );
    addLight(0xff0040, 22.5583000183, 70.4166030884, -29.5986995697, DomeGroup );
    addLight(0xff0040, 19.4391994476, 65.2882003784, -39.8447990417, DomeGroup );
    addLight(0xff0040, 57.2803993225, 50.4010009766, 6.06349992752, DomeGroup );
    addLight(0xff0040, 57.2803993225, 50.4010009766, -6.06309986115, DomeGroup );
    addLight(0xff0040, 50.8282012939, 57.2410011292, -12.2379999161, DomeGroup );
    addLight(0xff0040, 49.6621017456, 53.7677001953, -23.9029998779, DomeGroup );
    addLight(0xff0040, 40.7975006104, 59.2426986694, -29.6408996582, DomeGroup );
    addLight(0xff0040, 38.0798988342, 53.7677001953, -39.8447990417, DomeGroup );
    addLight(0xff0040, 27.346200943, 57.2410011292, -44.5586013794, DomeGroup );
    addLight(0xff0040, 23.467300415, 50.4010009766, -52.603099823, DomeGroup );
    addLight(0xff0040, -3.18759989738, 80.6445007324, -9.81060028076, DomeGroup );
    addLight(0xff0040, 2.53629994392, 75.5850982666, -27.6511001587, DomeGroup );
    addLight(0xff0040, -6.41169977188, 78.1813964844, -19.733499527, DomeGroup );
    addLight(0xff0040, -18.304599762, 75.5850982666, -20.8796005249, DomeGroup );
    addLight(0xff0040, 7.69390010834, 65.2882003784, -43.6612014771, DomeGroup );
    addLight(0xff0040, -0.852100014687, 70.4166030884, -37.2052993774, DomeGroup );
    addLight(0xff0040, -12.6745004654, 67.8443984985, -39.0088005066, DomeGroup );
    addLight(0xff0040, -21.1791992188, 70.4166030884, -30.6007003784, DomeGroup );
    addLight(0xff0040, -31.8875999451, 65.2882003784, -30.8005008698, DomeGroup );
    addLight(0xff0040, 11.9343004227, 50.4010009766, -56.3504981995, DomeGroup );
    addLight(0xff0040, 4.06780004501, 57.2410011292, -52.1222991943, DomeGroup );
    addLight(0xff0040, -7.38670015335, 53.7677001953, -54.6179008484, DomeGroup );
    addLight(0xff0040, -15.5830001831, 59.2426986694, -47.9603004456, DomeGroup );
    addLight(0xff0040, -26.1273002625, 53.7677001953, -48.5288009644, DomeGroup );
    addLight(0xff0040, -33.9272994995, 57.2410011292, -39.7770996094, DomeGroup );
    addLight(0xff0040, -42.7766990662, 50.4010009766, -38.5740013123, DomeGroup );
    addLight(0xff0040, -10.3155002594, 80.6445007324, 0.0, DomeGroup );
    addLight(0xff0040, -25.513999939, 75.5850982666, -10.9568004608, DomeGroup );
    addLight(0xff0040, -20.7490005493, 78.1813964844, -9.99999974738e-05, DomeGroup );
    addLight(0xff0040, -25.5140991211, 75.5850982666, 10.9566001892, DomeGroup );
    addLight(0xff0040, -39.1467018127, 65.2882003784, -20.8094005585, DomeGroup );
    addLight(0xff0040, -35.6477012634, 70.4166030884, -10.6866998672, DomeGroup );
    addLight(0xff0040, -41.0162010193, 67.8443984985, -0.000199999994948, DomeGroup );
    addLight(0xff0040, -35.6477012634, 70.4166030884, 10.6864004135, DomeGroup );
    addLight(0xff0040, -39.146900177, 65.2882003784, 20.8090991974, DomeGroup );
    addLight(0xff0040, -49.9045982361, 50.4010009766, -28.7635002136, DomeGroup );
    addLight(0xff0040, -48.314201355, 57.2410011292, -19.9752998352, DomeGroup );
    addLight(0xff0040, -54.2274017334, 53.7677001953, -9.85270023346, DomeGroup );
    addLight(0xff0040, -50.4283981323, 59.2426986694, -0.000199999994948, DomeGroup );
    addLight(0xff0040, -54.2274017334, 53.7677001953, 9.85229969025, DomeGroup );
    addLight(0xff0040, -48.3143997192, 57.2410011292, 19.9750003815, DomeGroup );
    addLight(0xff0040, -49.904800415, 50.4010009766, 28.7630996704, DomeGroup );
    addLight(0xff0040, -3.18770003319, 80.6445007324, 9.81060028076, DomeGroup );
    addLight(0xff0040, -18.3048000336, 75.5850982666, 20.8794994354, DomeGroup );
    addLight(0xff0040, -6.41190004349, 78.1813964844, 19.7334003448, DomeGroup );
    addLight(0xff0040, 2.53600001335, 75.5850982666, 27.6511993408, DomeGroup );
    addLight(0xff0040, -31.8878993988, 65.2882003784, 30.8003005981, DomeGroup );
    addLight(0xff0040, -21.1793994904, 70.4166030884, 30.6005992889, DomeGroup );
    addLight(0xff0040, -12.6747999191, 67.8443984985, 39.0087013245, DomeGroup );
    addLight(0xff0040, -0.85229998827, 70.4166030884, 37.2052993774, DomeGroup );
    addLight(0xff0040, 7.69350004196, 65.2882003784, 43.6612014771, DomeGroup );
    addLight(0xff0040, -42.7770004272, 50.4010009766, 38.5736999512, DomeGroup );
    addLight(0xff0040, -33.9276008606, 57.2410011292, 39.7767982483, DomeGroup );
    addLight(0xff0040, -26.1277008057, 53.7677001953, 48.5285987854, DomeGroup );
    addLight(0xff0040, -15.5833997726, 59.2426986694, 47.9602012634, DomeGroup );
    addLight(0xff0040, -7.38710021973, 53.7677001953, 54.6179008484, DomeGroup );
    addLight(0xff0040, 4.06739997864, 57.2410011292, 52.1222991943, DomeGroup );
    addLight(0xff0040, 11.9338998795, 50.4010009766, 56.3506011963, DomeGroup );
    addLight(0xff0040, 14.2011003494, 75.5850982666, 23.861000061, DomeGroup );
    addLight(0xff0040, 16.7861995697, 78.1813964844, 12.1960000992, DomeGroup );
    addLight(0xff0040, 19.4388999939, 65.2882003784, 39.8450012207, DomeGroup );
    addLight(0xff0040, 22.5580997467, 70.4166030884, 29.5988998413, DomeGroup );
    addLight(0xff0040, 33.1827011108, 67.8443984985, 24.1088008881, DomeGroup );
    addLight(0xff0040, 35.1208992004, 70.4166030884, 12.3077001572, DomeGroup );
    addLight(0xff0040, 23.4668998718, 50.4010009766, 52.6032981873, DomeGroup );
    addLight(0xff0040, 27.3458003998, 57.2410011292, 44.5587997437, DomeGroup );
    addLight(0xff0040, 38.0796012878, 53.7677001953, 39.8451004028, DomeGroup );
    addLight(0xff0040, 40.7972984314, 59.2426986694, 29.6411991119, DomeGroup );
    addLight(0xff0040, 49.6619987488, 53.7677001953, 23.9034004211, DomeGroup );
    addLight(0xff0040, 50.8280982971, 57.2410011292, 12.2384004593, DomeGroup );
    addLight(0xff0040, 62.4380989075, 40.0854988098, 9.81079959869, DomeGroup );
    addLight(0xff0040, 65.6258010864, 33.7102012634, 0.000300000014249, DomeGroup );
    addLight(0xff0040, 64.6429977417, 23.8055992126, 21.244600296, DomeGroup );
    addLight(0xff0040, 67.8974990845, 17.8535003662, 10.9569997787, DomeGroup );
    addLight(0xff0040, 68.0887985229, 23.2766990662, 0.000300000014249, DomeGroup );
    addLight(0xff0040, 67.8975982666, 17.8535003662, -10.9563999176, DomeGroup );
    addLight(0xff0040, 61.370300293, 7.00719976425, 31.04529953, DomeGroup );
    addLight(0xff0040, 64.7844009399, 1.05519998074, 20.8094997406, DomeGroup );
    addLight(0xff0040, 67.8065032959, 6.4783000946, 10.6868000031, DomeGroup );
    addLight(0xff0040, 67.9067993164, 0.526300013065, 0.000300000014249, DomeGroup );
    addLight(0xff0040, 67.806602478, 6.4783000946, -10.6863002777, DomeGroup );
    addLight(0xff0040, 64.7845993042, 1.05519998074, -20.8089008331, DomeGroup );
    addLight(0xff0040, 53.0922012329, -8.84949970245, 38.5741004944, DomeGroup );
    addLight(0xff0040, 56.2798995972, -15.2248001099, 28.7635002136, DomeGroup );
    addLight(0xff0040, 61.6865997314, -10.7433004379, 19.9754009247, DomeGroup );
    addLight(0xff0040, 61.2243995667, -17.5855007172, 9.85280036926, DomeGroup );
    addLight(0xff0040, 64.4225006104, -11.7390003204, 0.000300000014249, DomeGroup );
    addLight(0xff0040, 61.2244987488, -17.5855007172, -9.85229969025, DomeGroup );
    addLight(0xff0040, 61.6866989136, -10.7433004379, -19.974899292, DomeGroup );
    addLight(0xff0040, 56.2801017761, -15.2248001099, -28.7630004883, DomeGroup );
    addLight(0xff0040, 28.6250991821, 40.0854988098, -56.3503990173, DomeGroup );
    addLight(0xff0040, 20.2796993256, 33.7102012634, -62.4137001038, DomeGroup );
    addLight(0xff0040, 40.1805992126, 23.8055992126, -54.9141998291, DomeGroup );
    addLight(0xff0040, 31.4022006989, 17.8535003662, -61.1884994507, DomeGroup );
    addLight(0xff0040, 21.0408000946, 23.2766990662, -64.7562026978, DomeGroup );
    addLight(0xff0040, 10.5613002777, 17.8535003662, -67.9601974487, DomeGroup );
    addLight(0xff0040, 48.4902992249, 7.00719976425, -48.7732009888, DomeGroup );
    addLight(0xff0040, 39.8103981018, 1.05519998074, -55.1831016541, DomeGroup );
    addLight(0xff0040, 31.1172008514, 6.4783000946, -61.1853981018, DomeGroup );
    addLight(0xff0040, 20.9846000671, 0.526300013065, -64.5830993652, DomeGroup );
    addLight(0xff0040, 10.7901000977, 6.4783000946, -67.7901992798, DomeGroup );
    addLight(0xff0040, 0.229000002146, 1.05519998074, -68.0440979004, DomeGroup );
    addLight(0xff0040, 53.0924987793, -8.84949970245, -38.5736999512, DomeGroup );
    addLight(0xff0040, 44.7471008301, -15.2248001099, -44.6370010376, DomeGroup );
    addLight(0xff0040, 38.0598983765, -10.7433004379, -52.4947013855, DomeGroup );
    addLight(0xff0040, 28.289899826, -17.5855007172, -55.1832008362, DomeGroup );
    addLight(0xff0040, 19.9078998566, -11.7390003204, -61.2692985535, DomeGroup );
    addLight(0xff0040, 9.54930019379, -17.5855007172, -61.2723999023, DomeGroup );
    addLight(0xff0040, 0.0649999976158, -10.7433004379, -64.8401031494, DomeGroup );
    addLight(0xff0040, -9.9638004303, -15.2248001099, -62.413898468, DomeGroup );
    addLight(0xff0040, -44.746799469, 40.0854988098, -44.637298584, DomeGroup );
    addLight(0xff0040, -53.0922012329, 33.7102012634, -38.5741004944, DomeGroup );
    addLight(0xff0040, -39.8100013733, 23.8055992126, -55.1834983826, DomeGroup );
    addLight(0xff0040, -48.4898986816, 17.8535003662, -48.7734985352, DomeGroup );
    addLight(0xff0040, -55.0848007202, 23.2766990662, -40.0218009949, DomeGroup );
    addLight(0xff0040, -61.3703994751, 17.8535003662, -31.04529953, DomeGroup );
    addLight(0xff0040, -31.4016990662, 7.00719976425, -61.1888008118, DomeGroup );
    addLight(0xff0040, -40.1801986694, 1.05519998074, -54.9145011902, DomeGroup );
    addLight(0xff0040, -48.5750999451, 6.4783000946, -48.501499176, DomeGroup );
    addLight(0xff0040, -54.9375991821, 0.526300013065, -39.9147987366, DomeGroup );
    addLight(0xff0040, -61.1380004883, 6.4783000946, -31.2103004456, DomeGroup );
    addLight(0xff0040, -64.6429977417, 1.05519998074, -21.244600296, DomeGroup );
    addLight(0xff0040, -20.2791996002, -8.84949970245, -62.413898468, DomeGroup );
    addLight(0xff0040, -28.6247005463, -15.2248001099, -56.3507003784, DomeGroup );
    addLight(0xff0040, -38.1641998291, -10.7433004379, -52.4188995361, DomeGroup );
    addLight(0xff0040, -43.7402992249, -17.5855007172, -43.9578018188, DomeGroup );
    addLight(0xff0040, -52.1186981201, -11.7390003204, -37.8667984009, DomeGroup );
    addLight(0xff0040, -55.3227005005, -17.5855007172, -28.0161991119, DomeGroup );
    addLight(0xff0040, -61.6465988159, -10.7433004379, -20.0984992981, DomeGroup );
    addLight(0xff0040, -62.4380989075, -15.2248001099, -9.81079959869, DomeGroup );
    addLight(0xff0040, -56.2801017761, 40.0854988098, 28.7630004883, DomeGroup );
    addLight(0xff0040, -53.0924987793, 33.7102012634, 38.5736999512, DomeGroup );
    addLight(0xff0040, -64.7845993042, 23.8055992126, 20.8090000153, DomeGroup );
    addLight(0xff0040, -61.3706016541, 17.8535003662, 31.0447998047, DomeGroup );
    addLight(0xff0040, -55.0850982666, 23.2766990662, 40.0214004517, DomeGroup );
    addLight(0xff0040, -48.4902992249, 17.8535003662, 48.7732009888, DomeGroup );
    addLight(0xff0040, -67.8975982666, 7.00719976425, 10.9563999176, DomeGroup );
    addLight(0xff0040, -64.6432037354, 1.05519998074, 21.2441005707, DomeGroup );
    addLight(0xff0040, -61.1381988525, 6.4783000946, 31.2098999023, DomeGroup );
    addLight(0xff0040, -54.9379005432, 0.526300013065, 39.9143981934, DomeGroup );
    addLight(0xff0040, -48.5754013062, 6.4783000946, 48.5010986328, DomeGroup );
    addLight(0xff0040, -40.1805992126, 1.05519998074, 54.9141998291, DomeGroup );
    addLight(0xff0040, -65.6258010864, -8.84949970245, -0.000300000014249, DomeGroup );
    addLight(0xff0040, -62.4382019043, -15.2248001099, 9.81040000916, DomeGroup );
    addLight(0xff0040, -61.6467018127, -10.7433004379, 20.0979995728, DomeGroup );
    addLight(0xff0040, -55.3228988647, -17.5855007172, 28.0158004761, DomeGroup );
    addLight(0xff0040, -52.1189994812, -11.7390003204, 37.8664016724, DomeGroup );
    addLight(0xff0040, -43.7406005859, -17.5855007172, 43.9575004578, DomeGroup );
    addLight(0xff0040, -38.1646003723, -10.7433004379, 52.418598175, DomeGroup );
    addLight(0xff0040, -28.6250991821, -15.2248001099, 56.3503990173, DomeGroup );
    addLight(0xff0040, 9.9638004303, 40.0854988098, 62.413898468, DomeGroup );
    addLight(0xff0040, 20.2791996002, 33.7102012634, 62.413898468, DomeGroup );
    addLight(0xff0040, -0.229000002146, 23.8055992126, 68.0440979004, DomeGroup );
    addLight(0xff0040, 10.5607995987, 17.8535003662, 67.9602966309, DomeGroup );
    addLight(0xff0040, 21.0403003693, 23.2766990662, 64.756401062, DomeGroup );
    addLight(0xff0040, 31.4016990662, 17.8535003662, 61.1888008118, DomeGroup );
    addLight(0xff0040, -10.5613002777, 7.00719976425, 67.9601974487, DomeGroup );
    addLight(0xff0040, 0.228499993682, 1.05519998074, 68.0440979004, DomeGroup );
    addLight(0xff0040, 10.7896003723, 6.4783000946, 67.7902984619, DomeGroup );
    addLight(0xff0040, 20.9841003418, 0.526300013065, 64.5832977295, DomeGroup );
    addLight(0xff0040, 31.1166992188, 6.4783000946, 61.1856994629, DomeGroup );
    addLight(0xff0040, 39.8100013733, 1.05519998074, 55.1834983826, DomeGroup );
    addLight(0xff0040, -20.2796993256, -8.84949970245, 62.4137001038, DomeGroup );
    addLight(0xff0040, -9.96420001984, -15.2248001099, 62.4137992859, DomeGroup );
    addLight(0xff0040, 0.0644999966025, -10.7433004379, 64.8401031494, DomeGroup );
    addLight(0xff0040, 9.54889965057, -17.5855007172, 61.2724990845, DomeGroup );
    addLight(0xff0040, 19.9074001312, -11.7390003204, 61.2695007324, DomeGroup );
    addLight(0xff0040, 28.2894992828, -17.5855007172, 55.1833992004, DomeGroup );
    addLight(0xff0040, 38.0595016479, -10.7433004379, 52.4949989319, DomeGroup );
    addLight(0xff0040, 44.746799469, -15.2248001099, 44.637298584, DomeGroup );
    addLight(0xff0040, 55.0850982666, 1.58399999142, -40.0214004517, DomeGroup );
    addLight(0xff0040, 61.3706016541, 7.00719976425, -31.0447998047, DomeGroup );
    addLight(0xff0040, 48.5754013062, 18.3824005127, -48.5010986328, DomeGroup );
    addLight(0xff0040, 54.9379005432, 24.334400177, -39.9143981934, DomeGroup );
    addLight(0xff0040, 61.1381988525, 18.3824005127, -31.2098007202, DomeGroup );
    addLight(0xff0040, 64.6432037354, 23.8055992126, -21.2441005707, DomeGroup );
    addLight(0xff0040, 38.1646995544, 35.6040000916, -52.418598175, DomeGroup );
    addLight(0xff0040, 43.7406005859, 42.4462013245, -43.9575004578, DomeGroup );
    addLight(0xff0040, 52.1189994812, 36.5998001099, -37.8664016724, DomeGroup );
    addLight(0xff0040, 55.3228988647, 42.4462013245, -28.0156993866, DomeGroup );
    addLight(0xff0040, 61.6467018127, 35.6040000916, -20.0979995728, DomeGroup );
    addLight(0xff0040, 62.4382019043, 40.0854988098, -9.81040000916, DomeGroup );
    addLight(0xff0040, -21.0403003693, 1.58399999142, -64.756401062, DomeGroup );
    addLight(0xff0040, -10.5607995987, 7.00719976425, -67.9602966309, DomeGroup );
    addLight(0xff0040, -31.1166992188, 18.3824005127, -61.1856994629, DomeGroup );
    addLight(0xff0040, -20.9841003418, 24.334400177, -64.5832977295, DomeGroup );
    addLight(0xff0040, -10.7896003723, 18.3824005127, -67.7902984619, DomeGroup );
    addLight(0xff0040, -0.228499993682, 23.8055992126, -68.0440979004, DomeGroup );
    addLight(0xff0040, -38.0595016479, 35.6040000916, -52.4949989319, DomeGroup );
    addLight(0xff0040, -28.2894992828, 42.4462013245, -55.1833992004, DomeGroup );
    addLight(0xff0040, -19.9074001312, 36.5998001099, -61.2695007324, DomeGroup );
    addLight(0xff0040, -9.54889965057, 42.4462013245, -61.2724990845, DomeGroup );
    addLight(0xff0040, -0.0644999966025, 35.6040000916, -64.8401031494, DomeGroup );
    addLight(0xff0040, 9.96420001984, 40.0854988098, -62.4137992859, DomeGroup );
    addLight(0xff0040, -68.0887985229, 1.58399999142, -0.000300000014249, DomeGroup );
    addLight(0xff0040, -67.8974990845, 7.00719976425, -10.9569997787, DomeGroup );
    addLight(0xff0040, -67.806602478, 18.3824005127, 10.6863002777, DomeGroup );
    addLight(0xff0040, -67.9067993164, 24.334400177, -0.000300000014249, DomeGroup );
    addLight(0xff0040, -67.8065032959, 18.3824005127, -10.6868000031, DomeGroup );
    addLight(0xff0040, -64.7844009399, 23.8055992126, -20.8094997406, DomeGroup );
    addLight(0xff0040, -61.6866989136, 35.6040000916, 19.974899292, DomeGroup );
    addLight(0xff0040, -61.2244987488, 42.4462013245, 9.85229969025, DomeGroup );
    addLight(0xff0040, -64.4225006104, 36.5998001099, -0.000300000014249, DomeGroup );
    addLight(0xff0040, -61.2243995667, 42.4462013245, -9.85280036926, DomeGroup );
    addLight(0xff0040, -61.6865997314, 35.6040000916, -19.9754009247, DomeGroup );
    addLight(0xff0040, -56.2798995972, 40.0854988098, -28.7635002136, DomeGroup );
    addLight(0xff0040, -21.0408000946, 1.58399999142, 64.7562026978, DomeGroup );
    addLight(0xff0040, -31.4022006989, 7.00719976425, 61.1884994507, DomeGroup );
    addLight(0xff0040, -10.7901000977, 18.3824005127, 67.7901992798, DomeGroup );
    addLight(0xff0040, -20.9846000671, 24.334400177, 64.5830993652, DomeGroup );
    addLight(0xff0040, -31.117099762, 18.3824005127, 61.1853981018, DomeGroup );
    addLight(0xff0040, -39.8103981018, 23.8055992126, 55.1832008362, DomeGroup );
    addLight(0xff0040, -0.0649999976158, 35.6040000916, 64.8401031494, DomeGroup );
    addLight(0xff0040, -9.54930019379, 42.4462013245, 61.2724990845, DomeGroup );
    addLight(0xff0040, -19.9078998566, 36.5998001099, 61.2692985535, DomeGroup );
    addLight(0xff0040, -28.289899826, 42.4462013245, 55.1832008362, DomeGroup );
    addLight(0xff0040, -38.0598983765, 35.6040000916, 52.4947013855, DomeGroup );
    addLight(0xff0040, -44.7471008301, 40.0854988098, 44.6370010376, DomeGroup );
    addLight(0xff0040, 55.0848007202, 1.58399999142, 40.0218009949, DomeGroup );
    addLight(0xff0040, 48.4898986816, 7.00719976425, 48.7734985352, DomeGroup );
    addLight(0xff0040, 61.1380004883, 18.3824005127, 31.2103004456, DomeGroup );
    addLight(0xff0040, 54.9375991821, 24.334400177, 39.9147987366, DomeGroup );
    addLight(0xff0040, 48.5750999451, 18.3824005127, 48.501499176, DomeGroup );
    addLight(0xff0040, 40.1801986694, 23.8055992126, 54.9145011902, DomeGroup );
    addLight(0xff0040, 61.6465988159, 35.6040000916, 20.0984992981, DomeGroup );
    addLight(0xff0040, 55.3227005005, 42.4462013245, 28.0161991119, DomeGroup );
    addLight(0xff0040, 52.1186981201, 36.5998001099, 37.8667984009, DomeGroup );
    addLight(0xff0040, 43.7402992249, 42.4462013245, 43.9578018188, DomeGroup );
    addLight(0xff0040, 38.1641998291, 35.6040000916, 52.4188995361, DomeGroup );
    addLight(0xff0040, 28.6247005463, 40.0854988098, 56.3507003784, DomeGroup );
    addLight(0xff0040, 52.7795143127, -25.9542293549, 27.362165451, DomeGroup );
    addLight(0xff0040, 57.1302680969, -25.9599533081, 9.35831928253, DomeGroup );
    addLight(0xff0040, 57.1303634644, -25.9599533081, -9.35787963867, DomeGroup );
    addLight(0xff0040, 52.7797622681, -25.9542293549, -27.3617286682, DomeGroup );
    addLight(0xff0040, 42.3171691895, -25.9542293549, -41.7624053955, DomeGroup );
    addLight(0xff0040, 26.5389919281, -25.9599533081, -51.4636650085, DomeGroup );
    addLight(0xff0040, 8.73883724213, -25.9599533081, -57.2473487854, DomeGroup );
    addLight(0xff0040, -9.72821712494, -25.9542293549, -58.6731872559, DomeGroup );
    addLight(0xff0040, -26.6571960449, -25.9542293549, -53.1727027893, DomeGroup );
    addLight(0xff0040, -40.7594108582, -25.9599533081, -41.1645889282, DomeGroup );
    addLight(0xff0040, -51.7605628967, -25.9599533081, -26.022939682, DomeGroup );
    addLight(0xff0040, -58.8232421875, -25.9542293549, -8.90029811859, DomeGroup );
    addLight(0xff0040, -58.8233413696, -25.9542293549, 8.89985656738, DomeGroup );
    addLight(0xff0040, -51.7608032227, -25.9599533081, 26.0225448608, DomeGroup );
    addLight(0xff0040, -40.7597465515, -25.9599533081, 41.1642990112, DomeGroup );
    addLight(0xff0040, -26.6576366425, -25.9542293549, 53.172454834, DomeGroup );
    addLight(0xff0040, -9.72870635986, -25.9542293549, 58.673084259, DomeGroup );
    addLight(0xff0040, 8.73839855194, -25.9599533081, 57.2473945618, DomeGroup );
    addLight(0xff0040, 26.538602829, -25.9599533081, 51.4638633728, DomeGroup );
    addLight(0xff0040, 42.3168258667, -25.9542293549, 41.7627487183, DomeGroup );
}