(function (angular) {
    'use strict';

    var common = angular.module('uCommon');

    /**
     * The uCampaignTag directive
     *
     * @class uCampaignTag
     * @module u
     *
     *
     */
    common.directive('uHeader', ['$rootScope', function factory($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/console/u-header.html',
            link : function($scope, element, attributes, ctrl) {
                $scope.title = attributes.title || 'ULike';
                $rootScope.withLeftBar = typeof attributes.withLeftBar === 'undefined' ? false : true;

                console.log($rootScope.withLeftBar);
                $rootScope.showHeaderLeftBar = false;

                $scope.showAndHideLeftHeader = function(){
                    $rootScope.showHeaderLeftBar = !$rootScope.showHeaderLeftBar;
                }
            }
        };
    }]);
})(angular);
