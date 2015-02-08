'use strict';

angular.module('bitPrice.price.priceDirective', [])

.directive('price', ['$interval', function($interval) {

  function link(scope, element, attrs) {
    var currencyCode,
        rateGetter,
        outputString;

    scope.$watch(attrs.currencyCode, function() {
      currencyCode = this.exp;
      updatePrice();
    });

    rateGetter = $interval(function() {
      updatePrice();
    }, 5000);

    element.on('$destroy', function() {
      $interval.cancel(rateGetter);
    });

    function updatePrice() {
      console.log('currency code is: ' + currencyCode);
      var sampleString = '0.0258';
      outputString = sampleString;
      element.text(outputString);
      console.log('price string updated');
    }
  }

  return {
    link: link
  };

}]);
