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

var obj = {Token : 0, Server : null, ClientD : null, ProductId : null}

$(document).ready(async function()
{

    while (true) 
    {
        await delay(1000    );
        dataToSend.Table = "QR";
        console.log(dataToSend);
        obj = await ajax(dataToSend);
        console.log(obj);
        if (obj.Server == obj.ClientD) 
        {
            const baseURL = "http://192.168.43.170/HTML%20Project/Vending/HTML/Main.html";
            const params = new URLSearchParams({ index: obj.Token, Token: obj.ClientD});
            const fullURL = `${baseURL}?${params.toString()}`;
            console.log(fullURL);


            //dataToSend.Table = "Update";
            //obj = await ajax(dataToSend);
            window.location.href = fullURL;
        }   

        
    }
});
