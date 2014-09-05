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
        this.material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });
    };
    this.init();
}