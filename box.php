<?php
$api_key = 'jxz1fx7k272kiv9bqaun01e4abylabxm';
$auth_token = $_GET['auth_token'];
//echo $auth_token;

require_once 'boxlibphp5.php';
$box = new boxclient($api_key, $auth_token);

if ($_GET['action'] == "get_account_tree")
{
	$foldertree = $box->getAccountTree();
	print json_encode($foldertree);
}
else if ($_GET['action'] == "create_folder")
{
	$response = $box->CreateFolder($_GET['foldername']);
	print json_encode($response);
}
else if ($_GET['action'] == "set_description")
{
	$response = $box->SetDescription($_GET['folderid'], $_GET['desc']);
	print json_encode($response);
}
?>
