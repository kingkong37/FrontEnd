function RollingBanner(selector, imageList, options) {
    this._$banner = null;
    this._currentIndex = 0;
    this._timerID = 0;
    this._selector = selector;
    this._imageList = imageList;
    this._options = options;

    this._start();
}

RollingBanner.default_options = {
    startIndex: 0,
    duration: 1000
};


RollingBanner.prototype._start = function() {

    if (this._imageList && this._imageList.length > 0) {
        this._init();
        this._initEvent();
        this.showBannerAt(this._options.startIndex)
        this.startAutoPlay();
    } else {
        console.log("이미지가 존재하지 않습니다.")
    }
}


RollingBanner.prototype._init = function() {
    this._$banner = $(this._selector);
    let tempOtions = $.extend({}, RollingBanner.default_options);
    this._options = $.extend(tempOtions, this._options);
}

RollingBanner.prototype._initEvent = function() {

}

RollingBanner.prototype.nextBanner = function() {
    var index = this._currentIndex + 1;
    if (index >= this._imageList.length)
        index = 0;

    this.showBannerAt(index);
}

RollingBanner.prototype.showBannerAt = function(index) {
    this._currentIndex = index;
    var imgName = this._imageList[index];
    this._$banner.attr("src", "./images/" + imgName);
}

RollingBanner.prototype.startAutoPlay = function() {
    if (this._timerID == 0) {
        var self = this;
        this._timerID = setInterval(function() {
            self.nextBanner();
        }, this._options.duration);
    }
}