/**
 * Created by lx on 2016/10/26.
 */

angular.module('myHttp',[])
    .factory('getNetData',['$http',function($http){
    return{
        netData:function(a){
            var url = 'http://localhost:8000/?myUrl='+a+'&callback=JSON_CALLBACK';
            return $http({
                method:'jsonp',
                url:url
            });
        }
    };
}])


    .factory('getLocalData',['$http',function($http){
    return{
        localData:function(){
            return $http({
                method:'get',
                url:'../server/pagedata.json'
            });
        }
    }
}])
    .factory('getLocalJson',['$http',function($http){
    return{
        localJson:function(url){
            return $http({
                method:'get',
                url:url
            });
        }
    }
}]);
