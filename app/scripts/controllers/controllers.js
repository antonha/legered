app.controller('ListTopController', function($scope, redditService){
    init();
    function init(){
        $scope.selectedIndex = 0;
        $scope.listing = redditService.getHomeHot(50);
        $scope.setSelectedIndex = function(val){
            $scope.selectedIndex=  val >= 0? val: 0;
        }
        $scope.keyPressed = function(e){
            var increaseSelected = function(diff){
                $scope.setSelectedIndex($scope.selectedIndex + diff);
            }
            if(e.ctrlKey === true &&
               e.originalEvent.keyIdentifier === "U+004A"){
                increaseSelected(1);
            }
            else if(e.ctrlKey === true && e.originalEvent.keyIdentifier === "U+004B"){
                increaseSelected(-1);
            }
        };
    }
});
