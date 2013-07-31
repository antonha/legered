app.controller('ListTopController', function($scope, redditService, $document){
    init();
    function init(){
        $scope.selectedIndex = 0;
        $scope.listing = redditService.getHomeHot(50);
        $scope.keyPressed = function(e){
            var changeSelected = function(diff){
                $scope.selectedIndex += diff;
                if($scope.selectedIndex < 0){
                    $scope.selectedIndex = 0;
                }
            }
            if(e.ctrlKey === true &&
               e.originalEvent.keyIdentifier === "U+004A"){
                changeSelected(1);
            }
            else if(e.ctrlKey === true && e.originalEvent.keyIdentifier === "U+004B"){
                changeSelected(-1);
            }
        };
    }
});
