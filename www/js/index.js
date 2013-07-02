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
 
var pCompassHeading;
var pConnectionType;
var pPosition;
var pDevice;
var pAccel;
var networkState;
var states;
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
//		divAppMain = document.getElementById('appMain');		
//		pCompassHeading = document.getElementById('compassheading');		
//		pConnectionType = document.getElementById('connectiontypename');		
//		pPosition = document.getElementById('position');
//		pDevice = document.getElementById('deviceName');
//		pAccel = document.getElementById('accel');
	},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }
};

function showValues(){

	//compass
	var compassOptions = {frequency: 1000};		
	
	var compassSuccess = function(heading) {		
		$('#compassheading').html('<li>' + heading.magneticHeading + '</li>');
	};
	var compassError = function(error) {
		alert('Error:' + error.code);
	};	
	var watchId1 = navigator.compass.watchHeading(compassSuccess, compassError, compassOptions);	
		

	//accelerometer
	var accelOptions = {frequency: 3000};								 
	function onAccelSuccess(acceleration) {
		$('#accel').html('<li>X: ' + acceleration.x + '</li>' +
						   '<li>Y: ' + acceleration.y + '</li>' +
						   '<li>Z: ' + acceleration.z + '</li>');
	};
	function onAccelError() {
		$('#accel').html('<li>Accel Error</li>');
	};
	var watchId2 = navigator.accelerometer.watchAcceleration(onAccelSuccess, onAccelError, accelOptions);	
	
	//GPS
	var geolocationSuccess = function(position) {
		$('#position').html('<li>Latitude: ' + position.coords.latitude + '</li>' 
							  + '<li>Longitude: '  + position.coords.longitude + '</li>'
							  + '<li>Altitude: ' + position.coords.altitude  + '</li>'
							  + '<li>Accuracy: ' + position.coords.accuracy + '</li>'
							  + '<li>Altitude Accuracy: NA (Android)' + '</li>'
							  + '<li>Heading: ' + position.coords.heading + '</li>'
							  + '<li>Speed: ' + position.coords.speed + '</li>'
							  + '<li>Timestamp: ' + position.timestamp);
	};
	var geolocationError = function(error){
		$('#position').html('<li>Error:' + error.code + '</li>');
	};
	var geolocationOptions = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};

	var watchId3 = navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, geolocationOptions);	
	
	
	//Device
	$('#device').html('<li>Device Name: ' + device.name + '</li>' +	'<li>Device Id:' + device.uuid + '</li>');
	
	//Network Connection
	var networkState = navigator.connection.type;
	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';
	
	$('#connectiontypename').html('<li>' + states[networkState] + '</li>');				
	
}	