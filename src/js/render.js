// 实现页面渲染
(function ($, root) {
    // function render() {
    //     console.log('reder');
    // }
    // root.render = render;
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'));
            $('.img-box').attr('data-deg',0);
            $(".img-box").css({
                transform: 'rotate(0deg)',
                transition: "none",
            })
        }
    }
    function renderInfo(data) {
        var str = '<div class="song-name">' + data.song + '</div>\
                <div class="singer-name">'+ data.singer + '</div>\
                <div class="album-name">'+ data.album + '</div>';
        $(".song-info").html(str);
    }
    function rednderIslike(isLike) {
        if(isLike){
            $(".like").addClass('islike');
        }else{
            $(".like").removeClass('islike');
        }
     }
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        rednderIslike(data.isLike);
    }
})(window.Zepto, window.player || (window.player = {}));