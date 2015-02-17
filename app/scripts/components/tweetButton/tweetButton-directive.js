'use strict';

angular.module('bitPrice.tweetButton.tweetButtonDirective', [
  'bitPrice.tweetButton.tweetCountService'
  ])

.directive('tweetButton', ['$interval', '$window', 'tweetCountService', function ($interval, $window, tweetCountService) {
  return {
    restrict: 'E',
    templateUrl: 'scripts/components/tweetButton/tweetButton.html',
    scope: {
      url: '@',
      via: '@',
      shareText: '@text',
      related: '@'
    },
    link: function (scope, element, attrs) {
      scope.shareCount = '—';
      updateCount();

      var shareCountGetter = $interval(function() {
        updateCount();
      }, 30000);

      element.on('$destroy', function() {
        $interval.cancel(shareCountGetter);
      });

      function updateCount() {
        //var countJsonURL = 'https://cdn.api.twitter.com/1/urls/count.json';
        tweetCountService.getCount(scope.url).then(function(response) {
          scope.shareCount = response.data.count;
          console.log('updated share count.');
        });
      }

      var getShareURL = function(){
        var shareURL = 'https://twitter.com/share';
        var params = {
          'url': scope.url,
          'via': scope.via,
          'text': scope.shareText,
          'related': scope.related,
        };
        var encodedParams = [];
        for (var param in params) {
          encodedParams.push(param + '=' + encodeURIComponent(params[param]));
        }
        return shareURL + '?' + encodedParams.join('&');
      };

      var shareWindow = {};
      scope.share = function(){
        var windowFeatures = 'height=450, ' +
                             'width=550, ' +
                             'top=' + ($window.innerHeight / 2 - 225) + ', ' +
                             'left=' + ($window.innerWidth / 2) + ', ' +
                             'toolbar=0, ' +
                             'location=0, ' +
                             'menubar=0, ' +
                             'directories=0, ' +
                             'scrollbars=0';
        shareWindow = $window.open(getShareURL(), 'share', windowFeatures);
        shareWindow.focus();
      };

    }
  };

}]);
