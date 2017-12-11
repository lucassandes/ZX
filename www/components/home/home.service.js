(function () {
    'use strict';

    angular
        .module('app')
        .factory('homeService', homeService);

    function homeService($http, GOOGLE_MAPS) {
        var service = {
            getAdressData: getAdressData
        };

        return service;

        function getAdressData(adress) {
            var formattedAdress = adress.replace(/ /g,"+");

            var endpoint = GOOGLE_MAPS.API_URL + formattedAdress + "&key=" + GOOGLE_MAPS.KEY;
          
            return $http.get(endpoint);
        }
    }
})();