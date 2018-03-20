(function (angular) {
    'use strict';

    var app = angular.module('uCommon', [ 'ngRoute', 'ngCookies']);


    app.factory('authHttpResponseInterceptor',['$q','$location',function($q, $location) {
        return {
            response: function(response){
                if (response.status === 403) {
                    console.log("Response 403");
                }
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection.status === 403) {
                    console.log("Response Error 403",rejection);
                    $location.path('/').search('returnTo', $location.path());
                }

                return $q.reject(rejection);
            }
        }
    }])
    .config(['$httpProvider',function($httpProvider) {
        //Http Intercpetor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    }]);



})(angular);
