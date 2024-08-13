<?php
$Type = $_POST['Type'];
$Number = $_POST['Number'];
$OTP = $_POST['OTP'];
$NEWPASS = $_POST['NEWPASS'];


$con = new mysqli("localhost", "root" ,"1234", "Client");

require_once 'Twilio/autoload.php';
use Twilio\Rest\Client;


function SendOTP($con, $Number)
{
    $otp = rand(10000, 99999);

    $num = intval($Number);
    $query = "select * from Login where Pno = $num;";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($result);

    if (!($row))
    {
        $data = ['Type' => "Number does not Exist"];
        $jsonResponse = json_encode($data);
        echo $jsonResponse;
        return;
    }

    $query = "INSERT INTO OTP (Pno, OTP, Verified) VALUES ('$Number', $otp, 'f') ON DUPLICATE KEY UPDATE OTP = VALUES(OTP), Verified = 'f';";
    
    //$query = "select * from otp where Pno = '$Number';";
    $result = mysqli_query($con, $query);

    
    /*$sid    = "";
    $token  = "";
    $client = new Client($sid, $token);
    $numbertosend = "+91".$Number;
    $message = $client->messages->create(
        '+', // the phone number you want to send to
        [
            'from' => '+', // your Twilio number
            'body' => "simulation of Vending Machine \nYour OTP is: $otp"
        ]
    );
    */
    //echo "Message sent with SID: " . $message->sid;

    $data = ['Type' => "Success"];
    $jsonResponse = json_encode($data);
    echo $jsonResponse;
}


function Verfiy($con, $Number, $OTP, $NEWPASS)
{
    $num = intval($Number);
    $query = "select * from Login where Pno = $num;";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($result);

    if ($row)
    {
        $otp12 = intval($OTP);
        $query1 = "select * from otp where Pno = '$Number' and OTP = $otp12;";
        $result1 = mysqli_query($con, $query1);
        $row1 = mysqli_fetch_assoc($result1);

        if ($row1) 
        {
            $query2 = "update Login set pass = '$NEWPASS' where Pno = $num;";
            $result2 = mysqli_query($con, $query2);
            //$row2 = mysqli_fetch_assoc($result);

            $data = ['Type' => "Done :)"];
            $jsonResponse = json_encode($data);
            echo $jsonResponse;
            return;
        }
        else 
        {
            $data = ['Type' => "Invalid OTP"];
            $jsonResponse = json_encode($data);
            echo $jsonResponse;
            return;
        }

    }
    else 
    {
        $data = ['Type' => "Invalid Number"];
        $jsonResponse = json_encode($data);
        echo $jsonResponse;
        return;
    }
}

if ($Type == "SendOTP") 
{
    SendOTP($con, $Number);
}
else if($Type == "Verfiy")
{
    Verfiy($con, $Number, $OTP, $NEWPASS);
}

?>