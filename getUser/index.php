<?php
$format = $_REQUEST["format"];
$data = "";
if($format == "email"){
    $email = $_REQUEST["user"];
    $file = fopen("../clients/$email/info/data", "r");
    while(!feof($file)) {
      $data .= fgets($file);
    }
    fclose($file);
    echo $data;
}else{
    $user = $_REQUEST["user"];
    $file = fopen("../token/$user", "r");
    $email = fgets($file);
    fclose($file);

    $file = fopen("../clients/$email/info/data", "r");
    while(!feof($file)) {
      $data .= fgets($file);
    }
    fclose($file);
    echo $data;
}
?>