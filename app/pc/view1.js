'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pc', {
    templateUrl: 'pc/pc.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);