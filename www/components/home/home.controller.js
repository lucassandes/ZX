(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    function homeController($scope, homeService, $location, geolocationService) {
        /* jshint validthis:true */
        var vm = this;
        //vm.getGeo = getGeo;
        $scope.address = "Rua Américo Brasiliense, São Paulo";


        $scope.getGeo = function() {
            homeService
                .getData()
                .then(function successCallback(response) {
                    //$scope.geolocation.data = response.data.results[0].geometry.location;
                    geolocationService.setGeolocation(response.data.results[0].geometry.location);
                    $location.path("/products"); 
                }, function errorCallback(response) {
                    console.log("Ops... Error :(");
                });
        };
    }
})();