app.controller('ListTopController', function($scope, redditService){
	init();
	function init(){
		$scope.selectedIndex = 0;
		$scope.listing = redditService.getHomeHot();
		$scope.keyPressed = function(e){
			console.log(event);
		};
	}
});