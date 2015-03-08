'use strict';

angular.module('bitPrice.price.ratesService', [])
.factory('ratesService', ['$http', '$interval', function($http, $interval) {

  var ratesAPI = 'https://bitpay.com/rates';
  var interval = 5 * 1000;
  var currentRatePerBTC = {
    'BTC': 1,
    'XBT': 1000000
  };

  $interval(updateRates, interval);
  updateRates();

  function updateRates(){
    $http.get(ratesAPI)
      .success(function(data, status, headers, config) {
        var ratesObjects = data.data;
        for(var i = 0; i < ratesObjects.length; i++){
          currentRatePerBTC[ratesObjects[i].code] = ratesObjects[i].rate;
        }
      }).
      error(function(data, status, headers, config) {
        console.error('Error fetching rates from: ' + ratesAPI + '. Status: ' + status);
      });
  }

  function getRate(baseCurrencyCode, quoteCurrencyCode) {
    if(currentRatePerBTC.hasOwnProperty(baseCurrencyCode) && currentRatePerBTC.hasOwnProperty(quoteCurrencyCode)){
      return currentRatePerBTC[quoteCurrencyCode] / currentRatePerBTC[baseCurrencyCode];
    }
  }

  return {
    getRate: getRate
  };

}]);
