const currentURL = window.location.href;
const url = new URL(currentURL);
const params = new URLSearchParams(url.search);

const URLcount = params.get('Count');
const URLToken = params.get('Token');

console.log({URLcount, URLToken});

var dataToSend = 
{
    Table: 'Null',
    index: 0,
    Buy: "NULL",
    Stock : 0,
    Token: 0
};

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

function delay(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

var state = false;

$(document).ready(async function()
{
    $("#Start").click(async function()
    {
        var obj = {Token : null, Server : null, ClientD :null, ProductId : null}


        dataToSend.Table = "Client";
        dataToSend.index = URLcount;
        obj = await ajax(dataToSend);
        if(obj.Server = URLToken)
        {
            state = true;
            dataToSend.Table = "ClientConnected";
            dataToSend.index = URLcount;
            dataToSend.Token = URLToken;
            obj = await ajax(dataToSend);
            $(this).hide();
            $("#Select").show();
        }
        else
        {
            $("#Content").show();
        }

        await delay(10);

        while (state)
        {
            

            dataToSend.Table = "Client";
            dataToSend.index = URLcount;
            obj = await ajax(dataToSend);

            if (obj.ProductId) 
            {
                var pic = "../Assets/Vending/Tins/" + obj.ProductId + ".png";
                $("#Select").hide();
                $("img").attr("src", pic);
                $("img").show();
                $("#pay").show();
                await delay(1000);
            }
        }    
     
    });  
});