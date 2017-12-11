(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    function homeController( homeService, $location, geolocationService) {
        /* jshint validthis:true */
        var vm = this;
        vm.address = "Rua Américo Brasiliense, São Paulo";
        vm.errorMessage = "";
        vm.getGeo = getGeo;
        
        function getGeo(adress) {
            homeService
                .getAdressData(adress)
                .then(function successCallback(response) {
                    //console.log(response.data);
                    geolocationService.setGeolocation(response.data.results[0].geometry.location);
                    $location.path("/products"); 
                }, function errorCallback(response) {
                    console.log("Ops... Error :(");
                    vm.errorMessage = "Ops... Error :(";
                });
        };
    }
})();