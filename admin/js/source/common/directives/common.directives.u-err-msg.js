(function (angular) {
    'use strict';

    var common = angular.module('uCommon');

    /**
     * The uLanguageBar directive
     *
     * @class uLanguageBar
     * @module u
     *
     *
     */
    common.directive('uErrMsg',['u.translation', function factory(translation) {
        return {
            restrict: 'E',
            replace: true,
            template:   '<div class="err-msg bouncy-slide-right">\
                            <div >{{message}}</div>\
                        </div>',
            scope: {},
            link : function($scope, element, attributes, ctrl) {
                $scope.type = attributes.type;
                switch ($scope.type){
                    case 'required' :
                        $scope.message = 'This field is required';
                        break;
                    case 'matchPassword':
                        $scope.message = 'Passwords don\'t match';
                        break;
                    case 'special':
                        $scope.message = attributes.label;
                        break;
                }

            }
        };
    }]);
})(angular);
