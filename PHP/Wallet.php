<?php

$Type = $_POST['Table'];
$index = $_POST['index'];
$buy = $_POST['Buy'];
$Stock = $_POST['Stock'];
$Token = $_POST['Token'];
$Brahch = $_POST['branch'];

$con = new mysqli("localhost", "root" ,"1234", "client");




function Login($con, $index, $Token)
{
    $query = "select * from Login where Pno = $index;";
    $result = mysqli_query($con, $query);   

    $row = mysqli_fetch_assoc($result);
    if($row) 
    {
        $query1 = "select * from Login where Pno = $index and pass = '$Token';";
        $result1 = mysqli_query($con, $query1);   
        $out = mysqli_fetch_assoc($result1);

        if($out) 
        {
            $data = ['Price' => $out["Wallet"]];
            $jsonResponse = json_encode($data);
            echo $jsonResponse;
        }
        else 
        {
            $data = ['Type' => "Incorrect Pin"];
            $jsonResponse = json_encode($data);
            echo $jsonResponse;    
        }
    }
    else 
    {
        $data = ['Type' => "Create"];
        $jsonResponse = json_encode($data);
        echo $jsonResponse;
    }
}


function CreateLogin($con, $index, $Token)
{
    $query = "insert into Login values($index, 0, '$Token');";
    $result = mysqli_query($con, $query);   
  
    $data = ['Price' => 0, 'Type' => "Done"];
    $jsonResponse = json_encode($data);
    echo $jsonResponse;
}


function UpdateWallet($con, $index, $buy, $Token)
{
    $query = "update Login set Wallet = Wallet + $buy where Pno = $index and pass = '$Token';";
    $result = mysqli_query($con, $query);

    $query1 = "select * from Login where Pno = $index and pass = '$Token';";
    $result1 = mysqli_query($con, $query1);   
    $out = mysqli_fetch_assoc($result1);

    if($out) 
    {
        $data = ['Price' => $out["Wallet"]];
        $jsonResponse = json_encode($data);
        echo $jsonResponse;
    }

}

if ($Type == 'Login') 
{
    Login($con, $index, $Token);
}
elseif ($Type == "CreateLogin") 
{
    CreateLogin($con, $index, $Token);
}
elseif ($Type == "UpdateWallet") 
{
    UpdateWallet($con, $index, $buy, $Token);
}

?>