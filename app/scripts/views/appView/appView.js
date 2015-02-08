'use strict';

angular.module('bitPrice.appView', [
  'ngRoute',
  'bitPrice.price'
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'scripts/views/appView/appView.html',
    controller: 'appViewController'
  });
}])

.controller('appViewController', ['$scope', function ($scope) {

}]);
