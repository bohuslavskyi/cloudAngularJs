(function (angular) {
    'use strict';

    var common = angular.module('adConsole');

    /**
     *
     * @class userCtrl
     * @module u
     *
     */
    common.controller('userCtrl',  ['$scope','uStorage', '$location',
        function ($scope, uStorage, $location) {
          function init() {
            $scope.currentUser = uStorage.getCurrentUser();

            if($scope.currentUser.data){
              $scope.currentUser = $scope.currentUser.data;
            }
              $scope.name = $scope.currentUser.contactFullName.toUpperCase();

            $scope.isActive = function(route) {
              return $location.path().indexOf(route) !== -1;
            }
          }

            init();

        }]);

})(angular);
