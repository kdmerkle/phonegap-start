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

var watchId3 = navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, geolocationOptions);
