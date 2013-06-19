//compass
var compassSuccess = function(heading) {		
	pCompassHeading.innerHTML = '<li>' + heading.magneticHeading + ' degrees </li>';
};
var compassError = function(error) {
	pCompassHeading.innerHTML = '<li>Error:' + error.code + '</li>';
};
var compassOptions = {frequency: 1000};	
