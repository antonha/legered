app.directive('keypress', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    link:    function postLink(scope, iElement, iAttrs){
      jQuery(document).on('keypress', function(e){
          e.preventDefault();
          scope.$apply(scope.keyPressed(e));
       });
    }
  };
});