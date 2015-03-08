'use strict';

angular.module('bitPrice.price.subcentsFilter', [])

.filter('subcents', ['currencyFilter', function(currencyFilter) {
  return function(input, currencySymbol, decimalPlaces) {
    var number = Number(input);
    var symbol = currencySymbol || '$';
    var decimals = Number(decimalPlaces) || 2;

    if(number >= 0.01) {
      //display value with angular currency filter
      return currencyFilter(number, symbol, decimals);
    } else {
      //display value in cents
      return '.' + (number * 100).toFixed(4).split('.')[1] + '¢';
    }
  };
}]);
