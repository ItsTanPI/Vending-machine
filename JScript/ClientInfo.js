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
var payed = false;

var item;

$(document).ready(async function()
{
    
    $("#pay").hide();
    $("#Start").click(async function()
    {

        dataToSend.Table = "Pay";
        dataToSend.index = URLcount;
        dataToSend.Token = URLToken;
        dataToSend.Buy = "404";
        console.log(dataToSend);
        var obj = await ajax(dataToSend);
        console.log(obj);
        if (obj.Type == "Already Exist") 
        {
            payed = true;
            console.log("yes");
            var pic = "../Assets/Vending/Tins/" + obj.name + ".png";
            $("#Select").hide();
            $("img").attr("src", pic);
            $("img").show();
            $(this).hide();
            return;
        }

        var obj = {Token : null, Server : null, ClientD :null, ProductId : null}


        dataToSend.Table = "Client";
        dataToSend.index = URLcount;
        dataToSend.Token = URLToken;
        obj = await ajax(dataToSend);
        if(obj.Server == URLToken)
        {
            state = true;
            dataToSend.Table = "ClientConnected";
            dataToSend.index = URLcount;
            dataToSend.Token = URLToken;
            obj = await ajax(dataToSend);
            $(this).hide();
            
            
        }
        else
        {
            $("#Start").hide();
            $("#Content").show();
            
        }

        await delay(10);

        
        $("#Select").show();
        while (state && !payed)
        {
            
            dataToSend.Table = "Client";
            dataToSend.index = URLcount;
            obj = await ajax(dataToSend);

            if (obj.ProductId) 
            {
                item = obj.ProductId;
                console.log(item);
                var pic = "../Assets/Vending/Tins/" + item + ".png";
                $("#pay").show();
                $("#Select").hide();
                $("img").attr("src", pic);
                $("img").show();
                await delay(1000);
            }
        }
    });  



    $("#pay").click(async function () 
    {
        var Index = URLcount;
        var Token = URLToken;
        var Current = new Date();

        var Year = Current.getFullYear();
        var Month = Current.getMonth() + 1; 
        var date = Current.getDate(); 
        var Hours = Current.getHours();
        var Minutes = Current.getMinutes();
        var Seconds = Current.getSeconds();

        var SQLDate = Year.toString() + "-" +  Month.toString() + "-" + date.toString();
        var SQLTime = Hours.toString() +":" + Minutes.toString() + ":" + Seconds.toString();


        dataToSend.Table = "Pay";
        dataToSend.index = Index;
        dataToSend.Token = Token;
        dataToSend.Buy = item;


        console.log(dataToSend);
        var obj = await ajax(dataToSend);
        console.log(obj);

        if (obj.Type != "Already Exist") 
        {
            payed = true;
            $("#pay").hide();
            $("#Sucess").show();
            lottie.loadAnimation({
                container: document.getElementById('Sucess'), // Specify the container element
                renderer: 'svg', // Choose the renderer
                loop: false, // Set loop to true if needed
                autoplay: true, // Autoplay the animation
                path: '../Assets/Ui/Sucess1.json' // Path to your JSON animation file
            });
            await delay(5000);
            $("#Sucess").hide();
        }
    });
});