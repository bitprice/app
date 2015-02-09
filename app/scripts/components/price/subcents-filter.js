'use strict';

angular.module('bitPrice.price.subcentsFilter', [])

.filter('subcents', function() {
  return function(input) {
    var number = Number(input);

    if(number > 1) {
      //display value in dollars
      return '$' + number.toFixed(2);
    } else {
      //display value in cents
      return '.' + (number * 100).toFixed(4).split('.')[1] + '¢';
    }
  };
});
