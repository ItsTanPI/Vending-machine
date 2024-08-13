const currentURL = window.location.href;
const url = new URL(currentURL);
const params = new URLSearchParams(url.search);

const URLcount = params.get('Count');
const URLToken = params.get('Token');
const Branch = params.get('Branch');

console.log({URLcount, URLToken});

var calledLoop = false;

var dataToSend = 
{
    Table: 'Null',
    index: 0,
    Buy: "NULL",
    Stock : 0,
    Token: 0,
    branch:"vending"
};

var dataToWallet = 
{
    Table: 'Null',
    index: 0,
    Buy: "NULL",
    Stock : 0,
    Token: 0,
    branch:"vending"
};

function ajax(dataToSend) 
{
    dataToSend.branch = Branch;
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


function ajaxWallet(dataToSend) 
{
    dataToSend.branch = Branch;
    return new Promise((resolve, reject) => 
    {
        $.ajax(
        {
            url: '../PHP/Wallet.php',
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
var Price = 0;
var add = true;

function Close() 
    {
        if(add)
        {
            $("#addMoney").slideToggle(1000, "swing");
            infoBox = false;
        }
    }


var Create = false;

var currentUser = {Pno: 0, Wallet: 0, pass : "kk"};

async function keepLoop() 
{
    while (!payed) 
    {
        //console.log(`Wallet: ${currentUser.Wallet}, Price: ${Price}`);
        if (currentUser.Wallet >= parseInt(Price)) 
        {   
            //console.log("Shoe");
            $("#pay").show();
        }   
        else
        {
            //console.log("Dont");
            $("#pay").hide();
        }
        await delay(100);
    }   
}


$(document).ready(async function()
{
    
    $("#pay").hide();
    //$("#Login").hide();
    $("#Start").hide();


    $("#LoginNow").click(async function () 
    {

        var pass = $("#pass1").val() + $("#pass2").val() + $("#pass3").val() + $("#pass4").val();
        console.log(Number.isNaN(pass));
        if(($("#PhoneNum").val()).length != 10  || pass.length != 4 || Number.isNaN(parseInt(pass)) || ($("#PhoneNum").val()).charAt(0) == '0')
        {
            $("#LogInLog").css("color", "red");
            $("#LogInLog").html("Invalid Input");
            $("#LogInLog").show();
            return;
        }
        
        if (Create) 
        {
              
            dataToWallet.Table = "CreateLogin";
            dataToWallet.index = parseInt($("#PhoneNum").val());
            dataToWallet.Token = $("#pass1").val() + $("#pass2").val() + $("#pass3").val() + $("#pass4").val();
            var login = await ajaxWallet(dataToWallet);

            if (login.Type == "Done") 
            {
                currentUser.Pno = dataToWallet.index;
                currentUser.Wallet = 0;
                currentUser.pass = dataToWallet.Token;
                
                console.log("Created");
                $("#Login").slideToggle(1000, "swing");

                $("#updateWallet").html(currentUser.Wallet);
                $("#WalletPrice").show();
                $("#Start").show();
                Create = false;
            }
            return;
        }

        dataToWallet.Table = "Login";
        dataToWallet.index = parseInt($("#PhoneNum").val());
        dataToWallet.Token = $("#pass1").val() + $("#pass2").val() + $("#pass3").val() + $("#pass4").val();
        console.log(dataToWallet);

        var login = await ajaxWallet(dataToWallet);
        console.log(login);

        if (login.Type == "Incorrect Pin") 
        {
            $("#LogInLog").css("color", "red");
            $("#LogInLog").html("Incorrect Pin");
            $("#LogInLog").show();
        }
        else if (login.Type == "Create") 
        {
            $("#LogInLog").css("color", "blue");
            $("#LogInLog").html("Create Account");
            $("#LogInLog").show();
            $("#LoginNow").html("Create");
            Create = true;
        }
        else
        {
            currentUser.Pno = dataToWallet.index;
            currentUser.Wallet = (login.Price);
            currentUser.pass = dataToWallet.Token;

            $("#updateWallet").html(currentUser.Wallet);
            $("#WalletPrice").show();
            $("#Start").show();
            $("#Login").slideToggle(1000, "swing");
        }
    })

    $("#AddtheMoneyToBank").click(async function () 
    {
        var moneyMoney = parseInt($("#NewAdd").val());
        if (moneyMoney <= 0) 
        {
            return;
        }

        dataToWallet.Table = "UpdateWallet";
        dataToWallet.index = currentUser.Pno;
        dataToWallet.Buy = moneyMoney;
        dataToWallet.Token = currentUser.pass;
        console.log("Hello");
        console.log(dataToWallet);
        out = await ajaxWallet(dataToWallet);
        currentUser.Wallet = out.Price;
        $("#updateWallet").html(currentUser.Wallet);
        Close();

    })

    
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
            $("#WalletPrice").hide();
            payed = true;
            console.log("yes");
            var pic = "../Assets/Vending/Tins/" + obj.name + ".png";
            $("#Select").hide();
            $("#tinnn").attr("src", pic);
            $("#tinnn").css("pointer-events", "auto")
            $("#tinnn").show();
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
        
        
        
        $("#Select").show();
        while (state && !payed)
        {
            dataToSend.Table = "Client";
            dataToSend.index = URLcount;
            obj = await ajax(dataToSend);
            
            //console.log(`Price: ${Price}`);
            if (obj.ProductId) 
            {
                
                dataToSend.Table = "priceCheck";
                dataToSend.Buy = obj.ProductId;
                var obj2 = await ajax(dataToSend);
                Price = obj2.price;
                
                item = obj.ProductId;
                
                
                //console.log(item);
                var pic = "../Assets/Vending/Tins/" + item + ".png";
                $("#pay").html(`&#8377 ${Price}`);
                //$("#pay").show();
                $("#Select").hide();
                $("#tinnn").attr("src", pic);
                $("#tinnn").show();
                $("#tinnn").css("pointer-events", "none")

                if (!calledLoop) 
                {
                    keepLoop();
                    calledLoop = true;
                }
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


        dataToWallet.Table = "UpdateWallet";
        dataToWallet.index = currentUser.Pno;
        dataToWallet.Buy = -1*Price;
        dataToWallet.Token = currentUser.pass;

        
        console.log(dataToSend);
        var obj = await ajax(dataToSend);
        var out = await ajaxWallet(dataToWallet);
        console.log(obj);
        console.log(out);


        if (obj.Type != "Already Exist") 
        {
            $("#WalletPrice").hide();
            $("#tinnn").css("pointer-events", "auto")
            payed = true;
            $("#pay").hide();
            $("#Sucess").show();
            lottie.loadAnimation({
                container: document.getElementById('Sucess'),
                renderer: 'svg', 
                loop: false,
                autoplay: true, 
                path: '../Assets/Ui/Sucess1.json'
            });
            await delay(5000);
            $("#Sucess").hide();
        }
    });

    $("#close").click(function()
    {
        Close();
    });    

    $("#AddToWallet").click(function () 
    {
        Close();
    })
});