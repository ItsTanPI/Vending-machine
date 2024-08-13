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
                    url: '../PHP/Price.php',
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

        var price = [];
        var NameData = [];
        var id = [];
        async function Reset() 
        {
            dataToSend.branch = $("#Branch").val();
            //console.log(dataToSend.branch); 
            await $.ajax({
                url: '../PHP/availability.php',
                method: 'POST',
                data: dataToSend,
                dataType: 'json',
                success: function(response) {
                    let products = response;
                    let tableContent = '';
                    var index = 0;
                    products.forEach(product => {
                        price[index] = product.price;
                        id[index] = product.proID;
                        NameData[index] = product.Name;
                        index++;
                        tableContent += `<tr>
                                            <td>${product.proID}</td>
                                            <td><img src="../Assets/Vending/Tins/${product.proID}.png" style= "height:50px; "></td>
                                            <td>
                                                ${product.Name}
                                            </td>
                                            <td>${product.quantity}</td>
                                            <td>
                                                <input type = "number" id ='${product.proID}' value = ${product.price} style = "background-color: rgba(100, 100, 100, 0.3); border: 0; text-align:center; border-radius:5px; width:75px;">
                                            </td>
                                        </tr>`;
                                        });
                                        //<input type ="" id ='${product.proID}N' value = "" style = "background-color: rgba(100, 100, 100, 0.3); border: 0; text-align:center; border-radius:5px; width:140px;">
                    $('#availabilityTable').html(tableContent);
                }
            });
        }

        async function Update() 
        {
            for (let i = 0; i < price.length; i++)
            {
                var pos = $("#" + id[i]).val();
                var posN = $("#" + id[i] + "N").val();
                if (pos != price[i])
                {
                    var dataToSend = {ProID: id[i], Price: pos, Name: "ooo"};
                    dataToSend.branch = $("#Branch").val();   
                    obj = await ajax(dataToSend);
                    console.log(obj);
                }
            }
        }


        var tempBrc;
        function delay(ms)
        {
            return new Promise(resolve => setTimeout(resolve, ms));
        }



        async function CKRS() 
        {
            while (true) 
            {
                if (tempBrc != $("#Branch").val())
                {
                    //console.log("Called");
                    tempBrc = $("#Branch").val();
                    await Reset();
                }
                await delay(1000);
            }
        }


        $(document).ready(async function()
        {
            CKRS();
            tempBrc = $("#Branch").val();
            await Reset();

            $("#Reset").click(async function()
            {
                await Reset();
            });

            $("#Update").click(async function()
            {
                await Update();

            });
        });