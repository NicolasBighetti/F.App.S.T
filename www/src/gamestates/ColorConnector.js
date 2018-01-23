
FastGame.ColorConnector = function (game) { this.game=game};
FastGame.ColorConnector.prototype = {
    preload: function () {
        this.video = undefined;
        this.sequence = [];
        this.lastFound = 0;
        this.group = undefined;
    },
    create: function () {
        console.log("create fast color");
//<<<<<<< HEAD
//        this.video = this.game.add.video();

//        //  If access to the camera is allowed
//        this.video.onAccess.add(this.camAllowed, this);

//        //  If access to the camera is denied
//        this.video.onError.add(this.camBlocked, this);

//        //  As soon as the stream starts this will fire
//        // this.video.onChangeSource.add(this.takeSnapshot, this);

//        //  Start the stream
//        this.video.startMediaStream();

//=======
        this.game.input.onUp.add(function(){
          let options = {
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          camera: CameraPreview.CAMERA_DIRECTION.BACK,
          toBack: true,
          tapPhoto: false,
          tapFocus: false,
          previewDrag: false
        };

        this.canvas = document.createElement('CANVAS');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = 10;
        this.canvas.width = 10;

        CameraPreview.startCamera(options);
        this.game.input.onUp.removeAll();
        this.camAllowed();
        }, this);
//>>>>>>> c865674d174fe228d6ff2665fe5aa0a7479ffc19
    },
    update: function () {

    },
    camAllowed: function () {
        console.log('Camera was allowed', this.video);

        //var cam = this.video.addToWorld();
        //cam.scale.set(0.2);

        //grab = this.video.snapshot.addToWorld(this.game.width, this.game.height);

        //grab.scale.set(0.2);

        // game.add.text(400, 32, 'Click to grab', { font: "bold 26px Arial", fill: "#ffffff" })

        this.game.input.onDown.add(this.analyseSuequence, this);

        //take screen every 200 ms
        this.game.time.events.loop(200, this.takeSnapshot, this);
        //this.group.createMultiple(16, 'diamonds', [0, 1, 2, 3, 4], true);
    },

camBlocked: function (video, error) {

        console.log('Camera was blocked', video, error);

    },
takeSnapshot: function () {
        //this.video.grab();//params clear true or false, alpha, blend mode

        CameraPreview.takePicture({width:1, height:1, quality: 1}, (base64PictureData) => {
            imageSrcData = 'data:image/jpeg;base64,' +base64PictureData;
            //$('img#my-img').attr('src', imageSrcData);
            var image = new Image();
            image.onload = () => {
              this.ctx.drawImage(image,0,0);
              var pixel = this.ctx.getImageData(5, 5, 1, 1);
              console.log(pixel);
              var colorServ = {
                  red: pixel.data[0],
                  green: pixel.data[1],
                  blue: pixel.data[2]
              }
              console.log(colorServ);

              //this.sendColor(colorServ);
              console.log('sending color' + colorServ);
              var byte = this.extractdata(colorServ);
              console.log('byte decoded' + byte);
              colorServ.byteO = byte;
              FastGame.fastSocket.EMIT.FAST_COLOR(colorServ);

            }
            image.src = imageSrcData;

        });
        // if()
        // console.log(video.snapshot);
        // bmd.draw(video.snapshot);
//<<<<<<< HEAD
//        this.video.snapshot.update();
//        var color = this.video.snapshot.getPixelRGB(this.video.snapshot.width / 2, this.video.snapshot.height/2);
//        //console.log(color);
//        var colorServ = {
//            red: color.r,
//            green: color.g,
//            blue: color.b
//        }
//        //console.log(colorServ);

//        //this.sendColor(colorServ);
//        //console.log('sending color' + colorServ);
//        var byte = this.extractdata(colorServ);
//        //console.log('byte decoded' + byte);
//        colorServ.byteO = byte;
//        FastGame.fastSocket.EMIT.FAST_COLOR(colorServ);
//=======
//        //this.video.snapshot.update();

//>>>>>>> c865674d174fe228d6ff2665fe5aa0a7479ffc19

        



       // this.group.add(sprite);

},

// color to byte (0..7)
    extractdata: function (color) {
        // use only 1 strongest bits for each component for now ...
        var byte = 255;

        var r = color.red >> 7;
        var g = color.green >> 7 << 1;
        var b = color.blue >> 7 << 2;
        byte = 255 & (r | g | b);

        //console.log('adding '+byte); // 1

        this.sequence.push(byte);
        return byte;
},
    checksum: function (byteB){
    var ones = 0;
    while (byteB != 0) {
        if (byteB % 2)
            ones++;
        byteB = byteB >> 1;
        
    }
    return ones % 2;
},

    analyseSuequence: function () {

        if (this.sequence.length < 16) {
            console.log('sequence is too short to contain a message');
        }

        var fullByte = 8; 
        var bytes = [];
        
        // 3 images 1 octet 12 images 36 bits + = 4 bits inutiles utilisés pour checksum
        // séquence de début de message: 0000 (à revoir car il peut y avoir des collision (ou bien utiliser les autres bits));
        var found = this.sequence.indexOf(0,this.lastFound);
        // 0 not found
        if (found == -1) {
            console.log('start sequence not found');
            return;
        }
            
        this.lastFound = found;
        //if less colors than a message: no need to check for array end later
        if (found + 16 > this.sequence.length) {
            console.log('not enouth colors to decode ' + found);
            console.log(this.sequence.length);
            return;
        }

        this.lastFound += 1;
        for (var i = 0; i < 4; i++) {
            if (this.sequence[found + i]!=0) {
                console.log('start sequence not found');
                return;
            }
        }
        

        var pos = 0;
        // 00011100 1 11100011 1 00011100 0 11100011 1
        var i = found+4; // 4 color of header
        for (; i <found + 16; i += 3) {

            //extract 3 bits
            var b1 = this.sequence[i];
            var b2 = this.sequence[i+1];
            var b3 = this.sequence[i + 2];
           
            bytes[pos] = 0;
            // b11                  b22         b3        3  ==>b11b22b3 3(last bit not used)
            bytes[pos] = (b1 << 5) | (b2 << 2) | (b3 >> 1);
            var boolCkec = this.checksum(bytes[pos]);

            // implement checksum
            if (b3%2!= boolCkec) {
                console.log('checksum not good ' + pos + '   '+i);
                console.log(bytes[pos]);


            }
            pos++;
        }
        console.log('################################" Got: ' + bytes[0] + '.' + bytes[1] + '.' + bytes[2] + '.' + bytes[3]);
        var chr = String.fromCharCode(65 + bytes[0]);
        var chr1 = String.fromCharCode(65 + bytes[1]);
        var chr2 = String.fromCharCode(65 + bytes[2]);
        var chr3 = String.fromCharCode(65 + bytes[3]);
        console.log('################################" Got CHAR: ' + chr + '.' + chr1 + '.' + chr2 + '.' + chr3);


}

};
