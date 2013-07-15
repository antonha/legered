app.controller('ListTopController', function($scope, redditService){
	init();
	function init(){
		$scope.selectedIndex = 0;
		$scope.listing = redditService.getHomeHot();
	}
	$scope.keyPress = function($event){
		console.log($event);
	};
});