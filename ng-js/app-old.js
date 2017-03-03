87/**
 * Created by samsuj on 29/10/15.
 */


'use strict';

/* App Module */

var pearlehealth = angular.module('pearlhealth', ['ui.router','angularValidator','ngCookies','ui.bootstrap','ngFileUpload']);

pearlehealth.run(['$rootScope', '$state',function($rootScope, $state){

    $rootScope.$on('$stateChangeStart',function(){
        $rootScope.stateIsLoading = true;
    });


    $rootScope.$on('$stateChangeSuccess',function(){
        $rootScope.stateIsLoading = false;
    });

}]);

pearlehealth.config(function($stateProvider, $urlRouterProvider,$locationProvider) {

// For any unmatched url, redirect to /state1
    $urlRouterProvider
        .otherwise("/index");

//
    // Now set up the states
    $stateProvider
        .state('index',{
            url:"/index",
            views: {

                'loader': {
                    controller: 'index'
                },

            }
        }
    )
        .state('home',{
            url:"/home",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/home.html' ,
                    controller: 'home'
                },

            }
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
                    controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/services.html' ,
                    controller: 'services'
                },

            }
        }
    )



        .state('signup',{
            url:"/signup",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/signup.html' ,
                    controller: 'signup'
                },

            }
        }
    )

        .state('thankyou',{
            url:"/thank-you",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/thankyou.html' ,
                    controller: 'thankyou'
                },

            }
        }
    )

        .state('thankyou1',{
            url:"/thankyou",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/thankyou1.html' ,
                    //controller: 'thankyou'
                },

            }
        }
    )

        .state('aboutus',{
            url:"/about-us",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/aboutus.html' ,
                    //controller: 'thankyou'
                },

            }
        }
    )

        .state('forgotpassword',{
            url:"/forgot-password",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/forgotpassword.html' ,
                    controller: 'forgotpassword'
                },

            }
        }
    )

        .state('resetpassword',{
            url:"/resetpassword/:cpass/:uid",
            views: {

                'header': {
                    templateUrl: 'partials/header.html' ,
                    controller: 'header'
                },
                'footer': {
                    templateUrl: 'partials/footer.html' ,
                    controller: 'footer'
                },
                'content': {
                    templateUrl: 'partials/resetpassword.html' ,
                    controller: 'resetpassword'
                },

            }
        }
    )


        /*

         .state('login',{
         url:"/login",
         views: {

         'content': {
         templateUrl: 'partials/login.html' ,
         controller: 'login'
         },

         }
         }
         )
         */
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


        .state('logout',{
            url:"/logout",
            views: {

                'content': {
                   // templateUrl: 'partials/login.html' ,
                    controller: 'logout'
                },

            }
        }
    )

        .state('dashboard',{
            url:"/dashboard",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_top_menu.html' ,
                   // controller: 'admin_header'
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
                   // controller: 'dashboard'
                },

            }
        }
    )

        .state('myfiles',{
            url:"/my-files",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/myfiles.html' ,
                    controller: 'myfiles'
                },

            }
        }
    )

        .state('accountinfo',{
            url:"/account-info",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/accountinfo.html' ,
                    controller: 'accountinfo'
                },

            }
        }
    )

        .state('planchange',{
            url:"/change-plan",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/planchange.html' ,
                    controller: 'planchange'
                },

            }
        }
    )

        .state('subcriptiondetails',{
            url:"/subcription-details",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/subcriptiondetails.html' ,
                    controller: 'subcriptiondetails'
                },

            }
        }
    )

        .state('changepassword',{
            url:"/change-password",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,
                },
                'content': {
                    templateUrl: 'partials/changepassword.html' ,
                    controller: 'changepassword'
                },

            }
        }
    )

        .state('updateprofile',{
            url:"/update-profile",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/updateprofile.html' ,
                    controller: 'updateprofile'
                },

            }
        }
    )

        .state('filelist',{
            url:"/filelist/:folderId",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/myfiles.html' ,
                    controller: 'myfiles'
                },

            }
        }
    )

        .state('addnominee',{
            url:"/add-nominee",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/addnominee.html' ,
                    controller: 'addnominee'
                },

            }
        }
    )

        .state('editnominee',{
            url:"/edit-nominee/:UserId",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/editnominee.html' ,
                    controller: 'editnominee'
                },

            }
        }
    )
        .state('planlist',{
            url:"/plan-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/planlist.html' ,
                    controller: 'planlist'
                },

            }
        }
    )
        .state('planadd',{
            url:"/plan-add",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/planadd.html' ,
                    controller: 'planadd'
                },

            }
        }
    )
        .state('planupdate',{
            url:"/plan-update/:planId",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/planupdate.html' ,
                    controller: 'planupdate'
                },

            }
        }
    )
        .state('mynominee',{
            url:"/my-nominee",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/mynominee.html' ,
                    controller: 'mynominee'
                },

            }
        }
    )

        .state('nomineelist',{
            url:"/nominee-list/:userId",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/nomineelist.html' ,
                    controller: 'nomineelist'
                },

            }
        }
    )

        .state('userlist',{
            url:"/user-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/userlist.html' ,
                    controller: 'userlist'
                },

            }
        }
    )

        .state('adminlist',{
            url:"/admin-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/adminlist.html' ,
                    controller: 'adminlist'
                },

            }
        }
    )

        .state('addadmin',{
            url:"/add-admin",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/addadmin.html' ,
                    controller: 'addadmin'
                },

            }
        }
    )

        .state('refund',{
            url:"/refund/:cus_id",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/refund.html' ,
                    controller: 'refund'
                },

            }
        }
    )

        .state('couponlist',{
            url:"/coupon-list",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/couponlist.html' ,
                    controller: 'couponlist'
                },

            }
        }
    )
        .state('couponadd',{
            url:"/coupon-add",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/couponadd.html' ,
                    controller: 'couponadd'
                },

            }
        }
    )
        .state('couponpdate',{
            url:"/coupon-update/:couponId",
            views: {

                'admin_header': {
                    templateUrl: 'partials/admin_header.html' ,
                    controller: 'admin_header'
                },
                'admin_left': {
                    templateUrl: 'partials/admin_left.html' ,
                    controller: 'admin_left'
                },
                'admin_footer': {
                    templateUrl: 'partials/admin_footer.html' ,

                },
                'content': {
                    templateUrl: 'partials/couponupdate.html' ,
                    controller: 'couponupdate'
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


pearlehealth.directive('slideToggle', function() {
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

pearlehealth.directive('myCustomer', function() {
    return {
        template: 'Name: {{customer.name}} Address: {{customer.address}}'
    };
});


pearlehealth.controller('index', function($scope,$state,$cookieStore) {
    $state.go('home');
    return
});


pearlehealth.controller('services', function($scope,$state,$cookieStore) {
    //$state.go('home');
    //return
});

pearlehealth.controller('home', function($scope,$state,$cookieStore,$http,$rootScope) {

    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/planlist2',
        // data    : $.param({'state':'signup'}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.planList = data;

    });

});

pearlehealth.controller('header', function($scope,$state,$cookieStore,$uibModal,$rootScope) {
    $scope.loggedinstatus = 0;

    if(typeof($cookieStore.get('userid')) != 'undefined' && $cookieStore.get('userid')>0){
        $scope.loggedinstatus = 1;
    }

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

       var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
           controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    };
    $scope.howitworks = function(size){
        $uibModal.open({
            animation: true,
            templateUrl: 'howitworks.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    }

    $scope.whypearlehealth = function(size){
        $uibModal.open({
            animation: true,
            templateUrl: 'whypearlehealth.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    }

    $scope.tellafriend = function(size){
        $uibModal.open({
            animation: true,
            templateUrl: 'tellafriend.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    }


});

pearlehealth.controller('footer', function($scope,$state,$cookieStore,$uibModal,$rootScope) {
    $scope.terms = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'terms.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    };

    $scope.privacy = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'privacy.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    };
})

pearlehealth.controller('ModalInstanceCtrl', function ($scope,$state,$http,$cookieStore, $uibModalInstance,Upload,$timeout,$rootScope) {

    $scope.upfilelist = [];

    $scope.onlyNumbers = /^[0-9]+([.][0-9]+)?$/;;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.loginerror = '';

/*
    $scope.login = function(){
        $rootScope.stateIsLoading = true;
        $scope.loginerror = '';
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/login',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            if(data.uid > 0){
                $uibModalInstance.dismiss('cancel');
                $cookieStore.put('userid',data.uid);
                $cookieStore.put('userrole',data.role);

                $state.go('dashboard');
                return;
            }else{
                $scope.loginerror = data.msg;
            }
        });
    };

*/
    $scope.gosignup = function(){
        $uibModalInstance.dismiss('cancel');

        $state.go('signup');
        return;
    }

    $scope.goforfotpass = function(){
        $uibModalInstance.dismiss('cancel');

        $state.go('forgotpassword');
        return;
    }

    $scope.addfolder = function(){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/addfolder',
            data    : $.param({'userid':$cookieStore.get('userid'),'foldername':$scope.form.foldername,'folderId':$scope.pfolderId}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(resul) {
            $uibModalInstance.dismiss('cancel');
            if($scope.pfolderId==0) {
                window.location.href = 'my-files';
            }else {
                window.location.reload();
            }
        });
    }

    $scope.$watch('userfile', function (files) {
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
            url: $scope.adminUrl+'/ngmodule/uploadfile' + $scope.getReqParams(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            fields: {'userid':$cookieStore.get('userid'),'folderId':$scope.pfolderId},
            file: file,
            fileFormDataName: 'Filedata'
        });

        file.upload.then(function (response) {
            $('.progress').addClass('ng-hide');
            file.result = response.data;

            if(response.data.status == 'error'){
                $scope.upfilelist.push(response.data);
            }else{
                $scope.upfilelist.push(response.data.title);

                if($scope.pfolderId==0) {
                 window.location.href = 'my-files';
                 }else {
                 window.location.reload();
                 }
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


    if(typeof ($scope.fileid) != 'undefined' && typeof ($scope.filename) != 'undefined'){
        $scope.form = {
            fileid:$scope.fileid,
            filename:$scope.filename,
            userid:$cookieStore.get('userid'),
        }
    }

    $scope.rename1 = function(){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/frename',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $uibModalInstance.dismiss('cancel');
            $scope.filefolderlist[$scope.index].title = data;
        });
    }

    $scope.copy1 = function(){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/fcopy',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $uibModalInstance.dismiss('cancel');
            $scope.filefolderlist.push = data;

        });

    }

    $scope.sharewith = function(){
        $scope.selerror = '';
        $scope.nomineeId = 0;
        angular.forEach($scope.fnomineeList, function (val, key) {
            if(val.name == $scope.form.sharewith){
                $scope.nomineeId = val.uid;
            }
        });

        if($scope.nomineeId == 0){
            $scope.selerror = "Please select nominee"
        }else{
            $scope.form1= {
                uid: $cookieStore.get('userid'),
                fileid: $scope.fileid,
                filetype: $scope.filetype,
                filetitle: $scope.filetitle,
                nomineeid:$scope.nomineeId
            }

            $http({
                method  : 'POST',
                async:   false,
                url     : $scope.adminUrl+'/ngmodule/sharefile',
                data    : $.param($scope.form1),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }) .success(function(data) {
                $uibModalInstance.dismiss('cancel');


            });
        }

    }

    $scope.confirmdel = function(){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/userdelete',
            data    : $.param({uid:$scope.nomineelist[$scope.idx].uid}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $uibModalInstance.dismiss('cancel');
            $scope.nomineelist.splice($scope.idx,1);
        });
    }

    $scope.confirmfiledel = function(){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/filedelete',
            data    : $.param({id:$scope.filefolderlist[$scope.idx].id}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $uibModalInstance.dismiss('cancel');
            $scope.filefolderlist.splice($scope.idx,1);
        });
    }

    $scope.refund = function(){
        $rootScope.stateIsLoading = true;

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/chargerefund',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(res) {
            $rootScope.stateIsLoading = false;
            $state.go('userlist');
            return;
        });
    }


});

pearlehealth.controller('admin_header', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.loggedinstatus = 0;
    $scope.userid =0;
    $scope.username ='';
    $scope.userpicture ='';

    if(typeof($cookieStore.get('userid')) != 'undefined' && $cookieStore.get('userid')>0){
        $scope.loggedinstatus = 1;
        $scope.userid = $cookieStore.get('userid');

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/user-details',
            data    : $.param({'userid':$cookieStore.get('userid')}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $scope.username = data.name;
            $scope.userpicture = data.picture;
            $scope.usermail = data.mail;
            $scope.total_capacity = data.total_capacity;
            $scope.total_usage = data.total_usage;
        });
    }else{
        $state.go('home');
        return;
    }



});

pearlehealth.controller('admin_left', function($scope,$state,$http,$cookieStore,$uibModal,Upload,$rootScope) {

    $scope.userid = $cookieStore.get('userid');
    $scope.userrole = $cookieStore.get('userrole');



    $scope.addnewfolder = function (size) {
        if(typeof($cookieStore.get('folderId')) == 'undefined'){
            $cookieStore.put('folderId',0);
        }

        $scope.pfolderId = 0;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addfolder.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    };

    $scope.addnewfile = function (size) {

        if(typeof($cookieStore.get('folderId')) == 'undefined'){
            $cookieStore.put('folderId',0);
        }



        $scope.pfolderId = 0;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addfile.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    };

    $scope.deletefile = function(){
        alert(1);
    }


});

pearlehealth.controller('signup', function($scope,$state,$http,$cookieStore,$rootScope,$filter) {

    $scope.format = 'MM/dd/yyyy';
    $scope.open = function() {
        $scope.opened = true;
    };

    $scope.states = ['AK','AL','AR','AZ','CA','CO','CT','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY'];



    $scope.passwordValidator = function(password) {

        if (!password) {
            return;
        }
        else if (password.length < 6) {
            return "Password must be at least " + 6 + " characters long";
        }
        else if (!password.match(/[A-Z]/)) {
            return "Password must have at least one capital letter";
        }
        else if (!password.match(/[0-9]/)) {
            return "Password must have at least one number";
        }

        return true;
    };

    $scope.monthList = [
        {
            'id':1,'name':'January'
        },
        {
            'id':2,'name':'Febuary'
        },
        {
            'id':3,'name':'March'
        },
        {
            'id':4,'name':'April'
        },
        {
            'id':5,'name':'May'
        },
        {
            'id':6,'name':'June'
        },
        {
            'id':7,'name':'July'
        },
        {
            'id':8,'name':'August'
        },
        {
            'id':9,'name':'September'
        },
        {
            'id':10,'name':'October'
        },
        {
            'id':11,'name':'November'
        },
        {
            'id':12,'name':'December'
        },
    ];

    var yearList = [];
    for(var i=0;i<20;i++) {
        yearList.push({'id':2015+i,'name':2015+i});
    }
    $scope.yearList = yearList;

    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/planlist2',
        // data    : $.param({'state':'signup'}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.planList = data;
        if(data.length){
            $scope.form = {
                'plan' : data[0].plan_id,
                'plan1' : data[0].plan_id
            }
        }
    });

    $scope.update2 = function($event){
        /*$scope.form = {
            fname : $scope.form.fname,
            lname: $scope.form.lname,
            email: $scope.form.email,
            password: $scope.form.password,
            address: $scope.form.address,
            phone1: $scope.form.phone1,
            contactemail: $scope.form.email,
            nameofcard: $scope.form.nameofcard,
            cardno: $scope.form.cardno,
            expmo: $scope.form.expmo,
            expyear: $scope.form.expyear,
            cvv: $scope.form.cvv,
            zip: $scope.form.zip,
            plan: $scope.form.plan,
        }*/


        var contactemail = { 'contactemail' : $event.target.value }
        angular.extend($scope.form, contactemail)

    }

    $scope.promoapply = function(){
        if($filter('lowercase')($scope.form.offercode) == 'kfnx'){
            $scope.form.is_discount = 1;
            $scope.promosuc = 1;
        }else{
            $scope.promosuc = 0;
            $scope.form.is_discount = 0;
        }
    }
    $scope.register = function(){

        $scope.form.plan1 = $scope.form.plan;

        if(typeof ($scope.form.offerplan) != 'undefined'){
            if(typeof ($scope.form.offerplan[$scope.form.plan]) != 'undefined') {
                if ($scope.form.offerplan[$scope.form.plan]) {
                    angular.forEach($scope.planList, function (val, key) {
                        if(val.plan_id == $scope.form.plan){
                            $scope.form.plan1 = val.offer.plan_id;
                        }
                    });
                }
            }
        }

        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/register',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            if(data.status == 'error'){
                var myEl = angular.element( document.querySelector( '#'+data.error.param ) );
                myEl.find('.errormsg').remove();
                myEl.append('<span class="errormsg has-error validationMessage">'+data.error.message+'</span>');
            }else{
                $state.go('thankyou');
                return
            }
        });
    }

});

pearlehealth.controller('thankyou', function($scope,$state,$cookieStore,$http,$rootScope) {

})
pearlehealth.controller('forgotpassword', function($scope,$state,$cookieStore,$http,$rootScope) {

    $scope.submit = function(){
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/forgot_user_mail',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            if(data.status == 'error'){
                var myEl = angular.element( document.querySelector( '#emailgroup' ) );
                myEl.find('.errormsg').remove();
                myEl.append('<span class="errormsg has-error validationMessage">'+data.msg+'</span>');
            }else{
                $scope.sucmsg = 'Please check your mail';
            }

        });
    }

});
pearlehealth.controller('resetpassword', function($scope,$state,$cookieStore,$http,$stateParams,$rootScope) {
    $scope.cpass=$stateParams.cpass;
    $scope.uid=$stateParams.uid;

    $scope.form = {
        password : $stateParams.cpass,
        uid : $stateParams.uid,
    }

    $scope.passwordValidator = function(password) {

        if (!password) {
            return;
        }
        else if (password.length < 6) {
            return "Password must be at least " + 6 + " characters long";
        }
        else if (!password.match(/[A-Za-z]/)) {
            return "Password must have at least letter";
        }
        else if (!password.match(/[0-9]/)) {
            return "Password must have at least one number";
        }

        return true;
    };

    $scope.passwordValidator1 = function(password1,password2) {

        if (!password1) {
            return;
        }
        else if (password1 != password2) {
            return "Password does not match";
        }

        return true;
    };

    $scope.errormsg = 0;
    $scope.sucmsg = 0;

    $scope.submit = function(){
        $rootScope.stateIsLoading = true;
        $scope.errormsg = 0;
        $scope.sucmsg = 0;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/resetuserpass',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            if(data.status == 'error'){
                $scope.errormsg = 1;
            }else{
                $scope.sucmsg = 1;
            }

        });
    }

});
pearlehealth.controller('login', function($scope,$state,$http,$cookieStore,$rootScope) {
   // $state.go('login');
});

pearlehealth.controller('logout', function($scope,$state,$http,$cookieStore,$rootScope) {
    $cookieStore.remove('userid');
    $cookieStore.remove('userrole');

    $state.go('home');
    return;
});

pearlehealth.controller('addnominee', function($scope,$state,$http,$cookieStore,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $scope.form = {
        'parent' : $cookieStore.get('userid')
    }

    $scope.addnominee = function(){

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/addnominee',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $state.go('mynominee');
            return;
        });
    }
});

pearlehealth.controller('editnominee', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $scope.uid = $stateParams.UserId;

    $scope.form = {
        'uid' : $scope.uid
    }

    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/user-details2',
        data    : $.param({'userid':$scope.uid}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.form = {
            uid : data.uid,
            fname : data.fname,
            email : data.email,
            phone1 : data.phone1,
            contactemail : '',
            lname : data.lname,
            address : data.address,
            phone2 : data.phone2,
            zip : '',
            isprimary : data.is_primary,
        }
    });

    $scope.addnominee = function(){

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/updateprofile',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {

            $state.go('mynominee');
            return

        });
    }
});

pearlehealth.controller('dashboard', function($scope,$state,$http,$cookieStore,$stateParams,$uibModal,$rootScope) {

    $scope.userrole = $cookieStore.get('userrole');
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    if(typeof($cookieStore.get('userrole')) != 'undefined'){
        if($cookieStore.get('userrole') == 6){
            $state.go('userlist');
            return
        }
        if($cookieStore.get('userrole') == 4 || $cookieStore.get('userrole') == 5){
            $state.go('myfiles');
            return
        }
    }else{
        $state.go('home');
        return
    }

    $scope.folderId=0;
    $scope.folderTree = [];

    if(typeof ($stateParams.folderId) != 'undefined'){
        $scope.folderId=$stateParams.folderId;
    }

    $cookieStore.put('folderId',$scope.folderId);

    if($cookieStore.get('userrole') == 5){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/getnomineefilefolderlist',
            data    : $.param({'userid':$cookieStore.get('userid'),'folderId':$cookieStore.get('folderId')}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $scope.filefolderlist = data.data;
            $scope.folderTree = data.foldertree;
        });
    }else{
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/getfilefolderlist',
            data    : $.param({'userid':$cookieStore.get('userid'),'folderId':$cookieStore.get('folderId')}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $scope.filefolderlist = data.data;
            $scope.folderTree = data.foldertree;
        });
    }

    $scope.rename = function(index,size){
        $scope.index = index;
        $scope.fileid = $scope.filefolderlist[index].id;
        $scope.filename = $scope.filefolderlist[index].title;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'rename.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    }

    $scope.copy = function(index,size){
        $scope.index = index;
        $scope.fileid = $scope.filefolderlist[index].id;
        $scope.filename = 'Copy of '+$scope.filefolderlist[index].title;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'copy.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    }

});

pearlehealth.controller('myfiles', function($scope,$state,$http,$cookieStore,$stateParams,$uibModal,$rootScope) {

    $scope.userrole = $cookieStore.get('userrole');
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $scope.folderId=0;
    $scope.folderTree = [];

    if(typeof ($stateParams.folderId) != 'undefined'){
        $scope.folderId=$stateParams.folderId;
    }

    $cookieStore.put('folderId',$scope.folderId);

    if($cookieStore.get('userrole') == 5){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/getnomineefilefolderlist',
            data    : $.param({'userid':$cookieStore.get('userid'),'folderId':$cookieStore.get('folderId')}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $scope.filefolderlist = data.data;
            $scope.folderTree = data.foldertree;
        });
    }else{
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/getfilefolderlist',
            data    : $.param({'userid':$cookieStore.get('userid'),'folderId':$cookieStore.get('folderId')}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $scope.filefolderlist = data.data;
            $scope.folderTree = data.foldertree;
        });
    }



    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/nomineelist',
        data    : $.param({'userid':$cookieStore.get('userid'),}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.nomineelist = data;
        $scope.fnomineeList = data;
    });

    $scope.rename = function(index,size){
        $scope.index = index;
        $scope.fileid = $scope.filefolderlist[index].id;
        $scope.filename = $scope.filefolderlist[index].title;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'rename.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    }

    $scope.copy = function(index,size){
        $scope.index = index;
        $scope.fileid = $scope.filefolderlist[index].id;
        $scope.filename = 'Copy of '+$scope.filefolderlist[index].title;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'copy.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    }

    $scope.share = function(index,size){
        $scope.index = index;
        $scope.fileid = $scope.filefolderlist[index].id;
        $scope.filetype = $scope.filefolderlist[index].is_folder;
        $scope.filetitle = $scope.filefolderlist[index].title;
        if($scope.filefolderlist[index].nomineeList.length){
            $scope.sharewithlist = 'Share With ';
            $scope.sharewithlist += $scope.filefolderlist[index].nomineeList.join(',');
        }

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'share.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    }

    $scope.share1 = function(idx,size){

        $scope.fileid = idx;
        $scope.filetype = 1;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'share.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    }

    $scope.filedelete = function(idx){
        $scope.idx = idx;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'delconfirm.html',
            controller: 'ModalInstanceCtrl',
            //size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    }


    $scope.addnewfolder = function (size) {
        $scope.pfolderId = $cookieStore.get('folderId');

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addfolder.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    };

    $scope.addnewfile = function (size) {

        $scope.pfolderId = $cookieStore.get('folderId');

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addfile.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

    };




});

pearlehealth.controller('accountinfo', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    if(typeof($cookieStore.get('userid')) != 'undefined' && $cookieStore.get('userid')>0){
        $scope.loggedinstatus = 1;
        $scope.userid = $cookieStore.get('userid');

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/user-details1',
            data    : $.param({'userid':$cookieStore.get('userid')}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $scope.acinfo = data;
        });
    }else{
        $state.go('home');
        return;
    }
});

pearlehealth.controller('updateprofile', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/user-details2',
        data    : $.param({'userid':$cookieStore.get('userid')}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.form = {
            uid : data.uid,
            fname : data.fname,
            email : data.email,
            phone1 : data.phone1,
            contactemail : data.contact_email,
            lname : data.lname,
            address : data.address,
            phone2 : data.phone2,
            zip : data.zip,
        }
    });

    $scope.updateprofile = function(){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/updateprofile',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {

            $state.go('dashboard');
                return

        });
    }

    $scope.cancel =function(){
        $state.go('accountinfo');
        return;
    }

});

pearlehealth.controller('changepassword', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $scope.passwordValidator = function(password) {

        if (!password) {
            return;
        }
        else if (password.length < 6) {
            return "Password must be at least " + 6 + " characters long";
        }
        else if (!password.match(/[A-Z]/)) {
            return "Password must have at least one capital letter";
        }
        else if (!password.match(/[0-9]/)) {
            return "Password must have at least one number";
        }

        return true;
    };

    $scope.passwordValidator1 = function(password1,password2) {

        if (!password1) {
            return;
        }
        else if (password1 != password2) {
            return "Password does not match";
        }

        return true;
    };

    $scope.form = {
        'user_id':$cookieStore.get('userid')
    }

    $scope.changepass = function(){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/changepassword',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            if(data.status == 'error'){
                var myEl = angular.element( document.querySelector( '#curpass' ) );
                myEl.find('.errormsg').remove();
                myEl.append('<span class="errormsg has-error validationMessage">Please enter correct current password.</span>');
            }else{
                $state.go('dashboard');
                return;
            }
        });
    }


    $scope.cancel =function(){
        $state.go('dashboard');
        return;
    }
});

pearlehealth.controller('subcriptiondetails', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/subcription-details',
        data    : $.param({'userid':$cookieStore.get('userid')}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.subdetails = data;
    });
});

pearlehealth.controller('planchange', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }


    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/user-details1',
        data    : $.param({'userid':$cookieStore.get('userid')}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.form = {
            'uid' : data.uid,
            'plan' : data.plan_id,
            'customer_id' : data.customer_id
        }
    });

    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/planlist2',
        // data    : $.param({'state':'signup'}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.planList = data;
    });

    $scope.changeplan = function(){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/planchange',
             data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $state.go('dashboard');
            return;
        });
    }

    $scope.cancel =function(){
        $state.go('dashboard');
        return;
    }

});
pearlehealth.controller('planlist', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/planlist',
        // data    : $.param(),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.planlist = data.data;

    });
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/planlist1',
        // data    : $.param(),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.planliststatus = data;

    });

    $scope.changeplanstatus = function(planid,status){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/changestatus',
             data    : $.param({'plan_id':planid,'status':status}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $scope.planliststatus = data;

        });
    }

});

pearlehealth.controller('planadd', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }
    $scope.onlyNumbers = /^[0-9]+([.][0-9]+)?$/;

    $scope.intervallist = [
        {  'id':'day','name':'Day'  },
        {  'id':'week','name':'Week'  },
        {  'id':'month','name':'Month'  },
        {  'id':'year','name':'Year'  }
        ];

    $scope.allowed_types = [
        {  'id':1,'name':'Word Documents'  },
        {  'id':2,'name':'Images'  },
        {  'id':3,'name':'Videos'  },

    ];

    $scope.allowed_typess =  {  val1:false, val2:false,val3:false };

    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/planlist2',
        // data    : $.param({'state':'signup'}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.planList = data;
    });

    $scope.form = {allowed_types_str:''};
    $scope.checkList = function(){
        var str ='';
        if($scope.allowed_typess.val1){
            str += 'Word Documents,';
        }
        if($scope.allowed_typess.val2){
            str += 'Images,';
        }
        if($scope.allowed_typess.val3){
            str += 'Videos,';
        }
        $scope.form.allowed_types_str = str;
    };

    $scope.errormsg = '';
    $scope.addplan = function(){
        $scope.errormsg = '';
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/planadd',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;

            if(data.status == 'error'){
                $scope.errormsg = data.message;
            }else{
                $state.go('planlist');
                return;
            }
        });
    }

});

pearlehealth.controller('planupdate', function($scope,$state,$http,$cookieStore,$stateParams,$uibModal,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $rootScope.stateIsLoading = true;
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/planudet',
        data    : $.param({'plan':$stateParams.planId}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        $scope.form = {
            id:data.id,
            planname:data.name
        }
    });

    $scope.updateplan = function(){
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/planupdate',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $state.go('planlist');
            return;
        });
    }

});


pearlehealth.controller('mynominee', function($scope,$state,$http,$cookieStore,$stateParams,$uibModal,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/nomineelist',
        data    : $.param({'userid':$cookieStore.get('userid'),}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.nomineelist = data;
    });

    $scope.nomineedel = function(item){
        $scope.idx = $scope.nomineelist.indexOf(item);
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'delconfirm.html',
            controller: 'ModalInstanceCtrl',
            //size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    }

    $scope.filefolderlist = [];
    $scope.sharedfile = function(nomineeid){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/getnomineefilefolderlist1',
            data    : $.param({'userid':nomineeid,'folderId':0}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $scope.filefolderlist = data;


            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'sharedfile.html',
                controller: 'ModalInstanceCtrl',
                //size: size,
                scope:$scope,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

        });
    }

});

pearlehealth.controller('nomineelist', function($scope,$state,$http,$cookieStore,$stateParams,$uibModal,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();
    $scope.userId = $stateParams.userId;

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/nomineelist',
        data    : $.param({'userid':$scope.userId}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.nomineelist = data;
    });

    $scope.nomineedel = function(item){
        $scope.idx = $scope.nomineelist.indexOf(item);
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'delconfirm.html',
            controller: 'ModalInstanceCtrl',
            //size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    }

    $scope.filefolderlist = [];
    $scope.sharedfile = function(nomineeid){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/getnomineefilefolderlist1',
            data    : $.param({'userid':nomineeid,'folderId':0}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $scope.filefolderlist = data;


            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'sharedfile.html',
                controller: 'ModalInstanceCtrl',
                //size: size,
                scope:$scope,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

        });
    }

});

pearlehealth.controller('userlist', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $scope.predicate = 'last_activation';
    $scope.reverse = true;
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/generaluserlist',
        //data    : $.param({'userid':$cookieStore.get('userid'),}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.userlist = data;
    });

    $scope.changestatus = function(item){
        $rootScope.stateIsLoading = true;
        var idx = $scope.userlist.indexOf(item);
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/cnguserstatus',
            data    : $.param({uid: $scope.userlist[idx].uid}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(res) {
            $rootScope.stateIsLoading = false;
            $scope.userlist[idx].is_expired_str = res;
        });
    }

    $scope.sendduplicatemail = function(uid){
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/sendduplicatemail',
            data    : $.param({uid: uid}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(res) {
            $rootScope.stateIsLoading = false;
        });
    }

});

pearlehealth.controller('adminlist', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/adminlist',
        //data    : $.param({'userid':$cookieStore.get('userid'),}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.userlist = data;
    });

    $scope.searchkey = '';
    $scope.search = function(item){

        if ( (item.name.indexOf($scope.searchkey) != -1) || (item.mail.indexOf($scope.searchkey) != -1) ){
            return true;
        }
        return false;
    };

});

pearlehealth.controller('addadmin', function($scope,$state,$http,$cookieStore) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $scope.passwordValidator = function(password) {

        if (!password) {
            return;
        }
        else if (password.length < 6) {
            return "Password must be at least " + 6 + " characters long";
        }


        return true;
    };

    $scope.addadmin = function(){

        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/addadmin',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $state.go('adminlist');
            return;
        });
    }
});

pearlehealth.controller('refund', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope,$uibModal) {

    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $scope.onlyNumbers = /^[0-9]+([.][0-9]+)?$/;
    $scope.curValue = 0.00;

    $rootScope.stateIsLoading = true;
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/allcharge',
        data    : $.param({cus_id:$stateParams.cus_id}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        $scope.paymentlist = data;
    });

    $scope.chargerefund = function(item,size){

        var idx = $scope.paymentlist.indexOf(item);

        $scope.curPayment = $scope.paymentlist[idx];

        $scope.curValue = $scope.curPayment.cur_amaount;

        $scope.form = {
            ch_id : $scope.curPayment.ch_id,
            camount : $scope.curPayment.cur_amaount,
            ramount : $scope.curPayment.cur_amaount
        }

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'refund.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            scope:$scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });


    }

});

pearlehealth.controller('couponlist', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/couponlist',
        // data    : $.param(),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $scope.couponlist = data.data;

    });

    $scope.changecouponstatus = function(planid,status){
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/couponchangestatus',
            data    : $.param({'plan_id':planid,'status':status}),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $scope.couponlist = data;

        });
    }

});

pearlehealth.controller('couponadd', function($scope,$state,$http,$cookieStore,$stateParams,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }
    $scope.onlyNumbers = /^[0-9]+([.][0-9]+)?$/;



   $scope.addcoupon = function(){
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/couponadd',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;

            if(data.status == 'error'){
                $scope.errormsg = data.message;
            }else{
                $state.go('couponlist');
                return;
            }
        });
    }

});

pearlehealth.controller('couponupdate', function($scope,$state,$http,$cookieStore,$stateParams,$uibModal,$rootScope) {
    $scope.mainwrapperwidth = $(window).width();

    if ( $(window).width() > 480) {
        $scope.mainwrapperwidth = parseInt($(window).width()-150);
    }

    $rootScope.stateIsLoading = true;
    $http({
        method  : 'POST',
        async:   false,
        url     : $scope.adminUrl+'/ngmodule/coupondet',
        data    : $.param({'couponid':$stateParams.couponId}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }) .success(function(data) {
        $rootScope.stateIsLoading = false;
        $scope.form = {
            id:data.id,
            planname:data.name
        }
    });

    $scope.updatecoupon = function(){
        $rootScope.stateIsLoading = true;
        $http({
            method  : 'POST',
            async:   false,
            url     : $scope.adminUrl+'/ngmodule/couponupdate',
            data    : $.param($scope.form),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) .success(function(data) {
            $rootScope.stateIsLoading = false;
            $state.go('couponlist');
            return;
        });
    }

});
