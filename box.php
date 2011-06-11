<?php
$api_key = 'jxz1fx7k272kiv9bqaun01e4abylabxm';
$auth_token = $_GET['auth_token'];
//echo $auth_token;

require_once 'boxlibphp5.php';
$box = new boxclient($api_key, $auth_token);

//require 'box_config.php';
$foldertree = $box->getAccountTree();
print json_encode($foldertree);
?>
