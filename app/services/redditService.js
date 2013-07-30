app.service('redditService', function($q, $http, $rootScope){
    thisService = this;
    this.isImageUrl = function(url){
        console.log( url.match(/.*\.(png|jpg|jpeg|bmp)/g))
        return url.match(/.*\.(png|jpg|jpeg|bmp)/g) != null
    };
    this.redditListToInternal = function(redditData){
        console.log(redditData)
        var ret = redditData.data.data.children.map(function (item){
            return {
                title: item.data.title,
                link: item.data.url,
                score: item.data.score,
                thumbnail: item.data.thumbnail,
                img: thisService.isImageUrl(item.data.url)? item.data.url:null
            };
        });
        console.log(ret);
        return ret;
    };
    this.homeHotUrl= "http://www.reddit.com/hot.json?jsonp=JSON_CALLBACK";
    this.getHomeHot= function(){
        var deferred = $q.defer();
        return $http.jsonp(this.homeHotUrl).then(this.redditListToInternal);
    };
});
