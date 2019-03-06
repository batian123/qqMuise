(function ($, root) {
    function audioControl() {
        this.audio = new Audio();
        this.status = "pause";
    }
    audioControl.prototype.play = function () {
        this.audio.play();
        this.status = 'play';
        $('.play').addClass('playing');
        this.audio.onended = function () {
            root.indeArr();
            console.log(root.indeArr());
        }
    }
    audioControl.prototype.pause = function () {
        this.audio.pause();
        this.status = 'pause';
        $('.play').removeClass('playing');
    }
    audioControl.prototype.playTo = function (t) {
        this.audio.currentTime = t;
    }
    audioControl.prototype.getAudio = function (src) {
        console.log(src);
        this.audio.src = src;
        this.audio.load();
        console.log(this.audio);
    }
    root.audioControl = new audioControl();
})(window.Zepto, window.player || (window.player = {}))