angular.module('oua-app', [])
  .controller('OuaController', ['$scope', '$http', '$templateCache', function($scope, $http, $templateCache) {
    $scope.schools = [];
    
    $scope.years = [];
    for(var i = 2014; i >= 2009; i--) {
      var year = i + '-' + (i % 1000 + 1);
      $scope.years.push({
        name : year,
        value : year
      });
    }

    $scope.sports = [
      {
        name: "Football",
        value : 'fball'
      },
      {
        name : "Volleyball (Men)",
        value : 'mvball'
      }
    ];

    $scope.method = 'GET';
    $scope.url = 'https://www.kimonolabs.com/api/2e1lwunc?apikey=61uD5zStOR77nEO0EQVFrqcEOsDxAj5g';

    $scope.fetch = function() {
      $scope.code = null;
      $scope.response = null;
      $('#spinner').show();

      $http({method: $scope.method, url: encode_query($scope.url, {'kimpath2' : $scope.sport, 'kimpath3' : $scope.year}), cache: $templateCache}).
        success(function(data, status) {
          $scope.status = status;
          $scope.data = data.results.collection1;
          $('#spinner').hide();
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
          $('#spinner').hide();
      });
    };
  }]);


/**
 * Takes an object and encodes it for use as url params
 */
function encode_query(base, data) {
  var ret = [base];
  for (var d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
}