function renderPassSetup()
{
//    var renderModel = new THREE.RenderPass( scene, camera );
//    var effectBloom = new THREE.BloomPass( 1.0 );
//    var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
//
//    //effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );
//
//    var width = window.innerWidth || 2;
//    var height = window.innerHeight || 2;
//
//    //effectFXAA.uniforms[ 'resolution' ].value.set( 1 / width, 1 / height );
//
//    effectCopy.renderToScreen = true;
//
//    composer = new THREE.EffectComposer( renderer );
//
//    composer.addPass( renderModel );
//    //composer.addPass( effectFXAA );
//    composer.addPass( effectBloom );
//    composer.addPass( effectCopy );


    //renderer.setClearColor( 0x000000 );
    //renderer.setSize( window.innerWidth, window.innerHeight );

    composer = new THREE.EffectComposer( renderer );
    //composer.addPass( new THREE.RenderPass( scene, camera ) );

    //var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
    //effectCopy.renderToScreen = true;

    //var effectBloom = new THREE.BloomPass( 2.8 );


    //composer.addPass( effectBloom );
    //composer.addPass( effectCopy );

    //var effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );
    //effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
    //effectFXAA.renderToScreen = true;

    //var effect = new THREE.ShaderPass( THREE.VignetteShader );
    //effect.uniforms[ 'offset' ].value = 0;
    //effect.renderToScreen = true;
    //composer.addPass( effect );

    renderer.autoClear = false;

    //var effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );
    //effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
    //effectFXAA.renderToScreen = true;

    var renderModel = new THREE.RenderPass( scene, camera );
    var effectBloom = new THREE.BloomPass( 0.8 );
    var effectCopy = new THREE.ShaderPass( THREE.CopyShader );

    effectCopy.renderToScreen = true;

    composer = new THREE.EffectComposer( renderer );

    composer.addPass( renderModel );
    //composer.addPass( effectFXAA );
    //composer.addPass( effectBloom );
    composer.addPass( effectCopy );

}