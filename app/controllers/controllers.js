app.controller('ListTopController', function($scope, redditService){
	init();
	function init(){
		$scope.selectedIndex = 0;
		$scope.listing = redditService.getHomeHot();
		$scope.keyPressed = function(e){
			if(e.ctrlKey === true && e.originalEvent.keyIdentifier === "U+004A"){
				$scope.selectedIndex += 1;
			}
			else if(e.ctrlKey === true && e.originalEvent.keyIdentifier === "U+004B"){
				$scope.selectedIndex -= 1;
			}
		};
	}
});