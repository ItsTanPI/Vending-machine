function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//<td><a href = "ClientInfo.html?Count=${product.PurchaseID}&Token=${product.Token}&Branch=${product.branch}" target="_blank"><b>Open</b></a></td>
$(document).ready(async function() {
    var purchaseChart;

    while (true) {
        var selectedDate = $('#Date').val();
        if (!selectedDate) {
            selectedDate = 0;    
        }

        var selectedDateTo = $('#To').val();
        if (!selectedDateTo) {
            selectedDateTo = 0;    
        }

        var selectedPro = $('#product').val();

        var dataToSend = { Date: selectedDate, Item: selectedPro, To : selectedDateTo, branch: "vending"};
        var TotalPrice = 0;
        var TotalSold = 0;

        var toc = '';
        if ($("#Branch").val() != "All") 
        {
            dataToSend.branch = $("#Branch").val();
            await $.ajax({
            url: '../PHP/Purchase.php',
            method: 'POST',
            data: dataToSend,
            dataType: 'json',
            success: function(response) {
                let products = response;
                let tableContent = '';
                
                var index = 1;
                products.forEach(product => {
                    let br;
                    if (dataToSend.branch == "vending")
                    {
                        br = "CT";
                    }
                    else
                    {
                        br = "IT"
                    }

                    TotalPrice += parseInt(product.Price);
                    TotalSold++;
                    tableContent += `<tr>
                                        <td>${index}</td>
                                        
                                        <td>${product.ProductName}</td>
                                        <td>${product.Price}</td>
                                        <td>${product.Time}</td>
                                        <td>${br}</td>
                                        
                                    </tr>`;
                    index++;
                });

                $('#Info').html
                (
                    `<table>
                        <tr>
                            <td>
                                <h3> Products sold </h3>
                            </td>
                            <td>
                                <h3> &nbsp&nbsp:&nbsp&nbsp </h3>
                            </td> 
                            <td>
                                <h3> ${TotalSold} </h3>
                            <td>
                        </tr>

                        <tr>
                            <td>
                                <h3> Revenue </h3>
                            </td>
                            <td>
                                <h3> &nbsp&nbsp: &nbsp&nbsp</h3>
                            </td> 
                            <td>
                                <h3> ₹${TotalPrice} </h3>
                            <td>
                        </tr>
                    `
                );
                $('#availabilityTable').html(tableContent);

                let productCount = {};
                let selection = '<option value="all">All</option>';
                products.forEach(function(purchase) {
                    var productName = purchase.ProductName;
                    if (productCount[productName]) {
                        productCount[productName]++;
                    } else {
                        productCount[productName] = 1;
                        
                    }
                });

                var productNames = Object.keys(productCount);
                var productTotals = Object.values(productCount);


                var ctx = $('#purchase-chart');
                if (purchaseChart) {
                    purchaseChart.data.labels = productNames;
                    purchaseChart.data.datasets[0].data = productTotals;
                    purchaseChart.update();
                } else {
                    purchaseChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: productNames,
                            datasets: [{
                                label: 'Total Sold',
                                data: productTotals,
                                backgroundColor: 'rgba(200, 162, 0, 0.8)',
                               
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: true,
                                    }
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 1
                                    },
                                    grid: {
                                        display: true,
                                        color: 'rgba(200, 200, 200, 0.8)'
                                    }
                                }
                            }
                        }
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                reject(error);
            }
        });
        }
        else
        {
            var dataTable = '';
            var index = 1;
            var idindex = 0;
            var all = Array();  
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
                await $.ajax({
                url: '../PHP/Purchase.php',
                method: 'POST',
                data: dataToSend,
                dataType: 'json',
                success: function(response) {
                    products = response;
                    //console.log(response);
                    products.forEach(product => {
                        TotalPrice += parseInt(product.Price);
                        TotalSold++;
                        product.branch = dataToSend.branch;
                        all.push(product)
                        
                    });
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    reject(error);
                }
                
                });   
            }
            //console.log(dataTable);
            let productCount = {};
            let selection = '<option value="all">All</option>';
            //console.log(all);
            
            
            $('#Info').html
                    (
                        `<table>
                            <tr>
                                <td>
                                    <h3> Products sold </h3>
                                </td>
                                <td>
                                    <h3> &nbsp&nbsp:&nbsp&nbsp </h3>
                                </td> 
                                <td>
                                    <h3> ${TotalSold} </h3>
                                <td>
                            </tr>

                            <tr>
                                <td>
                                    <h3> Revenue </h3>
                                </td>
                                <td>
                                    <h3> &nbsp&nbsp: &nbsp&nbsp</h3>
                                </td> 
                                <td>
                                    <h3> ₹${TotalPrice} </h3>
                                <td>
                            </tr>
                        `
                    );

            all.sort((a, b) => new Date(a.Time) - new Date(b.Time));
            
            all.forEach(function (product) 
            {
                let br;
                if (product.branch == "vending")
                {
                    br = "CT";
                }
                else
                {
                    br = "IT"
                }
                dataTable += `<tr>
                                            <td>${index}</td>
                                            
                                            <td>${product.ProductName}</td>
                                            <td>${product.Price}</td>
                                            <td>${product.Time}</td>
                                            <td>${br}</td>
                                        </tr>`;
                        index++;    
            })

            
            
            all.forEach(function(purchase) {
                    //console.log(purchase);
                    var productName = purchase.ProductName;
                    if (productCount[productName]) {
                        productCount[productName]++;
                    } else {
                        productCount[productName] = 1;
                        
                    }
                });

                var productNames = Object.keys(productCount);
                var productTotals = Object.values(productCount);
                
                

                var ctx = $('#purchase-chart');
                if (purchaseChart) {
                    purchaseChart.data.labels = productNames;
                    purchaseChart.data.datasets[0].data = productTotals;
                    purchaseChart.update();
                } else {
                    purchaseChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: productNames,
                            datasets: [{
                                label: 'Total Sold',
                                data: productTotals,
                                backgroundColor: 'rgba(200, 162, 0, 0.8)',
                               
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    grid: {
                                        display: true,
                                    }
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 1
                                    },
                                    grid: {
                                        display: true,
                                        color: 'rgba(200, 200, 200, 0.8)'
                                    }
                                }
                            }
                        }
                    });
                }

            //console.log(dataTable);
            $('#availabilityTable').html(dataTable);

        }
        await delay(2000);
    }
});