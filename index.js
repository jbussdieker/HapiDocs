var map;
var markersArray = [];
var curlng;
var curlat;

function CreateFolder()
{
	var fn = prompt("Enter folder name.");
  xhr = new XMLHttpRequest();
  xhr.open("GET", "box.php?action=create_folder&foldername=" + fn + "&auth_token=" + document.getElementById('hdAuthToken').innerHTML, false);
  xhr.send();
	var response = JSON.parse(xhr.responseText);
	for (var i in response)
	{
		if (response[i].tag == "FOLDER_ID")
		{
			xhr.open("GET", "box.php?action=set_description&folderid=" + response[i].value + "&desc=" + curlng + "," + curlat + "&auth_token=" + document.getElementById('hdAuthToken').innerHTML, false);
			xhr.send();
			var response2 = JSON.parse(xhr.responseText);
		}
	}
	PlotFolders();
}

function ListView()
{
	alert("List View");
}

function Delete()
{
	alert("Delete");
}

function clearOverlays() {
	if (markersArray) {
		for (i in markersArray) {
			markersArray[i].setMap(null);
		}
	}
}

// Place markers on map to represent folders
function PlotFolders()
{
	clearOverlays();
	
  xhr = new XMLHttpRequest();
  xhr.open("GET", "box.php?action=get_account_tree&auth_token=" + document.getElementById('hdAuthToken').innerHTML, false);
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

						markersArray.push(marker);
          //alert(gpspos.split(",")[0] + "qwerty" + gpspos.split(",")[1]);          

					}
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
		
	PlotFolders();
}

function panMap()
{
  google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
    window.setTimeout(function() {
      map.panTo(new google.maps.LatLng(curlat, curlng));
    }, 1000);
  });
}

function positionCallback(position)
{
	curlng = position.coords.longitude;
	curlat = position.coords.latitude;
	panMap();
}

function errorCallback(error)
{
}

// This function is called by body onload event
function main()
{
	// Start monitoring the GPS reading
	navigator.geolocation.watchPosition(positionCallback, errorCallback, {enableHighAccuracy:true});
	initialize();
}
