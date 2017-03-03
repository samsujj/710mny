/**
 * Created by samsuj on 29/10/15.
 */


'use strict';

/* App Module */

var jungledrone = angular.module('jungledrone', ['ui.router','ngCookies','ui.bootstrap','angularValidator','ngFileUpload','ui.tinymce','angularLazyImg']);



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





});


jungledrone.service('carttotal', function($http, $log, $q,$rootScope) {
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




});






jungledrone.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

jungledrone.filter('htmlToPlaintext', function () {
    return function (input, start) {
        return function (text) {
            console.log(text+'text===');
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    }
});
jungledrone.run(['$rootScope', '$state','contentservice','$cookieStore','carttotal',function($rootScope, $state,contentservice,$cookieStore,carttotal){



    Math.random()
    $rootScope.$on('$stateChangeStart',function(){

        $rootScope.userid=$cookieStore.get('userid');

        console.log($rootScope.userid+'state change user id');

        if($rootScope.userid == 0)  $rootScope.cartuser=$cookieStore.get('randomid');
        else {
            $rootScope.cartuser = $rootScope.userid;
        }

        $rootScope.contentdata=(contentservice.getcontent('http://admin.710mny.com/contentlist'));
        $rootScope.carttotal=parseInt(carttotal.getcontent('http://admin.710mny.com/carttotal?user='+$rootScope.cartuser));
        $rootScope.stateIsLoading = true;
        var random=Math.random() * Math.random();
        //$cookieStore.remove('randomid');
        random=random.toString().replace('.','');
        //$cookieStore.put('randomid', random);

        //console.log($cookieStore.get('randomid')+'random');

        if(typeof($cookieStore.get('randomid'))=='undefined'){

            $cookieStore.put('randomid', random);

            console.log($cookieStore.get('randomid')+'random');
        }
    });


    $rootScope.$on('$stateChangeSuccess',function(ev, to, toParams, from, fromParams){
        setTimeout(function(){

           // $rootScope.userid=$cookieStore.get('userid');

            console.log($rootScope.userid+'state change user id success ');

            if($rootScope.userid == 0)  $rootScope.cartuser=$cookieStore.get('randomid');
            else {
                $rootScope.cartuser = $rootScope.userid;
            }

            $rootScope.carttotal=parseInt(carttotal.getcontent('http://admin.710mny.com/carttotal?user='+$rootScope.cartuser));
            $rootScope.carttotal=0;

            $rootScope.contentdata=(contentservice.getcontent('http://admin.710mny.com/contentlist'));
            console.log($rootScope.userid+'userid');
            if($rootScope.userrole!=4) $('.editableicon').hide();

            //$rootScope.contentdata=(contentservice.getcontent('http://admin.jungledrones.com/contentlist'));
            $rootScope.stateIsLoading = false;

        },20);

        $rootScope.stateIsLoading = false;
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;


        $(document).scrollTop(0);
    });

}]);

jungledrone.filter("sanitize123", ['$sce', function($sce) {
    return function(htmlCode){
        //console.log(htmlCode);
        //console.log('santize');
        return $sce.trustAsHtml(htmlCode);
    }
}]);

jungledrone.filter("sanitizelimit", ['$sce', function($sce) {
    return function(htmlCode){
        //console.log(htmlCode);
        //console.log('santize');
        htmlCode=htmlCode.substr(0,100);
        return $sce.trustAsHtml(htmlCode);
    }
}]);


jungledrone.directive('content',['$compile','$sce','$state', function($compile,$sce,$state) {
    var directive = {};
    directive.restrict = 'E';
    //directive.transclude= true;
    //console.log('t--='+student.ctype);
    directive.template = '<div class=cc ng-bind-html="student.content | sanitize123" editid="student.id| sanitize123"  ></div><button  class = editableicon editid="student.id| sanitize123" ng-click=editcontent("student.name")>Edit</button><div class=clearfix></div>';

    directive.scope = {
        student : "=name"
    }


    directive.compile = function(element, attributes) {
        element.css("display", "inline");



        var linkFunction = function($scope, element, attributes) {
           // console.log('content'+student.content);
            //console.log('ctype'+student.ctype);
            $compile($(element).find('.cc'))($scope);
            $compile($(element).find('.editableicon'))($scope);
            //$(element).find('.cc').css('display','inline-block');
            //$(element).find('.editableicon').text(99);

            $(element).find('.editableicon').on( "click", function() {
                console.log( $( this ).parent().attr('id') );
                //if($rootScope.userid<1) $( this).hide();
                //$(this).parent().css('display','inline-block');

                $state.go('edit-content',{userId: $( this ).parent().attr('id')});
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
        .otherwise("/login");

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

        .state('homenew',{
            url:"/homenew",
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
                    templateUrl: 'partials/homenew1.html' ,
                    controller: 'index'
                },

            }
        })


        .state('login',
        {
            url:"/login",
            views: {

                     /*         'header': {
                 templateUrl: 'partials/header.html' ,
                 controller: 'header'
                 },*/
                 'footer': {
                 templateUrl: 'partials/footer.html' ,
                 //controller: 'footer'
                 },
                                'content': {
                    templateUrl: 'partials/login.html' ,
                    controller: 'login'
                },

            },
                      /*onEnter: ['$stateParams', '$state', '$uibModal',
             function($stateParams, $state, $uibModal) {
             var size;
             $uibModal.open({
             animation: true,
             templateUrl: 'loginmodal',
             controller: 'ModalInstanceCtrl',
             size: size,

             });
             }]*/
                     }
    )




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

        .state('servicesold',{
            url:"/servicesold",
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
                    templateUrl: 'partials/servicesold.html' ,
                    controller: 'services'
                },

            }
        })

        .state('checkout',{
            url:"/checkout",
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
                    templateUrl: 'partials/checkout.html' ,
                    controller: 'checkout'
                },

            }
        })
        .state('success',{
            url:"/success",
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
                    templateUrl: 'partials/success.html' ,
                    //controller: 'checkout'
                },

            }
        })

        .state('myaccount',{
            url:"/myaccount",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/myaccount-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/myaccount.html' ,
                    //controller: 'checkout'
                },

            }
        })

        .state('myprofile',{
            url:"/myprofile",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/myaccount-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/myprofile.html' ,
                    controller: 'myprofile'
                },

            }
        })

        .state('editprofile',{
            url:"/editprofile",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/myaccount-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/editprofile.html' ,
                    controller: 'editprofile'
                },

            }
        })
        .state('user-change-password',{
                url:"/user-change-password",
                views: {

                    'admin_header': {
                        templateUrl: 'partials/myaccount-header.html' ,
                        controller: 'header'
                    },
                    'admin_footer': {
                        templateUrl: 'partials/myaccount-footer.html' ,
                        //controller:'footer'
                    },
                    'admin_left': {
                        templateUrl: 'partials/myaccount-left.html' ,
                        //  controller:'footer'
                    },

                    'content': {
                        templateUrl: 'partials/user_change_password.html' ,
                        controller: 'userchangepassword'
                    },

                }
            }
        )

        .state('mydownloads',{
            url:"/mydownloads/:id",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/myaccount-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/myfiles.html' ,
                    //templateUrl: 'partials/mydownloads.html' ,
                    controller: 'mydownloads'
                },

            }
        })
        .state('categoryfolderview',{
            url:"/categoryfolderview/:id",
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
                    templateUrl: 'partials/categoryfolderview.html' ,
                    //templateUrl: 'partials/mydownloads.html' ,
                    controller: 'categoryfolderview'
                },

            }
        })
        .state('myfilelist',{
            url:"/myfilelist",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/myaccount-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/mydownloads.html' ,
                    //templateUrl: 'partials/mydownloads.html' ,
                    controller: 'myfilelist'
                },

            }
        })

        .state('myaccount-add-product',{
            url:"/myaccount-add-product",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/myaccount-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/myaccount_add_product.html' ,
                    //templateUrl: 'partials/mydownloads.html' ,
                    controller: 'myaccountaddproduct'

                },

            }
        })
        .state('myaccount-edit-product',{
            url:"/myaccount-edit-product/:id",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/myaccount-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/myaccount_edit_product.html' ,
                    //templateUrl: 'partials/mydownloads.html' ,
                    controller: 'myaccounteditproduct'

                },

            }
        })

        .state('myaccount-product-list',{
            url:"/myaccount-product-list",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/myaccount-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/myaccount_product_list.html' ,
                    //templateUrl: 'partials/mydownloads.html' ,
                    controller: 'myaccountproductlist'

                },

            }
        })


        .state('receipts',{
            url:"/receipts",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/myaccount-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/receipts.html' ,
                    //controller: 'checkout'
                },

            }
        })
        .state('billings',{
            url:"/billings",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/myaccount-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/billings.html' ,
                    //controller: 'checkout'
                },

            }
        })

        .state('plans',{
            url:"/plans",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    //controller: 'footer'
                },
               /* 'left': {
                    templateUrl: 'partials/myaccount-left.html' ,
                    //controller: 'checkout'
                },*/
                'content': {
                    templateUrl: 'partials/plans.html' ,
                    controller: 'plans'
                },

            }
        })


        .state('uploads',{
            url:"/uploads",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/uploader-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/uploads.html' ,
                    //controller: 'checkout'
                },

            }
        })



.state('agreement',{
            url:"/agreement",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/uploader-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/agreement.html' ,
                    //controller: 'checkout'
                },

            }
        })


.state('addasuploader',{
            url:"/addasuploader",
            views: {

                'header': {
                    templateUrl: 'partials/myaccount-header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/myaccount-footer.html' ,
                    //controller: 'footer'
                },
                'left': {
                    templateUrl: 'partials/uploader-left.html' ,
                    //controller: 'checkout'
                },
                'content': {
                    templateUrl: 'partials/addasuploader.html' ,
                    //controller: 'checkout'
                },

            }
        })





        .state('cart',{
            url:"/cart",
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
                    templateUrl: 'partials/cart.html' ,
                    controller: 'cart'
                },

            }
        })

        .state('imagesizeadd',{
            url:"/imagesizeadd",
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
                    templateUrl: 'partials/imagesizeadd.html' ,
                    controller: 'imagesizeadd'
                },

            }
        })



        .state('product-details',{
            url:"/product-details/:id",
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
                    templateUrl: 'partials/product-details.html' ,
                    controller: 'productdetails'
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
                    controller: 'services'
                },

            }
        })

        .state('stock-category',{
            url:"/stock-category/:type",
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
                    controller: 'stockcategory'
                },

            }
        })

        .state('stock-details',{
            url:"/stock-details/:id",
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
                    templateUrl: 'partials/stockdetails.html' ,
                    controller: 'stockdetail'
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
        .state('edit-imagesize',{
            url:"/edit-imagesize/:id",
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
                    templateUrl: 'partials/edit_imagesize.html' ,
                    controller: 'editimagesize'
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
        .state('contentlist',{
            url:"/contentlist",
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
                    templateUrl: 'partials/contentlist.html' ,
                    controller: 'contentlist'
                },

            }
        }
    )
        .state('imagesize-list',{
            url:"/imagesize-list",
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
                    templateUrl: 'partials/imagesize_list.html' ,
                    controller: 'imagesizelist'
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
        .state('contributor-list',{
                url:"/contributor-list",
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
                        templateUrl: 'partials/contributor_list.html' ,
                        controller: 'contributorlist'
                    },

                }
            }
        )
        .state('generaluser-list',{
                url:"/generaluser-list",
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
                        templateUrl: 'partials/generaluser_list.html' ,
                        controller: 'generaluserlist'
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

        .state('documentcategorylist',{
            url:"/document-category-list",
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
                    templateUrl:'partials/documentcategorylist.html',
                    controller:'documentcategorylist'
                },

            }
        }
    )

        .state('adddocumentcategory',{
            url:"/add-document-category",
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
                    templateUrl:'partials/adddocumentcategory.html',
                    controller:'adddocumentcategory'
                },

            }
        }
    )


        .state('editdocumentcategory',{
            url:"/edit-document-category/:id",
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
                    templateUrl:'partials/editdocumentcategory.html',
                    controller:'editdocumentcategory'
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
        .state('editflight', {
            url: "/editflight/:id",
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
                    templateUrl: 'partials/edit_flight.html' ,
                    controller: 'editflight'
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


        .state('login2',
        {
            url:"/login2",
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

        .state('forgot-password',
        {
            url:"/forgot-password" ,
            views:{
                'content':{
                    templateUrl: 'partials/forgot_password.html',
                    controller:  'forgotpassword'
                }
            }
        }
    )

        .state('forgot-password-check',
        {
            url:"/forgot-password-check" ,
            views:{
                'content':{
                    templateUrl: 'partials/forgot_password_check.html',
                    controller:  'forgotpasswordcheck'
                }
            }
        }
    )

        .state('change-password',
        {
            url:"/change-password" ,
            views:{
                'content':{
                    templateUrl: 'partials/change_password.html',
                    controller: 'change_password'
                }
            }
        }
    )



        .state('stock-photo',{
            url:"/stock-photo/:type/:id",
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
                    controller: 'services'
                },

            }
        }
    )


        .state('product',{
            url:"/product/:id",
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
                    controller: 'products'
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




        .state('auditorlist',{
            url:"/auditor-list",
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
                    templateUrl: 'partials/auditor_list.html' ,
                    controller: 'auditorlist'
                },

            }
        }
    )

        .state('addauditor',{
            url:"/add-auditor",
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
                    controller: 'addauditor'
                },

            }
        }
    )
        .state('editauditor',{
            url:"/edit-auditor/:userId",
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
                    controller: 'editauditor'
                },

            }
        }
    )

        .state('adddocument',{
            url:"/add-document",
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
                    templateUrl: 'partials/adddocument.html' ,
                    controller: 'adddocument'
                },

            }
        }
    )

        .state('editdocument',{
            url:"/edit-document/:id",
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
                    templateUrl: 'partials/editdocument.html' ,
                    controller: 'editdocument'
                },

            }
        }
    )

        .state('documentlist',{
            url:"/document-list",
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
                    templateUrl: 'partials/documentlist.html' ,
                    controller: 'documentlist'
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



jungledrone.controller('forgotpassword', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.forgotpasssubmit = function(){
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'forgotpass',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            if(data.status == 'success'){
                $cookieStore.put('user_id',data.userdetails.user_id);
                $cookieStore.put('user_email',data.userdetails.email);

                $rootScope.user_id=$cookieStore.get('user_id');
                $rootScope.user_email=$cookieStore.get('user_email');

                // console.log($rootScope.user_email);
                // console.log($rootScope.user_id);
                //console.log($rootScope.refferalcodes);

                $state.go('forgot-password-check');


            }else{
                $scope.errormsg = data.msg;
            }

        });
    }
});
jungledrone.controller('forgotpasswordcheck', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.form={email:$rootScope.user_email}
    $scope.forgotpasschecksubmit = function(){
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'forgotpassaccesscheck',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            if(data.status == 'success'){
                $state.go('change-password');
                return

            }else{
                $scope.errormsg = data.msg;
            }

        });
    }
});

jungledrone.controller('change_password', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.form={email:$rootScope.user_email,user_id:$rootScope.user_id}
    $scope.changepassFormSubmit = function(){
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'changepasswords',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            if(data.status == 'success'){
                $state.go('login');
                return

            }else{
                $scope.errormsg = data.msg;
            }

        });
    }
});



jungledrone.controller('ModalInstanceCtrl', function($scope,$state,$cookieStore,$http,$uibModalInstance,$rootScope,Upload,$uibModal,$timeout) {
    $scope.cancel = function () {

        $uibModalInstance.dismiss('cancel');
    };
    $scope.cancel111 = function () {

        $uibModalInstance.dismiss('cancel');
        $state.go('index');
    };
    $scope.cancel123 = function () {

        $uibModalInstance.dismiss('cancel');
        $state.go('index');
       // $state.go('home');
    };

    $rootScope.newuser=function(type){
        $uibModalInstance.dismiss('cancel');
        $rootScope.usertype=type;
        $uibModal.open({
            animation: true,
            templateUrl: 'fontsignupmodal.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            scope: $rootScope
        });
    }
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

    $scope.docconfirmcategorydelete=function(){
        $uibModalInstance.dismiss('cancel');
        $rootScope.stateIsLoading = true;
        var idx = $scope.currentindex;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'document/deletecategory',
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

    $scope.docconfirmcategorystatus=function(){
        $uibModalInstance.dismiss('cancel');
        $rootScope.stateIsLoading = true;
        var idx = $scope.currentindex;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'document/updatecatstatus',
            data    : $.param({id: $scope.categorylist[idx].id,status:$scope.categorylist[idx].status}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;

            if($scope.categorylist[idx].status == 0){
                $scope.categorylist[idx].status = 1;
            }else{
                $scope.categorylist[idx].status = 0;
            }

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

            if($scope.productlist[idx].status == 0){
                $scope.productlist[idx].status = 1;
            }else{
                $scope.productlist[idx].status = 0;
            }

        });
    }

    $scope.jungleconfirmdocumentstatus=function(){
        $uibModalInstance.dismiss('cancel');
        $rootScope.stateIsLoading = true;
        var idx = $scope.currentindex;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'updatedocstatus',
            data    : $.param({id: $scope.documentlist[idx].id,status:$scope.documentlist[idx].status}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;

            if($scope.documentlist[idx].status == 0){
                $scope.documentlist[idx].status = 1;
            }else{
                $scope.documentlist[idx].status = 0;
            }
        });
    }


    $scope.jungleconfirmdocdelete=function(){
        $uibModalInstance.dismiss('cancel');
        $rootScope.stateIsLoading = true;
        var idx = $scope.currentindex;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'deldocument',
            data    : $.param({id: $scope.documentlist[idx].id}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.documentlist.splice(idx,1);
        });
    }



    $scope.popuplogin = function(){
        $rootScope.stateIsLoading = true;

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'adminlogin',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {


            if(data.status == 'success') {

                $uibModalInstance.dismiss('cancel');


                $cookieStore.put('userid', data.userdetails.id);
                $cookieStore.put('useremail', data.userdetails.email);
                $cookieStore.put('userfullname', data.userdetails.fname + ' ' + data.userdetails.lname);
                $cookieStore.put('userfname', data.userdetails.fname);
                $cookieStore.put('userlname', data.userdetails.lname);
                $cookieStore.put('username', data.userdetails.username);
                $cookieStore.put('userrole', data.userdetails.userrole);

                if (typeof (data.userdetails.roles[4]) != 'undefined')
                    $cookieStore.put('userrole', 4);
                if (typeof (data.userdetails.roles[5]) != 'undefined')
                    $cookieStore.put('userrole', 5);
                if (typeof (data.userdetails.roles[6]) != 'undefined')
                    $cookieStore.put('userrole', 6);
                if (typeof (data.userdetails.roles[7]) != 'undefined')
                    $cookieStore.put('userrole', 7);
                if (typeof (data.userdetails.roles[8]) != 'undefined')
                    $cookieStore.put('userrole', 8);
                if (typeof (data.userdetails.roles[9]) != 'undefined')
                    $cookieStore.put('userrole', 9);


                if (typeof (data.userdetails.roles[7]) != 'undefined' ){
                    $state.go('mydownloads', {id: 0});
                    return;
                }

                if (typeof (data.userdetails.roles[8]) != 'undefined' ){
                    $state.go('myprofile');
                    return;
                }
                if (typeof (data.userdetails.roles[9]) != 'undefined' ){
                    $state.go('myaccount-product-list', {id: 0});
                    return;
                }

                if(typeof($rootScope.goafterlogin) != 'undefined'){
                    if($rootScope.goafterlogin != ''){
                        $state.go($rootScope.goafterlogin);
                        return
                    }

                }


                    $state.go('dashboard');


            }else{
                $rootScope.stateIsLoading = false;
                $scope.errormsg = data.msg;
            }

        });
    }

    $scope.gotofpassword =function(){
        $uibModalInstance.dismiss('cancel');

        $state.go('forgot-password');
        return
    }

    $scope.fontsignupsubmit=function(){
        $uibModalInstance.dismiss('cancel');
        $scope.contact=['Anytime','Early morning','Mid morning','Afternoon','Early evening','Late evening'];


            $http({
                method  : 'POST',
                async:   false,
                url     : $scope.adminUrl+'addadmin?type='+$rootScope.usertype,
                data    : $.param($scope.form),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }) .success(function(data) {
                //$rootScope.stateIsLoading = false;
                if(data.status == 'error'){
                    //console.log(data);
                    $('.email_div').append('<label class="control-label has-error validationMessage">This email already exists.</label>');
                }else{
                   // $('#loginid').hide();
                    $uibModalInstance.dismiss('cancel');
                    //console.log(1);
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'success.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'lg',
                        scope: $rootScope
                    });

                   /* $timeout(function(){
                        $scope.cancel();
                    },4000)*/
                 //   $state.go('auditorlist');
                   // return;
                }



            });




    }


});


jungledrone.controller('index', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams,contentservice) {
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
      //  console.log($stateParams.target);
       // console.log('in set time out');
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

     //   console.log(33);

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
       // console.log('this prev');

    }

    $scope.carouselnext=function(){

        $('.carousel').eq(1).carousel('next');
        //console.log('this next');

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



    $scope.interval=200;
    $scope.contentupdated=false;
    var myVar =setInterval(function(){

        $rootScope.contentdata=contentservice.getcontent( $scope.adminUrl+'contentlist');


        //console.log('in setInterval'+$scope.interval);
        //console.log( $rootScope.contentdata);
        var x;
        var y;
        if(typeof ($rootScope.contentdata)!='undefined' && $scope.contentupdated){

            $scope.interval=999990;

            clearInterval(myVar);
        }

        $scope.contentupdated=true;
        for (x in $rootScope.contentdata ){
            var contentw='';
            //console.log($rootScope.contentdata[x]);
            //console.log(($rootScope.contentdata[x].content));
            //console.log(($rootScope.contentdata[x].parentid));


            if($rootScope.contentdata[x].ctype!='image') {

                for (y in $rootScope.contentdata[x].content) {
                    if ($rootScope.contentdata[x].ctype != 'image')
                        contentw += ($rootScope.contentdata[x].content[y]);
                    else {

                        contentw += "<img src=" + $rootScope.contentdata[x].content[y] + " />";
                    }
                }
                $rootScope.contentdata[x].content=(contentw);
            }
            /* else{

             $rootScope.contentdata[x].content = "< img src = " + $rootScope.contentdata[x].content + " >";

             //$rootScope.contentdata[x].content=$rootScope.contentdata[x].content.replace('["','').replace.(']"','');
             }*/


          //  console.log(($rootScope.contentdata[x].content));
            $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].id]=$rootScope.contentdata[x];
            if($rootScope.contentdata[x].parentid!=0){

                var z=parseInt($rootScope.contentdata[x].parentid);
               // console.log(z);
                //console.log($rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid);

                $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid]=$rootScope.contentdata[x];

            }

            //var model=$parse($rootScope.contentdata[x].id);
            //model.assign($scope, $rootScope.contentdata[x]);
            //.id=$rootScope.contentdata[x];
        }

        //console.log('----'+$scope);


    },$scope.interval);




});


jungledrone.controller('contactus', function($scope,$state,$http,$cookieStore,$rootScope,contentservice) {
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

    $scope.interval=200;
    $scope.contentupdated=false;
    var myVar =setInterval(function(){

        $rootScope.contentdata=contentservice.getcontent( $scope.adminUrl+'contentlist');


        //console.log('in setInterval'+$scope.interval);
        //console.log( $rootScope.contentdata);
        var x;
        var y;
        if(typeof ($rootScope.contentdata)!='undefined' && $scope.contentupdated){

            $scope.interval=999990;

            clearInterval(myVar);
        }

        $scope.contentupdated=true;
        for (x in $rootScope.contentdata ){
            var contentw='';
            //console.log($rootScope.contentdata[x]);
            //console.log(($rootScope.contentdata[x].content));
            //console.log(($rootScope.contentdata[x].parentid));


            if($rootScope.contentdata[x].ctype!='image') {

                for (y in $rootScope.contentdata[x].content) {
                    if ($rootScope.contentdata[x].ctype != 'image')
                        contentw += ($rootScope.contentdata[x].content[y]);
                    else {

                        contentw += "<img src=" + $rootScope.contentdata[x].content[y] + " />";
                    }
                }
                $rootScope.contentdata[x].content=(contentw);
            }
            /* else{

             $rootScope.contentdata[x].content = "< img src = " + $rootScope.contentdata[x].content + " >";

             //$rootScope.contentdata[x].content=$rootScope.contentdata[x].content.replace('["','').replace.(']"','');
             }*/


            console.log(($rootScope.contentdata[x].content));
            $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].id]=$rootScope.contentdata[x];
            if($rootScope.contentdata[x].parentid!=0){

                var z=parseInt($rootScope.contentdata[x].parentid);
                console.log(z);
                console.log($rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid);

                $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid]=$rootScope.contentdata[x];

            }

            //var model=$parse($rootScope.contentdata[x].id);
            //model.assign($scope, $rootScope.contentdata[x]);
            //.id=$rootScope.contentdata[x];
        }

        //console.log('----'+$scope);


    },$scope.interval);




});


jungledrone.controller('virtualreality', function($scope,$state,$http,$cookieStore,$rootScope,contentservice,$sce,$compile) {
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


    $scope.interval=200;
    $scope.contentupdated=false;
    var myVar =setInterval(function(){

        $rootScope.contentdata=contentservice.getcontent( $scope.adminUrl+'contentlist');


        //console.log('in setInterval'+$scope.interval);
        //console.log( $rootScope.contentdata);
        var x;
        var y;
        if(typeof ($rootScope.contentdata)!='undefined' && $scope.contentupdated){

            $scope.interval=999990;

            clearInterval(myVar);
        }

        $scope.contentupdated=true;
        for (x in $rootScope.contentdata ){
            var contentw='';
            //console.log($rootScope.contentdata[x]);
            //console.log(($rootScope.contentdata[x].content));
            //console.log(($rootScope.contentdata[x].parentid));


            if($rootScope.contentdata[x].ctype!='image') {

                for (y in $rootScope.contentdata[x].content) {
                    if ($rootScope.contentdata[x].ctype != 'image')
                        contentw += ($rootScope.contentdata[x].content[y]);
                    else {

                        contentw += "<img src=" + $rootScope.contentdata[x].content[y] + " />";
                    }
                }
                $rootScope.contentdata[x].content=(contentw);
            }
            /* else{

             $rootScope.contentdata[x].content = "< img src = " + $rootScope.contentdata[x].content + " >";

             //$rootScope.contentdata[x].content=$rootScope.contentdata[x].content.replace('["','').replace.(']"','');
             }*/


           // console.log(($rootScope.contentdata[x].content));
            $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].id]=$rootScope.contentdata[x];
            if($rootScope.contentdata[x].parentid!=0){

                var z=parseInt($rootScope.contentdata[x].parentid);
              //  console.log(z);
               // console.log($rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid);

                $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid]=$rootScope.contentdata[x];

            }

            //var model=$parse($rootScope.contentdata[x].id);
            //model.assign($scope, $rootScope.contentdata[x]);
            //.id=$rootScope.contentdata[x];
        }

        //console.log('----'+$scope);


    },$scope.interval);




});


jungledrone.controller('packagedelivery', function($compile,$scope,contentservice,$state,$http,$cookieStore,$rootScope,Upload,$sce) {

    $scope.interval=200;
    $scope.contentupdated=false;
    var myVar =setInterval(function(){

        $rootScope.contentdata=contentservice.getcontent( $scope.adminUrl+'contentlist');


        //console.log('in setInterval'+$scope.interval);
        //console.log( $rootScope.contentdata);
        var x;
        var y;
        if(typeof ($rootScope.contentdata)!='undefined' && $scope.contentupdated){

            $scope.interval=999990;

            clearInterval(myVar);
        }

        $scope.contentupdated=true;
        for (x in $rootScope.contentdata ){
            var contentw='';
            //console.log($rootScope.contentdata[x]);
            //console.log(($rootScope.contentdata[x].content));
            //console.log(($rootScope.contentdata[x].parentid));


            if($rootScope.contentdata[x].ctype!='image') {

                for (y in $rootScope.contentdata[x].content) {
                    if ($rootScope.contentdata[x].ctype != 'image')
                        contentw += ($rootScope.contentdata[x].content[y]);
                    else {

                        contentw += "<img src=" + $rootScope.contentdata[x].content[y] + " />";
                    }
                }
                $rootScope.contentdata[x].content=(contentw);
            }
           /* else{

                $rootScope.contentdata[x].content = "< img src = " + $rootScope.contentdata[x].content + " >";

                //$rootScope.contentdata[x].content=$rootScope.contentdata[x].content.replace('["','').replace.(']"','');
            }*/


           // console.log(($rootScope.contentdata[x].content));
            $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].id]=$rootScope.contentdata[x];
            if($rootScope.contentdata[x].parentid!=0){

                var z=parseInt($rootScope.contentdata[x].parentid);
                //console.log(z);
               // console.log($rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid);

                $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid]=$rootScope.contentdata[x];

            }

            //var model=$parse($rootScope.contentdata[x].id);
            //model.assign($scope, $rootScope.contentdata[x]);
            //.id=$rootScope.contentdata[x];
        }

        //console.log('----'+$scope);


    },$scope.interval);

});
jungledrone.controller('header', function($compile,$scope,contentservice,$state,$http,$cookieStore,$rootScope,Upload,$sce,carttotal,$uibModal) {



    $rootScope.filecartarr=[];
    //$cookieStore.remove('filecartarr');
    if(typeof($cookieStore.get('filecartarr'))!='undefined') $rootScope.filecartarr=$cookieStore.get('filecartarr');


    $rootScope.fileidstr='';
    var log = [];


    $rootScope.emptyfilecart=function(){

       setTimeout(function(){

           $cookieStore.remove('filecartarr');
           $rootScope.filecartarr=[];
       },6000);



    }

    angular.forEach($rootScope.filecartarr, function(value, key) {
        //console.log( value);
        /*  console.log( key);
         console.log( value.id);
         console.log( value.cat_name);
         console.log( value['id']);*/

        if($rootScope.fileidstr.length>1)$rootScope.fileidstr=$rootScope.fileidstr+"|"+value.id;
        else $rootScope.fileidstr=value.id;


    }, log);


    setTimeout(function(){

        if($rootScope.userid == 0)  $rootScope.cartuser=$cookieStore.get('randomid');
        else {
            $rootScope.cartuser = $rootScope.userid;
        }

        $rootScope.carttotal=parseInt(carttotal.getcontent('http://admin.710mny.com/carttotal?user='+$rootScope.cartuser));

        $http({
            method:'POST',
            async:false,
            url:$scope.adminUrl+'cartdetail',
            data    : $.param({'user':$rootScope.cartuser}),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(data){
            /*
             $scope.cartarray=data;
             $scope.carttotalprice=0;
             */
            $rootScope.cartarray=data;
            $rootScope.cartarray2=data.cartarr;

            /*
             angular.forEach(data, function(value, key){
             //console.log(value.type);
             //if(value.type == "Stock Image") {
             $scope.carttotalprice+=parseFloat(value.qty*value.price);
             //}
             });
             */


        });

       // console.log($rootScope.userid+'state change user id header ');

    },2000);

    $rootScope.delfilecart=function(val){

        $rootScope.filecartarr=[];
        if(typeof($cookieStore.get('filecartarr'))!='undefined') $rootScope.filecartarr=$cookieStore.get('filecartarr');


        $rootScope.fileidstr='';
        var log = [];

        //$rootScope.filecartarr.push($rootScope.filecartval);

      //  console.log(val);
        //$rootScope.filecartarr.splice(val,1);
        //$cookieStore.put('filecartarr',$rootScope.filecartarr);

        $rootScope.filecartarr1=[];

        angular.forEach($rootScope.filecartarr, function(value, key) {
            //console.log( value);
            /*  console.log( key);
             console.log( value.id);
             console.log( value.cat_name);
             console.log( value['id']);*/
            if(value.id!=val){

                $rootScope.filecartarr1.push(value);

                if($rootScope.fileidstr.length>1)$rootScope.fileidstr=$rootScope.fileidstr+"|"+value.id;
                else $rootScope.fileidstr=value.id;
                //

            }




        }, log);

        $cookieStore.put('filecartarr',$rootScope.filecartarr1);

        $rootScope.filecartarr=$rootScope.filecartarr1;

        setTimeout(function(){

            $('#cartbtn').addClass('open');
            $('#cartbtn').parent().addClass('open');

        },200);




    }


    $rootScope.userrole=0;
    $rootScope.userfullname=0;
    $rootScope.userid=0;
    $rootScope.userrole=0;

    if(typeof ($cookieStore.get('userrole')!='undefined'))
        $rootScope.userrole=$cookieStore.get('userrole');
    $rootScope.userfullname=$cookieStore.get('userfullname');
    if(typeof ($cookieStore.get('userid'))!='undefined'){

        $rootScope.userid=$cookieStore.get('userid');
        $rootScope.username=$cookieStore.get('username');

    }
    $rootScope.userrole=$cookieStore.get('userrole');

  //  console.log($rootScope.userid+'--userid');
    $rootScope.logout = function () {
        $cookieStore.remove('userid');
        $cookieStore.remove('username');
        $cookieStore.remove('useremail');
        $cookieStore.remove('userfullname');
        $cookieStore.remove('userrole');

        $rootScope.userrole=0;
        $rootScope.userfullname=0;
        $rootScope.userid=0;
        $rootScope.userrole=0;

     //   console.log($rootScope.userid+'userid');

     //   console.log('in logout');
        $rootScope.userid=0;

        $('.editableicon').css('display','none');
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
            /*

            console.log('uuuu');
            if($('.dropdown-menu').css('display')=='none'){

                $('.dropdown-menu').show();
                $('.dropdown-menu').stop(true, true).delay(400).show();

            }
            else{

                $('.dropdown-menu').hide();
                $('.dropdown-menu').stop(true, true).delay(400).hide();
            }
*/

        }

        $('ul.nav li.dropdown').hover(function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }, function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
        });


    },2000);




    if($rootScope.userrole==7 || $rootScope.userrole==4){


        $http({
            method:'POST',
            async:false,
            url:$scope.adminUrl+'mydownloadlist?userid='+$rootScope.userid,
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data){
            $rootScope.filenotdownloaded=data.notdownloaded;
            $rootScope.filedownloaded=data.downloaded;
            $rootScope.notdownloadcount=data.notdownloadcount;
        })

    }
    /*$rootScope.newuser=function(type){
        $rootScope.usertype=type;
        $uibModal.open({
            animation: true,
            templateUrl: 'fontsignupmodal.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            scope: $rootScope
        });
    }*/









    $rootScope.updatecart=function(){

        $http({
            method:'POST',
            async:false,
            url:$scope.adminUrl+'cartdetail',
            data    : $.param({'user':$scope.cartuser}),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(data){


            console.log($scope.cartarray);

            //$scope.cartarray=data;

            $rootScope.cartarray=data;
            $rootScope.cartarray2=data.cartarr;

            $scope.carttotalprice=0;

            angular.forEach(data, function(value, key){
                //console.log(value.type);
                //if(value.type == "Stock Image") {
                $scope.carttotalprice+=parseFloat(value.qty*value.price);
                //}
            });


        });
    }

    $rootScope.headelcart=function(val){

        $scope.cartnew = $scope.cartarray.cartarr;

        var idx = $scope.cartnew.indexOf(val);

        $http({
            method:'POST',
            async:false,
            url:$scope.adminUrl+'deletecartbyid',
            data    : $.param({'pid':val.pid,'userid':$scope.cartuser}),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(data){

            $rootScope.carttotal=parseInt($rootScope.carttotal-parseInt(val.qty));
            // $scope.cartarray.quantity=$scope.cartarray.quantity-parseInt(val.qty);
            // $scope.cartarray.subtotal=($scope.cartarray.subtotal-parseFloat(val.subtotal)).toFixed(2);
            $scope.cartnew.splice(idx,1);

        });







    }



});
jungledrone.controller('employment', function($scope,$state,$http,$cookieStore,$rootScope,Upload,contentservice) {


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



    $scope.interval=200;
    $scope.contentupdated=false;
    var myVar =setInterval(function(){

        $rootScope.contentdata=contentservice.getcontent( $scope.adminUrl+'contentlist');


        //console.log('in setInterval'+$scope.interval);
        //console.log( $rootScope.contentdata);
        var x;
        var y;
        if(typeof ($rootScope.contentdata)!='undefined' && $scope.contentupdated){

            $scope.interval=999990;

            clearInterval(myVar);
        }

        $scope.contentupdated=true;
        for (x in $rootScope.contentdata ){
            var contentw='';
            //console.log($rootScope.contentdata[x]);
            //console.log(($rootScope.contentdata[x].content));
            //console.log(($rootScope.contentdata[x].parentid));


            if($rootScope.contentdata[x].ctype!='image') {

                for (y in $rootScope.contentdata[x].content) {
                    if ($rootScope.contentdata[x].ctype != 'image')
                        contentw += ($rootScope.contentdata[x].content[y]);
                    else {

                        contentw += "<img src=" + $rootScope.contentdata[x].content[y] + " />";
                    }
                }
                $rootScope.contentdata[x].content=(contentw);
            }
            /* else{

             $rootScope.contentdata[x].content = "< img src = " + $rootScope.contentdata[x].content + " >";

             //$rootScope.contentdata[x].content=$rootScope.contentdata[x].content.replace('["','').replace.(']"','');
             }*/


           // console.log(($rootScope.contentdata[x].content));
            $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].id]=$rootScope.contentdata[x];
            if($rootScope.contentdata[x].parentid!=0){

                var z=parseInt($rootScope.contentdata[x].parentid);
              //  console.log(z);
              //  console.log($rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid);

                $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid]=$rootScope.contentdata[x];

            }

            //var model=$parse($rootScope.contentdata[x].id);
            //model.assign($scope, $rootScope.contentdata[x]);
            //.id=$rootScope.contentdata[x];
        }

        //console.log('----'+$scope);


    },$scope.interval);




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
        valid_elements : "a[href|target=_blank],strong/b,div[align|class],br,span,label",
        force_p_newlines : false,
        forced_root_block:'',
        extended_valid_elements : "label,span"
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
                $scope.form.contenturl = response.data.contenturl;

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

    $scope.form={};
    $scope.form.resume = '';
    $scope.form.resumearrn = new Array();
    $scope.form.resumearrp = new Array();
    $scope.form.resume = null;;

    $scope.userid=$stateParams.userId;


    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'contentlistbyid',
        data    : $.param({'id':$scope.userid}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        console.log(data);
        //console.log($scope.form);
        console.log('after form');
        $scope.form = {
            //id: data.id,
            //refferal_code: data.refferal_code,
            cname: data.cname,
            ctype: data.ctype,
            description: data.description,
            parentid:data.parentid
            //ismultiple: data.content.length,
        }

        if(data.content.length>1) $scope.form.ismultiple='yes';
        else $scope.form.ismultiple='no';
        if(data.ctype=='html') {
            $scope.chtml=true;
            $scope.form.chtml=data.content;
        }
        if(data.ctype=='text') {
            $scope.form.ctext=data.content;
            $scope.ctext=true;
        }
        if(data.ctype=='image'){
            $scope.form.cimage=data.content;
            $scope.form.resume=data.contenturl;
            $scope.form.image_url_url=data.contenturl;
            $scope.cimage=true;
            $scope.form.ismultiple='no';

        }



        console.log($scope.form);
        console.log('after form');
    });





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
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        toolbar2: "print preview media | forecolor backcolor emoticons",
        valid_elements : "a[href|target=_blank],strong/b,div[align|class],br,span,label,h3,h4,h2,h1,strong",
        extended_valid_elements : "label,span",
        'force_p_newlines'  : false,
        'forced_root_block' : '',
    };




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
                $scope.form.image_url_url = response.data.image_url_url;
                $scope.form.event_image = response.data.image_name;

                $scope.form.resumearrn=new Array();
                $scope.form.resumearrp=new Array();
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

            if(typeof ($rootScope.previousState)!='undefined') $state.go($rootScope.previousState);
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
                if(typeof (data.userdetails.roles[9]) != 'undefined')
                    $cookieStore.put('userrole',9);

                if(typeof($rootScope.goafterlogin) != 'undefined'){
                    if($rootScope.goafterlogin != ''){
                        $state.go($rootScope.goafterlogin);
                        return
                    }

                }

                if (typeof (data.userdetails.roles[7]) != 'undefined' ){
                    $state.go('mydownloads', {id: 0});
                    return;
                }

                if (typeof (data.userdetails.roles[8]) != 'undefined' ){
                    $state.go('myprofile');
                    return;
                }
                if (typeof (data.userdetails.roles[9]) != 'undefined' ){
                    $state.go('myaccount-product-list', {id: 0});
                    return;
                }

                if(typeof($rootScope.goafterlogin) != 'undefined'){
                    if($rootScope.goafterlogin != ''){
                        $state.go($rootScope.goafterlogin);
                        return
                    }

                }


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

    $scope.form={};
    $scope.form.address='';
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
jungledrone.controller('imagesizeadd', function($scope,$state,$http,$cookieStore,$rootScope) {
    // $state.go('login');
    //$scope.contact=['Anytime','Early morning','Mid morning','Afternoon','Early evening','Late evening'];
    $scope.submitadminForm = function(){

        console.log($scope.adminUrl+'imagesizeadd');


        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'imagesizeadd',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            //$rootScope.stateIsLoading = false;
            if(data.status == 'error'){
                console.log(data);
                $('.email_div').append('<label class="control-label has-error validationMessage">This email already exists.</label>');
            }else{
                $state.go('imagesize-list');
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
jungledrone.controller('editimagesize', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams){

    $scope.id=$stateParams.id;

    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'imagesizedetails',
        data    : $.param({'id':$scope.id}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        console.log(data);
        $scope.form = {
            id: data.id,
            sizename: data.sizename,
            height: data.height,
            width: data.width,
            priority: data.priority,
            status: data.status,
            style_id: data.style_id

        }
    });
    $scope.update = function () {

        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'imagesizeupdates',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $state.go('imagesize-list');
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
jungledrone.controller('contentlist', function($scope,$state,$http,$cookieStore,$rootScope) {




    $scope.getTextToCopy = function() {
        return "ngClip is awesome!";
    }
    $scope.doSomething = function () {
        console.log("NgClip...");
    }

    var clipboard = new Clipboard('.btn');


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
        url     : $scope.adminUrl+'contentlist',
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        //console.log(data);
        var x;
        var y;

        for (x in data ){
            var contentw='';
            //console.log($rootScope.contentdata[x]);
            //console.log(($rootScope.contentdata[x].content));
            //console.log(($rootScope.contentdata[x].parentid));


            if(data[x].ctype!='image') {

                for (y in data[x].content) {
                    if (data[x].ctype != 'image')
                        contentw += (data[x].content[y]);
                    else {

                        contentw += "<img src=" + data[x].content[y] + " />";
                    }
                }
                data[x].content=(contentw);
            }
            /* else{

             $rootScope.contentdata[x].content = "< img src = " + $rootScope.contentdata[x].content + " >";

             //$rootScope.contentdata[x].content=$rootScope.contentdata[x].content.replace('["','').replace.(']"','');
             }*/


            //console.log(($rootScope.contentdata[x].content));
            $scope[data.cname+data[x].id]=data[x];
            if(data[x].parentid!=0){

                var z=parseInt(data[x].parentid);
                console.log(z);
                console.log(data[x].cname+data[x].parentid);

                $scope[data[x].cname+data[x].parentid]=data[x];

            }

            //var model=$parse($rootScope.contentdata[x].id);
            //model.assign($scope, $rootScope.contentdata[x]);
            //.id=$rootScope.contentdata[x];
        }


        $scope.userlist=data;
        $scope.userlistp = $scope.userlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));


    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.cname.indexOf($scope.searchkey) != -1) || (item.content.indexOf($scope.searchkey) != -1) ){
            return true;
        }
        return false;

        //return true;
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


jungledrone.controller('imagesizelist', function($scope,$state,$http,$cookieStore,$rootScope) {
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
        url     : $scope.adminUrl+'imagesizelist',
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

        if ( (item.sizename.indexOf($scope.searchkey) != -1) || (item.height.indexOf($scope.searchkey) != -1) ||(item.width.indexOf($scope.searchkey) != -1)||(item.mobile_no.indexOf($scope.searchkey) != -1)||(item.phone_no.indexOf($scope.searchkey) != -1) ||(item.address.indexOf($scope.searchkey) != -1)){
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
            url     : $scope.adminUrl+'deleteimagesizeupdate',
            data    : $.param({id: $scope.userlist[idx].id}),  // pass in data as strings
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
            url     : $scope.adminUrl+'imagesizeupdatestatus',
            data    : $.param({id: $scope.userlist[idx].id,status:$scope.userlist[idx].status}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.userlist[idx].status = 1-$scope.userlist[idx].status;
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


    $scope.format = 'MM/dd/yyyy';
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

        $scope.form.start_time=convert(s);
        $scope.form.end_time=convert(e)

        $scope.tdif=parseInt(convert(e)-convert(s));
    };

    $scope.clear = function() {
        $scope.starttime = null;
    };




});


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var month1 = a.getUTCMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + ' ' + date + ' ' + year + '  ' + hour + ':' + min + ':' + sec ;
    return time;
}

var firstDayOfMonth = function() {
    // your special logic...
    return 5;
};

jungledrone.controller('editflight',function($scope,$state,$http,$cookieStore,$rootScope,$log,Upload,uibDateParser,$stateParams){


    $scope.fid = $stateParams.id;
    //$scope.form={};
    $scope.event_status=false;
    $scope.event_img=false;

    $http({
        method: 'POST',
        async: false,
        url: $scope.adminUrl + 'flightdetails',
        data: $.param({'id': $scope.fid}),  // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data) {
        console.log(data);

        $scope.form = {
            id: data.id,
            status: 2,
            refferid: data.id,
            //flight_daterange: timeConverter(data.dateforg),
            aircraft: data.aircraft,
            manoeuvre: data.manoeuvre,
            first_flight: $cookieStore.get('userfname'),
            last_flight: $cookieStore.get('userlname'),
            flight_daterange: new Date(data.dateforg * 1000),
            start_time: new Date(data.start_time * 1000),
            end_time: new Date(data.end_time * 1000),
            //event_status: data.event_status,
            notes: data.notes,
            user_id: data.user_id,
            editstatus: 1,

        }
        //setTimeout(function(){



            $scope.dt = new Date(data.dateforg * 1000);
            $scope.starttime = new Date(data.start_time * 1000);
            $scope.endtime = new Date(data.end_time * 1000);
            $scope.ismeridian=true;

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



            console.log($scope.dt);
            console.log($scope.starttime);
            console.log($scope.endtime);

       // },2000)







    });





    $scope.format = 'MM/dd/yy';
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


        console.log( $('input[name="first_flight"]').val()+'   f val');
        console.log( $('input[name="last_flight"]').val()+'  l val');

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








   /* setTimeout(function(){
        jQuery('input[name="event_daterange"]').daterangepicker({
            /!* timePicker: true,
             timePickerIncrement: 30,*!/
            locale: {
                format: 'MM/DD/YYYY h:mm A'
            }
        });


        var d = new Date();
        var currMonth = d.getMonth();
        var currYear = d.getFullYear();
        var startDate = new Date(currYear,currMonth,firstDayOfMonth());
        jQuery('input[name="event_daterange"]').daterangepicker('setDate',startDate);*/

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

    //},4000);


    $scope.addeventsForm=function(){


        $scope.form.flight_daterangeorg=($scope.form.flight_daterange);
        $scope.form.flight_daterange=convert($scope.form.flight_daterange);

        /*console.log(($scope.form));
        console.log( jQuery('input[name="event_daterange"]').val());*/

        //return true;



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



/*
        console.log($scope.endtime+'et'+
        $scope.starttime+'st');*/

        $scope.form.start_time=convert($scope.starttime);
        $scope.form.end_time=convert($scope.endtime);

        /*console.log('td-'+parseInt($scope.endtime.getHours()-$scope.starttime.getHours()));
         console.log('md-'+parseInt($scope.endtime.getMinutes()-$scope.starttime.getMinutes()));*/


        ////console.log('td1-'+angular.element('input[ng-model="hours"]').eq(0).val());
        // console.log('td1-'+angular.element('input[ng-model="hours"]').eq(1).val());
        //console.log('md2-'+parseInt($scope.minutes));

        var totalst=parseInt(parseInt(angular.element('input[ng-model="hours"]').eq(0).val()*60)+parseInt(angular.element('input[ng-model="minutes"]').eq(0).val()));
        var totalet=parseInt(parseInt(angular.element('input[ng-model="hours"]').eq(1).val()*60)+parseInt(angular.element('input[ng-model="minutes"]').eq(1).val()));


        //console.log('timediff'+$scope.tdif);

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


    /*var st=new Date();
    //console.log(st.getHours());
    st.setHours(st.getHours());
    var et=new Date();
    //console.log(st.getHours());
    et.setHours(et.getHours()+1);
    $scope.endtime = et;
    $scope.starttime = st;*/


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

        $scope.form.start_time=convert(s);
        $scope.form.end_time=convert(e);
        $scope.starttime=s;
        $scope.endtime=e;

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
        $scope.eventlistp = data;


    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.fflight.indexOf($scope.searchkey) != -1) || (item.lflight.indexOf($scope.searchkey) != -1) || (item.datef.indexOf($scope.searchkey) != -1)  ){
            return true;
        }
        return false;
    };


    $scope.setdata = function(item){

        $scope.nedate=convert($scope.edate);
        $scope.nsdate=convert($scope.sdate);
        if(typeof ($scope.edate)!='undefined' && typeof ($scope.sdate)!='undefined' && $scope.edate!=null && $scope.sdate!=null) {

            console.log($scope.nedate + 'ed');
            console.log($scope.nsdate + 'sd');
            console.log(item.realdatef + 'red');

            if (item.realdatef <= $scope.nedate && item.realdatef >= $scope.nsdate)
                return true;
            else return false;
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
            data    : $.param({id: $scope.eventlist[idx].orgid}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $scope.eventlist.splice(idx,1);
            $scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));

        });
    }

 $scope.delflight1 = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.eventlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'delflight1?role='+$rootScope.userrole,
            data    : $.param({id: $scope.eventlist[idx].orgid}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            //$scope.eventlist.splice(idx,1);
            //$scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));



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
                //$scope.eventlistp = $scope.eventlist.slice($scope.begin, parseInt($scope.begin+$scope.perPage));
                $scope.eventlistp = data;


            });

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
      //  console.log('in user login');
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

        $state.go('index');
    }


    if (typeof($cookieStore.get('userid')) != 'undefined' && $cookieStore.get('userid') > 0) {

        if($cookieStore.get('userrole') != 7){
            $rootScope.userfullname=$cookieStore.get('userfullname');
            $rootScope.userid=$cookieStore.get('userid');
            $rootScope.userrole=$cookieStore.get('userrole');
            $rootScope.username=$cookieStore.get('username');
        }else{
            $state.go('index');
        }

    }else{
        $rootScope.userid=0;
        $state.go('login');
    }



// console.log('in admin header');
});


jungledrone.controller('services', function($compile,$scope,contentservice,$state,$http,$cookieStore,$rootScope,Upload,$sce) {
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





    $scope.interval=200;
    $scope.contentupdated=false;
    var myVar =setInterval(function(){

        $rootScope.contentdata=contentservice.getcontent( $scope.adminUrl+'contentlist');


        //console.log('in setInterval'+$scope.interval);
        //console.log( $rootScope.contentdata);
        var x;
        var y;
        if(typeof ($rootScope.contentdata)!='undefined' && $scope.contentupdated){

            $scope.interval=999990;

            clearInterval(myVar);
        }

        $scope.contentupdated=true;
        for (x in $rootScope.contentdata ){
            var contentw='';
            //console.log($rootScope.contentdata[x]);
            //console.log(($rootScope.contentdata[x].content));
            //console.log(($rootScope.contentdata[x].parentid));


            if($rootScope.contentdata[x].ctype!='image') {

                for (y in $rootScope.contentdata[x].content) {
                    if ($rootScope.contentdata[x].ctype != 'image')
                        contentw += ($rootScope.contentdata[x].content[y]);
                    else {

                        contentw += "<img src=" + $rootScope.contentdata[x].content[y] + " />";
                    }
                }
                $rootScope.contentdata[x].content=(contentw);
            }
            /* else{

             $rootScope.contentdata[x].content = "< img src = " + $rootScope.contentdata[x].content + " >";

             //$rootScope.contentdata[x].content=$rootScope.contentdata[x].content.replace('["','').replace.(']"','');
             }*/


            console.log(($rootScope.contentdata[x].content));
            $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].id]=$rootScope.contentdata[x];
            if($rootScope.contentdata[x].parentid!=0){

                var z=parseInt($rootScope.contentdata[x].parentid);
                console.log(z);
                console.log($rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid);

                $scope[$rootScope.contentdata[x].cname+$rootScope.contentdata[x].parentid]=$rootScope.contentdata[x];

            }

            //var model=$parse($rootScope.contentdata[x].id);
            //model.assign($scope, $rootScope.contentdata[x]);
            //.id=$rootScope.contentdata[x];
        }

        //console.log('----'+$scope);


    },$scope.interval);



});


jungledrone.controller('cart', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams,$uibModal) {


    if($rootScope.userid == 0)  $scope.cartuser=$cookieStore.get('randomid');
    else
        $scope.cartuser=$rootScope.userid;

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'cartdetail',
        data    : $.param({'user':$scope.cartuser}),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){


        $scope.cartarray1=data;
        $scope.cartarray21=data.cartarr;

   // $scope.cartarray=data;


    });


    if($rootScope.userid == 0)  $scope.cartuser=$cookieStore.get('randomid');
    else {
        $scope.cartuser=$rootScope.userid;

        $http({
            method:'POST',
            async:false,
            url:$scope.adminUrl+'updatecartuser',
            data    : $.param({'newuserid':$rootScope.userid,'olduserid':$cookieStore.get('randomid')}),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(data){






        });
    }

    $scope.addqty=function(val){

        $('.qtyi'+val).val(parseInt(parseInt( $('.qtyi'+val).val())+1));
        $http({
            method:'POST',
            async:false,
            url:$scope.adminUrl+'updatecart',
            data    : $.param({'pid':$('.qtyi'+val).attr('pid'),'qty':$('.qtyi'+val).val(),'userid':$scope.cartuser}),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(data){
            $scope.cartarray[val].qty= $scope.cartarray[val].qty+1;

            $rootScope.carttotal=parseInt($rootScope.carttotal+parseInt(1));

            $rootScope.updatecart();



        });
       // console.log(val+'addval'+$('.qtyi'+val).val());
    }
    $scope.delqty=function(val) {
        if ($('.qtyi' + val).val() > 1) {
            $('.qtyi' + val).val(parseInt(parseInt($('.qtyi' + val).val()) - 1));

            $http({
                method: 'POST',
                async: false,
                url: $scope.adminUrl + 'updatecart',
                data: $.param({
                    'pid': $('.qtyi' + val).attr('pid'),
                    'qty': $('.qtyi' + val).val(),
                    'userid': $scope.cartuser
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            }).success(function (data) {

                $rootScope.carttotal = parseInt($rootScope.carttotal - parseInt($('.qtyi' + val).val()));
                $scope.cartarray[val].qty = $scope.cartarray[val].qty -parseInt($('.qtyi' + val).val());


            });

        }
    }

        $rootScope.delcart=function(val){

            var idx =$scope.cartarray21.indexOf(val);



            $http({
                method:'POST',
                async:false,
                url:$scope.adminUrl+'deletecartbyid',
                data    : $.param({'pid':val.pid,'userid':$scope.cartuser}),
                headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

            }).success(function(data){

                $rootScope.carttotal=parseInt($rootScope.carttotal-parseInt(val.qty));

                $scope.cartarray21.splice(idx,1);

            });







    }

    $scope.chklogin = function(){
        if($rootScope.userid == 0){

            $rootScope.goafterlogin = 'checkout';

            $uibModal.open({
                animation: true,
                templateUrl: 'chkloginpopup',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                scope:$scope
            });
        }else{
            $state.go('checkout');
            return
        }
    }

});
jungledrone.controller('checkout', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams) {


    if($rootScope.userid == 0)
        $scope.cartuser=$cookieStore.get('randomid');
    else
        $scope.cartuser=$rootScope.userid;

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'cartdetail',
        data    : $.param({'user':$scope.cartuser}),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(data){
        $scope.cartarray1=data;
        $scope.cartarray21=data.cartarr;
    });

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'getPrevAddr',
        data    : $.param({'user':$scope.cartuser}),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(data){
        $scope.addressList=data;
    });

    $scope.changeAddress = function(item){
        $scope.stateList = [];

        if(typeof(item) != 'undefined'){
            $scope.billform = {
                'billshipchk':true,
                'userid':$rootScope.userid,
                'prevaddress1':item.id,
                'prevaddress':{
                    'id':item.id
                },
                'address_title':item.address_title,
                'bname':item.name,
                'company':item.company,
                'address':item.address,
                'address2':item.address2,
                'city':item.city,
                'country':{
                    id: item.country
                },
                'zip':item.zip,
                'phone':item.phone,
                'email':item.email
            }


            if(typeof(item.country) != 'undefined'){
                $http({
                    method:'POST',
                    async:false,
                    url:$scope.adminUrl+'getState',
                    data    : $.param({'country_id':item.country}),
                    headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data){
                    $scope.stateList=data;

                    var pstate = {
                        'state':{
                            id: item.state
                        }
                    }
                    angular.extend($scope.billform, pstate);
                });
            }


        }else{
            $scope.billform = {
                'billshipchk':true,
                'userid':$rootScope.userid,
                'company':'',
                'address2':'',
                'prevaddress1':''
            }
        }
    }

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'getCountry',
    }).success(function(data){
        $scope.countryList=data;
    });

    $scope.stateList = [];

    $scope.cardyear=[2016,2017,2018,2019,2020,2021,2022,2023,2024,20125,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040];

    $scope.shipstateList = [];

    $scope.changeCountry = function(country){
        $scope.stateList = [];
        if(typeof(country.id) != 'undefined'){
            $http({
                method:'POST',
                async:false,
                url:$scope.adminUrl+'getState',
                data    : $.param({'country_id':country.id}),
                headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data){
                $scope.stateList=data;
            });
        }
    }

    $scope.changeCountry1 = function(country){
        $scope.shipstateList = [];
        if(typeof(country.id) != 'undefined'){
            $http({
                method:'POST',
                async:false,
                url:$scope.adminUrl+'getState',
                data    : $.param({'country_id':country.id}),
                headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data){
                $scope.shipstateList=data;
            });
        }
    }

    $scope.billform = {
        'userid':$rootScope.userid,
        'company':'',
        'address2':'',
        'prevaddress1':'',
        'billshipchk':true,
    }

    $scope.shipform = {
        'userid':$rootScope.userid,
        'company':'',
        'address2':'',
    }
    $scope.shipform = {
        'userid':$rootScope.userid,
        'company':'',
        'address2':'',
    }

    $scope.errormsg='';
    $scope.checkoutsubmit = function(){

        $scope.form = {
            billform : $scope.billform,
            shipform : $scope.shipform,
            product_det : $scope.cartarray2,
            subtotal : $scope.cartarray.subtotal,
            total : $scope.cartarray.subtotal,
            affiliate_id : $scope.aff_id,
            cartform : $scope.cartform,
        }

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'checkout',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            if(data.status=='success') {
                $state.go('success');
                return;
            }
            else{
                $scope.errormsg = 'Transaction process failed!';
                console.log($scope.errormsg);
            }

        });
    }

    $scope.termsValidator=function(){

        if($scope.checkout.$submitted){

            if(typeof ($("input[name='terms']:checked").val()) != 'undefined' )
            {
                $scope.terms_error=false;
                //console.log('in true');
                return true ;
            }
            else {
                //console.log('in false');
                $scope.terms_error=true;
                return '';

            }

        }

    }





});
jungledrone.controller('plans', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams,$sce) {

    $scope.trustAsHtml=$sce.trustAsHtml;
    if($rootScope.userid == 0)  $scope.cartuser=$cookieStore.get('randomid');
    else
        $scope.cartuser=$rootScope.userid;

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'jungleproductlist?producttype=plan',
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.productlist=data;
    })

    $rootScope.plantaddtocart=function(pid){

        console.log($rootScope.userid+'userid..');

        if($rootScope.userid == 0)  $scope.cartuser=$cookieStore.get('randomid');
        else {
            $scope.cartuser=$rootScope.userid;

            $http({
                method:'POST',
                async:false,
                url:$scope.adminUrl+'updatecartuser',
                data    : $.param({'newuserid':$rootScope.userid,'olduserid':$cookieStore.get('randomid')}),
                headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

            }).success(function(data){



                $rootScope.updatecart();


            });
        }


        $scope.pqty=1;
        $http({
            method:'POST',
            async:false,
            url:$scope.adminUrl+'addtocart',
            data    : $.param({'pid':pid,'qty':$scope.pqty,'userid':$scope.cartuser}),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(data){

            $rootScope.carttotal=parseInt($rootScope.carttotal+parseInt($scope.pqty));

            $rootScope.cartarray=data;
            $rootScope.cartarray2=data.cartarr;
            $state.go('cart');

        });



    }

});


jungledrone.controller('productdetails', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams) {


    $scope.categorylist = {};

    $scope.categoryid = {};
    $scope.categoryid.id = $stateParams.id;
    $scope.catid = $stateParams.id;
    $scope.pid = $stateParams.id;


    $scope.cart = {};

    console.log($scope.cart);
    //$cookieStore.put('cart',$scope.cart);

    $rootScope.addtocart=function(pid){

        console.log($rootScope.userid+'userid..');

        if($rootScope.userid == 0)  $scope.cartuser=$cookieStore.get('randomid');
        else {
            $scope.cartuser=$rootScope.userid;

            $http({
                method:'POST',
                async:false,
                url:$scope.adminUrl+'updatecartuser',
                data    : $.param({'newuserid':$rootScope.userid,'olduserid':$cookieStore.get('randomid')}),
                headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

            }).success(function(data){



            $rootScope.updatecart();


            });
        }



        $http({
            method:'POST',
            async:false,
            url:$scope.adminUrl+'addtocart',
            data    : $.param({'pid':pid,'qty':$scope.pqty,'userid':$scope.cartuser}),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(data){

            $rootScope.carttotal=parseInt($rootScope.carttotal+parseInt($scope.pqty));

            $rootScope.cartarray=data;
            $rootScope.cartarray2=data.cartarr;
            $('html, body').animate({ scrollTop: 0 }, 1000);
            //$('.cartlisting').slideDown(200);

            $('.headcart').addClass('open');

        });



    }

    $scope.type='General';
    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'junglecategorylist?filter=status',
        data    : $.param({'type':$scope.type}),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;

        $scope.categorylist[0]=
        {
            id: 0,
            cat_name: 'All'
        };

        //$scope.categorylist[0].category_id='All';
        //console.log($scope.categorylist);
        /*
         angular.forEach(data, function(value, key){
         console.log(value.type);
         if(value.type == "Stock Image") {
         $scope.categorylist.push(value);
         }
         });
         console.log($scope.categorylist);
         */
    });



    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'jungleproductlist?filter='+$scope.pid,
        data    : $.param({'type':$scope.type}),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.productlist=data;
        //$scope.productlist=data;
        console.log(data[$scope.pid].product_name+'pname');
        console.log($scope.productlist);

        $scope.pname=data[$scope.pid].product_name;
        $scope.pdesc=data[$scope.pid].product_desc;
        $scope.productdetailmain=data[$scope.pid].productdetailmain;
        $scope.pprice=data[$scope.pid].price;
        $scope.image_url=data[$scope.pid].image_url;
    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( ((item.product_name.indexOf($scope.searchkey) != -1) && item.type==$scope.type) || ((item.product_desc.indexOf($scope.searchkey) != -1) && item.type==$scope.type)|| ((item.cat_name.indexOf($scope.searchkey) != -1) && item.type==$scope.type) ) {
            return true;
        }
        return false;
    };








    setTimeout(function(){
       $('.slider2').bxSlider({
           slideWidth: 230,
           minSlides: 2,
           maxSlides: 5,
           slideMargin: 10
       });

       $('.slider3').bxSlider({
           slideWidth: 343,
           minSlides: 3,
           maxSlides: 3,
           slideMargin: 10
       });
   },2000);


});
jungledrone.controller('stockphoto', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams,$uibModal) {
    $scope.categoryid={};
    $scope.categoryid.id=$stateParams.id;
    $scope.type1 = $stateParams.id;
    $scope.ftype = $stateParams.type;
    if($scope.ftype=='image') $scope.is_image=true;
    if($scope.ftype=='video') $scope.is_video=true;
    $scope.perPage = 21;


    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'imagesizelist?filter=1',
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.imagesizelist=data;
        $rootScope.stateIsLoading = false;


    });


    $rootScope.manageftype=function(val){
        console.log($scope.is_video);
        console.log($scope.is_image);

        if(val=='video'){
            $scope.ftype='video'
            $scope.is_image=false;
            $scope.allstock=false;
        }
        if(val=='image'){
            $scope.ftype='image'
            $scope.is_video=false;
            $scope.allstock=false;
        }
        console.log($scope.is_video);
        console.log($scope.is_image);
        $http({
            method:'POST',
            async:false,
            url:$scope.adminUrl+'jungleproductlist?ptype=stockphoto',
            //data    : $.param({'type':$scope.type}),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(data){
            $scope.productlist=[];
            if(val=='all'){
                $scope.is_video=false;
                $scope.is_image=false;
                $scope.productlist=data;
                console.log(333);
            }
            else {
                angular.forEach(data, function (value, key) {
                    //console.log((value));
                    if (value.cat_name.toString().indexOf($scope.catname) > -1 || $scope.selectedcatid == 0) {
                        if ($scope.ftype == 'image' && $scope.is_image == true && value.is_video == 0) {
                            $scope.productlist.push(value);
                            console.log('img');
                        }
                        if ($scope.ftype == 'video' && $scope.is_video == true && value.is_video == 1) {
                            $scope.productlist.push(value);
                            console.log('video');
                        }
                    }
                });
            }

        });

    }

    //$scope.type='Stock Image';
    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'junglecategorylist',
        //data    : $.param({'type':$scope.type}),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;
        $scope.categorylist.splice(0, 0, { id: 0, cat_name: 'All' });
        console.log('type 1');
        console.log($scope.type1);
        angular.forEach(data, function(value, key){
            //console.log(value.type);
            if(value.id == $scope.type1) {
                $scope.catname=(value.cat_name);
                $scope.selectedcatid=(value.id);
            }
        });

        $scope.productList();
    });



    $scope.productList = function(){
        $http({
            method:'POST',
            async:false,
            url:$scope.adminUrl+'jungleproductlist?ptype=stockphoto',
            //data    : $.param({'type':$scope.type}),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(data){
            $scope.productlist=[];



            angular.forEach(data, function(value, key){

                console.log('catname: '+$scope.catname);
                console.log('selectedcatid :'+$scope.selectedcatid);

                if((value.cat_name).toString().indexOf($scope.catname) > -1 || $scope.selectedcatid ==0 ) {

                    console.log('ftype: '+$scope.ftype);

                    if($scope.ftype=='image' && $scope.is_image==true && value.is_video==0){
                        $scope.productlist.push(value);
                        console.log('img');
                    }
                    if($scope.ftype=='video' && $scope.is_video==true && value.is_video==1){
                        $scope.productlist.push(value);
                        console.log('video');
                    }

                    console.log('ok');

                }
            });

            console.log('productlist');
            console.log($scope.productlist);
        });
    }


    $scope.searchkey='';
    $scope.search = function(item){

        if ( ((item.catids.indexOf($scope.searchkey) != -1) ) ||((item.product_name.indexOf($scope.searchkey) != -1) ) || ((item.product_desc.indexOf($scope.searchkey) != -1) )|| ((item.cat_name.indexOf($scope.searchkey) != -1) ) ) {
            return true;
        }
        return false;
    };

    $rootScope.gotonext=function(){

        //console.log($rootScope.targetval);
        //$('#modalstock').modal('hide');
        //$('#modalstockvideo').modal('hide');
        console.log($($rootScope.targetval).parent().parent().parent().next().html());
        //$($rootScope.targetval).parent().parent().find('a').eq(2).find('img').click();
        $timeout(function() {
            angular.element($rootScope.targetval).parent().parent().parent().next().find('a').eq(2).find('img').triggerHandler('click');
        }, 100);

    }
    $rootScope.gotoprev=function(){

        //console.log($rootScope.targetval);
        //$('#modalstock').modal('hide');
        //$('#modalstockvideo').modal('hide');
        console.log($($rootScope.targetval).parent().parent().parent().prev().html());
        //$($rootScope.targetval).parent().parent().find('a').eq(2).find('img').click();
        $timeout(function() {
            angular.element($rootScope.targetval).parent().parent().parent().prev().find('a').eq(2).find('img').triggerHandler('click');
        }, 100);

    }

    $rootScope.closemodal=function(){

        $('#modalstock').modal('hide');
        $('#modalstockvideo').modal('hide');

    }

    $scope.lazyimg='http://admin.jungledrones.com/imagestamp/96';


    $rootScope.togglepopover=function(){

        $('.popupdownload_tooltip').toggleClass('hideclass');

    }

    $rootScope.hoverOut=function(){

        $('.popupdownload_tooltip_downloads').addClass('hideclass');

    }
    $rootScope.togglepopover1=function($ev){
        console.log('-------popover1----');
        var target = $ev.target || $ev.srcElement || $ev.originalTarget;
        $('.popupdownload_tooltip_downloads').addClass('hideclass');

        $(target).parent().next().next().toggleClass('hideclass');

    }

    $rootScope.showmodal=function($ev,item){

        console.log(item);
        var target = $ev.target || $ev.srcElement || $ev.originalTarget;
        $rootScope.targetval=target;
        console.log($rootScope.targetval);
        console.log('=======');
        console.log(target);

        if(item.is_video == 0){






            console.log($(target).html());
            console.log($(target).attr('class'));
            console.log($(target).attr('imgsrc'));
            $('#gallerymodal').find('h2').find('img').attr('src','');
            $('#gallerymodal').find('h2').find('img').attr('src',$(target).attr('imgsrc'));
            $('#modalstock').modal('show');
            $('#modalstock').find('.gallerysub_info_left').find('h2').eq(0).text($(target).attr('pname'));
            //$('#modalstock').find('.galleryinfomainimg').find('img').eq(0).attr('src','../images/loadingpopupimg.gif');
            $('#modalstock').find('.galleryinfomainimg').find('img').eq(0).attr('src','../images/loadingpopupimg.gif');
            $scope.lazyimg=$(target).attr('imgsrc');
            $rootScope.$emit('lazyImg:refresh');
            $rootScope.$emit('lazyImg:refresh');
            $rootScope.$emit('lazyImg:runCheck');
            console.log($scope.lazyimg+'---lazyimg');
            //$compile($('#modalstock').find('.galleryinfomainimg'));
            $('#modalstock').find('.descinfo').html($(target).attr('pdesc'));
            $('#modalstock').find('.ftypep').text($(target).attr('ftype'));
            $('#modalstock').find('.creditsinfo').text($(target).attr('credits'));
            $('strong[stype="2"]').hide();
            $('strong[stype="1"]').show();
            $('li[stype="2"]').hide();
            $('li[stype="1"]').show();
            $scope.fileid=$(target).attr('pid');


            var cids=$(target).attr('catids');
            cids=JSON.parse(cids);
            var fulllistcats='';
            angular.forEach(cids, function (value, key) {
                //console.log((value));
                if(fulllistcats.length>0)fulllistcats+=" , "+value.cat_name;
                else fulllistcats="Category: "+value.cat_name;

            });

            $('#modalstock').find('.info2_span3').text(fulllistcats);

        }else{

            var target = $ev.target || $ev.srcElement || $ev.originalTarget;

            console.log($(target).html());
            console.log($(target).attr('class'));
            console.log($(target).attr('imgsrc'));
            $('#gallerymodal').find('h2').find('img').attr('src','');
            $('#gallerymodal').find('h2').find('img').attr('src',$(target).attr('imgsrc'));
            $('#modalstockvideo').modal('show');
            $('#modalstockvideo').find('.gallerysub_info_left').find('h2').eq(0).text($(target).attr('pname'));
            //$('#modalstock').find('.galleryinfomainimg').find('img').eq(0).attr('src','../images/loadingpopupimg.gif');
            //$('#modalstockvideo').find('.galleryinfomainimg').find('img').eq(0).attr('src','../images/loadingpopupimg.gif');
            var srcval='http://admin.jungledrones.com/sites/default/files/'+$(target).attr('product_file');
            //$scope.lazyimg="<source type='video/mp4' src= '"+srcval+"' </source>";
            console.log('src val='+srcval);
            $('#maintvVideo').find('source').attr('src','');
            $('#maintvVideo').find('source').attr('src',srcval);

            var player = document.getElementById('maintvVideo');

            var mp4Vid = document.getElementById('vsource');

            player.pause();

            // Now simply set the 'src' property of the mp4Vid variable!!!!

            mp4Vid.src = srcval;

            player.load();
            player.play();

            //$('#maintvVideo').play();;
            $compile($('.galleryinfomainimg'))($scope);
            $rootScope.$emit('lazyImg:refresh');
            $rootScope.$emit('lazyImg:refresh');
            $rootScope.$emit('lazyImg:runCheck');

            $('#modalstockvideo').find('.descinfo').html($(target).attr('pdesc'));
            $('#modalstockvideo').find('.ftypep').text($(target).attr('ftype'));
            $('#modalstockvideo').find('.creditsinfo').text($(target).attr('credits'));
            $('strong[stype="2"]').hide();
            $('strong[stype="1"]').show();
            $('li[stype="2"]').hide();
            $('li[stype="1"]').show();
            $scope.fileid=$(target).attr('pid');


            var cids=$(target).attr('catids');
            cids=JSON.parse(cids);
            var fulllistcats='';
            angular.forEach(cids, function (value, key) {
                //console.log((value));
                if(fulllistcats.length>0)fulllistcats+=" , "+value.cat_name;
                else fulllistcats="Category: "+value.cat_name;

            });

            $('#modalstockvideo').find('.info2_span3').text(fulllistcats);


        }
    }

    $rootScope.playVideoTeaserFrom = function() {
        var videoplayer = document.getElementById("maintvVideo");

        videoplayer.currentTime = 0; //not sure if player seeks to seconds or milliseconds
        videoplayer.play();

        var stopVideoAfter = 30 * 1000;

        videoplayer.onseeking = function() {
            if(videoplayer.currentTime > 30){
                videoplayer.pause();
                videoplayer.currentTime = 0;
            }
        };
        videoplayer.onplay = function() {
            setTimeout(function(){
                videoplayer.pause();
                videoplayer.currentTime = 0;
            }, stopVideoAfter);

        };

    }

    $scope.changecategory = function(){
        $state.go('stock-photo',{id:$scope.type1});
    }

});
jungledrone.controller('products', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams) {

    $scope.categorylist={};

    $scope.categoryid={};
    $scope.categoryid.id=$stateParams.id;
    $scope.catid=$stateParams.id;

    $scope.type='General';
    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'junglecategorylist?filter=status',
        data    : $.param({'type':$scope.type}),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;

        $scope.categorylist[0]=
        {
            id: 0,
            cat_name: 'All'
        };

        angular.forEach(data, function(value, key){
            //console.log(value.type);
            if(value.id == $stateParams.id) {
                $scope.catname=(value.cat_name);
            }
        });

        $scope.getProductList();

    });


    $scope.getProductList = function(){

        console.log($scope.catname);

        $http({
            method:'POST',
            async:false,
            url:$scope.adminUrl+'jungleproductlist',
            data    : $.param({'type':$scope.type}),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(data){
            $scope.productlist=data;
            console.log($scope.productlist);
        });
    }



    $scope.searchkey = '';
    $scope.search = function(item){

        if ( ((item.product_name.indexOf($scope.searchkey) != -1) && item.type==$scope.type) || ((item.product_desc.indexOf($scope.searchkey) != -1) && item.type==$scope.type)|| ((item.cat_name.indexOf($scope.searchkey) != -1) && item.type==$scope.type) ) {
            return true;
        }
        return false;
    };


});

jungledrone.controller('stockdetail', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams,$uibModal) {


    $scope.id=$stateParams.id;

    //console.log($scope.id+'sid');

     $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'jungleproductlist?filter=1',
        data    : $.param({'type':$scope.type}),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

     }).success(function(data){
         $scope.productlist=data;
         $scope.pname=data[$scope.id].product_name;
         $scope.pdesc=data[$scope.id].product_desc;
         $scope.image_url=data[$scope.id].image_url;
         $scope.is_video = data[$scope.id].is_video;
         $scope.type = data[$scope.id].type;
         $scope.currentpid=data[$scope.id];


         //console.log(da//ta);
         console.log($scope.type+'==type');
         //console.log(data[9].product_name);
     });


    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'imagesizelist?filter=1',
        // data    : $.param($scope.form),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.imagesizelist=data;
        $rootScope.stateIsLoading = false;


    });
    $('script[src="ng-js/ui-bootstrap-tpls-0.14.3.min.js"]').remove();

    $scope.clickable=0;
    $scope.sizechoiceval=false;


    $rootScope.playVideoTeaserFrom = function() {
        var videoplayer = document.getElementById("maintvVideo");

        videoplayer.currentTime = 0; //not sure if player seeks to seconds or milliseconds
        videoplayer.play();

        var stopVideoAfter = 30 * 1000;

        videoplayer.onseeking = function() {
            if(videoplayer.currentTime > 30){
                videoplayer.pause();
                videoplayer.currentTime = 0;
            }
        };
        videoplayer.onplay = function() {
            setTimeout(function(){
                videoplayer.pause();
                videoplayer.currentTime = 0;
            }, stopVideoAfter);

        };



        /*setTimeout(function(){
         videoplayer.pause();
         videoplayer.currentTime = 0;
         }, stopVideoAfter);*/

    }


    $rootScope.showmodal=function($ev,item){

        console.log(item);
        //console.log(type);

        if(item.is_video == 0){

            var target = $ev.target || $ev.srcElement || $ev.originalTarget;

            console.log($(target).html());
            console.log($(target).attr('class'));
            $('#gallerymodal').find('h2').find('img').attr('src','');
            $('#gallerymodal').find('h2').find('img').attr('src',$(target).attr('imgsrc'));

            $('#gallerymodal').modal('show');


        }else{
            $uibModal.open({
                animation: true,
                template: '<div style="position: relative;"><a href="javascript:void(0);" style="position: absolute; top: -17px; right: -19px; " ng-click="cancel()"><img src="images/galleryclose.png" alt="#"></a><video id="maintvVideo" volume="0" width="100%" height="100%" autoplay muted controls>\
            <source src="' + item.video_url + '" type="video/mp4">\
            </video></div>',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                scope:$scope,
                windowClass:'vidoemodal1'

            });

            setTimeout(function(){
                $rootScope.playVideoTeaserFrom();
            },500);


        }
    }


    /*$rootScope.showmodal=function($ev){

        var target = $ev.target || $ev.srcElement || $ev.originalTarget;

        console.log($(target).html());
        console.log($(target).attr('class'));
        $('#gallerymodal').find('h2').find('img').attr('src','');
        $('#gallerymodal').find('h2').find('img').attr('src',$(target).attr('imgsrc'));

        $('#gallerymodal').modal('show');
        // $(event.target).parent().parent().css('display','none');


    }*/

    $rootScope.pad=function  (str, max) {
        str = str.toString();
        return str.length < max ? $rootScope.pad("0" + str, max) : str;
    }

    $scope.pidvar=$rootScope.pad($scope.id,7);

    $scope.sizechoice=function(val,$ev1,type){
        if ($rootScope.userid > 0) {

            var target1 = $ev1.target1 || $ev1.srcElement || $ev1.originalTarget;

            $(target1).addClass('darkar');
            console.log($(target1).html());

            $('.trc').removeClass('darkar');
            $('.trc' + val).addClass('darkar');

            console.log(val);

            $scope.clickable = 1;
            $scope.sizechoiceval = false;
            $scope.sizeid = val;
            if (type == 1)$('.tabdownloadbtn').attr('href', 'http://admin.710mny.com/filedownload/id/' + $scope.id + '/' + $scope.sizeid);
            if (type == 2)$('.tabdownloadbtn').attr('href', 'http://admin.710mny.com/filedownloadvideo/id/' + $scope.id + '/' + $scope.sizeid);
            $('.tabdownloadbtn').attr('target', '_blank');
        }

    }

    $scope.clicktodownload=function($ev) {

        if ($rootScope.userid > 0) {

            var target = $ev.target || $ev.srcElement || $ev.originalTarget;

            if ($(target).attr('clickable') == 0) $scope.sizechoiceval = true;
        }
    }



    setTimeout(function(){

        //$('#myCarousel').carousel({
        //    interval: 10000
        //});

        //var wd=parseInt($(window).width()/5);
        var wd;
        console.log($(window).width());
        if($(window).width()>1300) wd =263;
        if($(window).width()>1400) wd =306;
        if($(window).width()>1600) wd =375;

        $('.slider1').bxSlider({
            slideWidth: wd,
            minSlides: 2,
            maxSlides: 5,
            slideMargin: 10
        });


    },4000);


});
jungledrone.controller('stockcategory', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams) {
    // $state.go('login');
    //  $scope.categorylist=[];

    $scope.type55 = $stateParams.type;

    if($stateParams.type=='image'){
        $scope.type='Stock Image';
        $scope.type1='image';
    }else if($stateParams.type=='video'){
        $scope.type='Stock Video';
        $scope.type1='video';
    }else{
        $scope.type='';
        $scope.type1='all';
    }

    $scope.limit = 5;

    $scope.loadmore = function(){
        $scope.limit = $scope.limit+5;
    }


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



    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.cat_name.indexOf($scope.searchkey) != -1) && item.type==$scope.type) {
            return true;
        }
        return false;
    };

    $scope.changetype = function(){
        $state.go('stock-category',{type:$scope.type1});
    }


 /*   $scope.showmodal=function($ev){

        var target = $ev.target || $ev.srcElement || $ev.originalTarget;

        console.log($(target).html());
        console.log($(target).attr('class'));
        $('#gallerymodal').find('h2').find('img').attr('src','');
        $('#gallerymodal').find('h2').find('img').attr('src',$(target).attr('imgsrc'));

        $('#gallerymodal').modal('show');
        // $(event.target).parent().parent().css('display','none');


    }
*/
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


jungledrone.controller('addcategoryjungle1',function($scope,$state,$http,$cookieStore,$rootScope){

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


jungledrone.controller('addcategoryjungle',function($scope,$state,$http,$cookieStore,$rootScope,Upload){

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

    $scope.$watch('cat_upload', function (files) {
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




jungledrone.controller('junglecategorylist',function($scope,$state,$http,$cookieStore,$rootScope,$uibModal,$sce,$filter){
    $scope.trustAsHtml=$sce.trustAsHtml;

    $scope.predicate = 'id';
    $scope.reverse = true;

    var orderBy = $filter('orderBy');

    $scope.order = function(predicate) {

        console.log('pre'+predicate);
        $scope.predicate = predicate;
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.categorylist = orderBy($scope.categorylist, predicate, $scope.reverse);
    };


    $rootScope.integerId= function(val) {
        return parseInt(val, 10);
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

        if ( (item.cat_name.indexOf($scope.searchkey) != -1) || (item.cat_desc.indexOf($scope.searchkey) != -1) || (item.type.indexOf($scope.searchkey) != -1) ||  (item.status.indexOf($scope.searchkey) != -1) || (item.parent_cat_name.indexOf($scope.searchkey) != -1)){
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

jungledrone.controller('editcategoryjungle1', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams){

    $http({
        method  :   'POST',
        async   :   false,

        url :       $scope.adminUrl+'parentcategorylist',
        // data    : $.param($scope.form),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;

    })

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

jungledrone.controller('editcategoryjungle', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams,Upload){

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

        $scope.cat_img_src=data.image_url;
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

    $scope.$watch('cat_upload', function (files) {
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


                    $scope.cat_img_src = response.data.image_url;


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


jungledrone.controller('addproductjungle',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce,$uibModal){
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

    $scope.form= {product_file:'',userid:0};
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

                /*if(response.data.video_url!='') {
                    $sce.trustAsResourceUrl(response.data.video_url);
                    $scope.product_video_src = response.data.video_url;
                }*/

                $scope.is_video=response.data.is_video;
                if(response.data.image_url!='') {
                    $scope.product_img_src = response.data.image_url;
                }




                if($scope.is_video == 1){
                    $scope.form.product_file = response.data.video_name;
                    $scope.video_url1222 = response.data.video_url1222;
                }else{
                    $scope.form.product_file = response.data.image_name;
                }






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


    $scope.showvideo = function(video_url1222){
        $uibModal.open({
            animation: true,
            template: '<div style="position: relative;"><a href="javascript:void(0);" style="position: absolute; top: 0; right: 0; color:#fff; background-color: #000; width:40px; font-size: 40px; text-align:center;" ng-click="cancel()">&times;</a><video id="maintvVideo" volume="0" width="100%" height="100%" autoplay loop muted controls>\
            <source src="' + video_url1222 + '" type="video/mp4">\
            </video></div>',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            scope:$scope

        });
    }


    $scope.addproductsubmit=function() {


        console.log($scope.form);


        $scope.form.category_id=JSON.stringify($scope.form.category_id);
        $scope.form.userid=$rootScope.userid;
        //$scope.form.is_plan=$scope.ModelData.is_plan;

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
        $scope.predicate = predicate;
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        //$scope.friends = orderBy($scope.friends, predicate, $scope.reverse);
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


        console.log(item)

        if ( (item.product_name.toString().indexOf($scope.searchkey) != -1) ||  (item.status.toString().indexOf($scope.searchkey) != -1) || (item.cat_name.toString().indexOf($scope.searchkey) != -1) || (item.product_desc.indexOf($scope.searchkey) != -1)  ){
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

jungledrone.controller('editproductjungle', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams,$sce,Upload,$uibModal){
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

        /*if(data.image_url!=''){
            $scope.product_img_src = data.image_url;
        }
        console.log($scope.product_img_src);

        if(data.is_video == 1){

        }


        if(data.video_url!=''){

            $scope.product_video_src = data.video_url;
            if(typeof($scope.product_video_src)!='undefined') {

                setTimeout(function () {

                    angular.element(document.querySelector('#maintvDiv')).html('<video id="maintvVideo" volume="0" width="100%" height="100%" autoplay loop muted controls>\
            <source src="' + $scope.product_video_src + '" type="video/mp4">\
            </video>');
                }, 2000);
            }
        }*/


        $scope.is_video=data.is_video;
        if(data.image_url!='') {
            $scope.product_img_src = data.image_url;
        }




        if($scope.is_video == 1){
            $scope.product_img_src = data.cover_img_url;
            $scope.video_url1222 = data.video_url;
        }



        console.log(data.category_id);

        $scope.form = {
            id: data.id,

            product_name: data.product_name,
            product_desc: data.product_desc,
            /*category_id: {
                id:data.category_id,
                type:data.type,
            },*/
            category_id:JSON.parse(data.category_id),
            product_file: data.product_file,
            priority: data.priority,
            price: data.price,
            payout: data.payout,
            status: data.status,
            credits: data.credits,
            is_plan: data.is_plan,
            plan_interval: data.plan_interval,
            plan_image_counter: data.plan_image_counter,

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

        $scope.form.category_id=JSON.stringify($scope.form.category_id);

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

    $scope.showvideo = function(video_url1222){
        $uibModal.open({
            animation: true,
            template: '<div style="position: relative;"><a href="javascript:void(0);" style="position: absolute; top: 0; right: 0; color:#fff; background-color: #000; width:40px; font-size: 40px; text-align:center;" ng-click="cancel()">&times;</a><video id="maintvVideo" volume="0" width="100%" height="100%" autoplay loop muted controls>\
            <source src="' + video_url1222 + '" type="video/mp4">\
            </video></div>',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            scope:$scope

        });
    }



})






jungledrone.controller('addcategoryjungle1',function($scope,$state,$http,$cookieStore,$rootScope){

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


jungledrone.controller('addcategoryjungle',function($scope,$state,$http,$cookieStore,$rootScope,Upload){

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

    $scope.$watch('cat_upload', function (files) {
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




jungledrone.controller('junglecategorylist',function($scope,$state,$http,$cookieStore,$rootScope,$uibModal,$sce,$filter){
    $scope.trustAsHtml=$sce.trustAsHtml;

    $scope.predicate = 'id';
    $scope.reverse = true;

    var orderBy = $filter('orderBy');

    $scope.order = function(predicate) {

        console.log('pre'+predicate);
        $scope.predicate = predicate;
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.categorylist = orderBy($scope.categorylist, predicate, $scope.reverse);
    };


    $rootScope.integerId= function(val) {
        return parseInt(val, 10);
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

        if ( (item.cat_name.indexOf($scope.searchkey) != -1) || (item.cat_desc.indexOf($scope.searchkey) != -1) || (item.type.indexOf($scope.searchkey) != -1) ||  (item.status.indexOf($scope.searchkey) != -1) || (item.parent_cat_name.indexOf($scope.searchkey) != -1)){
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

jungledrone.controller('editcategoryjungle1', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams){

    $http({
        method  :   'POST',
        async   :   false,

        url :       $scope.adminUrl+'parentcategorylist',
        // data    : $.param($scope.form),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;

    })

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

jungledrone.controller('editcategoryjungle', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams,Upload){

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

        $scope.cat_img_src=data.image_url;
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

    $scope.$watch('cat_upload', function (files) {
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


                $scope.cat_img_src = response.data.image_url;


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












jungledrone.controller('adddocumentcategory',function($scope,$state,$http,$cookieStore,$rootScope,Upload){

    $http({
        method  :   'POST',
        async   :   false,

        url :       $scope.adminUrl+'document/parentcategorylist',
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


    $scope.addcategorysubmit=function() {

     //   $scope.form.add_user=$rootScope.form.userid;


        $http({
            method  :   'POST',
            async   :   false,

            url :       $scope.adminUrl+'document/addcategory',
            data    : $.param($scope.form),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(){
            $state.go('documentcategorylist');

        })

    }




})




jungledrone.controller('documentcategorylist',function($scope,$state,$http,$cookieStore,$rootScope,$uibModal,$sce,$filter){
    $scope.trustAsHtml=$sce.trustAsHtml;

    $scope.predicate = 'id';
    $scope.reverse = true;

    var orderBy = $filter('orderBy');

    $scope.order = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.categorylist = orderBy($scope.categorylist, predicate, $scope.reverse);
    };


    $rootScope.integerId= function(val) {
        return parseInt(val, 10);
    };

    $scope.currentPage=1;
    $scope.perPage=10;

    $scope.totalItems = 0;

    $scope.filterResult = [];

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'document/categorylist',
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;


    })

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( ($filter('lowercase')(item.cat_name).indexOf($filter('lowercase')($scope.searchkey)) != -1) || ($filter('lowercase')(item.cat_desc).indexOf($filter('lowercase')($scope.searchkey)) != -1) || ($filter('lowercase')(item.parent_cat_name).indexOf($filter('lowercase')($scope.searchkey)) != -1) ){
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



jungledrone.controller('editdocumentcategory', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams,Upload){

    $http({
        method  :   'POST',
        async   :   false,

        url :       $scope.adminUrl+'document/parentcategorylist',
        // data    : $.param($scope.form),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.categorylist=data;

    })

    $scope.id=$stateParams.id;

    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'document/categorydetails',
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


    $scope.editcategorysubmit = function () {
        console.log(1);
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'document/categoryupdates',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $state.go('documentcategorylist');
            return;
        });
    }


})



jungledrone.controller('addauditor', function($scope,$state,$http,$cookieStore,$rootScope) {


    $scope.uType = 'auditor';

    $scope.contact=['Anytime','Early morning','Mid morning','Afternoon','Early evening','Late evening'];
    $scope.submitadminForm = function(){

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'addadmin?type=auditor',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            //$rootScope.stateIsLoading = false;
            if(data.status == 'error'){
                console.log(data);
                $('.email_div').append('<label class="control-label has-error validationMessage">This email already exists.</label>');
            }else{
                $state.go('auditorlist');
                return;
            }



        });


    }

    //console.log('in add admin form ');
});


jungledrone.controller('editauditor', function($scope,$state,$http,$cookieStore,$rootScope,$stateParams){


    $scope.uType = 'auditor';

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
            $state.go('auditorlist');
            return
        });
    }


})

jungledrone.controller('generaluserlist', function($scope,$state,$http,$cookieStore,$rootScope) {
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
        url     : $scope.adminUrl+'adminlist?type=generaluser',
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

        if ( (item.fname.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1) || (item.lname.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1) ||(item.mail.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1)||(item.mobile_no.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1)||(item.phone_no.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1) ||(item.address.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1)){
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

            if($scope.userlist[idx].status == 0){
                $scope.userlist[idx].status = 1;
            }else{
                $scope.userlist[idx].status = 0;
            }

        });
    }




    //console.log('in add admin form ');
});

jungledrone.controller('contributorlist', function($scope,$state,$http,$cookieStore,$rootScope) {
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
        url     : $scope.adminUrl+'adminlist?type=contributor',
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

        if ( (item.fname.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1) || (item.lname.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1) ||(item.mail.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1)||(item.mobile_no.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1)||(item.phone_no.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1) ||(item.address.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1)){
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

            if($scope.userlist[idx].status == 0){
                $scope.userlist[idx].status = 1;
            }else{
                $scope.userlist[idx].status = 0;
            }

        });
    }




    //console.log('in add admin form ');
});
jungledrone.controller('auditorlist', function($scope,$state,$http,$cookieStore,$rootScope) {
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
        url     : $scope.adminUrl+'adminlist?type=auditor',
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

            if($scope.userlist[idx].status == 0){
                $scope.userlist[idx].status = 1;
            }else{
                $scope.userlist[idx].status = 0;
            }

        });
    }




    //console.log('in add admin form ');
});


jungledrone.controller('adddocument',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce,$uibModal){

    $scope.file_type = '';

    $scope.trustAsHtml=$sce.trustAsHtml;
    $http({
        method  :   'POST',
        async   :   false,

        url :       $scope.adminUrl+'getdoccategory',
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

    $scope.form = {
        file_name : '',
        file_url : ''
    }

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
            url: $scope.adminUrl+'uploaddocument' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {

            $('.progress').addClass('ng-hide');

            if(response.data.status=='error'){
                $('.errormsg').html('Invalid file type.');

                $scope.form.file_name = '';
                $scope.form.file_url = '';

            }
            else {
                file.result = response.data;

                $scope.form.file_name = response.data.file_name;
                $scope.form.file_url = response.data.file_url;

                $scope.file_type = response.data.file_type;
            }
        }, function (response) {
            console.log(response.status);
            if(response.data.status>0) {

            }

        });

        file.upload.progress(function (evt) {

            $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }




    $scope.addproductsubmit=function() {

        $scope.form.add_user=$rootScope.userid;
        $scope.form.category_id=JSON.stringify($scope.form.category_id);

        $('.errormsg').html('');

        if($scope.form.file_name == ''){
            $('.errormsg').html('Please Upload File');
        }else{
            $http({
                method  :   'POST',
                async   :   false,
                url :       $scope.adminUrl+'adddocument',
                data    : $.param($scope.form),
                headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

            }).success(function(){
                $state.go('documentlist');

            })
        }



    }




})

jungledrone.controller('documentlist',function($scope,$state,$http,$cookieStore,$rootScope,$uibModal,$sce,$filter){
    $scope.trustAsHtml=$sce.trustAsHtml;

    $scope.predicate = 'id';
    $scope.reverse = true;
    $scope.order = function(predicate) {


        $scope.predicate = predicate;
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    };
    $scope.currentPage=1;
    $scope.perPage=10;

    $scope.totalItems = 0;

    $scope.filterResult = [];

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'documentlist',
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(data){
        $scope.documentlist=data;
    })


    $scope.searchkey = '';
    $scope.search = function(item){

        if ( ($filter('lowercase')(item.file_name).indexOf($filter('lowercase')($scope.searchkey)) != -1) ||($filter('lowercase')(item.name).indexOf($filter('lowercase')($scope.searchkey)) != -1) || ($filter('lowercase')(item.description).indexOf($filter('lowercase')($scope.searchkey)) != -1) || ($filter('lowercase')(item.cat_name).indexOf($filter('lowercase')($scope.searchkey)) != -1) ){
            return true;
        }

        return false;
    };

    $scope.jungledeldocument = function(item,size){

        $scope.currentindex=$scope.documentlist.indexOf(item);

        $uibModal.open({
            animation: true,
            templateUrl: 'jungleproductdelconfirm.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope
        });
    }

    $scope.changedocumentstatus = function(item,size){

        $scope.currentindex=$scope.documentlist.indexOf(item);

        $uibModal.open({
            animation: true,
            templateUrl: 'jungleproductstatusfirm.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope
        });
    }
    setInterval(function(){
        $('[data-toggle="popover"]').popover({
            trigger: 'hover',
            'placement': 'top',
            'html':true
        });
    },4000);

    $rootScope.coverttodatetime=function(timest){
        var date = new Date(timest * 1000);
         var day=date.getDate();
         var month=date.getMonth();
         var year=date.getFullYear();
        var hours = date.getHours();
// Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
        var formattedTime =month +'/'+day +"/"+year+"  "+ hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }


})


jungledrone.controller('editdocument',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce,$uibModal,$stateParams){
    $scope.file_type = '';
    $scope.id=$stateParams.id;

    $scope.trustAsHtml=$sce.trustAsHtml;
    $http({
        method  :   'POST',
        async   :   false,

        url :       $scope.adminUrl+'getdoccategory',
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

    $scope.form = {
        file_name : '',
        file_url : ''
    }

    $http({
        method  : 'POST',
        async:   false,
        url     :     $scope.adminUrl+'documentdetails',
        data    : $.param({'id':$scope.id}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {

        $scope.prev_file_name = data.file_name;
        $scope.prev_file_url = data.file_url;

        $scope.file_type = data.file_type;

        $scope.form = {
            id: data.id,
            file_name: data.file_name,
            file_url: data.file_url,
            name: data.name,
            description: data.description,
            /*category_id:{
                id : data.category_id,
            } ,*/
            category_id:JSON.parse(data.category_id),
            status : data.status
        }
    });


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
            url: $scope.adminUrl+'uploaddocument' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'id':$rootScope.createIdeaId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {

            $('.progress').addClass('ng-hide');

            if(response.data.status=='error'){
                $('.errormsg').html('Invalid file type.');

                $scope.form.file_name = $scope.prev_file_name;
                $scope.form.file_url = $scope.prev_file_url;

            }
            else {
                file.result = response.data;

                $scope.form.file_name = response.data.file_name;
                $scope.form.file_url = response.data.file_url;

                $scope.file_type = response.data.file_type;
            }
        }, function (response) {
            console.log(response.status);
            if(response.data.status>0) {

            }

        });

        file.upload.progress(function (evt) {

            $('#loaderDiv').removeClass('ng-hide');

            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }

    $scope.addproductsubmit=function() {

        $scope.form.add_user=$rootScope.userid;
        $scope.form.category_id=JSON.stringify($scope.form.category_id);
        //category_id:JSON.parse(data.category_id),

        $('.errormsg').html('');

        if($scope.form.file_name == ''){
            $('.errormsg').html('Please Upload File');
        }else{
            $http({
                method  :   'POST',
                async   :   false,
                url :       $scope.adminUrl+'updatedocument',
                data    : $.param($scope.form),
                headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

            }).success(function(){
                $state.go('documentlist');

            })
        }



    }




})


jungledrone.controller('myprofile',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce,$uibModal,$stateParams){

    $scope.userid = 0;

    if(typeof($cookieStore.get('userid')) != 'undefined'){
        $scope.userid = $cookieStore.get('userid');
    }

    $http({
        method: 'POST',
        async: false,
        url: $scope.adminUrl + 'admindetails',
        data: $.param({'uid': $scope.userid}),  // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data) {
        $scope.userdetails = data;

    });


})

jungledrone.controller('editprofile',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce,$uibModal,$stateParams) {

    $scope.userid = 0;

    if (typeof($cookieStore.get('userid')) != 'undefined') {
        $scope.userid = $cookieStore.get('userid');
    }

    $http({
        method: 'POST',
        async: false,
        url: $scope.adminUrl + 'admindetails',
        data: $.param({'uid': $scope.userid}),  // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data) {
        $scope.userdetails = data;
        $scope.form = {
            uid: data.uid,
            fname: data.fname,
            lname: data.lname,
            bname: data.bname,
            email: data.email,
            address: data.address,
            phone_no: data.phone_no,
            mobile_no: data.mobile_no,
            country: data.country,
            state: data.state,
            gender: data.gender,
            dob: data.dobedit,

        }


    })
    $scope.updateinfo = function () {

        $rootScope.stateIsLoading = true;
        $http({
            method: 'POST',
            async: false,
            url: $scope.adminUrl + 'adminupdates',
            data: $.param($scope.form),  // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            $rootScope.stateIsLoading = false;
            $state.go('myprofile');
            return
        });
    }
})

jungledrone.controller('userchangepassword', function($scope,$state,$http,$cookieStore,$rootScope) {
    if (typeof ($cookieStore.get('userid')) != 'undefined') {

        $scope.userid = $cookieStore.get('userid');
    }
    $scope.errormsg='';
    $scope.form={user_id:$scope.userid}
    $scope.changepasswordsubmit = function(){
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'userchangepassword',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            console.log(data);
            if(data.status == 'success'){
                $state.go('myprofile');


            }else{
                $scope.errormsg = 'Old password does not exists';
            }

        });
    }
});

jungledrone.controller('mydownloads',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce,$uibModal,$stateParams,$filter){

    $scope.userid = 0;

    $scope.currentid=$stateParams.id;
    $scope.currentcategoryname="All Files";

    $scope.trustAsHtml = $sce.trustAsHtml;

    if(typeof($cookieStore.get('userid')) != 'undefined'){
        $scope.userid = $cookieStore.get('userid');
    }

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'getdoccategory1',
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(data){
        $scope.categorylist=data.cat;
        $scope.categorylistl=data.cata;


        var log = [];

        angular.forEach(data.cata, function(value, key) {
            //console.log( value);
          /*  console.log( key);
            console.log( value.id);
            console.log( value.cat_name);
            console.log( value['id']);*/
            if($scope.currentid==value.id) {
                $scope.currentcategoryname=value.cat_name;
                $scope.getcatetree(value.parent_cat);
                console.log($scope.currentcategoryname);
            }

        }, log);
    })

    $scope.cattree=[];

    $scope.getcatetree=function(catid){


        var log = [];

        console.log('formal catid='+catid);

        angular.forEach($scope.categorylistl, function(value, key) {
            //console.log( value);
            /*  console.log( key);
             console.log( value.id);
             console.log( value.cat_name);
             console.log( value['id']);*/
            if(catid==value.id) {
               /* $scope.cattree.push({
                    id: value.id,
                    cat_name: value.cat_name,
                });*/

                $scope.tree={

                    id: value.id,
                    cat_name: value.cat_name,
                }
                $scope.cattree.push($scope.tree);


                if(value.parent_cat!=0) $scope.getcatetree(value.parent_cat);
                else  {
                    $scope.cattree.reverse();
                    return;
                }


            }

        }, log);

        //console.log($scope.cattree);


    }

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'documentlist?filter=status&catid='+$scope.currentid,
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(data){
        $scope.documentlist1=data;
        $scope.documentlist=data;
    })

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( ($filter('lowercase')(item.file_name).indexOf($filter('lowercase')($scope.searchkey)) != -1) || ($filter('lowercase')(item.description).indexOf($filter('lowercase')($scope.searchkey)) != -1) || ($filter('lowercase')(item.cat_name).indexOf($filter('lowercase')($scope.searchkey)) != -1) ){
            return true;
        }

        return false;
    };


    setTimeout(function(){



        $('[data-toggle="tooltip"]').tooltip({html:true});

        $(".dropdown-menu > li > a.trigger").on("click",function(e){
            var current=$(this).next();
            var grandparent=$(this).parent().parent();
            if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
                $(this).toggleClass('right-caret left-caret');
            grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
            grandparent.find(".sub-menu:visible").not(current).hide();
            current.toggle();
            e.stopPropagation();
        });

        $(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
            var root=$(this).closest('.dropdown');
            root.find('.left-caret').toggleClass('right-caret left-caret');
            root.find('.sub-menu:visible').hide();
        });
    },3000);


    $scope.currentcat = 'Category';
    $scope.currentcatid = 0;

    $scope.searchbycat = function(id,title,parent_cat){
        $scope.currentcat = title;
        $scope.currentcatid = id;
        $scope.currentid = id;
        $scope.currentcategoryname=title;
        $scope.cattree=[];
        $scope.getcatetree(parent_cat);

        if(id==0){
            $scope.searchkey = '';
        }else{
            $scope.searchkey = title;
        }



    }



    $rootScope.downloadcart=function () {


        $rootScope.fileidstr='';
        var log = [];

        angular.forEach($rootScope.filecartarr, function(value, key) {
            //console.log( value);
            /*  console.log( key);
             console.log( value.id);
             console.log( value.cat_name);
             console.log( value['id']);*/

            if($rootScope.fileidstr.length>1)$rootScope.fileidstr=$rootScope.fileidstr+"|"+value.id;
            else $rootScope.fileidstr=value.id;


        }, log);

        //setTimeout(function(){

            $cookieStore.remove('filecartarr');
            $rootScope.filecartarr=[];
       // },1000);

        window.location.href=$scope.adminUrl+'downloadfilecart/'+$rootScope.fileidstr+'/'+$rootScope.userid;



    }

    $rootScope.addcartfile=function(item){

        $rootScope.filecartarr=[];

       if(typeof($cookieStore.get('filecartarr'))!='undefined')
           $rootScope.filecartarr=$cookieStore.get('filecartarr');

        $rootScope.filecartval={

            'name':item.name,
            'id':item.id,
            'file_name':item.file_name,
            'file_url':item.file_url,
            'file_type':item.file_type,
        }

        $rootScope.filecartarr.push($rootScope.filecartval);
        $cookieStore.put('filecartarr',$rootScope.filecartarr);


        $rootScope.fileidstr='';
        var log = [];

        angular.forEach($rootScope.filecartarr, function(value, key) {
            //console.log( value);
            /*  console.log( key);
             console.log( value.id);
             console.log( value.cat_name);
             console.log( value['id']);*/

            if($rootScope.fileidstr.length>1)$rootScope.fileidstr=$rootScope.fileidstr+"|"+value.id;
            else $rootScope.fileidstr=value.id;


        }, log);

        console.log($rootScope.fileidstr);
    }
    $rootScope.addcartfilendownload=function(item){

        $rootScope.filecartarr=[];

       if(typeof($cookieStore.get('filecartarr'))!='undefined')
           $rootScope.filecartarr=$cookieStore.get('filecartarr');

        $rootScope.filecartval={

            'name':item.name,
            'id':item.id,
            'file_name':item.file_name,
            'file_url':item.file_url,
            'file_type':item.file_type,
        }

        $rootScope.filecartarr.push($rootScope.filecartval);
        $cookieStore.put('filecartarr',$rootScope.filecartarr);


        $rootScope.fileidstr='';
        var log = [];

        angular.forEach($rootScope.filecartarr, function(value, key) {
            //console.log( value);
            /*  console.log( key);
             console.log( value.id);
             console.log( value.cat_name);
             console.log( value['id']);*/

            if($rootScope.fileidstr.length>1)$rootScope.fileidstr=$rootScope.fileidstr+"|"+value.id;
            else $rootScope.fileidstr=value.id;


        }, log);

        //console.log($rootScope.fileidstr);

        //$('.downloadbagbtn').click();

        $rootScope.downloadcart();
    }

    $rootScope.zoom=function(id){
        $rootScope.zoomid=id;
        $uibModal.open({
            animation: true,
            templateUrl: 'zoommodal.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            scope: $rootScope
        });

    }


})



jungledrone.controller('categoryfolderview',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce,$uibModal,$stateParams,$filter){

    $scope.userid = 0;

    $scope.currentid=$stateParams.id;
    $scope.currentcategoryname="All Files";

    $scope.trustAsHtml = $sce.trustAsHtml;

    if(typeof($cookieStore.get('userid')) != 'undefined'){
        $scope.userid = $cookieStore.get('userid');
    }

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'getdoccategory1',
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(data){
        $scope.categorylist=data.cat;
        $scope.categorylistl=data.cata;


        var log = [];

        angular.forEach(data.cata, function(value, key) {
            //console.log( value);
          /*  console.log( key);
            console.log( value.id);
            console.log( value.cat_name);
            console.log( value['id']);*/
            if($scope.currentid==value.id) {
                $scope.currentcategoryname=value.cat_name;
                $scope.getcatetree(value.parent_cat);
            }

        }, log);
    })

    $scope.cattree=[];

    $scope.getcatetree=function(catid){


        var log = [];

        console.log('formal catid='+catid);

        angular.forEach($scope.categorylistl, function(value, key) {
            //console.log( value);
            /*  console.log( key);
             console.log( value.id);
             console.log( value.cat_name);
             console.log( value['id']);*/
            if(catid==value.id) {
               /* $scope.cattree.push({
                    id: value.id,
                    cat_name: value.cat_name,
                });*/

                $scope.tree={

                    id: value.id,
                    cat_name: value.cat_name,
                }
                $scope.cattree.push($scope.tree);


                if(value.parent_cat!=0) $scope.getcatetree(value.parent_cat);
                else  {
                    $scope.cattree.reverse();
                    return;
                }


            }

        }, log);

        console.log($scope.cattree);


    }

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'documentlist?filter=status&catid='+$scope.currentid,
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(data){
        $scope.documentlist1=data;
        $scope.documentlist=data;
    })

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( ($filter('lowercase')(item.file_name).indexOf($filter('lowercase')($scope.searchkey)) != -1) || ($filter('lowercase')(item.description).indexOf($filter('lowercase')($scope.searchkey)) != -1) || ($filter('lowercase')(item.cat_name).indexOf($filter('lowercase')($scope.searchkey)) != -1) ){
            return true;
        }

        return false;
    };


    setTimeout(function(){



        $('[data-toggle="tooltip"]').tooltip({html:true});

        $(".dropdown-menu > li > a.trigger").on("click",function(e){
            var current=$(this).next();
            var grandparent=$(this).parent().parent();
            if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
                $(this).toggleClass('right-caret left-caret');
            grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
            grandparent.find(".sub-menu:visible").not(current).hide();
            current.toggle();
            e.stopPropagation();
        });

        $(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
            var root=$(this).closest('.dropdown');
            root.find('.left-caret').toggleClass('right-caret left-caret');
            root.find('.sub-menu:visible').hide();
        });
    },3000);


    $scope.currentcat = 'Category';
    $scope.currentcatid = 0;

    $scope.searchbycat = function(id,title,parent_cat){
        $scope.currentcat = title;
        $scope.currentcatid = id;
        $scope.currentid = id;
        $scope.currentcategoryname=title;
        $scope.cattree=[];
        $scope.getcatetree(parent_cat);

        if(id==0){
            $scope.searchkey = '';
        }else{
            $scope.searchkey = title;
        }



    }




})


jungledrone.controller('myfilelist',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce,$uibModal,$stateParams,$filter){

    $scope.userid = 0;

    $scope.currentid=$stateParams.id;
    $scope.currentcategoryname="All Files";

    $scope.trustAsHtml = $sce.trustAsHtml;

    if(typeof($cookieStore.get('userid')) != 'undefined'){
        $scope.userid = $cookieStore.get('userid');
    }




    //$scope.documentlist1=$rootScope.filedownloaded;
    //$scope.documentlist=$rootScope.filedownloaded;

    console.log($rootScope.filedownloaded);


    $scope.searchkey = '';
    $scope.search = function(item){

        if ( ($filter('lowercase')(item.file_name).indexOf($filter('lowercase')($scope.searchkey)) != -1) || ($filter('lowercase')(item.description).indexOf($filter('lowercase')($scope.searchkey)) != -1) || ($filter('lowercase')(item.cat_name).indexOf($filter('lowercase')($scope.searchkey)) != -1) ){
            return true;
        }

        return false;
    };


    setTimeout(function(){



        $('[data-toggle="tooltip"]').tooltip({html:true});

        $(".dropdown-menu > li > a.trigger").on("click",function(e){
            var current=$(this).next();
            var grandparent=$(this).parent().parent();
            if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
                $(this).toggleClass('right-caret left-caret');
            grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
            grandparent.find(".sub-menu:visible").not(current).hide();
            current.toggle();
            e.stopPropagation();
        });

        $(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
            var root=$(this).closest('.dropdown');
            root.find('.left-caret').toggleClass('right-caret left-caret');
            root.find('.sub-menu:visible').hide();
        });
    },3000);


    $scope.currentcat = 'Category';
    $scope.currentcatid = 0;

    $scope.searchbycat = function(id,title){
        $scope.currentcat = title;
        $scope.currentcatid = id;

        if(id==0){
            $scope.searchkey = '';
        }else{
            $scope.searchkey = title;
        }



    }




})

jungledrone.controller('myaccountproductlist',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce,$uibModal,$stateParams,$filter){




    if(typeof($cookieStore.get('userid')) != 'undefined'){
        $scope.userid = $cookieStore.get('userid');
    }



    $scope.predicate = 'id';
    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        //$scope.friends = orderBy($scope.friends, predicate, $scope.reverse);
    };
    $scope.currentPage=1;
    $scope.perPage=10;

    $scope.totalItems = 0;

    $scope.filterResult = [];

    $http({
        method:'POST',
        async:false,
        url:$scope.adminUrl+'jungleproductlist',
        data    : $.param({'userid':$scope.userid}),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(data){
        $scope.productlist=data;
    })
    $scope.searchkey = '';
    $scope.search = function(item){


        console.log(item)

        if ( (item.product_name.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1) ||  (item.status.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1) || (item.cat_name.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1) || (item.product_desc.toString().toLowerCase().indexOf($scope.searchkey.toString().toLowerCase()) != -1)  ){
            return true;
        }
        return false;
    };

    $scope.jungledelproduct = function(item,size){

        $scope.currentindex=$scope.productlist.indexOf(item);
$rootScope.them='front';
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
jungledrone.controller('myaccountaddproduct',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce,$uibModal,$stateParams,$filter){

    if(typeof($cookieStore.get('userid')) != 'undefined'){
        $scope.userid = $cookieStore.get('userid');
    }


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

                /*if(response.data.video_url!='') {
                 $sce.trustAsResourceUrl(response.data.video_url);
                 $scope.product_video_src = response.data.video_url;
                 }*/

                $scope.is_video=response.data.is_video;
                if(response.data.image_url!='') {
                    $scope.product_img_src = response.data.image_url;
                }




                if($scope.is_video == 1){
                    $scope.form.product_file = response.data.video_name;
                    $scope.video_url1222 = response.data.video_url1222;
                }else{
                    $scope.form.product_file = response.data.image_name;
                }






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


    $scope.showvideo = function(video_url1222){
        $uibModal.open({
            animation: true,
            template: '<div style="position: relative;"><a href="javascript:void(0);" style="position: absolute; top: 0; right: 0; color:#fff; background-color: #000; width:40px; font-size: 40px; text-align:center;" ng-click="cancel()">&times;</a><video id="maintvVideo" volume="0" width="100%" height="100%" autoplay loop muted controls>\
            <source src="' + video_url1222 + '" type="video/mp4">\
            </video></div>',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            scope:$scope

        });
    }


    $scope.addproductsubmit=function() {


        console.log($scope.form);


        $scope.form.category_id=JSON.stringify($scope.form.category_id);
        $scope.form.userid=$scope.userid;
        $http({
            method  :   'POST',
            async   :   false,

            url :       $scope.adminUrl+'addjungleproduct?fonttype=font',
            data    : $.param($scope.form),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(){
            $state.go('myaccount-product-list');

        })

    }




})
jungledrone.controller('myaccounteditproduct',function($scope,$state,$http,$cookieStore,$rootScope,Upload,$sce,$uibModal,$stateParams,$filter){

    if(typeof($cookieStore.get('userid')) != 'undefined'){
        $scope.userid = $cookieStore.get('userid');
    }

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

    /*if(data.image_url!=''){
     $scope.product_img_src = data.image_url;
     }
     console.log($scope.product_img_src);

     if(data.is_video == 1){

     }


     if(data.video_url!=''){

     $scope.product_video_src = data.video_url;
     if(typeof($scope.product_video_src)!='undefined') {

     setTimeout(function () {

     angular.element(document.querySelector('#maintvDiv')).html('<video id="maintvVideo" volume="0" width="100%" height="100%" autoplay loop muted controls>\
     <source src="' + $scope.product_video_src + '" type="video/mp4">\
     </video>');
     }, 2000);
     }
     }*/


    $scope.is_video=data.is_video;
    if(data.image_url!='') {
        $scope.product_img_src = data.image_url;
    }




    if($scope.is_video == 1){
        $scope.product_img_src = data.cover_img_url;
        $scope.video_url1222 = data.video_url;
    }



    console.log(data.category_id);

    $scope.form = {
        id: data.id,

        product_name: data.product_name,
        product_desc: data.product_desc,
        /*category_id: {
         id:data.category_id,
         type:data.type,
         },*/
        category_id:JSON.parse(data.category_id),
        product_file: data.product_file,
        priority: data.priority,
        price: data.price,
        payout: data.payout,
        status: 0,
        credits: data.credits,

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

    $scope.form.category_id=JSON.stringify($scope.form.category_id);

    $http({
        method  :   'POST',
        async   :   false,

        url :       $scope.adminUrl+'jungleproductupdates?fonttype=font',
        data    : $.param($scope.form),
        headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).success(function(){
        $state.go('myaccount-product-list');

    })

}

$scope.showvideo = function(video_url1222){
    $uibModal.open({
        animation: true,
        template: '<div style="position: relative;"><a href="javascript:void(0);" style="position: absolute; top: 0; right: 0; color:#fff; background-color: #000; width:40px; font-size: 40px; text-align:center;" ng-click="cancel()">&times;</a><video id="maintvVideo" volume="0" width="100%" height="100%" autoplay loop muted controls>\
            <source src="' + video_url1222 + '" type="video/mp4">\
            </video></div>',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        scope:$scope

    });
}
})