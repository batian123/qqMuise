(function ($, root) {
    function indeArr(){
        nowIndex == len - 1 ? nowIndex = 0 : nowIndex++;
        console.log(nowIndex);
        root.pro.renderAllTime(dataList[nowIndex-1].duration);
        root.render(dataList[nowIndex-1]);
        audio.getAudio(dataList[nowIndex-1].audio);
        rotateImg(0);
        audio.play();
        root.pro.start(0);
    }
    root.indeArr=indeArr;
})(window.Zepto, window.player || (window.player = {}))