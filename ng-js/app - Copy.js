/**
 * Created by debasis on 18/7/15.
 */


'use strict';

/* App Module */

var printbook = angular.module('printbook', [
    'ui.router',
    'ngAnimate',
    'angularValidator',
    'ngCookies',
    'ngDialog',
    'ngFacebook',
    'ngFileUpload'
    // 'homeControllers'
]);

printbook.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9]/g, '');

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits,10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});

printbook.config(function($stateProvider, $urlRouterProvider,$facebookProvider) {
    $facebookProvider.setAppId('130017683726086').setPermissions(['email','user_friends']);
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider
        .otherwise("/index");
    //
    // Now set up the states
    $stateProvider
        .state('index',{
            url:"/index",
            resolve:{
                'MyServiceData':function(MyService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise with the $q service
                    return MyService.promise;
                }
            },
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'index.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/first-clearfix.html',
                    controller: 'login'
                },
                'second-clearfix': {
                    templateUrl: 'partials/second-clearfix.html',
                    controller: 'secondclearfix'
                },
                'thired-clearfix': {
                    templateUrl: 'partials/thired-clearfix.html',
                    controller: 'thirdclearfix'
                },
                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )
        .state('about',{
            url:"/about",
            templateUrl: 'about.html',
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/aboutbody.html',
                    controller: 'aboutbody'
                },
                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )
        .state('testimonial',{
            url:"/testimonial",
            resolve:{
                'MyServiceData':function(MyService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise with the $q service
                    return MyService.promise;
                }
            },
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/testimonialbody.html',
                    controller: 'testimonialbody'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )


        .state('shoppingcart',{
            url:"/shoppingcart",

            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/shoppingcart.html',
                    controller: 'shoppingcart'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )


        .state('contact',{
            url:"/contact",
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'

                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/contactbody.html',
                    controller: 'firstclearfix'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )


        .state('customize',{
            url:"/customize/:categoryId",
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/customize.html',
                     controller: 'customize'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )

        .state('customizeproduct',{
            url:"/customizeproduct/:productId",
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/customizeproduct.html',
                    controller: 'customizeproduct'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )



        .state('login',{
            url:"/login",
            resolve:{
                'MyServiceData':function(MyService){
                    // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise with the $q service
                    return MyService.promise;
                }
            },
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/login.html',
                    controller: 'login'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )


        .state('googlelogin',{
            url:"/googlelogin",

            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/login.html',
                    controller: 'googlelogin'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )
        .state('register',{
            url:"/register",
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/register.html',
                    controller: 'register'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )


        .state('terms',{
            url:"/terms",
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/terms.html'
                    // controller: 'testimonialbody'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )



        .state('privacy',{
            url:"/privacy",
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/privacy.html'
                    // controller: 'testimonialbody'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )

        .state('disc',{
            url:"/disc",
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'scotchController'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/disc.html'
                    // controller: 'testimonialbody'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )



        .state('logout',{
            url:"/logout",
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'logout'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html',
                    controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/disc.html',
                     controller: 'logout'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )


        .state('ontimepasswordchange',{
            url:"/ontimepasswordchange/:userId",
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'logout'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html'
                    // controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/disc.html',
                    controller: 'autologin'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )



        .state('checkOut',{
            url:"/checkOut",
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'logout'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html'
                    // controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/checkout.html',
                    controller: 'checkOut'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )


        .state('payment',{
            url:"/payment",
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'loader': { templateUrl: 'partials/loader.html' ,
                    controller:'loader'

                },

                // for column two, we'll define a separate controller
                'modal': {
                    templateUrl: 'partials/modal.html'
                    //controller: 'logout'
                },
                'topbar': {
                    templateUrl: 'partials/topbar.html',
                    controller: 'shoppingcart'
                },
                'header': {
                    templateUrl: 'partials/inner-header.html',
                    controller: 'header'
                },
                'header-bottom': {
                    templateUrl: 'partials/header-bottom.html'
                    // controller: 'checkstattus'
                },
                'first-clearfix': {
                    templateUrl: 'partials/payment.html',
                    controller: 'payment'
                },

                'svgs': {
                    templateUrl: 'partials/svgs.html'
                    //controller: 'scotchController'
                },
                'footer': {
                    templateUrl: 'partials/footer.html'
                    //controller: 'scotchController'
                }
            }
        }

    )




        .state('loader', {
            url: "/loader",
            templateUrl: "partials/loader.html"
        })
        .state('state1', {
            url: "/state1",
            templateUrl: "partials/state1.html"
        })
        .state('state1.list', {
            url: "/list",
            templateUrl: "partials/state1.list.html",
            controller: function($scope) {
                $scope.items = ["A", "List", "Of", "Items"];
            }
        })
        .state('state2', {
            url: "/state2",
            templateUrl: "partials/state2.html"
        })
        .state('state2.list', {
            url: "/list",
            templateUrl: "partials/state2.list.html",
            controller: function($scope) {
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        });
})

    .run(['$rootScope', '$window', function($rootScope, $window) {
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        $rootScope.$on('fb.load', function() {
            $window.dispatchEvent(new Event('fb.load'));
        });
    }]);



printbook.controller('loader', function($scope) {



    $scope.init = function () {
        // check if there is query in url
        // and fire search in case its value is not empty
        //alert(99);
        $('#loader').delay(300).fadeOut('slow');
        $('#loader-container').delay(200).fadeOut('slow');
        $('body').delay(300).css({'overflow':'visible'});




    };
    $scope.init();

});




printbook.controller('firstclearfix', function($scope,$http,ngDialog,$state,MyService) {




    $scope.submitcontactForm = function(){
        //alert("Form submitted");
        $scope.msgFlag=false;
        var posting=ngDialog.open({
            template: '<p>In Progress .. Please wait ! </p>',
            plain: true
        });

        $http({
            method  : 'POST',
            async:   false,
            url     : 'http://admin.printbook.in/ngmodule/contactcreate',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            posting.close();
            ngDialog.open({
                template: '<p>Thank You! We will get back to you asap !! </p>',
                plain: true
            });

            // ngDialog.closeAll();
            // $scope.form.$setPristine();
            //$scope.contact.$setUntouched();
            $state.reload();

        });

    };



    var data=(MyService.doStuff('banner'));
    //alert(data);

    $scope.friends=(data);


    $scope.init = function () {
        // check if there is query in url
        // and fire search in case its value is not empty

        var x;










        $('#owl-home').owlCarousel({
            loop:true,
            margin:30,
            autoplay:true,
            autoplayTimeout:3000,
            autoplayHoverPause:true,
            nav:false,
            dots:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        });

        //$scope.callhttp();


    };
    setTimeout(function(){
        $scope.init();

    },2000);



});





printbook.controller('header', function($scope,$http,ngDialog,$state,MyService) {







    var data=(MyService.doStuff('category'));
    //alert(data);
    console.log(data);

    $scope.categories=(data);





});




printbook.service('MyService', function($http) {
    var myData = null;
    var testimonialjson = null;
    var categoryjson = null;

    var promise = $http.get('http://admin.printbook.in/ngmodule/getbanners').success(function (data) {
        //alert(data);
        myData=data;
    });
    var testimonialdata = $http.get('http://admin.printbook.in/ngmodule/gettestimonials').success(function (testimonials) {
        //alert(testimonials);
        testimonialjson=testimonials;
    });
    var categorydata = $http.get('http://admin.printbook.in/ngmodule/getcategories').success(function (category) {
        //alert(testimonials);
        categoryjson=category;
    });

    return {
        promise:promise,
        setData: function (data) {
            myData = data;
        },
        doStuff: function (t) {
            //alert(myData);
            if(t=='banner')
            //alert(data);
                return myData;//.getSomeData();
            if(t=='testimonial'){
                return testimonialjson;

            }

            if(t=='category'){
                return categoryjson;

            }
        },
        putdata:function(userInfo){

            /*  $scope.userinfo['name']=userInfo['displayName'];
             $scope.userinfo['id']=userInfo['id'];
             $scope.userinfo['email']=userInfo['emails'][0]['value'];*/
            //alert("uin"+userInfo)






        }
    };

});


printbook.controller('googlelogin',function($scope,$http,$state,$cooke){


    $http({
        method  : 'POST',
        async:   false,
        url     : 'http://admin.printbook.in/ngmodule/facebooklogin',
        data    : {name:userInfo['displayName'],email:userInfo['emails'][0]['value'],id:userInfo['id']},  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        //alert(data);
        if(data>0){

            $cookieStore.put('useremail',userInfo['emails'][0]['value']);
            $cookieStore.put('userid',data);
            //var t=$cookieStore.get('userid');
            //alert($cookieStore.get('userid'));

            $state.go('index');
            //loginprocess.close();

        }
        else{
            alert(8);
            //$scope.msgFlag=true;
            $cookieStore.put('useremail','');
            $cookieStore.put('userid',data);

        }

    });

});




printbook.controller('testimonialbody', function($scope,$http,ngDialog,$state,MyService) {








    var data=(MyService.doStuff('testimonial'));
    //alert(data);

    $scope.testimonial=(data);


    $scope.curPage = 0;
    $scope.pageSize = 6;

    $scope.numberOfPages = function()
    {
        return Math.ceil($scope.testimonial.length / $scope.pageSize);
    };







});

printbook.filter('pagination', function()
{
    return function(input, start)
    {
        start = +start;
        return input.slice(start);
    };
});

printbook.controller('secondclearfix', function($scope,MyService) {


    var data=(MyService.doStuff('category'));
    //alert(data);
    $scope.categories=data;

    $scope.init = function () {



        // check if there is query in url
        // and fire search in case its value is not empty





        $('#owl-featured').owlCarousel({
            loop:true,
            margin:15,
            nav:true,
            dots:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:4
                }
            }
        })


    };
    setTimeout(function() {
        $scope.init();
    },1000);


});


printbook.controller('thirdclearfix', function($scope,MyService) {

    var data=(MyService.doStuff('category'));
    //alert(data);
    $scope.categories=data;



    $scope.init = function () {
        // check if there is query in url
        // and fire search in case its value is not empty





        $('#owl-recent').owlCarousel({
            loop:true,
            margin:15,
            nav:true,
            dots:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:4
                }
            }
        })


    };
    setTimeout(function() {
        $scope.init();
    },1000);


});



printbook.controller('aboutbody', function($scope) {



    $scope.init = function () {
        // check if there is query in url
        // and fire search in case its value is not empty





        //alert(87);


    };
    setTimeout(function() {
        $scope.init();
    },1000);


});

printbook.controller('login', function($scope,$http,$state,$cookieStore,$cookies,$facebook,MyService) {
    $scope.triggeredLogin=0;
    $scope.loginflag=true;
    $scope.contactflag=false;

    if($cookieStore.get('userid')>0){
        //alert($cookieStore.get('userid'));
        $scope.loginflag=false;
        $scope.contactflag=true;

    }
    //var loginprocess
    $scope.userinfo;


    $scope.signedIn = false;




    $scope.submitcontactForm = function(){
        //alert("Form submitted");
        $scope.msgFlag=false;
        var posting=ngDialog.open({
            template: '<p>In Progress .. Please wait ! </p>',
            plain: true
        });

        $http({
            method  : 'POST',
            async:   false,
            url     : 'http://admin.printbook.in/ngmodule/contactcreate',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            posting.close();
            ngDialog.open({
                template: '<p>Thank You! We will get back to you asap !! </p>',
                plain: true
            });

            // ngDialog.closeAll();
            // $scope.form.$setPristine();
            //$scope.contact.$setUntouched();
            $state.reload();

        });

    };


    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function(authResult) {
        // Do a check if authentication has been successful.
        if(authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;
            gapi.client.request(
                {
                    'path':'/plus/v1/people/me',
                    'method':'GET',
                    'callback': $scope.userInfoCallback
                }
            );

            //     ...
            // Do some work [1].
            //     ...
        } else {
            // Error while signing in.
            $scope.signedIn = false;
            $scope.renderSignInButton();

            // Report error.
        }
    };
    $scope.processUserInfo=function(userInfo){
        //alert(userInfo);
        $cookieStore.put('googledata',userInfo);
        //state.go('googlelogin');
        $scope.loginToggle2(userInfo);


    };
    $scope.userInfoCallback = function(userInfo) {
        //alert((userInfo));
        var useri;
        var useremail;
        //alert(userInfo['displayName']);
        /*$scope.userinfo['name']=userInfo['displayName'];
         $scope.userinfo['id']=userInfo['id'];
         $scope.userinfo['email']=userInfo['emails'][0]['value'];
         alert($scope.userinfo);*/



        /*for(useri in userInfo){
         //alert(userInfo[useri]+"=="+useri);
         }
         for(useremail in userInfo['emails'][0]){
         alert(userInfo['emails'][0][useremail]+"=="+useremail);
         }*/
        $scope.$apply(function() {
            //alert(34);
            $scope.processUserInfo(userInfo);

        });
    };

    // When callback is received, we need to process authentication.
    $scope.signInCallback = function(authResult) {
        $scope.$apply(function() {
            //alert(authResult);

            $scope.processAuth(authResult);
        });
    };



    $scope.renderSignInButton = function() {
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '1096579005756-57c2soasher3bbs6e6neetcbmduitc9f.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin'
            }
        );
    }


    $scope.$on('fb.auth.authResponseChange', function() {
        $scope.status = $facebook.isConnected();
        if($scope.status) {
            $facebook.api('/me').then(function(user) {
                //alert(user);
                //var x;
                //for(x in user) alert(user[x]+"=="+x);
                $scope.user = user;
            });
            if($scope.triggeredLogin==1) {
                $scope.loginToggle();
                //$scope.loginToggle();

                $scope.triggeredLogin=0;


            }
        }
    });
    //var loginproces;

        $scope.loginToggle = function() {


            setTimeout(function(){
                $scope.loginToggle1();
            },3000);
            $scope.loginToggle1();
            //alert($scope.status);
            if($scope.status) {


                $http({
                    method  : 'POST',
                    async:   false,
                    url     : 'http://admin.printbook.in/ngmodule/facebooklogin',
                    data    : $.param($scope.user),  // pass in data as strings
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                }) .success(function(data) {
                    //alert(data);
                    if(data>0){

                        $cookieStore.put('useremail',$scope.user.email);
                        $cookieStore.put('userid',data);
                        //var t=$cookieStore.get('userid');
                        //alert($cookieStore.get('userid'));

                        $scope.redirectS = $cookieStore.get('redirectState');

                        if(typeof ($scope.redirectS) != 'undefined'){
                            $state.go($scope.redirectS);
                        }else{
                            if($state.current.url=='/index'){
                                $state.reload();
                                $state.contactflag=true;
                                $state.loginflag=false;

                            }

                            //alert($state);
                            //console.log($state.current.url);
                            else
                                $state.go('index');
                        }


                        loginprocess.close();

                    }
                    else{
                        $scope.msgFlag=true;
                        $cookieStore.put('useremail','');
                        $cookieStore.put('userid',data);

                    }

                });

                // $facebook.logout();
            } else {
                $facebook.login();
                $scope.triggeredLogin=1;
            }

        };






    $scope.loginToggle = function() {


        setTimeout(function(){
            $scope.loginToggle1();
        },3000);
        $scope.loginToggle2();
        //alert($scope.status);
        if($scope.status) {


            $http({
                method  : 'POST',
                async:   false,
                url     : 'http://admin.printbook.in/ngmodule/googlelogin',
                data    : $.param($scope.user),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }) .success(function(data) {
                //alert(data);
                if(data>0){

                    $cookieStore.put('useremail',$scope.user.email);
                    $cookieStore.put('userid',data);
                    //var t=$cookieStore.get('userid');
                    //alert($cookieStore.get('userid'));

                    $scope.redirectS = $cookieStore.get('redirectState');

                    if(typeof ($scope.redirectS) != 'undefined'){
                        $state.go($scope.redirectS);
                    }else{
                        if($state.current.url=='/index'){
                            $state.reload();
                            $state.contactflag=true;
                            $state.loginflag=false;

                        }

                        //alert($state);
                        //console.log($state.current.url);
                        else
                            $state.go('index');
                    }

                    loginprocess.close();

                }
                else{
                    $scope.msgFlag=true;
                    $cookieStore.put('useremail','');
                    $cookieStore.put('userid',data);

                }

            });

            // $facebook.logout();
        } else {
            $facebook.login();
            $scope.triggeredLogin=1;
        }

    };






    $scope.loginToggle1 = function() {
        //alert($scope.status);
        if($scope.status) {


            $http({
                method  : 'POST',
                async:   false,
                url     : 'http://admin.printbook.in/ngmodule/facebooklogin',
                data    : $.param($scope.user),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }) .success(function(data) {
                //alert(data);
                if(data>0){

                    $cookieStore.put('useremail',$scope.user.email);
                    $cookieStore.put('userid',data);
                    //var t=$cookieStore.get('userid');
                    //alert($cookieStore.get('userid'));

                    $scope.redirectS = $cookieStore.get('redirectState');

                    if(typeof ($scope.redirectS) != 'undefined'){
                        $state.go($scope.redirectS);
                    }else{
                        if($state.current.url=='/index'){
                            $state.reload();
                            $state.contactflag=true;
                            $state.loginflag=false;

                        }

                        //alert($state);
                        //console.log($state.current.url);
                        else
                            $state.go('index');
                    }

                    //loginprocess.close();

                }
                else{
                    $scope.msgFlag=true;
                    $cookieStore.put('useremail','');
                    $cookieStore.put('userid',data);

                }

            });

            // $facebook.logout();
        } else {
            //$facebook.login();
            $scope.triggeredLogin=1;
            //$scope.loginToggle();
        }

    };

    $scope.loginToggle2 = function(userInfo) {
        //alert($scope.status);
        if($scope.status) {


            $http({
                method  : 'POST',
                async:   false,
                url     : 'http://admin.printbook.in/ngmodule/googlelogin',
                data    : $.param(userInfo),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }) .success(function(data) {
                //alert(data);
                if(data>0){

                    $cookieStore.put('useremail',userInfo['emails'][0]['value']);
                    $cookieStore.put('userid',data);
                    //var t=$cookieStore.get('userid');
                    //alert($cookieStore.get('userid'));

                    $scope.redirectS = $cookieStore.get('redirectState');

                    if(typeof ($scope.redirectS) != 'undefined'){
                        $state.go($scope.redirectS);
                    }else{
                        if($state.current.url=='/index'){
                            $state.reload();
                            $state.contactflag=true;
                            $state.loginflag=false;

                        }

                        //alert($state);
                        //console.log($state.current.url);
                        else
                            $state.go('index');
                    }

                    //loginprocess.close();

                }
                else{
                    $scope.msgFlag=true;
                    $cookieStore.put('useremail','');
                    $cookieStore.put('userid',data);

                }

            });

            // $facebook.logout();
        } else {
            //$facebook.login();
            $scope.triggeredLogin=1;
            //$scope.loginToggle();
        }

    };

    $scope.submitloginForm = function(){
        //alert("Form submitted");
        $scope.msgFlag=false;

        $http({
            method  : 'POST',
            async:   false,
            url     : 'http://admin.printbook.in/ngmodule/login',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            if(data>0){

                $cookieStore.put('useremail',$scope.form.email);
                $cookieStore.put('userid',data);
                //var t=$cookieStore.get('userid');
                //alert($cookieStore.get('userid'));

                $scope.redirectS = $cookieStore.get('redirectState');

                if(typeof ($scope.redirectS) != 'undefined'){
                    $state.go($scope.redirectS);
                }else{
                    //alert(9);
                    if($state.current.url=='/index'){
                        $state.reload();
                        $state.contactflag=true;
                        $state.loginflag=false;

                    }

                    //alert($state);
                    //console.log($state.current.url);
                    else
                    $state.go('index');
                }

            }
            else{
                $scope.msgFlag=true;
                $cookieStore.put('useremail','');
                $cookieStore.put('userid',data);

            }

        });

    };
    var data=(MyService.doStuff('banner'));
    //alert(data);

    $scope.friends=(data);


    $scope.init = function () {
        // check if there is query in url
        // and fire search in case its value is not empty

        var x;










        $('#owl-home').owlCarousel({
            loop:true,
            margin:30,
            autoplay:true,
            autoplayTimeout:3000,
            autoplayHoverPause:true,
            nav:false,
            dots:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        });

        //$scope.callhttp();


    };
    setTimeout(function(){
        $scope.init();

    },2000);



});


printbook.controller('logout', function($scope,$http,$state,$cookieStore,$cookies) {


    $scope.init = function () {
        $cookieStore.remove('useremail');
        $cookieStore.remove('userid');
        $state.go('index');
        //alert($cookieStore.get('userid'));
    };

    $scope.init();

});





printbook.controller('register', function($scope,$http,$state,$cookieStore,$cookies,ngDialog) {


    $scope.passwordValidator = function(password) {

        if(!password){return;}

        if (password.length < 6) {
            return "Password must be at least " + 6 + " characters long";
        }

        if (!password.match(/[A-Z]/)) {
            return "Password must have at least one capital letter";
        }

        if (!password.match(/[0-9]/)) {
            return "Password must have at least one number";
        }

        return true;
    };

    $scope.usernamevalidator = function(username,$http) {



        if(!username){return;}
        if (username.length < 6) {
            return "User name must be at least " + 6 + " characters long";
        }


        /*if($scope.usernamecheckserver(username)!=true)
         return 'User name already exists';*/





        return true;
    };


    $scope.usernamecheckserver = function(username) {







        $http({
            method  : 'POST',
            async:   false,
            url     : 'http://admin.printbook.in/ngmodule/checkusername',
            data    : {username: username},  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            //alert(data);
            if(data==false){
                return true;


                //$state.go('login')
            }
            else{
                // $scope.msgFlag=true;
                return "This User Name Already Exists  ";


            }

        });




    };





    $scope.submitregisterForm = function(){
        //alert("Form submitted");
        //$scope.msgFlag=false;
        var regpost=ngDialog.open({
            template: '<p>Processing ...Please wait !  </p>',
            plain: true
        });

        $http({
            method  : 'POST',
            async:   false,
            url     : 'http://admin.printbook.in/ngmodule/register',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $scope.emailmsgFlag=false;
            $scope.usermsgFlag=false;
            if(data=='username'){




                //$state.go('login')
                $scope.usermsgFlag=true;

            }
            if(data=='email'){
                // $scope.msgFlag=true;
                $scope.emailmsgFlag=true;


            }

            if(data=="true"){
                $state.go('login');
                regpost.close();
                ngDialog.open({
                    template: '<p>You Registration is Successful .. You can Check your email and continue to use our website by <a ui-sref="login">login</a> here by closing this ! </p>',
                    plain: true
                });
                // $scope.msgFlag=true;
                //$scope.emailmsgFlag=true;


            }

        });

    };


});






printbook.controller('checkstattus', function($scope,$cookieStore,$cookies) {

    //$scope.loginFlag=true;

    $scope.init = function () {
        // check if there is query in url
        // and fire search in case its value is not empty

        if($cookieStore.get('userid')>0){
            //alert(45);
            $scope.loginFlag=false;
            $scope.logoutFlag=true;

        }
        else{
            $scope.loginFlag=true;
            $scope.logoutFlag=false;
        }



        //alert(87);


    };

    $scope.init();



});

printbook.controller('customize', function($scope,$cookieStore,$cookies,$stateParams,$http,$state,Upload) {

    //alert($stateParams.categoryId);

    $scope.init = function () {
        // check if there is query in url
        // and fire search in case its value is not empty

        /*if($cookieStore.get('userid')>0){
         //alert(45);
         $scope.loginFlag=false;
         $scope.logoutFlag=true;

         }
         else{
         $scope.loginFlag=true;
         $scope.logoutFlag=false;
         }*/

        $http({
            method  : 'GET',
            async:   false,
            url     : 'http://admin.printbook.in/ngmodule/getproductlist?category_id='+$stateParams.categoryId,
            data    : {category_id: $stateParams.categoryId},  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
           //alert(data);
            if(data!=0){
                $scope.products=data;
                //alert(7);



                //$state.go('index');
            }
            else{
                /*$scope.msgFlag=true;
                 $cookieStore.put('useremail','');
                 $cookieStore.put('userid',data);*/
                $scope.showval=true;
                //alert(8);
                $scope.products=false;


            }

        });




        //alert($stateParams.userId);


    };

    $scope.init();

});

printbook.controller('shoppingcart', function($scope,$cookieStore,$cookies,$stateParams,$http,$state,Upload) {

    $scope.cart = [];
    $scope.cartlength=0;

    $scope.totalPrice = 0;

    $scope.cart = ($cookieStore.get('cart'));
    console.log($scope.cart);

    angular.forEach($scope.cart, function(val, key) {
        $scope.totalPrice = $scope.totalPrice+(val.pprice*val.pquantity);
        $scope.cartlength++;
    });

    $scope.delCart = function(index){
        $scope.cartlength=0;
        $scope.cart.splice(index,1);

        $cookieStore.put('cart',$scope.cart);

        $scope.totalPrice = 0;

        angular.forEach($scope.cart, function(val, key) {
            $scope.totalPrice = $scope.totalPrice+(val.pprice*val.pquantity);
            $scope.cartlength++;
        });
    }
    //$scope.cartlength=$scope.cart.length;

    $scope.checkOut = function(uploads){
        $scope.sessUser = $cookieStore.get('userid');

        if(typeof ($scope.sessUser) == 'undefined' ){
            $cookieStore.put('redirectState','checkOut');

            $state.go('login');
        }else{
            $state.go('checkOut');
        }
    }


});

printbook.controller('checkOut', function($scope,$cookieStore,$cookies,$stateParams,$http,$state,Upload) {

    $cookieStore.remove('redirectState');

    $scope.totalPrice = 0;

    var curdate = new Date();

    $scope.sessUser = $cookieStore.get('userid');

    $scope.cart = ($cookieStore.get('cart'));

    $scope.cartArr = [];

    angular.forEach($scope.cart, function(val, key) {
        $scope.totalPrice = $scope.totalPrice+(val.pprice*val.pquantity);

         $scope.cartAttr = [];

        angular.forEach(val.pattributes, function(val1, key1) {
            $scope.attrObj = {
                attrName : val1.name,
                attrValue : val1.label,
            }

            $scope.cartAttr.push($scope.attrObj);
        });

        $scope.cartObj = {
            pname : val.pname,
            pimage : val.porigname,
            pfile : val.pimage,
            pprice : val.pprice,
            pquantity : val.pquantity,
            pattributes : $scope.cartAttr,
        }

        $scope.cartArr.push($scope.cartObj);

    });

    $scope.sameShipBill = function(){
        if($scope.sameShipBillChk){
            $scope.form.s_name = $scope.form.b_name;
            $scope.form.s_address = $scope.form.b_address;
            $scope.form.s_address2 = $scope.form.b_address2;
            $scope.form.s_city = $scope.form.b_city;
            $scope.form.s_country = $scope.form.b_country;
            $scope.form.s_zip = $scope.form.b_zip;
            $scope.form.s_phone = $scope.form.b_phone;
        }
    }

    $scope.orderArr = {
        user_id:$scope.sessUser,
        price: $scope.totalPrice,
        order_data: curdate.getDate()+'/'+parseInt(curdate.getMonth()+1)+'/'+curdate.getFullYear()
    }

    $scope.submitcheckoutForm = function(){
        //$state.go('payment');
       // alert($.param($scope.orderArr));
       // alert($.param($scope.form));
        //console.log(($scope.cartArr));
       // alert($scope.cartArr);
        //alert($.param($scope.cartArr));

        $scope.chceckoutObj = {
            orderArr:$scope.orderArr,
            form:$scope.form,
            cartArr:$scope.cartArr,
        }

        $http({
            method  : 'POST',
            async:   false,
            url     : 'http://admin.printbook.in/ngmodule/saveorder',
            data    : $.param($scope.chceckoutObj),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            if(data > 0){
                $cookieStore.put('order_id',data);
                $state.go('payment');
            }
        });

    }



})

printbook.controller('payment', function($scope,$cookieStore,$cookies,$stateParams,$http,$state,Upload) {

    $http({
        method  : 'POST',
        async:   false,
        url     : 'http://printbook.in/openpayu/examples/v2/order/OrderCreate.php',
//            data    : $.param($scope.chceckoutObj),  // pass in data as strings
        //      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        //alert(data);
    });

})
printbook.controller('customizeproduct', function($scope,$cookieStore,$cookies,$stateParams,$http,$state,Upload,ngDialog) {

    //alert($stateParams.categoryId);
    $scope.currentimgno=0;
    $scope.isLoad = 0;
    $scope.imageList = [];
    $scope.productattributesval=[];
    $scope.cart=[];
    $scope.submitproduct = function(){
       // alert(9);
        //alert($scope.product.$valid);

    };
    $scope.prevproduct=function(){

        if($scope.currentimgno>=1){

            //alert($scope.pdfname);
            //alert($scope.currentimgno-1);
            $http({
                method  : 'GET',
                async:   false,
                url     : 'createimage.php?pdfname='+$scope.pdfname+'&no='+$scope.currentimgno,
                //data    : {category_id: $stateParams.categoryId},  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }) .success(function(data) {
                //alert(data);
                if(data!=0){
                    $scope.showname=data;
                    $scope.currentimgno--;

                    //$scope.isLoad =1;



                    //$state.go('index');
                }


            });
        }

        //alert($scope.noofpage);


    };

    $scope.nextproduct=function(){
        if($scope.noofpage+1>=$scope.currentimgno){



            //alert($scope.pdfname);
            //alert($scope.currentimgno-1);

            $http({
                method  : 'GET',
                async:   false,
                url     : 'createimage.php?pdfname='+$scope.pdfname+'&no='+$scope.currentimgno,
                //data    : {category_id: $stateParams.categoryId},  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }) .success(function(data) {
                //alert(data);
                if(data!=0){
                    $scope.showname=data;
                    $scope.currentimgno++;

                    //$scope.isLoad =1;



                    //$state.go('index');
                }


            });

        }

        //alert(curimg);


    };

    $scope.blackW = 0;

    $scope.calculateprice  = function(){

        $scope.blackW = 0;

        var $inputs = $('#product :input[type="radio"]');
        var values = {};
        var fcount=($('#product').find('h2').length);

        var oprice=parseFloat($('#oprice').text());
        var price=oprice;
        //alert(price);
        $inputs.each(function() {
            values[this.name] = $(this).val();

            if($(this).is(':checked')){

                var chkval = $(this).val();
                var chkname = this.name;
                var chklabel = $(this).attr('labelName');
                var isbnh = $(this).attr('is_bg');

                if(isbnh == 1){
                    $scope.blackW  = 1;
                }

                angular.forEach( $scope.productattributesval[$scope.selImageName], function(val, key) {
                    if(chkname == val.name) {
                        $scope.productattributesval[$scope.selImageName][key].value = chkval;
                        $scope.productattributesval[$scope.selImageName][key].label = chklabel;
                    }
                });




                //alert($(this).val());

                //count++;
                price=parseFloat(price+parseFloat($(this).val()));
                $('#price').text(price);
                $scope.price=price;

            }


        });




    }

    $scope.quantity = 1;

    $scope.checkform = function(){
        var flag=0;
        var $inputs = $('#product :input');
        var values = {};
        var fcount=($('#product').find('h2').length);
        var count=0;

        $inputs.each(function() {
            values[this.name] = $(this).val();
            if($(this).is(':checked')){
                count++;
            }


        });

        if(count<fcount){
            alert('Please Select all Options');

        }else if(typeof ($scope.quantity) == 'undefined' || $scope.quantity == 0){
            alert('Please Enter quantity');
        }else if($scope.imageList.length == 0){
            alert('Please upload image');
        }
        else{

/*
            $inputs.each(function() {
                values[this.name] = $(this).val();
                if($(this).is(':checked')){
                    $scope.productattr={
                        name:$(this).attr('name'),
                        value:$(this).val(),

                    }
                    $scope.productattributesval[$scope.selOrigName].push($scope.productattr);

                    //alert($(this).val());

                }


            });*/
           flag=1;
        }
        if($scope.imageList.length == 0){



            alert("Please upload image");
        }
        else{
            if(flag==1){

                //$cookieStore.put('cart_total',data['mail']);

                //$cookieStore.remove('cart');

                $scope.cartArr = $cookieStore.get('cart');

                if(typeof ($scope.cartArr) != 'undefined'){
                    $scope.cart= $scope.cartArr;
                }



                    $scope.product={
                        id: ($scope.cart.length + 1),
                        pprice:$scope.price,
                        pname:$('#productname').text(),
                        productid:parseInt($('#productid').text()),
                        pattributes:$scope.productattributesval[$scope.selImageName],
                        pimage:$scope.selImageName,
                        pquantity:$scope.quantity,
                        porigname:$scope.selOrigName

                    }
                    // $cookieStore.remove('cart');

                    $scope.cartArr = $cookieStore.get('cart');

                    if(typeof ($scope.cartArr) != 'undefined'){
                        $scope.cart= $scope.cartArr;
                    }

                    //alert($cookieStore.get('cart'));

                    //alert($scope.cart);
                    if($scope.cart.length)
                        $scope.cart.push($scope.product);
                    else
                        $scope.cart=[$scope.product];
                    $cookieStore.put('cart',$scope.cart);


                alert('Added Successfully');
                //$state.go('shoppingcart');

                angular.forEach( $scope.imageList, function(val, key) {
                    if($scope.selImageName == val.newname) {
                        $scope.imageList.splice(key,1);

                        if($scope.selImageName == val.newname && $scope.imageList.length > 0){
                            $scope.selImageName = $scope.imageList[0].newname;
                            $scope.selImageType = $scope.imageList[0].newname.substr($scope.imageList[0].newname.lastIndexOf('.')+1);
                            $scope.selOrigName = $scope.imageList[0].origname;
                            $scope.pdfname = $scope.imageList[0].pdfname;
                        }

                        if($scope.imageList.length == 0){
                            $scope.selImageName = '';
                            $scope.selImageType = '';
                            $scope.selOrigName = '';
                            $scope.pdfname = '';
                        }

                    }
                });


            }
        }


        //alert($('#product').html());

    };

    $scope.gotocart = function(){
        //$state.go('shoppingcart');
        if($scope.imageList.length >0){
            $scope.dialog1 = ngDialog.open({
                template: '<div><div>All added Images hasn\'t been added to cart , Once you leave this page you can\'t continue editing those , Are you sure to leave ?</div><div><input type="button" value="Yes" ng-click="gotocartConf()"><input type="button" value="No" ng-click="gotocartCanc()"></div></div>',
                plain: true,
                showClose:false,
                scope:$scope
            });
        }else{
            $state.go('shoppingcart');
        }
    }

    $scope.gotocartConf = function(){
        $scope.dialog1.close();
        $state.go('shoppingcart');
    }

    $scope.gotocartCanc = function(){
        $scope.dialog1.close();
    }

    $scope.deleteimg = function () {

        $scope.upImage='';
        //$scope.upImage='';

    }
    //$scope.currentimgno=$scope.imageList.length;
    $scope.init = function () {





        //alert($stateParams.productId);




        $http({
            method  : 'GET',
            async:   false,
            url     : 'http://admin.printbook.in/ngmodule/getproductattributelist?product_id='+$stateParams.productId,
            data    : {category_id: $stateParams.categoryId},  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            //alert(data);
            if(data!=0){
                $scope.productattributes=data;

                $scope.isLoad =1;



                //$state.go('index');
            }


        });



    };

    $scope.init();


    /*file Upload [start] */

    $scope.selImageName = '';
    $scope.selImageType = '';
    $scope.pdfContent = '';
    $scope.selOrigName = '';
    $scope.pdfname = '';



    $scope.$watch('addImage', function (files) {
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
		
		
		
        file.upload = Upload.upload({
            url: 'upload.php' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {username: $scope.username},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            console.log(response);
			if(typeof(response.data.newname) != 'undefined'){
				if($scope.selImageName == ''){
					$scope.selImageName = response.data.newname;
					$scope.showname = response.data.showname;
					$scope.noofpage = response.data.noofpage;
					$scope.selImageType = response.data.newname.substr(response.data.newname.lastIndexOf('.')+1);
					$scope.selOrigName = response.data.origname;	
					$scope.pdfname = response.data.pdfname;

				}
				if($scope.imageList.length > 0){
					$scope.imageList.push(response.data);
				}else{
					$scope.imageList = [response.data];
					$scope.currentimgno=1;
				}

				$scope.productattributesval[response.data.newname] = [];

				var $inputs = $('#product :input[type="radio"]');
				var radioNameArr = [];

				$inputs.each(function() {
					var radioName=$(this).attr('name');
					if(radioNameArr.indexOf(radioName) <0 ){
						radioNameArr.push(radioName);
						$scope.productattr= {
							name: $(this).attr('name'),
							value: '',
							label: ''
						}
						$scope.productattributesval[response.data.newname].push($scope.productattr);
					}
				});
			}else{
				alert('This file type not supported');
			}

			


        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }

    $scope.deleteimage = function(index){
        var curImageName = $scope.imageList[index].newname;
        $scope.imageList.splice(index,1);
        if($scope.selImageName == curImageName && $scope.imageList.length > 0){
            $scope.selImageName = $scope.imageList[0].newname;
            $scope.showname = $scope.imageList[0].showname;
            $scope.noofpage = $scope.imageList[0].noofpage;
            $scope.selImageType = $scope.imageList[0].newname.substr($scope.imageList[0].newname.lastIndexOf('.')+1);
            $scope.selOrigName = $scope.imageList[0].origname;
            $scope.pdfname = $scope.imageList[0].pdfname;
            $scope.currentimgno=1;
        }

        if($scope.imageList.length == 0){
            $scope.selImageName = '';
            $scope.selImageType = '';
            $scope.selOrigName = '';
            $scope.currentimgno=0;
            $scope.pdfname='';
        }

    }

    $scope.selImage = function(index){
       // alert(index);
        $scope.selImageName = $scope.imageList[index].newname;
        $scope.showname = $scope.imageList[index].showname;
        $scope.currentimgno = 1;
        $scope.noofpage = $scope.imageList[index].noofpage;
		$scope.selImageType = $scope.imageList[index].newname.substr($scope.imageList[index].newname.lastIndexOf('.')+1);
        $scope.selOrigName = $scope.imageList[index].origname;
        $scope.pdfname = $scope.imageList[index].pdfname;

        $scope.blackW  = 0;


        var $inputs = $('#product :input[type="radio"]');
        var oprice=parseFloat($('#oprice').text());
        var price=oprice;
       /* $inputs.each(function() {
            if($(this).is(':checked')){

                var chkval = $(this).val();
                var chkname = this.name;

                angular.forEach( $scope.productattributesval[$scope.selOrigName], function(val, key) {
                    if(chkname == val.name)
                        $scope.productattributesval[$scope.selOrigName][key].value = chkval;
                });




                //alert($(this).val());

                //count++;
                price=parseFloat(price+parseFloat($(this).val()));
                $('#price').text(price);
                $scope.price=price;

            }


        });*/

        var attprice = 0;
        angular.forEach( $scope.productattributesval[$scope.selImageName], function(val, key) {
            if(val.value == ''){
                $('#product :input[type="radio"][name="'+val.name+'"]').prop('checked',false);
            }else{
                var is_bg = ($('#product :input[type="radio"][name="'+val.name+'"][value="'+val.value+'"]').attr('is_bg'));

                if(is_bg == 1){
                    $scope.blackW  = 1;
                }

                $('#product :input[type="radio"][name="'+val.name+'"][value="'+val.value+'"]').prop('checked',true);

                attprice += parseFloat(parseFloat(val.value));
            }
        });
        price = price+attprice;
        $('#price').text(price);
        $scope.price=price;
    }




    /*file Upload [end] */


});


printbook.controller('autologin', function($scope,$cookieStore,$cookies,$stateParams,$http,$state) {

    //$scope.loginFlag=true;

    $scope.init = function () {
        // check if there is query in url
        // and fire search in case its value is not empty

        /*if($cookieStore.get('userid')>0){
         //alert(45);
         $scope.loginFlag=false;
         $scope.logoutFlag=true;

         }
         else{
         $scope.loginFlag=true;
         $scope.logoutFlag=false;
         }*/

        $http({
            method  : 'POST',
            async:   false,
            url     : 'http://admin.printbook.in/ngmodule/autologin',
            data    : {username: $stateParams.userId},  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            if(data!=0){

                //alert(data['mail']);
                //alert(data['uid']);
                $cookieStore.put('useremail',data['mail']);
                $cookieStore.put('userid',data['uid']);
                //var t=$cookieStore.get('userid');
                //alert($cookieStore.get('userid'));

                $state.go('index');
            }
            else{
                /*$scope.msgFlag=true;
                 $cookieStore.put('useremail','');
                 $cookieStore.put('userid',data);*/
                ngDialog.open({
                    template: '<p>Your Email verification was unsuccessful , try again!! </p>',
                    plain: true
                });

            }

        });




        //alert($stateParams.userId);


    };

    $scope.init();



});