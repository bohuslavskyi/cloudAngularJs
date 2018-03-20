(function (angular) {
  'use strict';

  var common = angular.module('uCommon'),
    directive = common.directive;

  /**
   *
   *
   * @class voFile
   * @module common
   * @submodule common.directives
   * @namespace vo.common
   */
  directive('uFile', [ 'uApi', function(uApi){
    return {
      restrict : 'E',
      require : '^ngModel',
      replace : true,
      scope : {
        'ngModel': '='
      },
      template : '<div class="u-file">\
                            <input type="text" class="txt" readonly/>\
                            <button type="button" class="btn btn-default uploadIcn btn-block uploadBtn">\
                                <span class="upload">Upload</span>\
                            </button>\
                            <input type="file" class="file" />\
                        </div>',
      link : function(scope, element, attr, ctrl){
        var urlField = attr.urlField || 'imageUrl';
        var blobField = attr.blobField || 'blobKey';

        var fileInput = $('.file'),//element.find('.file'),
          textInput = $('.txt'),//element.find('.txt'),
          button = $(element).find('.btn');

        function ensureFileAPI(){
          if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert('The File APIs are not fully supported in this browser.');
          }
        }

        function handleFileSelected(event){
          var files = event.target.files,
            file = files[0];
          readFile(file);
        }
        function handleSendkeys(){
          scope.$apply(function(){
            fileInput.val('kushkush');
          });
        }

        function readFile(file){
          var urlPrefix = 'data:;base64,',
            n,
            result,
            reader,
            data,
            blob,
            objFile;

          reader = new FileReader();
          reader.onloadend = function(event) {
            if (event.target.readyState === FileReader.DONE) {
              data = event.target.result;
              /*n = data.indexOf(',');
               result = data.slice(n+1);
               //result = data.slice(urlPrefix.length);
               objFile = {path: '/attachments/', filename: file.name, datas: result};
               */
              scope.$apply(function(){
                textInput.val(fileInput.val());

                uApi.getUploadUrl().then(function (response) {
                  uApi.uploadFile(response.value, file).then(function (uplResponse) {
                    scope.ngModel[blobField] = uplResponse.data.blobKey;
                    scope.ngModel[urlField] = uplResponse.data.servingUrl;
                  });
                });
              });
            }
          };
          blob = file.slice(0, file.size);
          reader.readAsDataURL(blob);
        }
        fileInput.on('change', handleFileSelected);
        textInput.on('change', handleSendkeys);

        button.on('click', function(){
          fileInput.click();
        });

        scope.$on('$destroy', function(){
          fileInput.off('change');
          button.off('click');
        });
      }
    };
  }]);
})(angular);
