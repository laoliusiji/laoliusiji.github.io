//视频
function video(videoName, box) {

	if(isIE()) {
		video2img();
		$(box).find(".video").find("video").hide();
		$(box).find(".video").find("img").show();
		$(box).find(".video").find(".do").hide();
		return;
	}
	if(getChromeVersion() != false) {
		getChromeVersion() >= 6 ? "" : video2img()
	}
	if($(window).width() <= 750) {
		video2img();
		box.find(".do").hide();
		$(".video-js .vjs-tech").css({
			"position": "static"
		});
		$(box).find("video").attr("src",  $(box).find("source").attr("df"));
		return;
	}

	function video2img() {
		box.parent().css("marginTop", "0.55rem")
		box.addClass("content_warp").css("padding", "0")
		box.parent().find(".content").css("minHeight", "auto")
		$(box).find(".video").css("height", "auto");
		box.parent().find(".jg").hide()
		box.parent().find(".wz").css({
			"position": "absolute",
			"top": '280px',
			"minHeight": 'auto',
			"height": 'auto'
		}).hide();
		type = true;
		return;
	}
	$(box).find(".content").css("minHeight", $(window).height() + "px");
	$(box).find(".video").css("height", $(window).height() + "px");
	$(box).find(".wz").css("minHeight", $(window).height() / 2 + "px");
	$(box).find(".wz").css("height", $(window).height() / 2 + "px");
	resize();
	if($(box).find("video").attr("src") != "") {
		var videoPlayer = videojs(videoName, {
			muted: true
		});
		videoPlayer.ready(function () {
			var obj  = this;
			
			setTimeout(function() {
				obj.src({
					src:$(box).find("source").attr("df"),
					type:"video/mp4"
				});
			obj.load();
			}, 2000)
		});
		// videoPlayer.play()
	}
	if($(window).scrollTop() >= box.offset().top && $(window).scrollTop() <= box.find(".wz").offset().top) {
		if($(box).find("video").length != 0) {
			if(!autoPlay()) {
				if(box.find(".do").attr("play") == "true") {
					videoPlayer.play()
				} else {
					videoPlayer.pause()
				}
			} else {
				box.find(".do").attr("play", false).html("&#xe64e;")
			}
		}
		change(1)
	}
	var cha = 1 / (box.find(".wz").offset().top - box.offset().top).toFixed(3)
	$(window).scroll(function() {
		if($(window).scrollTop() >= box.offset().top && $(window).scrollTop() <= box.find(".wz").offset()
			.top) {
			if($(box).find("video").length != 0) {
				if(!autoPlay()) {
					if(box.find(".do").attr("play") == "true") {
						videoPlayer.play()
					} else {
						videoPlayer.pause()
					}
				}
			}
			change((box.find(".wz").offset().top / 1 - $(window).scrollTop()) * cha)
		} else {

			if($(window).scrollTop() < box.offset().top) {
				change(1)
				if($(box).find("video").length != 0) {
					videoPlayer.pause()
				}
			}
			if($(window).scrollTop() > box.offset().top + box.height()) {
				if($(box).find("video").length != 0) {
					videoPlayer.pause()
				}
			}
		}
	})
	$(window).resize(function() {
		resize()
	})

	function resize() {
		if($(window).width() > 750) {
			var size = ($(window).width() - $(".active .content").width()) / 2;
			if(size > 55) {
				box.find(".top").css("height", "0.45rem")
				box.find(".bottom").css("height", "0.55rem")
				box.find(".left").css("width", size + "px")
				box.find(".right").css("width", size + "px")
			} else {
				box.find(".top").css("height", size + "px")
				box.find(".bottom").css("height", size + "px")
				box.find(".left").css("width", size + "px")
				box.find(".right").css("width", size + "px")
			}

		} else {
			box.find(".top").css("height", "15px")
			box.find(".bottom").css("height", "15px")
			box.find(".left").css("width", "15px")
			box.find(".right").css("width", "15px")
		}

	}


	function change(size) {
		size = size - 0.3 == 0.7 ? 1 : 0;
		box.find(".left").css("transform", "scale(" + size + ", 1)");
		box.find(".right").css("transform", "scale(" + size + ", 1)");
		// 由于视频变大时，两边间距有白色间隙，所以注释掉这两行
		// box.find(".left .colorzz").css("transform", "scale(" + size + ", 1)")
		// box.find(".right .colorzz").css("transform", "scale(" + size + ", 1)")
		box.find(".top").css("transform", "scale(1," + size + ")")
		box.find(".bottom").css("transform", "scale(1," + size + ")")
	}
	if($(box).find("video").attr("src") != "") {
		box.find(".do").click(function() {
			if(box.find(".do").attr("play") == "true") {
				$(this).attr("play", false)
				$(this).html("&#xe625;")
				videoPlayer.pause()
			} else {
				$(this).attr("play", true)
				$(this).html(" &#xe624;")
				videoPlayer.play()
			}
		})
	}
}

//视频
var zzWidth = (($(window).width() - $(".story_msg").width()) / 2) - ($(".paihang").css("margin-left").split("px")[0] - 0);
$(".right .colorzz").css({
	"width": zzWidth + "px"
})
$(".left .colorzz").css({
	"width": zzWidth + "px"
})