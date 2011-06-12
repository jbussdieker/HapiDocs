<?php
require 'box_config.php';

// Get Ticket to Proceed
$ticket_return = $box->getTicket ();

if ($box->isError()) {
  echo $box->getErrorMsg();
  die();
} else {
	$ticket = $ticket_return['ticket'];
}

//$foldertree = $box->getAccountTree();

?>

<html>
<head>
<title>
	hapiDoc
</title>


<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">

<link type="text/css" charset="utf-8" rel="stylesheet" href="style.css">
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="index.js"></script>
<script type="text/javascript" src="toggle.js"></script>

</head>
<body onload="main()">
  <div style="display: none;" id="hdAuthToken"><?php echo $auth_token; ?></div>
	<div class="mainWrap">
		<div id="hdLeftBar" class="leftBarStyle" switchState="closed">
			<div class="menuButton" onclick="hdToggleMe('hdLeftBar')">Menu</div>
			<div class="menuItem" onclick="CreateFolder()">Create</div>
			<div class="menuItem" onclick="EditFolder()">Edit</div>
			<div class="menuItem" onclick="Delete()">Delete</div>
		</div>
		<div id="hdRightBar" class="rightBarStyle">
			<img onclick="HideImage()" id="hdImage" style="display:none">
			<div onclick="HideFile()" id="hdFile" switchstate="closed">
			</div>
			<div id="hdTopBar" class="topBarStyle">
			</div>
			<div id="hdMainContent" style="width:100%; height:100%;" class="mainContentStyle">
			</div>
		</div>
		<div id="hdMessageBox" class="messageBoxStyle" switchstate="closed"></div>
	</div>
</body>
</html>
