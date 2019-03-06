var root = window.player;
console.log(root);
var nowIndex = 0;
var len;
var dataList = '';
var audio = root.audioControl;
// var pro = root.pro;
var time = "";
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            console.log(data);
            len = data.length;
            dataList = data;
            root.render(data[0]);
            audio.getAudio(dataList[nowIndex].audio);
            root.pro.renderAllTime(dataList[nowIndex].duration);
            bindevent();
           
        },
        error: function () {
            console.log("error");
        },
    })
}
function bindevent() {

    bindTouch();
    function bindGather() {
        root.pro.renderAllTime(dataList[nowIndex].duration);
        root.render(dataList[nowIndex]);
        audio.getAudio(dataList[nowIndex].audio);
        rotateImg(0);
        audio.play();
        root.pro.start(0);
    }
    $('.prev').on("click", function () {

        // if (nowIndex == 0) {
        //     nowIndex = len - 1;
        // } else {
        //     nowIndex--;
        // }
        nowIndex == 0 ? nowIndex = len - 1 : nowIndex--;
        bindGather()
    })
    $('.next').on("click", function () {
        // if (nowIndex == len - 1) {
        //     nowIndex = 0;
        // } else {
        //     nowIndex++;
        // }
        nowIndex == len - 1 ? nowIndex = 0 : nowIndex++;
        // root.render(dataList[nowIndex]);
        // audio.getAudio(dataList[nowIndex].audio);
        // audio.play();
        bindGather()
    })
    $('.play').on("click", function () {
        if (audio.status == "pause") {
            audio.play();
            var deg = $('.img-box').attr('data-deg');
            root.pro.start();
            rotateImg(deg);
        } else {
            audio.pause();
            clearInterval(time);
            root.pro.stop();
        }

    })
    $(".like").on("click", function () {
        var islike = dataList[nowIndex].isLike;
        console.log(islike);
        if (islike) {
            islike = false;
            $(".like").removeClass('islike');
            console.log(islike);
        } else {
            islike = true;
            $(".like").addClass('islike');
        }

    })
}
function bindTouch() {
    var $spot = $('.spot');
    var bottom = $('.pro-bottom').offset();
    var l = bottom.left;
    var w = bottom.width;
    $spot.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l + 5) / w;
        if (0 <= per && per <= 1) {
            per = per > 1 ? 1 : per;
            per = per < 0 ? 0 : per;
            root.pro.update(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l + 5) / w;
        if (0 <= per && per <= 1) {
            per = per > 1 ? 1 : per;
            per = per < 0 ? 0 : per;
            var time = per * dataList[nowIndex].duration;
            root.pro.start(per);
            audio.playTo(time)
            audio.play();
        }
    })
}
function rotateImg(deg) {
    clearInterval(time);
    deg = +deg
    console.log(deg);
    time = setInterval(function () {
        deg += 5;
        $('.img-box').attr('data-deg', deg);
        $(".img-box").css({
            transform: 'rotate(' + deg + 'deg)',
            transition: "all 0.2s linear",
        })
    }, 200)

}
getData("../mock/data.json");