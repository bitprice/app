'use strict';

angular.module('bitPrice.tweetButton.tweetCountService', [])

.factory('tweetCountService', ['$http', '$interval', function ($http, $interval) {

  var tweetCountAPI = 'https://cdn.api.twitter.com/1/urls/count.json?url=';
  var interval = 30 * 1000;
  var currentCounts = {'bitprice.io': 0};

  $interval(updateCounts, interval);

  function updateCounts() {
    for(var url in currentCounts){
      if(currentCounts.hasOwnProperty(url)){
        var query = tweetCountAPI + encodeURIComponent(url);
        $http.jsonp(query, {params: {'callback': 'JSON_CALLBACK'}})
          .success(updateCount)
          .error(updateError);
      }
    }
    function updateCount(data, status, headers, config) {
      currentCounts[data.url] = data.count;
    }
    function updateError(data, status, headers, config) {
      console.error(status + ' – Error fetching tweet count. ', config);
    }
  }

  function addURL(url) {
    if(!currentCounts.hasOwnProperty(url)){
      currentCounts[url] = 0;
    }
    updateCounts();
  }

  function removeURL(url) {
    delete currentCounts[url];
  }

  function getCount(url) {
    return currentCounts[url];
  }

  return {
    addURL: addURL,
    removeURL: removeURL,
    getCount: getCount
  };

}]);
