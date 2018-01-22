
FastGame.ColorConnector = function (game) { this.game=game};
FastGame.ColorConnector.prototype = {
    preload: function () {
        this.video = undefined;
    },
    create: function () {
        console.log("create fast color");
        this.video = this.game.add.video();

        //  If access to the camera is allowed
        this.video.onAccess.add(this.camAllowed, this);

        //  If access to the camera is denied
        this.video.onError.add(this.camBlocked, this);

        //  As soon as the stream starts this will fire
        this.video.onChangeSource.add(this.takeSnapshot, this);

        //  Start the stream
        this.video.startMediaStream();

    },
    update: function () {

    },
    camAllowed: function () {
        console.log('Camera was allowed', this.video);

        var cam = this.video.addToWorld();
        cam.scale.set(0.2);

        grab = this.video.snapshot.addToWorld(this.game.width, this.game.height);
        grab.scale.set(0.2);

        // game.add.text(400, 32, 'Click to grab', { font: "bold 26px Arial", fill: "#ffffff" })

        this.game.input.onDown.add(this.takeSnapshot, this);

        //game.time.events.loop(50, takeSnapshot, this);

    },

camBlocked: function (video, error) {

        console.log('Camera was blocked', video, error);

    },
takeSnapshot: function () {
        this.video.grab();//params clear true or false, alpha, blend mode
        // if()
        // console.log(video.snapshot);
        // bmd.draw(video.snapshot);
        this.video.snapshot.update();
        var color = this.video.snapshot.getPixelRGB(this.video.snapshot.width / 2, this.video.snapshot.height/2);
        console.log(color);
        var colorServ = {
            red: color.r,
            green: color.g,
            blue: color.b
        }
        console.log(colorServ);

        //this.sendColor(colorServ);
        console.log('sending color' + colorServ);
        var byte = this.extractdata(colorServ);
        console.log('byte decoded' + byte);
        colorServ.byteO = byte;
        FastGame.fastSocket.EMIT.FAST_COLOR(colorServ);


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
