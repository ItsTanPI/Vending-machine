const softDrinks = [
    { id: 0, name: 'Not Avaliable', price: 0, img: "missing"},
    { id: 1, name: 'Coca Cola', price: 110, img: "Tin1"},
    { id: 2, name: 'Pepsi', price: 120,  img: "Tin2"},
    { id: 3, name: 'Sprite', price: 130,  img: "Tin3" },
    { id: 4, name: 'Fanta', price: 140,   img: "Tin4" },
    { id: 5, name: 'Mountain Dew', price: 150,  img: "Bottel1" },
    { id: 6, name: 'Dr Pepper', price: 160,  img: "Bar1" },
    { id: 7, name: '7 Up', price: 170,  img: "Bar1" },
    { id: 8, name: 'Root Beer', price: 180,  img: "Tin2" }
];

var infoBox = false;

function start() 
{
    for (let index = 1; index < 9; index++) 
    {
        var ID = "#" + index.toString() + "H"
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
            console.log(pic);
            $("#ProPic").attr("src", pic);
            $("#Tid").html(obj.id);
            $("#TName").html(obj.name);
            $("#TPrice").html(obj.price);
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