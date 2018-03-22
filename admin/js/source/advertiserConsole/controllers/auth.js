(function (angular) {
    'use strict';

    var adConsole = angular.module('adConsole');

    adConsole.controller('authCtrl', ['$rootScope', '$scope', '$location', 'uApi', 'uStorage', 'md5', '$modal',
        function ($rootScope, $scope, $location, uApi, uStorage, md5, $modal) {

            $scope.user = {login: 'admin', pass: 'admin'};
            $scope.login = '';
            $scope.pass = '';
            $scope.check = function () {
                $scope.serverError = '';
                if ($scope.form.$valid) {
                    uApi.checkLogin({
                        email: $scope.login,
                        password: md5.createHash($scope.pass)
                    }).then(function (resp) {
                            console.log(resp);
                            uStorage.saveCurrentUser(resp);
                            $location.url('/accountStatus');
                        }, function (err) {
                            $scope.serverError = err.data.error.message;
                        });
                }
            };

            $scope.signUp = function () {
                $location.url('/advertiserRegistration');
            };

          $scope.openForgotPassword = function () {
                function openDialog() {
                    $modal.open({
                        templateUrl: 'templates/console/forgotPassword.html',
                        scope: $scope,
                        backdrop: true,
                        backdropClass: 'forgotPasswordModalBackDrop',
                        controller: ['$scope', '$modalInstance', 'uApi', function ($scope, $modalInstance, uApi) {
                            $scope.user = {};
                            $scope.isOk = false;

                            $scope.cancel = function () {
                                $modalInstance.dismiss();
                            };

                            $scope.submit = function() {
                                uApi.requestPassword($scope.user).then(function() {
                                    $scope.isOk = true;
                                }, function (err) {
                                    $scope.resetServerError = err.data.error.message;

                                });
                            }
                        }],
                        windowClass: 'forgotPasswordModal'
                    });
                }

                openDialog();
            };
        }]);
})(angular);
