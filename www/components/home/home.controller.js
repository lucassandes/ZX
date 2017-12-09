(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    function homeController($scope, homeService, $location) {
        /* jshint validthis:true */
        var vm = this;
        vm.getGeo = getGeo;
        vm.address = "Rua Américo Brasiliense, São Paulo";

        function getGeo() {
            homeService
                .getData()
                .then(function successCallback(response) {
                    $scope.location = response.data.results[0].geometry.location;
                    $location.path("/products");
                }, function errorCallback(response) {
                    console.log("Ops... Error :(");
                });
        }
    }
})();