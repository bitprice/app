'use strict';

angular.module('bitPrice.appView', [
  'ngRoute',
  'bitPrice.price',
  'bitPrice.tweetButton'
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'scripts/views/appView/appView.html',
    controller: 'appViewController'
  });
}])

.controller('appViewController', ['$scope', function ($scope) {
  $scope.tweetInfo = {
    url: 'http://bitprice.io/',
    via: 'BitPrice_io',
    text: 'The real-time Bit price.',
    related: 'bitjson'
  };
}]);
