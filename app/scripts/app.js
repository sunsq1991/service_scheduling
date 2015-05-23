'use strict';

/**
 * @ngdoc overview
 * @name serviceSchedulingApp
 * @description
 * # serviceSchedulingApp
 *
 * Main module of the application.
 */
var app =
  angular.module('serviceSchedulingApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.sortable',
    'firebase'
  ]);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
app.config(['$tooltipProvider', function($tooltipProvider){
  $tooltipProvider.setTriggers({
    'mouseenter': 'mouseleave',
    'click': 'never',
    'focus': 'blur'
  });
}]);
