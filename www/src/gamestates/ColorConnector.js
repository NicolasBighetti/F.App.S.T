
FastGame.ColorConnector = function (game) { this.game=game};
FastGame.ColorConnector.prototype = {
    preload: function () {
        this.video = undefined;
    },
    create: function () {
        console.log("create fast color");
        this.game.input.onUp.add(function(){
          let options = {
          x: 0,
          y: 0,
          width: window.screen.width,
          height: window.screen.height,
          camera: CameraPreview.CAMERA_DIRECTION.BACK,
          toBack: true,
          tapPhoto: true,
          tapFocus: false,
          previewDrag: false
        };

        this.canvas = document.createElement('CANVAS');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = 640;
        this.canvas.width = 640;

        CameraPreview.startCamera(options);
        this.game.input.onUp.removeAll();
        this.camAllowed();
        }, this);
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

        this.game.input.onDown.add(this.takeSnapshot, this);

        //game.time.events.loop(50, takeSnapshot, this);

    },

camBlocked: function (video, error) {

        console.log('Camera was blocked', video, error);

    },
takeSnapshot: function () {
        //this.video.grab();//params clear true or false, alpha, blend mode

        CameraPreview.takePicture({width:640, height:640, quality: 85}, (base64PictureData) => {
            imageSrcData = 'data:image/jpeg;base64,' +base64PictureData;
            //$('img#my-img').attr('src', imageSrcData);
            var image = new Image();
            image.onload = () => {
              this.ctx.drawImage(image,0,0);
              var pixel = this.ctx.getImageData(320, 320, 1, 1);
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
        //this.video.snapshot.update();



},
    extractdata: function (color) {
        // use only 2 strongest bits for each component for now ...
        var byte = 255;

        var r = color.red >> 7;
        var g = color.green >> 7 << 1;
        var b = color.blue >> 7 << 2;
        byte = 255 & (r | g | b);

        console.log(r); // 1
        console.log(g); // 1
        console.log(b); // 1
        console.log("byte");
        console.log(byte); // 1

        return byte;
    }
};
