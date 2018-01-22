var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, TwitterService){
	$scope.getUserTimeline = function(username){
		console.log("username entered ", username);
		TwitterService.getUserTimeline(username)
		    .then(function(data){
		        $scope.twitterErrors = undefined;
	        	$scope.results = JSON.parse(data.result.userData);
		    })
		    .catch(function(error){
		        console.error('there was an error retrieving data: ', error);
		        $scope.twitterErrors = error.error;
		    })
	}
  
});

app.factory('TwitterService', function($http, $q){

  var getUserTimeline = function(username){
    var d = $q.defer();
    $http.post('/twitter/user', {username : username})
      .success(function(data){
        return d.resolve(data);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getUserTimeline : getUserTimeline
  }
});
