<?php
$user = $_REQUEST["user"];
$file = fopen("../token/$user", "r");
$email = fgets($file);
fclose($file);

$json_data = "";
$data = fopen("../clients/$email/history/chat/data.json", "r");
while(!feof($data)){
    $json_data .= fgets($data);
}
echo $json_data;
?>