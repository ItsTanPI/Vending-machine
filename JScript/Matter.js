let output = document.body.querySelector("#Screen");
Matter.use('matter-wrap');

//-------------------------------------------------------Referance-------------------------------------------------------//
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Events = Matter.Events,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Vector = Matter.Vector,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies;
    Body = Matter.Body;

var engine = Engine.create();
var world = engine.world;

engine.gravity.y = 0;
engine.gravity.x = 0;   

engine.timing.timeScale =1;
//engine.enableSleeping = true;

//-------------------------------------------------------Rendering-------------------------------------------------------//
var render = Render.create({
    element: output,
    engine: engine,
    options:
    {
        width: output.clientWidth,
        height: output.clientHeight,
        background: "transparent",
        wireframes: false,
        hasBounds: true,
        showStats: false,
        showPerformance: false
    }
});


var boundsScaleTarget = 1;

var boundLimit =
{
    min: {x: 0, y:0},
    max: {x: 0, y: 0}
};


//-------------------------------------------------------Collision mask-------------------------------------------------------//
var CollisionCat= 
{
    layer1: 0b001,
    layer2: 0b010
};

//-------------------------------------------------------MOUSE-------------------------------------------------------//
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    /*collisionFilter: 
    {
        category:  0b100,
        mask: 0b100
    },*/      
    constraint: {
        stiffness: 1,
        render: {
            visible: false
        }
    }
});

render.mouse = mouse; 
//-------------------------------------------------------Entity-------------------------------------------------------//

var MouseCircle = Bodies.circle(0, 0, 300,
{
    isStatic: true,
    render: 
    { 
        zIndex: 1,
        fillStyle: "transparent"
    }
});


Composite.add(world, [
    // walls
    Bodies.rectangle(-50, output.clientHeight/2, 50, output.clientHeight, { isStatic: true }),
    Bodies.rectangle(output.clientWidth+50, output.clientHeight/2, 50, output.clientHeight, { isStatic: true }),
    Bodies.rectangle(output.clientWidth/2, -50, output.clientWidth, 50, { isStatic: true }),
    Bodies.rectangle(output.clientWidth/2, output.clientHeight+50, output.clientWidth, 50, { isStatic: true }),
]);

var loc ="../Assets/Vending/Tins/"

const items = [
    { name: "Bar1.png", Xsize: 50, Ysize: 120 },
    { name: "Bar2.png", Xsize: 50, Ysize: 120 },
    { name: "Bar3.png", Xsize: 50, Ysize: 120 },
    { name: "Bar4.png", Xsize: 50, Ysize: 120 },
    { name: "Bottel1.png", Xsize: 60, Ysize: 180 },
    { name: "Bottel2.png", Xsize: 60, Ysize: 180 },
    { name: "Bottel3.png", Xsize: 60, Ysize: 180 },
    { name: "Bottel5.png", Xsize: 60, Ysize: 180 },
    { name: "Snack1.png", Xsize: 120, Ysize: 120 },
    { name: "Snack2.png", Xsize: 120, Ysize: 120 },
    { name: "Snack3.png", Xsize: 120, Ysize: 120 },
    { name: "Snack4.png", Xsize: 120, Ysize: 120 },
    { name: "Tin1.png", Xsize: 70, Ysize: 120 },
    { name: "Tin2.png", Xsize: 70, Ysize: 120 },
    { name: "Tin3.png", Xsize: 70, Ysize: 120 },
    { name: "Tin4.png", Xsize: 70, Ysize: 120 },
    { name: "Tin5.png", Xsize: 70, Ysize: 120 },
    { name: "Tin6.png", Xsize: 70, Ysize: 120 },
    { name: "Tin7.png", Xsize: 70, Ysize: 120 }
];

var randomIndex = 0;

function getRandomItem() 
{
    var i= items[randomIndex%18];
    randomIndex++;
    return i;
}
var index;
var stack = Composites.stack(0, 0, 6, 6, 50 ,50 ,function(x, y) 
{
    
    var it = getRandomItem()
   
    var name = loc + it.name
    return Bodies.rectangle(x+Common.random(0,0), y+Common.random(0,0), it.Xsize, it.Ysize,
    {
        restitution: 0.5,
        frictionAir: -0.0001,
        
        render: 
        { 
            sprite: 
            {
                texture: name,
                xScale: 0.15,
                yScale: 0.15
            },
            zIndex: -3
        }
    });
});


var Machine = Bodies.rectangle(350, output.clientHeight-400, 600, 800,
    {
        tag: "Planet",
        isStatic:true,
        render: 
        { 
            zIndex: 0,
            sprite: 
            {
                texture: '../Assets/Vending/Machine1.png',
                xScale: 0.4,
                yScale: 0.4
            }
        },
    });

Composite.add(world, mouseConstraint);

var objects = [stack];

//-------------------------------------------------------Z-index Sort-------------------------------------------------------//

var map = objects.map(function (el, index) 
{
    if (el.render && el.render.zIndex !== undefined) 
    {
        return { index: index, value: el.render.zIndex };
    } 
    else 
    {
        var element;
        for (let i = 0; i < el.bodies.length; i++) 
        {
            element = el.bodies[i]; 
        }
        return { index: index, value: element.render.zIndex };
    }
});

map.sort(function (a, b) 
{
    return a.value - b.value;
});

var objectsSorted = map.map(function (el) 
{
    if (el !== undefined) {
        return objects[el.index];
    }
    return objects[el.index];
});

//console.log(objectsSorted);

for (var i = 0; i < objectsSorted.length; i++) 
{
    if (objectsSorted[i].type == 'composite') 
    {
        for (let j = 0; j < objectsSorted[i].bodies.length; j++) 
        {
            const element = objectsSorted[i].bodies[j];
            Composite.add(world, element);
        }  
    }
    else
    {
        Composite.add(world, objectsSorted[i]);
    }
    
}

//-------------------------------------------------------Camera-------------------------------------------------------//

var Target = output.clientWidth/2;
var newTarget = output.clientWidth/2;
var centerPos = (render.bounds.min.x +render.bounds.max.x)/2;


var moveRight = true;
var moveLeft = true;
var translate;

//-------------------------------------------------------Addtional Functions (very very usefull👍👍)-------------------------------------------------------//

function Lerp(a, b, t) {
    var value =  a + (b - a) * Clamp01(t);
    return value;
}


function Clamp01(value)
{
    if (value < 0)
    {
        return 0;
    }
    else if(value > 1)
    {
        return 1;
    }
    else
    {
        return value;
    }
}



function inBound() 
{
    for (var i = 0; i < stack.bodies.length; i += 1) 
    {
        stack.bodies[i].plugin.wrap = { 
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
    }

    for (var i = 0; i < stack1.bodies.length; i += 1) 
    {
        stack1.bodies[i].plugin.wrap = { 
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
    } 

    for (var i = 0; i < stack2.bodies.length; i += 1) 
    {
        stack2.bodies[i].plugin.wrap = { 
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
    } 
}



var explosion = function(engine, delta) {
    var timeScale = (1000 / 60) / delta;
    var bodies = Composite.allBodies(engine.world);

    for (var i = 0; i < bodies.length; i++) {
        var body = bodies[i];

        if (!body.isStatic && body.position.y >= 500) {
            // scale force for mass and time applied
            var forceMagnitude = (0.03 * body.mass) * timeScale;

            // apply the force over a single update
            Body.applyForce(body, body.position, {
                x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
                y: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1])
            });
        }
    }
};

//-------------------------------------------------------Handling Rendering and Running-------------------------------------------------------//

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

function handleresize()     
{
    render.canvas.width = output.clientWidth;
    render.canvas.height = output.clientHeight;   
}

window.addEventListener("resize", () => handleresize(output));

//-------------------------------------------------------void Update-------------------------------------------------------//

Events.on(render, 'afterRender', function() {


});
explosion(engine, 40);

lastTime = Common.now();

Events.on(engine, 'afterUpdate', function(event) 
{
    if (Common.now()-lastTime >= 10000) 
    {
        ///explosion(engine, 40);
        lastTime = Common.now();
    }

});


function handleOrientation(event) {
    const gravityScale = 0.05; 
    const gamma = event.gamma; 
    const beta = event.beta;   

    if (gamma !== null && beta !== null) {
        
        engine.gravity.x = gamma * gravityScale;
        engine.gravity.y = beta * gravityScale;
        console.log('Gravity X:', engine.gravity.x);
        console.log('Gravity Y:', engine.gravity.y);
    } else {
        console.log('No gyroscope data available.');
    }
}


if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation, true);
    console.log('DeviceOrientationEvent supported');
} else {
    console.log('DeviceOrientationEvent is not supported on this device/browser.');
}