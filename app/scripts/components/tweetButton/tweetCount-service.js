'use strict';

angular.module('bitPrice.tweetButton.tweetCountService', [])

.service('tweetCountService', ['$http', function ($http) {
  var tweetCountAPI = 'https://cdn.api.twitter.com/1/urls/count.json?url=';

  this.getCount = function(url) {
    var query = tweetCountAPI + encodeURIComponent(url);
    return $http.jsonp(query, {params: {'callback': 'JSON_CALLBACK'}})
      .error(function(data, status) {
        console.error('Error fetching tweet count from: ' + query + '. Status ' + status);
      });
  };
}]);
