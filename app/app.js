app = angular.module('legered', ['ui']);
app.config(function ($routeProvider){
	$routeProvider.when('/', {
		controller: 'ListTopController',
		templateUrl: '/app/partials/listing.html'
	})
	.otherwise({redirectTo: '/'});
});