'use strict';

angular.module('bitPrice', [
  'ui.router',
  'bitPrice.appView',
  'bitPrice.infoView'
])

.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('appView', {
      url: '/',
      templateUrl: 'scripts/views/appView/appView.html',
      controller: 'appViewController'
    })
    .state('infoView', {
      url: '/about',
      templateUrl: 'scripts/views/infoView/infoView.html',
      controller: 'infoViewController'
    });
}]);
