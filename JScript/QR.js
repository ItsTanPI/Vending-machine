var dataToSend = 
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

var obj = {Token : 0, Server : null, ClientD : null, ProductId : null}


async function StartProcess() 
{
    while (true) 
    {
        await delay(1000);
        dataToSend.Table = "QR";
        dataToSend.branch = BranchQR;
        //console.log(dataToSend);
        obj = await ajax(dataToSend);
        console.log(obj);
        //console.log(obj);
        if (obj.Server == obj.ClientD) 
        {
            const baseURL = "Main.html";
            const params = new URLSearchParams({ index: obj.Token, Token: obj.ClientD, Branch: BranchQR});
            const fullURL = `${baseURL}?${params.toString()}`;
            //console.log(fullURL);


            //dataToSend.Table = "Update";
            //obj = await ajax(dataToSend);

            $("#movingImage").show();
            $("#movingImage").animate({left: "0%"}, 1500);
            await delay(1500);
            window.location.href = fullURL;
        }   
        $("#click").click(async function () 
        {
            const baseURL = "Main.html?index=0&Token=0&Branch =vending1";
            $("#movingImage").show();
            $("#movingImage").animate({left: "0%"}, 1500);
            await delay(1500);
            window.location.href = baseURL;
        })
        
    }    
}
var BranchQR;
var start = false;
$(document).ready(async function()
{
    
    //await delay(1000);
    $("#movingImage").hide();
    //$("#movingImage").animate({left: "000%"}, 1500);

    $("#QRButton").click(function () 
    {
        BranchQR = $("#Branch").val();
        console.log(BranchQR);
        
        if (BranchQR == "vending") 
        {
            var src = "../PHP/QR.php"   
            $("#QRImg").attr("src", src);
        }
        else
        {
            var src = "../PHP/QR1.php"   
            $("#QRImg").attr("src", src);
        }
        
        $("#text2").show();
        $("#QRImg").show();
        $("#Branch").hide();
        $("#text1").hide();
        $(this).hide();
        start = true;

        StartProcess();
    })


    
});
