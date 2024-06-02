<?php

$Type = $_POST['Type'];
$index = $_POST['index'];

$softDrinks = [
    ['id' => 0, 'name' => 'Not Available', 'price' => 0, 'img' => 'missing'],
    ['id' => 1, 'name' => 'Coca Cola', 'price' => 110, 'img' => 'Tin1'],
    ['id' => 2, 'name' => 'Pepsi', 'price' => 120, 'img' => 'Tin2'],
    ['id' => 3, 'name' => 'Sprite', 'price' => 130, 'img' => 'Tin3'],
    ['id' => 4, 'name' => 'Fanta', 'price' => 140, 'img' => 'Tin4'],
    ['id' => 5, 'name' => 'Mountain Dew', 'price' => 150, 'img' => 'Bottel1'],
    ['id' => 6, 'name' => 'Dr Pepper', 'price' => 160, 'img' => 'Bar1'],
    ['id' => 7, 'name' => '7 Up', 'price' => 170, 'img' => 'Bar2'],
    ['id' => 8, 'name' => 'Root Beer', 'price' => 180, 'img' => 'Tin5'],
    ['id' => 9, 'name' => 'Coca Cola', 'price' => 110, 'img' => 'Tin6'],
    ['id' => 10, 'name' => 'Pepsi', 'price' => 120, 'img' => 'Tin7'],
    ['id' => 11, 'name' => 'Sprite', 'price' => 130, 'img' => 'Snack1'],
    ['id' => 12, 'name' => 'Fanta', 'price' => 140, 'img' => 'Snack2'],
    ['id' => 13, 'name' => 'Mountain Dew', 'price' => 150, 'img' => 'Bottel2'],
    ['id' => 14, 'name' => 'Dr Pepper', 'price' => 160, 'img' => 'Bar3'],
    ['id' => 15, 'name' => '7 Up', 'price' => 170, 'img' => 'Bar4'],
    ['id' => 16, 'name' => 'Root Beer', 'price' => 180, 'img' => 'Tin1'],
    ['id' => 17, 'name' => 'Coca Cola', 'price' => 110, 'img' => 'Tin2'],
    ['id' => 18, 'name' => 'Pepsi', 'price' => 120, 'img' => 'Tin3'],
    ['id' => 19, 'name' => 'Sprite', 'price' => 130, 'img' => 'Snack3'],
    ['id' => 20, 'name' => 'Fanta', 'price' => 140, 'img' => 'Snack4'],
    ['id' => 21, 'name' => 'Mountain Dew', 'price' => 150, 'img' => 'Bottel3'],
    ['id' => 22, 'name' => 'Dr Pepper', 'price' => 160, 'img' => 'Bar1'],
    ['id' => 23, 'name' => '7 Up', 'price' => 170, 'img' => 'Bar2'],
    ['id' => 24, 'name' => 'Root Beer', 'price' => 180, 'img' => 'Tin4']
];





$jsonResponse = json_encode($softDrinks[$index]);


echo $jsonResponse;
?>