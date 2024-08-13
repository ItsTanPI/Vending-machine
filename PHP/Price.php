<?php
$Brahch = $_POST['branch'];

$con = new mysqli("localhost", "root" ,"1234", "$Brahch");

$Pro = $_POST['ProID'];
$Price = $_POST['Price'];
$Name = $_POST['Name'];

$query = "Update Product Set price = $Price where proID = '$Pro';";
$result = $con->query($query);

if ($Name != "ooo") {
    $query = "Update Product Set Name = '$Name' where proID = '$Pro';";
    $result = $con->query($query);
}


$data = ['Type' => "$Brahch"];
$jsonResponse = json_encode($data);
echo $jsonResponse;
?>