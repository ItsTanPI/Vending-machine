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
            console.log(dataToSend);
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

    var needRestock = false;
    var stkPoP = false;	
    async function stock()
    {
        while (true) 
        {	
            for (let i = 0; i <= 1; i++) 
            {
                if (i != 0) 
                {
                    dataToSend.branch = "vending" + i.toString()
                }
                else
                {
                    dataToSend.branch = "vending";
                }
                await $.ajax
                ({
                    url: '../PHP/stock.php',
                    method: 'POST',
                    data: dataToSend,
                    dataType: 'json',
                    success: function(response) {
                        let products = response;
                        let tableContent = '';
                        products.forEach(product => 
                        {
                            if (product.stock <= 5) 
                            {
                                needRestock = true;
                            }
                        });
                        $('#availabilityTable').html(tableContent);
                    }
                });
            }
            

            if (needRestock) 
            {
                $("#Alert").show();	
            }
            else
            {
                $("#Alert").hide();	
            }
            needRestock = false;
            await delay(2000);
            
        }
    }

    $(document).ready(async function()
    {

        stock()

                const buttonData = [
            { id: "#button1", src: "purchase.html" },
            { id: "#button2", src: "Admin.html" },
            { id: "#button3", src: "Update.html" },
            { id: "#button4", src: "availability.html" },
            { id: "#button5", src: "UserAccount.html" }
                ];

        buttonData.forEach(button => {
            $(button.id).click(async function() {

                buttonData.forEach(btn => $(btn.id).removeClass("menuActive"));
                $(this).addClass("menuActive");
                $("#iframe1").attr("src", button.src);
            });
        });
    });