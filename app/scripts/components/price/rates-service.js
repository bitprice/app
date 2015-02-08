'use strict';

angular.module('bitPrice.price.ratesService', [])

.service('ratesService', ['$http', function ($http) {
  var bitpayRatesAPI = 'https://bitpay.com/rates';
  var ratesAPI = bitpayRatesAPI;

  this.getRates = function() {
    return $http.get(ratesAPI)
      .error(function(data, status) {
        console.error('Error fetching rates from: ' + ratesAPI + '. Status ' + status);
      });
  };
}]);
