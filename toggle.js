/*function hdToggleUsBoth(switchID,effectedId){
	var me = document.getElementById(switchID);
	var you = document.getElementById(effectedID);
	
	if(me.getAttribute('switchState') == open){
		me.setAttribute('switchState','closed');
		you.setAttribute('switchState','closed');
	}else if(me.getAttribute('switchState') === null){
		me.setAttribute('switchState','closed');
		you.setAttribute('switchState','closed');
	}else{
		me.setAttribute('switchState','closed');
		you.setAttribute('switchState','closed');
	}
}*/


//document.getElementById('hdTopBar').addEventListener('click',  hdToggleMe('hdLeftBar'));
function hdToggleMe(switchID){
	//console.log('ive been clicked');
	var me = document.getElementById(switchID);

	if(me.getAttribute('switchState') == 'closed'){
		me.setAttribute('switchState','open');
	}else if(me.getAttribute('switchState') === null){
		me.setAttribute('switchState','closed');
	}else{
		me.setAttribute('switchState','closed');
	}
}