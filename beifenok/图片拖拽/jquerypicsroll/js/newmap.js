jQuery(function () {

 });

//中间图片区域
var params = {//定义一个对象
    zoomVal:1,
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};
//滚轮改变图片缩放比例
function bbimg(o){       
    //获取对象
    var o=o.getElementsByTagName("img")[0];
    params.zoomVal+=event.wheelDelta/1200;
    if (params.zoomVal >= 0.2) {
        o.style.transform="scale("+params.zoomVal+")";

    } else {
       
        var amplifyValue=jQuery("#img").css("transform").replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1').split(',')[0]
        params.zoomVal=parseFloat(amplifyValue);
        o.style.transform="scale("+params.zoomVal+")";
        return false;

    }

   
}
//点击放大或者缩小
function amplify(index){
//index决定放大或者缩小1是放大2是缩小
var index=index;
//获取TRANMSFORM的第一个值
var amplifyValue=jQuery("#img").css("transform").replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1').split(',')[0];  
if(index==1&&amplifyValue){
    //通过SCALE改变图片缩放点击一次增加0.1
    var biger=parseFloat(amplifyValue)+0.1;          
    jQuery("#img").css({"transform":"scale("+biger+")"});
}else if(index==2&&amplifyValue){
     //通过SCALE改变图片缩放点击一次减少0.1
    var biger=parseFloat(amplifyValue)-0.1;
    console.log(biger)
    jQuery("#img").css({"transform":"scale("+biger+")"});
}else if(index==1){
    //初始状态放大
    jQuery("#img").css({"transform":"scale(1.1)"});
}else if(index==2){
    //初始状态缩小
    jQuery("#img").css({"transform":"scale(0.9)"});
}


}

