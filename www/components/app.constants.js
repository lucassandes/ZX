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
            return "https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql";
        })());

})();