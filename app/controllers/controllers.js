app.controller('ListTopController', function($scope, redditService){
	init();
	function init(){
		$scope.listing = redditService.getHomeHot();
	}
});