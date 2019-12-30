$(function() {
	// // 寮曠敤video渚濊禆锛岄槻姝ideo鎾斁澶辫触闂
	// videojs.options.flash.swf = siteConfig.imgUrl + "/cn/images/video-js.swf";
	// 鍒ゆ柇鏄惁鍦ㄥ彲瑙嗗寲缂栬緫椤甸潰涓嬶紝閮ㄥ垎鍔熻兘闇€瑕佹敞閲�
	var shedderShow = window.location.href.indexOf("shedderShow") > 0 ? true : false;
	if(shedderShow) {
		$(".story").find(".sd_item").addClass("sd_item_css");
		$(".story").find(".wz").hide();
		$(".story").find(".jg").hide();
		// 鍙鍖栦笅灏唙ideo鐨刣ata-src璧嬪€肩粰src
		$(".box1 video").attr("src", $(".box1 source").attr("df"));
		$(".box1 source").attr("src", $(".box1 source").attr("df"));
	} else {
		// setTimeout(function() {
			if(isIE()){
				$(".box1").each(function(i, item) {
					$(this).find("video").attr("id", "boxVideo" + i)
					video($(this).find("video").attr("id"), $(this))
				})
			}else{
				loadSrc("./vioset.js", function() {
					videojs.options.flash.swf = siteConfig.apiUrl + "/cn/images/video-js.swf";
					$(".box1").each(function(i, item) {
						$(this).find("video").attr("id", "boxVideo" + i)
						video($(this).find("video").attr("id"), $(this))
					})
				})
			}
			$(".story").find(".sd_item").removeClass("sd_item_css");
		// }, 2000)

	}
	setTimeout(function() {
		$('.delay_load').each(function() {
			$(this).attr('src', $(this).attr('data-src'))
		})
	}, 2000)
	var winWidth = $(window).width();
	// 鏄庢槦浜у搧js_box
	var bannerStarBox = "";
	// 蹇冮€夌簿鍝乯s_box
	var xinxvanBox = "";
	// 鎺掕姒滀骇鍝乯s_box
	var paihangBox = "";

	// 灞忓箷鎷栨媺鍒濆鍖栧悇绉嶆柟娉�
	$(window).resize(function() {
		var curWinWidth = $(window).width();

		// 杞挱鍥惧垵濮嬪寲
		sdUiList[$(".js_boxBanner").attr("sd_uiID")].init(); //寮€濮嬭疆鎾�
		if(winWidth !== curWinWidth) {
			winWidth = curWinWidth;
			// 鏄庢槦浜у搧
			var scrollTop = getScrollTop(),
				bannerStar = getTop($(".js_bannerStar")),
				cTop = document.documentElement.clientHeight || 600;
			if((scrollTop + cTop >= bannerStar)) {
				sdUiList[$(".js_bannerStar").attr("sd_uiID")].init(); //寮€濮嬭疆鎾�
			}
			if (winWidth <= 1200) {
				$(".js_xinxuanDetail").show();
				$(".js_tabboxPaihang").show();
				sdUiList[$(".js_xinxuan_bottom").attr("sd_uiID")].handtouch = true;
				sdUiList[$(".js_paihang_bottom").attr("sd_uiID")].handtouch = true;
			} else {
				sdUiList[$(".js_xinxuan_bottom").attr("sd_uiID")].handtouch = false;
				sdUiList[$(".js_paihang_bottom").attr("sd_uiID")].handtouch = false;
			}
			// 蹇冮€夌簿鍝佽疆鎾�
			sdUiList[$(".js_xinxuan_bottom").attr("sd_uiID")].init();
			// 鎺掕姒滆疆鎾�
			sdUiList[$(".js_paihang_bottom").attr("sd_uiID")].init();
		}

		// banner瀹藉害
		box1.init(); //婵€娲绘柟娉�
		if(bannerStarBox != "") {
			bannerStarBox.init(); //婵€娲绘柟娉�
		}
		// 閲嶇疆蹇冮€夌簿鍝佸浘鐗囨牱寮�
		xinxvanBox = $(".js_xinxuan_bottom .js_xinxuanDetail .js_box").oScale() //鍒涘缓鏂规硶
		xinxvanBox.init(); //婵€娲绘柟娉�
		// 閲嶇疆鎺掕姒滃浘鐗囨牱寮�
		paihangBox = $(".js_paihang_bottom .js_tabboxPaihang .js_box").oScale() //鍒涘缓鏂规硶
		paihangBox.init(); //婵€娲绘柟娉�
		$(".o_picture").each(function() {
			if(!$(this).hasClass(".js_newsImg")) {
				$(this).oPicture({}).init();
			}
		});
		// $(".o_picture").init();
		$(".js_tit").oCutText();
	});

	// 棣栭〉banner瑙嗛
	if($(".js_bannerVideoBtn").length > 0) {
		videoInit();
	}
	// banner瑙嗛鐨勫垵濮嬪寲鏂规硶
	function videoInit() {
		// 鐐瑰嚮banner涔嬪悗瑙嗛鎾斁
		var videoUrl = $(".js_bannerVideoBtn").attr("data-videurl");
		var player = videojs("bannerVideo");
		$(".js_bannerVideoBtn").off().on("click", function() {
			$(".js_bannerVideoPop").show();
			// 瑙嗛鎾斁
			player.src(videoUrl);
			player.play();
		})
		$(".js_popClose").off().on("click", function() {
			$(".js_bannerVideoPop").hide();
			player.pause();
		})
	}

	//鍝嶅簲寮忓浘鐗囧垵濮嬪寲

	$(".o_picture").each(function() {
		if(!$(this).hasClass("js_newsImg")) {
			if(!$(this).hasClass("js_biliImg")) {
				$(this).oPicture({}).init();
			}
		}
	});
	// banner瀹氫箟
	sdUiList[$(".js_boxBanner").attr("sd_uiID")] = $(".js_boxBanner").oSlider({});
	sdUiList[$(".js_boxBanner").attr("sd_uiID")].init(); //寮€濮嬭疆鎾�
	$(".js_pagePrev").on("click", function() {
		sdUiList[$(".js_boxBanner").attr("sd_uiID")].prev();
	})
	$(".js_pageNext").on("click", function() {
		sdUiList[$(".js_boxBanner").attr("sd_uiID")].next();
	})
	// banner瀹藉害
	var box1 = $(".js_box").oScale() //鍒涘缓鏂规硶
	box1.init(); //婵€娲绘柟娉�
	$(".xinxuan_tab").find("li").click(function() {
		var box3 = $(".js_box").oScale() //鍒涘缓鏂规硶
		box3.init(); //婵€娲绘柟娉�
	})
	sdUiList[$(".js_bannerStar").attr("sd_uiID")] = $(".js_bannerStar").oSlider({
		loop: true,
		speed: 3000,
		autoWidth: true,
		// moveSpeed: 1000,
		windowResize: false
	});
	$(window).on("scroll", function() {
		var scrollTop = getScrollTop(),
			bannerStar = getTop($(".js_bannerStar")),
			cTop = document.documentElement.clientHeight || 600;
		if((scrollTop + cTop >= bannerStar) && $(".js_bannerStar").attr("inited") !== "true") {
			$(".js_bannerStar").attr("inited", "true");
			sdUiList[$(".js_bannerStar").attr("sd_uiID")].init(); //寮€濮嬭疆鎾�
			//鍒濆鍖栧搷搴斿紡鍥剧墖
			$(".js_newsImg").each(function() {
				$(this).oPicture({}).init();
			});
			bannerStarBox = $(".js_bannerStar .js_box").oScale() //鍒涘缓鏂规硶
			bannerStarBox.init(); //婵€娲绘柟娉�
		}
	});

	$(".js_starPrev").on("click", function() {
		sdUiList[$(".js_bannerStar").attr("sd_uiID")].prev();
	})
	$(".js_starNext").on("click", function() {
		sdUiList[$(".js_bannerStar").attr("sd_uiID")].next();
  })
  
  // 蹇冮€夌簿鍝佽疆鎾�
  sdUiList[$(".js_xinxuan_bottom").attr("sd_uiID")] = $(".js_xinxuan_bottom").oSlider({
    loop: false,
    // moveSpeed: 1000,
    autoWidth: true,
	windowResize: false,
	moveOne: true,
	handtouch: ($(window).width() <= 1200) ? true : false,
    playFn:function(p){
      // 褰撳墠杞挱slider绱㈠紩锛屼粠0寮€濮�
      var curIndex = p.i;
      $(".js_xinxuan_tab li").removeClass("cur").eq(curIndex).addClass("cur");
	  resetXinxvanTabPosi($(".js_xinxuan_tab_box"));
	  $(".js_xinxuanDetail").show();
    },
    startFn:function(){
      // 褰撳墠杞挱
      var _this = this,
        curIndex = _this.i;
      $(".js_xinxuan_tab li").removeClass("cur").eq(curIndex).addClass("cur");
      resetXinxvanTabPosi($(".js_xinxuan_tab_box"));
    }
  });
  sdUiList[$(".js_xinxuan_bottom").attr("sd_uiID")].init();
  $(".js_xinxuan_tab li").on("click",function(){
	var $this = $(this),
		curIndex = $this.index();
    $(".js_xinxuan_tab li").removeClass("cur");
	$this.addClass("cur");
	if ($(window).width() <= 1200) {
		sdUiList[$(".js_xinxuan_bottom").attr("sd_uiID")].goto(curIndex);
	} else {
		sdUiList[$(".js_xinxuan_bottom").attr("sd_uiID")].i = curIndex;
		$(".js_xinxuan_bottom").find(".showbox > div").css("left", 0);
		$(".js_xinxuanDetail").eq(curIndex).show().siblings(".js_xinxuanDetail").hide();
		var thisbox = $(".js_xinxuanDetail").eq(curIndex).find(".js_box").oScale();
		thisbox.init();
	}
  });
  // 鎺掕姒滆疆鎾�
  sdUiList[$(".js_paihang_bottom").attr("sd_uiID")] = $(".js_paihang_bottom").oSlider({
    loop: false,
    // moveSpeed: 1000,
    autoWidth: true,
	windowResize: false,
	moveOne: true,
	handtouch: ($(window).width() <= 1200) ? true : false,
    playFn:function(p){
      // 褰撳墠杞挱slider绱㈠紩锛屼粠0寮€濮�
      var curIndex = p.i;
      $(".js_paihang_tab li").removeClass("cur").eq(curIndex).addClass("cur");
	  resetXinxvanTabPosi($(".js_paihang_tab_box"));
	  $(".js_tabboxPaihang").show();
    },
    startFn:function(){
      // 褰撳墠杞挱
      var _this = this,
        curIndex = _this.i;
      $(".js_paihang_tab li").removeClass("cur").eq(curIndex).addClass("cur");
      resetXinxvanTabPosi($(".js_paihang_tab_box"));
    }
  });
  sdUiList[$(".js_paihang_bottom").attr("sd_uiID")].init();
  $(".js_paihang_tab li").on("click",function(){
	var $this = $(this),
		curIndex = $this.index();
    $(".js_paihang_tab li").removeClass("cur");
	$this.addClass("cur");
	if ($(window).width() <= 1200) {
		sdUiList[$(".js_paihang_bottom").attr("sd_uiID")].goto(curIndex);
	} else {
		sdUiList[$(".js_paihang_bottom").attr("sd_uiID")].i = curIndex;
		$(".js_paihang_bottom").find(".showbox > div").css("left", 0);
		$(".js_tabboxPaihang").eq(curIndex).show().siblings(".js_tabboxPaihang").hide();
		var thisbox = $(".js_tabboxPaihang").eq(curIndex).find(".js_box").oScale();
		thisbox.init();
	}
  });
  // 閲嶇疆蹇冮€夌簿鍝併€佹帓琛屾tab浣嶇疆
  function resetXinxvanTabPosi(father){
    var tabBox = father,
    tabWidth = tabBox.width(),
	curTab = father.find("li.cur");
	if (!curTab.length) {
		return false;
	}
    var curTabWidth = curTab.width(),
    curTabLeft = curTab.offset().left;
    if (curTabWidth + curTabLeft > tabWidth) {
      tabBox.scrollLeft(tabBox.scrollLeft() + curTabWidth);
    }
    if (curTabLeft <= 0) {
      tabBox.scrollLeft(tabBox.scrollLeft() - curTabWidth);
    }
  }

	// 鏂伴椈鍥剧墖姣斾緥
	var box1 = $(".js_box").oScale() //鍒涘缓鏂规硶
	box1.init(); //婵€娲绘柟娉�

	// 鏂囧瓧瑁佸壀
	$(".js_tit").oCutText();

	// 鏂伴椈hover
	$(".js_newsDetail").hover(function() {
		$(this).find(".js_line").stop().animate({
			width: "100%"
		})
		$(this).find("div").css({
			"color": "#0c5ca8"
		})
	}, function() {
		$(this).find(".js_line").stop().animate({
			width: "0.6rem"
		})
		$(this).find("div").css({
			"color": "#000"
		})

	})

	// 鑾峰彇鎺掕姒滄暟鎹�
	setTimeout(function () {
		getPaihang();
	},2000)
	// 寤舵椂鍔犺浇闇€瑕佽幏鍙栫殑鏁版嵁
	// 蹇冮€夌簿鍝佺涓€涓猼ab鏁版嵁涓嶅欢杩熷姞杞�
	getXinxuan($(".js_xinxuanDetail").eq(0).attr("data-tab"));
	setTimeout(function () {
		$(".js_xinxuanDetail").each(function(i) {
			if (i > 0) {
				var thisName = $(this).attr("data-tab");
				getXinxuan(thisName);
			}
		});
	},1500)

	// 鑾峰彇鎺掕姒滄暟鎹�

	function getPaihang() {
		var spmc = $(".js_tabboxPaihang").parents("[spm-c]").attr("spm-c");
		$.ajax({})
	}

	// 缁樺埗椤甸潰鏁版嵁鐨勬柟娉�
	function sendList(name, arr) {
		for(var i = 0; i < arr.length; i++) {
			arr[i].imgUrl = arr[i].imgUrl.replace(".com/", ".com/cn/");
			arr[i].imgUrl = cutImg(arr[i].imgUrl, "580")
		}
		$(".js_tabboxPaihang").each(function(i, kid) {
			var tab = $(this).attr("data-tab")
			if(name.indexOf(tab) >= 0) {
				$(this).find("li").remove();
				var html = '';
				for(var j = 0; j < 3; j++) {
					var obj0 = arr[j];
					var number = j + 1;
					var obj0_picture_xs = obj0.imgUrl.substring(0, obj0.imgUrl.lastIndexOf("_")) + "_350" + obj0.imgUrl.substring(obj0.imgUrl.lastIndexOf("."), obj0.imgUrl.length);

					html += '<li class="o_u o_df_1-3 o_xs_2-2 paihang_item"><div class="paihang_pro curph_' + j + '"><a target="_blank" href="' + obj0.link + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="棣栭〉鐣呴攢鎺掕_' + name + '_' + number + '" data-trs-ta-event-item="' + obj0.modelNo + '" data-trs-ta-event-itemname="' + obj0.title + '"><div class="paihang_img">' +
						'<img class="delay_load1 delay_load_hot" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + obj0.imgUrl + '" xs="' + obj0_picture_xs + '" width="100%" alt="">' +
						'</div><div class="paihang_right"><div class="paihang_name">' +
						obj0.title +
						'</div>' +
						'<div class="paihang_xinghao">' +
						obj0.modelNo +
						'</div>' +
						'</div>' +
						'<div class="paihang_ling">' +
						'浜嗚В鏇村' +
						'</div>' +
						'<div class="paihang_icon icon_' + number + '">' +
						'</div>' +
						'</a>' +
						'</div>' +
						'</li>';
				}

				$(this).find("ul").append(html);
			}

		})

	}

})
// 鑾峰彇蹇冮€夌簿鍝�
function getXinxuan(name) {
  // 20191011璋冩暣锛岀涓€涓猼ab涓嶈幏鍙栨湇鍔�
  if (name == "鏅哄浼橀€�") {
    getTab1(name)
    return;
  }
  var spmc = $(".js_xinxuanDetail").parents("[spm-c]").attr("spm-c");
  $.ajax({})
}
// 鑾峰彇蹇冮€夊晢鍝佺涓€涓猼ab
function getTab1(name) {
	var xinxuanHtml=sendXinxuan(name, tab1json.data);
	initXinxuan(name,xinxuanHtml);
}
// 缁樺埗蹇冮€夌簿鍝�
function sendXinxuan(name, arr) {
  if (name == "鏅哄浼橀€�") {
    var className = "xinxuan_tab_1"
  } else {
    var className = ""
  }
    //缁樺埗鏂伴€変骇鍝佺殑html
	var sendXinxuanHtml = "";
  var leftPro = arr[0];
  if(leftPro==undefined){
      return sendXinxuanHtml;
  }
  var leftPro_picture_xs = leftPro.appFile.substring(0, leftPro.appFile.lastIndexOf("_")) + "_350" + leftPro.appFile.substring(leftPro.appFile.lastIndexOf("."), leftPro.appFile.length);
    sendXinxuanHtml += '<div class="content"><div class="o_u o_df_10-24 o_xs_1-2 xinxuan_left ' + className + '"><a class="xinxuan_box_pro" target="_blank" href="' + leftPro.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="棣栭〉蹇冮€夌簿鍝乢' + name + '_1" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '"><div class="xinxuan_box_pro_wrap"><div class="xinxuan_img js_box box" w="1" h="1" base="width">' +
    '<img class="o_u o_df_24-24 js_box box delay_load1 delay_load_xinxuan" w="1" h="1" base="width" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + leftPro.appFile + '" xs="' + leftPro_picture_xs + '" alt="">' +
    '</div><div class="xinxuan_name">' + leftPro.pname + '</div><div class="xinxuan_note">' +
    leftPro.modelno + '</div><p class="xinxuan_line"></p></div></a></div>';
  var centerProTop = arr[1];
  var centerProBot = arr[2];
  if(centerProTop==undefined){
      return sendXinxuanHtml;
  }else if(centerProTop!=undefined&&centerProBot==undefined){
      var centerProTop_picture_xs = centerProTop.appFile.substring(0, centerProTop.appFile.lastIndexOf("_")) + "_200" + centerProTop.appFile.substring(centerProTop.appFile.lastIndexOf("."), centerProTop.appFile.length);
      sendXinxuanHtml += '<div class="o_u o_df_7-24 o_xs_1-2 xinxuan_center"><a class="xinxuan_box_pro xinxuan_box_pro_top" target="_blank" href="' + centerProTop.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="棣栭〉蹇冮€夌簿鍝乢' + name + '_2" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '"><div class="xinxuan_img">' +
          '<img class="js_box box delay_load1 delay_load_xinxuan" w="1" h="1" base="width" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + centerProTop.appFile + '" xs="' + centerProTop_picture_xs + '" alt="">' +
          ' </div><div class="xinxuan_name">' +
          centerProTop.pname +
          '</div>' +
          '<div class="xinxuan_note">' +
          centerProTop.modelno +
          '</div>' +
          '<p class="xinxuan_line"></p>' +
          '</a></div>';
      return sendXinxuanHtml;
  }else if(centerProTop!=undefined&&centerProBot!=undefined){
      var centerProTop_picture_xs = centerProTop.appFile.substring(0, centerProTop.appFile.lastIndexOf("_")) + "_200" + centerProTop.appFile.substring(centerProTop.appFile.lastIndexOf("."), centerProTop.appFile.length);
      var centerProBot_picture_xs = centerProBot.appFile.substring(0, centerProBot.appFile.lastIndexOf("_")) + "_200" + centerProBot.appFile.substring(centerProBot.appFile.lastIndexOf("."), centerProBot.appFile.length);
      sendXinxuanHtml += '<div class="o_u o_df_7-24 o_xs_1-2 xinxuan_center"><a class="xinxuan_box_pro xinxuan_box_pro_top" target="_blank" href="' + centerProTop.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="棣栭〉蹇冮€夌簿鍝乢' + name + '_2" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '"><div class="xinxuan_img">' +
          '<img class="js_box box delay_load1 delay_load_xinxuan" w="1" h="1" base="width" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + centerProTop.appFile + '" xs="' + centerProTop_picture_xs + '" alt="">' +
          ' </div><div class="xinxuan_name">' +
          centerProTop.pname +
          '</div>' +
          '<div class="xinxuan_note">' +
          centerProTop.modelno +
          '</div>' +
          '<p class="xinxuan_line"></p>' +
          '</a><a class="xinxuan_box_pro xinxuan_box_pro_bot" target="_blank" href="' + centerProBot.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="棣栭〉蹇冮€夌簿鍝乢' + name + '_3" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '"><div class="xinxuan_img"><img class="js_box box delay_load1 delay_load_xinxuan" w="1" h="1" base="width" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + centerProBot.appFile + '" xs="' + centerProBot_picture_xs + '" alt=""></div><div class="xinxuan_name">' +
          centerProBot.pname +
          '</div><div class="xinxuan_note">' +
          centerProBot.modelno +
          '</div><p class="xinxuan_line"></p></a></div>';
  }


  var rigntProTop = arr[3];
  var rigntProBot = arr[4];
    if(rigntProTop==undefined){
        return sendXinxuanHtml;
    }else if(rigntProTop!=undefined&&rigntProBot==undefined){
        var rigntProTop_picture_xs = rigntProTop.appFile.substring(0, rigntProTop.appFile.lastIndexOf("_")) + "_200" + rigntProTop.appFile.substring(rigntProTop.appFile.lastIndexOf("."), rigntProTop.appFile.length);
        sendXinxuanHtml += '<div class="o_u o_df_7-24 o_xs_2-2 xinxuan_right"><a class="xinxuan_box_pro xinxuan_box_pro_top " target="_blank" href="' + rigntProTop.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="棣栭〉蹇冮€夌簿鍝乢' + name + '_4" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '">' +
            '<div class="xinxuan_img"><img class="js_box box delay_load1 delay_load_xinxuan" w="1" h="1" base="width" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + rigntProTop.appFile + '" xs="' + rigntProTop_picture_xs + '"  alt="">' +
            '</div><div class="xinxuan_name">' +
            rigntProTop.pname +
            '</div><div class="xinxuan_note">' +
            rigntProTop.modelno +
            '</div><p class="xinxuan_line"></p></a></div>';
       return sendXinxuanHtml;
    }else if(rigntProTop!=undefined&&rigntProBot!=undefined){
        var rigntProTop_picture_xs = rigntProTop.appFile.substring(0, rigntProTop.appFile.lastIndexOf("_")) + "_200" + rigntProTop.appFile.substring(rigntProTop.appFile.lastIndexOf("."), rigntProTop.appFile.length);
        var rigntProBot_picture_xs = rigntProBot.appFile.substring(0, rigntProBot.appFile.lastIndexOf("_")) + "_200" + rigntProBot.appFile.substring(rigntProBot.appFile.lastIndexOf("."), rigntProBot.appFile.length);
        sendXinxuanHtml += '<div class="o_u o_df_7-24 o_xs_2-2 xinxuan_right"><a class="xinxuan_box_pro xinxuan_box_pro_top " target="_blank" href="' + rigntProTop.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="棣栭〉蹇冮€夌簿鍝乢' + name + '_4" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '">' +
            '<div class="xinxuan_img"><img class="js_box box delay_load1 delay_load_xinxuan" w="1" h="1" base="width" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + rigntProTop.appFile + '" xs="' + rigntProTop_picture_xs + '"  alt="">' +
            '</div><div class="xinxuan_name">' +
            rigntProTop.pname +
            '</div><div class="xinxuan_note">' +
            rigntProTop.modelno +
            '</div><p class="xinxuan_line"></p></a>' +
            '<a class="xinxuan_box_pro xinxuan_box_pro_bot" target="_blank" href="' + rigntProBot.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="棣栭〉蹇冮€夌簿鍝乢' + name + '_5" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '"><div class="xinxuan_img">' +
            '<img class="js_box box delay_load1 delay_load_xinxuan" w="1" h="1" base="width" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + rigntProBot.appFile + '" xs="' + rigntProBot_picture_xs + '"  alt=""></div><div class="xinxuan_name">' +
            rigntProBot.pname +
            '</div><div class="xinxuan_note">' +
            rigntProBot.modelno +
            '</div><p class="xinxuan_line"></p></a></div></div>';
          return sendXinxuanHtml;
    }
}
function initXinxuan(name,xinxuanHtml) {
    $(".js_xinxuanDetail").each(function () {
        var thisName = $(this).attr("data-tab");
        if (thisName == name) {
            $(this).html(xinxuanHtml);
            var that = $(this);
            setTimeout(function() {
                that.find(".delay_load_xinxuan").each(function() {
                    $(this).oPicture({}).init();
                });
            }, 1000)
        }
        var curBox = $(this).find(".js_box").oScale() //鍒涘缓鏂规硶
        curBox.init(); //婵€娲绘柟娉�
    })
}
//瑙嗛
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

	// var allWidth = box.find(".right").width();
	// var finalWidth = allWidth * size;
	// var margin = $(".story_box").css("margin-left").split("px")[0] - 0;
	// var zzWidth = finalWidth - margin;
	// zzWidth = zzWidth > 0 ? zzWidth : 0;
	// zzWidth = zzWidth / size;

	function change(size) {
		size = size - 0.3 == 0.7 ? 1 : 0;
		box.find(".left").css("transform", "scale(" + size + ", 1)");
		box.find(".right").css("transform", "scale(" + size + ", 1)");
		// 鐢变簬瑙嗛鍙樺ぇ鏃讹紝涓よ竟闂磋窛鏈夌櫧鑹查棿闅欙紝鎵€浠ユ敞閲婃帀杩欎袱琛�
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

//瑙嗛
var zzWidth = (($(window).width() - $(".story_msg").width()) / 2) - ($(".paihang").css("margin-left").split("px")[0] - 0);
$(".right .colorzz").css({
	"width": zzWidth + "px"
})
$(".left .colorzz").css({
	"width": zzWidth + "px"
})

//鍒ゆ柇鎵€鏈塱e
function isIE() {
	if(!!window.ActiveXObject || "ActiveXObject" in window)
		return true;
	else
		return false;
}
// 鍒ゆ柇璋锋瓕鍐呮牳鐗堟湰
function getChromeVersion() {
	var arr = navigator.userAgent.split(' ');
	var chromeVersion = '';
	for(var i = 0; i < arr.length; i++) {
		if(/chrome/i.test(arr[i]))
			chromeVersion = arr[i]
	}
	if(chromeVersion) {
		return Number(chromeVersion.split('/')[1].split('.')[0]);
	} else {
		return false;
	}
}
getChromeVersion()
//鍒ゆ柇 寰俊
function autoPlay() {
	var ua = navigator.userAgent.toLowerCase();
	var u = navigator.userAgent,
		app = navigator.appVersion;
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		if($(window).width() <= 750) {
			if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				//ios缁堢
				return true;
			}
			return false;
		} else {
			return false;
		}
	}
}

// 瑁佸壀鍥剧墖
function cutImg(name, size) {
	var nameArr = name.split(".");
	var finalName = "";
	for(var i = 0; i < nameArr.length - 2; i++) {
		finalName += nameArr[i] + ".";
	}
	finalName += nameArr[nameArr.length - 2] + "_" + size + "." + nameArr[nameArr.length - 1];
	return finalName;
}
// 鍒ゆ柇鏄庢槦浜у搧宸﹀彸闂磋窛鐨勯棶棰�
starLen()

function starLen() {
	var len = ($(".star_content").eq(0).css("margin-left").split("px")[0] - 0) + 15;
	$(".star .banner_btn_prev").css({
		"left": len + "px"
	});
	$(".star .banner_btn_next").css({
		"right": len + "px"
	});
}

function loadSrc(src, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	var style = document.createElement("link");
	style.rel = "stylesheet";
	if(src.substr(src.length - 2, 2) == "js") {
		if(callback) {
			if(script.readyState) {
				script.onreadystatechange = function() {
					if(script.readyState == "loaded" || script.readyState == "complete") {
						script.onreadystatechange = null;
						callback()
					}
				}
			} else {
				script.onload = function() {
					callback()
				}
			}
		}
		script.src = src;
		document.body.appendChild(script)
	} else {
		if(src.substr(src.length - 2, 2) == "ss") {
			style.href = src;
			document.body.appendChild(style)
		}
	}
};
setTimeout(function() {
	$('.delay_load').each(function() {
		$(this).attr('src', $(this).attr('data-src'))
	})
	var box2 = $(".js_box").oScale() //鍒涘缓鏂规硶
	box2.init(); //婵€娲绘柟娉�
}, 2200);
// 鍙栫獥鍙ｅ彲瑙嗚寖鍥寸殑楂樺害
function getClientHeight() {
	var clientHeight = 0;
	if(document.body.clientHeight && document.documentElement.clientHeight) {
		var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
	} else {
		var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
	}
	return clientHeight;
}