(function (angular) {
  'use strict';

  var common = angular.module('adConsole');
  /**
   *
   * @class appStatsCtrl
   * @module u
   *
   */
  common.controller('appStatsCtrl', ['$rootScope', '$scope',
    function ($rootScope, $scope) {
    $scope.page={
        b2c : false,
        apk : false,
        sdk : false
    }


        $scope.pageTypeSelect = function (pageType) {
            if('b2c' == pageType)  {
                $scope.page.b2c = true;
                $scope.page.apk = false;
                $scope.page.sdk = false;
                $scope.b2c = 'b2cChosen'
                $scope.apk='apk';
                $scope.sdk='sdk';
            }else if ('apk' == pageType){
                $scope.page.b2c = false;
                $scope.page.apk = true;
                $scope.page.sdk = false;
                $scope.apk = 'apkChosen'
                $scope.sdk ='sdk';
                $scope.b2c ='b2c';
            }else if ('sdk' == pageType){
                $scope.page.b2c = false;
                $scope.page.apk = false;
                $scope.page.sdk = true;
                $scope.sdk = 'sdkChosen'
                $scope.apk = 'apk';
                $scope.b2c ='b2c';
            }
        }

    }]);
})(angular);
