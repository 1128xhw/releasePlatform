/**
 * Created by xuhw on 2016/11/7.
 */
console.log("这是测试文字11");
document.getElementsByTagName('span')[0].innerHTML = "这是测试文字4";

var appId = "wx8f4e5d9902ee2889";
var appSecret = "3dea2098593906749c25e5e02f96bee5";
//var access_token = "";
var access_token = "rHqW4IYzW1Pn5K2sC-w4OabeEThEGHi3P4ANApUKchAPktN0Y-5kiADd6y_9OvjVo_xugPQjHsNUx3nN-ta6F1SmW1KQiFsrfWbLgPF56r2kyFCQwxou0JgfrlqNTYE1HCXdAIAKFA";
// var ticket = '';
var ticket = 'kgt8ON7yVITDhtdwci0qeSb7gnsXmuvXsfzJmlh166P-kGMi6lo52TpeiSHz2Ys-OAZYRPKEUpnu38lXPEXxZA';

var title = "智慧班牌微信分享测试";
var link = window.location.href;
var imgUrl = "http://wechat1.izhihuidao.com/shareTest/image/share.png";
var desc = "智慧班牌微信分享测试;智慧班牌QQ分享测试;智慧班牌微信朋友圈分享测试;";
$.when(getAccessToekn()).then(function (data, textStatus, jqXHR) {
    getJsapiTicket();
}).then(function (data, textStatus, jqXHR) {
    wx_config();
});

function getAccessToekn() {
    // var accessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appSecret;
    // $.ajax({
    //     type: "GET",
    //     url: accessTokenUrl,
    //     contentType: "application/json; encoding=utf-8",
    //     headers:{
    //         "Access-Control-Allow-Origin":"*"
    //     }
    // }).done(function (data) {
    //     console.log(data);
    //     access_token = data.access_token;
    // }).fail(function (data) {
    //     console.log("error:" + JSON.stringify(data));
    // })
}
function getJsapiTicket() {
    // var jsapiTicketUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi";
    // $.ajax({
    //     type: "GET",
    //     url: jsapiTicketUrl,
    //     contentType: "application/json; encoding=utf-8",
    //     headers:{
    //         "Access-Control-Allow-Origin":"*"
    //     }
    // }).done(function (data) {
    //     console.log(data);
    //     ticket = data.ticket;
    // }).fail(function (data) {
    //     console.log("error:" + JSON.stringify(data));
    // })
}

function wx_config() {
    var timestamp = new Date().getTime();
    var nonceStr = random_string(16);
    var url = window.location.href;
    var string = "jsapi_ticket=" + ticket + "&noncestr=" + nonceStr + "&timestamp=" + timestamp + "&url=" + url;
    var signature = hex_sha1(string);
    console.log("url: " + url);
    console.log("string: " + string);
    console.log("singnature: " + signature);
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
}

setShareInfo({
    title: title, // 分享标题
    summary: desc, // 分享内容
    pic: imgUrl, // 分享图片
    url: link, // 分享链接
});

wx.ready(function () {

    //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    //获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    //获取“分享到QQ”按钮点击状态及自定义分享内容接口
    wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
    wx.onMenuShareWeibo({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
    wx.onMenuShareQZone({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
});


function random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}