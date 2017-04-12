/**
 * Created by xuhw on 2016/11/7.
 */

var appId = "wx8f4e5d9902ee2889";
var timestamp = '';
var nonceStr = '';
var url = encodeURIComponent(location.href.split('#')[0]);
var signature = '';

var title = "i智慧岛微信分享";
var link = window.location.href;
var imgUrl = "https://wechat1.izhihuidao.com/shareTest/image/share.png";
var desc = "该分享内容来自i智慧岛微信分享页面";

var shareStyle = {};
shareStyle.shareStyleSet = function (sss_title,sss_imgUrl,sss_desc) {
//function shareStyleSet(sss_title,sss_imgUrl,sss_desc) {

    title = sss_title;
    imgUrl = sss_imgUrl || imgUrl;
    desc = sss_desc;

    getSignature();

    setShareInfo({
        title: title, // 分享标题
        summary: desc, // 分享内容
        pic: imgUrl, // 分享图片
        url: link, // 分享链接
    });
};

function shareStyleSet(sss_title,sss_imgUrl,sss_desc) {

    title = sss_title;
    imgUrl = sss_imgUrl || imgUrl;
    desc = sss_desc;

    getSignature();

    setShareInfo({
        title: title, // 分享标题
        summary: desc, // 分享内容
        pic: imgUrl, // 分享图片
        url: link, // 分享链接
    });
};

setShareInfo({
    title: 1, // 分享标题
    summary: 2, // 分享内容
    pic: 3, // 分享图片
    url: link, // 分享链接
});

function getSignature() {
    var protocol = window.location.protocol;
    if(protocol=='https:') return;
    var getSignatureUrl = "http://wechat.izhihuidao.com/api/api/User/getSignature?url=" + url;
    $.ajax({
        type: "GET",
        url: getSignatureUrl
    }).done(function (data) {
        timestamp = data.result.timestamp;
        nonceStr = data.result.noncestr;
        signature = data.result.signature;
        wx_config();
    }).fail(function (data) {
        console.log("error:" + JSON.stringify(data));
    })
}

function wx_config() {
    //console.log(nonceStr)
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
}
