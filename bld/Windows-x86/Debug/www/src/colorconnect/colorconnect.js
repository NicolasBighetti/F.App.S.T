document.addEventListener("deviceready", onDeviceReady, false);
var imagesBB = [];

function capture(ok){
	console.log("ok");
	console.log(ok);
	image.src = "data:image/jpeg;base64," + ok;
}



var options = {
	quality:1,
	targetWidth:1,
	targetHeight:1,
	allowEdit:false,
	saveToPhotoAlbum: false,
	correctOrientation: false,
	destinationType: Camera.DestinationType.FILE_URI
}

cameraDefault = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation: true
};

async function takePictures() {
	await sleep(10000);
	for(var i =0;i<4;i++){
		console.log("1"+i);
		//takePic();
		 navigator.camera.getPicture(capture,function(err){
			 console.log("err");
			 console.log(err);
		 },options);
		await sleep(500);
	}
	console.log("colors:");
	console.dir(imagesBB);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function onDeviceReady() {
	console.log("HEY");
    console.log(navigator.camera);
	navigator.camera.sourceType = Camera.PictureSourceType.CAMERA;
	takePictures();
}


var image = new Image();
image.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	var x=0;
	var y=0;
    // Now you can access pixel data from imageData.data.
    // It's a one-dimensional array of RGBA values.
    // Here's an example of how to get a pixel's color at (x,y)
    var index = (y*imageData.width + x) * 4;
    var red = imageData.data[index];
    var green = imageData.data[index + 1];
    var blue = imageData.data[index + 2];
    var alpha = imageData.data[index + 3];
	
	
	console.log("got color");
	console.log("A"+alpha+" R"+red+" G"+green+" B"+blue);
	var consoleColor = {
		red:red,
		green:green,
		blue
	}
	imagesBB.push(consoleColor);
};

function takePic(){
var options = {
    name: "Image", //image suffix
    dirName: "CameraPictureBackground", //foldername
    orientation: "landscape", //or portrait
    type: "back" //or front
};

//window.plugins.CameraPictureBackground.takePicture(success, error, options);

function success(imgurl) {
    console.log("Imgurl = " + imgurl);
	img.src = imgurl;
}
function error(err) {
    console.log("err IMG = " + err);
}
}