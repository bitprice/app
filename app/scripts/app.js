'use strict';

angular.module('bitPrice', [
  'ngRoute',
  'bitPrice.appView'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
