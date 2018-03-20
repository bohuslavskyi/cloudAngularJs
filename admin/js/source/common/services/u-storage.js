(function (angular) {
  'use strict';

  var common = angular.module('uCommon');

  /**
   * The uStorage service
   *
   * @class uStorage
   * @module u
   *
   *
   */
  common.service('uStorage', ['$cookieStore', function factory($cookieStore) {
    function uStorageFactory($cookieStore) {
      var self = this,
        user,
        language;


      this.saveCurrentUser = function (user) {
        if (user.user) {
          $cookieStore.put('access_token', user.accessToken);
          $cookieStore.put('userName', user.user.email);
          self.user = user.user;

          return;
        }
        self.user = user;
      };
      this.saveApp = function (userApp) {
        if (userApp.data) {
            self.user = userApp.data;
          return userApp.data;
        }
        self.user = userApp;
      };


      this.getUserApp = function () {
        self.userApp
        return self.userApp;
      };


      this.getCurrentUser = function () {
        return self.user;
      };

      this.saveCurrentLanguage = function (language) {
        self.language = language;
      };

      this.getCurrentLanguage = function () {
        return self.language;
      };

      this.getAccessToken = function () {
        return $cookieStore.get('access_token');
      }

      this.getUserName = function () {
        return $cookieStore.get('userName');
      }


    }

    return new uStorageFactory($cookieStore);
  }]);
})(angular);
