<?php

$Type = $_POST['Table'];
$index = $_POST['index'];

$con = new mysqli("localhost", "root" ,"1234", "vending");


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
?>