//compass
var compassSuccess = function(heading) {		
	pCompassHeading.innerHTML = '<li>' + heading.magneticHeading + ' degrees </li>';
};
var compassError = function(error) {
	pCompassHeading.innerHTML = '<li>Error:' + error.code + '</li>';
};
var compassOptions = {frequency: 1000};

//geolocation
var geolocationSuccess = function(position) {
	pPosition.innerHTML =   '<li>Latitude: ' + position.coords.latitude + '</li>' 
						  + '<li>Longitude: '  + position.coords.longitude + '</li>'
						  + '<li>Altitude: ' + position.coords.altitude  + '</li>'
						  + '<li>Accuracy: ' + position.coords.accuracy + '</li>'
						  + '<li>Altitude Accuracy: NA (Android)' + '</li>'
						  + '<li>Heading: ' + position.coords.heading + '</li>'
						  + '<li>Speed: ' + position.coords.speed + '</li>'
						  + '<li>Timestamp: ' + position.timestamp;
};
var geolocationError = function(error){
	pPosition.innerHTML = '<li>Error:' + error.code + '</li>';
};
var geolocationOptions = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};


var accelOptions = {frequency: 3000};
								 
//accelerometer
function onAccelSuccess(acceleration) {
	pAccel.innerHTML = '<li>X: ' + acceleration.x + '</li>' +
		  '<li>Y: ' + acceleration.y + '</li>' +
		  '<li>Z: ' + acceleration.z + '</li>';
};

function onAccelError() {
	pAccel.innerHTML = '<li>Accel Error</li>';
};

function showValues(){

	//compass
	var watchId1 = navigator.compass.watchHeading(compassSuccess, compassError, compassOptions);	
	//accelerometer
	var watchId2 = navigator.accelerometer.watchAcceleration(onAccelSuccess, onAccelError, accelOptions);
	//GPS
	var watchId3 = navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, geolocationOptions);
	//Device
	pDevice.innerHTML = '<li>Device Name: ' + device.name + '</li>' +
						'<li>Device Id:' + device.uuid + '</li>';
	
	//Network connection			
	var networkState = navigator.network.connection.type;
	states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';
	pConnectionType.innerHTML = '<li>' +states[networkState] + '</li>';	

}	
//Camera
function onCameraSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function showCamera(){
	navigator.camera.getPicture(onCameraSuccess, onFail, { quality: 50, 
    destinationType: Camera.DestinationType.FILE_URI }); 
}
function getPhoneGapTest(){
	$.ajax({
		url:"http://km.logicaladvantage.com/phonegaptest.htm",
		cache: false,
		success: ajaxSuccess
	});
	
}
function ajaxSuccess(data){
	$('#divresult').html(data);
}
