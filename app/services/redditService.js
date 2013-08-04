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
        else if(data.url.match(/youtube\.com/g)){
            return 'youtube'
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
                    if(item.data.url.match(/\.com\/a\//g)){
                        ret_item.imgs = $http({
                            method: 'GET',
                            url: 'https://api.imgur.com/3/album/' + hash + '/images',
                            headers: {'Authorization': 'Client-ID e5fafd2216d5f8c'}})
                            .then(function (imgur_data){
                                return imgur_data.data.data.map(
                                    function(imgur_img){
                                        return {url: imgur_img.link}
                                    })
                            })
                    }
                    else{
                        ret_item.imgs = $http({
                            method: 'GET',
                            url: 'https://api.imgur.com/3/image/' +
                                hash + '.json',
                            headers: {'Authorization': 'Client-ID e5fafd2216d5f8c'}})
                            .then(function(imgur_data){
                                return [{url: imgur_data.data.data.link}];
                            }, function(){
                            });
                    }}
            }
            else if(ret_item.type == 'youtube'){
                console.log(item.data.url)
                var hash = /v=([a-zA-Z0-9\-]*)/g.exec(item.data.url)[1]
                console.log(hash)
                ret_item.youtube = {url: 'http://youtube.com/embed/' + hash};

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
