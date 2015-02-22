'use strict';

angular.module('bitPrice.appView', [
  'bitPrice.price',
  'bitPrice.tweetButton'
])

.controller('appViewController', ['$scope', function ($scope) {
  $scope.tweetInfo = {
    url: 'http://bitprice.io/',
    via: 'BitPrice_io',
    text: 'The real-time Bit price.',
    related: 'bitjson'
  };
}]);
