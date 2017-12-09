(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    function homeController($scope, homeService) {
        /* jshint validthis:true */
        var vm = this;
        vm.getGeo = getGeo;
        vm.address = "Rua Américo Brasiliense, São Paulo";

        function getGeo() {
            homeService
                .getData()
                .then(function successCallback(response) {
                    $scope.location = response.data.results[0].geometry.location;
                    
                }, function errorCallback(response) {
                    console.log("Ops... Error :(");
                });
        }
    }
})();