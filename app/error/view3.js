'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/error', {
    templateUrl: 'error/error.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$routeParams',function($routeParams) {
  // console.log($routeParams.id);
}]);