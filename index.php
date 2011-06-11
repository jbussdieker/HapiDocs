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

</head>
<body>
  <div style="display: none;" id="hdAuthToken"><?php echo $auth_token; ?></div>
	<div class="mainWrap">
		<div onclick="hdToggleMe('hdLeftBar')" id="hdLeftBar" class="leftBarStyle" switchState="closed"></div>
		<div id="hdRightBar" class="rightBarStyle">
			<div id="hdTopBar" class="topBarStyle">
			</div>
			<div id="hdMainContent" style="width:100%; height:100%;" class="mainContentStyle"></div>
		</div>
		<div id="hdMessageBox" class="messageBoxStyle"></div>
	</div>
	<script type="text/javascript" src="toggle.js"></script>
</body>
</html>
<script type="text/javascript">
var map;

function getdatatest()
{
  //alert("starting get data test");
  xhr = new XMLHttpRequest();
  xhr.open("GET", "box.php?auth_token=" + document.getElementById('hdAuthToken').innerHTML, false);
  xhr.send();
  
  var folders = JSON.parse(xhr.responseText);
  
  infowindow = new google.maps.InfoWindow({content: '', size: new google.maps.Size(100,100)});
  for (var i in folders)
  {
    if (folders[i].tag == "FOLDER")
    {
      if (folders[i].type == "open")
      {
        var curfile = folders[i].attributes;
        
        //console.log(folders[i]);
        if (curfile.DESCRIPTION != "")
        {
          
          var gpspos = curfile.DESCRIPTION;
          
					var latLng = new google.maps.LatLng(gpspos.split(",")[1], gpspos.split(",")[0]);
					marker = new google.maps.Marker({title: curfile.NAME + "<br>Files: " + curfile.FILE_COUNT, position: latLng, map: map});
					google.maps.event.addListener(marker, 'click', function(event)
					  {
					    infowindow.content = this.title;
					    infowindow.open(map, this);
					    this.setZIndex(-1);
				    });
				}
					
					//markersArray.push(marker);
          //alert(gpspos.split(",")[0] + "qwerty" + gpspos.split(",")[1]);          
      }
    }
  }
}

function initialize()
{
  var mapDiv = document.getElementById('hdMainContent');
  map = new google.maps.Map(
  	mapDiv, {
	  	center: new google.maps.LatLng(0,0), 
	  	zoom: 14, 
	  	mapTypeId: google.maps.MapTypeId.ROADMAP, 
	  	disableDefaultUI: true
	  	}
	  );
	getdatatest();
}

function panMap(latitude, longitude)
{
  google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
    window.setTimeout(function() {
      map.panTo(new google.maps.LatLng(latitude, longitude));
    }, 1000);
  });
}

function positionCallback(position)
{
	panMap(position.coords.latitude, position.coords.longitude);
}

function errorCallback(error)
{
}

//navigator.geolocation.getCurrentPosition(positionCallback);
navigator.geolocation.watchPosition(positionCallback, errorCallback, {enableHighAccuracy:true});
google.maps.event.addDomListener(window, 'load', initialize);

</script>