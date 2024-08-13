<?php

$Type = $_POST['Table'];
$index = $_POST['index'];
$buy = $_POST['Buy'];
$Stock = $_POST['Stock'];
$Token = $_POST['Token'];
$Brahch = $_POST['branch'];

$con = new mysqli("localhost", "root" ,"1234", "$Brahch");

$query = "Update Machine Set product = '$buy', stock = $Stock where PosID = $index";
$result = mysqli_query($con, $query);   
$data = ['name' => "Name", 'price' => 0, 'img' => 0, 'Quantity' => 0];
$jsonResponse = json_encode($data);
echo $jsonResponse;

?>