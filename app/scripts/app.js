app = angular.module('legered', ['angular-underscore']);
app.config(function ($routeProvider){
	$routeProvider.when('/', {
		controller: 'ListTopController',
		templateUrl: 'views/listing.html'
	})
	.otherwise({redirectTo: '/'});
})
app.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);
