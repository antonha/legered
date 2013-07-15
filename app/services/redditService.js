app.service('redditService', function($q, $http, $rootScope){
	var thisService = this;
	this.redditListToInternal = function(redditData){
		return redditData.data.data.children.map(function (item){
			return {
				title: item.data.title,
				link: item.data.url,
				score: item.data.score,
				thumbnail: item.data.thumbnail
			};
		});
	};
	homeHotUrl= "http://www.reddit.com/hot.json?jsonp=JSON_CALLBACK";
	this.getHomeHot= function(){
		var deferred = $q.defer();
		return $http.jsonp(homeHotUrl).then(this.redditListToInternal);
	};
}
);