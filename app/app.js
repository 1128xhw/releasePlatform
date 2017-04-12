'use strict';

// Declare app level module which depends on views, and components
var rPApp = angular.module('myApp', [
    'ngRoute',
    'myApp.version'
]);
rPApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.when('/:id', {reloadOnSearch: false});
    // $routeProvider.when('/error', {
    //     templateUrl: 'error/error.html',
    //     controller: 'View3Ctrl'
    // });
    //$locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/:id'});

    $locationProvider.html5Mode(true);
}]);
rPApp.controller('rPAppCtrl', ['$scope', '$location', '$routeParams', '$http', function ($scope, $location, $routeParams, $http) {
    $scope.pageDirective = '';
    $scope.url = $location.absUrl();
    $scope.platform = '';
    $scope.isWeChat = false;
    var pathUrl = $location.path();
    var appKey = pathUrl.substring(1, pathUrl.length);
    console.log(pathUrl + new Date());
    //$scope.judgePlatform = function () {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //alert(navigator.userAgent);
        //苹果端
        $scope.pageDirective = "mobileContent";
        $scope.platform = "iOS";
    } else if (/(Android)/i.test(navigator.userAgent)) {
        //alert(navigator.userAgent);
        //安卓端
        $scope.pageDirective = "mobileContent";
        $scope.platform = "Android";
    } else {
        //alert(navigator.userAgent);
        //pc端
        $scope.pageDirective = "pcContent";
        $scope.platform = "PC";
    }

    var protocol = window.location.protocol;
    $http.get(protocol+"//api.izhihuidao.com/AppApi/api/appversion/getAppDetails/" + appKey).success(function (response) {
        console.log(response);
        if (response.ReturnCode != 1) {
            $scope.pageDirective = "errorContent";
            //console.log("yingyongbucunzai")
        } else {
            $scope.viewData = response.Result;
            var version = response.Result.AppVersions;
            if (version[0].Platform == "安卓") {
                $scope.AndroidVersion = version[0];
                if (version.length > 1) {
                    $scope.iOSVersion = version[1];
                }
            } else {
                $scope.iOSVersion = version[0];
                if (version.length > 1) {
                    $scope.AndroidVersion = version[1];
                }
            }
            if ($scope.platform == "iOS") {
                if ($scope.iOSVersion) {
                    $scope.Version = $scope.iOSVersion;
                    $scope.isAndroid = false;
                } else {
                    $scope.pageDirective = "errorContent"
                }

            } else if ($scope.platform == "Android") {
                if ($scope.AndroidVersion) {
                    $scope.Version = $scope.AndroidVersion;
                    $scope.isAndroid = true;
                } else {
                    $scope.pageDirective = "errorContent"
                }
            }
        }
        document.title = $scope.viewData.AppName + " - 下载";


    }).error(function () {
        $scope.pageDirective = "errorContent";
    }).then(function () {
        //设置微信、qq分享样式
        var sss_title = $scope.viewData.AppName + " - 下载";
        var sss_imgUrl = $scope.viewData.Icon;
        var sss_desc = $scope.viewData.Description || 'i智慧岛应用发布系统';
        shareStyleSet(sss_title, sss_imgUrl, sss_desc);

        //设置二维码
        var text = $location.absUrl();
        $(document).find('#code').qrcode({
            render: "table", //table方式
            width: 100, //宽度
            height: 100, //高度
            text: text //任意内容
        });
    });

    $scope.download = function (type, url) {
        if (/(MicroMessenger)/i.test(navigator.userAgent)) {
            //alert("微信内置浏览器")
            $scope.isWeChat = true;
        }
        //目前QQ可以安装应用，iOS标示为：QQ ；Android标示为：MQQBrowser QQ；QQ浏览器为：MQQBrowser
        else if (/(QQ)/i.test(navigator.userAgent)) {
            //alert("QQ内置浏览器");
            $scope.isWeChat = true;
        }


        var appUrl = "";
        if (type == "企业版") {
            appUrl = "itms-services://?action=download-manifest&url=" + url;
        } else {
            appUrl = url;
        }
        window.location.href = appUrl;
    };

    $scope.pcDowmload = function (url) {
        window.location.href = url;
    };

}]);

var tempTime = new Date().getTime();
rPApp.directive('pcContent', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        templateUrl: 'pc/pcView.html?time=' + tempTime,
        link: function (scope, element, attrs) {

        }
    }
});

rPApp.directive('mobileContent', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        templateUrl: 'mobile/mobileView.html?time=' + tempTime,
        link: function (scope, element, attrs) {

        }
    }
});

rPApp.directive('errorContent', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        templateUrl: 'error/error.html?time=' + tempTime,
        link: function (scope, element, attrs) {

        }
    }
});

rPApp.directive('wechatNotice', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div style="width:100%;height:160px;background-color: #555555;color: white;position: relative;z-index: -2;">' +
        '<div class="animated wobble" style="width: 60%;position: fixed;top: 50px;left: 65px;z-index: -1;">' +
        '<div>请点击有上角菜单</div>' +
        '<div>在默认浏览器中打开并安装应用</div>' +
        '</div>' +
        '<img class="animated wobble" style="height:4em;width: 4em;position: fixed;top:20px;right:20px;z-index: -1;" src="image/short-arrow.png">' +
        '</div>',
        link: function (scope, element, attrs) {

        }
    }
});