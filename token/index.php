<?php
function generate_unique_string() {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $string = '';
    $length = 100;
    $filename = 'strings.txt';

    // Read existing strings from file
    // $existing_strings = array();
    // if (file_exists($filename)) {
    //     $file_contents = file_get_contents($filename);
    //     $existing_strings = explode("\n", $file_contents);
    //     $existing_strings = array_map('trim', $existing_strings);
    // }

    // Generate a unique string until one is found that doesn't exist in the file

    do{
        $string = '';
        for ($i = 0; $i < $length; $i++) {
            $string .= $characters[rand(0, strlen($characters) - 1)];
        }
    }while(is_file($string));

    // Add the new string to the file

    return $string;
}
    $email = $_REQUEST["email"];
    if(is_dir("../clients/$email")){
        echo "true";
    }else{
        $random_bytes = random_bytes(32);
        $base64_encode = base64_encode($random_bytes);
        $unique_id = generate_unique_string();
        mkdir("../clients/$email");
        $file = fopen("../clients/$email/token", "w");
        fwrite($file, $unique_id);
        fclose($file);
        mkdir("../clients/$email/history");
        mkdir("../clients/$email/history/templates");
        mkdir("../clients/$email/history/chat");
        mkdir("../clients/$email/info");
        $emails = fopen("../clients/emails.txt", "a");
        fwrite($emails, $email."\n");
        fclose($emails);
        $info = fopen("../clients/$email/info/data", "w");
        fclose($info);
        $file = fopen($unique_id, "w");
        fwrite($file, $email);
        fclose($file);
        echo $unique_id;
    }
?>