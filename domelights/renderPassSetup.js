function renderPassSetup()
{
    renderer.setClearColor( 0x000000 );
    renderer.setSize( window.innerWidth, window.innerHeight );

    composer = new THREE.EffectComposer( renderer );
    composer.addPass( new THREE.RenderPass( scene, camera ) );

    var effect = new THREE.ShaderPass( THREE.VignetteShader );
    effect.uniforms[ 'offset' ].value = 10;
    effect.renderToScreen = true;
    composer.addPass( effect );
}