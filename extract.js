var hslint = require('hslint');
var fs =  require('fs');
var glob = require('glob');

var trads = {};

glob("./source/**/*.html", {}, function (er, files) {
    for (i in files) {
        var errors = hslint(files[i], {
            templateDelimiters: ['{{','}}']
        });



        for (i in errors) {
            var content = String(fs.readFileSync(errors[i].file));

            var key = String(errors[i].error.evidence)
                        .replace(/^\/\(/gi, '')
                        .replace(/\)\/$/gi, '')
                        .replace(/\\/gi, '')
                        .replace(/[.!?:]/gi, '')
                        .replace(/ /gi, '_')
                        .replace(/&/gi, '')
                        .toLowerCase();

            trads[key]= String(errors[i].error.evidence)
                        .replace(/^\/\(/gi, '')
                        .replace(/\)\/$/gi, '')
                        .replace(/\\/gi, '');

            content = content.replace(errors[i].error.evidence, '{{ "'+key+'" | translate }}');

            fs.writeFileSync(errors[i].file, content);
        }

    }

    console.log(JSON.stringify(trads));

});


