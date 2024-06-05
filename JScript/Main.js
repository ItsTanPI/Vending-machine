const softDrinks = 
[
    // Soft Drinks
    { id: 1, img: 'tin1', name: 'Coca Cola', quantity: '330ml', price: 110 },
    { id: 2, img: 'tin2', name: 'Pepsi', quantity: '330ml', price: 120 },
    { id: 3, img: 'tin3', name: 'Sprite', quantity: '330ml', price: 130 },
    { id: 4, img: 'tin4', name: 'Fanta', quantity: '330ml', price: 140 },
    { id: 5, img: 'tin5', name: 'Mountain Dew', quantity: '330ml', price: 150 },
    { id: 6, img: 'tin6', name: 'Red Bull', quantity: '250ml', price: 200 },
    { id: 7, img: 'tin7', name: 'Monster', quantity: '500ml', price: 250 },
    { id: 8, img: 'tin2', name: 'Pepsi', quantity: '330ml', price: 120 },

    // Fruit Juices
    { id: 9, img: 'bottel1', name: 'Tropicana', quantity: '1L', price: 150 },
    { id: 10, img: 'bottel2', name: 'Minute Maid', quantity: '1L', price: 140 },
    { id: 11, img: 'bottel3', name: 'Simply Orange', quantity: '1L', price: 160 },
    { id: 12, img: 'bottel4', name: 'Ocean Spray', quantity: '1L', price: 170 },

    // Snacks
    { id: 13, img: 'snack1', name: 'Lay\'s', quantity: '200gm', price: 50 },
    { id: 14, img: 'snack2', name: 'Doritos', quantity: '150gm', price: 60 },
    { id: 15, img: 'snack3', name: 'Pringles', quantity: '100gm', price: 70 },
    { id: 16, img: 'snack4', name: 'Cheetos', quantity: '100gm', price: 80 },

    // Chocolate Bars
    { id: 17, img: 'bar1', name: 'Snickers', quantity: '50gm', price: 30 },
    { id: 18, img: 'bar2', name: 'Hershey\'s', quantity: '45gm', price: 25 },
    { id: 19, img: 'bar3', name: 'Kit Kat', quantity: '40gm', price: 20 },
    { id: 20, img: 'bar4', name: 'Twix', quantity: '50gm', price: 35 },

    { id: 21, img: 'bottel5', name: 'Welch\'s', quantity: '1L', price: 180 },
    { id: 22, img: 'tin5', name: 'Mountain Dew', quantity: '330ml', price: 150 },
    { id: 23, img: 'snack2', name: 'Doritos', quantity: '150gm', price: 60 },
    { id: 24, img: 'bar1', name: 'Snickers', quantity: '50gm', price: 30 },
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
            $("#TQuantity").html(obj.Quantity);
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
