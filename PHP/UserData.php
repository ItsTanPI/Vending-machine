<?php
$con = new mysqli("localhost", "root" ,"1234", "Client");

$query = "select * from Login;";
$result = mysqli_query($con, $query);;

$products = array();
while ($row = mysqli_fetch_assoc($result)) 
{
    array_push($products, $row);
}

echo json_encode($products);
?>
