<?php
$email = $_REQUEST["email"];
$id = $_REQUEST["id"];
$photo = $_REQUEST["photo"];
$name = $_REQUEST["name"];

$data = array(
    'userid' => strval($id),
    'email' => strval($email),
    'photo' => strval($photo),
    'name' => strval($name)
);
$json = json_encode($data, JSON_PRETTY_PRINT);
$file = fopen("../clients/$email/info/data", "w");
fwrite($file, $json);
fclose($file);
?>