(function () {
    'use strict';

    angular.module('app')
        .constant('GOOGLE_MAPS', (function () {
            return {
                API_URL: "https://maps.googleapis.com/maps/api/geocode/json?address=",
                KEY: "AIzaSyA_zY0dIwMZ2LDtkKIc7EJRsJjCW4awvbc"
            };
        })())

        .constant('API_URL', (function () {
            return {
                UNAUTHORIZED: "unauthorized"
            };
        })());

})();