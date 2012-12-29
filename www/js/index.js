/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var pCompassHeading;
var pConnectionType;
var pPosition;
var pDevice;
var pAccel;
var networkState;
var states;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		divAppMain = document.getElementById('appMain');		
		pCompassHeading = document.getElementById('compassHeading');		
		pConnectionType = document.getElementById('connectionTypeName');		
		pPosition = document.getElementById('position');
		pDevice = document.getElementById('deviceName');
		pAccel = document.getElementById('accel');
		
	},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

//compass
var compassSuccess = function(heading) {		
	pCompassHeading.innerText = 'Compass Heading: ' + heading.magneticHeading;
};
var compassError = function(error) {
	pCompassHeading.innerText = 'Error:' + error.code;
};
var compassOptions = {frequency: 1000};

//geolocation
var geolocationSuccess = function(position) {
	pPosition.innerText = 'Latitude: ' + position.coords.latitude + '<br />' +
		  'Longitude: '  + position.coords.longitude;
		  //'Altitude: '          + position.coords.altitude          + '<br />' +
		  //'Accuracy: '          + position.coords.accuracy          + '<br />' +
		  //'Altitude Accuracy: ' + 'NA'  + '<br />' +
		  //'Heading: '           + position.coords.heading           + '<br />' +
		  //'Speed: '             + position.coords.speed             + '<br />' +
		  //'Timestamp: '         + position.timestamp;
};
var geolocationError = function(error){
	pPosition.innerText = 'Error:' + error.code;
};
var geolocationOptions = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};
var accelOptions = {frequency: 3000};
								 
//accelerometer
function onAccelSuccess(acceleration) {
	pAccel.innerText = 'Accel X: ' + acceleration.x + '\n' +
		  'Accel Y: ' + acceleration.y + '\n' +
		  'Accel Z: ' + acceleration.z;
};

function onAccelError() {
	pAccel.innerText = 'Accel Error!';
};

function showValues(){

	var watchId = navigator.compass.watchHeading(compassSuccess, compassError, compassOptions);	
	navigator.accelerometer.watchAcceleration(onAccelSuccess, onAccelError, accelOptions);

	pDevice.innerText = 'Device Name: ' + device.name;
	
	//network state			
	var networkState = navigator.network.connection.type;
	states = {};
	states[0] = 'Indeterminate';
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';
	pConnectionType.innerText = 'Connection type: ' + states[networkState];	

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