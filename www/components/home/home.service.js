(function () {
    'use strict';

    angular
        .module('app')
        .factory('homeService', homeService);

    function homeService($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {

            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA_zY0dIwMZ2LDtkKIc7EJRsJjCW4awvbc";
            
            url = "https://maps.googleapis.com/maps/api/geocode/json?address=Rua+Américo+Brasiliense,+Sao+Paulo,+SP&key=AIzaSyA_zY0dIwMZ2LDtkKIc7EJRsJjCW4awvbc";
        
            return $http.get(url);
        }
    }
})();