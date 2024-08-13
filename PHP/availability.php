<?php
$Brahch = $_POST['branch'];
$con = new mysqli("localhost", "root" ,"1234", "$Brahch");

$query = "select * from Product";
$result = mysqli_query($con, $query);;

$products = array();
while ($row = mysqli_fetch_assoc($result)) 
{
    array_push($products, $row);
}

echo json_encode($products);
?>
