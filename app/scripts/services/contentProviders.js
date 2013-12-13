app.service('imgContentService', function(){
	this.getContent = function(contentParams){
    		if(contentParams.url.match(/.*\.(png|jpg|jpeg|bmp|gif)/g)){
				return {imgs: [{url: contentParams.url}]}
			}
			else{
				return {}
			}
    	}
});
app.service('imgurContentService', function($http){
	this.getContent = function(contentParams){
			if(contentParams.url.match(/\.(png|jpg|jpeg|bmp|gif)/g)){
				return {}
			}
	  		if(contentParams.url.match(/imgur\.com/g)){
                var hash = contentParams.url.match(/[a-zA-Z0-9]*$/g)[0]
                if(contentParams.url.match(/\.com\/a\//g)){
                	console.log("IGUR ALBUM")
                    return {imgs: $http({
                        method: 'GET',
                        url: 'https://api.imgur.com/3/album/' + hash + '/images',
                        headers: {'Authorization': 'Client-ID e5fafd2216d5f8c'}})
                        .then(function (imgur_data){
                            return imgur_data.data.data.map(
                                function(imgur_img){
                                    return {url: imgur_img.link}
                                })
                        })
                }}
                else{
                    return {imgs: $http({
                        method: 'GET',
                        url: 'https://api.imgur.com/3/image/' +
                            hash + '.json',
                        headers: {'Authorization': 'Client-ID e5fafd2216d5f8c'}})
                    		.then(function(imgur_data){
                            return [{url: imgur_data.data.data.link}];
                        }, function(){
                        })};
                }
			}
			else{
				return {}
			}}
});
app.service('youtubeContentService', function(){
    this.getContent= function(contentParams){
    	if(contentParams.url.match(/youtube\.com/g)){
            var hash = /v=([a-zA-Z0-9\-]*)/g.exec(contentParams.url)
		if(hash){
            		return {youtube: {url: 'http://youtube.com/embed/' + hash}}
		}
		else{
			return {}
		}
    	}
    	else{
    		return {}
    	}
    }
});
app.service('redditSelfContentService', function(){
	this.getContent = function(contentParams){
		if(contentParams.url.match(/reddit\.com\/r\//g)){
			
		}
	}
})

