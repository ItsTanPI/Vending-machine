<?php

$Type = $_POST['Table'];
$index = $_POST['index'];

$con = new mysqli("localhost", "root" ,"1234", "vending");

function oneAtaTime($con, $index)
{
    $query = "select product from Machine where posId = $index";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($result);
    $id = $row['product'];

    $query = "select * from Product where proID = '$id'";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($result);
    $data = ['name' => $row["Name"], 'price' => $row["price"], 'img' => $id, 'Quantity' => $row["quantity"]];

    $jsonResponse = json_encode($data);

    echo $jsonResponse;
}


function ALL($con)
{
    $query = " select * from Machine, Product where Machine.product = Product.proID;";
    $result = mysqli_query($con, $query);
    
    $products = array(array('proID' => '0', 'name' => '0', 'quantity' => '0', 'price' => 0));

    while($row = mysqli_fetch_assoc($result)) 
    {
        array_push($products, $row);
    }



    $jsonResponse = json_encode($products);

    echo $jsonResponse;

}

if ($Type == 'ALL') 
{
    ALL($con);
}
else 
{
    oneAtaTime($con, $index);
}

?>