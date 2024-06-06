var infoBox = false;
var count = 0;

const dataToSend = 
{
    Table: 'Null',
    index: 0
};

async function start() 
{
    dataToSend.Table = 'ALL';
    var obj = await ajax(dataToSend);
    for (let index = 1; index < 25; index++) 
    {
        var ID = "#" + index.toString() + "H";
        var pic = "../Assets/Vending/Tins/" + obj[index].proID + ".png";
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
            setFontSize();
        }
        
    });

    $("#close").click(function()
    {
        Close();
    });    
});


function setFontSize() {
    var parent = document.querySelector('.DescBox');
    var child = document.querySelector('.BUYbtn');
    var parentHeight = parent.offsetWidth;
    child.style.fontSize = (parentHeight * 0.10) + 'px';
}

window.addEventListener('resize', setFontSize);