/**
 * Created by samsuj on 29/10/15.
 */


'use strict';

/* App Module */

var jungledrone = angular.module('jungledrone', ['ui.router','ngCookies','ui.bootstrap','angularValidator','ngFileUpload','ui.tinymce']);



jungledrone.service('contentservice', function($http, $log, $q) {
// this.data='';
    var d;

    this.getcontent= function(url) {
        //var deferred = $q.defer();
        $http.get(url)
            .success(function(data) {
                /* deferred.resolve({
                 content: data,
                 val:0
                 });*/
                //this.data=data;
                d= data;
                //return data;
            }).error(function(msg, code) {
                //deferred.reject(msg);
                $log.error(msg, code);
            });
        return d;
    }



    /*return {
     getcontent: function(url){

     $http.get(url)
     .success(function(data) {
     /!*deferred.resolve({
     content: data
     });*!/
     //this.data=data;
     d=data;
     //return data;
     }).error(function(msg, code) {
     /!*deferred.reject(msg);
     $log.error(msg, code);*!/
     });
     console.log('d-'+url);
     return url;
     },
     sayGoodbye: function(text){
     return "Factory says \"Goodbye " + text + "\"";
     }
     }*/
});



jungledrone.run(['$rootScope', '$state','contentservice',function($rootScope, $state,contentservice,$timeout){



    $rootScope.$on('$stateChangeStart',function(){
        $rootScope.contentdata=(contentservice.getcontent('http://admin.jungledrones.com/contentlist'));
        $rootScope.stateIsLoading = true;
    });


    $rootScope.$on('$stateChangeSuccess',function($timeout){
        setTimeout(function(){

            $rootScope.contentdata=(contentservice.getcontent('http://admin.jungledrones.com/contentlist'));
            $rootScope.stateIsLoading = false;

        },20);


        $(document).scrollTop(0);
    });

}]);

jungledrone.filter("sanitize123", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);


jungledrone.directive('content',['$compile','$sce', function($compile,$sce) {
    var directive = {};
    directive.restrict = 'E';
    //directive.transclude= true;
    //console.log('t--='+student.ctype);
    directive.template = '<div class=cc ng-bind-html="student.content | sanitize123"  ></div><button class = editableicon editid="student.name" ng-click=editcontent("student.name")>Edit</button>';

    directive.scope = {
        student : "=name"
    }


    directive.compile = function(element, attributes) {
        //element.css("background-color", "#ff0000");



        var linkFunction = function($scope, element, attributes) {
           // console.log('content'+student.content);
            //console.log('ctype'+student.ctype);
            $compile($(element).find('.cc'))($scope);
            $compile($(element).find('.editableicon'))($scope);
            //$(element).find('.cc').css('display','inline-block');
            //$(element).find('.editableicon').text(99);

            $(element).find('.editableicon').on( "click", function() {
                console.log( $( this ).text() );
            });

            //element.html("name: <b>"+$scope.student.name +"</b> , desc00: <b>"+(student.description)+"</b>,type :<b>"+$scope.student.ctype+"</b> ,content :<b>"+$scope.student.content+"</b><br/>");
            //element.css("background-color", "#ffffff");
        }
        return linkFunction;
    }

    return directive;
}]);







jungledrone.config(function($stateProvider, $urlRouterProvider,$locationProvider) {

// For any unmatched url, redirect to /state1
    $urlRouterProvider
        .otherwise("/index/");

//
    // Now set up the states
    $stateProvider
        .state('index',{
            url:"/index/:target",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/home.html' ,
                    controller: 'index'
                },

            }
        })



        .state('services',{
            url:"/services",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/services.html' ,
                    controller: 'services'
                },

            }
        })
        .state('droneracing',{
            url:"/droneracing",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/droneracing.html' ,
                    //controller: 'home'
                },

            }
        })

        .state('stock-category',{
            url:"/stock-category",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/stockcategory.html' ,
                   // controller: 'stockcategory'
                },

            }
        })


        .state('virtualreality',{
            url:"/virtualreality",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/virtualreality.html' ,
                    controller: 'virtualreality'
                },

            }
        })


        .state('event',{
            url:"/event",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/events.html' ,
                    controller: 'event'
                },

            }
        })

 .state('packagedelivery',{
            url:"/package-delivery",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/package-delivery.html' ,
                    controller: 'packagedelivery'
                },

            }
        })


        .state('dashboard',{
            url:"/dashboard",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/dashboard.html' ,
                     controller: 'dashboard'
                },

            }
        }
    )

        .state('addcontent',{
            url:"/add-content",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/add_content.html' ,
                     controller: 'addcontent'
                },

            }
        }
    )
        .state('add-admin',{
            url:"/add-admin",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/add_admin.html' ,
                    controller: 'addadmin'
                },

            }
        }
    )
        .state('edit-admin',{
            url:"/edit-admin/:userId",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/edit_admin.html' ,
                    controller: 'editadmin'
                },

            }
        }
    )
        .state('edit-content',{
            url:"/edit-content/:userId",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/edit_content.html' ,
                    controller: 'editcontent'
                },

            }
        }
    )



        .state('admin-list',{
            url:"/admin-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/admin_list.html' ,
                    controller: 'adminlist'
                },

            }
        }
    )

        .state('eventrsvplist',{
            url:"/eventrsvplist",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/eventrsvplist.html' ,
                    controller: 'eventrsvplist'
                },

            }
        }
    )
        .state('signupuser-list',{
            url:"/signupuser-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/signupuser_list.html' ,
                    controller: 'signupuserlist'
                },

            }
        }
    )
        .state('contact-list',{
            url:"/contact-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/contact_list.html' ,
                    controller: 'contactlist'
                },

            }
        }
    )
        .state('employement-list',{
            url:"/employement-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/employement_list.html' ,
                    controller: 'employementlist'
                },

            }
        }
    )


        .state('pilot-list',{
            url:"/pilot-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/pilot_list.html' ,
                    controller: 'pilotlist'
                },

            }
        }
    )
        .state('category-list',{
            url:"/category-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },

                'content':{
                    templateUrl:'partials/junglecategorylist.html',
                    controller:'junglecategorylist'
                },

            }
        }
    )

        .state('add-category',{
            url:"/add-category",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },

                'content':{
                    templateUrl:'partials/add_category_jungle.html',
                    controller:'addcategoryjungle'
                },

            }
        }
    )


        .state('edit-category',{
            url:"/edit-category/:id",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },

                'content':{
                    templateUrl:'partials/edit_category_jungle.html',
                    controller:'editcategoryjungle'
                },

            }
        }
    )


        .state('product-list',{
            url:"/product-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },

                'content':{
                    templateUrl:'partials/jungleproductlist.html',
                    controller:'jungleproductlist'
                },

            }
        }
    )

        .state('add-product',{
            url:"/add-product",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },

                'content':{
                    templateUrl:'partials/add_product_jungle.html',
                    controller:'addproductjungle'
                },

            }
        }
    )


        .state('edit-product',{
            url:"/edit-product/:id",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },

                'content':{
                    templateUrl:'partials/edit_product_jungle.html',
                    controller:'editproductjungle'
                },

            }
        }
    )




        .state('add-event', {
            url: "/add-event",
            views: {
                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/add_event.html' ,
                    controller: 'addevent'
                },

            }
        }

    )

        .state('add-flight', {
            url: "/add-flight",
            views: {
                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/add_flight.html' ,
                    controller: 'addflight'
                },

            }
        }

    )
        .state('edit-event', {
            url: "/edit-event/:eventId",
            views: {
                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/edit_event.html' ,
                    controller: 'editevent'
                },

            }
        }

    )

        .state('event-list',{
            url:"/event-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/event_list.html' ,
                    controller: 'eventlist'
                },

            }
        }
    )
  .state('flight-list',{
            url:"/flight-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    //  controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/flight_list.html' ,
                    controller: 'flightlist'
                },

            }
        }
    )

.state('pilot-registration',{
            url:"/pilot-registration",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/pilot-registration.html' ,
                    controller: 'pilotregistration'
                },

            }
        }
    )


        .state('login',
        {
            url:"/login",
            views: {

                /*              'header': {
                 templateUrl: 'partials/admin_header.html' ,
                 controller: 'header'
                 },
                 'footer': {
                 templateUrl: 'partials/admin_footer.html' ,
                 //controller: 'footer'
                 },
                 */                'content': {
                    templateUrl: 'partials/login.html' ,
                    controller: 'login'
                },

            }
            /*           onEnter: ['$stateParams', '$state', '$uibModal',
             function($stateParams, $state, $uibModal) {
             var size;
             $uibModal.open({
             animation: true,
             templateUrl: 'myModalContent.html',
             controller: 'ModalInstanceCtrl',
             size: size,

             });
             }]
             */        }
    )



        .state('stock-photo',{
            url:"/stock-photo",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/imagegallery.html' ,
                    controller: 'stockphoto'
                },

            }
        }
    )

        .state('stock-video',{
            url:"/stock-video",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/videogallery.html' ,
                    //controller: 'home'
                },

            }
        }
    )

        .state('tourism',{
            url:"/tourism",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/tourism.html' ,
                    //controller: 'home'
                },

            }
        }
    )


        .state('product',{
            url:"/product",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/product.html' ,
                    //controller: 'home'
                },

            }
        }
    )

        .state('contactus',{
            url:"/contactus",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/contactus.html' ,
                    controller: 'contactus'
                },

            }
        }
    )

        .state('employment',{
            url:"/employment",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/employment.html' ,
                    controller: 'employment'
                },

            }
        }
    )




    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        hashPrefix:'!'
    });

});

/*
jungledrone.directive('slideToggle', function() {
    return {
        restrict: 'A',
        scope:{
            isOpen: "=slideToggle"
        },
        link: function(scope, element, attr) {
            var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;
            scope.$watch('isOpen', function(newVal,oldVal){
                if(newVal !== oldVal){
                    element.stop().slideToggle(slideDuration);
                }
            });
        }
    };
});

jungledrone.directive('myCustomer', function() {
    return {
        template: 'Name: {{customer.name}} Address: {{customer.address}}'
    };
});*/


jungledrone.controller('ModalInstanceCtrl', function($scope,$state,$cookieStore,$http,$uibModalInstance,$rootScope,Upload) {
    $scope.cancel = function () {

        $uibModalInstance.dismiss('cancel');
    };



    $scope.jungleconfirmcategorydelete=function(){
        $uibModalInstance.dismiss('cancel');
        $rootScope.stateIsLoading = true;
        var idx = $scope.currentindex;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'deletejunglecategory',
            data    : $.param({id: $scope.categorylist[idx].id}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.categorylist.splice(idx,1);
        });
    }

    $scope.jungleconfirmcategorystatus=function(){
        $uibModalInstance.dismiss('cancel');
        $rootScope.stateIsLoading = true;
        var idx = $scope.currentindex;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'jungleupdatestatus',
            data    : $.param({id: $scope.categorylist[idx].id,status:$scope.categorylist[idx].status}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;

            $scope.categorylist[idx].status = !$scope.categorylist[idx].status;
        });
    }

    $scope.jungleconfirmproductdelete=function(){
        $uibModalInstance.dismiss('cancel');
        $rootScope.stateIsLoading = true;
        var idx = $scope.currentindex;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'deletejungleproduct',
            data    : $.param({id: $scope.productlist[idx].id}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.productlist.splice(idx,1);
        });
    }

    $scope.jungleconfirmproductstatus=function(){
        $uibModalInstance.dismiss('cancel');
        $rootScope.stateIsLoading = true;
        var idx = $scope.currentindex;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'jungleproductupdatestatus',
            data    : $.param({id: $scope.productlist[idx].id,status:$scope.productlist[idx].status}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;

            $scope.productlist[idx].status = !$scope.productlist[idx].status;
        });
    }





});


jungledrone.controller('index', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams) {
    //$state.go('home');
    //return
    // $rootScope.stateIsLoading = true;

    /*if( typeof ($rootScope.userid)!='undefined')
        $rootScope.userid=0;*/

    $scope.form={};

    $scope.form.fname='';
    $scope.form.lname='';
    $scope.form.email='';
    //$scope.form.email.$setPristine();
    $scope.form.phone='';
    //$scope.form.country=20;
    $scope.form.city='';



    //$scope.signupForm.country=20;
    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'countryList',
        data    : $.param({'uid':$scope.userid}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {

        $scope.countrylist=data;

        //$scope.signupForm.reset();

        setTimeout(function(){

            $scope.form.country={};
            $scope.form.country.s_name='Belize';
            $('#country').val(20);

        },500);
        console.log(data);

    });


    $scope.tid=$stateParams.target;
    if(typeof($scope.tid)!='undefined')

        $scope.form={};
    $scope.drone_error= false;
    $scope.gender_error= false;
    $scope.dronerace_error= false;

    setTimeout(function(){

        //$('#country').val(20);
        console.log($stateParams.target);
        console.log('in set time out');
        if(($scope.tid)=='form'){
            console.log('in scroll to');
            $('html, body').animate({
                scrollTop: $('form[name="signupForm"]').offset().top
            }, 2000);
        }
    },2000);


    setTimeout(function(){
/*
        $('.carousel').eq(0).carousel({
            interval: 8000
        });*/
        $('.carousel').eq(1).carousel({
            interval: 11000
        });
        $('.carousel').eq(0).carousel({
            interval: 8000
        });

        console.log(33);

        //$('.carousel-control').last().click();

        /*if($('.carousel-indicators').find('li[class="active"]').next().length)
            $('.carousel-indicators').find('li[class="active"]').next().click();
        else
            $('.carousel-indicators').find('li').eq(0).click();*/

        //console.log($('.carousel-indicators').find('li[class="active"]').next().length);

        // $('carousel').eq(0).carousel('next');
        //$('carousel').eq(1).carousel('next');

    },800);

    $scope.carouselprev=function(){

        $('.carousel').eq(1).carousel('prev');
        console.log('this prev');

    }

    $scope.carouselnext=function(){

        $('.carousel').eq(1).carousel('next');
        console.log('this next');

    }



    $scope.signupFormsubmit =function(){

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addcontactuser',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $('#myModal').modal('show');
            //console.log($scope.signupForm)


            $scope.signupForm.reset();

            setTimeout(function(){

                $scope.form.country={};
                $scope.form.country.s_name='Belize';
                $('#country').val(20);
                $('#myModal').modal('hide');

            },500);










        });


    }

    $scope.droneValidator=function(){


        //console.log('in drone validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());

        if($scope.signupForm.$submitted){

            if(typeof ($("input[name='drone']:checked").val()) != 'undefined' )
            {
                $scope.drone_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.drone_error=true;
                return '';

            }

        }

    }

    $scope.genderValidator=function(){


        //console.log('in drone validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());

        if($scope.signupForm.$submitted){

            if(typeof ($("input[name='gender']:checked").val()) != 'undefined' )
            {
                $scope.gender_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.gender_error=true;
                return '';

            }

        }

    }
    $scope.dronraceeValidator=function(){


        //console.log('in drone validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());

        if($scope.signupForm.$submitted){

            if(typeof ($("input[name='dron_race']:checked").val()) != 'undefined' )
            {
                $scope.dronerace_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.dronerace_error=true;
                return '';

            }

        }

    }





});


jungledrone.controller('contactus', function($scope,$state,$http,$cookieStore,$rootScope) {
    //$state.go('home');
    //return

    $scope.form={};
    $scope.drone_error= false;
    $scope.gender_error= false;
    $scope.dronerace_error= false;


    $scope.contactFormsubmit =function(){
        console.log(1);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addcontact',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $('#contactmodal').modal('show');
            $scope.contactForm.reset();
            //console.log($scope.signupForm)
            setTimeout(function(){
                //window.location.reload();
                $('#contactmodal').modal('hide');

            },3000);

        });


    }


});


jungledrone.controller('virtualreality', function($scope,$state,$http,$cookieStore,$rootScope) {
    //$state.go('home');
    //return
    $scope.form={};
    $scope.form.country={};

    setTimeout(function(){
        $('#country').val(20);
    },2000);
    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'countryList',
        data    : $.param({'uid':$scope.userid}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        console.log(data);
        $scope.form.country={};
        $scope.form.country.s_name='Belize';
        $('#country').val(20);
        $scope.countrylist=data;
    });

    $scope.form={};
    $scope.drone_error= false;
    $scope.gender_error= false;
    $scope.dronerace_error= false;

    $scope.sub1 = function(){

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addcontactuser',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $('#myModal').modal('show');
            $scope.signupForm.reset();


            setTimeout(function(){

                $scope.form.country={};
                $scope.form.country.s_name='Belize';
                $('#country').val(20);

            },3000);
            //$scope.signupForm={fname:'',lname:''};


        });






    }

    $scope.droneValidator=function(){


        //console.log('in drone validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());

        if($scope.signupForm.$submitted){

            if(typeof ($("input[name='drone']:checked").val()) != 'undefined' )
            {
                $scope.drone_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.drone_error=true;
                return '';

            }

        }

    }

    $scope.genderValidator=function(){


        //console.log('in drone validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());

        if($scope.signupForm.$submitted){

            if(typeof ($("input[name='gender']:checked").val()) != 'undefined' )
            {
                $scope.gender_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.gender_error=true;
                return '';

            }

        }

    }
    $scope.dronraceeValidator=function(){


        //console.log('in drone validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());

        if($scope.signupForm.$submitted){

            if(typeof ($("input[name='dron_race']:checked").val()) != 'undefined' )
            {
                $scope.dronerace_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.dronerace_error=true;
                return '';

            }

        }

    }





});


jungledrone.controller('packagedelivery', function($compile,$scope,contentservice,$state,$http,$cookieStore,$rootScope,Upload,$sce) {

    $scope.interval=200;
    var myVar =setInterval(function(){

        $rootScope.contentdata=contentservice.getcontent( $scope.adminUrl+'contentlist');


        console.log('in setInterval'+$scope.interval);
        console.log( $rootScope.contentdata);
        var x;
        var y;
        if(typeof ($rootScope.contentdata)!='undefined'){

            $scope.interval=999990;

            clearInterval(myVar);
        }

        for (x in $rootScope.contentdata ){
            var contentw='';
            //console.log($rootScope.contentdata[x]);
            console.log(($rootScope.contentdata[x].content));
            console.log(($rootScope.contentdata[x]));

            for (y in $rootScope.contentdata[x].content){
                contentw+=($rootScope.contentdata[x].content[y]);
            }
            $rootScope.contentdata[x].content=(contentw);

            $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].id]=$rootScope.contentdata[x];
            /*if($rootScope.contentdata[x].parentid!=0)
                $scope[$rootScope.contentdata[$rootScope.contentdata[x].parentid].cname+$rootScope.contentdata[$rootScope.contentdata[x].parentid].id]=$rootScope.contentdata[x];*/
            //var model=$parse($rootScope.contentdata[x].id);
            //model.assign($scope, $rootScope.contentdata[x]);
            //.id=$rootScope.contentdata[x];
        }

        //console.log('----'+$scope);


    },$scope.interval);

});
jungledrone.controller('header', function($compile,$scope,contentservice,$state,$http,$cookieStore,$rootScope,Upload,$sce) {





    $rootScope.userrole=0;
    $rootScope.userfullname=0;
    $rootScope.userid=0;
    $rootScope.userrole=0;

    if(typeof ($cookieStore.get('userrole')!='undefined'))
        $rootScope.userrole=$cookieStore.get('userrole');
    $rootScope.userfullname=$cookieStore.get('userfullname');
    if(typeof ($cookieStore.get('userid'))!='undefined'){

        $rootScope.userid=$cookieStore.get('userid');

    }

    $rootScope.userrole=$cookieStore.get('userrole');

    console.log($rootScope.userid+'--userid');
    $rootScope.logout = function () {
        $cookieStore.remove('userid');
        $cookieStore.remove('username');
        $cookieStore.remove('useremail');
        $cookieStore.remove('userfullname');

        $rootScope.userrole=0;
        $rootScope.userfullname=0;
        $rootScope.userid=0;
        $rootScope.userrole=0;

        console.log($rootScope.userid+'userid');

        console.log('in logout');
        $rootScope.userid=0;
        $state.go('index');
    }


    $scope.gotosignup=function(){
		
        $('html, body').animate({
            scrollTop: $('form[name="signupForm"]').offset().top
        }, 2000);
    }
										  
										  
    setTimeout(function(){
        $('.dropdown-menu').hide(500);
        $scope.toggledropdown=function(){

            console.log('uuuu');
            if($('.dropdown-menu').css('display')=='none'){

                $('.dropdown-menu').show();
                $('.dropdown-menu').stop(true, true).delay(400).show();

            }
            else{

                $('.dropdown-menu').hide();
                $('.dropdown-menu').stop(true, true).delay(400).hide();
            }


        }

        $('ul.nav li.dropdown').hover(function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }, function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
        });


    },2000);



});
jungledrone.controller('employment', function($scope,$state,$http,$cookieStore,$rootScope,Upload) {


    $scope.form={};
    $scope.form.resume = '';

    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'countryList',
        data    : $.param({'uid':$scope.userid}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        console.log(data);

        setTimeout(function(){
            //$scope.signupForm.reset();

            $scope.form.country={};
            $scope.form.country.s_name='Belize';
            $('#country').val(20);

        },3000);


        $scope.countrylist=data;
    });

    /*file upload part start */



    $scope.$watch('event_imgupload', function (files) {
        $scope.formUpload = false;
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (file) {
                    upload(file);
                })(files[i]);
            }
        }
    });

    $scope.getReqParams = function () {
        return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
        '&errorMessage=' + $scope.serverErrorMsg : '';
    };

    function upload(file) {
        $scope.errorMsg = null;
        uploadUsingUpload(file);
    }

    function uploadUsingUpload(file) {
        $rootScope.stateIsLoading = true;
        file.upload = Upload.upload({
            url: $scope.adminUrl+'uploadresume' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            $('.progress').removeClass('ng-hide');
            file.result = response.data;

            $scope.form.resume = response.data.image_url;
            $scope.form.event_image = response.data.image_name;
            $rootScope.stateIsLoading = false;

            //$('#loaderDiv').addClass('ng-hide');


        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
           // $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }



    /*file upload end */


    setTimeout(function(){
        $scope.form.country={};
        $scope.form.country.s_name='Belize';
        $('#country').val(20);
    },2000);


    $scope.employmentsubmit=function(){



        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addemployement',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $('#employmentmodal').modal('show');
            //console.log($scope.signupForm)
            $scope.employmentform.reset();
            $scope.form={};

           // $('#employmentmodal').modal('show');
            setTimeout(function(){


                $scope.form.country={};
                $scope.form.country.s_name='Belize';
                $('#country').val(20);
                $('#employmentmodal').modal('hide');

            },3000);














        });





    }




});

jungledrone.controller('addcontent', function($compile,$scope,contentservice,$state,$http,$cookieStore,$rootScope,Upload,$sce,$stateParams) {



    //console.log(contentservice.getcontent($scope.adminUrl+'contentlist'));
   // $scope.contentdata=(contentservice.getcontent($scope.adminUrl+'contentlist'));

    $rootScope.editcontent= function (evalue) {

        console.log(evalue);
    }

    setTimeout(function(){


        //console.log($rootScope.contentdata);
        var x;
        var y;

        for (x in $rootScope.contentdata ){
            var contentw='';
            console.log($rootScope.contentdata[x]);
            console.log(angular.fromJson($rootScope.contentdata[x].content));

            for (y in $rootScope.contentdata[x].content){
                contentw+=($rootScope.contentdata[x].content[y]);
            }
            $rootScope.contentdata[x].content=(contentw);

            $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].id]=$rootScope.contentdata[x];
            //var model=$parse($rootScope.contentdata[x].id);
            //model.assign($scope, $rootScope.contentdata[x]);
            //.id=$rootScope.contentdata[x];
        }

        console.log('----'+$scope);


    },21);


   /* console.log($scope.contentdata.$$state.status);
    console.log($scope.contentdata.$$state);
    console.log(Object.keys($scope.contentdata).length);
    console.log(Object.keys($scope.contentdata.$$state).length);
    console.log($scope.contentdata.$$state.value);
    var x;
    for(x in $scope.contentdata.$$state){

        console.log(x+'===='+$scope.contentdata.$$state[x]);

    }*/
    /*$scope.Mahesh = {};
    $scope.Mahesh.name = "Mahesh Parashar";
    $scope.Mahesh.id  = 1;
    $scope.Mahesh.content  = 4;

    $scope.Piyush = {};
    $scope.Piyush.name = "Piyush Parashar";
    $scope.Piyush.id  = 2;
    $scope.Piyush.content  = 2;*/

    $scope.tinymceOptions = {
        trusted: true,
        theme: 'modern',
        plugins: [
            'advlist autolink link  lists charmap   hr anchor pagebreak spellchecker',
            'searchreplace wordcount visualblocks visualchars code  insertdatetime  nonbreaking',
            'save table contextmenu directionality  template paste textcolor'
        ],
        // toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
        toolbar: ' undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  |   media fullpage | forecolor backcolor',
    };

    $scope.form={};
    $scope.form.resume = '';
    $scope.form.resumearrn = new Array();
    $scope.form.resumearrp = new Array();
    $scope.form.resume = null;;


    $scope.caclismultiple=function(){

        if($scope.form.ismultiple=='yes'){

            $scope.ismultipleval=true;
        }
        else   $scope.ismultipleval=false;

    }

    $scope.delcopy=function(ev){

        console.log('test ...');

        var target = ev.target || ev.srcElement || ev.originalTarget;

        if($scope.cimage==true) {

            var spval = ($('.imgc').find('.delb').index(target));
            $scope.form.resumearrn.splice(spval, 1);
            $scope.form.resumearrp.splice(spval, 1);
            $(target).parent().remove();
        }

        if($scope.ctext==true || $scope.chtml==true){
            console.log($(target).prev().prev().attr('indexval'));
           // $scope.form.ctext.splice($(target).prev().attr('indexval'),1);
           // /delete $scope.form.ctext.$(target).prev().attr('indexval');
            var key = $(target).prev().prev().attr('indexval');
            if(key!=0){
               ;
                if($scope.ctext==true) $scope.form.ctext[key]=null;
                if($scope.chtml==true) $scope.form.chtml[key]=null;
                var res= $(target).parent().parent();
                $(target).parent().remove()
                $compile(res)($scope);

            }else{
                alert('You can not delete default content area' );
            }

        }








    }
    $scope.addcopy=function(ev){



        var target = ev.target || ev.srcElement || ev.originalTarget;





        //console.log($( target).parentsUntil('.copyarea').html());
        if($scope.cimage!=true) {
            if ($scope.ctext == true ) {

                var addedval =parseInt(parseInt($(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('indexval'))+1);
                if(isNaN(addedval)) addedval=1;

                var res=$(target).prev().prev().clone().appendTo($(target).parent().find('.clearfix1').last());

                /*console.log($(target).parent().find('.clearfix1').last().find('.copyarea').last().index());
                console.log($(target).prev().find('.copyarea').last().html());
                console.log($(target).prev().html());
                console.log($(target).prev().attr('class'));
*/
                $(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('indexval',addedval);
                $(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('ng-model','form.ctext['+addedval+']');
                $(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('name','ctext['+addedval+']');
                //$compile(res)($scope);
                $compile($(target).prev().find('.copyarea').last())($scope);
                $(target).prev().find('.copyarea').last().find('button').removeClass('delb');

                $scope.add_Admin.$setDirty(true);

            }
            if ($scope.chtml == true) {
                var addedval =parseInt(parseInt($('div[ng-show="chtml"]').find('textarea').last().attr('indexval'))+1);
                if(isNaN(addedval)) addedval=1;

               /* $(target).parent().find('.clearfix1').last().html("<div class='form-group' ng-show='chtml'>\
            <label >Put Html Content  :</label>\
            \<div class='copyarea'>\
                \<textarea ui-tinymce='tinymceOptions'   name='chtml["+addedval+"]'  indexval ="+addedval+"  \
             \ ng-model='form.chtml["+addedval+"]'  required-message='content can not be blank' \
                \ required\
              \  ></textarea>\
        \<div class='clearfix'></div>\
               \ <button type='button' ng-click='delcopy($event)' class='btn btn-primary'>Delete</button>\
               \ </div>\
                \<div class='clearfix clearfix1'></div>\
               \</div>");*/



                $(target).parent().find('.clearfix1').last().append("\<div class='copyarea'>\
                \<textarea ui-tinymce='tinymceOptions'   name='chtml["+addedval+"]'  indexval ="+addedval+"  \
             \ ng-model='form.chtml["+addedval+"]'   \
                \ required\
              \  ></textarea>\
        \<div class='clearfix'></div>\
               \ <button type='button' ng-click='delcopy($event)' class='btn btn-primary'>Delete</button>\
               \ </div>\
                \<div class='clearfix'></div>");


                /*$(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('indexval',addedval);
                $(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('ng-model','form.ctext['+addedval+']');
                $(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('name','ctext['+addedval+']');*/

                //var res=$('form').find('div[ng-show="chtml"]').html();
                //$('div[ng-show="chtml"]').find('textarea').last().attr('ui-tinymce',$scope.tinymceOptions);
                var res=$(target).parent().find('.copyarea').last();

                $compile(res)($scope || $rootScope);
                //$rootScope.$digest();


            }
        }
        else {
            $('input.uploadbtn').click();
            console.log($('button.uploadbtn').text());
        }



        //$( target).appendTo($( target).parentsUntil(".form-group" ))
        //$( target).parentsUntil('.copyarea').after(chtml);



        if($scope.chtml==true) {
            $('.add-content').last().wysihtml5({
                toolbar: {
                    "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                    "emphasis": true, //Italics, bold, etc. Default true
                    "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                    "html": true, //Button which allows you to edit the generated HTML. Default false
                    "link": true, //Button to insert a link. Default true
                    "image": true, //Button to insert an image. Default true,
                    "color": true, //Button to change color of font
                    "blockquote": true, //Blockquote
                }
            });
        }
    }
    $scope.form.ismultiple='no';
    $scope.cimage=false;
    $scope.chtml=false;
    $scope.ctext=false;


    $scope.ctype=function(ctype){

        //console.log(ev);

        $scope.cimage=false;
        $scope.chtml=false;
        $scope.ctext=false;

        //$('textarea').removeAttr('required');

        if(ctype=='html') {

           // $('textarea[name^="chtml"]').attr('required','');
            $scope.chtml=true;
        }
        if(ctype=='text') {
            //$('textarea[name^="ctext"]').attr('required','');
            $scope.ctext=true;
        }
        if(ctype=='image') $scope.cimage=true;

        //$compile($('.chtml'))($scope);
        //$compile($('.ctext'))($scope);



    }








    /*file upload part start */


    setTimeout(function(){

        $('.add-content').wysihtml5({
            toolbar: {
                "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                "emphasis": true, //Italics, bold, etc. Default true
                "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                "html": true, //Button which allows you to edit the generated HTML. Default false
                "link": true, //Button to insert a link. Default true
                "image": true, //Button to insert an image. Default true,
                "color": true, //Button to change color of font
                "blockquote": true, //Blockquote
            }
        });

    },2000);


    $scope.$watch('event_imgupload', function (files) {
        $scope.formUpload = false;
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (file) {
                    upload(file);
                })(files[i]);
            }
        }
    });

    $scope.getReqParams = function () {
        return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
        '&errorMessage=' + $scope.serverErrorMsg : '';
    };

    function upload(file) {
        $scope.errorMsg = null;
        uploadUsingUpload(file);
    }

    function uploadUsingUpload(file) {
        $rootScope.stateIsLoading = true;
        file.upload = Upload.upload({
            url: $scope.adminUrl+'uploadcontent' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            $('.progress').removeClass('ng-hide');
            file.result = response.data;

            if($scope.form.ismultiple=='yes'){

                $scope.form.resumearrn.push(response.data.image_name);
                $scope.form.resumearrp.push(response.data.image_url);

                $scope.form.resume = null;
                $scope.form.event_image = null;

            }
            else {

                $scope.form.resume = response.data.image_url;
                $scope.form.event_image = response.data.image_name;

                $scope.form.resumearrn.length=0;
                $scope.form.resumearrp.length=0;
            }
            $rootScope.stateIsLoading = false;

            //$('#loaderDiv').addClass('ng-hide');


        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            // $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }



    /*file upload end */


    setTimeout(function(){
        $scope.form.country={};
        $scope.form.country.s_name='Belize';
        $('#country').val(20);
    },2000);



    $scope.contentValidator=function(){


       // console.log('in gender validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());



        if($scope.add_Admin.$submitted){

            /*if(typeof ($("input[name='gender']:checked").val()) != 'undefined' )
            {
                $scope.gender_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.gender_error=true;
                return '';

            }*/


           // if()




            if($scope.form.ismultiple=='yes'){



                //console.log($scope.chtml);



                $scope.ismultipleval=true;
            }
            else   $scope.ismultipleval=false;



            //console.log($scope.form.ismultiple);

            if(typeof ($scope.form.ismultiple)!='undefined') return true;

            else return 'Required !' ;

        }

    }
    $scope.contenetv=function(){


       // console.log('in gender validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());



        if($scope.add_Admin.$submitted){

            /*if(typeof ($("input[name='gender']:checked").val()) != 'undefined' )
            {
                $scope.gender_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.gender_error=true;
                return '';

            }*/
            console.log($scope.form.ctext);
            if(typeof ($scope.form.ctext)!='undefined')
                console.log(Object.keys($scope.form.ctext).length);
            console.log($('textarea[name^="ctext"]').length);


           // if()

            console.log('in cont validator');






        }

    }

    $scope.submitadminForm=function(){


        if($scope.chtml == true ){

            var chtmlarr= new Array();
            chtmlarr=[];
            //$scope.form.chtml=null;

            /*$('textarea[name^="chtml"]').each(function(){

                console.log($(this).val());

                //chtmlarr.push($(this).val());


            });

            $scope.form.chtml = JSON.stringify(chtmlarr);*/


        }
        /*if($scope.ctext == true ){

            var chtmlarr= new Array();
            chtmlarr=[];
            $scope.form.ctext=null;

            $('textarea[name="ctext"]').each(function(){

                //console.log($(this).val());

                chtmlarr.push($(this).val());


            });

            $scope.form.ctext = JSON.stringify(chtmlarr);


        }*/

        console.log($scope.form);
        console.log($.param($scope.form));


        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addcontent',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            //$('#employmentmodal').modal('show');
            console.log(data);
           // $scope.employmentform.reset();
           // $scope.form={};

            // $('#employmentmodal').modal('show');
            setTimeout(function(){


              //  $scope.form.country={};
              //  $scope.form.country.s_name='Belize';
              //  $('#country').val(20);
               // $('#employmentmodal').modal('hide');

            },3000);



    });

    }

    $scope.employmentsubmit=function(){



        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addemployement',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $('#employmentmodal').modal('show');
            //console.log($scope.signupForm)
            $scope.employmentform.reset();
            $scope.form={};

            // $('#employmentmodal').modal('show');
            setTimeout(function(){


                $scope.form.country={};
                $scope.form.country.s_name='Belize';
                $('#country').val(20);
                $('#employmentmodal').modal('hide');

            },3000);














        });





    }




});
jungledrone.controller('editcontent', function($compile,$scope,contentservice,$state,$http,$cookieStore,$rootScope,Upload,$sce,$stateParams) {



    //console.log(contentservice.getcontent($scope.adminUrl+'contentlist'));
   // $scope.contentdata=(contentservice.getcontent($scope.adminUrl+'contentlist'));

    $scope.userid=$stateParams.userId;


    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'contentlistbyid',
        data    : $.param({'id':$scope.userid}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        console.log(data);
        $scope.form = {
            id: data.id,
            //refferal_code: data.refferal_code,
            cname: data.cname,
            ctype: data.ctype,
            description: data.description,
            parentid:data.parentid
            //ismultiple: data.content.length,
        }

        if(data.ctype=='html') {
            $scope.chtml=true;
            $scope.form.chtml=data.content;
        }
        if(data.ctype=='text') $scope.ctext=true;
        if(data.ctype=='image') $scope.cimage=true;

        if(data.content.length>1) $scope.form.ismultiple='yes';
        else $scope.form.ismultiple='no';

        console.log($scope.form);
    });
    $rootScope.editcontent= function (evalue) {

        console.log(evalue);
    }

    setTimeout(function(){


        //console.log($rootScope.contentdata);
        var x;
        var y;

        for (x in $rootScope.contentdata ){
            var contentw='';
            console.log($rootScope.contentdata[x]);
            console.log(angular.fromJson($rootScope.contentdata[x].content));

            for (y in $rootScope.contentdata[x].content){
                contentw+=($rootScope.contentdata[x].content[y]);
            }
            $rootScope.contentdata[x].content=(contentw);

            $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].id]=$rootScope.contentdata[x];
            //var model=$parse($rootScope.contentdata[x].id);
            //model.assign($scope, $rootScope.contentdata[x]);
            //.id=$rootScope.contentdata[x];
        }

        console.log('----'+$scope);


    },21);


   /* console.log($scope.contentdata.$$state.status);
    console.log($scope.contentdata.$$state);
    console.log(Object.keys($scope.contentdata).length);
    console.log(Object.keys($scope.contentdata.$$state).length);
    console.log($scope.contentdata.$$state.value);
    var x;
    for(x in $scope.contentdata.$$state){

        console.log(x+'===='+$scope.contentdata.$$state[x]);

    }*/
    /*$scope.Mahesh = {};
    $scope.Mahesh.name = "Mahesh Parashar";
    $scope.Mahesh.id  = 1;
    $scope.Mahesh.content  = 4;

    $scope.Piyush = {};
    $scope.Piyush.name = "Piyush Parashar";
    $scope.Piyush.id  = 2;
    $scope.Piyush.content  = 2;*/

    $scope.tinymceOptions = {
        trusted: true,
        theme: 'modern',
        plugins: [
            'advlist autolink link  lists charmap   hr anchor pagebreak spellchecker',
            'searchreplace wordcount visualblocks visualchars code  insertdatetime  nonbreaking',
            'save table contextmenu directionality  template paste textcolor'
        ],
        // toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
        toolbar: ' undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  |   media fullpage | forecolor backcolor',
    };

    $scope.form={};
    $scope.form.resume = '';
    $scope.form.resumearrn = new Array();
    $scope.form.resumearrp = new Array();
    $scope.form.resume = null;;


    $scope.caclismultiple=function(){

        if($scope.form.ismultiple=='yes'){

            $scope.ismultipleval=true;
        }
        else   $scope.ismultipleval=false;

    }

    $scope.delcopy=function(ev){

        console.log('test ...');

        var target = ev.target || ev.srcElement || ev.originalTarget;

        if($scope.cimage==true) {

            var spval = ($('.imgc').find('.delb').index(target));
            $scope.form.resumearrn.splice(spval, 1);
            $scope.form.resumearrp.splice(spval, 1);
            $(target).parent().remove();
        }

        if($scope.ctext==true || $scope.chtml==true){
            console.log($(target).prev().prev().attr('indexval'));
           // $scope.form.ctext.splice($(target).prev().attr('indexval'),1);
           // /delete $scope.form.ctext.$(target).prev().attr('indexval');
            var key = $(target).prev().prev().attr('indexval');
            if(key!=0){
               ;
                if($scope.ctext==true) $scope.form.ctext[key]=null;
                if($scope.chtml==true) $scope.form.chtml[key]=null;
                var res= $(target).parent().parent();
                $(target).parent().remove()
                $compile(res)($scope);

            }else{
                alert('You can not delete default content area' );
            }

        }








    }
    $scope.addcopy=function(ev){



        var target = ev.target || ev.srcElement || ev.originalTarget;





        //console.log($( target).parentsUntil('.copyarea').html());
        if($scope.cimage!=true) {
            if ($scope.ctext == true ) {

                var addedval =parseInt(parseInt($(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('indexval'))+1);
                if(isNaN(addedval)) addedval=1;

                var res=$(target).prev().prev().clone().appendTo($(target).parent().find('.clearfix1').last());

                /*console.log($(target).parent().find('.clearfix1').last().find('.copyarea').last().index());
                console.log($(target).prev().find('.copyarea').last().html());
                console.log($(target).prev().html());
                console.log($(target).prev().attr('class'));
*/
                $(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('indexval',addedval);
                $(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('ng-model','form.ctext['+addedval+']');
                $(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('name','ctext['+addedval+']');
                //$compile(res)($scope);
                $compile($(target).prev().find('.copyarea').last())($scope);
                $(target).prev().find('.copyarea').last().find('button').removeClass('delb');

                $scope.add_Admin.$setDirty(true);

            }
            if ($scope.chtml == true) {
                var addedval =parseInt(parseInt($('div[ng-show="chtml"]').find('textarea').last().attr('indexval'))+1);
                if(isNaN(addedval)) addedval=1;

               /* $(target).parent().find('.clearfix1').last().html("<div class='form-group' ng-show='chtml'>\
            <label >Put Html Content  :</label>\
            \<div class='copyarea'>\
                \<textarea ui-tinymce='tinymceOptions'   name='chtml["+addedval+"]'  indexval ="+addedval+"  \
             \ ng-model='form.chtml["+addedval+"]'  required-message='content can not be blank' \
                \ required\
              \  ></textarea>\
        \<div class='clearfix'></div>\
               \ <button type='button' ng-click='delcopy($event)' class='btn btn-primary'>Delete</button>\
               \ </div>\
                \<div class='clearfix clearfix1'></div>\
               \</div>");*/



                $(target).parent().find('.clearfix1').last().append("\<div class='copyarea'>\
                \<textarea ui-tinymce='tinymceOptions'   name='chtml["+addedval+"]'  indexval ="+addedval+"  \
             \ ng-model='form.chtml["+addedval+"]'   \
                \ required\
              \  ></textarea>\
        \<div class='clearfix'></div>\
               \ <button type='button' ng-click='delcopy($event)' class='btn btn-primary'>Delete</button>\
               \ </div>\
                \<div class='clearfix'></div>");


                /*$(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('indexval',addedval);
                $(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('ng-model','form.ctext['+addedval+']');
                $(target).parent().find('.clearfix1').last().find('.copyarea').last().find('textarea').attr('name','ctext['+addedval+']');*/

                //var res=$('form').find('div[ng-show="chtml"]').html();
                //$('div[ng-show="chtml"]').find('textarea').last().attr('ui-tinymce',$scope.tinymceOptions);
                var res=$(target).parent().find('.copyarea').last();

                $compile(res)($scope || $rootScope);
                //$rootScope.$digest();


            }
        }
        else {
            $('input.uploadbtn').click();
            console.log($('button.uploadbtn').text());
        }



        //$( target).appendTo($( target).parentsUntil(".form-group" ))
        //$( target).parentsUntil('.copyarea').after(chtml);



        if($scope.chtml==true) {
            $('.add-content').last().wysihtml5({
                toolbar: {
                    "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                    "emphasis": true, //Italics, bold, etc. Default true
                    "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                    "html": true, //Button which allows you to edit the generated HTML. Default false
                    "link": true, //Button to insert a link. Default true
                    "image": true, //Button to insert an image. Default true,
                    "color": true, //Button to change color of font
                    "blockquote": true, //Blockquote
                }
            });
        }
    }
    $scope.form.ismultiple='no';
    $scope.cimage=false;
    $scope.chtml=false;
    $scope.ctext=false;


    $scope.ctype=function(ctype){

        //console.log(ev);

        $scope.cimage=false;
        $scope.chtml=false;
        $scope.ctext=false;

        //$('textarea').removeAttr('required');

        if(ctype=='html') {

           // $('textarea[name^="chtml"]').attr('required','');
            $scope.chtml=true;
        }
        if(ctype=='text') {
            //$('textarea[name^="ctext"]').attr('required','');
            $scope.ctext=true;
        }
        if(ctype=='image') $scope.cimage=true;

        //$compile($('.chtml'))($scope);
        //$compile($('.ctext'))($scope);



    }








    /*file upload part start */


    setTimeout(function(){

        $('.add-content').wysihtml5({
            toolbar: {
                "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                "emphasis": true, //Italics, bold, etc. Default true
                "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                "html": true, //Button which allows you to edit the generated HTML. Default false
                "link": true, //Button to insert a link. Default true
                "image": true, //Button to insert an image. Default true,
                "color": true, //Button to change color of font
                "blockquote": true, //Blockquote
            }
        });

    },2000);


    $scope.$watch('event_imgupload', function (files) {
        $scope.formUpload = false;
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (file) {
                    upload(file);
                })(files[i]);
            }
        }
    });

    $scope.getReqParams = function () {
        return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
        '&errorMessage=' + $scope.serverErrorMsg : '';
    };

    function upload(file) {
        $scope.errorMsg = null;
        uploadUsingUpload(file);
    }

    function uploadUsingUpload(file) {
        $rootScope.stateIsLoading = true;
        file.upload = Upload.upload({
            url: $scope.adminUrl+'uploadcontent' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            $('.progress').removeClass('ng-hide');
            file.result = response.data;

            if($scope.form.ismultiple=='yes'){

                $scope.form.resumearrn.push(response.data.image_name);
                $scope.form.resumearrp.push(response.data.image_url);

                $scope.form.resume = null;
                $scope.form.event_image = null;

            }
            else {

                $scope.form.resume = response.data.image_url;
                $scope.form.event_image = response.data.image_name;

                $scope.form.resumearrn.length=0;
                $scope.form.resumearrp.length=0;
            }
            $rootScope.stateIsLoading = false;

            //$('#loaderDiv').addClass('ng-hide');


        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            // $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }



    /*file upload end */


    setTimeout(function(){
        $scope.form.country={};
        $scope.form.country.s_name='Belize';
        $('#country').val(20);
    },2000);



    $scope.contentValidator=function(){


       // console.log('in gender validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());



        if($scope.add_Admin.$submitted){

            /*if(typeof ($("input[name='gender']:checked").val()) != 'undefined' )
            {
                $scope.gender_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.gender_error=true;
                return '';

            }*/


           // if()




            if($scope.form.ismultiple=='yes'){



                //console.log($scope.chtml);



                $scope.ismultipleval=true;
            }
            else   $scope.ismultipleval=false;



            //console.log($scope.form.ismultiple);

            if(typeof ($scope.form.ismultiple)!='undefined') return true;

            else return 'Required !' ;

        }

    }
    $scope.contenetv=function(){


       // console.log('in gender validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());



        if($scope.add_Admin.$submitted){

            /*if(typeof ($("input[name='gender']:checked").val()) != 'undefined' )
            {
                $scope.gender_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.gender_error=true;
                return '';

            }*/
            console.log($scope.form.ctext);
            if(typeof ($scope.form.ctext)!='undefined')
                console.log(Object.keys($scope.form.ctext).length);
            console.log($('textarea[name^="ctext"]').length);


           // if()

            console.log('in cont validator');






        }

    }

    $scope.submitadminForm=function(){


        if($scope.chtml == true ){

            var chtmlarr= new Array();
            chtmlarr=[];
            //$scope.form.chtml=null;

            /*$('textarea[name^="chtml"]').each(function(){

                console.log($(this).val());

                //chtmlarr.push($(this).val());


            });

            $scope.form.chtml = JSON.stringify(chtmlarr);*/


        }
        /*if($scope.ctext == true ){

            var chtmlarr= new Array();
            chtmlarr=[];
            $scope.form.ctext=null;

            $('textarea[name="ctext"]').each(function(){

                //console.log($(this).val());

                chtmlarr.push($(this).val());


            });

            $scope.form.ctext = JSON.stringify(chtmlarr);


        }*/

        console.log($scope.form);
        console.log($.param($scope.form));


        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addcontent',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            //$('#employmentmodal').modal('show');
            console.log(data);
           // $scope.employmentform.reset();
           // $scope.form={};

            // $('#employmentmodal').modal('show');
            setTimeout(function(){


              //  $scope.form.country={};
              //  $scope.form.country.s_name='Belize';
              //  $('#country').val(20);
               // $('#employmentmodal').modal('hide');

            },3000);



    });

    }

    $scope.employmentsubmit=function(){



        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addemployement',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $('#employmentmodal').modal('show');
            //console.log($scope.signupForm)
            $scope.employmentform.reset();
            $scope.form={};

            // $('#employmentmodal').modal('show');
            setTimeout(function(){


                $scope.form.country={};
                $scope.form.country.s_name='Belize';
                $('#country').val(20);
                $('#employmentmodal').modal('hide');

            },3000);














        });





    }




});




jungledrone.controller('login', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.login = function(){
        $rootScope.stateIsLoading = true;
        console.log(1);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'adminlogin',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            //$rootScope.stateIsLoading = false;
            if(data.status == 'success'){
                $cookieStore.put('userid',data.userdetails.id);
                $cookieStore.put('useremail',data.userdetails.email);
                $cookieStore.put('userfullname',data.userdetails.fname+' '+data.userdetails.lname);
                $cookieStore.put('userfname',data.userdetails.fname);
                $cookieStore.put('userlname',data.userdetails.lname);
                $cookieStore.put('username',data.userdetails.username);
                $cookieStore.put('userrole',data.userdetails.userrole);

                if(typeof (data.userdetails.roles[4]) != 'undefined')
                    $cookieStore.put('userrole',4);
                if(typeof (data.userdetails.roles[5]) != 'undefined')
                    $cookieStore.put('userrole',5);
                if(typeof (data.userdetails.roles[6]) != 'undefined')
                    $cookieStore.put('userrole',6);
                if(typeof (data.userdetails.roles[7]) != 'undefined')
                    $cookieStore.put('userrole',7);
                console.log($cookieStore.get('userid'));
                console.log($cookieStore.get('useremail'));
                console.log($cookieStore.get('userfullname'));



                //console.log($rootScope.userrole);

                $state.go('dashboard');

                /*


                 if(typeof($cookieStore.get('idea_det_id')) != 'undefined' && $cookieStore.get('idea_det_id')>0) {
                 $scope.idea_det_id = $cookieStore.get('idea_det_id');
                 $cookieStore.remove('idea_det_id');
                 $state.go('ideadetails',{ideaId: $scope.idea_det_id});
                 return
                 }else{
                 */
                //   $state.go('dashboard');
                //  return
                // }

            }else{
                $rootScope.stateIsLoading = false;
                $scope.errormsg = data.msg;

                console.log('in error'+$rootScope.stateIsLoading );
            }

        });
    }
});

jungledrone.controller('addadmin', function($scope,$state,$http,$cookieStore,$rootScope) {
    // $state.go('login');
    $scope.contact=['Anytime','Early morning','Mid morning','Afternoon','Early evening','Late evening'];
    $scope.submitadminForm = function(){

        console.log($scope.adminUrl+'addadmin');


        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addadmin',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            //$rootScope.stateIsLoading = false;
            if(data.status == 'error'){
                console.log(data);
                $('.email_div').append('<label class="control-label has-error validationMessage">This email already exists.</label>');
            }else{
                $state.go('admin-list');
                return;
            }



        });


    }

    //console.log('in add admin form ');
});
jungledrone.controller('editadmin', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams){

    $scope.userid=$stateParams.userId;

    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'admindetails',
        data    : $.param({'uid':$scope.userid}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        console.log(data);
        $scope.form = {
            uid: data.uid,
            refferal_code: data.refferal_code,
            fname: data.fname,
            lname: data.lname,
            bname: data.bname,
            email: data.email,
            address: data.address,
            phone_no: data.phone_no,
            mobile_no: data.mobile_no,
            contact_time: data.contact_time,
        }
    });
    $scope.update = function () {

        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'adminupdates',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $state.go('admin-list');
            return
        });
    }


})


jungledrone.controller('adminlist', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.currentPage=1;
    $scope.perPage=3;
    $scope.begin=0;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function(){
        console.log($scope.currentPage);
        $scope.begin=parseInt($scope.currentPage-1)*$scope.perPage;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'adminlist',
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        console.log(data);
        $scope.userlist=data;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));


    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.fname.indexOf($scope.searchkey) != -1) || (item.lname.indexOf($scope.searchkey) != -1) ||(item.mail.indexOf($scope.searchkey) != -1)||(item.mobile_no.indexOf($scope.searchkey) != -1)||(item.phone_no.indexOf($scope.searchkey) != -1) ||(item.address.indexOf($scope.searchkey) != -1)){
            return true;
        }
        return false;
    };
    $scope.deladmin = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.userlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'deleteadmin',
            data    : $.param({uid: $scope.userlist[idx].uid}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.userlist.splice(idx,1);
            $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));

        });
    }

    $scope.changeStatus = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.userlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'updatestatus',
            data    : $.param({uid: $scope.userlist[idx].uid}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.userlist[idx].status = !$scope.userlist[idx].status;
        });
    }




    //console.log('in add admin form ');
});
jungledrone.controller('signupuserlist', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.currentPage=1;
    $scope.perPage=2;
    $scope.begin=0;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function(){
        console.log($scope.currentPage);
        $scope.begin=parseInt($scope.currentPage-1)*$scope.perPage;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'contactuserlist',
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        console.log(data);
        $scope.userlist=data;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));


    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.fname.indexOf($scope.searchkey) != -1) || (item.lname.indexOf($scope.searchkey) != -1) ||(item.email.indexOf($scope.searchkey) != -1)||(item.phone.indexOf($scope.searchkey) != -1)||(item.country.indexOf($scope.searchkey) != -1) ||(item.city.indexOf($scope.searchkey) != -1)||(item.message.indexOf($scope.searchkey) != -1)){
            return true;
        }
        return false;
    };
    $scope.delcontactuser = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.userlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'deletecontactuser',
            data    : $.param({id: $scope.userlist[idx].id}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.userlist.splice(idx,1);
            $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));

        });
    }






    //console.log('in add admin form ');
});

jungledrone.controller('contactlist', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.currentPage=1;
    $scope.perPage=4;
    $scope.begin=0;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function(){
        console.log($scope.currentPage);
        $scope.begin=parseInt($scope.currentPage-1)*$scope.perPage;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'contactlist',
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        console.log(data);
        $scope.userlist=data;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));


    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.name.indexOf($scope.searchkey) != -1) || (item.email.indexOf($scope.searchkey) != -1) ||(item.phone.indexOf($scope.searchkey) != -1)||(item.message.indexOf($scope.searchkey) != -1)||(item.subject.indexOf($scope.searchkey) != -1) ){
            return true;
        }
        return false;
    };
    $scope.delcontact = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.userlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'deletecontact',
            data    : $.param({id: $scope.userlist[idx].id}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.userlist.splice(idx,1);
            $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));

        });
    }






    //console.log('in add admin form ');
});


jungledrone.controller('employementlist', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.currentPage=1;
    $scope.perPage=4;
    $scope.begin=0;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function(){
        console.log($scope.currentPage);
        $scope.begin=parseInt($scope.currentPage-1)*$scope.perPage;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'employementlist',
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        console.log(data);
        $scope.userlist=data;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));


    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.fname.indexOf($scope.searchkey) != -1) || (item.lname.indexOf($scope.searchkey) != -1) ||(item.phone.indexOf($scope.searchkey) != -1)||(item.email.indexOf($scope.searchkey) != -1)||(item.country.indexOf($scope.searchkey) != -1)||(item.city.indexOf($scope.searchkey) != -1) ){
            return true;
        }
        return false;
    };
    $scope.delcontact = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.userlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'deletecontact',
            data    : $.param({id: $scope.userlist[idx].id}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.userlist.splice(idx,1);
            $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));

        });
    }






    //console.log('in add admin form ');
});

jungledrone.controller('pilotlist', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.currentPage=1;
    $scope.perPage=4;
    $scope.begin=0;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function(){
        console.log($scope.currentPage);
        $scope.begin=parseInt($scope.currentPage-1)*$scope.perPage;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'pilotlist',
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        console.log(data);
        $scope.userlist=data;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));


    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.fname.indexOf($scope.searchkey) != -1) || (item.lname.indexOf($scope.searchkey) != -1) ||(item.phone.indexOf($scope.searchkey) != -1)||(item.email.indexOf($scope.searchkey) != -1)||(item.country.indexOf($scope.searchkey) != -1)||(item.city.indexOf($scope.searchkey) != -1) ){
            return true;
        }
        return false;
    };
    $scope.delcontact = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.userlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'deletecontact',
            data    : $.param({id: $scope.userlist[idx].id}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.userlist.splice(idx,1);
            $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));

        });
    }






    //console.log('in add admin form ');
});



jungledrone.controller('eventrsvplist', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.currentPage=1;
    $scope.perPage=4;
    $scope.begin=0;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function(){
        console.log($scope.currentPage);
        $scope.begin=parseInt($scope.currentPage-1)*$scope.perPage;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'admineventrsvp',
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        console.log(data);
        $scope.userlist=data;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));


    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.fname.indexOf($scope.searchkey) != -1) || (item.lname.indexOf($scope.searchkey) != -1) ||(item.phone.indexOf($scope.searchkey) != -1)||(item.email.indexOf($scope.searchkey) != -1)||(item.event_name.indexOf($scope.searchkey) != -1)){
            return true;
        }
        return false;
    };
    $scope.delcontact = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.userlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'deletecontact',
            data    : $.param({id: $scope.userlist[idx].id}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.userlist.splice(idx,1);
            $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));

        });
    }


$scope.exporttable=function(){
    console.log('export');
    exportTableToCSV.apply($('#example1'), [$('#example1'), 'export.csv']);
}

setTimeout(function(){
    $(".export").on('click', function (event) {
        // CSV
        console.log('export click');
        exportTableToCSV.apply(this, [$('#example1'), 'export'+Date.now()+'.csv']);

        // IF CSV, don't do event.preventDefault() or return false
        // We actually need this to be a typical hyperlink
    });
},2000);

   $scope.exportTableToCSV= function ($table, filename) {

        var $rows = $table.find('tr:has(td)'),

        // Temporary delimiter characters unlikely to be typed by keyboard
        // This is to avoid accidentally splitting the actual contents
            tmpColDelim = String.fromCharCode(11), // vertical tab character
            tmpRowDelim = String.fromCharCode(0), // null character

        // actual delimiter characters for CSV format
            colDelim = '","',
            rowDelim = '"\r\n"',

        // Grab text from table into CSV formatted string
            csv = '"' + $rows.map(function (i, row) {
                    var $row = $(row),
                        $cols = $row.find('td');

                    return $cols.map(function (j, col) {
                        var $col = $(col),
                            text = $col.text();

                        return text.replace(/"/g, '""'); // escape double quotes

                    }).get().join(tmpColDelim);

                }).get().join(tmpRowDelim)
                    .split(tmpRowDelim).join(rowDelim)
                    .split(tmpColDelim).join(colDelim) + '"',

        // Data URI
            csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        $(this)
            .attr({
                'download': filename,
                'href': csvData,
                'target': '_blank'
            });
    }







    //console.log('in add admin form ');
});


jungledrone.controller('addevent',function($scope,$state,$http,$cookieStore,$rootScope,$log,Upload){


    $scope.form={};
    $scope.event_status=false;
    $scope.event_img=false;




    /*file upload part start */



    $scope.$watch('event_imgupload', function (files) {
        $scope.formUpload = false;
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (file) {
                    upload(file);
                })(files[i]);
            }
        }
    });

    $scope.getReqParams = function () {
        return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
        '&errorMessage=' + $scope.serverErrorMsg : '';
    };

    function upload(file) {
        $scope.errorMsg = null;
        uploadUsingUpload(file);
    }

    function uploadUsingUpload(file) {
        $('#loaderDiv').addClass('ng-hide');
        file.upload = Upload.upload({
            url: $scope.adminUrl+'uploadeventbanner' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            $('.progress').removeClass('ng-hide');
            file.result = response.data;

            $scope.event_img = response.data.image_url;
            $scope.form.event_image = response.data.image_name;

            $('#loaderDiv').addClass('ng-hide');


        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }



    /*file upload end */








    setTimeout(function(){
        jQuery('input[name="event_daterange"]').daterangepicker({
            /* timePicker: true,
             timePickerIncrement: 30,*/
            locale: {
                format: 'MM/DD/YYYY h:mm A'
            }
        });

/*
        $('#timepicker1').timepicker({
            minuteStep: 1,
            template: 'modal',
            appendWidgetTo: 'body',
            showSeconds: true,
            showMeridian: false,
            defaultTime: false
        });
*/

    },4000);


    $scope.addeventsForm=function(){

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addevent',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            //$rootScope.stateIsLoading = false;
            $state.go('event-list');
            console.log(data);
            /* if(data.status == 'error'){
             console.log(data);
             $('.email_div').append('<label class="control-label has-error validationMessage">This email already exists.</label>');
             }else{
             //console.log(data);
             //$cookieStore.put('user_insert_id',data);

             $state.go('finder-list');
             return;
             //console.log(data);
             }*/

        });



    }


    $scope.toggletimerange=function(){
        //console.log($scope.allday);
    }
    $scope.custom=function(){
        //console.log($scope.form);
        $scope.timeerror=false;
        $scope.form.event_status=$scope.event_status;
        //console.log($scope.timediff()+"test custom");
        if($scope.allday) {

            angular.element('#timeval').val('all day');
            $scope.form.timer='all day';

            return true;
        }
        if($scope.timediff()>0){
            $scope.form.timer=angular.element('input[ng-model="hours"]').eq(0).val()+' : ' +parseInt(angular.element('input[ng-model="minutes"]').eq(0).val()) +" to "+angular.element('input[ng-model="hours"]').eq(1).val()+' : ' +parseInt(angular.element('input[ng-model="minutes"]').eq(1).val());

            angular.element('#timeval').val(angular.element('input[ng-model="hours"]').eq(0).val()+' : ' +parseInt(angular.element('input[ng-model="minutes"]').eq(0).val()) +" to "+angular.element('input[ng-model="hours"]').eq(1).val()+' : ' +parseInt(angular.element('input[ng-model="minutes"]').eq(1).val()));
            return true ;
        }

        else {
            $scope.timeerror=true;
            return "Please set a correct time range for your event !!" ;
        }

        return true;
    }

    $scope.timediff= function () {

        /*console.log('td-'+parseInt($scope.endtime.getHours()-$scope.starttime.getHours()));
         console.log('md-'+parseInt($scope.endtime.getMinutes()-$scope.starttime.getMinutes()));*/


        ////console.log('td1-'+angular.element('input[ng-model="hours"]').eq(0).val());
        // console.log('td1-'+angular.element('input[ng-model="hours"]').eq(1).val());
        //console.log('md2-'+parseInt($scope.minutes));

        var totalst=parseInt(parseInt(angular.element('input[ng-model="hours"]').eq(0).val()*60)+parseInt(angular.element('input[ng-model="minutes"]').eq(0).val()));
        var totalet=parseInt(parseInt(angular.element('input[ng-model="hours"]').eq(1).val()*60)+parseInt(angular.element('input[ng-model="minutes"]').eq(1).val()));


        console.log('timediff'+parseInt(totalet-totalst));

        return parseInt(totalet-totalst);

        //
        /* console.log('td1-'+angular.element('input[ng-model="minutes"]').eq(0).val());
         console.log('td1-'+angular.element('input[ng-model="minutes"]').eq(1).val());*/
        //console.log('md2-'+parseInt($scope.minutes));
    }


    $scope.showtime=false;

    $scope.toggletimepicker=function(){

        console.log("before"+$scope.showtime);
        $scope.showtime=! $scope.showtime ;
        console.log("after"+$scope.showtime);
    }


    var st=new Date();
    //console.log(st.getHours());
    st.setHours(st.getHours());
    var et=new Date();
    //console.log(st.getHours());
    et.setHours(et.getHours()+1);
    $scope.endtime = et;
    $scope.starttime = st;

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = false;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.starttime = d;
        d.setHours( 15 );
        d.setMinutes( 0 );
        $scope.endtime = d;

        console.log('st'+$scope.starttime);
        console.log('et'+$scope.endtime);
    };

    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.starttime);
    };

    $scope.clear = function() {
        $scope.starttime = null;
    };




});


jungledrone.controller('addflight',function($scope,$state,$http,$cookieStore,$rootScope,$log,Upload,uibDateParser){


    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();
    $scope.open = function() {
        $scope.opened = true;
    };

    $scope.tdif=3600;


    $scope.addanother=function(){
        $scope.isaddanother=true;
    }
    $scope.psubmit=function(){
        $scope.isaddanother=false;
    }

    $scope.form={};
    $scope.form.first_flight= $cookieStore.get('userfname');
    $scope.form.last_flight= $cookieStore.get('userlname');

    setTimeout(function(){

        $('input[name="first_flight"]').val($cookieStore.get('userfname'));
        $('input[name="last_flight"]').val($cookieStore.get('userlname'));


        console.log( $('input[name="first_flight"]').val()+'f val');
        console.log( $('input[name="last_flight"]').val()+'l val');

    },1500);


    $scope.event_status=false;
    $scope.form.user_id=$rootScope.userid;
    $scope.event_img=false;




    /*file upload part start */



    $scope.$watch('event_imgupload', function (files) {
        $scope.formUpload = false;
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (file) {
                    upload(file);
                })(files[i]);
            }
        }
    });

    $scope.getReqParams = function () {
        return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
        '&errorMessage=' + $scope.serverErrorMsg : '';
    };

    function upload(file) {
        $scope.errorMsg = null;
        uploadUsingUpload(file);
    }

    function uploadUsingUpload(file) {
        $('#loaderDiv').addClass('ng-hide');
        file.upload = Upload.upload({
            url: $scope.adminUrl+'uploadeventbanner' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            $('.progress').removeClass('ng-hide');
            file.result = response.data;

            $scope.event_img = response.data.image_url;
            $scope.form.event_image = response.data.image_name;

            $('#loaderDiv').addClass('ng-hide');


        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }



    /*file upload end */








    setTimeout(function(){
        jQuery('input[name="event_daterange"]').daterangepicker({
            /* timePicker: true,
             timePickerIncrement: 30,*/
            locale: {
                format: 'MM/DD/YYYY h:mm A'
            }
        });

        /*
         $('#timepicker1').timepicker({
         minuteStep: 1,
         template: 'modal',
         appendWidgetTo: 'body',
         showSeconds: true,
         showMeridian: false,
         defaultTime: false
         });
         */

    },4000);


    $scope.addeventsForm=function(){


        $scope.form.flight_daterangeorg=($scope.form.flight_daterange);
        $scope.form.flight_daterange=convert($scope.form.flight_daterange);

        console.log($.param($scope.form));

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addflight',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            //$rootScope.stateIsLoading = false;
            if($scope.isaddanother){


                $scope.df=$scope.form.flight_daterangeorg;
                $scope.add_event.reset();
                $scope.form.flight_daterange=$scope.df;
                $('input[name="flight_daterange"]').val($scope.df);

                $scope.form.first_flight= $cookieStore.get('userfname');
                $scope.form.last_flight= $cookieStore.get('userlname');



                $('input[name="first_flight"]').val($cookieStore.get('userfname'));
                $('input[name="last_flight"]').val($cookieStore.get('userlname'));

                $('select').val('');
            }else{
                $state.go('flight-list');
            }
            console.log(data);
            /* if(data.status == 'error'){
             console.log(data);
             $('.email_div').append('<label class="control-label has-error validationMessage">This email already exists.</label>');
             }else{
             //console.log(data);
             //$cookieStore.put('user_insert_id',data);

             $state.go('finder-list');
             return;
             //console.log(data);
             }*/

        });



    }


    $scope.toggletimerange=function(){
        //console.log($scope.allday);
    }
    $scope.custom=function(){
        //console.log($scope.form);
        $scope.timeerror=false;
        $scope.form.event_status=$scope.event_status;
        //console.log($scope.timediff()+"test custom");
        if($scope.allday) {

            angular.element('#timeval').val('all day');
            $scope.form.timer='all day';

            return true;
        }
        if($scope.timediff()>0){
            //$scope.form.timer=angular.element('input[ng-model="hours"]').eq(0).val()+' : ' +parseInt(angular.element('input[ng-model="minutes"]').eq(0).val()) +" to "+angular.element('input[ng-model="hours"]').eq(1).val()+' : ' +parseInt(angular.element('input[ng-model="minutes"]').eq(1).val());

            $scope.form.timer=$scope.timediff();
            angular.element('#timeval').val($scope.timediff());
            return true ;
        }

        else {
            $scope.timeerror=true;
            return "Please set a correct time range for your event !!" ;
        }

        return true;
    }

    $scope.timediff= function () {




        console.log($scope.endtime+'et'+
        $scope.starttime+'st');

        /*console.log('td-'+parseInt($scope.endtime.getHours()-$scope.starttime.getHours()));
         console.log('md-'+parseInt($scope.endtime.getMinutes()-$scope.starttime.getMinutes()));*/


        ////console.log('td1-'+angular.element('input[ng-model="hours"]').eq(0).val());
        // console.log('td1-'+angular.element('input[ng-model="hours"]').eq(1).val());
        //console.log('md2-'+parseInt($scope.minutes));

        var totalst=parseInt(parseInt(angular.element('input[ng-model="hours"]').eq(0).val()*60)+parseInt(angular.element('input[ng-model="minutes"]').eq(0).val()));
        var totalet=parseInt(parseInt(angular.element('input[ng-model="hours"]').eq(1).val()*60)+parseInt(angular.element('input[ng-model="minutes"]').eq(1).val()));


        console.log('timediff'+$scope.tdif);

        return $scope.tdif;

        //
        /* console.log('td1-'+angular.element('input[ng-model="minutes"]').eq(0).val());
         console.log('td1-'+angular.element('input[ng-model="minutes"]').eq(1).val());*/
        //console.log('md2-'+parseInt($scope.minutes));
    }


    $scope.showtime=false;

    $scope.toggletimepicker=function(){

        console.log("before"+$scope.showtime);
        $scope.showtime=! $scope.showtime ;
        console.log("after"+$scope.showtime);
    }


    var st=new Date();
    //console.log(st.getHours());
    st.setHours(st.getHours());
    var et=new Date();
    //console.log(st.getHours());
    et.setHours(et.getHours()+1);
    $scope.endtime = et;
    $scope.starttime = st;

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.starttime = d;
        d.setHours( 15 );
        d.setMinutes( 0 );
        $scope.endtime = d;

        console.log('st changed'+$scope.starttime);
        console.log('et changed'+$scope.endtime);
    };

    $scope.changed = function (s,e) {
        $log.log('ST changed to: ' + $scope.starttime);
        $log.log('ET changed to: ' + $scope.endtime);
        $log.log('ET changed to: ' +s+'====--=='+e);

        $scope.tdif=parseInt(convert(e)-convert(s));
    };

    $scope.clear = function() {
        $scope.starttime = null;
    };




});


jungledrone.controller('event',function($scope,$state,$http,$cookieStore,$rootScope){

    $scope.form={};

    $scope.showdetails=function(ev){

        var target = ev.target || ev.srcElement || ev.originalTarget;


        //console.log('event-name'+$(target).attr('event-name'));
        //console.log(target);
        $('#eventdetailpopup').find('h3.evtitle').text($(target).attr('event-name'));
        $('#eventdetailpopup').find('h4.evttime').text($(target).attr('event-timerange'));
        $('#eventdetailpopup').find('h4.evtdate').text($(target).attr('event-daterange'));
        $('#eventdetailpopup').find('p.evtdesc').text($(target).attr('event-detail'));
        ///$('#eventdetailpopup').find('h3.evtdesc').text($(target).attr('event_description'));
        $('#eventdetailpopup').find('img.evimg').attr('src',$(target).attr('event-image'));
        $('#eventdetailpopup').modal('show');
    }

    $scope.eventrsvpsubmit=function(){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addeventrsvp',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $('#event-rsvp').modal('hide');
            $('#eventconatctModal').modal('show');
            $scope.eventrsvp.reset();
            //$rootScope.stateIsLoading = false;
            //console.log(data);
            // $scope.eventlist=data;
            // $scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));


        });


    }

    $scope.currentPage=1;
    $scope.perPage=3;
    $scope.begin=0;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
        console.log($scope.currentPage);
    };

    $scope.pageChanged = function(){
        $scope.begin=parseInt($scope.currentPage-1)*$scope.perPage;
        $scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'eventlistfrontlisting',
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        console.log(data);
        $scope.eventlist=data;
        $scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));


    });

    /*   $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.event_name.indexOf($scope.searchkey) != -1) || (item.event_daterange.indexOf($scope.searchkey) != -1)  ){
            return true;
        }
        return false;
    };


*/

    $scope.genderValidator=function(){


        console.log('in gender validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());



        if($scope.eventrsvp.$submitted){

            if(typeof ($("input[name='gender']:checked").val()) != 'undefined' )
            {
                $scope.gender_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.gender_error=true;
                return '';

            }

        }

    }

    $scope.openmodal=function(ev1){

        console.log('in rsvp modal');

        var target1 = ev1.target || ev1.srcElement || ev1.originalTarget;
        console.log($(target1));
        console.log($(target1).attr('class'));
        console.log($(target1).html());

        $scope.form.event_id=$(target1).attr('event-id');

        $('#event-rsvp').modal('show');

        var evval=$(target1).attr('event-id');
        console.log($(target1).attr('event-id'));
    }



});
jungledrone.controller('editevent', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams,Upload,$log) {

    $scope.eventId = $stateParams.eventId;
    $scope.form={};
    $scope.event_status=false;
    $scope.event_img=false;

    $http({
        method: 'POST',
        async: false,
        url: $scope.adminUrl + 'eventdetails',
        data: $.param({'id': $scope.eventId}),  // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data) {
        console.log(data);
        if(data.event_timerange=='all day') {
            $scope.allday=true;
        }
        else{

            var result = data.event_timerange.split('to');


            var sttime=result[0].split(':');
            var sthour=parseInt(sttime[0]);
            var stmin=parseInt(sttime[1]);

            var ettime=result[1].split(':');
            var ethour=parseInt(ettime[0]);
            var etmin=parseInt(ettime[1]);

            console.log('tc='+sthour+'tm'+stmin);
            console.log('sc='+ethour+'sm'+etmin);
            console.log('thetc='+data.event_timerange);

            var st=new Date();
            //console.log(st.getHours());
            st.setHours(sthour);
            st.setMinutes(stmin);
            var et=new Date();
            //console.log(st.getHours());
            et.setHours(ethour);
            et.setMinutes(etmin);
            $scope.endtime = et;
            $scope.starttime = st;
        }

        $scope.form = {
            id: data.id,
            event_name: data.event_name,
            event_description: data.event_description,
            event_image: data.event_image,
            //event_status: data.event_status,
            event_daterange: data.event_daterange,
            event_timerange: data.event_timerange,
            phone_no: data.phone_no,
            mobile_no: data.mobile_no,
            contact_time: data.contact_time,
        }

        $scope.event_img=data.event_image;

        if(data.event_status == 1 ) {
            $scope.form.event_status=true;
            $scope.event_status=true;
        }
        else{
            $scope.form.event_status=false;
            $scope.event_status=false;


        }
    });


    $scope.$watch('event_imgupload', function (files) {
        $scope.formUpload = false;
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (file) {
                    upload(file);
                })(files[i]);
            }
        }
    });

    $scope.getReqParams = function () {
        return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
        '&errorMessage=' + $scope.serverErrorMsg : '';
    };

    function upload(file) {
        $scope.errorMsg = null;
        uploadUsingUpload(file);
    }

    function uploadUsingUpload(file) {
        $('#loaderDiv').addClass('ng-hide');
        file.upload = Upload.upload({
            url: $scope.adminUrl+'uploadeventbanner' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            $('.progress').removeClass('ng-hide');
            file.result = response.data;

            $scope.event_img = response.data.image_url;
            $scope.form.event_image = response.data.image_name;

            $('#loaderDiv').addClass('ng-hide');


        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }



    /*file upload end */








    setTimeout(function(){
        jQuery('input[name="event_daterange"]').daterangepicker({
            /* timePicker: true,
             timePickerIncrement: 30,*/
            locale: {
                format: 'MM/DD/YYYY h:mm A'
            }
        });

        /*
         $('#timepicker1').timepicker({
         minuteStep: 1,
         template: 'modal',
         appendWidgetTo: 'body',
         showSeconds: true,
         showMeridian: false,
         defaultTime: false
         });
         */

    },4000);


    $scope.addeventsForm=function(){

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'eventupdates',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            //$rootScope.stateIsLoading = false;
            $state.go('event-list');
            console.log(data);
            /* if(data.status == 'error'){
             console.log(data);
             $('.email_div').append('<label class="control-label has-error validationMessage">This email already exists.</label>');
             }else{
             //console.log(data);
             //$cookieStore.put('user_insert_id',data);

             $state.go('finder-list');
             return;
             //console.log(data);
             }*/

        });



    }


    $scope.toggletimerange=function(){
        //console.log($scope.allday);
    }
    $scope.custom=function(){
        //console.log($scope.form);
        $scope.timeerror=false;
        $scope.form.event_status=$scope.event_status;
        //console.log($scope.timediff()+"test custom");
        if($scope.allday) {

            angular.element('#timeval').val('all day');
            $scope.form.timer='all day';

            return true;
        }
        if($scope.timediff()>0){

            console.log($scope.form.timer);
            $scope.form.timer=angular.element('input[ng-model="hours"]').eq(0).val()+' : ' +parseInt(angular.element('input[ng-model="minutes"]').eq(0).val()) +" to "+angular.element('input[ng-model="hours"]').eq(1).val()+' : ' +parseInt(angular.element('input[ng-model="minutes"]').eq(1).val());

            angular.element('#timeval').val(angular.element('input[ng-model="hours"]').eq(0).val()+' : ' +parseInt(angular.element('input[ng-model="minutes"]').eq(0).val()) +" to "+angular.element('input[ng-model="hours"]').eq(1).val()+' : ' +parseInt(angular.element('input[ng-model="minutes"]').eq(1).val()));
            return true ;
        }

        else {
            $scope.timeerror=true;
            return "Please set a correct time range for your event !!" ;
        }

        return true;
    }

    $scope.timediff= function () {

        /*console.log('td-'+parseInt($scope.endtime.getHours()-$scope.starttime.getHours()));
         console.log('md-'+parseInt($scope.endtime.getMinutes()-$scope.starttime.getMinutes()));*/


        ////console.log('td1-'+angular.element('input[ng-model="hours"]').eq(0).val());
        // console.log('td1-'+angular.element('input[ng-model="hours"]').eq(1).val());
        //console.log('md2-'+parseInt($scope.minutes));

        var totalst=parseInt(parseInt(angular.element('input[ng-model="hours"]').eq(0).val()*60)+parseInt(angular.element('input[ng-model="minutes"]').eq(0).val()));
        var totalet=parseInt(parseInt(angular.element('input[ng-model="hours"]').eq(1).val()*60)+parseInt(angular.element('input[ng-model="minutes"]').eq(1).val()));


        console.log('timediff'+parseInt(totalet-totalst));

        return parseInt(totalet-totalst);

        //
        /* console.log('td1-'+angular.element('input[ng-model="minutes"]').eq(0).val());
         console.log('td1-'+angular.element('input[ng-model="minutes"]').eq(1).val());*/
        //console.log('md2-'+parseInt($scope.minutes));
    }


    $scope.showtime=false;

    $scope.toggletimepicker=function(){

        console.log("before"+$scope.showtime);
        $scope.showtime=! $scope.showtime ;
        console.log("after"+$scope.showtime);
    }


    var st=new Date();
    //console.log(st.getHours());
    st.setHours(st.getHours());
    var et=new Date();
    //console.log(st.getHours());
    et.setHours(et.getHours()+1);
    $scope.endtime = et;
    $scope.starttime = st;

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = false;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.starttime = d;
        d.setHours( 15 );
        d.setMinutes( 0 );
        $scope.endtime = d;

        console.log('st'+$scope.starttime);
        console.log('et'+$scope.endtime);
    };

    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.starttime);
    };

    $scope.clear = function() {
        $scope.starttime = null;
    };




})

jungledrone.controller('eventlist',function($scope,$state,$http,$cookieStore,$rootScope){



    $scope.currentPage=1;
    $scope.perPage=3;
    $scope.begin=0;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
        console.log($scope.currentPage);
    };

    $scope.pageChanged = function(){
        $scope.begin=parseInt($scope.currentPage-1)*$scope.perPage;
        $scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'eventlist',
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        console.log(data);
        $scope.eventlist=data;
        $scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));


    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.event_name.indexOf($scope.searchkey) != -1) || (item.event_daterange.indexOf($scope.searchkey) != -1)  ){
            return true;
        }
        return false;
    };

    $scope.delevent = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.eventlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'deleteevent',
            data    : $.param({id: $scope.eventlist[idx].id}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.eventlist.splice(idx,1);
            $scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));

        });
    }


    $scope.changeStatus = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.eventlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'updateeventstatus',
            data    : $.param({id: $scope.eventlist[idx].id,event_status: $scope.eventlist[idx].event_status}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.eventlist[idx].status = !$scope.eventlist[idx].status;
        });
    }






});



jungledrone.controller('flightlist',function($scope,$state,$http,$cookieStore,$rootScope,uibDateParser){





    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();
    $scope.open = function(opened) {
        //$event.preventDefault();
        //$event.stopPropagation();

        $scope[opened] = true;
    };


    $scope.resetdaterange=function(){

        $scope.edate=null;
        $scope.sdate=null;
        $('input[name="edate"]').val('');
        $('input[name="sdate"]').val('');
    }

    $scope.currentPage=1;
    $scope.perPage=3;
    $scope.begin=0;

    $scope.predicate = 'realdatef';
    $scope.reverse = false;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
        console.log($scope.currentPage);
    };


    $scope.order = function(predicate) {
        console.log('in sort section');
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };

    $scope.pageChanged = function(){
        $scope.begin=parseInt($scope.currentPage-1)*$scope.perPage;
        $scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'flightlist'+'?userid='+$rootScope.userid+'&role='+$rootScope.userrole,
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        console.log(data);
        $scope.eventlist=data;
        $scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));


    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.fflight.indexOf($scope.searchkey) != -1) || (item.lflight.indexOf($scope.searchkey) != -1) || (item.datef.indexOf($scope.searchkey) != -1)  ){
            return true;
        }
        return false;
    };


    $scope.setdata = function(item){

        /*console.log('daterange'+item);

        console.log('in set data ');
        console.log($scope.sdate+'in set data s');
        console.log($scope.edate+'in set data  e');*/

        $scope.nedate=convert($scope.edate);
        $scope.nsdate=convert($scope.sdate);
        if(typeof ($scope.edate)!='undefined' && typeof ($scope.sdate)!='undefined' && $scope.edate!=null && $scope.sdate!=null) {

            console.log($scope.nedate + 'ed');
            console.log($scope.nsdate + 'sd');
            console.log(item.realdatef + 'red');
            //if ($scope.edate.lenght > 0 && $scope.sdate.length > 0) {



                if (item.realdatef <= $scope.nedate && item.realdatef >= $scope.nsdate)
                    return true;
                else return false;
          //  }

            //return false;
        }
        else{
            return true;
        }
    };

    $scope.delflight = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.eventlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'delflight?role='+$rootScope.userrole,
            data    : $.param({id: $scope.eventlist[idx].id}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.eventlist.splice(idx,1);
            $scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));

        });
    }


    $scope.changeStatus = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.eventlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'updateeventstatus',
            data    : $.param({id: $scope.eventlist[idx].id,event_status: $scope.eventlist[idx].event_status}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.eventlist[idx].status = !$scope.eventlist[idx].status;
        });
    }






});

jungledrone.controller('admin_header', function($scope,$state,$http,$cookieStore,$rootScope) {
    // $state.go('login');
    angular.element('head').append('<link id="home" href="css/admin_style.css" rel="stylesheet">');

    $scope.toggledropdown=function(){

        //angular.element('.user-manu-dropdown').toggleClass('open');
        console.log('in user login');
    }


    //angular.element('head').append('<script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>');
    //angular.element('head').append('<script src="ng-js/ui-bootstrap-tpls-0.14.3.min.js"></script>');
    if(angular.element('head').find('script[src="plugins/fastclick/fastclick.min.js"]').length==0)
        angular.element('head').append('<script src="plugins/fastclick/fastclick.min.js"></script>');
    if(angular.element('head').find('script[src="dist/js/app.min.js"]').length==0)
        angular.element('head').append('<script src="dist/js/app.min.js"></script>');
    if(angular.element('head').find('script[src="plugins/sparkline/jquery.sparkline.min.js"]').length==0)
        angular.element('head').append('<script src="plugins/sparkline/jquery.sparkline.min.js"></script>');
    if(angular.element('head').find('script[src="plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"]').length==0)
        angular.element('head').append('<script src="plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>');
    if(angular.element('head').find('script[src="plugins/jvectormap/jquery-jvectormap-world-mill-en.js"]').length==0)
        angular.element('head').append('<script src="plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>');
    if(angular.element('head').find('script[src="plugins/slimScroll/jquery.slimscroll.min.js"]').length==0)
        angular.element('head').append('<script src="plugins/slimScroll/jquery.slimscroll.min.js"></script>');
    if(angular.element('head').find('script[src="dist/js/pages/dashboard2.js"]').length==0)
        angular.element('head').append('<script src="dist/js/pages/dashboard2.js"></script>');
    if(angular.element('head').find('script[src="dist/js/demo.js"]').length==0)
        angular.element('head').append('<script src="dist/js/demo.js"></script>');
    /*
     angular.element('head').append('<script>+setTimeout(function(){
     $('input[name="event_daterange"]').daterangepicker({
     timePicker: true,
     timePickerIncrement: 30,
     locale: {
     format: 'MM/DD/YYYY h:mm A'
     }
     });
     }, 2000);)+'</script>'
     */



    $rootScope.logout = function () {
        $cookieStore.remove('userid');
        $cookieStore.remove('username');
        $cookieStore.remove('userrole');
        $cookieStore.remove('useremail');
        $cookieStore.remove('userfullname');

        $rootScope.userrole=0;
        $rootScope.userfullname=0;
        $rootScope.userid=0;
        $rootScope.userrole=0;

        console.log('in logout');
        $state.go('index');
    }

    if (typeof($cookieStore.get('userid')) != 'undefined' && $cookieStore.get('userid') > 0) {

        $rootScope.userfullname=$cookieStore.get('userfullname');
        $rootScope.userid=$cookieStore.get('userid');
        $rootScope.userrole=$cookieStore.get('userrole');
        console.log($rootScope.userfullname);
    }
    else{
        $rootScope.userid=0;
        $state.go('login');
    }





// console.log('in admin header');
});


jungledrone.controller('services', function($scope,$state,$http,$cookieStore,$rootScope) {
    // $state.go('login');
    angular.element('head').append('<link id="home" href="css/admin_style.css" rel="stylesheet">');

    setTimeout(function(){

        $('.vmtog').click(function(){

            console.log('in');
            //$(this).css('margin-top','-20px');
            $(this).prev('div').stop(true, true).delay(500).toggleClass('ng-hide');
            $(this).prev().prev('p').stop(true, true).delay(500).toggleClass('ng-hide');

            var text = $(this).html() == 'View more' ? 'Close' : 'View more';
            $(this).html(text);
        });


},2000);
});


jungledrone.controller('stockphoto', function($scope,$state,$http,$cookieStore,$rootScope) {
    // $state.go('login');
   //  $scope.categorylist=[];
    $scope.type='Stock Image';
    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'junglecategorylist',
        data    : $.param({'type':$scope.type}),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;
       // console.log($scope.categorylist);
/*
        angular.forEach(data, function(value, key){
            console.log(value.type);
            if(value.type == "Stock Image") {
                $scope.categorylist.push(value);
            }
        });
        console.log($scope.categorylist);
*/
    })

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'jungleproductlist',
        data    : $.param({'type':$scope.type}),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.productlist=data;
    })




    $scope.showmodal=function($ev){

        var target = $ev.target || $ev.srcElement || $ev.originalTarget;

        console.log($(target).html());
        console.log($(target).attr('class'));
        $('#gallerymodal').find('h2').find('img').attr('src','');
        $('#gallerymodal').find('h2').find('img').attr('src',$(target).attr('imgsrc'));

        $('#gallerymodal').modal('show');
        // $(event.target).parent().parent().css('display','none');


    }

});

jungledrone.controller('dashboard', function($scope,$state,$http,$cookieStore,$rootScope) {
    // $state.go('login');

    $scope.logout = function () {
        $cookieStore.remove('userid');
        $cookieStore.remove('username');
        $cookieStore.remove('useremail');
        $cookieStore.remove('userfullname');
        $state.go('index');
    }

});


jungledrone.controller('pilotregistration', function($scope,$state,$http,$cookieStore,$rootScope) {
    // $state.go('login');

   /* $scope.logout = function () {
        $cookieStore.remove('userid');
        $cookieStore.remove('username');
        $cookieStore.remove('useremail');
        $cookieStore.remove('userfullname');
        $state.go('index');
    }*/


    $scope.form={};
    $scope.form.country={};

    setTimeout(function(){
        $('#country').val(20);
    },2000);
    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'countryList',
        data    : $.param({'uid':$scope.userid}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        console.log(data);
        $scope.form.country={};
        $scope.form.country.s_name='Belize';
        $('#country').val(20);
        $scope.countrylist=data;
    });

    $scope.form={};
    $scope.drone_error= false;
    $scope.gender_error= false;
    $scope.dronerace_error= false;


    $scope.openlogin=function(){

        $('#pilotsuccess').modal('hide');

        setTimeout(function(){

            $state.go('login');

        },1200);

    }

    $scope.sub1 = function(){

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addpilot',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $('#pilotsuccess').modal('show');
            $scope.signupForm.reset();


            setTimeout(function(){

                $scope.form.country={};
                $scope.form.country.s_name='Belize';
                $('#country').val(20);

            },3000);
            //$scope.signupForm={fname:'',lname:''};


        });






    }

    $scope.droneValidator=function(){


        //console.log('in drone validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());

        if($scope.signupForm.$submitted){

            if(typeof ($("input[name='drone']:checked").val()) != 'undefined' )
            {
                $scope.drone_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.drone_error=true;
                return '';

            }

        }

    }

    $scope.genderValidator=function(){


        //console.log('in drone validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());

        if($scope.signupForm.$submitted){

            if(typeof ($("input[name='gender']:checked").val()) != 'undefined' )
            {
                $scope.gender_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.gender_error=true;
                return '';

            }

        }

    }
    $scope.dronraceeValidator=function(){


        //console.log('in drone validator');
        //console.log($scope.signupForm.$submitted);
        //console.log($("input[name='drone']:checked").val());

        if($scope.signupForm.$submitted){

            if(typeof ($("input[name='dron_race']:checked").val()) != 'undefined' )
            {
                $scope.dronerace_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.dronerace_error=true;
                return '';

            }

        }

    }



});



function exportTableToCSV ($table, filename) {

    var $rows = $table.find('tr:has(td)'),

    // Temporary delimiter characters unlikely to be typed by keyboard
    // This is to avoid accidentally splitting the actual contents
        tmpColDelim = String.fromCharCode(11), // vertical tab character
        tmpRowDelim = String.fromCharCode(0), // null character

    // actual delimiter characters for CSV format
        colDelim = '","',
        rowDelim = '"\r\n"',

    // Grab text from table into CSV formatted string
        csv = '"' + $rows.map(function (i, row) {
                var $row = $(row),
                    $cols = $row.find('td');

                return $cols.map(function (j, col) {
                    var $col = $(col),
                        text = $col.text();

                    return text.replace(/"/g, '""'); // escape double quotes

                }).get().join(tmpColDelim);

            }).get().join(tmpRowDelim)
                .split(tmpRowDelim).join(rowDelim)
                .split(tmpColDelim).join(colDelim) + '"',

    // Data URI
        csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

    $(this)
        .attr({
            'download': filename,
            'href': csvData,
            'target': '_blank'
        });
}




function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
   // return [ date.getFullYear(), mnth, day ].join("-");
    return new Date(date).getTime() / 1000
}


jungledrone.controller('addcategoryjungle',function($scope,$state,$http,$cookieStore,$rootScope){

    $http({
        method  :   'POST',
        async   :   false,

        url :       $scope.adminUrl+'parentcategorylist',
        // data    : $.param($scope.form),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;

    })

    $scope.tinymceOptions = {
        trusted: true,
        theme: 'modern',
        plugins: [
            'advlist autolink link  lists charmap   hr anchor pagebreak spellchecker',
            'searchreplace wordcount visualblocks visualchars code  insertdatetime  nonbreaking',
            'save table contextmenu directionality  template paste textcolor'
        ],
        // toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
        toolbar: ' undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  |   media fullpage | forecolor backcolor',
    };

    $scope.form= {cat_image:''};
    $scope.getReqParams = function () {
        return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
        '&errorMessage=' + $scope.serverErrorMsg : '';
    };

    $scope.$watch('product_upload', function (files) {
        $('.errormsg').html('');
        $scope.formUpload = false;
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (file) {
                    upload(file);
                })(files[i]);
            }
        }
    });


    function upload(file) {
        $scope.errorMsg = null;
        uploadUsingUpload(file);
    }

    function uploadUsingUpload(file) {

        $('#loaderDiv').addClass('ng-hide');
        file.upload = Upload.upload({
            url: $scope.adminUrl+'uploadjunglecategoryimage' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            // console.log(response.data.status);
            if(response.data.status=='error'){
                $('.errormsg').html('Invalid file type.');
            }
            else {
                $('.progress').removeClass('ng-hide');
                file.result = response.data;

                if(response.data.image_url!='') {
                    $scope.cat_img_src = response.data.image_url;
                }

                $scope.form.cat_image = response.data.image_name;



            }


        }, function (response) {
            console.log(response.status);
            if(response.data.status>0) {

                //  $scope.errorMsg = response.status + ': ' + response.data;
            }

        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }




    $scope.addcategorysubmit=function() {


        $http({
            method  :   'POST',
            async   :   false,

            url :       $scope.adminUrl+'addjunglecategory',
            data    : $.param($scope.form),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(){
            $state.go('category-list');

        })

    }




})
jungledrone.controller('junglecategorylist',function($scope,$state,$http,$cookieStore,$rootScope,$uibModal,$sce){
    $scope.trustAsHtml=$sce.trustAsHtml;

    $scope.predicate = 'id';
    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };
    $scope.currentPage=1;
    $scope.perPage=10;

    $scope.totalItems = 0;

    $scope.filterResult = [];

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'junglecategorylist',
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;
    })
    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.cat_name.indexOf($scope.searchkey) != -1) || (item.cat_desc.indexOf($scope.searchkey) != -1) || (item.type.indexOf($scope.searchkey) != -1) || (item.priority.indexOf($scope.searchkey) != -1)|| (item.status.indexOf($scope.searchkey) != -1) || (item.parent_cat_name.indexOf($scope.searchkey) != -1)){
            return true;
        }
        return false;
    };

    $scope.jungledelcategory = function(item,size){

        $scope.currentindex=$scope.categorylist.indexOf(item);

        $uibModal.open({
            animation: true,
            templateUrl: 'junglecategorydelconfirm.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope
        });
    }

    $scope.changestatus = function(item,size){

        $scope.currentindex=$scope.categorylist.indexOf(item);

        $uibModal.open({
            animation: true,
            templateUrl: 'junglecategorystatusfirm.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope
        });
    }



})

jungledrone.controller('editcategoryjungle', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams){

    $http({
        method  :   'POST',
        async   :   false,

        url :       $scope.adminUrl+'parentcategorylist',
        // data    : $.param($scope.form),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;

    })

    $scope.form= {cat_image:''};

    $scope.id=$stateParams.id;

    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'junglecategorydetails',
        data    : $.param({'id':$scope.id}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {

        $scope.form = {
            id: data.id,

            cat_name: data.cat_name,
            cat_desc: data.cat_desc,
            parent_cat: {
                id:data.parent_cat
            },
            type: data.type,
            priority: data.priority,
            cat_image: data.cat_image,


        }
    });
    $scope.tinymceOptions = {
        trusted: true,
        theme: 'modern',
        plugins: [
            'advlist autolink link  lists charmap   hr anchor pagebreak spellchecker',
            'searchreplace wordcount visualblocks visualchars code  insertdatetime  nonbreaking',
            'save table contextmenu directionality  template paste textcolor'
        ],
        // toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
        toolbar: ' undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  |   media fullpage | forecolor backcolor',
    };

    $scope.getReqParams = function () {
        return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
        '&errorMessage=' + $scope.serverErrorMsg : '';
    };

    $scope.$watch('product_upload', function (files) {
        $('.errormsg').html('');
        $scope.formUpload = false;
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (file) {
                    upload(file);
                })(files[i]);
            }
        }
    });


    function upload(file) {
        $scope.errorMsg = null;
        uploadUsingUpload(file);
    }

    function uploadUsingUpload(file) {

        $('#loaderDiv').addClass('ng-hide');
        file.upload = Upload.upload({
            url: $scope.adminUrl+'uploadjunglecategoryimage' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            // console.log(response.data.status);
            if(response.data.status=='error'){
                $('.errormsg').html('Invalid file type.');
            }
            else {
                $('.progress').removeClass('ng-hide');
                file.result = response.data;

                if(response.data.image_url!='') {
                    $scope.cat_img_src = response.data.image_url;
                }

                $scope.form.cat_image = response.data.image_name;



            }


        }, function (response) {
            console.log(response.status);
            if(response.data.status>0) {

                //  $scope.errorMsg = response.status + ': ' + response.data;
            }

        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }


    $scope.editcategorysubmit = function () {
        console.log(1);
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'junglecategoryupdates',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $state.go('category-list');
            return;
        });
    }


})


jungledrone.controller('addproductjungle',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce){
    $scope.trustAsHtml=$sce.trustAsHtml;
    $http({
        method  :   'POST',
        async   :   false,

        url :       $scope.adminUrl+'junglecategorylist',
        // data    : $.param($scope.form),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;

    })

    $scope.tinymceOptions = {
        trusted: true,
        theme: 'modern',
        plugins: [
            'advlist autolink link  lists charmap   hr anchor pagebreak spellchecker',
            'searchreplace wordcount visualblocks visualchars code  insertdatetime  nonbreaking',
            'save table contextmenu directionality  template paste textcolor'
        ],
        // toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
        toolbar: ' undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  |   media fullpage | forecolor backcolor',
    };


    $scope.product_video_src='';
    $scope.product_img_src='';

    $scope.form= {product_file:''};
    $scope.getReqParams = function () {
        return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
        '&errorMessage=' + $scope.serverErrorMsg : '';
    };

    $scope.$watch('product_upload', function (files) {
        $('.errormsg').html('');
        $scope.formUpload = false;
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (file) {
                    upload(file);
                })(files[i]);
            }
        }
    });


    function upload(file) {
        $scope.errorMsg = null;
        uploadUsingUpload(file);
    }

    function uploadUsingUpload(file) {

        $('#loaderDiv').addClass('ng-hide');
        file.upload = Upload.upload({
            url: $scope.adminUrl+'uploadjungleproductimage' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            // console.log(response.data.status);
            if(response.data.status=='error'){
                $('.errormsg').html('Invalid file type.');
            }
            else {
                $('.progress').removeClass('ng-hide');
                file.result = response.data;
                if(response.data.video_url!='') {
                    $sce.trustAsResourceUrl(response.data.video_url);
                    $scope.product_video_src = response.data.video_url;
                }
                if(response.data.image_url!='') {
                    $scope.product_img_src = response.data.image_url;
                }

                $scope.form.product_file = response.data.image_name;
                console.log($scope.product_video_src);

                if(typeof($scope.product_video_src)!='undefined') {

                    console.log(11);
                    setTimeout(function () {

                        angular.element(document.querySelector('#maintvDiv')).html('<video id="maintvVideo" volume="0" width="100%" height="100%" autoplay loop muted controls>\
            <source src="' + $scope.product_video_src + '" type="video/mp4">\
            </video>');
                    }, 2000);

                }



            }


        }, function (response) {
            console.log(response.status);
            if(response.data.status>0) {

                //  $scope.errorMsg = response.status + ': ' + response.data;
            }

        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }


    console.log($scope.product_video_src);



    $scope.addproductsubmit=function() {


        $http({
            method  :   'POST',
            async   :   false,

            url :       $scope.adminUrl+'addjungleproduct',
            data    : $.param($scope.form),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(){
            $state.go('product-list');

        })

    }




})
jungledrone.controller('jungleproductlist',function($scope,$state,$http,$cookieStore,$rootScope,$uibModal,$sce){
    $scope.trustAsHtml=$sce.trustAsHtml;

    $scope.predicate = 'id';
    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };
    $scope.currentPage=1;
    $scope.perPage=10;

    $scope.totalItems = 0;

    $scope.filterResult = [];

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'jungleproductlist',
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.productlist=data;
    })
    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.product_name.indexOf($scope.searchkey) != -1) || (item.product_desc.indexOf($scope.searchkey) != -1)  || (item.priority.indexOf($scope.searchkey) != -1)|| (item.status.indexOf($scope.searchkey) != -1) || (item.cat_name.indexOf($scope.searchkey) != -1)){
            return true;
        }
        return false;
    };

    $scope.jungledelproduct = function(item,size){

        $scope.currentindex=$scope.productlist.indexOf(item);

        $uibModal.open({
            animation: true,
            templateUrl: 'jungleproductdelconfirm.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope
        });
    }

    $scope.changeproductstatus = function(item,size){

        $scope.currentindex=$scope.productlist.indexOf(item);

        $uibModal.open({
            animation: true,
            templateUrl: 'jungleproductstatusfirm.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope
        });
    }



})

jungledrone.controller('editproductjungle', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams,$sce,Upload){
    $scope.trustAsHtml=$sce.trustAsHtml;
    $scope.product_video_src='';
    $scope.product_img_src='';

    $http({
        method  :   'POST',
        async   :   false,

        url :       $scope.adminUrl+'junglecategorylist',
        // data    : $.param($scope.form),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;

    })

    $scope.id=$stateParams.id;

    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'jungleproductdetails',
        data    : $.param({'id':$scope.id}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {

        if(data.image_url!=''){
            $scope.product_img_src = data.image_url;
        }
        console.log($scope.product_img_src);
        if(data.video_url!=''){

            $scope.product_video_src = data.video_url;
            if(typeof($scope.product_video_src)!='undefined') {

                setTimeout(function () {

                    angular.element(document.querySelector('#maintvDiv')).html('<video id="maintvVideo" volume="0" width="100%" height="100%" autoplay loop muted controls>\
            <source src="' + $scope.product_video_src + '" type="video/mp4">\
            </video>');
                }, 2000);
            }
        }

        $scope.form = {
            id: data.id,

            product_name: data.product_name,
            product_desc: data.product_desc,
            category_id: {
                id:data.category_id,
                type:data.type,
            },
            product_file: data.product_file,
            priority: data.priority,

        }
    });


    $scope.tinymceOptions = {
        trusted: true,
        theme: 'modern',
        plugins: [
            'advlist autolink link  lists charmap   hr anchor pagebreak spellchecker',
            'searchreplace wordcount visualblocks visualchars code  insertdatetime  nonbreaking',
            'save table contextmenu directionality  template paste textcolor'
        ],
        // toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
        toolbar: ' undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  |   media fullpage | forecolor backcolor',
    };


    $scope.product_video_src='';
    $scope.product_img_src='';

    $scope.form= {product_file:''};
    $scope.getReqParams = function () {
        return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
        '&errorMessage=' + $scope.serverErrorMsg : '';
    };

    $scope.$watch('product_upload', function (files) {
        $('.errormsg').html('');
        $scope.formUpload = false;
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (file) {
                    upload(file);
                })(files[i]);
            }
        }
    });


    function upload(file) {
        $scope.errorMsg = null;
        uploadUsingUpload(file);
    }

    function uploadUsingUpload(file) {

        $('#loaderDiv').addClass('ng-hide');
        file.upload = Upload.upload({
            url: $scope.adminUrl+'uploadjungleproductimage' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            // console.log(response.data.status);
            if(response.data.status=='error'){
                $('.errormsg').html('Invalid file type.');
            }
            else {
                $('.progress').removeClass('ng-hide');
                file.result = response.data;
                if(response.data.video_url!='') {
                    $sce.trustAsResourceUrl(response.data.video_url);
                    $scope.product_video_src = response.data.video_url;
                }
                if(response.data.image_url!='') {
                    $scope.product_img_src = response.data.image_url;
                }

                $scope.form.product_file = response.data.image_name;
                console.log($scope.product_video_src);

                if(typeof($scope.product_video_src)!='undefined') {

                    console.log(11);
                    setTimeout(function () {

                        angular.element(document.querySelector('#maintvDiv')).html('<video id="maintvVideo" volume="0" width="100%" height="100%" autoplay loop muted controls>\
            <source src="' + $scope.product_video_src + '" type="video/mp4">\
            </video>');
                    }, 2000);

                }



            }


        }, function (response) {
            console.log(response.status);
            if(response.data.status>0) {

                //  $scope.errorMsg = response.status + ': ' + response.data;
            }

        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }






    $scope.editproductsubmit=function() {


        $http({
            method  :   'POST',
            async   :   false,

            url :       $scope.adminUrl+'jungleproductupdates',
            data    : $.param($scope.form),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(){
            $state.go('product-list');

        })

    }



})







