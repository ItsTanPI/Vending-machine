var infoBox = false;
var count = 0;

const dataToSend = 
{
    Table: 'Refresh',
    index: 0
};

async function start() 
{
    for (let index = 1; index < 25; index++) 
    {
        dataToSend.index = index;
        var ID = "#" + index.toString() + "H";
        var obj = await ajax(dataToSend);
        var pic = "../Assets/Vending/Tins/" + obj.img + ".png";
        $(ID).attr("src", pic);
    }
}

function Close() 
{
    if(infoBox)
    {
        $("#InfoBox").slideToggle(1000, "swing");
        infoBox = false;
    }
}



var data;

function ajax(dataToSend) 
{
    return new Promise((resolve, reject) => 
    {
        $.ajax(
        {
            url: '../PHP/Main.php',
            method: 'POST',
            data: dataToSend,
            dataType: 'json',
            success: function(response) 
            {
                resolve(response); 
            },
            error: function(xhr, status, error) 
            {
                console.error(xhr.responseText);
                reject(error);
            }
        });
    });
}


$(document).ready(async function()
{
    start();
    infoBox = false;
    $(".Tin").click(async function()
    {
        if (!infoBox) 
        {    
            var TinId = $(this).attr('id');
            dataToSend.Table = "Machine";
            dataToSend.index = TinId;
            var obj = await ajax(dataToSend);

            var pic = "../Assets/Vending/Tins/" + obj.img + ".png";
            
            $("#ProPic").attr("src", pic);
            $("#TName").html(obj.name);
            $("#TQuantity").html(obj.Quantity);
            $("#TPrice").html("₹" + (obj.price));
            
            
            $("#InfoBox").slideToggle(1000, "swing");
            infoBox = true;
        }
    });

    
    $("#close").click(function()
    {
        Close();
    });    
});