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
		var divAppMain = document.getElementById('appMain');		
		var pCompassHeading = document.getElementById('compassHeading');		
		var pConnectionType = document.getElementById('connectionType');		
		var pPosition = document.getElementById('position');
		var pDevice = document.getElementById('device');
		var pAccel = document.getElementById('accel');
		
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
								 
//accelerometer
function onAccelSuccess(acceleration) {
	pAccel.innerText = 'Acceleration X: ' + acceleration.x + '\n' +
		  'Acceleration Y: ' + acceleration.y + '\n' +
		  'Acceleration Z: ' + acceleration.z + '\n' +
		  'Timestamp: '      + acceleration.timestamp + '\n';
};

function onAccelError() {
	pAccel.innerText = 'Accel Error!';
};

function showValues(){

	var watchId = navigator.compass.watchHeading(compassSuccess, compassError, compassOptions);
/*	
	//network state			
	var networkState = navigator.connection.type;
	var states = {};
	states[0] = 'Wrongo Keebler';
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';
	pConnectionType.innerText = 'Connection type: ' + states[networkState];	

	navigator.accelerometer.getCurrentAcceleration(onAccelSuccess, onAccelError);

	pDevice.innerText = 'Device Name: ' + device.name     + '<br />' + 
					'Device Cordova: '  + device.cordova + '<br />' + 
					'Device Platform: ' + device.platform + '<br />' + 
					'Device UUID: '     + device.uuid     + '<br />' + 
					'Device Version: '  + device.version  + '<br />';
*/

}	
