<?php 
include 'phpqrcode/qrlib.php'; 

$con = new mysqli("localhost", "root" ,"1234", "vending1");
$query = "select * from TokenCount;";
$result = mysqli_query($con, $query);
$row = mysqli_fetch_assoc($result);
$count = $row['Count'];
//$Brahch = $_POST['branch'];

$query = "Update TokenCount Set Count = Count + 1;";
$result = mysqli_query($con, $query);

$server = rand(1000, 9999);
$client = $server;


$query = "insert into Client (Token, Server) VALUES ($count, $server);";
$result = mysqli_query($con, $query);


function generate_stylized_qr($data) 
{
    
    ob_start();
    QRcode::png($data, null, QR_ECLEVEL_H, 10, 4);
    $image_string = ob_get_contents();
    ob_end_clean();


    $qr_image = imagecreatefromstring($image_string);
    $width = imagesx($qr_image);
    $height = imagesy($qr_image);


    $styled_image = imagecreatetruecolor($width, $height);
    imagesavealpha($styled_image, true);
    $trans_color = imagecolorallocatealpha($styled_image, 0, 0, 0, 127);
    imagefill($styled_image, 0, 0, $trans_color);


    $dot_color = imagecolorallocate($styled_image, 0, 0, 0);


    for ($x = 0; $x < $width; $x++) 
    {
        for ($y = 0; $y < $height; $y++) 
        {
            $pixel_color = imagecolorat($qr_image, $x, $y);
            if ($pixel_color != 0)
            {
                imagesetpixel($styled_image, $x, $y, $dot_color);
            }
        }
    }

    header('Content-Type: image/png');
    imagepng($styled_image);

    imagedestroy($qr_image);
    imagedestroy($styled_image);

}

$text = "https://192.168.43.170/HTML%20Project/Vending/HTML/ClientInfo.html"; 
$params = http_build_query(['Count' => $count, 'Token' => $server, 'Branch' => 'vending1']);
$full_url = $text . '?' . $params;


generate_stylized_qr($full_url);
//QRcode::png($full_url); 
?>