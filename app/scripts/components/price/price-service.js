'use strict';

angular.module('bitPrice.price.priceService', ['ngResource'])

.factory('priceService', function($resource) {
  return $resource('sampleData.json');
});
