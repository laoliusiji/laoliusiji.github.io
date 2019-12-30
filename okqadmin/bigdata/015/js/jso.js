$(function() {
	// // 引用video依赖，防止video播放失败问题
	// videojs.options.flash.swf = siteConfig.imgUrl + "/cn/images/video-js.swf";
	// 判断是否在可视化编辑页面下，部分功能需要注释
	var shedderShow = window.location.href.indexOf("shedderShow") > 0 ? true : false;
	if(shedderShow) {
		$(".story").find(".sd_item").addClass("sd_item_css");
		$(".story").find(".wz").hide();
		$(".story").find(".jg").hide();
		// 可视化下将video的data-src赋值给src
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
				loadSrc("../vioset.js", function() {
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
	// 明星产品js_box
	var bannerStarBox = "";
	// 心选精品js_box
	var xinxvanBox = "";
	// 排行榜产品js_box
	var paihangBox = "";

	// 屏幕拖拉初始化各种方法
	$(window).resize(function() {
		var curWinWidth = $(window).width();

		// 轮播图初始化
		sdUiList[$(".js_boxBanner").attr("sd_uiID")].init(); //开始轮播
		if(winWidth !== curWinWidth) {
			winWidth = curWinWidth;
			// 明星产品
			var scrollTop = getScrollTop(),
				bannerStar = getTop($(".js_bannerStar")),
				cTop = document.documentElement.clientHeight || 600;
			if((scrollTop + cTop >= bannerStar)) {
				sdUiList[$(".js_bannerStar").attr("sd_uiID")].init(); //开始轮播
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
			// 心选精品轮播
			sdUiList[$(".js_xinxuan_bottom").attr("sd_uiID")].init();
			// 排行榜轮播
			sdUiList[$(".js_paihang_bottom").attr("sd_uiID")].init();
		}

		// banner宽度
		box1.init(); //激活方法
		if(bannerStarBox != "") {
			bannerStarBox.init(); //激活方法
		}
		// 重置心选精品图片样式
		xinxvanBox = $(".js_xinxuan_bottom .js_xinxuanDetail .js_box").oScale() //创建方法
		xinxvanBox.init(); //激活方法
		// 重置排行榜图片样式
		paihangBox = $(".js_paihang_bottom .js_tabboxPaihang .js_box").oScale() //创建方法
		paihangBox.init(); //激活方法
		$(".o_picture").each(function() {
			if(!$(this).hasClass(".js_newsImg")) {
				$(this).oPicture({}).init();
			}
		});
		// $(".o_picture").init();
		$(".js_tit").oCutText();
	});

	// 首页banner视频
	if($(".js_bannerVideoBtn").length > 0) {
		videoInit();
	}
	// banner视频的初始化方法
	function videoInit() {
		// 点击banner之后视频播放
		var videoUrl = $(".js_bannerVideoBtn").attr("data-videurl");
		var player = videojs("bannerVideo");
		$(".js_bannerVideoBtn").off().on("click", function() {
			$(".js_bannerVideoPop").show();
			// 视频播放
			player.src(videoUrl);
			player.play();
		})
		$(".js_popClose").off().on("click", function() {
			$(".js_bannerVideoPop").hide();
			player.pause();
		})
	}

	//响应式图片初始化

	$(".o_picture").each(function() {
		if(!$(this).hasClass("js_newsImg")) {
			if(!$(this).hasClass("js_biliImg")) {
				$(this).oPicture({}).init();
			}
		}
	});
	// banner定义
	sdUiList[$(".js_boxBanner").attr("sd_uiID")] = $(".js_boxBanner").oSlider({
		loop: true,
		speed: 3000,
		pager: ".js_pager",
		// autoWidth: true,
		// moveSpeed: 1000,
		startFn: function() {
			$(".js_biliImg").each(function() {
				var this_width = $(this).parents("li").width();
				var winWidth = $(window).width();
				if(winWidth > 750) {
					$(this).css({
						"height": this_width / 3 + "px"
					})
					$(this).parents(".js_boxBanner").css({
						"height": this_width / 3 + "px"
					})
				} else {
					var this_width = $(this).width();
					var winWidth = $(window).width();
					$(this).css({
						"height": this_width * 0.48 + "px"
					})
					$(this).parents(".js_boxBanner").css({
						"height": this_width * 0.48 + "px"
					})
				}
			})
			$(".js_pager").each(function() {
				var isShow = $(this).find("li").length;
				if(!isShow) {
					$(this).parents(".banner").find(".banner_btn").remove();
				}
			})
			$(".o_picture").each(function() {
				var _this = $(this);
				if($(this).hasClass("js_biliImg")) {
					if($(this).parents(".sd_item").hasClass("o_cur")) {
						$(this).oPicture({}).init();
					} else {
						setTimeout(function() {
							_this.oPicture({}).init();
						}, 200)
					}
				}
			});
			// 初始化视频
			if($(".js_bannerVideoBtn").length > 0) {
				videoInit();
			}
		}

	});
	sdUiList[$(".js_boxBanner").attr("sd_uiID")].init(); //开始轮播
	$(".js_pagePrev").on("click", function() {
		sdUiList[$(".js_boxBanner").attr("sd_uiID")].prev();
	})
	$(".js_pageNext").on("click", function() {
		sdUiList[$(".js_boxBanner").attr("sd_uiID")].next();
	})
	// banner宽度
	var box1 = $(".js_box").oScale() //创建方法
	box1.init(); //激活方法
	$(".xinxuan_tab").find("li").click(function() {
		var box3 = $(".js_box").oScale() //创建方法
		box3.init(); //激活方法
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
			sdUiList[$(".js_bannerStar").attr("sd_uiID")].init(); //开始轮播
			//初始化响应式图片
			$(".js_newsImg").each(function() {
				$(this).oPicture({}).init();
			});
			bannerStarBox = $(".js_bannerStar .js_box").oScale() //创建方法
			bannerStarBox.init(); //激活方法
		}
	});

	$(".js_starPrev").on("click", function() {
		sdUiList[$(".js_bannerStar").attr("sd_uiID")].prev();
	})
	$(".js_starNext").on("click", function() {
		sdUiList[$(".js_bannerStar").attr("sd_uiID")].next();
  })
  
  // 心选精品轮播
  sdUiList[$(".js_xinxuan_bottom").attr("sd_uiID")] = $(".js_xinxuan_bottom").oSlider({
    loop: false,
    // moveSpeed: 1000,
    autoWidth: true,
	windowResize: false,
	moveOne: true,
	handtouch: ($(window).width() <= 1200) ? true : false,
    playFn:function(p){
      // 当前轮播slider索引，从0开始
      var curIndex = p.i;
      $(".js_xinxuan_tab li").removeClass("cur").eq(curIndex).addClass("cur");
	  resetXinxvanTabPosi($(".js_xinxuan_tab_box"));
	  $(".js_xinxuanDetail").show();
    },
    startFn:function(){
      // 当前轮播
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
  // 排行榜轮播
  sdUiList[$(".js_paihang_bottom").attr("sd_uiID")] = $(".js_paihang_bottom").oSlider({
    loop: false,
    // moveSpeed: 1000,
    autoWidth: true,
	windowResize: false,
	moveOne: true,
	handtouch: ($(window).width() <= 1200) ? true : false,
    playFn:function(p){
      // 当前轮播slider索引，从0开始
      var curIndex = p.i;
      $(".js_paihang_tab li").removeClass("cur").eq(curIndex).addClass("cur");
	  resetXinxvanTabPosi($(".js_paihang_tab_box"));
	  $(".js_tabboxPaihang").show();
    },
    startFn:function(){
      // 当前轮播
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
  // 重置心选精品、排行榜tab位置
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

	// 新闻图片比例
	var box1 = $(".js_box").oScale() //创建方法
	box1.init(); //激活方法

	// 文字裁剪
	$(".js_tit").oCutText();

	// 新闻hover
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

	// 获取排行榜数据
	setTimeout(function () {
		getPaihang();
	},2000)
	// 延时加载需要获取的数据
	// 心选精品第一个tab数据不延迟加载
	getXinxuan($(".js_xinxuanDetail").eq(0).attr("data-tab"));
	setTimeout(function () {
		$(".js_xinxuanDetail").each(function(i) {
			if (i > 0) {
				var thisName = $(this).attr("data-tab");
				getXinxuan(thisName);
			}
		});
	},1500)

	// 获取排行榜数据

	function getPaihang() {
		var spmc = $(".js_tabboxPaihang").parents("[spm-c]").attr("spm-c");
		$.ajax({
			url: siteConfig.apiUrl + "/haierfile/rankJsonFile/new_pop_day.json",
			type: "get",
			dataType: "json",
			SPMC: spmc,
			callback: function(result) {
				if(((!!result.sales_list) && (JSON.stringify(result.sales_list.sales_list) !== "{}"))) {
					$.each(result.sales_list.sales_list, function(i, kidObj) {
						sendList(i, kidObj)
					})
					//添加图片懒加载的事件
					$(".delay_load_hot").each(function() {
						$(this).oPictureLazy();
               
					})

				}
			}
		})
	}

	// 绘制页面数据的方法
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

					html += '<li class="o_u o_df_1-3 o_xs_2-2 paihang_item"><div class="paihang_pro curph_' + j + '"><a target="_blank" href="' + obj0.link + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="首页畅销排行_' + name + '_' + number + '" data-trs-ta-event-item="' + obj0.modelNo + '" data-trs-ta-event-itemname="' + obj0.title + '"><div class="paihang_img">' +
						'<img class="delay_load1 delay_load_hot" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + obj0.imgUrl + '" xs="' + obj0_picture_xs + '" width="100%" alt="">' +
						'</div><div class="paihang_right"><div class="paihang_name">' +
						obj0.title +
						'</div>' +
						'<div class="paihang_xinghao">' +
						obj0.modelNo +
						'</div>' +
						'</div>' +
						'<div class="paihang_ling">' +
						'了解更多' +
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
// 获取心选精品
function getXinxuan(name) {
  // 20191011调整，第一个tab不获取服务
  if (name == "智家优选") {
    getTab1(name)
    return;
  }
  var spmc = $(".js_xinxuanDetail").parents("[spm-c]").attr("spm-c");
  $.ajax({
    url: siteConfig.apiUrl + "/interaction-search/front/cnSearchController/getProductsByTagName",
    type: "get",
    dataType: "json",
    async: false,
    SPMC: spmc,
    data: {
      tagName: name,
      pageSize: 5
    },
    callback: function (data) {
	  var result = data.data.entities || [];
      for (var i = 0; i < result.length; i++) {
        if (result[i].docPubUrl) {
          var a = result[i].docPubUrl;
          var arr2 = a.split(".com/")[1].split("/");
          if (result[i].docPubUrl.indexOf("/cn/") > 0) {
            var finallUrl = siteConfig.imgUrl + "/";
          } else {
            var finallUrl = siteConfig.imgUrl + "/cn/";
          }
          for (var j = 0; j < arr2.length - 1; j++) {
            finallUrl += arr2[j] + "/"
          }
          result[i].appFile = finallUrl + result[i].appFile;
          result[i].appFile = cutImg(result[i].appFile, "580")
        } else {
          result[i].docPubUrl = "/"
          result[i].appFile = "/";

        }
      }
      var xinxuanHtml=sendXinxuan(name, result);
      initXinxuan(name,xinxuanHtml);
    },
    error: function (data) {

    }
  })
}
// 获取心选商品第一个tab
function getTab1(name) {
	var xinxuanHtml=sendXinxuan(name, tab1json.data);
	initXinxuan(name,xinxuanHtml);
}
// 绘制心选精品
function sendXinxuan(name, arr) {
  if (name == "智家优选") {
    var className = "xinxuan_tab_1"
  } else {
    var className = ""
  }
    //绘制新选产品的html
	var sendXinxuanHtml = "";
  var leftPro = arr[0];
  if(leftPro==undefined){
      return sendXinxuanHtml;
  }
  var leftPro_picture_xs = leftPro.appFile.substring(0, leftPro.appFile.lastIndexOf("_")) + "_350" + leftPro.appFile.substring(leftPro.appFile.lastIndexOf("."), leftPro.appFile.length);
    sendXinxuanHtml += '<div class="content"><div class="o_u o_df_10-24 o_xs_1-2 xinxuan_left ' + className + '"><a class="xinxuan_box_pro" target="_blank" href="' + leftPro.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="首页心选精品_' + name + '_1" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '"><div class="xinxuan_box_pro_wrap"><div class="xinxuan_img js_box box" w="1" h="1" base="width">' +
    '<img class="o_u o_df_24-24 js_box box delay_load1 delay_load_xinxuan" w="1" h="1" base="width" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + leftPro.appFile + '" xs="' + leftPro_picture_xs + '" alt="">' +
    '</div><div class="xinxuan_name">' + leftPro.pname + '</div><div class="xinxuan_note">' +
    leftPro.modelno + '</div><p class="xinxuan_line"></p></div></a></div>';
  var centerProTop = arr[1];
  var centerProBot = arr[2];
  if(centerProTop==undefined){
      return sendXinxuanHtml;
  }else if(centerProTop!=undefined&&centerProBot==undefined){
      var centerProTop_picture_xs = centerProTop.appFile.substring(0, centerProTop.appFile.lastIndexOf("_")) + "_200" + centerProTop.appFile.substring(centerProTop.appFile.lastIndexOf("."), centerProTop.appFile.length);
      sendXinxuanHtml += '<div class="o_u o_df_7-24 o_xs_1-2 xinxuan_center"><a class="xinxuan_box_pro xinxuan_box_pro_top" target="_blank" href="' + centerProTop.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="首页心选精品_' + name + '_2" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '"><div class="xinxuan_img">' +
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
      sendXinxuanHtml += '<div class="o_u o_df_7-24 o_xs_1-2 xinxuan_center"><a class="xinxuan_box_pro xinxuan_box_pro_top" target="_blank" href="' + centerProTop.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="首页心选精品_' + name + '_2" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '"><div class="xinxuan_img">' +
          '<img class="js_box box delay_load1 delay_load_xinxuan" w="1" h="1" base="width" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + centerProTop.appFile + '" xs="' + centerProTop_picture_xs + '" alt="">' +
          ' </div><div class="xinxuan_name">' +
          centerProTop.pname +
          '</div>' +
          '<div class="xinxuan_note">' +
          centerProTop.modelno +
          '</div>' +
          '<p class="xinxuan_line"></p>' +
          '</a><a class="xinxuan_box_pro xinxuan_box_pro_bot" target="_blank" href="' + centerProBot.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="首页心选精品_' + name + '_3" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '"><div class="xinxuan_img"><img class="js_box box delay_load1 delay_load_xinxuan" w="1" h="1" base="width" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + centerProBot.appFile + '" xs="' + centerProBot_picture_xs + '" alt=""></div><div class="xinxuan_name">' +
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
        sendXinxuanHtml += '<div class="o_u o_df_7-24 o_xs_2-2 xinxuan_right"><a class="xinxuan_box_pro xinxuan_box_pro_top " target="_blank" href="' + rigntProTop.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="首页心选精品_' + name + '_4" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '">' +
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
        sendXinxuanHtml += '<div class="o_u o_df_7-24 o_xs_2-2 xinxuan_right"><a class="xinxuan_box_pro xinxuan_box_pro_top " target="_blank" href="' + rigntProTop.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="首页心选精品_' + name + '_4" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '">' +
            '<div class="xinxuan_img"><img class="js_box box delay_load1 delay_load_xinxuan" w="1" h="1" base="width" src="' + siteConfig.imgUrl + '/cn/images/haier2019_station_bitmap.png" df="' + rigntProTop.appFile + '" xs="' + rigntProTop_picture_xs + '"  alt="">' +
            '</div><div class="xinxuan_name">' +
            rigntProTop.pname +
            '</div><div class="xinxuan_note">' +
            rigntProTop.modelno +
            '</div><p class="xinxuan_line"></p></a>' +
            '<a class="xinxuan_box_pro xinxuan_box_pro_bot" target="_blank" href="' + rigntProBot.docPubUrl + '" data-trs-ta-event-key="aditem" data-trs-ta-event-type="adshow" data-trs-ta-event-itemType="首页心选精品_' + name + '_5" data-trs-ta-event-item="' + leftPro.modelno + '" data-trs-ta-event-itemname="' + leftPro.pname + '"><div class="xinxuan_img">' +
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
        var curBox = $(this).find(".js_box").oScale() //创建方法
        curBox.init(); //激活方法
    })
}
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

//判断所有ie
function isIE() {
	if(!!window.ActiveXObject || "ActiveXObject" in window)
		return true;
	else
		return false;
}
// 判断谷歌内核版本
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
//判断 微信
function autoPlay() {
	var ua = navigator.userAgent.toLowerCase();
	var u = navigator.userAgent,
		app = navigator.appVersion;
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		if($(window).width() <= 750) {
			if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				//ios终端
				return true;
			}
			return false;
		} else {
			return false;
		}
	}
}

// 裁剪图片
function cutImg(name, size) {
	var nameArr = name.split(".");
	var finalName = "";
	for(var i = 0; i < nameArr.length - 2; i++) {
		finalName += nameArr[i] + ".";
	}
	finalName += nameArr[nameArr.length - 2] + "_" + size + "." + nameArr[nameArr.length - 1];
	return finalName;
}
// 判断明星产品左右间距的问题
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
	var box2 = $(".js_box").oScale() //创建方法
	box2.init(); //激活方法
}, 2200);
// 取窗口可视范围的高度
function getClientHeight() {
	var clientHeight = 0;
	if(document.body.clientHeight && document.documentElement.clientHeight) {
		var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
	} else {
		var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
	}
	return clientHeight;
}