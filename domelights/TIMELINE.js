/**
 * Created by Robert Butterworth on 8/31/2014.
 */
TIMELINE = function(length)
{
    this.Length = length || 0;
    this.CurrentTime = 0;
    this.Size = new THREE.Vector2(150,50);
    this.Position = new THREE.Vector2(100,-50);

    this.Update = function(time)
    {
        this.CurrentTime = time;
    };

    this.Render = function()
    {


    };

    //Init
    this.init = function()
    {
        var segments = 100;

        var geometry = new THREE.BufferGeometry();
        var material = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 1, linewidth: 3, vertexColors: THREE.VertexColors } );
        material.linewidth = 5;

        var positions = new Float32Array( segments * 3 );
        var colors = new Float32Array( segments * 3 );

        var r = 180;

        for ( var i = 0; i < segments; i ++ ) {

            var x = Math.random() * r - r / 2;
            var y = Math.random() * r - r / 2;
            var z = Math.random() * r - r / 2;

            // positions

            positions[ i * 3 ] = x;
            positions[ i * 3 + 1 ] = y;
            positions[ i * 3 + 2 ] = z;

            // colors

            colors[ i * 3 ] = ( x / r ) + 0.5;
            colors[ i * 3 + 1 ] = ( y / r ) + 0.5;
            colors[ i * 3 + 2 ] = ( z / r ) + 0.5;

        }

        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

        geometry.computeBoundingSphere();

        var mesh = new THREE.Line( geometry, material );

        scene.add( mesh );
    };
    this.init();
}