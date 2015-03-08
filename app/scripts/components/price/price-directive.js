'use strict';

angular.module('bitPrice.price.priceDirective', [
  'bitPrice.price.ratesService',
  'bitPrice.price.subcentsFilter'
])

.directive('price', ['ratesService', 'subcentsFilter', 'currencyFilter', function (ratesService, subcentsFilter, currencyFilter) {

  return {
    restrict: 'E',
    scope: {
      currency: '@',
      valuedIn: '@'
    },
    template: '{{price()}}',
    link: function (scope, element, attrs) {

      scope.price = function(){
        var rate = ratesService.getRate(scope.currency, scope.valuedIn);
        if(scope.valuedIn === 'XBT') {
          return currencyFilter(rate, '', 0) + ' bits';
        }
        if(scope.valuedIn === 'BTC') {
          return currencyFilter(rate, '฿', 6) + ' BTC';
        }
        if(scope.valuedIn === 'USD') {
          return subcentsFilter(rate);
        }
        return currencyFilter(rate, scope.valuedIn, 2);
      };

    }
  };

}]);
