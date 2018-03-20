(function (angular) {
  'use strict';

  var common = angular.module('uCommon');

  /**
   * The uApi service
   *
   * @class uCampaignTag
   * @module u
   *
   *
   */
  common.service('uApi', ['$resource', '$http', 'uStorage', 'md5', '$q', function factory($resource, $http, uStorage, md5, $q) {




    function ApiFactory() {
      var self = this,
        requestAdvertiser = $resource('https://2-dot-moneyslide14614.appspot.com/_ah/api/advertiserendpoint/v1/advertiser'),
        requestCategoryList = $resource('https://moneyslide14614.appspot.com/_ah/api/singleinterestendpoint/v1/singleinterest');


      // not delete
        this.getPublisherAccount = function (onLoad) {
          $http.post('https://staging-dot-moneyslide14614.appspot.com/user/publisherActions/getPublisher', {email: uStorage.getUserName()}, {
            headers: {
              accessToken: uStorage.getAccessToken(),
              "Access-Control-Allow-Origin" : "*",
              'Content-Type' : 'application/json',
              'Accept': 'application/json'
            }
          })
            .success(function (response) {
          console.log(response);
              onLoad(response);
        }).error(function () {
          console.log('failed to switchPolicy');
          return 'error';
        });
      };

        this.checkLogin = function (user) {
        var request = $resource('https://staging-dot-moneyslide14614.appspot.com/authPublisher/login',
          {}, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
        var defer = $q.defer();

        request.save(user).$promise.then(function onSuccess(response) {
          if (response.statusCode != 0) {
            defer.reject({
              status: response.statusCode,
              data: {
                error: {
                  message: response.errorMessage
                }
              }
            });

            return;
          }

          response.data.user = JSON.parse(response.data.user);

          if (response.data.user.verifiedEmail) {
            defer.resolve(response.data);
            return;
          }

          defer.reject({
            status: 412,
            data: {
              error: {
                message: 'Email not verified'
              }
            }
          });

        }, function onError(err) {
          defer.reject(err);
        });

        return defer.promise;
      };
    }

    return new ApiFactory();
  }]);
})(angular);
