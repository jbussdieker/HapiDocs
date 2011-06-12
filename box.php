<?php
$api_key = 'jxz1fx7k272kiv9bqaun01e4abylabxm';
$auth_token = $_GET['auth_token'];
//echo $auth_token;

require_once 'boxlibphp5.php';
$box = new boxclient($api_key, $auth_token);

if ($_GET['action'] == "get_account_tree")
{
	if (isset($_GET['folderid']))
		$foldertree = $box->getAccountTree($_GET['folderid']);
	else
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
else if ($_GET['action'] == "delete_folder")
{
	$response = $box->DeleteFolder($_GET['folderid']);
	print json_encode($response);
}
else if ($_GET['action'] == "delete_file")
{
	$response = $box->DeleteFile($_GET['fileid']);
	print json_encode($response);
}
?>
