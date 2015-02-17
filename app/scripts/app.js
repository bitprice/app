'use strict';

angular.module('bitPrice', [
  'ngRoute',
  'bitPrice.appView'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo: '/'});
}]);
