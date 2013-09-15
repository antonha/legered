app.service('redditService', function($q, $http, $rootScope, imgContentService, imgurContentService, youtubeContentService){
    thisService = this;

    this.contentProviders = [
        imgContentService, imgurContentService, youtubeContentService
    ]

    this.redditListToInternal = function(redditData){
        var ret = redditData.data.data.children.map(function (item){
            var ret_item = {
                title: item.data.title,
                link: item.data.url,
                postedIn: ['r', item.data.subreddit],
                score: item.data.score,
                thumbnail: item.data.thumbnail,
                content: _.reduceRight(thisService.contentProviders, function(data, provider){
                    return _.extend(data, provider.getContent({url: item.data.url}))
                }, {})
            };
            return ret_item;
        });
        return ret;
    };
    this.homeHotUrl= "http://www.reddit.com/hot.json?jsonp=JSON_CALLBACK";
    this.getHomeHot= function(limit, token){
        params = !token?{limit: limit}:{limit: limit, after: token}
        return $http.jsonp(
            this.homeHotUrl,
            {params: params}).
            then(this.redditListToInternal);
    };
});
