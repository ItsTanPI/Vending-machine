<?php
$Brahch = $_POST['branch'];
$con = new mysqli("localhost", "root" ,"1234", "$Brahch");

$From = $_POST['Date'];
$To = $_POST['To'];
$Item = $_POST['Item'];

$query = "Select * from purchase";
$result = $con->query($query);
if ($From == 0 && $Item == 'all' && $To == 0) {
    $query = "SELECT * FROM purchase";
} elseif ($From != 0 && $Item == 'all' && $To == 0) {   
    $query = "SELECT * FROM purchase WHERE DATE(Time) >= '$From'";
} elseif ($From == 0 && $Item != 'all' && $To == 0) {   
    $query = "SELECT * FROM purchase WHERE proId = '$Item'";
} elseif ($From != 0 && $Item != 'all' && $To == 0) {   
    $query = "SELECT * FROM purchase WHERE DATE(Time) >= '$From' AND proId = '$Item'";
} elseif ($From == 0 && $Item == 'all' && $To != 0) {
    $query = "SELECT * FROM purchase WHERE DATE(Time) <= '$To'";
} elseif ($From != 0 && $Item == 'all' && $To != 0) {
    $query = "SELECT * FROM purchase WHERE DATE(Time) >= '$From' AND DATE(Time) <= '$To'";
} elseif ($From == 0 && $Item != 'all' && $To != 0) {
    $query = "SELECT * FROM purchase WHERE proId = '$Item' AND DATE(Time) <= '$To'";
} elseif ($From != 0 && $Item != 'all' && $To != 0) {
    $query = "SELECT * FROM purchase WHERE proId = '$Item' AND DATE(Time) >= '$From' AND DATE(Time) <= '$To'";
}

$result = $con->query($query);

$products = array();
while ($row = $result->fetch_assoc()) {
    array_push($products, $row);
}

echo json_encode($products);
?>
