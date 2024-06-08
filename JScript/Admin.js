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


$(document).ready(async function()
{
    $("#rest").click(async function()
    {
        var pos = $("#posId").val();
        var Pro = $('#product').val();
        var Stock = $('#stock').val();

        dataToSend.Table = "Admin";
        dataToSend.index = pos;
        dataToSend.Buy = Pro;
        dataToSend.Stock = Stock;
        console.log(dataToSend);

        obj = await ajax(dataToSend);
        console.log(obj);
                
    });  
});