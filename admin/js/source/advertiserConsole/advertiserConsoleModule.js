(function (angular) {
    'use strict';

    var adConsole = angular.module('adConsole', ['ngSanitize', 'ngCsv', 'ngCountries', 'ngRoute', 'uCommon', 'ngClipboard', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'chartjs', 'chart.js', 'angular-md5', 'ngCookies', 'angular-loading-bar', 'angularMoment', 'ui.select']);

    adConsole.config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'templates/console/login.html',
                name: 'login'
            })
            .when('/b2c', {
                templateUrl: 'templates/console/b2c.html',
                name: 'b2c',
                access: {
                    requiresLogin: true
                }
            })
            .when('/apk', {
                templateUrl: 'templates/console/apk.html',
                name: 'apk',
                access: {
                    requiresLogin: true
                }
            })
            .when('/sdk', {
                templateUrl: 'templates/console/sdk.html',
                name: 'sdk',
                access: {
                    requiresLogin: true
                }
            })
            .when('/userCenter', {
                templateUrl: 'templates/console/userCenter.html',
                name: 'userCenter',
                access: {
                    requiresLogin: true,
                    userType: "apk"
                }
            })
            .when('/userPayments', {
                templateUrl: 'templates/console/userPayments.html',
                name: 'userPayments',
                access: {
                    requiresLogin: true,
                    userType: "apk"
                }
            })
            .when('/notificationsCenter', {
                templateUrl: 'templates/console/apkNotificationCenter.html',
                name: 'NotificationsCenter',
                access: {
                    requiresLogin: true,
                    userType: "apk"
                }
            })
            .when('/rewards', {
                templateUrl: 'templates/console/rewards.html',
                name: 'NotificationsCenter',
                access: {
                    requiresLogin: true,
                    userType: "apk"
                }
            })
            .when('/homepage', {
                templateUrl: 'templates/console/homepage.html',
                name: 'homepage',
                access: {
                    requiresLogin: true,
                    userType: "apk"
                }
            })
            .otherwise({
                redirectTo: '/'
            });

        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file):|data:;base64,/);
    }]);


    adConsole.run(['uStorage', 'uApi', '$rootScope', '$location', '$route', '$q', function (uStorage, uApi, $rootScope, $location, $route, $q) {
        $rootScope.$on('$routeChangeSuccess', function () {
            console.log('location', $location.path());
            $rootScope.us = uStorage.getCurrentUser();

        });
        $rootScope.$on('$routeChangeStart', function (event, next) {

            function onLoadPublisherAccount(user) {
                uStorage.saveCurrentUser(user);
                $rootScope.$evalAsync(function () {
                    $route.reload();
                });
            }

            if (next.access !== undefined && next.access.requiresLogin) {

                if (!uStorage.getCurrentUser()) {
                    console.log('oti', uStorage.getCurrentUser())
                    event.preventDefault();


                    if (!uStorage.getAccessToken()) {
                        $location.path('/');
                    } else {
                        uApi.getPublisherAccount(onLoadPublisherAccount);
                    }
                }
            }
        });
    }]);

    adConsole.config(function ($httpProvider) {
        $httpProvider.defaults.useXDomain = false;
        $httpProvider.defaults.withCredentials = false;
    });



})(angular);
