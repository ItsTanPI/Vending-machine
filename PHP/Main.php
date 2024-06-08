<?php

$Type = $_POST['Table'];
$index = $_POST['index'];
$buy = $_POST['Buy'];
$Stock = $_POST['Stock'];
$Token = $_POST['Token'];

$con = new mysqli("localhost", "root" ,"1234", "vending");

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

function oneAtaTime($con, $index)
{
    $query = "select product from Machine where posId = $index;";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($result);
    $id = $row['product'];

    $query = "select * from Product where proID = '$id';";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($result);
    $data = ['name' => $row["Name"], 'price' => $row["price"], 'img' => $id, 'Quantity' => $row["quantity"]];

    $jsonResponse = json_encode($data);

    echo $jsonResponse;
}

function Client($con, $index)
{
    $query = "Select * from Client where Token = $index;";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($result);
    $jsonResponse = json_encode($row);
    echo $jsonResponse;
}

function ClientBuy($con, $buy, $index, $Token)
{
    $query = "Update Client Set ProductId = '$buy', ClientD = $Token where Token = $index";
    $result = mysqli_query($con, $query);
    $data = ['name' => "Name", 'price' => 0, 'img' => 0, 'Quantity' => 0];

    $jsonResponse = json_encode($data);

    echo $jsonResponse;
}

function Admin($con, $index, $buy, $Stock)
{
    $query = "Update Machine Set product = '$buy', stock = $Stock where PosID = $index";
    $result = mysqli_query($con, $query);   

    $data = ['name' => "Name", 'price' => 0, 'img' => 0, 'Quantity' => 0];

    $jsonResponse = json_encode($data);

    echo $jsonResponse;
}

function ClientConnected($con, $index, $Token)
{
    $query = "Update Client Set ClientD = $Token where Token = $index;";
    $result = mysqli_query($con, $query);

    $jsonResponse = json_encode($result);

    echo $jsonResponse;
}

function QR($con)
{
    $query = "select * from TokenCount;";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($result);
    $count = $row['Count'] - 1 ;

    $query = "Select * from Client where Token = $count;";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($result);
    $jsonResponse = json_encode($row);
    echo $jsonResponse;
}

function Update($con)
{
    $query = "Update TokenCount Set Count = Count + 1;";
    mysqli_query($con, $query);

    $data = ['name' => "Name", 'price' => 0, 'img' => 0, 'Quantity' => 0];

    $jsonResponse = json_encode($data);

    echo $jsonResponse;
}


if ($Type == 'ALL') 
{
    ALL($con);
}
elseif ($Type == "Machine")
{
    oneAtaTime($con, $index);
}
elseif ($Type == "Client") 
{
    Client($con, $index);
}
elseif ($Type == "ClientBuy") 
{
    ClientBuy($con, $buy, $index, $Token);
}
elseif ($Type == "Admin") 
{
    Admin($con, $index, $buy, $Stock);
}
elseif ($Type == "ClientConnected") 
{
    ClientConnected($con, $index, $Token);
}
elseif ($Type == "QR") 
{
    QR($con);
}
elseif ($Type == "Update") 
{
    Update($con);
}

$con->close();

?>