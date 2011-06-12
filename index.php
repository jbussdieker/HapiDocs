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
	hapiDocs
</title>


<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">

<link type="text/css" charset="utf-8" rel="stylesheet" href="style.css">
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="index.js"></script>
<script type="text/javascript" src="scroll.js"></script>
<script type="text/javascript" src="toggle.js"></script>

</head>
<body onload="main()">
  <div id="hdAuthToken"><?php echo $auth_token; ?></div>
	<div class="mainWrap">
		<div id="hdLeftBar" class="leftBarStyle" switchstate="closed">
			<div class="menuButton" onclick="hdToggleMe('hdLeftBar')">Menu</div>
			<div class="menuItem" onclick="CreateFolder()">New Folder</div>
		</div>
		<div id="hdRightBar" class="rightBarStyle">
			<img onclick="HideImage()" id="hdImage" switchstate="close">
			<div onclick="HideFile()" id="hdFile" switchstate="close">
				<div id="hdFileBody" class="scrollable vertical fileList"></div>
			</div>
			<div id="hdMainContent" class="mainContentStyle">
			</div>
		</div>
		<div id="hdMessageBox" class="messageBoxStyle" switchstate="close">
			<div id="hdFileList" class="scrollable vertical fileList"></div>
	</div>
	</div>
</body>
</html>
