(function (angular) {
    'use strict';

    var adConsole = angular.module('adConsole', ['ngSanitize', 'ngCsv', 'ngCountries', 'ngRoute', 'uCommon', 'ngClipboard', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'chartjs', 'chart.js', 'angular-md5', 'ngCookies', 'angular-loading-bar', 'angularMoment', 'ui.select']);

    adConsole.config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'templates/console/login.html',
                name: 'login'
            })
            .when('/accountStatus', {
                templateUrl: 'templates/console/accountStatus.html',
                name: 'accountStatus',
                access: {
                    requiresLogin: true
                }
            })
            .when('/billingForecast', {
                templateUrl: 'templates/console/billingForecast.html',
                name: 'billingForecast',
                access: {
                    requiresLogin: true
                }
            })
            .when('/billingParameters', {
                templateUrl: 'templates/console/billingParameters.html',
                name: 'billingParameters',
                access: {
                    requiresLogin: true
                }
            })
            // .when('/userCenter', {
            //     templateUrl: 'templates/console/userCenter.html',
            //     name: 'userCenter',
            //     access: {
            //         requiresLogin: true,
            //         userType: "apk"
            //     }
            // })
            // .when('/userPayments', {
            //     templateUrl: 'templates/console/userPayments.html',
            //     name: 'userPayments',
            //     access: {
            //         requiresLogin: true,
            //         userType: "apk"
            //     }
            // })
            .when('/AccountPricing', {
                templateUrl: 'templates/console/accountPricing.html',
                name: 'AccountPricing',
                access: {
                    requiresLogin: true,
                }
            })
            .when('/accountSettings', {
                templateUrl: 'templates/console/accountSettings.html',
                name: 'accountSettings',
                access: {
                    requiresLogin: true,
                }
            })
            .when('/subscribedAccounts', {
                templateUrl: 'templates/console/subscribedAccounts.html',
                name: 'subscribedAccounts',
                access: {
                    requiresLogin: true,
                }
            })
            .when('/adminMenu', {
                templateUrl: 'templates/console/adminMenu.html',
                name: 'adminMenu',
                access: {
                    requiresLogin: true,
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
