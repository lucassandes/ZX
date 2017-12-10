
(function () {
    'use strict';

    angular
        .module('app')
        .factory('geolocationService', geolocationService);

    function geolocationService() {
        var service = {
            setGeolocation: setGeolocation,
            getGeolocation: getGeolocation
        };
        var savedData = {};

        return service;

        function setGeolocation(data) {
            console.log("Saving data ");  
            savedData = data;
        }

        function getGeolocation(){
            return savedData;
        }
    }
})();