//Camera
function onCameraSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
}

function showCamera(){
	navigator.camera.getPicture(onCameraSuccess, onFail, { quality: 50, 
    destinationType: Camera.DestinationType.FILE_URI }); 
}