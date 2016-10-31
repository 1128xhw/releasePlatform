'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mobile', {
    templateUrl: 'mobile/mobile.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

}]);