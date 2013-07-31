app = angular.module('legered', []);
app.config(function ($routeProvider){
	$routeProvider.when('/', {
		controller: 'ListTopController',
		templateUrl: '/app/partials/listing.html'
	})
	.otherwise({redirectTo: '/'});
});
app.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);
