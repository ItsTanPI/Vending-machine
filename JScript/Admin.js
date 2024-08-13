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


$(document).ready(async function()
{
    $("#rest").click(async function()
    {
        var pos = $("#posId").val();
        var Stock = $('#stock').val();

        dataToSend.Table = "Admin";
        dataToSend.index = pos;
        dataToSend.Stock = Stock;
        //console.log($("#Branch").val());
        dataToSend.branch = $("#Branch").val();
        //console.log(dataToSend);

        obj = await ajax(dataToSend);
        //console.log(obj);
                
    });  
});