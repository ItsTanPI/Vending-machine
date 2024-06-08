<?php 
include 'phpqrcode/qrlib.php'; 

$con = new mysqli("localhost", "root" ,"1234", "vending");
$query = "select * from TokenCount;";
$result = mysqli_query($con, $query);
$row = mysqli_fetch_assoc($result);
$count = $row['Count'];

$query = "Update TokenCount Set Count = Count + 1;";
$result = mysqli_query($con, $query);

$server = rand(1000, 9999);
$client = $server;


$query = "insert into Client (Token, Server) VALUES ($count, $server);";
$result = mysqli_query($con, $query);


$text = "http://192.168.43.170/HTML%20Project/Vending/HTML/ClientInfo.html"; 
$params = http_build_query(['Count' => $count, 'Token' => $server]);
$full_url = $text . '?' . $params;

QRcode::png($full_url); 
?>