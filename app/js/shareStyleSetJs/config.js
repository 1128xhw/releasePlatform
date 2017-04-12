/**
 * Created by xuhw on 2016/11/29.
 */
var wx;
var setShareInfo;
require.config({
    urlArgs: 'v=1611301024',
    paths: {
        'weixinjs': ['http://res.wx.qq.com/open/js/jweixin-1.0.0'],
        'qqjs': ['qqShare'],
        'jquery': ['jquery-2.2.3.min'],
        'main': ['main']
    },
    shim:{
        'main':{
            init:function(){
                return{
                    shareStyleSet:shareStyle.shareStyleSet,
                    getSignature:getSignature,
                    wx_config:wx_config
                }
            }
        }
    }
});

require(['weixinjs', 'qqjs', 'jquery','main'], function (wxObj, qqObj) {
    wx = wxObj;
    setShareInfo = qqObj;
    //shareStyle.shareStyleSet();
});