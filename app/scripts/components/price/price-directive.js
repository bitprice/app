'use strict';

angular.module('bitPrice.price.priceDirective', ['bitPrice.price.ratesService'])

.directive('price', ['$interval', 'ratesService', function ($interval, ratesService) {

  function link(scope, element, attrs) {
    var XBTperBTC = 1000000;
    var currencyCode,
        rateGetter,
        rate;

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
      ratesService.getRates().then(function(response) {
        var ratesObjects = response.data.data;
        var searchCode = currencyCode === 'XBT' ? 'USD' : currencyCode;
        var bitcoinRate = false;
        for(var i=0; i<ratesObjects.length; i++){
          if(ratesObjects[i].code === searchCode) {
            bitcoinRate = ratesObjects[i].rate;
            break;
          }
        }
        if(!bitcoinRate) {
          return console.error('Could not find a rate for currency code: ' + searchCode);
        }
        //bitcoinRate is the number of searchCode units equivalent to 1 BTC
        if(currencyCode === 'XBT') {
          rate = bitcoinRate / XBTperBTC;
        } else {
          rate = 1 / bitcoinRate * XBTperBTC;
        }
        element.text(rate);
      });
    }
  }

  return {
    link: link
  };

}]);
