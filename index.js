var map;
var markersArray = [];
var curlng;
var curlat;
var infowindow;

function HideImage(elem)
{
	var img=document.getElementById("hdImage");
	img.setAttribute('switchState','close');
//	img.style.display="none";
}

function DisplayImage(elem)
{
	//infowindow.close();
	//document.getElementById("hdMessageBox").innerHTML = "";
	//document.getElementById("hdMessageBox").setAttribute('switchState','close');
	var fileid=elem.id;
	var img=document.getElementById("hdImage");
	img.src="https://www.box.net/api/1.0/download/" + document.getElementById('hdAuthToken').innerHTML + "/" + fileid;
	img.setAttribute('switchState','open');
//	img.style.display="";
//	img.style.width="100%";
//	img.style.height="100%";
}

function HideFile()
{
	var filediv=document.getElementById("hdFile");
	//filediv.style.display="none";
	filediv.setAttribute('switchState','close');
	document.getElementById("hdLeftBar").style.display = "block";
}

/*function HideEdit()
{
	var filediv=document.getElementById("hdEditIframe");
	//filediv.style.display="none";
	filediv.setAttribute('switchState','close');
}

function EditFile(elem)
{
	var fileid=elem.id;
	var editframe=document.getElementById("hdEditIframe");
	editframe.src = "http://www.box.net/services/web_documents/105/" + fileid + "/004a4e/Test_Document";
	editframe.setAttribute('switchState','open');
}*/

function DisplayFile(elem)
{
	var fileid=elem.id;
	var filediv=document.getElementById("hdFile");

  xhr = new XMLHttpRequest();
  xhr.open("POST", "getdoc.php?auth_token=" + document.getElementById('hdAuthToken').innerHTML + "&fileid=" + fileid, false);
  xhr.send();
	filediv.innerHTML = xhr.responseText;
	//filediv.style.display="";
	//filediv.style.position="absolute";
	//filediv.style.top="50px";
	//filediv.style.left="50px";
	//filediv.style.width="150px";
	//filediv.style.height="150px";
	filediv.style.padding="45px 0px 0px 10px";
	filediv.setAttribute('switchState','open');
	//document.getElementById("hdLeftBar").style.display = "none";
}

function CreateFolder()
{
	var fn = prompt("Enter folder name.");
	if (!fn)
		return;
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

function EditFolder()
{
	alert("Edit");
}

function DeleteFolder(elem)
{
	var answer = confirm("Are you sure you want to delete this folder?")
	if (answer)
	{
		xhr = new XMLHttpRequest();
		xhr.open("GET", "box.php?action=delete_folder&folderid=" + elem.id + "&auth_token=" + document.getElementById('hdAuthToken').innerHTML, false);
		xhr.send();
		var response = JSON.parse(xhr.responseText);
		PlotFolders();
	}
}

function DeleteFile(elem)
{
	var answer = confirm("Are you sure you want to delete this file?")
	if (answer)
	{
		xhr = new XMLHttpRequest();
		xhr.open("GET", "box.php?action=delete_file&fileid=" + elem.id + "&auth_token=" + document.getElementById('hdAuthToken').innerHTML, false);
		xhr.send();
		var response = JSON.parse(xhr.responseText);
		PlotFolders();
	}
}

function clearOverlays() {
	if (markersArray) {
		for (i in markersArray) {
			markersArray[i].setMap(null);
		}
	}
}

function MarkerShowFolder(elem)
{
	if (elem.innerHTML == "Open")
	{
		ShowFolder(elem);
		document.getElementById("hdMessageBox").setAttribute('switchState','open');
		elem.innerHTML = "Close";
	}
	else
	{
		document.getElementById("hdMessageBox").setAttribute('switchState','closed');
		elem.innerHTML = "Open";
	}
}

function ShowFolder(elem)
{
  xhr = new XMLHttpRequest();
//  xhr.open("GET", "box.php?action=get_account_tree&folderid=" + elem.id + "&auth_token=" + document.getElementById('hdAuthToken').innerHTML, false);
  xhr.open("GET", "box.php?action=get_account_tree&auth_token=" + document.getElementById('hdAuthToken').innerHTML, false);
  xhr.send();
  
  var folders = JSON.parse(xhr.responseText);
	var str = "";
	var level = 0;
	var infolder = false;
	var lastfolderid = 0;
	var intarget = false;
	
  for (var i in folders)
	{
		// Detect login timeout
		if (folders[i].tag == "STATUS" && folders[i].value != "listing_ok")
			window.location = "http://192.168.1.5/hapidocs/";

		if (folders[i].tag == "FOLDER")
    {
			if (folders[i].type == "open")
      {
				
				if (folders[i].attributes.ID == elem.id)
				{
					//alert(lastfolderid);
					str = str + "<div class='hd_showheader' id='" + lastfolderid + "' onclick='ShowFolder(this)'>" + folders[i].attributes.NAME + "</div>";
					level = 0;
					infolder = true;
				}
				else if (infolder == true)
				{
					str = str + "<div class='hd_folderitem' id='" + folders[i].attributes.ID + "' onclick='ShowFolder(this)'>" + folders[i].attributes.NAME + "</div>";
					level++;
					//alert(level);
					infolder = false;
				}

				lastfolderid = folders[i].attributes.ID;
			}
			else if (folders[i].type == "close")
			{
				//if (folders[i].attributes.ID == elem.id)
				//alert(folders[i].attributes.NAME);
					//infolder = false;
				level--;
				console.log(level);
				if (level == 0)
					infolder = true;
				if (level < 0)
					infolder = false;
			}
		}
		else if (folders[i].tag == "FILE")
		{
			if (folders[i].type == "open" && infolder == true)
			{
				var fileext = String("test");
				fileext = (/[^.]+$/.exec(folders[i].attributes.FILE_NAME)).toString();

				// Create links for the files
				if (fileext.toLowerCase() == "jpg")
					str = str + "<div id='" + folders[i].attributes.ID + "' class='hd_firstfileitem hd_fileitem2' onclick='DisplayImage(this)'>View</div>";
				else
					str = str + "<div id='" + folders[i].attributes.ID + "' class='hd_firstfileitem hd_fileitem2' onclick='DisplayFile(this)'>View</div>";

//					str = str + "<a target='_blank' class='hd_firstfileitem hd_fileitem2' href='https://www.box.net/api/1.0/download/" + document.getElementById('hdAuthToken').innerHTML + "/" + folders[i].attributes.ID + "'>View</a>";
				
				//str = str + "<div id='" + folders[i].attributes.ID + "' class='hd_fileitem2' onclick='EditFile(this)'>Edit</div>";
				str = str + "<a target='_blank' class='hd_fileitem2' href='http://www.box.net/services/web_documents/105/" + folders[i].attributes.ID + "/004a4e/Test_Document'>Edit</a>";
				
				str = str + "<div id='" + folders[i].attributes.ID + "' class='hd_fileitem2' onclick='DeleteFile(this)'>Delete</div>";
				
				str = str + "<a class='hd_fileitem'>" + folders[i].attributes.FILE_NAME + "</a>";
			}
		}
	}

	// Update the console div
	document.getElementById("hdFileList").innerHTML = str;
	//document.getElementById("hdMessageBox").setAttribute('switchState','open');
}

// Place markers on map to represent folders
function PlotFolders()
{
	// Clear all existing markers
	clearOverlays();
	
	// Send request for the file tree
  xhr = new XMLHttpRequest();
  xhr.open("GET", "box.php?action=get_account_tree&auth_token=" + document.getElementById('hdAuthToken').innerHTML, false);
  xhr.send();
  var folders = JSON.parse(xhr.responseText);
  
	// Create the one and only reusable marker tooltip
  infowindow = new google.maps.InfoWindow({content: '', size: new google.maps.Size(1,1)});
  
	// Parse the file system
	for (var i in folders)
  {
		// Detect login timeout
		if (folders[i].tag == "STATUS" && folders[i].value != "listing_ok")
			window.location = "http://192.168.1.5/hapidocs/";

		// Look for opening folder tags
		if (folders[i].tag == "FOLDER" && folders[i].type == "open")
		{
			// Get the folder object
			var curfile = folders[i].attributes;
			
			// Make sure folder has description field set
			if (curfile.DESCRIPTION != "")
			{
				// Grap the GPS coordinates from the description field
				var gpspos = curfile.DESCRIPTION;
				
				// Create a map marker with infowindow text
				var titletxt = "<div class='markerTitle'>" + curfile.NAME + "</div>" + "<div class='markerBody'><div id='" + curfile.ID + "' class='markerButton' onclick='MarkerShowFolder(this)'>Open</div><div id='" + curfile.ID + "' class='markerButton' onclick='DeleteFolder(this)'>Delete</div>";
				// Files: " + curfile.FILE_COUNT + "</div>
				
				var latLng = new google.maps.LatLng(gpspos.split(",")[1], gpspos.split(",")[0]);
				marker = new google.maps.Marker({title: titletxt, position: latLng, map: map});
				google.maps.event.addListener(marker, 'click', function(event)
					{
						infowindow.content = this.title;
						infowindow.open(map, this);
						this.setZIndex(-1);
					});

				// Add marker to the array to keep track of them	
				markersArray.push(marker);
			}
		}
  }
}

// Setup google maps in the main content div
function CreateMap()
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
		
	google.maps.event.addListener(map, 'click', function() {
			infowindow.close();
			document.getElementById("hdMessageBox").setAttribute('switchState','closed');
//			document.getElementById("hdFileList").innerHTML = "";
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
	CreateMap();
}
