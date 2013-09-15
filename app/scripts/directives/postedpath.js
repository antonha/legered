app.directive('postedpath', function() {
  return {
    restrict: 'E',
    scope: {
      path: "="
    },
    link: function postLink(scope, iElement, iAttrs){
      iElement.append("<span>" + scope.path.join("</span><span>/</span><span>") + "</span>");
    }
  };
});