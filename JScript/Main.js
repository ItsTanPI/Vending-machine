var infoBox = false;
var elem = document.getElementById("page");


const currentURL = window.location.href;
const url = new URL(currentURL);
const params = new URLSearchParams(url.search);

const URLcount = params.get('index');
const URLToken = params.get('Token');
const Branch = params.get('Branch');

var dataToSend = 
{
    Table: 'Null',
    index: 0,
    Buy: "NULL",
    Stock : 0,
    Token: 0,
    branch:"vending"
};

async function start() 
{
    
    dataToSend.Table = 'ALL';
    var obj = await ajax(dataToSend);
    //console.log(obj);
    for (let index = 1; index < 25; index++) 
    {
        var ID = "#" + index.toString() + "H";

        if (obj[index].stock <= 0) 
        {
            var pic = "../Assets/Vending/Tins/null.png";
            $(ID).attr("src", pic);
        }
        else
        {
            var pic = "../Assets/Vending/Tins/" + obj[index].proID + ".png";
            $(ID).attr("src", pic);
        }
        
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
    if (Branch != null) 
    {
        dataToSend.branch = Branch;
    }
    else
    {
        dataToSend.branch = "vending"
    }
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

function delay(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() 
{
    while (true) 
    {
        start();
        await delay(1000);
    }    

}

async function BuyCheck() 
{

    var dataToSend1 = 
    {
        Table: 'Null',
        index: 0,
        Buy: "NULL",
        Stock : 0,
        Token: 0
    };

    dataToSend1.Table = "BuycheckBABY";
    dataToSend1.index = URLcount;
    dataToSend1.Token = URLToken;
    dataToSend1.Branch = Branch;
    var obj = await ajax(dataToSend1);
    if (obj.Type == "Yep") 
    {  
        await delay(3000);
        const baseURL = "Thanks.html";
        window.location.href = baseURL;
    }
}

async function buyyy() 
{
    if (URLcount == null || URLToken == null) {
        return;
    }
    while (true) 
    {
        await BuyCheck();
        await delay(1000);
    }    

}



var curID;
$(document).ready(async function()
{
    //

    if (URLcount !=null  && URLToken!= null) 
    {
        $("#movingImage").show();
        $("#movingImage").animate({left: "-100%"}, 1500);
    }
    else
    {
        $("#movingImage").hide();
    }
    
    buyyy();
    loop();
    
    infoBox = false;
    
    await delay(1500);
    $("#movingImage").hide();

    $(".Tin").click(async function()
    {
        if (!infoBox) 
        {    
            
            var TinId = $(this).attr('id'); 
            dataToSend.Table = "Machine";
            dataToSend.index = TinId;
            
            var obj = await ajax(dataToSend);
            
            if (obj.Stock <= 0) 
            {
                var pic = "../Assets/Vending/Tins/null.png";
                curID = obj.img;
               
                console.log("hello");

                

                $("#ProPic").attr("src", pic);
                $("#TName").html("Out of Stock");
                $("#TQuantity").html("0");
                $("#TPrice").html("₹0");
                $(".BUYbtn").hide();
                return;
            }
            else
            {
                var pic = "../Assets/Vending/Tins/" + obj.img + ".png";
                curID = obj.img;

                $(".BUYbtn").show();
                $("#ProPic").attr("src", pic);
                $("#TName").html(obj.name);
                $("#TQuantity").html(obj.Quantity);
                $("#TPrice").html("₹" + (obj.price));
            }

            
            
            $("#InfoBox").slideToggle(1000, "swing");
            infoBox = true;
            setFontSize();
        }
        
    });

    $(".BUYbtn").click(async function () 
    {
        if (URLcount == null || URLToken == null) {
            return;
        }
        dataToSend.Table = "ClientBuy";
        dataToSend.Buy = curID;
        dataToSend.index = URLcount;
        dataToSend.Token = URLToken;
        await ajax(dataToSend); 
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