app.service('redditService', function($q, $http, $rootScope){
    thisService = this;
    this.isImageUrl = function(url){
        return url.match(/.*\.(png|jpg|jpeg|bmp|gif)/g)
    };
    this.isImgurUrl = function(url){
        return url.match(/.*imgur\.com.*/g)
    }
    this.getType = function(data){
        if(thisService.isImageUrl(data.url)){
            return 'imgs';
        }
        else if(thisService.isImgurUrl(data.url)){
            return 'imgs';
        }
    }
    this.redditListToInternal = function(redditData){
        var ret = redditData.data.data.children.map(function (item){
            var ret_item = {
                type: thisService.getType(item.data),
                title: item.data.title,
                link: item.data.url,
                score: item.data.score,
                thumbnail: item.data.thumbnail
            };
            if(ret_item.type == 'imgs'){
                if(thisService.isImageUrl(item.data.url)){
                    ret_item.imgs = [{url: item.data.url}]
                }
                else if (thisService.isImgurUrl(item.data.url)){
                    var hash = item.data.url.match(/[a-zA-Z0-9]*$/g)[0]
                    ret_item.imgs = $http({
                        method: 'GET', url: 'https://api.imgur.com/3/image/' +
                            hash + '.json',
                        headers: {'Authorization': 'Client-ID e5fafd2216d5f8c'}})
                        .then(function(imgur_data){
                            return [{url: imgur_data.data.data.link}];
                        }, function(){
                            console.log('FIALAILAILAI')
                        });
                }
            }
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
