//accelerometer
var accelOptions = {frequency: 3000};
								 
function onAccelSuccess(acceleration) {
	pAccel.innerHTML = '<li>X: ' + acceleration.x + '</li>' +
					   '<li>Y: ' + acceleration.y + '</li>' +
					   '<li>Z: ' + acceleration.z + '</li>';
};

function onAccelError() {
	pAccel.innerHTML = '<li>Accel Error</li>';
};

var watchId2 = navigator.accelerometer.watchAcceleration(onAccelSuccess, onAccelError, accelOptions);
