require([
    'jquery',
    'util'
], function ($, util) {
    'use strict';

    var app = {
        init: function () {
            $.ajax({
                url: 'http://github.com',
                success: function(){

                }
            });
        }
    };

    $(function () {
        app.init();
    });
});