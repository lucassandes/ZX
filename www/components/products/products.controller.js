(function () {
    'use strict';

    angular
        .module('app')
        .controller('productsController', productsController);

    function productsController($scope, $location, geolocationService, productsService) {
        /* jshint validthis:true */
        var vm = this; 
        var geolocation = geolocationService.getGeolocation();

        if (angular.equals(geolocation, {})) {
            $location.path("/");
        }

        productsService
            .getProducts(geolocation)
            .then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log("Ops... Error :(");
            });
        console.log("Products Controller", geolocation);

    }
})();