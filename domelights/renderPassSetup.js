function renderPassSetup()
{
    //renderer.setClearColor( 0x000000 );
    //renderer.setSize( window.innerWidth, window.innerHeight );

    composer = new THREE.EffectComposer( renderer );
    composer.addPass( new THREE.RenderPass( scene, camera ) );

    //var effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );
    //effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
    //effectFXAA.renderToScreen = true;

    var effect = new THREE.ShaderPass( THREE.VignetteShader );
    effect.uniforms[ 'offset' ].value = 20;
    effect.renderToScreen = true;
    composer.addPass( effect );
}