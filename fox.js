//author: Brenna DeGan
//date: 9/16/2018
//description:


"use strict";

var gl;
var points;

var numPoints = 51
var movePoints = 0;

var theta = 0.0;
var speed = 0.0;
var thetaLoc;

var direction = true;



window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the triangles
    //
    //(red, green, blue) values for all of the vertices
    var colors = [
        vec3(0.42, 0.26, 0.15), //body triangle
        vec3(0.42, 0.26, 0.15),
        vec3(0.42, 0.26, 0.15),
        vec3(0.72, 0.45, 0.2), //middle head triangle
        vec3(0.72, 0.45, 0.2),
        vec3(0.72, 0.45, 0.2),
        vec3(0.65, 0.5, 0.39), //left head triangle
        vec3(0.65, 0.5, 0.39),
        vec3(0.65, 0.5, 0.39),
        vec3(0.42, 0.26, 0.15), //left ear triangle
        vec3(0.42, 0.26, 0.15),
        vec3(0.42, 0.26, 0.15),
        vec3(0.91, 0.76, 0.65), //right head triangle
        vec3(0.91, 0.76, 0.65),
        vec3(0.91, 0.76, 0.65),
        vec3(0.42, 0.26, 0.15), //right ear triangle
        vec3(0.42, 0.26, 0.15),
        vec3(0.42, 0.26, 0.15),
        vec3(0.0, 0.0, 0.0), //right foot triangle
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0), //left foot triangle
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.72, 0.45, 0.2), //top tail triangle
        vec3(0.72, 0.45, 0.2),
        vec3(0.72, 0.45, 0.2),
        vec3(1.0, 1.0, 1.0), //bottom tail triangle
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 1.0, 1.0), //left eye patch triangle
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 1.0, 1.0), //right eye patch triangle
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 1.0, 1.0),
        vec3(0.0, 0.0, 0.0), //nose triangle
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0), //left eye triangle
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0), //right eye triangle
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0), //inside left ear triangle
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0), //inside right ear triangle
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
    ];

    // And, add our vertices point into our array of points
    // 51 points
    points = [
        vec2(    0, .4 ), //body triangle
        vec2( -.35, -.5 ), 
        vec2(  .35, -.5 ),
        vec2(    0, 0 ), //middle head triangle
        vec2( -.17, .6 ), 
        vec2(  .17, .6 ),
        vec2(    0, 0 ), //left head triangle
        vec2( -.17, .6 ), 
        vec2( -.45, .43 ),
        vec2( -.43 , .65), //left ear triangle
        vec2( -.25 ,.55 ), 
        vec2( -.45, .43 ),
        vec2( 0, 0 ), //right head triangle
        vec2( .17, .6 ), 
        vec2( .45, .43 ),
        vec2( .43 , .65), //right ear triangle
        vec2( .25 ,.55 ), 
        vec2( .45, .43 ),
        vec2( 0, -.5 ), //right foot triangle
        vec2( .2, -.5 ), 
        vec2( .1, -.4 ),
        vec2( 0, -.5 ), //left foot triangle
        vec2( -.2, -.5 ), 
        vec2( -.1, -.4 ),
        vec2( .27, -.32 ), //top tail triangle
        vec2( .65, .2 ), 
        vec2( .35, 0 ),
        vec2( .27, -.32 ), //bottom tail triangle
        vec2( .65, .2 ), 
        vec2( .58, -.15 ),
        vec2(    0, 0 ), //left eye patch triangle
        vec2( -.115, .42 ), 
        vec2( -.33, .27 ),
        vec2(    0, 0 ), //right eye patch triangle
        vec2(  .115, .42 ), 
        vec2(  .33, .27 ),
        vec2(    0, 0 ), //nose triangle
        vec2( -.065, .05 ), 
        vec2(  .065, .05 ),
        vec2(  -.155, .245 ), //left eye triangle
        vec2( -.13, .26 ), 
        vec2(  -.135, .22 ),
        vec2(  .155, .245 ), //right eye triangle
        vec2(   .13, .26 ), 
        vec2(  .135, .22 ),
        vec2( -.4 , .6), //inside left ear triangle
        vec2( -.3 ,.55 ), 
        vec2( -.415, .48 ),
        vec2( .4 , .6), //inside right ear triangle
        vec2( .3 ,.55 ), 
        vec2( .415, .48 ),
        ];

    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( .65, .65, .65, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    //note that the 2 below is because each of our 
    //data points has only 2 values (2D application)
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation( program, "theta" );

    
    // Initialize event handler (menu)
    document.getElementById("Controls" ).onclick = function(event) {
        switch( event.target.index ) {
            case 0:
                var colors = [
                    vec3(0.42, 0.26, 0.15), //body triangle
                    vec3(0.42, 0.26, 0.15),
                    vec3(0.42, 0.26, 0.15),
                    vec3(0.72, 0.45, 0.2), //middle head triangle
                    vec3(0.72, 0.45, 0.2),
                    vec3(0.72, 0.45, 0.2),
                    vec3(0.65, 0.5, 0.39), //left head triangle
                    vec3(0.65, 0.5, 0.39),
                    vec3(0.65, 0.5, 0.39),
                    vec3(0.42, 0.26, 0.15), //left ear triangle
                    vec3(0.42, 0.26, 0.15),
                    vec3(0.42, 0.26, 0.15),
                    vec3(0.91, 0.76, 0.65), //right head triangle
                    vec3(0.91, 0.76, 0.65),
                    vec3(0.91, 0.76, 0.65),
                    vec3(0.42, 0.26, 0.15), //right ear triangle
                    vec3(0.42, 0.26, 0.15),
                    vec3(0.42, 0.26, 0.15),
                    vec3(0.0, 0.0, 0.0), //right foot triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //left foot triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.72, 0.45, 0.2), //top tail triangle
                    vec3(0.72, 0.45, 0.2),
                    vec3(0.72, 0.45, 0.2),
                    vec3(1.0, 1.0, 1.0), //bottom tail triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0), //left eye patch triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0), //right eye patch triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(0.0, 0.0, 0.0), //nose triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //left eye triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //right eye triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //inside left ear triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //inside right ear triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                ];

                    var cBuffer = gl.createBuffer();
                    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
                    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

                    var vColor = gl.getAttribLocation( program, "vColor" );
                    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
                    gl.enableVertexAttribArray( vColor );

                break;
            case 1:
                var colors = [
                    vec3(0.2, 0.2, .8), //body triangle
                    vec3(0.2, 0.2, .8),
                    vec3(0.2, 0.2, .8),
                    vec3(0.56, 0.56, .73), //middle head triangle
                    vec3(0.56, 0.56, .73),
                    vec3(0.56, 0.56, .73),
                    vec3(0.74, 0.84, 0.84), //left head triangle
                    vec3(0.74, 0.84, 0.84),
                    vec3(0.74, 0.84, 0.84),
                    vec3(0.2, 0.2, .8), //left ear triangle
                    vec3(0.2, 0.2, .8),
                    vec3(0.2, 0.2, .8),
                    vec3(0.91, 0.76, 0.65), //right head triangle
                    vec3(0.91, 0.76, 0.65),
                    vec3(0.91, 0.76, 0.65),
                    vec3(0.2, 0.2, .8), //right ear triangle
                    vec3(0.2, 0.2, .8),
                    vec3(0.2, 0.2, .8),
                    vec3(0.0, 0.0, 0.0), //right foot triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //left foot triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.56, 0.56, .73), //top tail triangle
                    vec3(0.56, 0.56, .73),
                    vec3(0.56, 0.56, .73),
                    vec3(1.0, 1.0, 1.0), //bottom tail triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0), //left eye patch triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0), //right eye patch triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(0.0, 0.0, 0.0), //nose triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //left eye triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //right eye triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //inside left ear triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //inside right ear triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                ];

                    var cBuffer = gl.createBuffer();
                    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
                    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

                    var vColor = gl.getAttribLocation( program, "vColor" );
                    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
                    gl.enableVertexAttribArray( vColor );

                break;
            case 2:
                var colors = [
                    vec3(0.18, 0.3, .18), //body triangle
                    vec3(0.18, 0.3, .18),
                    vec3(0.18, 0.3, .18),
                    vec3(0.41, 0.55, .13), //middle head triangle
                    vec3(0.41, 0.55, .13),
                    vec3(0.41, 0.55, .13),
                    vec3(0.56, 0.73, 0.56), //left head triangle
                    vec3(0.56, 0.73, 0.56), 
                    vec3(0.56, 0.73, 0.56), 
                    vec3(0.18, 0.3, .18), //left ear triangle
                    vec3(0.18, 0.3, .18),
                    vec3(0.18, 0.3, .18),
                    vec3(0.91, 0.76, 0.65), //right head triangle
                    vec3(0.91, 0.76, 0.65),
                    vec3(0.91, 0.76, 0.65),
                    vec3(0.18, 0.3, .18), //right ear triangle
                    vec3(0.18, 0.3, .18),
                    vec3(0.18, 0.3, .18),
                    vec3(0.0, 0.0, 0.0), //right foot triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //left foot triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.41, 0.55, .13), //top tail triangle
                    vec3(0.41, 0.55, .13),
                    vec3(0.41, 0.55, .13),
                    vec3(1.0, 1.0, 1.0), //bottom tail triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0), //left eye patch triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0), //right eye patch triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(0.0, 0.0, 0.0), //nose triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //left eye triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //right eye triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //inside left ear triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //inside right ear triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                ];

                    var cBuffer = gl.createBuffer();
                    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
                    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

                    var vColor = gl.getAttribLocation( program, "vColor" );
                    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
                    gl.enableVertexAttribArray( vColor );

                break;
             case 3:
                var colors = [
                    vec3(Math.random(), Math.random(), Math.random()), //body triangle
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(Math.random(), Math.random(), Math.random()), //middle head triangle
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(Math.random(), Math.random(), Math.random()), //left head triangle
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(Math.random(), Math.random(), Math.random()), 
                    vec3(Math.random(), Math.random(), Math.random()), //left ear triangle
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(0.91, 0.76, 0.65), //right head triangle
                    vec3(0.91, 0.76, 0.65),
                    vec3(0.91, 0.76, 0.65),
                    vec3(Math.random(), Math.random(), Math.random()), //right ear triangle
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(0.0, 0.0, 0.0), //right foot triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //left foot triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(Math.random(), Math.random(), Math.random()),//top tail triangle
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(Math.random(), Math.random(), Math.random()),
                    vec3(1.0, 1.0, 1.0), //bottom tail triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0), //left eye patch triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0), //right eye patch triangle
                    vec3(1.0, 1.0, 1.0),
                    vec3(1.0, 1.0, 1.0),
                    vec3(0.0, 0.0, 0.0), //nose triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //left eye triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //right eye triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //inside left ear triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0), //inside right ear triangle
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                ];

                    var cBuffer = gl.createBuffer();
                    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
                    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

                    var vColor = gl.getAttribLocation( program, "vColor" );
                    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
                    gl.enableVertexAttribArray( vColor );

                break;

        }
    };
      // Initialize event handler (key codes)
    window.onkeydown = function( event ) {
        var key = String.fromCharCode(event.keyCode);
        switch( key ) {
            case 'N': //night
            case 'n':
                gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
                break;
            case 'D': //day
            case 'd':
                gl.clearColor( 0.65, 0.65, 0.65, 1.0 );
                break;

        }
    };

    //slider
    document.getElementById("slider").onchange=function(event){
        speed = parseFloat(event.target.value);
    };

    document.getElementById("Direction").onclick = function(){
        console.log("pressed button");
        direction = !direction;
    };

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    if (movePoints < numPoints)
    {
        movePoints = movePoints + .5;
    }
    gl.drawArrays( gl.TRIANGLES, 0, movePoints );
    if (direction == true)
    {
        theta += speed;
    }
    else 
    {
        theta -= speed;
    }
    gl.uniform1f(thetaLoc, theta);
    
    window.requestAnimFrame(render);
}
