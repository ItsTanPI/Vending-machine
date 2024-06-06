const softDrinks = 
[

    { id: 0, img: 'Missing', name: 'Missing', quantity: '0', price: 0 },
    // Soft Drinks
    { id: 1, img: 'Tin1', name: 'Coca Cola', quantity: '330ml', price: 110 },
    { id: 2, img: 'Tin2', name: 'Pepsi', quantity: '330ml', price: 120 },
    { id: 3, img: 'Tin3', name: 'Sprite', quantity: '330ml', price: 130 },
    { id: 4, img: 'Tin4', name: 'Fanta', quantity: '330ml', price: 140 },
    { id: 5, img: 'Tin5', name: 'Mountain Dew', quantity: '330ml', price: 150 },
    { id: 6, img: 'Tin6', name: 'Red Bull', quantity: '250ml', price: 200 },
    { id: 7, img: 'Tin7', name: 'Monster', quantity: '250ml', price: 250 },
    { id: 8, img: 'Tin2', name: 'Pepsi', quantity: '330ml', price: 120 },

    // Fruit Juices
    { id: 9, img: 'Bottel1', name: 'Tropicana', quantity: '1L', price: 150 },
    { id: 10, img: 'Bottel2', name: 'Minute Maid', quantity: '1L', price: 140 },
    { id: 11, img: 'Bottel3', name: 'Simply Orange', quantity: '1L', price: 160 },
    { id: 12, img: 'Bottel4', name: 'Ocean Spray', quantity: '1L', price: 170 },

    // Snacks
    { id: 13, img: 'Snack1', name: 'Lay\'s', quantity: '200gm', price: 50 },
    { id: 14, img: 'Snack2', name: 'Doritos', quantity: '150gm', price: 60 },
    { id: 15, img: 'Snack3', name: 'Pringles', quantity: '100gm', price: 70 },
    { id: 16, img: 'Snack4', name: 'Cheetos', quantity: '100gm', price: 80 },

    // Chocolate Bars
    { id: 17, img: 'Bar1', name: 'Snickers', quantity: '50gm', price: 30 },
    { id: 18, img: 'Bar2', name: 'Hershey\'s', quantity: '45gm', price: 25 },
    { id: 19, img: 'Bar3', name: 'Kit Kat', quantity: '40gm', price: 20 },
    { id: 20, img: 'Bar4', name: 'Twix', quantity: '50gm', price: 35 },

    { id: 21, img: 'Bottel5', name: 'Welch\'s', quantity: '1L', price: 180 },
    { id: 22, img: 'Tin5', name: 'Mountain Dew', quantity: '330ml', price: 150 },
    { id: 23, img: 'Snack2', name: 'Doritos', quantity: '150gm', price: 60 },
    { id: 24, img: 'Bar1', name: 'Snickers', quantity: '50gm', price: 30 } ,
];

var infoBox = false;

function start() 
{
    for (let index = 1; index < 25; index++) 
    {
        var ID = "#" + index.toString() + "H";
        var obj = softDrinks[index];
        var pic = "../Assets/Vending/Tins/" + obj.img + ".png";
        $(ID).attr("src", pic);
    }
}


$(document).ready(function()
{
    $("#InfoBox").hide();
    infoBox = false;
    start();
    $(".Tin").click(function()
    {
        if (!infoBox) 
        {
            infoBox = true;
            var TinId = $(this).attr('id');
            var obj = softDrinks[TinId];
            var pic = "../Assets/Vending/Tins/" + obj.img + ".png";
            $("#ProPic").attr("src", pic);
            //$("#Tid").html(obj.id);
            $("#TName").html(obj.name);
            $("#TPrice").html("$" + (obj.price));
            $("#TQuantity").html(obj.quantity);
            $("#InfoBox").slideToggle(1000, "swing");    
        }
    });

    
    $("#close").click(function()
    {
        if(infoBox)
        {
            console.log("bye");
            $("#InfoBox").slideToggle(1000, "swing");
            infoBox = false;
        }
    });
});


function setFontSize() {
    var parent = document.querySelector('.DescBox');
    var child = document.querySelector('.BUYbtn');
    var parentHeight = parent.offsetWidth;
    child.style.fontSize = (parentHeight * 0.10) + 'px';
}

window.addEventListener('resize', setFontSize);
