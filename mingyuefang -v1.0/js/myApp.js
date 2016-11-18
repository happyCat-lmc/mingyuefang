/**
 * Created by lx on 2016/10/12.
 */

/* 路由控制*/
angular.module('myApp',['ui.router','myAbout','myChoose','myContact','myHome','myJoin','myNews','myShare','mysaharedetail','myTab','myHttp','mynewsdetail'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

        $stateProvider.state('tab',{
            url:'/tab',
            abstract:true,
            templateUrl:'tab.html',
            controller:'tabController'
        });
        /*首页*/
        $stateProvider.state('tab.home',{
            url:'/home',
            templateUrl:'home.html',
            controller:'homeController',
            //注册私有服务
            resolve:{
                fromLocalData:function(getLocalData){
                    return  getLocalData.localData();
                }
            }
        });


        /* 关于我们 */
        $stateProvider.state('tab.about',{
            url:'/about',
            templateUrl:'about.html',
            controller:'aboutController'
        });
        /* 选择我们*/
        $stateProvider.state('tab.chooseUs',{
            url:'/chooseUs',
            templateUrl:'chooseUs.html',
            controller:'chooseUsController'
        });
        /*新闻中心*/
        $stateProvider.state('tab.news',{
            url:'/news',
            templateUrl:'news.html',
            controller:'newsController'
        });
        /*新闻详情*/
        $stateProvider.state('tab.newsdetail',{
            url:'/newsdetail',
            templateUrl:'newsdetail.html',
            controller:'newsdetailController',
            /*params 传递参数*/
             params:{
                id:""
             }
        });


        /*招商加盟*/
        $stateProvider.state('tab.join',{
            url:'/join',
            templateUrl:'join.html',
            controller:'joinController'
        });
        /*技术干货*/
        $stateProvider.state('tab.share',{
            url:'/share',
            templateUrl:'share.html',
            controller:'shareController'
        });
        /*技术干货 detailinfo */
        $stateProvider.state('tab.sharedetail',{
            url:'/sharedetail/:id/:title/:subtitle/:contence/:rcount/:tcount/:ccount',
            //url:'/sharedetail?id=hello&title=hello1',
            templateUrl:'sharedetail.html',
            controller:'sharedetailController'
        });
        /*联系我们页面*/
        $stateProvider.state('tab.contact',{
            url:'/contact',
            templateUrl:'contact.html',
            controller:'contactController'
        });
        /*意外路径处理*/
        $urlRouterProvider.otherwise('/tab/home');
    }]);


