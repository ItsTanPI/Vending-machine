<?php
$Brahch = $_POST['branch'];
$con = new mysqli("localhost", "root" ,"1234", "$Brahch");

$query = "select * from Machine, Product where Machine.product = Product.proID;";
$result = $con->query($query);

$products = array();
while ($row = $result->fetch_assoc()) {
    array_push($products, $row);
}

$jsonResponse = json_encode($products);
echo $jsonResponse;
?>
